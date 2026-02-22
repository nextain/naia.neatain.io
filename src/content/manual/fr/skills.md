Parcourir et gérer les compétences (outils) disponibles.

![Skills tab](skills-tab.png)

## Types de Compétences

### Compétences Intégrées
Intégrées à l'application — ne peuvent pas être désactivées :

| Compétence | Fonction | Niveau de Sécurité |
|------------|----------|--------------------|
| `skill_time` | Vérifier la date/heure actuelle | T0 |
| `skill_system_status` | Vérifier le statut du système | T0 |
| `skill_memo` | Enregistrer/récupérer des mémos | T0 |
| `skill_weather` | Vérifier la météo | T0 |
| `skill_naia_discord` | Envoyer/recevoir des DMs Discord | T1 |
| `skill_soul` | Gérer la personnalité et la mémoire de l'IA | T0 |
| `skill_exit` | Quitter l'application proprement | T2 |

### Compétences Personnalisées
Ajoutées via Gateway — peuvent être activées/désactivées :
- Lecture/écriture de fichiers, exécution de commandes, recherche web, etc.
- Type Gateway ou Command

## Sources de Compétences (D'où viennent-elles ?)

- **Built-in skills**: regroupées avec l'application
- **Custom skills**: chargées à partir de manifestes de compétences locaux (par exemple, `~/.naia/skills/.../skill.json`)
- Développez une carte de compétence pour vérifier son badge `source`

## Comment Ajouter une Compétence Personnalisée

Naia OS est 100 % compatible avec l'écosystème OpenClaw. Il existe trois façons d'ajouter des compétences :

### 1. Demander à l'IA de la Construire (Le Plus Simple)
Expliquez ce que vous voulez dans le chat, et Naia écrira le code et créera la compétence pour vous.
> "Construire une compétence qui récupère le taux de change actuel et l'enregistre dans `~/.naia/skills/exchange/skill.json`."

### 2. Installer depuis Clawhub (Méthode OpenClaw)
Vous pouvez utiliser l'outil Terminal (`execute_command`) pour installer des plugins directement depuis **[Clawhub.ai](https://clawhub.ai)**, le registre officiel de compétences OpenClaw contenant plus de 5 700 compétences.

> "Exécutez `openclaw plugins install @openclaw/plugin-github` dans le terminal pour installer le plugin Github."

⚠️ **Avertissement de sécurité :** Les compétences téléchargées depuis Clawhub ou d'autres sources en ligne sont écrites par des tiers. Avant d'installer, demandez toujours à l'IA de **"Vérifier le code de cette compétence pour tout risque de sécurité (comme la suppression de fichiers ou le vol d'informations personnelles) avant de continuer."**

### 3. Ajout Manuel
1. Créez un manifeste de compétence à l'adresse `~/.naia/skills/<skill-name>/skill.json`
2. Placez tout script/exécutable requis pour cette compétence dans le même dossier
3. Ouvrez l'onglet Compétences et vérifiez si la nouvelle compétence apparaît
4. Activez-la à l'aide du bouton bascule
5. Testez-la depuis le chat avec une requête qui devrait déclencher la compétence

Si elle n'apparaît pas, redémarrez l'application et vérifiez à nouveau.

## Intégration de la Communauté Botmadang

Naia OS inclut une compétence intégrée (`skill_botmadang`) dédiée à **Botmadang**, une communauté coréenne d'agents IA.

Vous pouvez demander à Naia de commencer ses activités sur Botmadang via le chat :
> "S'inscrire en tant que nouvel agent sur Botmadang. Définir votre nom comme 'naia Agent'."

Une fois enregistré et muni d'une API Key, Naia peut publier des articles ou commenter les fils d'autres agents de manière autonome.

## Compétences de Notification (Slack / Discord / Google Chat)

`skill_notify_slack` et `skill_notify_discord` sont des compétences de notification personnalisées qui envoient des messages via des webhooks.

### Configuration du Webhook

Pour utiliser les compétences de notification, vous devez configurer une URL de webhook. Il existe deux méthodes :

**Méthode 1 : Variables d'environnement (Recommandé)**

```bash
# Ajouter à ~/.bashrc ou ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Méthode 2 : config.json**

```json
// ~/.naia/config.json
{
  "notifications": {
    "slack": {
      "webhookUrl": "https://hooks.slack.com/services/T.../B.../xxx"
    },
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    }
  }
}
```

> Les variables d'environnement ont priorité sur config.json.

### Exemples d'Utilisation

Demandez simplement à Naia dans le chat :

- "Envoyer une notification 'déploiement terminé' à Slack"
- "Publier le rapport de statut du serveur sur Discord"
- "Notifier le canal #ops des résultats de la compilation"

Naia appellera automatiquement `skill_notify_slack` ou `skill_notify_discord`.

Si aucun webhook n'est configuré, un message expliquant les étapes de configuration sera affiché.

### Intégration OpenClaw Gateway (Avancé)

Lorsqu'une OpenClaw Gateway est connectée, les compétences de notification tenteront d'abord d'utiliser le RPC `skills.invoke` de la Gateway. Si le relais via la Gateway échoue, la compétence revient à la livraison directe par webhook.

L'intégration de canal Gateway offre des fonctionnalités plus riches (formatage de message, fils de discussion, mentions, etc.).

## Scénario Avancé : Automatisation OpenClaw + cron

Dans les configurations d'automatisation d'équipe/personnelle, vous pouvez enregistrer des compétences dans OpenClaw et les déclencher selon un calendrier avec cron.

Exemples de scénarios :
- Tous les jours à 09h00 : générer un résumé des journaux de travail de la veille
- Toutes les heures : scanner un dossier cible et notifier les anomalies
- Minuit : générer et télécharger un rapport quotidien

Flux recommandé :
1. Enregistrez la compétence personnalisée et validez-la d'abord localement
2. Configurez les webhooks de la compétence de notification pour connecter les canaux d'alerte
3. Ajoutez une étape d'invocation de compétence dans votre définition de tâche OpenClaw
4. Joignez une planification cron comme déclencheur récurrent
5. Ajoutez des politiques de nouvelle tentative/notification en cas d'échec

> **Feuille de route** : l'interface utilisateur de planification cron, le support Telegram et le routage multicanal (envoi d'un message à plusieurs canaux simultanément) seront disponibles dans les futures mises à jour.

## Cartes de Compétences

Chaque compétence est affichée sous forme de carte :

![Skill card detail](skills-card.png)

- **Nom** : Nom de la compétence (par exemple, `skill_read_file`)
- **Description** : Résumé d'une ligne (peut être tronqué)
- **Cliquer** : Cliquez sur la carte pour développer la description complète
- **Badges** : Type (built-in/gateway/command), niveau de sécurité (T0~T3)
- **Bouton ?** : Demander à l'IA d'expliquer cette compétence
- **Bascule** : Activer/désactiver les compétences personnalisées

## Recherche et Gestion en Masse

- **Recherche** : Filtrer par nom ou description de compétence
- **Activer Tout** : Activer toutes les compétences personnalisées
- **Désactiver Tout** : Désactiver toutes les compétences personnalisées
- Nombre actif/total affiché (par exemple, 45/50)

## Gérer les Compétences via l'IA

Vous pouvez également demander à Naia de gérer les compétences dans le chat :

- "Montrez-moi la liste des compétences disponibles"
- "Existe-t-il une compétence liée à la météo ?"
- "Désactiver la compétence healthcheck"
- "Trouver des compétences liées au codage"

Naia utilisera l'outil `skill_skill_manager` automatiquement.

## Niveaux de Sécurité

| Niveau | Description | Approbation |
|--------|-------------|-------------|
| T0     | Lecture seule, pas d'effets secondaires | Auto-approuvé |
| T1     | Notification uniquement | Avis affiché |
| T2     | Prudence requise | Approbation de l'utilisateur nécessaire |
| T3     | Opération dangereuse | Approbation de l'utilisateur requise |