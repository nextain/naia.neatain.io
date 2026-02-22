import type { Locale } from "../config";

export interface Dictionary {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  common: {
    loading: string;
    loadingShort: string;
    error: string;
    save: string;
    cancel: string;
    delete: string;
    confirm: string;
    copy: string;
    copied: string;
    comingSoon: string;
    backTo: string;
    prev: string;
    next: string;
    page: string;
  };
  header: {
    home: string;
    pricing: string;
    faq: string;
    download: string;
    login: string;
    dashboard: string;
    toggleMenu: string;
    manual: string;
  };
  footer: {
    brand: string;
    tagline: string;
    links: {
      privacy: string;
      terms: string;
      refund: string;
      contact: string;
    };
    copyright: string;
  };
  auth: {
    loginTitle: string;
    loginDescription: string;
    googleLogin: string;
    discordLogin: string;
    logout: string;
    callbackRedirecting: string;
    callbackManualPrefix: string;
    callbackManualLink: string;
    callbackManualSuffix: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      secondaryCta: string;
    };
    features: {
      title: string;
      subtitle: string;
      items: {
        companion: { title: string; description: string };
        multiProvider: { title: string; description: string };
        voice: { title: string; description: string };
        tools: { title: string; description: string };
        desktop: { title: string; description: string };
        skills: { title: string; description: string };
        discord: { title: string; description: string };
        daemon: { title: string; description: string };
      };
    };
    comparison: {
      title: string;
      subtitle: string;
      headers: { category: string; others: string; naia: string };
      rows: {
        ui: { category: string; others: string; naia: string };
        target: { category: string; others: string; naia: string };
        llm: { category: string; others: string; naia: string };
        avatar: { category: string; others: string; naia: string };
        skills: { category: string; others: string; naia: string };
        deploy: { category: string; others: string; naia: string };
        voice: { category: string; others: string; naia: string };
        i18n: { category: string; others: string; naia: string };
        platform: { category: string; others: string; naia: string };
        cost: { category: string; others: string; naia: string };
      };
    };
    pricing: {
      title: string;
      subtitle: string;
      policyNote: string;
      free: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
      basic: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
    faq: {
      title: string;
    };
  };
  sidebar: {
    dashboard: string;
    usage: string;
    logs: string;
    keys: string;
    settings: string;
    billing: string;
  };
  dashboard: {
    title: string;
    creditBalance: string;
    totalRequests: string;
    totalTokens: string;
    totalSpend: string;
    currentPeriod: string;
    quickLinks: string;
    statusActive: string;
    statusBlocked: string;
  };
  usage: {
    title: string;
    period: {
      days7: string;
      days30: string;
      days90: string;
    };
    requestsPerDay: string;
    tokensPerDay: string;
    spendPerDay: string;
    noData: string;
  };
  logs: {
    title: string;
    all: string;
    filterStatus: string;
    filterModel: string;
    columns: {
      time: string;
      status: string;
      model: string;
      tokens: string;
      cost: string;
    };
    details: {
      id: string;
      endpoint: string;
      provider: string;
      promptTokens: string;
      completionTokens: string;
      error: string;
    };
    noLogs: string;
    expandDetails: string;
  };
  keys: {
    title: string;
    createKey: string;
    keyName: string;
    keyNamePlaceholder: string;
    expires: string;
    noExpiry: string;
    days30: string;
    days90: string;
    days365: string;
    columns: {
      name: string;
      status: string;
      created: string;
      actions: string;
    };
    noKeys: string;
    deleteConfirm: string;
    keyCreated: string;
    keyCreatedDescription: string;
    active: string;
    revoked: string;
    unnamed: string;
    forbiddenAction: string;
  };
  settings: {
    title: string;
    profile: {
      title: string;
      name: string;
      email: string;
      avatar: string;
      provider: string;
      gatewayId: string;
      budgetId: string;
    };
    connectedAccounts: {
      title: string;
      google: string;
      discord: string;
    };
    desktopApp: {
      title: string;
      description: string;
      issueKey: string;
    };
    appearance: {
      title: string;
      theme: string;
      themeLight: string;
      themeDark: string;
      themeSystem: string;
      language: string;
    };
    integrations: {
      title: string;
      description: string;
      discord: {
        title: string;
        connected: string;
        notConnected: string;
        connectedHint: string;
        inviteBot: string;
        inviteBotDescription: string;
        howToUse: string;
      };
      googleChat: {
        title: string;
        connected: string;
        notConnected: string;
        connectedHint: string;
        howToUse: string;
      };
      viewGuide: string;
    };
  };
  manual: {
    title: string;
    subtitle: string;
    toc: string;
    prev: string;
    next: string;
    backToToc: string;
    sections: {
      install: string;
      gettingStarted: string;
      mainScreen: string;
      chat: string;
      history: string;
      progress: string;
      skills: string;
      channels: string;
      agents: string;
      diagnostics: string;
      settings: string;
      tools: string;
      naiaAccount: string;
      troubleshooting: string;
    };
  };
  download: {
    title: string;
    subtitle: string;
    recommended: string;
    version: string;
    releaseNotes: string;
    requirements: string;
    requirementsList: string[];
    formats: {
      flatpak: { name: string; description: string; command: string };
      appimage: { name: string; description: string; command: string };
      deb: { name: string; description: string; command: string };
      rpm: { name: string; description: string; command: string };
    };
    checksum: string;
    checksumDescription: string;
    allReleases: string;
    sourceCode: string;
  };
  billing: {
    title: string;
    currentPlan: string;
    creditBalance: string;
    periodUsage: string;
    comparePlans: string;
    upgrade: string;
    free: string;
    basic: string;
    currentBadge: string;
    freeFeatures: string[];
    basicFeatures: string[];
    lemonNotice: string;
    pricingModelsSynced: string;
  };
}
