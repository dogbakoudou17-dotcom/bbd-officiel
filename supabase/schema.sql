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
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists requests_user_idx on public.requests (user_id, created_at desc);
alter table public.requests enable row level security;

drop policy if exists "client lit ses demandes" on public.requests;
create policy "client lit ses demandes" on public.requests
  for select using (user_id = auth.uid() or public.is_admin());

-- Le client crée une demande « reçue » ; il ne peut fixer ni statut, ni montant, ni suivi, ni note.
drop policy if exists "client crée sa demande" on public.requests;
create policy "client crée sa demande" on public.requests
  for insert with check (
    user_id = auth.uid() and status = 'recue'
    and amount_ttc is null and tracking is null and note is null
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

-- DERNIÈRE ÉTAPE : remplacer l'adresse ci-dessous par celle de BBD Officiel (compte administrateur), puis exécuter.
-- insert into public.admins (email) values ('adresse-admin@exemple.fr');
