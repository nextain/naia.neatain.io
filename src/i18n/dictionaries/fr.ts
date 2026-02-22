import type { Dictionary } from "./types";

const fr: Dictionary = {
  "locale": "fr",
  "meta": {
    "title": "NaiaOS",
    "description": "Naia OS — Votre IA personnelle, en toute simplicité. Discutez, parlez et travaillez avec votre avatar IA en 3D."
  },
  "common": {
    "loading": "Chargement...",
    "loadingShort": "Chargement...",
    "error": "Une erreur s'est produite",
    "save": "Enregistrer",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "confirm": "Confirmer",
    "copy": "Copier",
    "copied": "Copié",
    "comingSoon": "Bientôt disponible",
    "backTo": "Retour",
    "prev": "Précédent",
    "next": "Suivant",
    "page": "Pages"
  },
  "header": {
    "home": "Accueil",
    "pricing": "Tarifs",
    "faq": "FAQ",
    "download": "Télécharger",
    "login": "Connexion",
    "dashboard": "Tableau de bord",
    "toggleMenu": "Changer de menu",
    "manual": "Manuel"
  },
  "footer": {
    "brand": "NaiaOS",
    "tagline": "Où la technologie rencontre l'émotion",
    "links": {
      "privacy": "Politique de confidentialité",
      "terms": "Conditions d'utilisation",
      "refund": "Politique de remboursement",
      "contact": "Contacter"
    },
    "copyright": "© 2026 Nextain. Tous droits réservés."
  },
  "auth": {
    "loginTitle": "Connexion / Inscription",
    "loginDescription": "Commencez avec votre compte social",
    "googleLogin": "Continuer avec Google",
    "discordLogin": "Continuer avec Discord",
    "logout": "Déconnexion",
    "callbackRedirecting": "Redirection vers l'application de bureau...",
    "callbackManualPrefix": "S'il ne s'ouvre pas automatiquement,",
    "callbackManualLink": "cliquez ici",
    "callbackManualSuffix": "."
  },
  "home": {
    "hero": {
      "title": "L'agent IA le plus avancé, comme système d'exploitation parfait.",
      "subtitle": "De l'intégration de 7 fournisseurs d'IA au contrôle du terminal, en passant par un avatar VRM qui exprime l'émotion. Un écosystème d'IA complet que vous pouvez expérimenter sans être développeur, Naia OS.",
      "cta": "Commencez gratuitement",
      "secondaryCta": "Télécharger"
    },
    "features": {
      "title": "Ce qui rend Naia spéciale",
      "subtitle": "Découvrez la puissance des agents IA – aucun codage requis",
      "items": {
        "companion": {
          "title": "Avatar IA",
          "description": "Un avatar 3D plein d'émotions, directement sur votre bureau. L'avatar IA réagit aux conversations avec des expressions faciales et un contact visuel."
        },
        "multiProvider": {
          "title": "7 fournisseurs d'IA supportés",
          "description": "Gemini, Claude, GPT, Grok, zAI, Ollama, Claude Code CLI — basculez librement avec des crédits ou vos propres clés API."
        },
        "voice": {
          "title": "Conversations vocales",
          "description": "Demandez vocalement, obtenez des réponses orales. L'avatar IA répond naturellement avec une animation synchronisée sur les lèvres."
        },
        "tools": {
          "title": "Exécution des outils",
          "description": "Édition de fichiers, commandes de terminal, recherche sur le Web. L'avatar IA appelle directement les outils pour effectuer le travail."
        },
        "desktop": {
          "title": "Installation et système d'exploitation en un clic",
          "description": "Installez l'application de bureau en un seul clic ou créez un environnement IA dédié avec l'image du système d'exploitation Linux."
        }
      }
    },
    "pricing": {
      "title": "Tarification simple",
      "subtitle": "Payez uniquement ce dont vous avez besoin",
      "policyNote": "Veuillez consulter les documents de facturation, de remboursement et de politique ci-dessous.",
      "free": {
        "name": "GRATUIT",
        "price": "0 $",
        "period": "pour toujours",
        "description": "Commencez par une simple inscription",
        "features": [
          "20 crédits à l'inscription",
          "Recharge mensuelle de 10 crédits",
          "Modèles Gémeaux",
          "Chat vocal de base",
          "Soutien communautaire"
        ],
        "cta": "Commencez gratuitement"
      },
      "basic": {
        "name": "BASE",
        "price": "10 $",
        "period": "mo",
        "description": "Pour ceux qui en veulent plus",
        "features": [
          "100 crédits mensuels",
          "Modèles Gémeaux",
          "Chat vocal de haute qualité",
          "Assistance prioritaire",
          "Fonctionnalités vocales avancées"
        ],
        "cta": "Mise à niveau"
      }
    },
    "faq": {
      "title": "Foire aux questions"
    }
  },
  "sidebar": {
    "dashboard": "Tableau de bord",
    "usage": "Utilisation",
    "logs": "Journaux",
    "keys": "Clés API",
    "settings": "Paramètres",
    "billing": "Facturation"
  },
  "dashboard": {
    "title": "Tableau de bord",
    "creditBalance": "Solde créditeur",
    "totalRequests": "Total des demandes",
    "totalTokens": "Total des jetons",
    "totalSpend": "Dépense totale",
    "currentPeriod": "Période actuelle",
    "quickLinks": "Liens rapides",
    "statusActive": "Actif",
    "statusBlocked": "Bloqué"
  },
  "usage": {
    "title": "Utilisation",
    "period": {
      "days7": "7 jours",
      "days30": "30 jours",
      "days90": "90 jours"
    },
    "requestsPerDay": "Demandes / Jour",
    "tokensPerDay": "Jetons / Jour",
    "spendPerDay": "Dépenser/jour",
    "noData": "Aucune donnée pour la période sélectionnée"
  },
  "logs": {
    "title": "Journaux",
    "all": "Tout",
    "filterStatus": "Filtre d'état",
    "filterModel": "Filtre de modèle",
    "columns": {
      "time": "Temps",
      "status": "Statut",
      "model": "Modèle",
      "tokens": "Jetons",
      "cost": "Coût"
    },
    "details": {
      "id": "ID de journal",
      "endpoint": "Point de terminaison",
      "provider": "Fournisseur",
      "promptTokens": "Jetons d'invite",
      "completionTokens": "Jetons d'achèvement",
      "error": "Erreur"
    },
    "noLogs": "Aucun journal pour l'instant",
    "expandDetails": "Afficher les détails"
  },
  "keys": {
    "title": "Clés API",
    "createKey": "Créer une clé",
    "keyName": "Nom de la clé",
    "keyNamePlaceholder": "par ex. clé-de-mon-bureau",
    "expires": "Expire",
    "noExpiry": "Pas d'expiration",
    "days30": "30 jours",
    "days90": "90 jours",
    "days365": "1 an",
    "columns": {
      "name": "Nom",
      "status": "Statut",
      "created": "Créé",
      "actions": "Actions"
    },
    "noKeys": "Aucune clé créée pour le moment",
    "deleteConfirm": "Êtes-vous sûr de vouloir supprimer cette clé ?",
    "keyCreated": "Clé créée",
    "keyCreatedDescription": "Cette clé ne sera affichée qu'une seule fois. Conservez-le dans un endroit sûr.",
    "active": "Actif",
    "revoked": "Révoqué",
    "unnamed": "clé sans nom",
    "forbiddenAction": "Vous n'avez pas l'autorisation pour cette clé."
  },
  "settings": {
    "title": "Paramètres",
    "profile": {
      "title": "Profil",
      "name": "Nom",
      "email": "Courriel",
      "avatar": "avatar",
      "provider": "Fournisseur de connexion",
      "gatewayId": "ID de passerelle",
      "budgetId": "Numéro budgétaire"
    },
    "connectedAccounts": {
      "title": "Comptes connectés",
      "google": "Google",
      "discord": "Discorde"
    },
    "desktopApp": {
      "title": "Connexion à l'application de bureau",
      "description": "Connectez votre application de bureau Naia OS à ce compte.",
      "issueKey": "Clé de connexion du problème"
    },
    "appearance": {
      "title": "Apparence",
      "theme": "Thème",
      "themeLight": "Thème 1 (Lumière)",
      "themeDark": "Thème 2 (Sombre)",
      "themeSystem": "Système",
      "language": "Langue"
    },
    "integrations": {
      "title": "Intégrations",
      "description": "Discutez avec Naia depuis Discord et plus encore.",
      "discord": {
        "title": "Discorde",
        "connected": "Connecté",
        "notConnected": "Non connecté",
        "connectedHint": "Si vous vous êtes connecté avec Discord, vous êtes déjà connecté.",
        "inviteBot": "Discuter par DM",
        "inviteBotDescription": "Envoyez un message privé (DM) au bot Naia pour discuter directement.",
        "howToUse": "Envoyez un DM au bot Naia. Les crédits sont débités automatiquement."
      },
      "googleChat": {
        "title": "Chat Google",
        "connected": "Connecté",
        "notConnected": "Non connecté",
        "connectedHint": "Bientôt disponible.",
        "howToUse": "Bientôt disponible."
      },
      "viewGuide": "Afficher le guide de configuration"
    }
  },
  "manual": {
    "title": "Manuel d'utilisation",
    "subtitle": "Guide de l'application de bureau Naia OS",
    "toc": "Table des matières",
    "prev": "Précédent",
    "next": "Suivant",
    "backToToc": "Retour à la table des matières",
    "sections": {
      "install": "Installation et déploiement",
      "gettingStarted": "Commencer",
      "mainScreen": "Écran principal",
      "chat": "Discuter",
      "history": "Historique des conversations",
      "progress": "Avancement des travaux",
      "skills": "Compétences",
      "channels": "Canaux",
      "agents": "Agents",
      "diagnostics": "Diagnostic",
      "settings": "Paramètres",
      "tools": "Détails de l'outil",
      "lab": "Nextain",
      "troubleshooting": "Dépannage"
    }
  },
  "download": {
    "title": "Download",
    "subtitle": "Download Naia OS and start chatting with your AI avatar.",
    "recommended": "Recommended",
    "version": "Version",
    "releaseNotes": "Release Notes",
    "requirements": "System Requirements",
    "requirementsList": [
      "Linux x86_64",
      "Wayland or X11",
      "Node.js 22+ (for AppImage/deb/rpm)",
    ],
    "formats": {
      "flatpak": {
        "name": "Flatpak",
        "description": "The safest installation method. Runs in a sandboxed environment.",
        "command": "flatpak install --user ./Naia-Shell-x86_64.flatpak",
      },
      "appimage": {
        "name": "AppImage",
        "description": "Single executable file. Run directly without installation.",
        "command": "chmod +x Naia-Shell-x86_64.AppImage && ./Naia-Shell-x86_64.AppImage",
      },
      "deb": {
        "name": "DEB",
        "description": "For Debian, Ubuntu, and other apt-based distributions.",
        "command": "sudo dpkg -i naia-shell_*.deb",
      },
      "rpm": {
        "name": "RPM",
        "description": "For Fedora, RHEL, and other rpm-based distributions.",
        "command": "sudo rpm -i naia-shell-*.rpm",
      },
    },
    "checksum": "Verify Checksums",
    "checksumDescription": "To verify the integrity of downloaded files:",
    "allReleases": "View All Releases",
    "sourceCode": "Source Code",
  },
  "billing": {
    "title": "Facturation",
    "currentPlan": "Forfait actuel",
    "creditBalance": "Solde créditeur",
    "periodUsage": "Utilisation de la période",
    "comparePlans": "Comparez les forfaits",
    "upgrade": "Mise à niveau",
    "free": "GRATUIT",
    "basic": "BASE",
    "currentBadge": "Actuel",
    "freeFeatures": [
      "20 crédits d'inscription",
      "Recharge mensuelle minimum 10",
      "Accès aux modèles Gémeaux"
    ],
    "basicFeatures": [
      "100 crédits mensuels",
      "Assistance prioritaire",
      "Voix de haute qualité"
    ],
    "lemonNotice": "Les paiements sont traités par LemonSqueezy. Veuillez consulter les politiques de facturation et de remboursement.",
    "pricingModelsSynced": "Modèles de tarification synchronisés"
  }
};

export default fr;
