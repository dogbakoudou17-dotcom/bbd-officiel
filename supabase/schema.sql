-- Espace pro BBD Officiel : comptes clients et suivi des demandes.
-- À exécuter une seule fois dans Supabase : SQL Editor > New query > coller ce fichier > Run.
-- Sécurité : chaque client ne lit que ses propres demandes ; seuls les e-mails listés dans
-- public.admins peuvent voir toutes les demandes et changer leur statut.

-- Administrateurs (à remplir à la main, voir la dernière ligne de ce fichier).
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security; -- aucune règle : table invisible depuis le site

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- Professionnels : l'espace pro est réservé aux comptes validés par BBD.
-- À la première connexion, le professionnel dépose une demande d'accès (statut « en_attente ») ;
-- seul un administrateur peut la passer à « valide » ou « refuse ».
create table if not exists public.membres (
  user_id     uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  email       text not null default lower(auth.jwt() ->> 'email'),
  nom         text not null check (char_length(nom) between 1 and 120),
  structure   text not null check (char_length(structure) between 1 and 200),
  profil      text check (char_length(profil) <= 40),
  telephone   text check (char_length(telephone) <= 40),
  site        text check (char_length(site) <= 200),
  statut      text not null default 'en_attente' check (statut in ('en_attente','valide','refuse')),
  note        text check (char_length(note) <= 1000),   -- message de BBD (motif d'un refus, par exemple)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.membres enable row level security;
drop policy if exists "membre lit sa fiche" on public.membres;
create policy "membre lit sa fiche" on public.membres
  for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "membre demande l'accès" on public.membres;
create policy "membre demande l'accès" on public.membres
  for insert with check (user_id = auth.uid() and statut = 'en_attente' and note is null
    and email = lower(auth.jwt() ->> 'email'));
drop policy if exists "admin valide les accès" on public.membres;
create policy "admin valide les accès" on public.membres
  for update using (public.is_admin()) with check (public.is_admin());

create or replace function public.est_valide() returns boolean
language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (select 1 from public.membres where user_id = auth.uid() and statut = 'valide');
$$;

-- Demandes (devis) et commandes qui en découlent.
create table if not exists public.requests (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_email text not null default (auth.jwt() ->> 'email'),
  reference   text not null default ('BBD-' || to_char(now(), 'YYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 5))),
  status      text not null default 'recue'
              check (status in ('recue','devis_envoye','validee','preparation','expediee','livree','annulee')),
  profil      text check (char_length(profil) <= 40),
  famille     text check (char_length(famille) <= 40),
  objet       text check (char_length(objet) <= 200),
  produit     text check (char_length(produit) <= 80),
  version     text check (char_length(version) <= 80),
  coloris     text check (char_length(coloris) <= 80),
  quantite    integer check (quantite between 1 and 1000000),
  structure   text check (char_length(structure) <= 200),
  message     text check (char_length(message) <= 5000),
  amount_ttc  numeric(10,2) check (amount_ttc >= 0),   -- montant du devis, saisi par BBD
  tracking    text check (char_length(tracking) <= 300), -- numéro ou lien de suivi du colis, saisi par BBD
  note        text check (char_length(note) <= 2000),    -- message de BBD au client
  utiliser_cagnotte boolean not null default false,     -- le client souhaite utiliser sa cagnotte de parrainage
  cagnotte_deduite numeric(10,2) check (cagnotte_deduite >= 0), -- montant de cagnotte déduit du devis, saisi par BBD
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
-- Mise à jour d'une base créée avec une version précédente de ce fichier.
alter table public.requests add column if not exists utiliser_cagnotte boolean not null default false;
alter table public.requests add column if not exists cagnotte_deduite numeric(10,2) check (cagnotte_deduite >= 0);
create index if not exists requests_user_idx on public.requests (user_id, created_at desc);
alter table public.requests enable row level security;

drop policy if exists "client lit ses demandes" on public.requests;
create policy "client lit ses demandes" on public.requests
  for select using (user_id = auth.uid() or public.is_admin());

-- Le client validé crée une demande « reçue » ; il ne peut fixer ni statut, ni montant, ni suivi, ni note.
drop policy if exists "client crée sa demande" on public.requests;
create policy "client crée sa demande" on public.requests
  for insert with check (
    user_id = auth.uid() and public.est_valide() and status = 'recue'
    and amount_ttc is null and tracking is null and note is null and cagnotte_deduite is null
  );

drop policy if exists "admin met à jour" on public.requests;
create policy "admin met à jour" on public.requests
  for update using (public.is_admin()) with check (public.is_admin());

-- Historique des étapes, alimenté automatiquement.
create table if not exists public.request_events (
  id          bigserial primary key,
  request_id  uuid not null references public.requests(id) on delete cascade,
  status      text not null,
  created_at  timestamptz not null default now()
);
alter table public.request_events enable row level security;
drop policy if exists "lecture historique" on public.request_events;
create policy "lecture historique" on public.request_events
  for select using (exists (
    select 1 from public.requests r
    where r.id = request_id and (r.user_id = auth.uid() or public.is_admin())
  ));

create or replace function public.log_request_status() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.request_events (request_id, status) values (new.id, new.status);
  end if;
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists requests_status_log on public.requests;
create trigger requests_status_log after insert on public.requests
  for each row execute function public.log_request_status();
drop trigger if exists requests_status_update on public.requests;
create trigger requests_status_update before update on public.requests
  for each row execute function public.log_request_status();

-- Les clients ne modifient ni ne suppriment rien ; aucune règle delete n'est créée.

-- Programme de parrainage : un code par professionnel validé, rattaché à son adresse e-mail,
-- et sa cagnotte (cumulée sur les achats bbd-officiel.fr réalisés avec le code, déduite de ses devis).
-- Créé et mis à jour uniquement par BBD (page /espace-pro/admin/) ; le professionnel le lit dans son espace.
create table if not exists public.parrainages (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (email = lower(email) and char_length(email) <= 200),
  code        text not null unique check (code ~ '^[A-Z0-9-]{3,30}$'),
  statut      text not null default 'actif' check (statut in ('actif','suspendu')),
  cagnotte    numeric(10,2) not null default 0 check (cagnotte >= 0),
  note        text check (char_length(note) <= 1000),   -- message de BBD au parrain
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.parrainages enable row level security;
drop policy if exists "parrain lit son code" on public.parrainages;
create policy "parrain lit son code" on public.parrainages
  for select using (email = lower(auth.jwt() ->> 'email') or public.is_admin());
drop policy if exists "admin gère les codes" on public.parrainages;
create policy "admin gère les codes" on public.parrainages
  for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;
drop trigger if exists parrainages_touch on public.parrainages;
create trigger parrainages_touch before update on public.parrainages
  for each row execute function public.touch_updated_at();
drop trigger if exists membres_touch on public.membres;
create trigger membres_touch before update on public.membres
  for each row execute function public.touch_updated_at();

-- DERNIÈRE ÉTAPE : remplacer l'adresse ci-dessous par celle de BBD Officiel (compte administrateur), puis exécuter.
-- insert into public.admins (email) values ('adresse-admin@exemple.fr');
