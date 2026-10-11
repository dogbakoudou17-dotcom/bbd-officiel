# Recette de la structure — 5 octobre 2026

## Vérifié

- Génération de 18 pages HTML statiques, un H1 par page, titres uniques.
- 517 liens internes et ressources pointent vers des fichiers existants ; ancres contrôlées.
- JavaScript vérifié avec `node --check`.
- Serveur local : accueil répond en HTTP 200.
- Inspection visuelle de l’accueil et de la fiche parka à 1440 pixels.
- Parcours mobile à 390 pixels : fiche parka → choix de version et quantité → formulaire.
- Deux lots avec logo donnent **8 pièces, 632 € HT**. Le produit, la quantité, la famille textile et la version sont repris dans le formulaire.
- Le profil événement affiche la date et le lieu facultatifs ; la famille textile affiche les champs de tailles et de personnes.
- Filtre « Textiles & tenues » : une seule famille affichée et état annoncé.
- Formulaire rempli avec des données fictives : confirmation explicite de vérification locale et **aucune transmission**.
- Menu mobile : ouverture et fermeture avec la touche Échap vérifiées.
- Aucun débordement horizontal observé sur les pages contrôlées aux largeurs 320, 390 et 1440. À 320 pixels : accueil, univers éleveurs, solutions, parka et devis.
- Pas d’erreurs ni d’avertissements dans la console capturée pendant les parcours contrôlés.
- Le build de production échoue comme prévu tant que les contenus et paramètres de lancement manquent.
- L’aperçu ne déclare pas de réception Netlify et son bouton est désactivé sans JavaScript.

## À vérifier avant publication

- Réception réelle Netlify Forms et notification dans la boîte définitive.
- État d’erreur sur le formulaire public, soumission sans JavaScript, antispam.
- Contenus commerciaux, droits des photos/logos, identité et textes légaux complets.
- Tailles, coloris, transport, délais et modalités exactes de marquage de la parka.
- Audit d’accessibilité complet (contrastes, lecteur d’écran, parcours clavier) ; l’implémentation ne constitue pas une certification WCAG.
- Recette Safari, Firefox, Edge et téléphones physiques.
- Mesure LCP, INP et CLS sur le site déployé. Aucune mesure de performance de production n’a été annoncée.
- Validation de l’URL publique avant génération du QR code à imprimer.

Les captures d’aperçu remises à côté du dossier source illustrent le rendu local de cette version.


## Recette après ajout des trois textiles
21 pages et 611 liens/ressources internes vérifiés. Tarifs unitaires et montants par lot contrôlés pour les quatre références. Parcours doudoune rétro-réfléchissante : deux lots avec logo = 8 pièces et 472 EUR HT, produit et quantité repris dans le devis. Photos : association à confirmer avec le client.

## Ajout de la doudoune sans manches
22 pages, 640 liens/ressources vérifiés. Montants vérifiés : lot sans logo 100 EUR HT, avec logo 140 EUR HT. Produit et quantité repris dans le devis. Correction et vérification du recalcul lors du retour navigateur depuis le devis (sélection avec logo conservée : 140 EUR HT). Photos reçues inutilisables, emplacement explicite Photo à venir.

## Sweats zippés bleu et noir
24 pages, 704 liens et ressources vérifiés. Chaque fiche affiche 156 EUR HT le lot sans logo et 196 EUR HT avec logo. Test bleu : deux lots avec logo = 8 pièces et 392 EUR HT ; produit et quantité repris dans le devis. Test noir : passage de 156 à 196 EUR HT avec logo. Deux photos intégrées par coloris.

## Enrichissement visuel de l’accueil

- Deux campagnes photographiques créées et intégrées, avec libellé visible « Mise en scène illustrative » et textes alternatifs.
- Rail horizontal de six produits : navigation tactile, clavier et liens directs vers les fiches.
- Animations d’apparition progressives, ajoutées comme amélioration facultative ; contenu visible sans JavaScript.
- Effet de profondeur limité au pointeur et neutralisé avec `prefers-reduced-motion`.
- Images de campagne converties en JPEG : environ 165 Ko pour le panorama et 247 Ko pour le portrait.
- Après intégration : 24 pages et 721 liens/ressources internes vérifiés, JavaScript syntaxiquement valide.

## Reprise Claude Code et logos web — 11 octobre 2026

- Dépôt recloné depuis GitHub ; build, contrôle des liens et syntaxe JavaScript conformes à la référence (24 pages, 721 liens et ressources).
- Contrôle visuel : accueil à 1440 px, menu mobile (Échap et retour du focus), catalogue textile, fiche sweat zippé bleu (2 lots avec logo = 8 pièces, 392 € HT), préremplissage du devis, « Photo à venir » et mentions « Mise en scène illustrative ».
- Constat : logos d’en-tête de 1,1 Mo et 437 Ko chargés sur chaque page, fond crème opaque visible derrière le logo.
- Correction : copies web recadrées à fond transparent (16 et 23 Ko) et signature en JPEG 800 px (28 Ko) ; originaux conservés. Poids des logos par page : environ 1,5 Mo → 40 Ko.
- Après correction : 24 pages vérifiées à 320, 375 et 1440 px, sans débordement horizontal, image cassée ni erreur JavaScript ; un H1 par page.

## BB Bed et affichage HT / TTC — 11 octobre 2026

- 25 pages et 797 liens/ressources internes vérifiés ; `check.mjs` contrôle désormais pour chaque offre le prix unitaire et le lot, en HT et en TTC, ainsi que la présence du sélecteur.
- BB Bed, mode HT : lot de 3 = 35 € HT / unité (42 € TTC), 105 € HT le lot (126 € TTC) ; lot de 10 = 31,50 € HT / unité (37,80 € TTC), 315 € HT le lot (378 € TTC), mention « 10 pour le prix de 9 ».
- BB Bed, mode TTC : 2 lots de 10 = 20 unités · 756 € TTC · 630 € HT. Vignette « Double patte noir et rose » : grande photo, légende et champ coloris mis à jour. Devis prérempli : objet, famille Accessoires, quantité 20, « Formule souhaitée : Lot de 10 » et « Coloris souhaité : Double patte noir et rose ».
- Mode TTC mémorisé et appliqué à la fiche parka : 2 lots avec logo = 8 pièces · 758,40 € TTC · 632 € HT (632 € HT conforme à la recette initiale).
- Mobile 375 px : vignettes en rangées défilantes par motif, champ coloris pleine largeur, aucun contenu coupé.
- Build de production bloqué comme attendu : taux de TVA à confirmer (`vatRateConfirmed`) et base HT/TTC du BB Bed à préciser.
- À confirmer par BBD Officiel : base HT ou TTC des tarifs BB Bed, régime et taux de TVA, possibilité de mélanger les coloris dans un lot, composition et délais.

## Descriptifs doudoune capuche et sweats Bourget — 11 octobre 2026

- Doudoune « capuche garde bleu » : photo reçue identique (même image) à celle de la fiche « à capuche amovible » ; confirmé par le propriétaire comme même produit. Fiche existante renommée, adresse conservée, tarif corrigé de 49/59 à **39/49 € HT** (156 / 196 € HT le lot de 4 ; 46,80 / 58,80 € TTC la pièce). Rubriques Détails, Taille & coupe, Composition & entretien ajoutées.
- Sweats zippés renommés « Bourget » bleu marine et noir ; tarifs 39/49 € HT inchangés et conformes au descriptif ; mêmes rubriques ajoutées. Un premier envoi portait par erreur la photo de la doudoune : annulé à la demande du propriétaire, puis renvoyé avec `sweatzippebourget.zip`.
- Photos de l'archive : « BLEU MARINE » identique à `sweat-zippe-bleu-vue-2.jpg` et « NOIR » identique à `sweat-zippe-noir.jpg` (écart moyen ≈ 0,05/255). Aucun nouveau fichier ; la photo bleu marine reçue devient la photo principale de la fiche bleue, comme pour le noir.
- 25 pages, 797 liens/ressources ; prix HT et TTC contrôlés par `check.mjs`.

## Doudounes Bac et rétro — 11 octobre 2026

- Doudoune sans manches **Bac** (`doudounesansmanchesbac.zip`, 4 photos nouvelles) associée à la fiche « Doudoune sans manches » : mêmes tarifs 25/35 € HT, modèle à col montant sans capuche, fiche qui attendait ses photos. « Photo à venir » remplacé par une galerie de 4 coloris (noir par défaut, gris, beige, bleu). Originaux dans `sources/doudoune-sans-manches-bac/`, copies 800 × 1200 (49–63 Ko) et miniatures 180 × 240 (≈ 5 Ko).
- Test : vignette beige → grande photo et coloris « Bac beige » ; 3 lots sans logo = 12 pièces · 300 € HT · 360 € TTC ; devis avec `coloris=Bac beige`. Mobile 375 px sans débordement.
- Doudoune **rétro** : photo reçue identique à celle de la fiche « rétro-réfléchissante » (écart 0,31/255). Même logique que la doudoune capuche garde : fiche renommée « Doudoune sans manches rétro », adresse conservée, tarif corrigé de 49/59 à 39/49 € HT, rubriques ajoutées ; plus aucune mention « réfléchissante ».
- La galerie de coloris accepte désormais des photos verticales (`thumbSize`, `swatchLabel`, `short`). Le rail de l'accueil affiche les sept textiles.
- 25 pages, 809 liens/ressources vérifiés.

## Parka Matignon — 11 octobre 2026

- `parkamatignon.zip` : « BLEU » identique à `parka-impermeable.jpg`, « NOIR » identique à `parka-impermeable-vue-2.jpg` (écart 0,2/255) ; tarifs 69/79 € HT identiques. La fiche « Parka imperméable » devient « Parka Matignon » (adresse conservée), galerie de 2 coloris (noir par défaut, bleu), miniatures créées ; rubriques Taille & coupe et Composition. Le descriptif ne parle pas d'imperméabilité : la mention est retirée.
- Test : vignette bleu → photo et coloris « Matignon bleu » ; version avec logo, 1 lot = 4 pièces · 316 € HT · 379,20 € TTC ; devis avec `coloris=Matignon bleu`.
- 25 pages, 812 liens/ressources vérifiés.

## Parka Élysée — 11 octobre 2026

- `parkaelysee.zip` : « KAKI » identique à `parka-molletonnee.jpg` (écart 0,1/255), tarifs 69/79 € HT identiques : la fiche « Parka molletonnée » devient « Parka Élysée » (adresse conservée). Photos noir et bleu nouvelles ; 6 visuels de détail WebP (capuche, intérieur, zip, zip de poche, doublure de poche, poche arrière) convertis en JPEG ≤ 100 Ko. Originaux dans `sources/parka-elysee/`.
- Galerie : rangée « Coloris » (noir par défaut, bleu, kaki) qui renseigne le devis, rangée « Détails » qui n'affiche que le gros plan (le coloris choisi est conservé). Le menu Coloris ne liste que les trois coloris.
- Encart de l'accueil : « La parka Élysée, avec ou sans votre logo », photo noire.
- Test : kaki puis détail capuche → grande photo du détail, coloris « Élysée kaki » conservé et transmis au devis. 25 pages, 830 liens/ressources vérifiés.

## Oreille de porc naturelle — 11 octobre 2026

- Première référence de la famille **Friandises & récompenses** : fiche, textes (avantages, mode d'emploi, conservation) repris du descriptif, photo 900 × 900 (38 Ko), original dans `sources/oreille-de-porc/`.
- Tarif : lot de 100 pièces à 100 €, traité comme HT (1 € HT / pièce, 1,20 € TTC) ; base HT ou TTC à préciser — `taxStatus` bloque la production. Aucune personnalisation annoncée.
- Test : 2 lots = 200 pièces · 200 € HT · 240 € TTC ; devis prérempli (famille récompenses, quantité 200, « Formule souhaitée : Lot de 100 »). Mobile 320/375 px sans débordement.
- 26 pages, 861 liens/ressources vérifiés.

## Friandises : oreilles de bœuf, trachée, pattes de poulet — 11 octobre 2026

- Cinq fiches ajoutées dans **Friandises & récompenses**, textes repris des descriptifs, photos 900 × 900 (37–52 Ko), originaux dans `sources/<id>/` :
  - Oreille de bœuf naturelle et Oreille de bœuf avec poils : lot de 50 à 90 € (1,80 € HT / pièce, 2,16 € TTC) ;
  - Trachée de bœuf naturelle, Pattes de poulet soufflées, Pattes de poulet naturelles : **vente au kilo**, 20 € HT / kg (24 € TTC).
- Vente au poids : unité « kg », champ « Quantité en kilos », pas de ligne « le lot de 1 » (`lotsLabel`, `pack: 1`). `check.mjs` ignore la ligne de lot quand le lot vaut 1.
- Arrondi au centime des montants calculés (navigateur et `pricing.mjs`) : 100 × 1,80 € affiche 180 € et non 180,00 €.
- Les photos des pattes de poulet n'étaient pas jointes aux messages : utilisées depuis `Téléchargements` (`PATTE DE POULET SOUFFLEE.jpeg`, `PATTE DE POULET NATURE.jpeg`), contrôlées visuellement.
- Tests : oreille de bœuf 2 lots = 100 pièces · 180 € HT · 216 € TTC ; trachée 3 kg = 60 € HT · 72 € TTC ; pattes soufflées 5 kg = 100 € HT · 120 € TTC. Base HT ou TTC de tous les tarifs de friandises à préciser (production bloquée).
- 31 pages, 1021 liens/ressources vérifiés ; 31 pages contrôlées à 320, 375 et 1440 px (93 contrôles, aucun défaut).

## Oreille de lapin avec poils — 11 octobre 2026

- Vente au kilo, **35 € HT / kg** (42 € TTC). Le titre de tarif du descriptif reçu indiquait « TRACHEE DE BOEUF » (copier-coller probable) : le montant 35 €, différent des 20 € de la trachée, est appliqué à l'oreille de lapin ; la trachée reste à 20 €.
- Photo `OREILLE DE LAPIN POILS.jpeg` (Téléchargements), 900 × 900, 41 Ko ; original dans `sources/oreille-de-lapin-avec-poils/`.
- Test : 2 kg = 70 € HT · 84 € TTC ; devis prérempli. Mobile 375 px sans débordement. 32 pages, 1053 liens/ressources vérifiés.

## Sprat séché naturel — 11 octobre 2026

- Vente au kilo, **45 € HT / kg** (54 € TTC) ; textes repris du descriptif ; photo 900 × 900 (43 Ko), original dans `sources/sprat-seche/`.
- Test : 3 kg = 135 € HT · 162 € TTC ; 320 et 1440 px sans débordement. 33 pages, 1085 liens/ressources vérifiés.

## Cou de poulet naturel — 11 octobre 2026

- Vente au kilo, **20 € HT / kg** (24 € TTC) ; textes repris du descriptif ; photo 900 × 900 (108 Ko, image très détaillée), original dans `sources/cou-de-poulet/`.
- Test : 4 kg = 80 € HT · 96 € TTC ; 320 et 1440 px sans débordement. 34 pages, 1117 liens/ressources vérifiés.

## Sabot de veau naturel — 11 octobre 2026

- Lot de 100 pièces à 45 € : **0,45 € HT / pièce** (0,54 € TTC), 45 € HT le lot ; textes repris du descriptif (mode d'emploi et conservation à la lettre) ; photo 900 × 900 (29 Ko), original dans `sources/sabot-de-veau/`.
- Test : 3 lots = 300 pièces · 135 € HT · 162 € TTC ; 320 et 1440 px sans débordement. 35 pages, 1149 liens/ressources vérifiés.

## Tendon de bœuf naturel — 11 octobre 2026

- Vente au kilo, **25 € HT / kg** (30 € TTC) ; textes repris du descriptif ; photo 900 × 900 (83 Ko), original dans `sources/tendon-de-boeuf/`.
- Test : 2 kg = 50 € HT · 60 € TTC ; 320 et 1440 px sans débordement. 36 pages, 1181 liens/ressources vérifiés.

## Aile de poulet naturelle — 11 octobre 2026

- Vente au kilo, **15 € HT / kg** (18 € TTC) ; textes repris du descriptif (émojis retirés) ; photo 900 × 900 (76 Ko), original dans `sources/aile-de-poulet/`.
- Test : 3 kg = 45 € HT · 54 € TTC ; 320 et 1440 px sans débordement. 37 pages, 1213 liens/ressources vérifiés.

## Sabot de bœuf naturel — 11 octobre 2026

- Lot de 50 pièces à 35 € : **0,70 € HT / pièce** (0,84 € TTC), 35 € HT le lot ; textes repris du descriptif ; photo 900 × 900 (38 Ko), original dans `sources/sabot-de-boeuf/`. Photo distincte de celle du sabot de veau (écart 17, dû au fond blanc commun ; les doublons mesurés étaient < 1).
- Test : 2 lots = 100 pièces · 70 € HT · 84 € TTC ; 320 et 1440 px sans débordement. 38 pages, 1245 liens/ressources vérifiés.

## Règle des prix : transmis TTC — 11 octobre 2026

- Consigne du propriétaire : **tous les prix transmis sont TTC**. Les données (`unitPlain`, `unitLogo`, `offers[].unit`) sont désormais lues comme TTC, sans modification des montants saisis ; `pricing.mjs` calcule le HT (`htFromTtc`, arrondi au centime, TVA de `site.json`). Les TTC affichés sont donc exactement ceux transmis. `taxStatus` passe à « TTC » pour toutes les références ; les chaînes figées `price` et `variants` sont supprimées (lignes de prix générées depuis les offres).
- Ce qui précède dans ce journal mentionne des montants « HT » : ils correspondent en réalité aux TTC transmis.
- Contrôles : parka sans logo 69 € TTC → 57,50 € HT ; avec logo 79 € TTC → 65,83 € HT ; 2 lots avec logo = 8 pièces · 526,67 € HT · 632 € TTC. BB Bed lot de 10 = 262,50 € HT · 315 € TTC. Oreille de porc lot de 100 = 83,33 € HT · 100 € TTC. Trachée 3 kg = 50 € HT · 60 € TTC. `check.mjs` vérifie HT calculés et TTC transmis pour chaque offre.
- Le build de production reste bloqué tant que le taux de TVA (`vatRateConfirmed`) n'est pas confirmé.

## Refonte UX/UI — 11 octobre 2026

Audit de départ : l'accueil ne montrait pas l'offre (illustration dessinée, produits au 6e écran), aucun accès direct aux catégories dans le menu, aucune réassurance, aucun pictogramme, repères en capitales numérotés au-dessus de chaque section, pages catalogue sans image, fiches produits sans suite de parcours, formules fictives au cœur de l'accueil.

Ce qui change :
- **Menu** : Textiles, Friandises, Accessoires, Pour qui ?, Personnalisation et bouton « Demander un devis » toujours visible ; rubrique courante soulignée (fiches incluses).
- **Accueil** : premier écran avec l'offre, deux boutons (catalogues, devis), trois réassurances et la photo de campagne (mention « Mise en scène illustrative » conservée) ; bandeau de 4 engagements à pictos ; 3 catalogues en photo avec nombre de références ; « Pour qui ? » (éleveurs, clubs, événements, particuliers) ; carrousels textiles et friandises avec flèches, prix HT/TTC et sélecteur ; « Commander, simplement » en 4 étapes + encadré « Bon à savoir » (HT/TTC, lots et kilo, logo) ; formules signalées comme exemples ; FAQ enrichie (HT/TTC, lots, logo, paiement) ; clôture avec deux boutons.
- **Catalogues** : en-tête illustré avec repères à pictos, grille de cartes produits (étiquettes « Lot de… », « Au kilo », « Logo possible », nombre de coloris ; prix HT/TTC), bandeau d'engagements, renvoi vers les autres catalogues.
- **Fiches** : étiquette du catalogue, fil d'Ariane complet, bouton de devis pleine largeur, 3 réassurances sous le bouton, section « Dans la même famille ».
- **Devis** : étapes à pictos dans l'encadré, « Aucun paiement à cette étape ».
- **Système** : jeu unique de pictogrammes SVG (trait 1,7 px), boutons ≥ 52 px de haut (58 px pour les principaux), feuille `assets/ui.css` chargée après les styles existants, sélecteur HT/TTC disponible sur toutes les pages (`prix.js` chargé partout), apparitions déclenchées seulement si l'onglet est visible au chargement.
- TVA : taux de **20 % pour tous les produits** confirmé par le propriétaire le 11 octobre 2026 (`vatRateConfirmed: true`) ; la mention « taux à confirmer » disparaît des fiches et du catalogue, et ce point ne bloque plus le build de production.
- Les engagements affichés reprennent uniquement des faits déjà établis : demande sans engagement et sans paiement en ligne, prix HT et TTC, version avec logo sur les textiles. Aucun délai, avis ou certification n'a été ajouté.
