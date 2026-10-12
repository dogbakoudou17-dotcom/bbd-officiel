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

## Phase actuelle : préproduction (12/10/2026)

Le propriétaire a choisi une préproduction avant la mise en ligne définitive. `netlify.toml` publie donc la version « aperçu » (`npm run build`) : bandeau « Aperçu de travail », balise et en-tête `noindex`, formulaire sans envoi. L'adresse `xxx.netlify.app` peut servir aux tests sur téléphone et à un QR code **de test** uniquement.

Raccordement (fait par le propriétaire, sur son compte) : Netlify → Add new site → Import an existing project → GitHub → `bbd-officiel` → branche `main`. Netlify lit `netlify.toml` : ne rien modifier dans les champs de build.

## Déploiement Netlify définitif

Passer en définitif seulement après avoir renseigné et validé les informations réelles dans `data/site.json`, puis : remettre `command = "npm run build:production"` dans `netlify.toml` et supprimer l'en-tête `X-Robots-Tag`.

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
