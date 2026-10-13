# Espace pro — suivi des demandes et des commandes

L’espace pro permet à un client de se connecter **sans mot de passe** (lien reçu par e-mail) et de suivre ses demandes, du devis à la livraison. BBD Officiel met à jour chaque demande depuis une page d’administration.

## Fonctionnement

| Qui | Où | Ce qu’il fait |
| --- | --- | --- |
| Client | `/espace-pro/` | Se connecte avec son e-mail. Il voit ses demandes, leur étape, le montant du devis, les messages de BBD et le suivi du colis. |
| Client connecté | `/devis/` | Sa demande de devis s’enregistre **automatiquement** dans son espace (statut « Demande reçue »), en plus de l’envoi habituel. |
| BBD Officiel | `/espace-pro/admin/` (hors menu) | Voit toutes les demandes. Pour chacune, il modifie le statut, le montant TTC, le suivi du colis et un message au client. |

Les statuts possibles sont : Demande reçue → Devis envoyé → Commande validée → En préparation → Expédiée → Livrée, ou bien Annulée.

## Fichiers techniques

- `supabase/schema.sql` : les tables, les règles de sécurité (RLS) et l’historique des statuts. Chaque client ne lit que ses propres demandes, sans pouvoir les modifier ni les supprimer. Seules les adresses présentes dans la table `admins` voient tout et modifient.
- `assets/espace.js` : la connexion, le tableau de bord du client, l’administration et l’enregistrement automatique des devis. Il appelle l’API Supabase directement, sans bibliothèque externe.
- `build.mjs` : les pages `/espace-pro/` et `/espace-pro/admin/`. La configuration est lue dans les variables d’environnement `SUPABASE_URL` et `SUPABASE_ANON_KEY`. **Aucune clé n’est enregistrée dans le dépôt.** Si ces variables sont absentes, l’espace affiche « ouvre très bientôt ».
- `netlify.toml` : la règle CSP autorise `https://*.supabase.co`.

## Mise en service (une seule fois, environ 15 minutes)

1. **Créer le projet Supabase** (offre gratuite) : sur https://supabase.com, cliquer sur *Start your project*, se connecter, puis *New project*. Choisir la région **Europe (Paris ou Francfort)** et noter le mot de passe de la base dans un gestionnaire de mots de passe.
2. **Créer les tables** : dans le projet, ouvrir *SQL Editor*, puis *New query*. Coller le contenu de `supabase/schema.sql`. Sur la dernière ligne, retirer les `--` et remplacer l’adresse par celle de BBD Officiel. Cliquer sur *Run*.
3. **Régler la connexion** : ouvrir *Authentication*, puis *URL Configuration*.
   - *Site URL* : `https://bbd-officiel.netlify.app/espace-pro/`
   - *Redirect URLs* : ajouter `https://bbd-officiel.netlify.app/espace-pro/` et `https://bbd-officiel.netlify.app/espace-pro/admin/`. Ajouter plus tard les mêmes adresses sur le domaine définitif.
   - Dans *Authentication*, puis *Sign In / Providers* : laisser *Email* activé.
4. **Récupérer les deux valeurs** dans *Project Settings*, puis *API* (ou *Data API* / *API Keys*) :
   - la *Project URL*, de la forme `https://xxxx.supabase.co` ;
   - la clé publique *anon* ou *publishable*. **Jamais la clé `service_role` ou `secret`.**
5. **Les donner à Netlify** : dans *Site configuration*, ouvrir *Environment variables*, puis *Add a variable*.
   - `SUPABASE_URL` = la Project URL ;
   - `SUPABASE_ANON_KEY` = la clé publique.

   Ensuite, ouvrir *Deploys*, puis *Trigger deploy* et *Deploy site*.
6. **Tester** :
   - ouvrir `/espace-pro/`, saisir son e-mail et cliquer sur le lien reçu ;
   - envoyer une demande depuis `/devis/` ;
   - vérifier que la demande apparaît dans l’espace ;
   - ouvrir `/espace-pro/admin/` avec l’adresse administrateur, changer le statut et vérifier que le client voit la nouvelle étape.

## Avant l’ouverture au public

- **E-mails** : le service d’e-mails intégré à Supabase est limité à quelques messages par heure. Il est réservé aux tests. Avant le lancement, configurer un SMTP (*Authentication*, puis *Emails*, puis *SMTP Settings*), par exemple la messagerie professionnelle de BBD ou un service d’envoi. Personnaliser aussi le modèle *Magic Link* en français.
- **Confidentialité** : compléter dans `data/site.json` et sur la page Confidentialité :
  - la région d’hébergement Supabase ;
  - la durée de conservation des comptes et des demandes ;
  - Supabase parmi les destinataires.
- **Projet gratuit en pause** : un projet Supabase gratuit sans activité pendant 7 jours est mis en pause. Le réactiver depuis le tableau de bord, ou passer à une offre payante après accord du propriétaire.
- **Supprimer un compte** à la demande d’un client : dans *Authentication*, ouvrir *Users*, puis *Delete user*. Ses demandes sont supprimées avec lui.
