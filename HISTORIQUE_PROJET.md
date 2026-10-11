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

1. **Parka molletonnée** : 69 € HT sans logo ou 79 € HT avec logo, par lot de quatre.
2. **Parka imperméable** : 69 € HT sans logo ou 79 € HT avec logo, par lot de quatre.
3. **Doudoune rétro-réfléchissante** : 49 € HT sans logo ou 59 € HT avec logo, par lot de quatre.
4. **Doudoune sans manches à capuche amovible** : 49 € HT sans logo ou 59 € HT avec logo, par lot de quatre.
5. **Doudoune sans manches** : 25 € HT sans logo ou 35 € HT avec logo, par lot de quatre. Les deux fichiers reçus n'étaient pas exploitables ; la fiche affiche donc « Photo à venir ».
6. **Sweat zippé bleu** : 39 € HT sans logo ou 49 € HT avec logo, par lot de quatre.
7. **Sweat zippé noir** : 39 € HT sans logo ou 49 € HT avec logo, par lot de quatre.

`data/products.json` constitue la source exécutable de référence. Les noms normalisés des images intégrées sont dans `assets/`.

Le terme rétro-réfléchissant vient du nom communiqué par le propriétaire. Aucune certification ni fonction d'équipement de protection ne doit être déduite sans document fournisseur.

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

