Cette section gère les différents canaux de messagerie connectés à l'application (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Affichage de la liste des canaux
Vous pouvez voir tous les canaux connectés et le statut de chaque compte en un coup d'œil.

- **Badge de statut** : Affiche des états tels que `connected`, `disconnected` ou `error`.
- **Actualiser** : Cliquez sur le bouton d'actualisation en haut à droite pour obtenir le statut le plus récent.

## Connexion au canal (code QR)
Vous pouvez initier une connexion web pour connecter un canal spécifique.
En disant à l'avatar IA dans le chat, « Start Discord web login », il affichera un code QR ou entrera dans un état d'attente d'authentification si nécessaire.

## Intégration du bot Discord

Connectez-vous avec votre compte Discord sur [naia.nextain.io](https://naia.nextain.io) pour lier automatiquement votre compte. Une fois lié, vous pouvez discuter avec Naia via DM Discord.

### Comment utiliser
1. **Connectez-vous avec Discord** sur naia.nextain.io
2. Votre compte est automatiquement lié au bot Naia
3. **Envoyez un DM** au bot pour commencer à discuter
4. Les crédits sont automatiquement déduits de votre compte naia.nextain.io

### Fonctionnalités
- **DM uniquement** : Naia répond aux messages directs des utilisateurs liés
- **Intégration des crédits** : Les crédits de votre compte naia.nextain.io sont utilisés automatiquement
- **Guidance des utilisateurs non enregistrés** : Les utilisateurs sans compte lié reçoivent des instructions de configuration
- **Limitation de débit** : Limite de 10 messages par minute pour protéger vos crédits

## Intégration Google Chat (Bientôt disponible)

L'intégration Google Chat est prévue pour une future mise à jour. Restez à l'écoute des annonces.

## Notifications de messagerie (Webhooks)
Naia OS hérite du puissant système de canaux d'OpenClaw.
En saisissant votre URL de Webhook Slack, Discord ou Google Chat dans le menu **Settings > Tools > Webhooks** ou pendant l'écran d'accueil initial, l'avatar IA peut vous envoyer des messages avec les résultats des tâches importantes.

> **Astuce :** « Préviens-moi sur Discord quand cette sauvegarde de fichier sera complètement terminée ! »

## Avancé : Créez un bot autonome 24/7
En utilisant l'outil de commande de terminal (`execute_command`), vous pouvez transformer l'avatar IA en un agent autonome 24/7 qui réside dans Telegram ou Discord, au-delà de votre simple ordinateur de bureau.

Commandez l'avatar IA dans le chat comme ceci :
> « Mon jeton de bot Telegram est `1234:ABC...`. Exécutez `openclaw channels add --channel telegram --token 1234:ABC...` pour démarrer mon bot Telegram. »

Maintenant, même si vous fermez l'application de bureau, vous pouvez discuter avec l'avatar IA et lui assigner des tâches à tout moment via Telegram sur votre téléphone via le OpenClaw Gateway en arrière-plan.