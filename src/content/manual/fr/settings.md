Configurez tous les paramètres de l'application. Cliquez sur **Enregistrer** pour appliquer les modifications.

![Aperçu des paramètres](settings-overview.png)

## Langue

- Basculer entre **Coréen** / **Anglais**
- Appliqué immédiatement

## Thème

8 thèmes de couleurs disponibles :

| Thème | Ambiance |
|-------|------|
| Espresso | Brun chaud (par défaut) |
| Midnight | Bleu marine foncé |
| Ocean | Bleu profond |
| Forest | Vert naturel |
| Rose | Violet rosé |
| Latte | Crème clair |
| Sakura | Rose fleur de cerisier |
| Cloud | Gris clair |

Cliquez sur un échantillon de couleur pour un aperçu instantané.

## Avatar

### Modèle VRM
- Choisissez parmi 4 modèles intégrés ou **Choisir un fichier** pour charger un VRM personnalisé
- Cliquez pour un aperçu instantané
- Quitter sans enregistrer rétablit le modèle précédent

### Image d'arrière-plan
- Dégradé par défaut ou arrière-plans intégrés
- **Choisir un fichier** pour charger une image personnalisée (PNG, JPG, WebP)

## Persona

Personnalisez la personnalité, le style de discours et le nom de Naia en texte libre. Les balises d'émotion sont ajoutées automatiquement.

![Paramètres de la Persona](settings-persona.png)

## Compte Nextain

Gérez l'intégration Nextain.

### Lorsque connecté

- ID utilisateur affiché
- **Solde de crédits** affiché (requête en temps réel)
- Bouton **Tableau de bord** : Ouvre le tableau de bord Nextain dans le navigateur
- Bouton **Recharger les crédits** : Accède à la page de facturation Nextain
- Bouton **Déconnecter** : Dissocie le compte Nextain
- Les paramètres se synchronisent automatiquement avec Nextain lors de l'enregistrement

### Lorsque non connecté
- Bouton **Connexion Nextain** : Connectez-vous via le navigateur, se connecte automatiquement

## Manuel de l'utilisateur

Cliquez sur "Manuel de l'utilisateur" pour ouvrir cette page dans le navigateur.

## Paramètres de l'IA

- **Fournisseur** : Gemini (par défaut), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Modèle** : Nom du modèle (ex. gemini-2.5-flash)
- **API Key** : Clé API du fournisseur (non nécessaire si vous utilisez Nextain)

## Voix (TTS/STT)

- **Réponse vocale (TTS)** : ON/OFF
- **Saisie vocale (STT)** : ON/OFF
- **Google API Key** : Clé dédiée TTS/STT (laissez vide pour utiliser la clé de chat)
- **Voix TTS** : Choisissez parmi 11 voix coréennes
  - Neural2 : Haute qualité (16 $/1M caractères)
  - WaveNet : Naturelle (16 $/1M caractères)
  - Standard : Basique (4 $/1M caractères)
- Bouton **Aperçu** pour tester la voix sélectionnée

## Outils

Gérez les permissions de contrôle système disponibles pour l'avatar IA.

- **Activer les outils** : ON/OFF principal pour les fonctionnalités d'outils
- **URL de la passerelle / Jeton de la passerelle** : Gérés automatiquement dans les environnements utilisateur normaux, la saisie manuelle n'est donc pas requise
  - Seuls les utilisateurs avancés exécutant une passerelle auto-hébergée doivent vérifier/modifier ces valeurs
- **Outils autorisés** : Outils marqués "Toujours autoriser"
  - **Effacer les outils autorisés** : Réinitialiser toutes les approbations

> **Guide des niveaux de sécurité (T0~T3)**
> Un système de sécurité à 4 niveaux s'applique en fonction de l'impact sur le système lorsque l'IA utilise un outil.
> - **T0 (Lecture seule)** : Tâches de requête. Exécutées automatiquement sans intervention de l'utilisateur.
> - **T1 (Notifier)** : Simple recherche/notification externe. Affiche une alerte à l'écran lors de l'exécution.
> - **T2 (Prudence)** : Modifications du système comme la création/édition de fichiers. Nécessite une approbation explicite de l'utilisateur.
> - **T3 (Dangereux)** : Tâches dangereuses comme l'exécution de commandes terminales. Nécessite une approbation à chaque fois.

## Canaux

- **Gestion des canaux** : Vérifiez le statut des canaux de messagerie connectés et contrôlez l'intégration avec les services externes.
- (Le contrôle détaillé s'effectue dans l'onglet Canaux.)

## Intégrations

Gérez les intégrations de messagerie externes sur la page **Paramètres > Intégrations**.

- **Intégration Discord** : Liée automatiquement lorsque vous vous connectez avec Discord. Envoyez un DM au bot pour discuter avec Naia.
- **Intégration Google Chat** : Prévue pour une future mise à jour.
- Le statut de connexion (connecté/non connecté) est affiché sous forme de badges.

## Appareil et mot d'activation

![Paramètres de l'appareil](settings-device.png)

- **Liste des mots d'activation** : Gérez les mots pour réveiller l'IA (par exemple, "Hey Naia", "Hello Naia")
- **Appairage d'appareils** : Gérez les intégrations d'appareils externes (par exemple, nœuds OpenClaw appairés) et les connexions avec des appareils domotiques.
- Comprend des fonctionnalités d'approbation d'appareils et de réinitialisation de jetons.

## Mémoire (Faits)

Gérez les faits que Naia a appris des conversations.
- Chaque fait affiche une **clé** et une **valeur**
- Bouton **Supprimer** pour retirer les faits inutiles
- Les faits enregistrés affectent la personnalisation des réponses dans les conversations ultérieures
- La suppression de nombreux faits peut réduire la qualité de la personnalisation

## Enregistrer et réinitialiser

- **Enregistrer** : Appliquer toutes les modifications
- **Tout réinitialiser** : Rétablir tous les paramètres et la caméra par défaut (requiert confirmation)