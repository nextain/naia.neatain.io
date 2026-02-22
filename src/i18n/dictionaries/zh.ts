import type { Dictionary } from "./types";

const zh: Dictionary = {
  "locale": "zh",
  "meta": {
    "title": "奈亚操作系统",
    "description": "Naia OS——您的个人人工智能，变得简单。与 3D AI助手 聊天、交谈和工作。"
  },
  "common": {
    "loading": "正在加载...",
    "loadingShort": "正在加载...",
    "error": "发生错误",
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "confirm": "确认",
    "copy": "复制",
    "copied": "已复制",
    "comingSoon": "即将推出",
    "backTo": "返回",
    "prev": "上一篇",
    "next": "下一步",
    "page": "页面"
  },
  "header": {
    "home": "首页",
    "pricing": "定价",
    "faq": "常见问题解答",
    "download": "下载",
    "login": "登录",
    "dashboard": "仪表板",
    "toggleMenu": "切换菜单",
    "manual": "手册"
  },
  "footer": {
    "brand": "奈亚操作系统",
    "tagline": "科技与情感的邂逅",
    "links": {
      "privacy": "隐私政策",
      "terms": "服务条款",
      "refund": "退款政策",
      "contact": "联系方式"
    },
    "copyright": "© 2026 Nextain。版权所有。"
  },
  "auth": {
    "loginTitle": "登录/注册",
    "loginDescription": "开始使用您的社交帐户",
    "googleLogin": "继续使用谷歌",
    "discordLogin": "继续不和谐",
    "logout": "退出",
    "callbackRedirecting": "正在重定向到桌面应用程序...",
    "callbackManualPrefix": "如果没有自动打开，",
    "callbackManualLink": "点击这里",
    "callbackManualSuffix": "。"
  },
  "home": {
    "hero": {
      "title": "最先进的AI代理，作为完美的操作系统。",
      "subtitle": "从7个AI提供商整合到终端控制，以及表达情感的VRM化身。无需成为开发者即可体验的完整AI生态系统，Naia OS。",
      "cta": "免费开始使用",
      "secondaryCta": "下载"
    },
    "features": {
      "title": "是什么让奈亚如此特别",
      "subtitle": "体验人工智能代理的力量——无需编码",
      "items": {
        "companion": {
          "title": "AI助手",
          "description": "带有情感的 3D 头像就在您的桌面上。 AI助手 通过面部表情和眼神交流对对话做出反应。"
        },
        "multiProvider": {
          "title": "7个AI提供商支持",
          "description": "Gemini、Claude、GPT、Grok、zAI、Ollama、Claude Code CLI — 使用积分或自己的API密钥自由切换。"
        },
        "voice": {
          "title": "语音对话",
          "description": "通过语音提问，获得口头答复。 AI助手 通过口型同步动画自然地回答。"
        },
        "tools": {
          "title": "工具执行",
          "description": "文件编辑、终端命令、网络搜索。 AI助手直接调用工具来完成工作。"
        },
        "desktop": {
          "title": "一键安装和操作系统",
          "description": "一键安装桌面应用程序，或使用 Linux 操作系统映像创建专用的 AI 环境。"
        }
      }
    },
    "pricing": {
      "title": "简单的定价",
      "subtitle": "只为您需要的东西付费",
      "policyNote": "请查看下面的账单、退款和政策文件。",
      "free": {
        "name": "免费",
        "price": "$0",
        "period": "永远",
        "description": "只需注册即可开始",
        "features": [
          "注册即可获得 20 个积分",
          "每月补充 10 个积分",
          "双子座车型",
          "基本语音聊天",
          "社区支持"
        ],
        "cta": "免费开始"
      },
      "basic": {
        "name": "基本",
        "price": "10 美元",
        "period": "莫",
        "description": "对于那些想要更多的人",
        "features": [
          "每月 100 学分",
          "双子座车型",
          "高品质语音聊天",
          "优先支持",
          "先进的语音功能"
        ],
        "cta": "升级"
      }
    },
    "faq": {
      "title": "常见问题解答"
    }
  },
  "sidebar": {
    "dashboard": "仪表板",
    "usage": "用途",
    "logs": "日志",
    "keys": "API 密钥",
    "settings": "设置",
    "billing": "计费"
  },
  "dashboard": {
    "title": "仪表板",
    "creditBalance": "信用余额",
    "totalRequests": "请求总数",
    "totalTokens": "代币总数",
    "totalSpend": "总支出",
    "currentPeriod": "当前期间",
    "quickLinks": "快速链接",
    "statusActive": "活跃",
    "statusBlocked": "被阻止"
  },
  "usage": {
    "title": "用途",
    "period": {
      "days7": "7天",
      "days30": "30天",
      "days90": "90天"
    },
    "requestsPerDay": "请求/天",
    "tokensPerDay": "代币/天",
    "spendPerDay": "花费/天",
    "noData": "所选期间没有数据"
  },
  "logs": {
    "title": "日志",
    "all": "全部",
    "filterStatus": "状态过滤器",
    "filterModel": "型号 过滤器",
    "columns": {
      "time": "时间",
      "status": "状态",
      "model": "型号",
      "tokens": "代币",
      "cost": "成本"
    },
    "details": {
      "id": "日志ID",
      "endpoint": "端点",
      "provider": "提供者",
      "promptTokens": "提示标记",
      "completionTokens": "完成令牌",
      "error": "错误"
    },
    "noLogs": "还没有日志",
    "expandDetails": "显示详情"
  },
  "keys": {
    "title": "API 密钥",
    "createKey": "创建密钥",
    "keyName": "按键名称",
    "keyNamePlaceholder": "例如我的桌面键",
    "expires": "过期",
    "noExpiry": "无有效期",
    "days30": "30天",
    "days90": "90天",
    "days365": "1年",
    "columns": {
      "name": "名称",
      "status": "状态",
      "created": "已创建",
      "actions": "行动"
    },
    "noKeys": "尚未创建密钥",
    "deleteConfirm": "您确定要删除该密钥吗？",
    "keyCreated": "已创建密钥",
    "keyCreatedDescription": "该密钥只会显示一次。将其存放在安全的地方。",
    "active": "活跃",
    "revoked": "已撤销",
    "unnamed": "未命名键",
    "forbiddenAction": "您没有此密钥的权限。"
  },
  "settings": {
    "title": "设置",
    "profile": {
      "title": "公司简介",
      "name": "名称",
      "email": "电子邮件",
      "avatar": "阿凡达",
      "provider": "登录提供商",
      "gatewayId": "网关ID",
      "budgetId": "预算 ID"
    },
    "connectedAccounts": {
      "title": "关联账户",
      "google": "谷歌",
      "discord": "不和谐"
    },
    "desktopApp": {
      "title": "桌面应用程序连接",
      "description": "将您的 Naia OS 桌面应用程序与此帐户连接。",
      "issueKey": "发出连接密钥"
    },
    "appearance": {
      "title": "外观",
      "theme": "主题",
      "themeLight": "主题1（光）",
      "themeDark": "主题 2（黑暗）",
      "themeSystem": "系统",
      "language": "语言"
    },
    "integrations": {
      "title": "集成",
      "description": "通过 Discord 向 Naia 发送私信聊天。",
      "discord": {
        "title": "Discord",
        "connected": "已连接",
        "notConnected": "未连接",
        "connectedHint": "如果您使用 Discord 登录，可以直接向 Naia 发送私信。",
        "inviteBot": "向 Naia 发送私信",
        "inviteBotDescription": "在 Discord 上向 Naia 机器人发送私信进行聊天。",
        "howToUse": "在 Discord 上向 Naia 机器人发送私信。积分将自动从此帐户扣除。"
      },
      "googleChat": {
        "title": "谷歌聊天",
        "connected": "准备中",
        "notConnected": "准备中",
        "connectedHint": "Google Chat 集成目前正在准备中。",
        "howToUse": "准备中 — 即将推出。"
      },
      "viewGuide": "查看设置指南"
    }
  },
  "manual": {
    "title": "用户手册",
    "subtitle": "Naia OS 桌面应用指南",
    "toc": "目录",
    "prev": "上一页",
    "next": "下一步",
    "backToToc": "返回目录",
    "sections": {
      "install": "安装部署",
      "gettingStarted": "开始使用",
      "mainScreen": "主屏幕",
      "chat": "聊天",
      "history": "对话历史记录",
      "progress": "工作进展",
      "skills": "技能",
      "channels": "渠道",
      "agents": "代理商",
      "diagnostics": "诊断",
      "settings": "设置",
      "tools": "工具详情",
      "lab": "Nextain",
      "troubleshooting": "故障排除"
    }
  },
  "download": {
    "title": "下载",
    "subtitle": "下载 Naia OS，与您的 AI 虚拟形象开始对话。",
    "recommended": "推荐",
    "version": "版本",
    "releaseNotes": "发行说明",
    "requirements": "系统要求",
    "requirementsList": [
      "Linux x86_64",
      "Wayland 或 X11",
      "Node.js 22+（适用于 AppImage/deb/rpm）",
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
    "checksum": "校验和验证",
    "checksumDescription": "验证下载文件的完整性：",
    "allReleases": "查看所有版本",
    "sourceCode": "源代码",
  },
  "billing": {
    "title": "计费",
    "currentPlan": "当前计划",
    "creditBalance": "信用余额",
    "periodUsage": "期间使用情况",
    "comparePlans": "比较计划",
    "upgrade": "升级",
    "free": "免费",
    "basic": "基本",
    "currentBadge": "当前",
    "freeFeatures": [
      "20 个注册积分",
      "每月至少补充 10 次",
      "双子座模型访问"
    ],
    "basicFeatures": [
      "100 每月积分",
      "优先支持",
      "高品质语音"
    ],
    "lemonNotice": "付款由 LemonSqueezy 处理。请查看计费和退款政策。",
    "pricingModelsSynced": "定价模型已同步"
  }
};

export default zh;
