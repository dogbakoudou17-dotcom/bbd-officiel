# BBD Officiel — Instructions pour Claude Code

Ce dossier est le projet source complet du site BBD Officiel. Reprendre le travail directement ici. Lire d’abord `HANDOFF_CLAUDE_CODE.md`, `HISTORIQUE_PROJET.md`, puis `README.md`, `RECETTE.md` et `handoff/Cahier_des_charges_BBD_Officiel.md`.

Le dépôt Git local, sa branche `main` et son tag `handoff-2026-10-11` constituent l'état de référence. Vérifier `git status` avant toute modification et conserver cet historique.

## Commandes essentielles

```powershell
npm run build
npm run check
npm run preview
```

Sous Windows, `LANCER.cmd` reconstruit le site et ouvre l’aperçu sur `http://127.0.0.1:4173/`.

Le projet n’a aucune dépendance npm externe. Node.js suffit. Le site est statique, en HTML/CSS/JavaScript natifs, destiné à Netlify.

## Architecture à respecter

- `build.mjs` contient les composants, textes de pages et génération statique.
- `data/products.json` est la source des produits, tarifs, photos et conditions.
- `data/formulas.json` contient les formules provisoires.
- `data/site.json` contient les informations d’entreprise et les validations de lancement.
- `assets/style.css` contient la structure visuelle générale.
- `assets/brand.css` contient l’identité BBD, les composants produits et les campagnes.
- `assets/ui.css` (refonte d’octobre 2026, chargée en dernier) contient le parcours : premier écran, bandeau d’engagements, tuiles catalogues, cartes produits, carrousels, « Comment ça marche », pictogrammes et boutons. Les pictogrammes sont définis une seule fois dans `build.mjs` (objet `I`, fonction `icon`).
- La page « Qui sommes-nous ? » (`/qui-sommes-nous/`, l'ancienne `/a-propos/` y redirige) reprend le récit et les photos de bbd-officiel.fr/pages/qui-sommes-nous avec l'accord du propriétaire. Ne rien ajouter au parcours de Hamady qui ne figure pas dans un texte transmis. Les produits vendus seulement sur la boutique BBD Paris (sofas, peluches, livraisons Mondial Relay/Chronopost) ne sont pas présentés ici.
- Les engagements affichés (sans engagement, aucun paiement en ligne, prix HT/TTC, logo sur les textiles) sont des faits établis : n’en ajouter aucun (délai, livraison offerte, avis, garantie) sans confirmation du propriétaire.
- `assets/app.js` contient les interactions progressives, filtres, devis, calculs et animations.
- Espace pro (`/espace-pro/`, `/espace-pro/admin/`) : `assets/espace.js` + `supabase/schema.sql`, configuration par les variables d’environnement `SUPABASE_URL` et `SUPABASE_ANON_KEY` (jamais dans le dépôt, jamais la clé `service_role`). Voir `ESPACE_PRO.md`. Programme de parrainage : page `/espace-pro/parrainage/`, table `parrainages` ; ne jamais annoncer de taux, de montant ni d'avantage acheteur tant que BBD ne les a pas fixés. Le DOM de l’espace est construit avec `textContent` : ne jamais y injecter de HTML issu des données.
- `dist/` est généré par `npm run build`. Ne jamais modifier `dist/` à la main.

Après toute modification, exécuter `npm run build`, `npm run check` et `node --check assets/app.js` (et `node --check assets/espace.js`).

## Règles métier et éditoriales

- Le parcours principal est : découvrir → comprendre → demander un devis → échanger → valider.
- Aucun paiement en ligne au lancement.
- Ne jamais inventer un produit, un tarif, une taille, un délai, une certification, une livraison, un témoignage ou une réalisation.
- **Règle des prix (propriétaire, 11/10/2026) : tous les prix transmis sont TTC.** Ils sont enregistrés tels quels (TTC) dans `data/products.json` ; le HT est calculé par `pricing.mjs` avec le taux de `data/site.json`. Ne jamais saisir un HT dans les données.
- Les trois formules sont fictives et doivent rester clairement présentées comme des exemples tant qu’elles ne sont pas validées.
- Les deux images `campagne-*.jpg` sont des mises en scène générées à partir des produits. Conserver la mention visible « Mise en scène illustrative » ; ne pas les présenter comme des réalisations client.
- Préserver les logos et photographies fournis. Ne pas remplacer silencieusement un fichier original.
- Une fiche sans photo exploitable affiche « Photo à venir ». La doudoune sans manches Bac a reçu ses photos le 11/10/2026.
- La doudoune d'abord nommée « rétro-réfléchissante » s'appelle désormais « Doudoune sans manches rétro » selon le propriétaire : ne lui attribuer aucune propriété réfléchissante, de protection ou de certification sans preuve fournisseur.

## Formulaire et données

- En aperçu local, le formulaire ne transmet aucune donnée.
- Le contexte produit, la version, la quantité et le paramètre de campagne QR sont préremplis dans le devis.
- Netlify Forms doit être configuré et testé avec une vraie adresse avant publication.
- Ne pas ajouter de traceurs, cookies publicitaires ou services payants sans demande explicite.
- Ne jamais stocker de clé, mot de passe ou donnée client dans le dépôt.

## Publication

`npm run build:production` est volontairement bloqué tant que les informations et validations de `data/site.json` ne sont pas complètes. Ne contourner ce garde-fou qu’après obtention et validation des données réelles.

La cible prévue est Netlify Free. Vérifier les limites du forfait au moment du déploiement. Une URL publique stable devra être validée avant de produire le QR code du salon.

## Qualité attendue

- Conception mobile d’abord, navigation clavier, focus visible, titres structurés, textes alternatifs utiles.
- Respecter `prefers-reduced-motion` et conserver le contenu utilisable sans JavaScript.
- Ne pas dégrader les performances : optimiser les médias avant intégration.
- Maintenir un seul H1 et un titre unique par page.
- Mettre à jour `README.md` et `RECETTE.md` après une évolution substantielle.

## État de référence

Au moment de la passation : 24 pages générées, 7 produits dans les données, 721 liens et ressources internes contrôlés. Le site est une prévisualisation locale et n’est pas publié.
