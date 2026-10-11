# Passation à Claude Code — BBD Officiel

**Date de l’état transmis :** 11 octobre 2026  
**Statut :** prévisualisation locale fonctionnelle, non publiée  
**Dossier de travail :** racine de cette archive

## Dépôt Git de référence

Le dossier est initialisé comme dépôt Git sur la branche `main`. Le commit initial de passation et le tag `handoff-2026-10-11` figent exactement l'état fonctionnel transmis. Claude Code doit travailler dans ce dépôt, créer des commits pour les évolutions et ne jamais réinitialiser l'historique sans demande explicite.

L'identité Git locale `BBD Officiel <bbd-officiel@local.invalid>` est une identité technique provisoire utilisée uniquement pour figer la passation. La remplacer par l'identité du propriétaire avant les prochains commits.

Le dépôt distant GitHub doit être privé au départ. Aucun secret, accès Netlify ou donnée de formulaire ne doit être ajouté au dépôt.

## Résultat actuel

Le projet contient un site multipage statique en français destiné à convertir les visiteurs venant notamment de QR codes de salons en demandes de devis qualifiées.

Le rendu actuel comprend :

- accueil éditorial et animé ;
- univers Éleveurs, Clubs et Événements ;
- catalogue par familles ;
- sept références textiles et leurs calculs par lots ;
- fiches produits avec sélection avec ou sans logo ;
- formulaire de devis conditionnel et prérempli ;
- personnalisation, à propos, confidentialité, mentions légales, merci et 404 ;
- deux campagnes photographiques illustratives ;
- navigation mobile et effets progressifs respectant la réduction des animations ;
- sitemap, robots, redirections et en-têtes Netlify.

## Produits enregistrés

| Produit | Sans logo | Avec logo | Condition |
| --- | ---: | ---: | --- |
| Parka Élysée (ex « Parka molletonnée ») | 69 € HT/pièce | 79 € HT/pièce | lot de 4, noir, bleu et kaki |
| Parka Matignon (ex « Parka imperméable ») | 69 € HT/pièce | 79 € HT/pièce | lot de 4, noir et bleu |
| Doudoune sans manches rétro (ex « rétro-réfléchissante ») | 39 € HT/pièce | 49 € HT/pièce | lot de 4 — tarif corrigé le 11/10/2026 |
| Doudoune sans manches capuche garde bleu (ex « à capuche amovible ») | 39 € HT/pièce | 49 € HT/pièce | lot de 4 — tarif corrigé le 11/10/2026 |
| Doudoune sans manches Bac | 25 € HT/pièce | 35 € HT/pièce | lot de 4, 4 coloris photographiés |
| Sweat zippé Bourget bleu marine | 39 € HT/pièce | 49 € HT/pièce | lot de 4 |
| Sweat zippé Bourget noir | 39 € HT/pièce | 49 € HT/pièce | lot de 4 |
| BB Bed Confort & Bien-être 100 × 150 | 35 € HT/unité (lot de 3) | 31,50 € HT/unité (lot de 10) | base HT/TTC à confirmer |
| Oreille de porc naturelle | 1 € HT/pièce (lot de 100) | — | base HT/TTC à confirmer |
| Oreille de bœuf naturelle | 1,80 € HT/pièce (lot de 50) | — | base HT/TTC à confirmer |
| Oreille de bœuf avec poils | 1,80 € HT/pièce (lot de 50) | — | base HT/TTC à confirmer |
| Trachée de bœuf naturelle | 20 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Pattes de poulet soufflées | 20 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Pattes de poulet naturelles | 20 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Oreille de lapin avec poils | 35 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Sprat séché naturel | 45 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Cou de poulet naturel | 20 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Sabot de veau naturel | 0,45 € HT/pièce (lot de 100) | — | base HT/TTC à confirmer |
| Tendon de bœuf naturel | 25 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |
| Aile de poulet naturelle | 15 € HT/kg | — | vente au kilo, base HT/TTC à confirmer |

Les données exécutables font foi dans `data/products.json`.

## Décisions de conception déjà prises

- Identité ivoire, noir/vert très profond et vert sauge, inspirée des logos fournis.
- Typographie système et Georgia : aucune police distante ni abonnement.
- Site statique maintenable, sans framework ni dépendance client lourde.
- Formules « Signature Élevage », « Esprit Club » et « Temps Fort » utilisées uniquement comme exemples fictifs de maquette.
- Tarifs affichés en HT, avec total de lot calculé côté navigateur.
- Pas de vente à l’unité garantie, de délais ou de caractéristiques fournisseur inventés.
- Images générées explicitement signalées comme illustratives.
- L’illustration canine du premier écran est un SVG intégré au générateur.

## Ce qui reste à obtenir du propriétaire

- coordonnées publiques et adresse de réception des devis ;
- raison sociale, adresse, immatriculation, directeur de publication, TVA et autres mentions légales ;
- base juridique, destinataires, durée de conservation et texte d’exercice des droits ;
- URL publique définitive et accès au compte Netlify ;
- validation formelle des contenus commerciaux et légaux ;
- tailles, coloris, compositions, disponibilités, techniques de marquage, transport et délais ;
- photo exploitable de la doudoune sans manches ;
- droits de publication définitifs des photographies et logos ;
- éventuelles réalisations, témoignages et événements réels autorisés.

## Garde-fous de mise en production

Le build de production contrôle les valeurs suivantes dans `data/site.json` : URL, e-mail, identité, adresse, immatriculation, directeur, forme juridique, contact vie privée, conservation, base juridique, destinataires, transferts, droits, hébergeur et quatre validations booléennes.

Le formulaire local sert uniquement à la recette. Pour Netlify :

1. construire une version de test avec `node build.mjs --staging` ;
2. déployer sur un environnement non public ou de test ;
3. vérifier la détection du formulaire `devis-bbd` ;
4. configurer la notification vers l’adresse définitive ;
5. envoyer uniquement des données de test ;
6. vérifier le tableau de bord Netlify et l’e-mail reçu ;
7. renseigner les validations dans `data/site.json` seulement après recette.

## Tests exécutés

- génération de 24 pages ;
- contrôle de 721 liens et ressources internes ;
- un H1 par page et titres uniques ;
- syntaxe JavaScript ;
- préremplissage produit/version/quantité du devis ;
- calculs des lots et tarifs HT ;
- formulaire d’aperçu sans transmission ;
- contrôles visuels desktop et mobile lors des étapes de développement ;
- blocage attendu du build de production tant que les données finales manquent.

Consulter `RECETTE.md` pour le journal détaillé.

## Première action recommandée dans Claude Code

1. Ouvrir cette racine dans Claude Code.
2. Lui demander de lire `CLAUDE.md` et `HANDOFF_CLAUDE_CODE.md` intégralement.
3. Exécuter `npm run build` puis `npm run check` sans modifier le code.
4. Lancer `npm run preview` et comparer l’accueil à `dist/index.html`.
5. Continuer ensuite avec la prochaine information commerciale ou correction fournie par le propriétaire.

## Emplacement du cahier des charges

Une copie du document initial est conservée dans `handoff/Cahier_des_charges_BBD_Officiel.md`. Ce document contient le cadrage de départ. Les instructions utilisateur ultérieures et les données actuelles du projet ont priorité en cas d’écart.
