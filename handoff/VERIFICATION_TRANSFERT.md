# Vérifier le transfert dans Claude Code

Après extraction de l’archive :

```powershell
npm run handoff:manifest
npm run build
npm run check
node --check assets/app.js
```

`npm run handoff:manifest` régénère `FILE_INVENTORY.sha256`. Pour vérifier strictement une archive avant toute modification, conserver une copie du manifeste livré puis comparer les deux fichiers.

Le manifeste couvre les sources, médias, documentation et fichiers générés présents dans le dossier au moment de sa création. Il exclut le manifeste lui-même ainsi que les dossiers locaux `.git`, `.netlify` et `node_modules`.

Résultat de référence au 11 octobre 2026 :

- 24 pages générées ;
- 7 produits ;
- 721 liens et ressources internes valides ;
- aucune dépendance npm externe ;
- formulaire local sans transmission ;
- build de production bloqué jusqu’aux validations finales.
