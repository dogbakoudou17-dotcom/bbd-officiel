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
- Exports web optimisés des logos d’origine, et validation de l’URL publique avant génération du QR code à imprimer.

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
