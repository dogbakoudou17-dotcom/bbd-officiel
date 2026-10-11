# BBD Officiel — Première base du site

Site statique en français, HTML/CSS/JavaScript natifs. Aucun abonnement, bibliothèque payante, police distante ni service de génération requis pour le faire fonctionner. Node.js sert uniquement à fabriquer les pages et à afficher l’aperçu local.

## Consulter le site

Sous Windows, ouvrir **LANCER.cmd**, puis consulter http://127.0.0.1:4173/ . Node.js doit être installé. Le serveur actuel doit être arrêté avant d’en lancer un second sur ce port.

Autrement, dans ce dossier :

```sh
npm run build
npm run preview
```

L’adresse locale fonctionne sur l’ordinateur qui exécute le serveur. Ce n’est pas une adresse publique destinée à un QR code de salon.

## Contenu de cette version

- Accueil, trois univers distincts (éleveurs, clubs, événements).
- Solutions avec filtres de familles, quatre pages de familles.
- Trois compositions fictives : Signature Élevage, Esprit Club, Temps Fort.
- Première référence fournie : parka molletonnée et photo du client. Catalogue actuel : sept textiles et le BB Bed (accessoires) ; voir les sections d’ajout ci-dessous.
- Prix confirmés par le client : 69 € **HT** par pièce sans logo, 79 € **HT** avec logo. Lots de quatre : 276 € HT ou 316 € HT. Calculateur de lots, sans paiement.
- Personnalisation, à propos, formulaire de devis, confirmation, page 404 et brouillons légaux.
- Logos originaux fournis par le client : version horizontale sombre, claire et signature. Les fichiers PNG originaux sont conservés sans retouche. Le site affiche des copies web dérivées : `logo-bbd-web.png` et `logo-bbd-clair-web.png` (mot-symbole recadré, fond transparent, 16 et 23 Ko) et `logo-signature-web.jpg` (800 px, 28 Ko).
- Illustration canine originale de principe, distincte des photographies réelles.

Le formulaire d’aperçu **n’envoie aucune donnée**, et ne prétend pas confirmer une réception. Le bouton permet de vérifier les champs et le parcours. La sélection de la parka (version et quantité) est préremplie dans le formulaire. Un paramètre `campagne` est transmis de page en page uniquement par l’URL, sans stockage local ni cookie publicitaire.

## Modifier les informations

| Fichier | Contenu |
| --- | --- |
| `data/site.json` | Coordonnées, URL finale et données légales |
| `data/formulas.json` | Noms, descriptions et compositions des formules |
| `data/products.json` | Produits, tarifs, visuels et conditions |
| `build.mjs` | Textes des pages, structure et composants HTML |
| `assets/style.css` | Mise en page, mobile, formulaires |
| `assets/brand.css` | Identité graphique, logos, fiche parka |
| `assets/app.js` | Menu, filtres, champs conditionnels et calculateur |

Après une modification, lancer `npm run build`, puis rafraîchir le navigateur. Les fichiers de `dist/` sont générés : ne pas les modifier directement. Les offres non confirmées (`confirmed: false`) ne sont affichées que dans l’aperçu.

Pour remplacer une photo, déposer la nouvelle image autorisée dans `assets/`, actualiser `image` et `alt` dans le produit puis reconstruire. La fiche parka possède un calculateur adapté aux lots et aux deux tarifs. Pour une autre structure tarifaire, adapter le composant produit dans `build.mjs` plutôt que remplir des montants supposés.

## Mise en ligne gratuite, à réaliser quand le contenu est prêt

1. Utiliser un compte **Netlify Free**, un dépôt Git et le sous-domaine gratuit `netlify.app`. Aucun nom de domaine payant n’est nécessaire. Garder les options et services payants désactivés.
2. Connecter ce dossier source au dépôt ; Netlify utilise `netlify.toml`. Le code n’a aucune dépendance npm à télécharger.
3. Compléter l’identité de l’entreprise, le contact, les contenus légaux et les conditions commerciales. Les brouillons actuels ne constituent pas des textes légaux définitifs. Vérifier les droits des images, les options de parka, tailles, livraison et modalités de marquage.
4. Pour tester Netlify Forms sur un déploiement de test, utiliser `node build.mjs --staging`. Ce mode conserve `noindex`, active la déclaration HTML `data-netlify` et permet un **vrai envoi de test**. Ne pas diffuser cette version comme un site final. Utiliser uniquement des données de test.
5. Dans Netlify, activer la détection des formulaires, déployer, vérifier la présence du formulaire `devis-bbd`, configurer l’adresse de notification définitive puis tester réception dans le tableau de bord et notification par e-mail. Tester depuis l’accueil, un univers et la fiche parka, avec contexte. Tester également l’erreur réseau et le parcours sans JavaScript.
6. Une fois ces contrôles et la validation des contenus terminés, renseigner les drapeaux correspondants dans `data/site.json`. `npm run build:production` refuse de produire la version publique tant que les données requises ne sont pas validées.
7. Renseigner l’URL définitive dans `data/site.json` : les canoniques et le sitemap seront générés. Les pages d’aperçu sont exclues du sitemap. L’aperçu reste entièrement désindexé.
8. Tester les navigateurs et appareils réellement ciblés, l’accessibilité et les performances avant diffusion en salon.

Les demandes réelles se retrouvent dans l’interface **Forms** du projet Netlify. Une notification e-mail doit être configurée séparément ; ajouter une adresse dans `site.json` ne configure pas cette notification.

Au 5 octobre 2026, le forfait Free consulté prévoit un plafond de **300 crédits par mois**. La gratuité est soumise à ce quota ; elle n’est pas une garantie d’hébergement illimité. Sources officielles :

- https://www.netlify.com/pricing/
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/usage-and-billing/

## QR code de salon

Le QR devra pointer vers l’URL publique définitive, par exemple `https://VOTRE-SITE.netlify.app/?campagne=salon-2026`. Conserver une adresse stable et un identifiant de campagne sans donnée personnelle. Ne pas imprimer un QR vers `localhost` ou un aperçu temporaire. Le QR final sera généré une fois cette URL connue ; aucun service de QR dynamique payant n’est nécessaire.

## Vérifications

`npm run check` contrôle les liens internes, ressources, titres uniques, H1 et les prix du produit. Voir `RECETTE.md` pour les contrôles effectués et les limites de cette livraison.

Les objectifs WCAG 2.2 AA et Core Web Vitals sont des cibles de recette, pas des certifications acquises. Des copies web légères des logos sont en place ; un export SVG fourni par la marque resterait préférable avant mise en ligne.

## Ajout des textiles
Le catalogue compte maintenant quatre références et 21 pages. Ajouts : parka imperméable (69/79 EUR HT), doudoune rétro-réfléchissante (49/59 EUR HT), doudoune sans manches à capuche amovible (49/59 EUR HT). Prix par pièce, sans/avec logo, lots de quatre. Correspondance des quatre nouvelles photos proposée au client et à confirmer. Les deux photos IMG_0726 et IMG_0727 sont associées provisoirement à la parka ; le gilet gris à la doudoune rétro-réfléchissante et le bleu à la capuche amovible.

## Doudoune sans manches — ajout
Cinquième référence distincte de la version à capuche amovible : 25 € HT sans logo / 35 € HT avec logo par pièce, par lot de quatre (100 / 140 € HT). Les deux pièces jointes reçues ne contiennent chacune qu’un octet ; aucune photo exploitable. La fiche affiche « Photo à venir ». Ajouter le chemin `image` et le texte `alt` dans les données dès réception des photos.

## Sweats zippés bleu et noir
Deux références ajoutées, avec deux photos originales chacune (IMG_0723/0722 pour bleu, IMG_0724/0725 pour noir). Tarifs interprétés dans la continuité des références précédentes : 39 € HT par pièce sans logo et 49 € HT avec logo, commande par lots de quatre (156 / 196 € HT). Catalogue : sept références, 24 pages.

## Mise en scène et mouvements de l’accueil

Deux visuels de campagne ont été créés avec l’outil ImageGen intégré, à partir des photographies produits fournies :

- `assets/campagne-salon-bbd.jpg` : panorama d’un événement canin, sweat bleu et parka sombre ;
- `assets/campagne-club-bbd.jpg` : préparation d’un chien en équipe, doudoune sans manches et sweat noir.

Ces images sont identifiées sur le site comme des **mises en scène illustratives**. Elles ne doivent pas être présentées comme des réalisations client. Les fichiers ont été convertis en JPEG optimisés pour limiter leur poids sur mobile.

L’accueil comporte désormais une narration photographique, un rail tactile de six produits, des apparitions progressives au défilement et un effet de profondeur léger sur les visuels. Tout le contenu reste accessible sans JavaScript. Les mouvements sont désactivés lorsque le navigateur indique une préférence de réduction des animations.

Prompts finaux : photographie éditoriale premium lors d’un événement canin, avec vêtements conformes aux références, puis scène verticale de préparation d’un chien par deux membres d’un club. Palette ivoire, noir, bleu marine et vert sauge ; sans texte, sans filigrane et sans faux logo dans l’image.

## BB Bed et prix HT / TTC

Huitième référence, première de la famille **Accessoires & objets** : BB Bed Confort & Bien-être 100 × 150 cm. Textes (description, « Les + produit », utilisation, entretien) repris du descriptif fourni. Tarifs : lot de 3 à 35 € par unité (105 €), lot de 10 à 31,50 € par unité (315 €, « 10 pour le prix de 9 »). Pas de version avec logo communiquée : aucune personnalisation n’est annoncée.

- **Photos** : 19 photos reçues (3 motifs : Camou, Double patte, Tetris ; 17 coloris et 2 vues de gamme). Originaux conservés dans `sources/bb-bed/` (non publiés), copies web 1000 × 750 (≈ 170 Ko) et miniatures 240 × 180 (≈ 12 Ko) dans `assets/bb-bed-*.jpg`. Le fichier reçu « TETRIX BLEU » est traité comme Tetris bleu, « FUSHIA » comme fuchsia.
- **Fiche** : galerie par motif ; la vignette choisie remplace la grande photo et renseigne le champ « Motif et coloris », transmis au devis (champ caché `coloris`). Le mélange de coloris dans un lot reste « à préciser dans le devis ».
- **Prix HT / TTC sur toutes les fiches** : sélecteur « HT · professionnels / TTC · particuliers ». Le prix choisi est mis en avant, l’autre reste affiché juste en dessous ; le calculateur suit le même ordre. Choix mémorisé sur l’appareil du visiteur (`localStorage`, appliqué avant affichage par `assets/prix.js`). Sans JavaScript : HT en avant et « soit … TTC ».
- **TVA** : taux dans `data/site.json` (`vatRate`, 20 %). Le build de production reste bloqué tant que `vatRateConfirmed` n’est pas `true` : à confirmer selon le régime de BBD Officiel (une franchise en base de TVA changerait l’affichage).
- **Base des tarifs BB Bed** : le descriptif ne précise pas HT ou TTC. Les montants sont traités comme HT, comme le reste du catalogue ; `taxStatus` signale ce point à préciser et bloque la production. S’ils sont TTC, modifier les montants dans `offers`.
- Calculs partagés par `build.mjs` et `check.mjs` dans `pricing.mjs`. Les offres d’un produit sont soit déclarées (`offers`), soit déduites de `unitPlain` / `unitLogo` / `packSize`.
- Le rail « Le vestiaire BBD » de l’accueil ne présente que les textiles.

## Rubriques détaillées des fiches

Un produit peut recevoir un tableau `sections` (`title`, `items`, `open` facultatif) affiché en rubriques dépliables : utilisé pour « Détails du produit », « Taille & coupe » et « Composition & entretien » de la doudoune capuche garde bleu (tarif corrigé à 39/49 € HT le 11/10/2026) et des sweats zippés Bourget.
