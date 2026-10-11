# Historique du projet BBD Officiel

Ce document transmet à Claude Code le contexte fonctionnel et les décisions prises avant la passation. Il complète l'historique Git : les échanges de conception antérieurs ne sont pas reproduits mot pour mot, mais leurs conséquences utiles sont consolidées ici et dans les fichiers de données.

## Origine et objectif

Le propriétaire a demandé un site BBD Officiel destiné principalement aux visiteurs rencontrés sur des salons et arrivant par QR code. Le site devait dépasser une simple landing page, présenter plusieurs univers et offres, susciter l'intérêt de cibles différentes et favoriser la demande de devis.

Les contraintes initiales étaient : coût nul au démarrage, hébergement gratuit envisagé sur Netlify, expérience mobile prioritaire, administration simple et évolution progressive à mesure que les contenus réels seraient transmis.

Le cahier des charges initial est conservé dans `handoff/Cahier_des_charges_BBD_Officiel.md`. Les informations confirmées ultérieurement par le propriétaire ont priorité.

## Construction de l'identité

Plusieurs propositions de logos BBD ont été fournies. La direction retenue utilise une identité sobre et premium : ivoire, noir ou vert très profond et vert sauge. Les fichiers effectivement utilisés sont conservés dans `assets/`.

La signature visuelle « Histoire · Expérience · Qualité » provient des propositions de marque fournies. Le site utilise des polices système et Georgia afin de rester gratuit et indépendant de services distants.

## Structure fonctionnelle réalisée

Le projet est devenu un site statique multipage généré avec Node.js, sans framework ni dépendance npm externe. Il comprend :

- un accueil éditorial et animé ;
- trois univers : Éleveurs, Clubs et Événements ;
- un catalogue organisé par familles ;
- des fiches produits avec choix avec ou sans logo ;
- un calcul des quantités et montants HT par lots ;
- un formulaire de devis prérempli selon le parcours ;
- les pages personnalisation, à propos, confidentialité, mentions légales, merci et 404 ;
- les fichiers techniques prévus pour Netlify.

Le parcours principal défini est : découvrir, comprendre, demander un devis, échanger, puis valider. Aucun paiement en ligne n'est prévu au lancement.

## Produits transmis et intégrés

Les produits ont été ajoutés progressivement avec leurs photographies et tarifs confirmés en euros HT :

1. **Parka Élysée** (d'abord nommée « Parka molletonnée ») : 69 € HT sans logo ou 79 € HT avec logo, par lot de quatre ; noir, bleu et kaki, S à XXL, intérieur aspect polaire, 6 visuels de détail. Renommée le 11 octobre 2026.
2. **Parka Matignon** (d'abord nommée « Parka imperméable ») : 69 € HT sans logo ou 79 € HT avec logo, par lot de quatre ; noir et bleu, S à XXL, coupe longue. Renommée le 11 octobre 2026 d'après le descriptif du propriétaire, qui ne mentionne pas d'imperméabilité.
3. **Doudoune sans manches rétro** (d'abord nommée « rétro-réfléchissante ») : 39 € HT sans logo ou 49 € HT avec logo, par lot de quatre. Nom et tarif (initialement 49/59 € HT) corrigés par le propriétaire le 11 octobre 2026, même photo ; coupe slim, taille petit, S à XXL.
4. **Doudoune sans manches capuche garde bleu** (d'abord nommée « à capuche amovible ») : 39 € HT sans logo ou 49 € HT avec logo, par lot de quatre. Le tarif initial de 49/59 € HT a été corrigé par le propriétaire le 11 octobre 2026 ; tailles S à XXL, composition et entretien ajoutés.
5. **Doudoune sans manches Bac** : 25 € HT sans logo ou 35 € HT avec logo, par lot de quatre. Les premiers fichiers reçus n'étaient pas exploitables ; quatre photos (noir, gris, beige, bleu) reçues le 11 octobre 2026, S à XXL.
6. **Sweat zippé Bourget bleu marine** : 39 € HT sans logo ou 49 € HT avec logo, par lot de quatre ; tailles XS à XXXL, 70 % coton / 30 % polyester.
7. **Sweat zippé Bourget noir** : mêmes tarifs et caractéristiques que le bleu.
8. **BB Bed Confort & Bien-être 100 × 150 cm** (accessoires) : lot de 3 à 35 € l'unité, lot de 10 à 31,50 € l'unité (10 pour le prix de 9) ; 3 motifs, 17 coloris. Base HT ou TTC à confirmer.
9. **Oreille de porc naturelle** (friandises & récompenses) : lot de 100 pièces à 100 €, soit 1 € la pièce. Base HT ou TTC à confirmer.
10. **Oreille de bœuf naturelle** et 11. **Oreille de bœuf avec poils** : lot de 50 pièces à 90 €, soit 1,80 € la pièce.
12. **Trachée de bœuf naturelle**, 13. **Pattes de poulet soufflées** et 14. **Pattes de poulet naturelles** : vendues au kilo, 20 € le kilo.
15. **Oreille de lapin avec poils** : vendue au kilo, 35 € le kilo (le titre de tarif reçu mentionnait par erreur la trachée).
16. **Sprat séché naturel** : vendu au kilo, 45 € le kilo.
17. **Cou de poulet naturel** : vendu au kilo, 20 € le kilo.
Base HT ou TTC de toutes les friandises à confirmer.

`data/products.json` constitue la source exécutable de référence. Les noms normalisés des images intégrées sont dans `assets/`.

Le terme rétro-réfléchissant venait du premier nom communiqué ; le propriétaire nomme désormais ce modèle « Doudoune sans manches rétro ». Aucune propriété réfléchissante, certification ni fonction d'équipement de protection ne doit être déduite sans document fournisseur.

## Enrichissement visuel

Après la première recette, le propriétaire a demandé un site plus dynamique et plus attractif, avec des visuels capables de donner envie. Deux campagnes visuelles ont alors été créées et intégrées :

- `assets/campagne-salon-bbd.jpg` ;
- `assets/campagne-club-bbd.jpg`.

Ce sont des images générées servant de mise en situation. Elles doivent toujours rester accompagnées de la mention visible « Mise en scène illustrative » et ne jamais être présentées comme des réalisations client.

L'accueil a également reçu un rail horizontal de produits, des apparitions progressives au défilement et un effet de profondeur léger. Ces effets respectent `prefers-reduced-motion` et le contenu reste utilisable sans JavaScript.

## Formules et contenus provisoires

Les formules « Signature Élevage », « Esprit Club » et « Temps Fort » ont été créées comme exemples fictifs pour construire la structure. Elles ne sont pas des offres commerciales validées et doivent conserver une indication claire de leur caractère provisoire.

Les textes légaux, coordonnées, caractéristiques détaillées, délais, transport, tailles, couleurs, techniques de marquage, témoignages et réalisations ne doivent pas être inventés. `data/site.json` contient les champs et validations restant à compléter.

## Formulaire et publication

En local, le formulaire sert à la recette et ne transmet aucune donnée. La cible prévue est Netlify Forms, après fourniture d'une adresse de réception réelle et réalisation d'un test complet.

Le build de production se bloque volontairement tant que les informations publiques, juridiques et de confidentialité ne sont pas complètes et validées. Ce blocage ne doit pas être contourné.

Le dépôt GitHub `dogbakoudou17-dotcom/bbd-officiel` est désormais la source de vérité. `main` contient le projet courant et `handoff-2026-10-11` conserve le premier état transféré à Claude Code. Le dépôt a été créé public par son propriétaire.

## État au moment de la reprise

- 24 pages générées ;
- 7 produits ;
- 721 liens et ressources internes contrôlés ;
- aucune dépendance npm externe ;
- aperçu local disponible avec `npm run preview` ;
- sources, médias utilisés, documentation et cahier des charges présents dans le dépôt ;
- prochaine phase : recevoir et intégrer de nouveaux fichiers produit ou contenus fournis par le propriétaire.

## Ce que Claude Code doit comprendre

Le projet doit évoluer par intégrations successives, sans effacer le travail existant. Chaque nouvel envoi doit être examiné, associé au bon contenu, intégré dans les données et les composants, vérifié visuellement, testé puis documenté. En cas d'incertitude commerciale ou d'association ambiguë entre un fichier et un produit, demander une précision ciblée. Pour les choix techniques réversibles, avancer de manière autonome.

