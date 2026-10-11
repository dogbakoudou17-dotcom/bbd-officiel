# Cahier des charges — Site BBD Officiel

**Version :** 1.0 — 5 octobre 2026  
**Destination :** équipe de conception et de développement / Codex  
**Statut :** cadrage prêt à développer, sous réserve des informations commerciales à fournir dans la section 17.

## 1. Vision et résultat attendu

Créer un site professionnel en français, rapide, élégant et très simple à utiliser, qui transforme la connaissance du monde canin de BBD Officiel en demandes commerciales qualifiées. Le site doit donner envie de travailler avec un spécialiste capable de conseiller, personnaliser et livrer des produits adaptés aux éleveurs, aux clubs et aux organisateurs d’événements.

Le site n'est pas une boutique à paiement immédiat au lancement. Les prix, minimums de commande, options de marquage et délais dépendront des produits et fournisseurs transmis ultérieurement. Le parcours principal est donc : **découvrir une solution → comprendre les possibilités → demander un devis pertinent → échanger avec BBD Officiel → valider une proposition**. Aucun prix, délai, remise, certification, avis client ou réalisation ne doit être inventé.

**Objectif principal :** augmenter le nombre de demandes de devis qualifiées.  
**Objectifs secondaires :** rendre les univers et l'offre immédiatement compréhensibles, valoriser l'expertise terrain, faciliter la prise de contact depuis une exposition, préparer l'ajout de nombreuses références sans refonte et favoriser les commandes récurrentes.

La promesse éditoriale proposée est : **« Vos projets canins prennent forme, à vos couleurs. »** Le sous-titre doit expliciter l'offre : **« Textiles, récompenses, accessoires et packs personnalisés pour les éleveurs, les clubs et les événements canins. »** Ces formulations pourront être ajustées après validation de la marque.

## 2. Publics et intentions

Le site doit proposer deux façons complémentaires d'entrer dans l'offre : **par profil** (« qui suis-je ? ») et **par besoin / produit** (« que cherche-je ? »). Ces deux classifications ne doivent pas se confondre.

| Profil | Besoin dominant | Réponse prioritaire du site |
|---|---|---|
| Éleveur | Affirmer l'identité de l'élevage et soigner l'accueil des adoptants | Textiles, cadeaux d'adoption, petites et moyennes séries, réassort |
| Club de race | Fédérer les adhérents et équiper les rassemblements | Tenues, objets aux couleurs du club, lots, packs événementiels |
| Club d'utilisation / de discipline | Identifier une équipe et récompenser l'activité | Tenues techniques, vêtements d'équipe, friandises, récompenses |
| Société canine / organisateur | Préparer un événement avec volumes et échéance | Dotations, équipements bénévoles, produits participants, livraison événementielle si disponible |
| Propriétaire ou passionné | Chercher un produit ou cadeau pertinent | Découverte de la gamme et contact, sans laisser croire que toutes les références sont vendues à l'unité |

La priorité commerciale reste B2B et associative. Le vocabulaire doit rester accessible aux visiteurs non professionnels.

## 3. Positionnement et règles de communication

BBD Officiel se présente comme un **partenaire spécialisé du monde canin**, présent sur le terrain et capable d'accompagner une commande personnalisée. Le site doit montrer cette proximité par des photos réelles, des exemples concrets et une explication claire du processus. Éviter les slogans génériques, les photographies de stock trompeuses et les promesses non vérifiées.

Les preuves à recueillir et publier seulement avec autorisation : réalisations photographiées, événements servis, témoignages attribués, logos de clients, chiffres d'expérience, exemples de délais tenus. Tant que ces éléments manquent, la page explique le savoir-faire et les étapes de travail sans simuler de preuve sociale.

Ton : professionnel, chaleureux, direct, connaissant les usages des expositions et des clubs. Chaque page doit répondre rapidement à quatre questions : **est-ce pour moi, que puis-je obtenir, comment cela se passe, quelle est la prochaine étape ?**

## 4. Périmètre et architecture du site

Le premier livrable est un **site multipage statique en HTML, CSS et JavaScript léger**, hébergé sur Netlify. Il doit comporter les pages suivantes :

1. **Accueil** — promesse, accès par profil, familles de produits, fonctionnement, preuves disponibles et appel au devis.
2. **Univers Éleveurs** — besoins courants, idées de produits et packs, commande régulière, demande préqualifiée.
3. **Univers Clubs** — clubs de race et d'utilisation, avec exemples adaptés à chacun sans dupliquer artificiellement les pages.
4. **Univers Événements** — organisateurs, sociétés canines, bénévoles, participants, dotations et contraintes de date.
5. **Catalogue / Nos solutions** — familles de produits et filtres simples ; uniquement les références réellement confirmées sont publiées.
6. **Personnalisation** — options de marquage confirmées, fichiers utiles, étapes de validation du visuel, limites éventuelles.
7. **Réalisations** — projets documentés et autorisés ; si aucun projet exploitable n'est encore disponible, cette page est masquée au lancement et remplacée par des exemples de configurations explicitement présentés comme tels.
8. **À propos** — histoire de BBD Officiel, expertise du terrain, modalités de contact et présence en événement lorsque vérifiée.
9. **Demander un devis** — formulaire accessible et rassurant, utilisable seul ou prérempli depuis une page d'univers ou de produit.
10. **Pages légales** — mentions légales, politique de confidentialité et, si nécessaire, politique de cookies. Les textes définitifs sont fournis ou validés par le responsable de l'activité.

Navigation principale recommandée : **Univers**, **Produits**, **Personnalisation**, **Réalisations** (si disponible), **À propos**, bouton **Demander un devis**. Pied de page : coordonnées, réseaux sociaux réellement actifs, liens légaux, rappel du contact. Un fil d'Ariane est prévu sur les pages profondes. Les URL doivent être lisibles et stables, par exemple `/univers/eleveurs/` ou `/produits/textiles/`.

## 5. Définition des univers

Chaque univers doit avoir un contenu propre : un besoin formulé dans les mots du visiteur, 3 à 5 cas d'usage, les familles de produits adaptées, un exemple de composition de pack sans prix inventé, les questions fréquentes spécifiques et un appel au devis portant le contexte choisi.

**Éleveurs :** visibilité de l'élevage en exposition, tenue d'équipe, coffret ou cadeau d'adoption, réassort. Décrire les contraintes possibles de petites séries sans promettre leur disponibilité.

**Clubs :** distinguer les clubs de race et les clubs de discipline au sein de la même page ou de sous-sections clairement identifiées. Couvrir membres, bénévoles, compétitions, adhésion et rassemblements.

**Événements :** partir de la date, du volume et des destinataires. Montrer comment préparer une demande pour les organisateurs, les exposants et les participants. La livraison sur site ne doit apparaître que comme option « selon faisabilité et devis » avant confirmation logistique.

**Produits transversaux :** un même produit peut figurer dans plusieurs univers, mais sa fiche de référence reste unique. Cette organisation évite les doublons et facilite l'ajout de gammes futures.

## 6. Modèle du catalogue évolutif

Prévoir dès le départ une structure de données simple et maintenable, par exemple un fichier JSON local ou des fichiers de contenu, afin qu'un nouveau produit puisse être ajouté sans réécrire la mise en page. Le site doit rester exportable et lisible sans service propriétaire de gestion de contenu.

Chaque référence pourra contenir : identifiant, nom public, famille, sous-famille, courte description orientée usage, publics concernés, visuels et textes alternatifs, variantes disponibles, personnalisation possible, quantité minimale, paliers indicatifs ou prix publiables **si confirmés**, délai indicatif **si confirmé**, statut (« disponible », « sur devis », « bientôt disponible »), informations utiles et ordre d'affichage.

Familles initiales proposées, à confirmer avec les produits transmis :

- **Textiles et tenues** : vêtements d'équipe, d'exposition, de club et de bénévoles.
- **Friandises et récompenses** : entraînement, concours, cadeaux canins ; ne publier composition, allergènes ou allégations qu'à partir des données fournisseur validées.
- **Accessoires et objets personnalisés** : sacs, gourdes, objets utiles, cadeaux et supports de marque.
- **Packs par usage** : Élevage, Équipe, Club, Événement ; les packs sont des compositions éditoriales et peuvent renvoyer à plusieurs familles.
- **Nouveautés / sur mesure** : espace éditorial facultatif pour une gamme future, sans annoncer des produits non disponibles.

Une fiche produit doit montrer d'abord le bénéfice et l'usage, puis les variantes, la personnalisation, les conditions confirmées et le bouton **Demander un devis pour ce produit**. Les filtres utiles au premier lancement sont famille, usage et public ; éviter les filtres vides ou trop fins. Aucun produit non confirmé ne doit apparaître comme commandable.

## 7. Parcours utilisateur et conversion

La page d'accueil doit permettre d'identifier l'offre en quelques secondes. Sur mobile comme sur ordinateur, le premier écran affiche la proposition de valeur, un visuel authentique et un CTA principal **Demander un devis**. Le CTA secondaire peut être **Explorer les univers**. Ne pas utiliser de carrousel automatique.

Le visiteur doit pouvoir :

- accéder à son univers en un clic depuis l'accueil ;
- rejoindre une famille de produits en un clic depuis la navigation ;
- ouvrir une fiche détaillée puis demander un devis avec le produit déjà renseigné ;
- comprendre le processus de commande en quatre étapes : échange, proposition/devis, validation du visuel et de la commande, production/livraison ;
- trouver un contact visible sans devoir remplir un formulaire ;
- reprendre sa navigation après un formulaire interrompu, sans comportement déroutant.

Les appels à l'action sont répétés aux moments utiles : après la promesse, après les offres, après les preuves et en bas de page. La page de remerciement confirme la réception, rappelle les prochaines étapes et propose un retour au catalogue. Elle ne promet pas un délai de réponse non validé.

## 8. Formulaire de devis

Le formulaire doit recueillir juste assez d'informations pour permettre une première réponse commerciale. Champs requis : nom, adresse e-mail, type de structure, objet de la demande, consentement à la lecture de la politique de confidentialité selon le texte validé. Champs recommandés mais facultatifs : nom de la structure, téléphone, famille ou produit, quantité estimée, date d'événement, ville / département de livraison, budget indicatif, message et URL vers un logo ou un fichier si une solution sûre est retenue.

Les champs conditionnels peuvent alléger l'écran : la date apparaît pour un événement ; tailles et nombre de personnes pour des textiles ; composition envisagée pour un pack. L'absence de ces détails ne bloque pas l'envoi. Pour le lancement, **ne pas rendre le dépôt de fichier obligatoire**. Si l'envoi de fichier via Netlify est retenu, vérifier ses contraintes, sa sécurité, les droits sur les logos et le parcours réel avant mise en production ; une demande de logo lors de l'échange commercial reste acceptable.

Prévoir : libellés visibles, exemples d'aide courts, validation compréhensible, messages d'erreur précis, protection antispam, confirmation d'envoi, information sur l'usage des données, séparation claire entre demande de devis et inscription éventuelle à des communications commerciales. La case de prospection, si créée, doit être distincte et non précochée. Enregistrer la provenance de la demande (univers, produit, campagne ou QR code) uniquement de façon proportionnée et expliquée.

La réception doit être testée dans l'interface Netlify et avec l'adresse de notification définitive. Aucun formulaire factice ou simple `mailto:` ne constitue une livraison acceptable.

## 9. Direction artistique et expérience

Créer une identité contemporaine et crédible, évoquant le monde canin sans clichés visuels. La priorité est la lisibilité, la qualité des photos et la clarté de l'offre. Proposer une palette courte, un système typographique cohérent, une iconographie sobre et des composants réutilisables : cartes d'univers, cartes produit, étapes, témoignages, FAQ, boutons, formulaires.

Le design doit être conçu d'abord pour le mobile : navigation facile au pouce, textes aérés, boutons assez grands, images bien cadrées, aucun contenu essentiel caché derrière un survol. Prévoir aussi tablette et grand écran. Les micro-interactions doivent être discrètes et respecter la préférence de réduction des animations.

Les visuels prioritaires sont des photos réelles de produits, de personnalisation et de situations canines. Chaque image doit avoir un rôle précis. Ne pas laisser des maquettes générées ou des exemples fictifs se faire passer pour des réalisations. Ajouter les droits d'utilisation et les crédits nécessaires avant publication.

## 10. Contenus et référencement naturel

Rédiger les pages pour des recherches utiles, sans répétition artificielle : textiles personnalisés pour élevage canin, vêtements de club canin, objets personnalisés pour exposition canine, récompenses pour événements canins, etc. La liste finale de mots-clés dépendra des produits et de la zone de vente confirmés.

Chaque page a un seul titre principal, une balise `title` unique, une description pertinente, une URL descriptive, des liens internes utiles et des images avec textes alternatifs adaptés. Prévoir `sitemap.xml`, `robots.txt`, URL canonique, métadonnées de partage et données structurées pertinentes uniquement pour des informations vérifiées. Éviter les pages de produits ou d'univers presque vides : elles doivent répondre à une intention réelle.

Les contenus à préparer avant publication : histoire et coordonnées officielles, description des produits, photos avec droits, options réelles de personnalisation, conditions commerciales publiables, exemples de réalisations autorisés, questions fréquentes, textes légaux. L'absence d'un contenu ne doit pas être cachée par du texte générique.

## 11. Accessibilité, performance et qualité

Viser **WCAG 2.2 niveau AA** comme critère de conception et de recette : navigation au clavier, focus visible, contrastes suffisants, structure de titres logique, images pertinentes décrites, formulaires correctement associés à leurs libellés, messages d'erreur annoncés et contenus compréhensibles. Vérifier manuellement les parcours clés sur mobile et au clavier.

Objectifs de performance sur les pages principales, à mesurer sur mobile avec des outils reconnus : **LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1** dans des conditions de mesure appropriées. Optimiser images, polices et scripts ; charger le contenu non essentiel à la demande. Aucune dépendance lourde ou animation ne doit dégrader le formulaire et la consultation du catalogue.

Tester au minimum les versions récentes de Chrome, Safari, Firefox et Edge, ainsi que des tailles d'écran mobiles et desktop. Vérifier les liens, les erreurs 404, les états vides, l'absence de défilement horizontal et les formulaires après déploiement.

## 12. Technique et hébergement gratuit

Le code doit être composé de **HTML sémantique, CSS et JavaScript natif**, sans serveur dédié ni abonnement imposé. Un générateur statique léger peut être utilisé seulement s'il simplifie réellement la gestion d'un grand catalogue ; le livrable final doit rester un site statique déployable sur Netlify. Éviter une application entièrement rendue en JavaScript qui rendrait le contenu ou le formulaire invisibles sans scripts.

Netlify est l'hébergement cible. Déployer depuis un dépôt Git pour garder un historique, permettre les aperçus et faciliter les mises à jour. Configurer HTTPS, redirections nécessaires, page 404, URL finale, domaine et formulaires. Une adresse `netlify.app` permet de lancer sans achat de nom de domaine ; un domaine personnalisé peut engendrer un coût externe s'il faut l'acheter. Les fonctionnalités gratuites de Netlify ont des limites d'usage : suivre le tableau de bord et choisir un montage sobre. Le site doit pouvoir être déplacé vers un autre hébergeur statique ; seule la réception des formulaires nécessiterait alors une solution de remplacement.

Pour le formulaire, privilégier **Netlify Forms** avec détection du formulaire HTML au déploiement, configuration et test de la réception. Les soumissions sont gratuites et illimitées sur les forfaits Netlify à crédits selon la documentation actuelle, mais l'hébergement gratuit reste soumis à un plafond mensuel global et peut être suspendu jusqu'au cycle suivant en cas de dépassement. Vérifier les conditions au moment du déploiement.

Le code source, les textes, les images autorisées et les données produits doivent être remis à BBD Officiel. Fournir un court guide expliquant comment modifier un produit, remplacer une photo, publier une mise à jour et retrouver les demandes reçues. Pas de clé secrète ni de donnée client dans le dépôt.

## 13. Données personnelles et obligations

Afficher des mentions légales complètes, la politique de confidentialité et les informations nécessaires au niveau du formulaire : responsable, finalité, base juridique retenue, destinataires, durée de conservation validée, droits et point de contact. La durée de conservation doit être décidée à partir des pratiques réelles de BBD Officiel ; ne pas l'inventer dans le site.

Éviter les traceurs publicitaires et les outils d'analyse nécessitant un bandeau de consentement au premier lancement si leur valeur n'est pas démontrée. Si des traceurs sont ajoutés ensuite, traiter le consentement et la documentation avant activation. Ne pas réutiliser automatiquement les coordonnées d'une demande de devis pour des envois promotionnels. Les modalités de prospection devront tenir compte de la distinction entre particuliers et professionnels.

Les modalités de vente et les obligations propres aux produits, notamment les friandises, devront être validées avant publication de promesses ou de fiches détaillées. Cette section constitue une exigence de contenu à valider par l'entreprise, pas une rédaction juridique définitive.

## 14. Mesure et amélioration

Créer un tableau de suivi simple, sans infrastructure complexe : visites par page ou univers si un outil respectueux de la vie privée est retenu, clics vers devis, formulaires envoyés, demandes qualifiées, devis émis, devis acceptés, commande moyenne, réachat et origine déclarée des contacts. Les métriques commerciales peuvent être tenues dans un tableur au départ.

Définir avant lancement ce qu'est une **demande qualifiée** : structure identifiable, besoin cohérent avec l'offre, moyen de contact valide et projet suffisamment décrit pour répondre. Suivre séparément volume et qualité. Après quelques semaines de données, améliorer les pages qui attirent du trafic mais génèrent peu de demandes, et les champs qui créent de l'abandon.

Les URL ou QR codes des expositions peuvent inclure un paramètre de campagne simple pour identifier l'origine, sans profilage excessif. Prévoir des QR codes pointant vers une page stable, testée sur téléphone et imprimable sur les supports événementiels.

## 15. Phases de réalisation

**Phase A — Cadrage et matières premières.** Confirmer marque, offres de départ, zones desservies, contacts, photos, tarifs publiables, délais, fournisseurs et aspects légaux. Produire le plan de site, le schéma du catalogue et les principaux messages.

**Phase B — Conception.** Créer une maquette mobile et desktop de l'accueil, d'un univers, d'une fiche produit et du formulaire. Faire valider la hiérarchie visuelle, les textes clés et le parcours de devis avant d'étendre les pages.

**Phase C — Développement.** Construire les pages, le catalogue maintenable, les composants, le formulaire Netlify, les pages légales, les métadonnées et les outils de déploiement.

**Phase D — Recette et lancement.** Tester les parcours, accessibilité, performance, formulaires, notifications, affichage mobile, SEO technique et contenus. Déployer sur Netlify ; vérifier le site public et la réception d'une demande réelle de test.

**Phase E — Enrichissement.** Intégrer les produits transmis, les réalisations authentiques, les nouveaux univers justifiés par l'offre, puis ajuster les pages à partir des demandes reçues. Le programme « Cercle des Éleveurs » est traité dans une phase distincte après validation de ses règles et de sa gestion opérationnelle.

## 16. Critères d'acceptation du livrable

Le site est considéré comme prêt à publier lorsque :

- un visiteur comprend en moins de quelques secondes la cible, l'offre et l'action proposée sur l'accueil ;
- les trois univers prioritaires possèdent un contenu distinct et des liens vers les offres pertinentes ;
- seules les références et conditions confirmées sont présentées comme disponibles ;
- une demande de devis issue de l'accueil, d'un univers et d'un produit arrive avec son contexte dans Netlify ;
- le formulaire gère les erreurs, confirme l'envoi et fonctionne sur mobile et au clavier ;
- les coordonnées, liens, pages légales, visuels autorisés et informations commerciales ont été vérifiés ;
- les pages sont utilisables sans rupture sur les principaux écrans et navigateurs ;
- les contrôles d'accessibilité et de performance de la section 11 ont été réalisés et les blocages corrigés ;
- les balises SEO, le sitemap, les redirections et la page 404 sont présents ;
- BBD Officiel reçoit le code source, les accès nécessaires et un guide de mise à jour.

## 17. Informations à transmettre pour finaliser les produits

À fournir pour chaque produit ou gamme, idéalement dans un tableau : nom, famille, fournisseur, description, photographies et droits, variantes / tailles / couleurs, possibilités de personnalisation, technique de marquage, quantité minimale, prix d'achat, prix de vente ou règle de marge, paliers, frais fixes, délai de fabrication, délai de transport, zone de livraison, contraintes, stock ou disponibilité et statut de publication.

À fournir au niveau de l'entreprise : logo et charte existante, coordonnées publiques, raison sociale et mentions légales, zone géographique desservie, adresse de réception des demandes, modes de livraison, exemples de réalisations autorisées, témoignages, questions fréquentes, calendrier des événements où BBD Officiel sera effectivement présent, règles éventuelles du programme partenaire.

**Instruction à Codex :** commencer par une structure prête à recevoir ces données. Si elles manquent, utiliser des exemples explicitement identifiés comme maquettes uniquement dans l'environnement de prévisualisation ; ne jamais les publier comme des offres réelles. Proposer les choix de design et d'ergonomie, puis demander validation des contenus commerciaux avant mise en ligne publique.

## 18. Hors périmètre initial et évolutions possibles

Le paiement en ligne, les comptes clients, la personnalisation en temps réel avec aperçu garanti, la gestion automatique du stock, les points de fidélité et l'automatisation complète des devis ne font pas partie du lancement. Ils pourront être étudiés après validation de la demande et des processus commerciaux. Le site doit rester suffisamment structuré pour les accueillir plus tard sans imposer leur coût ou leur complexité maintenant.

## Références de cadrage technique

- [Netlify — tarifs et limites du forfait gratuit](https://www.netlify.com/pricing/)
- [Netlify — configuration des formulaires HTML](https://docs.netlify.com/manage/forms/setup/)
- [Netlify — usage et facturation des formulaires](https://docs.netlify.com/manage/forms/usage-and-billing/)
- [W3C — recommandations WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [CNIL — prospection commerciale électronique](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique)
- [CNIL — communiquer et vendre en ligne](https://www.cnil.fr/sites/cnil/files/atoms/files/bpi-cnil-rgpd_fiche-1_que-faire-quand-votre-entreprise-communique-vend-en-ligne.pdf)
