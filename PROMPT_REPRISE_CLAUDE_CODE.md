# Prompt prêt à coller dans Claude Code

Reprends le projet BBD Officiel exactement dans son état actuel. Commence par lire intégralement `CLAUDE.md`, `HANDOFF_CLAUDE_CODE.md`, `README.md`, `RECETTE.md` et `handoff/Cahier_des_charges_BBD_Officiel.md`. N’effectue encore aucune refonte.

Exécute d’abord `npm run build`, `npm run check` et `node --check assets/app.js`. Lance ensuite `npm run preview` et vérifie l’accueil, le catalogue textile, une fiche produit avec calcul par lots et le formulaire de devis. Signale toute différence entre la documentation et le code.

Travaille dans les sources, jamais directement dans `dist/`. Préserve les logos, photos, tarifs HT et garde-fous de publication. Ne publie pas le site et n’active pas d’envoi réel tant que les coordonnées, les textes légaux, l’adresse de réception et les validations de `data/site.json` ne sont pas fournis.

Après cette vérification, attends ma prochaine instruction et poursuis le développement à partir de cette base.
