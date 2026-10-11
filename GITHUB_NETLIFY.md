# GitHub et Netlify — procédure de reprise

## Source de vérité

Le dépôt Git est la source de vérité de Claude Code. La branche principale est `main` et le point de départ est marqué par le tag `handoff-2026-10-11`.

Créer un dépôt GitHub **privé** vide nommé `bbd-officiel`, sans README, licence ni `.gitignore`, puis relier ce dossier :

```powershell
git remote add origin URL_DU_DEPOT_GITHUB
git push -u origin main
git push origin handoff-2026-10-11
```

Claude Code pourra ensuite cloner le dépôt, lire `CLAUDE.md` et reprendre le rendu ainsi que l'historique exact.

## Déploiement Netlify

Connecter Netlify au dépôt GitHub seulement après avoir renseigné et validé les informations réelles dans `data/site.json`.

- commande de build : `npm run build:production`
- dossier publié : `dist`
- configuration : `netlify.toml`
- formulaire attendu : `devis-bbd`

Avant la publication publique :

1. compléter les coordonnées, mentions légales et informations de confidentialité ;
2. confirmer l'adresse de réception des devis ;
3. exécuter `npm run build:production` ;
4. tester le formulaire sur une URL de préproduction ;
5. vérifier l'e-mail reçu et le tableau de bord Netlify ;
6. générer le QR code uniquement avec l'URL publique définitive.

Le build de production se bloque volontairement si les données obligatoires ou leurs validations sont absentes.
