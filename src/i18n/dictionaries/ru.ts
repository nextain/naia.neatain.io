import type { Dictionary } from "./types";

const ru: Dictionary = {
  "locale": "ru",
  "meta": {
    "title": "Ная",
    "description": "Naia — Linux AI OS на базе экосистемы 5 700+ навыков OpenClaw. 3D AI-аватар, 7 провайдеров LLM, голосовой чат, Discord DM. Без API-ключей.",
  },
  "common": {
    "loading": "Загрузка...",
    "loadingShort": "Загрузка...",
    "error": "Произошла ошибка",
    "save": "Сохранить",
    "cancel": "Отмена",
    "delete": "Удалить",
    "confirm": "Подтвердить",
    "copy": "Копировать",
    "copied": "Скопировано",
    "comingSoon": "Скоро",
    "backTo": "Назад",
    "prev": "Предыдущий",
    "next": "Далее",
    "page": "Страница"
  },
  "header": {
    "home": "Главная",
    "pricing": "Цены",
    "faq": "Часто задаваемые вопросы",
    "download": "Скачать",
    "login": "Войти",
    "dashboard": "Панель управления",
    "toggleMenu": "Переключить меню",
    "manual": "Руководство"
  },
  "footer": {
    "brand": "Ная",
    "tagline": "Где технологии встречаются с эмоциями",
    "links": {
      "privacy": "Политика конфиденциальности",
      "terms": "Условия использования",
      "refund": "Политика возврата",
      "contact": "Контакт"
    },
    "copyright": "© 2026 Некстейн. Все права защищены."
  },
  "auth": {
    "loginTitle": "Войти / Зарегистрироваться",
    "loginDescription": "Начните работу с вашей социальной учетной записью",
    "googleLogin": "Продолжить с Google",
    "discordLogin": "Продолжить с Дискордом",
    "logout": "Выход из системы",
    "callbackRedirecting": "Перенаправление в настольное приложение...",
    "callbackManualPrefix": "Если он не открывается автоматически,",
    "callbackManualLink": "нажмите здесь",
    "callbackManualSuffix": "."
  },
  "home": {
    "hero": {
      "title": "Самый продвинутый ИИ-агент в качестве идеальной ОС.",
      "subtitle": "ИИ-ОС на Linux с экосистемой 5 700+ навыков OpenClaw. Начните мгновенно с аккаунтом Naia — без API-ключей. Общайтесь через Discord DM в любое время.",
      "cta": "Начни бесплатно",
      "secondaryCta": "Скачать"
    },
    "features": {
      "title": "Что делает Найю особенной",
      "subtitle": "Испытайте мощь агентов искусственного интеллекта — кодирование не требуется",
      "items": {
        "companion": {
          "title": "ИИ-аватар",
          "description": "3D-аватар с эмоциями прямо на рабочем столе. ИИ-аватар реагирует на разговоры выражением лица и зрительным контактом."
        },
        "multiProvider": {
          "title": "7 поставщиков ИИ поддерживаются",
          "description": "Gemini, Claude, GPT, Grok, zAI, Ollama, Claude Code CLI — переключайтесь свободно с кредитами или собственными API-ключами."
        },
        "voice": {
          "title": "Голосовые разговоры",
          "description": "Задавайте вопросы голосом и получайте устные ответы. ИИ-аватар отвечает естественным образом с помощью анимации, синхронизированной по губам."
        },
        "tools": {
          "title": "Исполнение инструмента",
          "description": "Редактирование файлов, команды терминала, веб-поиск. ИИ-аватар напрямую вызывает инструменты для выполнения работы."
        },
        "desktop": {
          "title": "Установка и ОС в один клик",
          "description": "Установите настольное приложение одним щелчком мыши или создайте специальную среду искусственного интеллекта с образом ОС Linux."
        },
        "skills": {
          "title": "Экосистема 70+ навыков",
          "description": "7 встроенных + 63 пользовательских навыка — погода, GitHub, Slack, Notion, Spotify, Discord и другие. Совместимость с 5 700+ навыками сообщества ClawHub."
        },
        "discord": {
          "title": "Интеграция Discord DM",
          "description": "Общайтесь с вашим ИИ-аватаром через Discord DM в любое время и в любом месте. Персональный бот, который общается только с вами."
        },
        "daemon": {
          "title": "Встроенный OpenClaw Gateway",
          "description": "Работает на проверенном демоне-шлюзе OpenClaw и экосистеме из 5 700+ навыков. Без настройки CLI — установите и используйте с аккаунтом Naia."
        }
      }
    },
    "comparison": {
      "title": "Сравнение Naia",
      "subtitle": "Узнайте, чем Naia отличается от существующих инструментов ИИ",
      "headers": { "category": "Категория", "others": "Другие", "naia": "Naia" },
      "rows": {
        "ui": { "category": "Интерфейс", "others": "IDE / Терминал / Окно чата", "naia": "Десктопное приложение + 3D-аватар" },
        "target": { "category": "Аудитория", "others": "Только разработчики", "naia": "Все (7-этапная адаптация)" },
        "llm": { "category": "LLM", "others": "Один провайдер", "naia": "7 провайдеров, переключение в любое время" },
        "avatar": { "category": "Аватар", "others": "Нет", "naia": "VRM 3D + эмоции + синхронизация губ" },
        "skills": { "category": "Навыки", "others": "Ограниченные инструменты", "naia": "70 встроенных + 5 700+ сообщества" },
        "deploy": { "category": "Развёртывание", "others": "npm / brew / pip", "naia": "Flatpak, AppImage, DEB, RPM, образ ОС" },
        "voice": { "category": "Голос", "others": "Только текст или базовый TTS", "naia": "5 TTS-провайдеров + STT + синхронизация губ" },
        "i18n": { "category": "Языки", "others": "Только английский", "naia": "14 языков" },
        "platform": { "category": "Платформа", "others": "Только macOS / CLI", "naia": "Нативный Linux, GUI установка в один клик" },
        "cost": { "category": "Стоимость", "others": "Требуются отдельные API-ключи", "naia": "Аккаунт Naia — без API-ключей, только кредиты" }
      }
    },
    "pricing": {
      "title": "Простое ценообразование",
      "subtitle": "Платите только за то, что вам нужно",
      "policyNote": "Пожалуйста, ознакомьтесь с документами по выставлению счетов, возмещению и политике ниже.",
      "free": {
        "name": "БЕСПЛАТНО",
        "price": "$0",
        "period": "навсегда",
        "description": "Начните с регистрации",
        "features": [
          "20 кредитов при регистрации",
          "10 кредитов ежемесячное пополнение",
          "Модели Близнецов",
          "Базовый голосовой чат",
          "Поддержка сообщества"
        ],
        "cta": "Начать бесплатно"
      },
      "basic": {
        "name": "БАЗОВЫЙ",
        "price": "10 долларов",
        "period": "мес.",
        "description": "Для тех, кто хочет большего",
        "features": [
          "100 кредитов ежемесячно",
          "Модели Близнецов",
          "Качественный голосовой чат",
          "Приоритетная поддержка",
          "Расширенные голосовые функции"
        ],
        "cta": "Обновление"
      }
    },
    "faq": {
      "title": "Часто задаваемые вопросы"
    }
  },
  "sidebar": {
    "dashboard": "Панель управления",
    "usage": "Использование",
    "logs": "Журналы",
    "keys": "API-ключи",
    "settings": "Настройки",
    "billing": "Биллинг"
  },
  "dashboard": {
    "title": "Панель управления",
    "creditBalance": "Кредитный баланс",
    "totalRequests": "Всего запросов",
    "totalTokens": "Всего токенов",
    "totalSpend": "Общие расходы",
    "currentPeriod": "Текущий период",
    "quickLinks": "Быстрые ссылки",
    "statusActive": "Активный",
    "statusBlocked": "Заблокировано"
  },
  "usage": {
    "title": "Использование",
    "period": {
      "days7": "7 дней",
      "days30": "30 дней",
      "days90": "90 дней"
    },
    "requestsPerDay": "Запросы/день",
    "tokensPerDay": "Жетоны/день",
    "spendPerDay": "Тратить/день",
    "noData": "Нет данных за выбранный период"
  },
  "logs": {
    "title": "Журналы",
    "all": "Все",
    "filterStatus": "Фильтр статуса",
    "filterModel": "Фильтр модели",
    "columns": {
      "time": "Время",
      "status": "Статус",
      "model": "Модель",
      "tokens": "Токены",
      "cost": "Стоимость"
    },
    "details": {
      "id": "Идентификатор журнала",
      "endpoint": "Конечная точка",
      "provider": "Поставщик",
      "promptTokens": "Токены подсказки",
      "completionTokens": "Жетоны завершения",
      "error": "Ошибка"
    },
    "noLogs": "Журналов пока нет",
    "expandDetails": "Показать детали"
  },
  "keys": {
    "title": "API-ключи",
    "createKey": "Создать ключ",
    "keyName": "Имя ключа",
    "keyNamePlaceholder": "например ключ моего рабочего стола",
    "expires": "Срок действия истекает",
    "noExpiry": "Нет срока действия",
    "days30": "30 дней",
    "days90": "90 дней",
    "days365": "1 год",
    "columns": {
      "name": "Имя",
      "status": "Статус",
      "created": "Создано",
      "actions": "Действия"
    },
    "noKeys": "Ключи еще не созданы",
    "deleteConfirm": "Вы уверены, что хотите удалить этот ключ?",
    "keyCreated": "Ключ создан",
    "keyCreatedDescription": "Этот ключ будет показан только один раз. Храните его в безопасном месте.",
    "active": "Активный",
    "revoked": "Отозван",
    "unnamed": "безымянный ключ",
    "forbiddenAction": "У вас нет разрешения на этот ключ."
  },
  "settings": {
    "title": "Настройки",
    "profile": {
      "title": "Профиль",
      "name": "Имя",
      "email": "электронная почта",
      "avatar": "Аватар",
      "provider": "Поставщик входа в систему",
      "gatewayId": "Идентификатор шлюза",
      "budgetId": "Идентификатор бюджета"
    },
    "connectedAccounts": {
      "title": "Подключенные аккаунты",
      "google": "Гугл",
      "discord": "Discord"
    },
    "desktopApp": {
      "title": "Подключение к настольному приложению",
      "description": "Подключите настольное приложение Naia к этой учетной записи.",
      "issueKey": "Выдать ключ подключения"
    },
    "appearance": {
      "title": "Внешний вид",
      "theme": "Тема",
      "themeLight": "Тема 1 (Светлая)",
      "themeDark": "Тема 2 (Тёмная)",
      "themeSystem": "Система",
      "language": "Язык"
    },
    "integrations": {
      "title": "Интеграции",
      "description": "Общайтесь с Найей из Discord и других внешних каналов.",
      "discord": {
        "title": "Discord",
        "connected": "Подключено",
        "notConnected": "Не подключен",
        "connectedHint": "Если ваш аккаунт Discord привязан, вы можете общаться через личные сообщения.",
        "inviteBot": "Написать в ЛС",
        "inviteBotDescription": "Войдите через Discord и отправьте личное сообщение боту Naia, чтобы общаться в любое время и из любого места.",
        "howToUse": "Отправьте личное сообщение боту Naia. Кредиты списываются с этого аккаунта автоматически."
      },
      "googleChat": {
        "title": "Google Chat",
        "connected": "Подключено",
        "notConnected": "Не подключен",
        "connectedHint": "Интеграция с Google Chat находится в разработке.",
        "howToUse": "Интеграция с Google Chat скоро будет доступна."
      },
      "viewGuide": "Посмотреть руководство по установке"
    }
  },
  "manual": {
    "title": "Руководство пользователя",
    "subtitle": "Руководство по настольному приложению Naia",
    "toc": "Оглавление",
    "prev": "Предыдущий",
    "next": "Далее",
    "backToToc": "Вернуться к оглавлению",
    "sections": {
      "install": "Установка и развертывание",
      "gettingStarted": "Начало работы",
      "mainScreen": "Главный экран",
      "chat": "Чат",
      "history": "История разговора",
      "progress": "Ход работы",
      "skills": "Навыки",
      "channels": "Каналы",
      "agents": "Агенты",
      "diagnostics": "Диагностика",
      "settings": "Настройки",
      "tools": "Детали инструмента",
      "naiaAccount": "Аккаунт Naia",
      "troubleshooting": "Устранение неполадок"
    }
  },
  "download": {
    "title": "Скачать",
    "subtitle": "Скачайте Naia и начните общаться с вашим ИИ-аватаром.",
    "recommended": "Рекомендуется",
    "version": "Версия",
    "releaseNotes": "Примечания к выпуску",
    "requirements": "Системные требования",
    "requirementsList": [
      "Linux x86_64",
      "Wayland или X11",
      "Node.js 22+ (для AppImage/deb/rpm)",
    ],
    "formats": {
      "flatpak": {
        "name": "Flatpak",
        "description": "Самый безопасный способ установки. Запускается в изолированной среде.",
        "command": "flatpak install --user ./Naia-Shell-x86_64.flatpak",
      },
      "appimage": {
        "name": "AppImage",
        "description": "Один исполняемый файл. Запускается напрямую без установки.",
        "command": "chmod +x Naia_0.1.0_amd64.AppImage && ./Naia_0.1.0_amd64.AppImage",
      },
      "deb": {
        "name": "DEB",
        "description": "Для Debian, Ubuntu и других дистрибутивов на базе apt.",
        "command": "sudo dpkg -i naia_*.deb",
      },
      "rpm": {
        "name": "RPM",
        "description": "Для Fedora, RHEL и других дистрибутивов на базе rpm.",
        "command": "sudo rpm -i naia-*.rpm",
      },
    },
    "checksum": "Проверка контрольных сумм",
    "checksumDescription": "Для проверки целостности загруженных файлов:",
    "allReleases": "Просмотреть все выпуски",
    "sourceCode": "Исходный код",
  },
  "billing": {
    "title": "Биллинг",
    "currentPlan": "Текущий план",
    "creditBalance": "Кредитный баланс",
    "periodUsage": "Период использования",
    "comparePlans": "Сравнить планы",
    "upgrade": "Обновление",
    "free": "БЕСПЛАТНО",
    "basic": "БАЗОВЫЙ",
    "currentBadge": "Текущий",
    "freeFeatures": [
      "20 регистрационных кредитов",
      "Ежемесячное пополнение минимум 10",
      "Доступ к моделям Близнецов"
    ],
    "basicFeatures": [
      "100 ежемесячных кредитов",
      "Приоритетная поддержка",
      "Качественный голос"
    ],
    "lemonNotice": "Платежи обрабатываются LemonSqueezy. Пожалуйста, ознакомьтесь с правилами выставления счетов и возврата средств.",
    "pricingModelsSynced": "Модели ценообразования синхронизированы"
  }
};

export default ru;
