L'ecran de conversation principal avec l'avatar IA.

## Chat textuel

![Écran de chat](chat-text.png)

1. Saisissez un message dans le champ de saisie en bas
2. Appuyez sur **Entrée** ou cliquez sur le **bouton Envoyer**
3. L'avatar IA génère une réponse (diffusée en temps réel)
4. Utilisez Maj+Entrée pour les sauts de ligne

## Chat vocal

1. Cliquez sur le **bouton microphone** à côté du champ de saisie
2. Parlez lorsque le microphone s'active
3. Cliquez à nouveau pour arrêter l'enregistrement — la parole est convertie en texte (STT)
4. Le texte converti est automatiquement envoyé

## Réponse vocale (TTS)

- Les réponses de l'avatar IA sont automatiquement lues sous forme audio
- Peut être désactivé dans les Paramètres
- L'avatar effectue une synchronisation labiale pendant la lecture

## Affichage des coûts

![Tableau de bord des coûts](chat-cost.png)

- Le **coût total de l'API** pour la session en cours est affiché en haut à droite
- Cliquez pour ouvrir le tableau de bord détaillé des coûts :
  - Messages par fournisseur
  - Nombre de jetons d'entrée/sortie
  - Solde Nextain (lorsqu'il est connecté)
  - Lien de recharge de crédits

## Nouvelle conversation

- Cliquez sur le bouton **+** (en haut à droite) pour démarrer une nouvelle conversation
- Les conversations précédentes sont enregistrées dans l'onglet Historique

## Affichage de l'exécution d'outils

Lorsque l'avatar IA utilise des outils, la zone de chat affiche :

![Affichage de l'exécution d'outils](chat-tool.png)

- Nom de l'outil (par exemple, "Lire Fichier", "Exécuter Commande")
- Statut d'exécution (en cours / succès / erreur)
- Résultats (extensibles)

## Modale d'approbation

Pour les exécutions d'outils de haute sécurité :

| Bouton | Description |
|--------|-------------|
| **Autoriser une fois** | Permet cette exécution unique |
| **Toujours autoriser** | Approuve automatiquement cet outil à l'avenir |
| **Rejeter** | Refuse l'exécution |