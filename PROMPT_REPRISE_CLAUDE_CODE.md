# Brief de reprise autonome pour Claude Code

Tu reprends le projet **BBD Officiel** exactement dans son état actuel. Le dépôt GitHub `dogbakoudou17-dotcom/bbd-officiel`, branche `main`, est la source de vérité. La branche `handoff-2026-10-11` conserve le point de reprise initial. Ne lance aucune refonte générale et ne remplace pas l'identité visuelle existante sans demande explicite.

## 1. Prendre connaissance du projet

Lis intégralement, dans cet ordre :

1. `CLAUDE.md` ;
2. `HANDOFF_CLAUDE_CODE.md` ;
3. `README.md` ;
4. `RECETTE.md` ;
5. `handoff/Cahier_des_charges_BBD_Officiel.md` ;
6. `data/products.json`, `data/formulas.json` et `data/site.json`.

Les demandes récentes du propriétaire et les données actuellement enregistrées ont priorité sur le cahier des charges initial en cas d'écart.

## 2. Vérifier l'état reçu avant toute évolution

Exécute :

```powershell
npm run build
npm run check
node --check assets/app.js
```

Le résultat de référence est de **24 pages**, **7 produits** et **721 liens ou ressources internes valides**. Lance ensuite `npm run preview` et vérifie au minimum :

- l'accueil sur ordinateur et mobile ;
- la navigation et le menu mobile ;
- le catalogue textile ;
- une fiche produit, les versions avec et sans logo et le calcul par lots ;
- le préremplissage du formulaire de devis ;
- les images, textes alternatifs et mentions « Mise en scène illustrative ».

Si le résultat diffère de cette référence avant tes modifications, diagnostique et corrige l'écart avant de poursuivre.

## 3. Prochaine étape : intégrer les nouveaux fichiers transmis

À chaque nouvel envoi du propriétaire :

1. inventorier tous les fichiers reçus et les examiner avant de les modifier ;
2. associer chaque image ou document au bon produit uniquement lorsque cette association est certaine ;
3. demander une précision seulement si une ambiguïté peut conduire à publier une mauvaise information ;
4. conserver les originaux et créer, si nécessaire, des copies web optimisées avec des noms descriptifs ;
5. enregistrer les données produit dans `data/products.json` plutôt que de les dupliquer dans les pages ;
6. modifier les composants ou contenus dans `build.mjs`, jamais directement dans `dist/` ;
7. ajouter des textes alternatifs factuels et ne pas inventer de caractéristiques visibles ou commerciales ;
8. reconstruire le site, contrôler les liens, puis vérifier visuellement les pages concernées ;
9. mettre à jour `README.md` et `RECETTE.md` lorsque l'évolution est substantielle ;
10. créer un commit Git clair et pousser le résultat sur une branche de travail ou sur `main` selon la consigne reçue.

Lorsque plusieurs fichiers sont indépendants, traite-les de manière autonome et regroupe les questions restantes à la fin. Ne t'arrête pas après une simple analyse : réalise l'intégration, les contrôles et la documentation nécessaires.

## 4. Règles à préserver

- Travailler dans les sources ; `dist/` est généré par `npm run build`.
- Conserver les logos, les photographies fournies, la palette ivoire/noir/vert sauge et la direction éditoriale actuelle.
- Maintenir une expérience mobile rapide, accessible au clavier et compatible avec `prefers-reduced-motion`.
- Ne jamais inventer de prix, délai, taille, stock, coloris, matière, certification, livraison, témoignage ou réalisation.
- Tous les tarifs confirmés sont en euros HT et les minimums actuels sont gérés par lots de quatre.
- Les trois formules restent fictives et clairement identifiées comme exemples jusqu'à validation.
- Les campagnes générées restent signalées comme mises en scène illustratives.
- La doudoune sans manches conserve « Photo à venir » tant qu'une photo exploitable et clairement associée n'est pas fournie.
- Ne pas présenter la doudoune rétro-réfléchissante comme un équipement de protection ou un produit certifié sans justificatif.
- Ne stocker aucun mot de passe, jeton, accès Netlify ou donnée client dans Git.

## 5. Publication et formulaire

L'aperçu local ne transmet aucune donnée. Ne publie pas le site, n'active pas l'envoi réel du formulaire et ne contourne pas `npm run build:production` tant que les éléments suivants ne sont pas fournis et validés :

- coordonnées publiques et adresse de réception des devis ;
- identité juridique et mentions légales ;
- informations de confidentialité ;
- droits définitifs de publication des médias ;
- URL publique et configuration Netlify ;
- validations correspondantes dans `data/site.json`.

## 6. Définition d'un travail terminé

Une évolution est terminée lorsque :

- les nouveaux fichiers sont correctement classés et reliés aux bonnes pages ;
- les sources et données sont cohérentes ;
- `npm run build`, `npm run check` et `node --check assets/app.js` réussissent ;
- les parcours concernés ont été vérifiés visuellement sur ordinateur et mobile ;
- aucun contenu provisoire n'est présenté comme définitif ;
- la documentation de recette reflète le nouvel état ;
- le dépôt Git est propre et le commit est identifiable.

Commence maintenant par vérifier l'état du dépôt. Ensuite, traite chaque nouveau fichier transmis par le propriétaire jusqu'à intégration complète, en respectant ces règles.

