/**
 * Naia OS Desktop App UI Screenshot Capture
 * Each tab = separate page to avoid blocking issues
 * Viewport: 400x768, 2x scale
 *
 * Key mock strategy:
 * - __TAURI_INTERNALS__ with invoke + event listener system
 * - send_to_agent_command → emit agent_response events (tool_result + finish)
 * - discord_api invoke → mock Discord messages
 * - Zustand stores exposed on window for direct data injection
 */
import { chromium, type Browser, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:1420";
const VIEWPORT = { width: 400, height: 768 };
const MANUAL_DIR = path.resolve(__dirname, "../public/manual");

const ALL_LOCALES = ["ko", "en", "ja", "zh", "fr", "de", "ru", "es", "ar", "hi", "bn", "pt", "id", "vi"] as const;

// ─── Tauri Mock (comprehensive) ─────────────────────────────
// This mock must handle:
// 1. invoke() — Tauri commands
// 2. listen() — Event listener (via transformCallback)
// 3. send_to_agent_command → auto-emit agent_response events
// 4. discord_api → mock Discord REST API
const TAURI_MOCK = `
(function() {
  // Event listener registry
  const _listeners = {};
  let _callbackId = 0;

  function emitEvent(eventName, payload) {
    const handlers = _listeners[eventName] || [];
    handlers.forEach(fn => {
      try { fn({ payload: typeof payload === 'string' ? payload : JSON.stringify(payload) }); } catch(e) {}
    });
  }

  // i18n lookup for mock data — 14 languages
  const _locale = window.__MOCK_LOCALE || "ko";
  const _i18n = {
    sessionWeather:  {ko:"날씨와 메모",en:"Weather & Memo",ja:"天気とメモ",zh:"天气与备忘",fr:"Météo & Mémo",de:"Wetter & Memo",ru:"Погода и заметки",es:"Clima y Memo",ar:"الطقس والملاحظات",hi:"मौसम और मेमो",bn:"আবহাওয়া ও মেমো",pt:"Clima e Memo",id:"Cuaca & Memo",vi:"Thời tiết & Ghi chú"},
    sessionCode:     {ko:"코드 리뷰",en:"Code Review",ja:"コードレビュー",zh:"代码审查",fr:"Revue de code",de:"Code-Review",ru:"Обзор кода",es:"Revisión de código",ar:"مراجعة الكود",hi:"कोड समीक्षा",bn:"কোড রিভিউ",pt:"Revisão de código",id:"Tinjauan Kode",vi:"Đánh giá mã"},
    sessionSchedule: {ko:"일정 관리",en:"Schedule",ja:"スケジュール",zh:"日程管理",fr:"Agenda",de:"Terminplan",ru:"Расписание",es:"Agenda",ar:"الجدول",hi:"शेड्यूल",bn:"সূচি",pt:"Agenda",id:"Jadwal",vi:"Lịch trình"},
    agentDefault:    {ko:"기본 AI 컴패니언",en:"Default AI Companion",ja:"デフォルトAIコンパニオン",zh:"默认AI伙伴",fr:"Compagnon IA par défaut",de:"Standard-KI-Begleiter",ru:"Компаньон ИИ по умолчанию",es:"Compañero IA predeterminado",ar:"رفيق الذكاء الاصطناعي الافتراضي",hi:"डिफ़ॉल्ट AI साथी",bn:"ডিফল্ট AI সঙ্গী",pt:"Companheiro IA padrão",id:"Pendamping AI Default",vi:"Trợ lý AI mặc định"},
    agentCoder:      {ko:"코딩 에이전트",en:"Coding Agent",ja:"コーディングエージェント",zh:"编程代理",fr:"Agent de code",de:"Coding-Agent",ru:"Агент кодирования",es:"Agente de código",ar:"وكيل البرمجة",hi:"कोडिंग एजेंट",bn:"কোডিং এজেন্ট",pt:"Agente de código",id:"Agen Coding",vi:"Trợ lý lập trình"},
    agentCoderDesc:  {ko:"코드 작성 및 리뷰 전문",en:"Code writing & review specialist",ja:"コード作成とレビューの専門家",zh:"代码编写与审查专家",fr:"Spécialiste écriture et revue de code",de:"Spezialist für Code-Erstellung und -Review",ru:"Специалист по написанию и обзору кода",es:"Especialista en escritura y revisión de código",ar:"متخصص في كتابة ومراجعة الكود",hi:"कोड लेखन और समीक्षा विशेषज्ञ",bn:"কোড লেখা ও রিভিউ বিশেষজ্ঞ",pt:"Especialista em escrita e revisão de código",id:"Spesialis penulisan & review kode",vi:"Chuyên gia viết và đánh giá mã"},
    discordQ1:       {ko:"나이아, 내일 회의 시간 알려줘",en:"Naia, when is tomorrow's meeting?",ja:"ナイア、明日の会議はいつ？",zh:"Naia，明天的会议是什么时候？",fr:"Naia, c'est quand la réunion demain ?",de:"Naia, wann ist das Meeting morgen?",ru:"Найя, когда завтра встреча?",es:"Naia, ¿cuándo es la reunión mañana?",ar:"نايا، متى اجتماع الغد؟",hi:"नाइया, कल की मीटिंग कब है?",bn:"নাইয়া, আগামীকাল মিটিং কখন?",pt:"Naia, quando é a reunião amanhã?",id:"Naia, kapan rapat besok?",vi:"Naia, cuộc họp ngày mai lúc mấy giờ?"},
    discordA1:       {ko:"내일 오후 3시에 팀 미팅이 있어요! 📋",en:"You have a team meeting at 3 PM tomorrow! 📋",ja:"明日午後3時にチームミーティングがあります！📋",zh:"明天下午3点有团队会议！📋",fr:"Vous avez une réunion d'équipe demain à 15h ! 📋",de:"Morgen um 15 Uhr ist ein Team-Meeting! 📋",ru:"Завтра в 15:00 командная встреча! 📋",es:"¡Tienes una reunión de equipo mañana a las 3 PM! 📋",ar:"لديك اجتماع فريق غداً الساعة 3 مساءً! 📋",hi:"कल दोपहर 3 बजे टीम मीटिंग है! 📋",bn:"আগামীকাল বিকেল ৩টায় টিম মিটিং আছে! 📋",pt:"Você tem reunião de equipe amanhã às 15h! 📋",id:"Besok ada rapat tim jam 3 sore! 📋",vi:"Bạn có họp nhóm lúc 3 giờ chiều mai! 📋"},
    discordQ2:       {ko:"고마워. 오늘 날씨는?",en:"Thanks. What's the weather today?",ja:"ありがとう。今日の天気は？",zh:"谢谢。今天天气怎么样？",fr:"Merci. Quel temps fait-il ?",de:"Danke. Wie ist das Wetter heute?",ru:"Спасибо. Какая сегодня погода?",es:"Gracias. ¿Qué tiempo hace hoy?",ar:"شكراً. كيف الطقس اليوم؟",hi:"धन्यवाद। आज मौसम कैसा है?",bn:"ধন্যবাদ। আজকের আবহাওয়া কেমন?",pt:"Obrigado. Como está o tempo hoje?",id:"Terima kasih. Bagaimana cuaca hari ini?",vi:"Cảm ơn. Thời tiết hôm nay thế nào?"},
    discordA2:       {ko:"오늘 서울은 맑고 12°C예요. 가벼운 겉옷 추천해요! 🌤️",en:"It's clear and 12°C in Seoul today. A light jacket is recommended! 🌤️",ja:"今日のソウルは晴れで12°Cです。軽い上着がおすすめです！🌤️",zh:"今天首尔晴朗12°C，建议带薄外套！🌤️",fr:"Il fait beau et 12°C à Séoul. Une veste légère est conseillée ! 🌤️",de:"Heute klar und 12°C in Seoul. Leichte Jacke empfohlen! 🌤️",ru:"Сегодня в Сеуле ясно, 12°C. Рекомендую лёгкую куртку! 🌤️",es:"Hoy en Seúl está despejado y 12°C. ¡Se recomienda chaqueta ligera! 🌤️",ar:"اليوم صافٍ 12°C في سيول. أنصح بسترة خفيفة! 🌤️",hi:"आज सियोल में साफ़ और 12°C है। हल्की जैकेट लें! 🌤️",bn:"আজ সিউলে পরিষ্কার ১২°C। হালকা জ্যাকেট নিন! 🌤️",pt:"Hoje está claro e 12°C em Seul. Recomendo jaqueta leve! 🌤️",id:"Hari ini cerah 12°C di Seoul. Bawa jaket tipis! 🌤️",vi:"Hôm nay Seoul quang đãng 12°C. Nên mang áo khoác nhẹ! 🌤️"},
    discordQ3:       {ko:"알겠어, 감사!",en:"Got it, thanks!",ja:"了解、ありがとう！",zh:"好的，谢谢！",fr:"Compris, merci !",de:"Verstanden, danke!",ru:"Понял, спасибо!",es:"Entendido, ¡gracias!",ar:"فهمت، شكراً!",hi:"समझ गया, धन्यवाद!",bn:"বুঝেছি, ধন্যবাদ!",pt:"Entendi, obrigado!",id:"Mengerti, terima kasih!",vi:"Hiểu rồi, cảm ơn!"},
    skillTime:       {ko:"현재 날짜/시간 확인",en:"Check current date/time",ja:"現在の日時を確認",zh:"查看当前日期/时间",fr:"Vérifier la date/heure",de:"Datum/Uhrzeit prüfen",ru:"Проверить дату/время",es:"Ver fecha/hora actual",ar:"التحقق من التاريخ/الوقت",hi:"वर्तमान तिथि/समय जांचें",bn:"বর্তমান তারিখ/সময় দেখুন",pt:"Verificar data/hora",id:"Cek tanggal/waktu",vi:"Kiểm tra ngày/giờ"},
    skillStatus:     {ko:"시스템 상태 확인",en:"Check system status",ja:"システム状態を確認",zh:"检查系统状态",fr:"Vérifier l'état du système",de:"Systemstatus prüfen",ru:"Проверить статус системы",es:"Verificar estado del sistema",ar:"التحقق من حالة النظام",hi:"सिस्टम स्थिति जांचें",bn:"সিস্টেম স্ট্যাটাস দেখুন",pt:"Verificar status do sistema",id:"Cek status sistem",vi:"Kiểm tra trạng thái hệ thống"},
    skillMemo:       {ko:"메모 저장/조회",en:"Save/read memos",ja:"メモの保存/閲覧",zh:"保存/查看备忘录",fr:"Sauvegarder/lire mémos",de:"Memos speichern/lesen",ru:"Сохранить/прочитать заметки",es:"Guardar/leer memos",ar:"حفظ/قراءة الملاحظات",hi:"मेमो सेव/पढ़ें",bn:"মেমো সেভ/পড়ুন",pt:"Salvar/ler memos",id:"Simpan/baca memo",vi:"Lưu/đọc ghi chú"},
    skillWeather:    {ko:"날씨 조회",en:"Check weather",ja:"天気を確認",zh:"查看天气",fr:"Consulter la météo",de:"Wetter prüfen",ru:"Проверить погоду",es:"Consultar el clima",ar:"التحقق من الطقس",hi:"मौसम जांचें",bn:"আবহাওয়া দেখুন",pt:"Verificar clima",id:"Cek cuaca",vi:"Kiểm tra thời tiết"},
    skillDiscord:    {ko:"Discord DM 전송",en:"Send Discord DM",ja:"Discord DMを送信",zh:"发送Discord私信",fr:"Envoyer un DM Discord",de:"Discord-DM senden",ru:"Отправить DM в Discord",es:"Enviar DM de Discord",ar:"إرسال رسالة Discord",hi:"Discord DM भेजें",bn:"Discord DM পাঠান",pt:"Enviar DM no Discord",id:"Kirim DM Discord",vi:"Gửi DM Discord"},
    skillSoul:       {ko:"AI 페르소나 관리",en:"Manage AI persona",ja:"AIペルソナ管理",zh:"管理AI人格",fr:"Gérer le persona IA",de:"KI-Persona verwalten",ru:"Управление персоной ИИ",es:"Gestionar persona IA",ar:"إدارة شخصية الذكاء الاصطناعي",hi:"AI व्यक्तित्व प्रबंधन",bn:"AI পারসোনা ম্যানেজ",pt:"Gerenciar persona IA",id:"Kelola persona AI",vi:"Quản lý nhân cách AI"},
    skillExit:       {ko:"앱 종료",en:"Exit app",ja:"アプリ終了",zh:"退出应用",fr:"Quitter l'appli",de:"App beenden",ru:"Выйти из приложения",es:"Salir de la app",ar:"إغلاق التطبيق",hi:"ऐप बंद करें",bn:"অ্যাপ বন্ধ করুন",pt:"Sair do app",id:"Keluar aplikasi",vi:"Thoát ứng dụng"},
    skillReadFile:   {ko:"파일 읽기",en:"Read file",ja:"ファイル読み取り",zh:"读取文件",fr:"Lire un fichier",de:"Datei lesen",ru:"Прочитать файл",es:"Leer archivo",ar:"قراءة ملف",hi:"फ़ाइल पढ़ें",bn:"ফাইল পড়ুন",pt:"Ler arquivo",id:"Baca file",vi:"Đọc tệp"},
    skillWriteFile:  {ko:"파일 쓰기",en:"Write file",ja:"ファイル書き込み",zh:"写入文件",fr:"Écrire un fichier",de:"Datei schreiben",ru:"Записать файл",es:"Escribir archivo",ar:"كتابة ملف",hi:"फ़ाइल लिखें",bn:"ফাইল লিখুন",pt:"Escrever arquivo",id:"Tulis file",vi:"Ghi tệp"},
    skillExecCmd:    {ko:"명령 실행",en:"Execute command",ja:"コマンド実行",zh:"执行命令",fr:"Exécuter commande",de:"Befehl ausführen",ru:"Выполнить команду",es:"Ejecutar comando",ar:"تنفيذ أمر",hi:"कमांड चलाएं",bn:"কমান্ড চালান",pt:"Executar comando",id:"Jalankan perintah",vi:"Thực thi lệnh"},
    skillWebSearch:  {ko:"웹 검색",en:"Web search",ja:"ウェブ検索",zh:"网页搜索",fr:"Recherche web",de:"Websuche",ru:"Поиск в интернете",es:"Búsqueda web",ar:"بحث على الويب",hi:"वेब खोज",bn:"ওয়েব সার্চ",pt:"Pesquisa web",id:"Pencarian web",vi:"Tìm kiếm web"},
    skillSlack:      {ko:"Slack 알림",en:"Slack notification",ja:"Slack通知",zh:"Slack通知",fr:"Notification Slack",de:"Slack-Benachrichtigung",ru:"Уведомление Slack",es:"Notificación Slack",ar:"إشعار Slack",hi:"Slack सूचना",bn:"Slack নোটিফিকেশন",pt:"Notificação Slack",id:"Notifikasi Slack",vi:"Thông báo Slack"},
    skillDiscordNotif:{ko:"Discord 알림",en:"Discord notification",ja:"Discord通知",zh:"Discord通知",fr:"Notification Discord",de:"Discord-Benachrichtigung",ru:"Уведомление Discord",es:"Notificación Discord",ar:"إشعار Discord",hi:"Discord सूचना",bn:"Discord নোটিফিকেশন",pt:"Notificação Discord",id:"Notifikasi Discord",vi:"Thông báo Discord"},
    weatherClear:    {ko:"맑음 12°C",en:"Clear 12°C",ja:"晴れ 12°C",zh:"晴 12°C",fr:"Clair 12°C",de:"Klar 12°C",ru:"Ясно 12°C",es:"Despejado 12°C",ar:"صافٍ 12°C",hi:"साफ़ 12°C",bn:"পরিষ্কার ১২°C",pt:"Limpo 12°C",id:"Cerah 12°C",vi:"Quang 12°C"},
  };
  const _t = (key) => _i18n[key]?.[_locale] || _i18n[key]?.["en"] || key;

  // Gateway mock responses for directToolCall pattern
  const GATEWAY_RESPONSES = {
    skill_sessions: (args) => {
      if (args.action === "list") return JSON.stringify({
        sessions: [
          { key: "session-001", label: _t("sessionWeather"), messageCount: 6, createdAt: Date.now()-3600000, updatedAt: Date.now()-300000 },
          { key: "session-002", label: _t("sessionCode"), messageCount: 12, createdAt: Date.now()-86400000, updatedAt: Date.now()-7200000 },
          { key: "session-003", label: _t("sessionSchedule"), messageCount: 4, createdAt: Date.now()-172800000, updatedAt: Date.now()-86400000 },
          { key: "discord:dm:123456", label: "Discord DM", messageCount: 8, createdAt: Date.now()-86400000, updatedAt: Date.now()-3600000 },
        ]
      });
      return "{}";
    },
    skill_agents: (args) => {
      if (args.action === "list") return JSON.stringify({
        agents: [
          { id: "naia-default", name: "Naia", description: _t("agentDefault"), model: "gemini-2.0-flash" },
          { id: "coder-agent", name: _t("agentCoder"), description: _t("agentCoderDesc"), model: "claude-sonnet-4-6" },
        ]
      });
      return "{}";
    },
    skill_diagnostics: (args) => {
      if (args.action === "status") return JSON.stringify({
        ok: true, version: "0.4.2", uptime: 3847,
        methods: [
          "skill_time","skill_weather","skill_memo","skill_system_status",
          "skill_soul","skill_naia_discord","skill_exit",
          "skill_read_file","skill_write_file","skill_execute_command",
          "skill_web_search","skill_notify_slack","skill_notify_discord",
        ],
      });
      if (args.action === "logs_poll") return JSON.stringify({
        cursor: 100,
        lines: [
          '{"0":"Gateway started on port 18789","_meta":{"logLevelName":"INFO","date":"2026-02-23T09:00:01Z"}}',
          '{"0":"Agent connected (PID: 384521)","_meta":{"logLevelName":"INFO","date":"2026-02-23T09:00:02Z"}}',
          '{"0":"Loaded 13 skills from ~/.naia/skills/","_meta":{"logLevelName":"INFO","date":"2026-02-23T09:00:03Z"}}',
          '{"0":"TTS provider: nextain (Google Cloud)","_meta":{"logLevelName":"DEBUG","date":"2026-02-23T09:00:04Z"}}',
          '{"0":"Discord bot connected (DM channel ready)","_meta":{"logLevelName":"INFO","date":"2026-02-23T09:00:05Z"}}',
          '{"0":"Session started: session-demo-001","_meta":{"logLevelName":"INFO","date":"2026-02-23T10:04:50Z"}}',
          '{"0":"Tool executed: skill_weather → success","_meta":{"logLevelName":"INFO","date":"2026-02-23T10:05:13Z"}}',
          '{"0":"skill_web_search: timeout after 10s","_meta":{"logLevelName":"WARN","date":"2026-02-23T10:10:00Z"}}',
        ]
      });
      return "{}";
    },
  };

  // Discord mock messages
  const DISCORD_MESSAGES = [
    { id:"d1", content:_t("discordQ1"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T09:30:00Z" },
    { id:"d2", content:_t("discordA1"), author:{ id:"bot-999", username:"Naia", bot:true }, timestamp:"2026-02-23T09:30:05Z" },
    { id:"d3", content:_t("discordQ2"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T10:00:00Z" },
    { id:"d4", content:_t("discordA2"), author:{ id:"bot-999", username:"Naia", bot:true }, timestamp:"2026-02-23T10:00:05Z" },
    { id:"d5", content:_t("discordQ3"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T10:01:00Z" },
  ];

  window.__TAURI_INTERNALS__ = {
    invoke: (cmd, args) => {
      // Skills
      if (cmd === "list_skills") return Promise.resolve([
        {name:"skill_time",description:_t("skillTime"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_system_status",description:_t("skillStatus"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_memo",description:_t("skillMemo"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_weather",description:_t("skillWeather"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_naia_discord",description:_t("skillDiscord"),type_:"builtin",tier:"T1",enabled:true,source:"built-in"},
        {name:"skill_soul",description:_t("skillSoul"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_exit",description:_t("skillExit"),type_:"builtin",tier:"T2",enabled:true,source:"built-in"},
        {name:"skill_read_file",description:_t("skillReadFile"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_write_file",description:_t("skillWriteFile"),type_:"gateway",tier:"T2",enabled:true,source:"custom"},
        {name:"skill_execute_command",description:_t("skillExecCmd"),type_:"command",tier:"T3",enabled:true,source:"custom"},
        {name:"skill_web_search",description:_t("skillWebSearch"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_notify_slack",description:_t("skillSlack"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_notify_discord",description:_t("skillDiscordNotif"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
      ]);
      if (cmd === "list_vrm_files") return Promise.resolve([
        "/avatars/01-Sendagaya-Shino-uniform.vrm",
        "/avatars/02-Sakurada-Fumiriya.vrm",
        "/avatars/03-OL_Woman.vrm",
      ]);
      if (cmd === "list_background_files") return Promise.resolve([]);
      if (cmd === "get_agent_status") return Promise.resolve({ status: "idle" });
      if (cmd === "check_gateway_status") return Promise.resolve({ running: true, port: 18789 });
      if (cmd === "get_audit_log") return Promise.resolve([
        {id:1,timestamp:"2026-02-23T10:05:12Z",request_id:"r1",event_type:"tool_use",tool_name:"skill_time",tool_call_id:"tc1",tier:0,success:true,payload:null},
        {id:2,timestamp:"2026-02-23T10:05:13Z",request_id:"r1",event_type:"tool_result",tool_name:"skill_time",tool_call_id:"tc1",tier:0,success:true,payload:'{"time":"2026-02-23 10:05"}'},
        {id:3,timestamp:"2026-02-23T10:06:00Z",request_id:"r2",event_type:"usage",tool_name:null,tool_call_id:null,tier:null,success:true,payload:'{"cost":0.0012}'},
        {id:4,timestamp:"2026-02-23T10:07:30Z",request_id:"r3",event_type:"tool_use",tool_name:"skill_weather",tool_call_id:"tc2",tier:0,success:true,payload:null},
        {id:5,timestamp:"2026-02-23T10:07:31Z",request_id:"r3",event_type:"tool_result",tool_name:"skill_weather",tool_call_id:"tc2",tier:0,success:true,payload:JSON.stringify({weather:_t("weatherClear")})},
        {id:6,timestamp:"2026-02-23T10:08:00Z",request_id:"r4",event_type:"tool_use",tool_name:"skill_memo",tool_call_id:"tc3",tier:0,success:true,payload:null},
        {id:7,timestamp:"2026-02-23T10:08:01Z",request_id:"r4",event_type:"tool_result",tool_name:"skill_memo",tool_call_id:"tc3",tier:0,success:true,payload:'{"saved":true}'},
        {id:8,timestamp:"2026-02-23T10:10:00Z",request_id:"r5",event_type:"error",tool_name:"skill_web_search",tool_call_id:"tc4",tier:1,success:false,payload:'{"error":"timeout"}'},
      ]);
      if (cmd === "get_audit_stats") return Promise.resolve({
        total_events: 42, total_cost: 0.0156,
        by_event_type: [["tool_use",18],["tool_result",17],["usage",6],["error",1]],
        by_tool_name: [["skill_time",8],["skill_weather",6],["skill_memo",4],["skill_web_search",3],["skill_naia_discord",2]],
      });
      if (cmd === "get_diagnostics") return Promise.resolve({
        os: "Linux 6.17.7", arch: "x86_64", memory: "16 GB",
        gateway: { running: true, port: 18789 }, agent: { running: true },
      });

      // Discord API proxy via Rust
      if (cmd === "read_discord_bot_token") return Promise.resolve("mock-bot-token");
      if (cmd === "discord_api") {
        const endpoint = args?.endpoint || "";
        if (endpoint.includes("/users/@me")) return Promise.resolve(JSON.stringify({ id: "bot-999", username: "Naia", bot: true }));
        if (endpoint.includes("/messages")) return Promise.resolve(JSON.stringify(DISCORD_MESSAGES));
        if (endpoint.includes("/channels") && args?.method === "POST") {
          // open DM channel
          return Promise.resolve(JSON.stringify({ id: "dm-channel-mock-123" }));
        }
        return Promise.resolve("{}");
      }

      // Agent command — emit agent_response events asynchronously
      if (cmd === "send_to_agent_command") {
        const msgStr = args?.message || "{}";
        try {
          const msg = JSON.parse(msgStr);
          if (msg.type === "tool_request" && msg.toolName) {
            const handler = GATEWAY_RESPONSES[msg.toolName];
            const output = handler ? handler(msg.args || {}) : "{}";
            // Emit tool_result then finish after short delay
            setTimeout(() => {
              emitEvent("agent_response", {
                type: "tool_result", requestId: msg.requestId,
                success: true, output: output,
              });
              setTimeout(() => {
                emitEvent("agent_response", {
                  type: "finish", requestId: msg.requestId,
                });
              }, 50);
            }, 100);
          }
        } catch(e) {}
        return Promise.resolve(null);
      }

      // Tauri store plugin
      if (cmd === "plugin:store|get") return Promise.resolve(null);
      if (cmd === "plugin:store|set") return Promise.resolve(null);
      if (cmd === "plugin:store|has") return Promise.resolve(false);
      if (cmd === "plugin:opener|open_url") return Promise.resolve(null);
      if (cmd === "get_audit_logs") return Promise.resolve([]);

      return Promise.resolve(null);
    },

    metadata: { currentWindow: { label: "main" }, windows: [{ label: "main" }] },
    convertFileSrc: (p) => p,

    // Event system — transformCallback registers a JS callback and returns an ID
    transformCallback: (cb, once) => {
      const id = _callbackId++;
      window["_" + id] = cb;
      return id;
    },
  };

  // Patch for @tauri-apps/api/event listen()
  // listen() calls invoke("plugin:event|listen", { event, target, handler: transformCallback(cb) })
  // We intercept this to store callbacks
  const origInvoke = window.__TAURI_INTERNALS__.invoke;
  window.__TAURI_INTERNALS__.invoke = function(cmd, args) {
    if (cmd === "plugin:event|listen") {
      const eventName = args?.event;
      const handlerId = args?.handler;
      if (eventName && handlerId != null) {
        const cb = window["_" + handlerId];
        if (cb) {
          if (!_listeners[eventName]) _listeners[eventName] = [];
          _listeners[eventName].push(cb);
        }
      }
      return Promise.resolve(handlerId);
    }
    if (cmd === "plugin:event|unlisten") {
      return Promise.resolve(null);
    }
    return origInvoke(cmd, args);
  };

  // Expose emitEvent for external use
  window.__mockEmitEvent = emitEvent;
})();
`;

// ─── Config helpers ──────────────────────────────────────────
function configStr(locale: string, opts?: { labKey?: boolean; discord?: boolean }) {
  const cfg: Record<string, unknown> = {
    provider: "gemini", model: "gemini-2.0-flash",
    apiKey: "AIzaSyExampleKeyForScreenshot123456",
    locale, theme: "espresso",
    vrmModel: "/avatars/01-Sendagaya-Shino-uniform.vrm",
    ttsEnabled: true, sttEnabled: true, ttsProvider: "nextain",
    enableTools: true, userName: "Luke", agentName: "Naia",
    persona: "You are Naia, a friendly AI companion.",
    onboardingComplete: true,
    gatewayUrl: "http://127.0.0.1:18789",
  };
  if (opts?.labKey) {
    cfg.labKey = "gw-mock-screenshot-key";
    cfg.labUserId = "user-123";
  }
  if (opts?.discord) {
    cfg.discordDmChannelId = "dm-channel-mock-123";
    cfg.discordDefaultUserId = "user-456";
  }
  return JSON.stringify(cfg).replace(/'/g, "\\\\'");
}

// ─── Mock data injection (via window-exposed Zustand stores) ─

// Chat mock i18n — 14 languages
const CHAT_I18N: Record<string, Record<string, string>> = {
  weatherQ:     { ko:"오늘 날씨 알려줘", en:"What's the weather today?", ja:"今日の天気を教えて", zh:"今天天气怎么样？", fr:"Quel temps fait-il aujourd'hui ?", de:"Wie ist das Wetter heute?", ru:"Какая сегодня погода?", es:"¿Qué tiempo hace hoy?", ar:"كيف الطقس اليوم؟", hi:"आज मौसम कैसा है?", bn:"আজকের আবহাওয়া কেমন?", pt:"Como está o tempo hoje?", id:"Bagaimana cuaca hari ini?", vi:"Thời tiết hôm nay thế nào?" },
  weatherA:     { ko:"오늘 서울 날씨는 맑음이고, 현재 기온은 12°C입니다. 오후에는 최고 16°C까지 올라갈 예정이에요. 외출 시 가벼운 겉옷을 챙기시면 좋을 것 같아요!", en:"Today's weather in Seoul is clear with a current temperature of 12°C. The high will reach 16°C this afternoon. I'd recommend a light jacket if you're heading out!", ja:"今日のソウルの天気は晴れで、現在の気温は12°Cです。午後は最高16°Cまで上がる予定です。お出かけの際は軽い上着をお持ちください！", zh:"今天首尔天气晴朗，当前气温12°C。下午最高可达16°C。外出时建议带一件薄外套！", fr:"Aujourd'hui à Séoul, il fait beau avec 12°C actuellement. Le maximum sera de 16°C cet après-midi. Je vous conseille une veste légère !", de:"Heute ist es in Seoul klar bei 12°C. Am Nachmittag werden bis zu 16°C erwartet. Ich empfehle eine leichte Jacke!", ru:"Сегодня в Сеуле ясно, температура 12°C. Днём ожидается до 16°C. Рекомендую лёгкую куртку!", es:"Hoy en Seúl está despejado con 12°C. La máxima será de 16°C esta tarde. ¡Te recomiendo una chaqueta ligera!", ar:"الطقس في سيول اليوم صافٍ، درجة الحرارة 12°C. ستصل إلى 16°C بعد الظهر. أنصحك بارتداء سترة خفيفة!", hi:"आज सियोल में मौसम साफ़ है, तापमान 12°C। दोपहर में 16°C तक जाएगा। हल्की जैकेट ले जाना अच्छा रहेगा!", bn:"আজ সিউলে আবহাওয়া পরিষ্কার, তাপমাত্রা ১২°C। বিকেলে ১৬°C পর্যন্ত উঠবে। হালকা জ্যাকেট নিয়ে যাওয়া ভালো!", pt:"Hoje em Seul está claro com 12°C. A máxima será de 16°C à tarde. Recomendo levar uma jaqueta leve!", id:"Cuaca Seoul hari ini cerah, suhu 12°C. Sore ini akan mencapai 16°C. Saya sarankan bawa jaket tipis!", vi:"Hôm nay Seoul trời quang, nhiệt độ 12°C. Chiều nay lên đến 16°C. Bạn nên mang theo áo khoác nhẹ!" },
  memoQ:        { ko:"메모 저장해줘: 내일 오후 3시 미팅", en:"Save a memo: Meeting tomorrow at 3 PM", ja:"メモを保存して：明日午後3時にミーティング", zh:"保存备忘录：明天下午3点开会", fr:"Enregistre un mémo : Réunion demain à 15h", de:"Speichere ein Memo: Meeting morgen um 15 Uhr", ru:"Сохрани заметку: завтра встреча в 15:00", es:"Guarda un memo: Reunión mañana a las 3 PM", ar:"احفظ ملاحظة: اجتماع غداً الساعة 3 مساءً", hi:"मेमो सेव करो: कल दोपहर 3 बजे मीटिंग", bn:"মেমো সেভ করো: আগামীকাল বিকেল ৩টায় মিটিং", pt:"Salve um memo: Reunião amanhã às 15h", id:"Simpan memo: Rapat besok jam 3 sore", vi:"Lưu ghi chú: Họp ngày mai lúc 3 giờ chiều" },
  memoA:        { ko:"메모를 저장했어요!\n\n**내일 오후 3시 미팅** — 잊지 않도록 알려드릴게요.", en:"Memo saved!\n\n**Meeting tomorrow at 3 PM** — I'll make sure to remind you.", ja:"メモを保存しました！\n\n**明日午後3時にミーティング** — リマインドしますね。", zh:"备忘录已保存！\n\n**明天下午3点开会** — 我会提醒您的。", fr:"Mémo enregistré !\n\n**Réunion demain à 15h** — Je vous le rappellerai.", de:"Memo gespeichert!\n\n**Meeting morgen um 15 Uhr** — Ich erinnere Sie daran.", ru:"Заметка сохранена!\n\n**Встреча завтра в 15:00** — Напомню вам.", es:"¡Memo guardado!\n\n**Reunión mañana a las 3 PM** — Te lo recordaré.", ar:"تم حفظ الملاحظة!\n\n**اجتماع غداً الساعة 3 مساءً** — سأذكرك بذلك.", hi:"मेमो सेव हो गया!\n\n**कल दोपहर 3 बजे मीटिंग** — मैं आपको याद दिलाऊंगा।", bn:"মেমো সেভ হয়েছে!\n\n**আগামীকাল বিকেল ৩টায় মিটিং** — আমি মনে করিয়ে দেব।", pt:"Memo salvo!\n\n**Reunião amanhã às 15h** — Vou te lembrar.", id:"Memo tersimpan!\n\n**Rapat besok jam 3 sore** — Saya akan mengingatkan Anda.", vi:"Đã lưu ghi chú!\n\n**Họp ngày mai lúc 3 giờ chiều** — Tôi sẽ nhắc bạn." },
  memoContent:  { ko:"내일 오후 3시 미팅", en:"Meeting tomorrow at 3 PM", ja:"明日午後3時にミーティング", zh:"明天下午3点开会", fr:"Réunion demain à 15h", de:"Meeting morgen um 15 Uhr", ru:"Встреча завтра в 15:00", es:"Reunión mañana a las 3 PM", ar:"اجتماع غداً الساعة 3 مساءً", hi:"कल दोपहर 3 बजे मीटिंग", bn:"আগামীকাল বিকেল ৩টায় মিটিং", pt:"Reunião amanhã às 15h", id:"Rapat besok jam 3 sore", vi:"Họp ngày mai lúc 3 giờ chiều" },
  timeQ:        { ko:"지금 몇 시야?", en:"What time is it now?", ja:"今何時？", zh:"现在几点了？", fr:"Quelle heure est-il ?", de:"Wie spät ist es?", ru:"Который час?", es:"¿Qué hora es?", ar:"كم الساعة الآن؟", hi:"अभी क्या समय हुआ है?", bn:"এখন কটা বাজে?", pt:"Que horas são?", id:"Jam berapa sekarang?", vi:"Bây giờ mấy giờ rồi?" },
  timeA:        { ko:"지금은 오후 2시 35분이에요. 오늘 하루 잘 보내고 계신가요?", en:"It's 2:35 PM right now. How's your day going?", ja:"今は午後2時35分です。今日はいかがお過ごしですか？", zh:"现在是下午2点35分。今天过得怎么样？", fr:"Il est 14h35. Comment se passe votre journée ?", de:"Es ist 14:35 Uhr. Wie läuft Ihr Tag?", ru:"Сейчас 14:35. Как проходит ваш день?", es:"Son las 2:35 PM. ¿Cómo va tu día?", ar:"الساعة الآن 2:35 مساءً. كيف يومك؟", hi:"अभी दोपहर 2:35 बजे हैं। आपका दिन कैसा चल रहा है?", bn:"এখন দুপুর ২:৩৫। আপনার দিন কেমন যাচ্ছে?", pt:"São 14h35. Como está sendo seu dia?", id:"Sekarang jam 14.35. Bagaimana hari Anda?", vi:"Bây giờ là 2:35 chiều. Ngày hôm nay của bạn thế nào?" },
  approvalDesc: { ko:"시스템 명령어를 실행합니다", en:"Execute a system command", ja:"システムコマンドを実行します", zh:"执行系统命令", fr:"Exécuter une commande système", de:"Systembefehl ausführen", ru:"Выполнить системную команду", es:"Ejecutar un comando del sistema", ar:"تنفيذ أمر النظام", hi:"सिस्टम कमांड निष्पादित करें", bn:"সিস্টেম কমান্ড চালান", pt:"Executar um comando do sistema", id:"Jalankan perintah sistem", vi:"Thực thi lệnh hệ thống" },
  weatherClear: { ko:"맑음 12°C", en:"Clear 12°C", ja:"晴れ 12°C", zh:"晴 12°C", fr:"Clair 12°C", de:"Klar 12°C", ru:"Ясно 12°C", es:"Despejado 12°C", ar:"صافٍ 12°C", hi:"साफ़ 12°C", bn:"পরিষ্কার ১২°C", pt:"Limpo 12°C", id:"Cerah 12°C", vi:"Quang 12°C" },
};

function chatT(key: string, locale: string): string {
  return CHAT_I18N[key]?.[locale] ?? CHAT_I18N[key]?.["en"] ?? key;
}

async function injectChatMessages(page: Page, locale: string) {
  const msgs = {
    weatherQ: chatT("weatherQ", locale),
    weatherA: chatT("weatherA", locale),
    memoQ: chatT("memoQ", locale),
    memoA: chatT("memoA", locale),
    memoContent: chatT("memoContent", locale),
    timeQ: chatT("timeQ", locale),
    timeA: chatT("timeA", locale),
  };
  await page.evaluate((m) => {
    const store = (window as any).useChatStore;
    if (!store) { console.warn("[mock] useChatStore not found on window"); return; }
    const now = Date.now();
    store.setState({
      messages: [
        {
          id: "m1", role: "user",
          content: m.weatherQ,
          timestamp: now - 300000,
        },
        {
          id: "m2", role: "assistant",
          content: m.weatherA,
          timestamp: now - 295000,
          cost: { inputTokens: 156, outputTokens: 89, cost: 0.00082, provider: "gemini", model: "gemini-2.0-flash" },
          toolCalls: [
            { toolCallId: "tc1", toolName: "skill_weather", args: { location: "Seoul" }, status: "success" as const, output: '{"temp":12,"condition":"Clear","high":16}' },
          ],
        },
        {
          id: "m3", role: "user",
          content: m.memoQ,
          timestamp: now - 200000,
        },
        {
          id: "m4", role: "assistant",
          content: m.memoA,
          timestamp: now - 198000,
          cost: { inputTokens: 210, outputTokens: 65, cost: 0.00095, provider: "gemini", model: "gemini-2.0-flash" },
          toolCalls: [
            { toolCallId: "tc2", toolName: "skill_memo", args: { action: "save", content: m.memoContent }, status: "success" as const, output: '{"saved":true}' },
          ],
        },
        {
          id: "m5", role: "user",
          content: m.timeQ,
          timestamp: now - 100000,
        },
        {
          id: "m6", role: "assistant",
          content: m.timeA,
          timestamp: now - 98000,
          cost: { inputTokens: 120, outputTokens: 42, cost: 0.00055, provider: "gemini", model: "gemini-2.0-flash" },
          toolCalls: [
            { toolCallId: "tc3", toolName: "skill_time", args: {}, status: "success" as const, output: '{"time":"14:35"}' },
          ],
        },
      ],
      totalSessionCost: 0.00232,
      provider: "gemini",
      sessionId: "session-demo-001",
    });
  }, msgs);
}

async function injectPendingApproval(page: Page, locale: string) {
  const desc = chatT("approvalDesc", locale);
  await page.evaluate((d) => {
    const store = (window as any).useChatStore;
    if (!store) return;
    store.setState({
      pendingApproval: {
        requestId: "req-approval-demo",
        toolCallId: "tc-approval-1",
        toolName: "skill_execute_command",
        args: { command: "ls -la ~/Documents" },
        tier: 3,
        description: d,
      },
    });
  }, desc);
}

async function injectProgressData(page: Page, locale: string) {
  const weatherStr = chatT("weatherClear", locale);
  await page.evaluate((ws) => {
    const store = (window as any).useProgressStore;
    if (!store) { console.warn("[mock] useProgressStore not found"); return; }
    const weatherStr = ws;
    store.setState({
      events: [
        {id:1,timestamp:"2026-02-23T10:05:12Z",request_id:"r1",event_type:"tool_use",tool_name:"skill_time",tool_call_id:"tc1",tier:0,success:true,payload:null},
        {id:2,timestamp:"2026-02-23T10:05:13Z",request_id:"r1",event_type:"tool_result",tool_name:"skill_time",tool_call_id:"tc1",tier:0,success:true,payload:'{"time":"2026-02-23 10:05"}'},
        {id:3,timestamp:"2026-02-23T10:06:00Z",request_id:"r2",event_type:"usage",tool_name:null,tool_call_id:null,tier:null,success:true,payload:'{"cost":0.0012}'},
        {id:4,timestamp:"2026-02-23T10:07:30Z",request_id:"r3",event_type:"tool_use",tool_name:"skill_weather",tool_call_id:"tc2",tier:0,success:true,payload:null},
        {id:5,timestamp:"2026-02-23T10:07:31Z",request_id:"r3",event_type:"tool_result",tool_name:"skill_weather",tool_call_id:"tc2",tier:0,success:true,payload:JSON.stringify({weather:weatherStr})},
        {id:6,timestamp:"2026-02-23T10:08:00Z",request_id:"r4",event_type:"tool_use",tool_name:"skill_memo",tool_call_id:"tc3",tier:0,success:true,payload:null},
        {id:7,timestamp:"2026-02-23T10:08:01Z",request_id:"r4",event_type:"tool_result",tool_name:"skill_memo",tool_call_id:"tc3",tier:0,success:true,payload:'{"saved":true}'},
        {id:8,timestamp:"2026-02-23T10:10:00Z",request_id:"r5",event_type:"error",tool_name:"skill_web_search",tool_call_id:"tc4",tier:1,success:false,payload:'{"error":"timeout"}'},
      ],
      stats: {
        total_events: 42, total_cost: 0.0156,
        by_event_type: [["tool_use",18],["tool_result",17],["usage",6],["error",1]] as [string,number][],
        by_tool_name: [["skill_time",8],["skill_weather",6],["skill_memo",4],["skill_web_search",3],["skill_naia_discord",2]] as [string,number][],
      },
      isLoading: false,
    });
  }, locale);
}

async function injectLogsData(page: Page) {
  await page.evaluate(() => {
    const store = (window as any).useLogsStore;
    if (!store) { console.warn("[mock] useLogsStore not found"); return; }
    store.setState({
      entries: [
        { level: "INFO", message: "Gateway started on port 18789", timestamp: "2026-02-23T09:00:01Z" },
        { level: "INFO", message: "Agent connected (PID: 384521)", timestamp: "2026-02-23T09:00:02Z" },
        { level: "INFO", message: "Loaded 13 skills from ~/.naia/skills/", timestamp: "2026-02-23T09:00:03Z" },
        { level: "DEBUG", message: "TTS provider: nextain (Google Cloud)", timestamp: "2026-02-23T09:00:04Z" },
        { level: "INFO", message: "Discord bot connected (DM channel ready)", timestamp: "2026-02-23T09:00:05Z" },
        { level: "INFO", message: "Session started: session-demo-001", timestamp: "2026-02-23T10:04:50Z" },
        { level: "INFO", message: "Tool executed: skill_weather → success", timestamp: "2026-02-23T10:05:13Z" },
        { level: "WARN", message: "skill_web_search: timeout after 10s", timestamp: "2026-02-23T10:10:00Z" },
      ],
      isTailing: true,
    });
  });
}

// ─── Page factory ────────────────────────────────────────────
async function createPage(browser: Browser, locale: string, opts?: { labKey?: boolean; discord?: boolean }) {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  await page.addInitScript(`window.__MOCK_LOCALE = "${locale}";`);
  await page.addInitScript(TAURI_MOCK);
  await page.addInitScript(`localStorage.setItem("naia-config", '${configStr(locale, opts)}');`);
  // Mock lab balance fetch
  await page.route("**/**/v1/profile/balance", async (route) => {
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ balance: 4.85 }) });
  });
  return page;
}

async function loadApp(page: Page, waitMs = 10000) {
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(waitMs); // VRM avatar load (Three.js needs time)
}

// ─── Capture functions ───────────────────────────────────────

async function captureMainAndChat(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page, 12000); // Extra time for VRM

    await page.screenshot({ path: path.join(outDir, "main-screen.png") });
    console.log("  -> main-screen.png");
    await page.screenshot({ path: path.join(outDir, "tabs-layout.png") });
    console.log("  -> tabs-layout.png");

    // Inject chat messages via Zustand store
    await injectChatMessages(page, locale);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "chat-text.png") });
    console.log("  -> chat-text.png");
  } catch (e) {
    console.log(`  [error] main/chat: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureChatCost(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale, { labKey: true });
  try {
    await loadApp(page);
    await injectChatMessages(page, locale);
    await page.waitForTimeout(500);

    // CostDashboard is rendered below messages when there are cost entries
    // Scroll to bottom to see it
    await page.evaluate(() => {
      const chatArea = document.querySelector(".chat-messages-area, .chat-scroll-area");
      if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, "chat-cost.png") });
    console.log("  -> chat-cost.png");
  } catch (e) {
    console.log(`  [error] chat-cost: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureChatTool(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await injectChatMessages(page, locale);
    await page.waitForTimeout(500);

    // Click tool activity toggle to expand tool calls
    const toggles = page.locator(".tool-activity-toggle, .tool-call-toggle, .tool-toggle");
    const count = await toggles.count();
    if (count > 0) {
      await toggles.first().click();
      await page.waitForTimeout(300);
    }
    await page.screenshot({ path: path.join(outDir, "chat-tool.png") });
    console.log("  -> chat-tool.png");
  } catch (e) {
    console.log(`  [error] chat-tool: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureChatApproval(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await injectChatMessages(page, locale);
    await injectPendingApproval(page, locale);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, "chat-approval.png") });
    console.log("  -> chat-approval.png");
  } catch (e) {
    console.log(`  [error] chat-approval: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureHistoryTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(1).click({ timeout: 5000 });
    await page.waitForTimeout(3000); // Wait for directToolCall → agent_response flow
    await page.screenshot({ path: path.join(outDir, "history-tab.png") });
    console.log("  -> history-tab.png");
  } catch (e) {
    console.log(`  [error] history: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureProgressTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(2).click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    // Inject progress data directly via Zustand store
    await injectProgressData(page, locale);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "progress-tab.png") });
    console.log("  -> progress-tab.png");
  } catch (e) {
    console.log(`  [error] progress: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureSkillsTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(3).click({ timeout: 5000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, "skills-tab.png") });
    console.log("  -> skills-tab.png");

    // Click first skill card to expand
    const skillCard = page.locator(".skill-card").first();
    if (await skillCard.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skillCard.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, "skills-card.png") });
      console.log("  -> skills-card.png");
    }
  } catch (e) {
    console.log(`  [error] skills: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureChannelsTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale, { discord: true });
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(4).click({ timeout: 5000 });
    await page.waitForTimeout(3000); // Wait for Discord API mock to resolve
    await page.screenshot({ path: path.join(outDir, "channels-tab.png") });
    console.log("  -> channels-tab.png");
  } catch (e) {
    console.log(`  [error] channels: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureAgentsTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(5).click({ timeout: 5000 });
    await page.waitForTimeout(3000); // Wait for directToolCall flow
    await page.screenshot({ path: path.join(outDir, "agents-tab.png") });
    console.log("  -> agents-tab.png");
  } catch (e) {
    console.log(`  [error] agents: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureDiagnosticsTab(browser: Browser, outDir: string, locale: string) {
  const page = await createPage(browser, locale);
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(6).click({ timeout: 5000 });
    await page.waitForTimeout(3000); // Wait for diagnostics fetch
    // Also inject log entries via Zustand
    await injectLogsData(page);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "diagnostics-tab.png") });
    console.log("  -> diagnostics-tab.png");
  } catch (e) {
    console.log(`  [error] diagnostics: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureSettingsSections(browser: Browser, outDir: string, locale: string) {
  // With labKey for Nextain connected state
  const page = await createPage(browser, locale, { labKey: true });
  try {
    await loadApp(page);
    await page.locator(".chat-tab").nth(7).click({ timeout: 5000 });
    await page.waitForTimeout(1500);

    // Overview
    await page.screenshot({ path: path.join(outDir, "settings-overview.png") });
    console.log("  -> settings-overview.png");

    // Exact i18n divider texts from naia-os/shell/src/lib/i18n.ts
    const sections: [string, string[]][] = [
      ["settings-ai", ["AI 설정", "AI Settings", "AI設定", "人工智能设置", "Paramètres IA", "AI-Einstellungen", "Настройки ИИ", "Configuración de IA", "إعدادات الذكاء الاصطناعي", "एआई सेटिंग्स", "এআই সেটিংস", "Configurações de IA", "Pengaturan AI", "Cài đặt AI"]],
      ["settings-voice", ["음성", "Voice", "音声", "语音", "Voix", "Sprache", "Голос", "Voz", "الصوت", "आवाज", "ভয়েস", "Voz", "Suara", "Giọng", "TTS"]],
      ["settings-persona", ["페르소나", "Persona", "ペルソナ", "人格面具", "Personnalité", "Persona", "Персона", "persona", "شخصية", "व्यक्तित्व", "ব্যক্তিত্ব", "Pessoa", "kepribadian", "nhân cách"]],
      ["settings-memory", ["기억", "Memory", "記憶", "内存", "Mémoire", "Erinnerung", "Память", "Memoria", "الذاكرة", "स्मृति", "স্মৃতি", "Memória", "Memori", "Bộ nhớ"]],
      ["settings-avatar", ["아바타", "Avatar", "アバター", "阿凡达", "avatar", "Avatar", "Аватар", "الصورة الرمزية", "अवतार", "অবতার", "Hình đại diện"]],
      ["settings-device", ["디바이스", "Device", "デバイス", "设备配对", "Couplage", "Gerätekopplung", "Сопряжение", "Emparejamiento", "إقران", "डिवाइस", "ডিভাইস", "Emparelhamento", "Pemasangan", "Ghép nối"]],
      ["settings-tools", ["도구", "Tools", "ツール", "工具", "Outils", "Werkzeuge", "Инструменты", "Herramientas", "أدوات", "उपकरण", "টুলস", "Ferramentas", "Alat", "Công cụ"]],
      ["settings-channels", ["채널", "Channel", "チャネル", "渠道管理", "Gestion des canaux", "Kanalmanagement", "Управление каналами", "Gestión de canales", "إدارة القناة", "चैनल", "চ্যানেল", "Gestão de Canais", "Manajemen Saluran", "Quản lý kênh"]],
      ["settings-lab", ["Nextain", "NEXTAIN", "Naia 계정", "Naia Account", "Nextainアカウント", "Nextain帐户", "Compte Nextain", "Nextain-Konto", "Аккаунт Nextain", "Cuenta de Nextain", "حساب Nextain", "Nextain खाता", "Nextain অ্যাকাউন্ট", "Conta do Nextain", "Akun Nextain", "Tài khoản Nextain"]],
    ];

    const divTexts = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".settings-section-divider span")).map(el => el.textContent)
    );
    console.log(`  Settings dividers: ${divTexts.length} [${divTexts.join(", ")}]`);

    for (const [name, keywords] of sections) {
      let found = false;
      for (let j = 0; j < divTexts.length && !found; j++) {
        const dt = (divTexts[j] || "").toLowerCase();
        if (dt && keywords.some(kw => dt.includes(kw.toLowerCase()))) {
          await page.locator(".settings-section-divider span").nth(j).scrollIntoViewIfNeeded();
          await page.waitForTimeout(400);
          await page.screenshot({ path: path.join(outDir, `${name}.png`) });
          console.log(`  -> ${name}.png`);
          found = true;
        }
      }
      if (!found) console.log(`  [skip] ${name} (keywords: ${keywords.join(",")})`);
    }
  } catch (e) {
    console.log(`  [error] settings: ${(e as Error).message.split("\\n")[0]}`);
  } finally {
    await page.close();
  }
}

async function captureOnboarding(browser: Browser, outDir: string) {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  try {
    await page.addInitScript(TAURI_MOCK);
    // No config = onboarding
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(1500);

    const shot = async (name: string) => {
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
      console.log(`  -> ${name}.png`);
    };
    const next = () => page.locator(".onboarding-next-btn").first();
    const inp = () => page.locator(".onboarding-content input").first();

    await shot("onboarding-provider");
    const gemini = page.locator(".onboarding-provider-card").filter({ hasText: "Gemini" });
    if (await gemini.isVisible({ timeout: 2000 }).catch(() => false)) await gemini.click();
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

    await shot("onboarding-apikey");
    if (await inp().isVisible({ timeout: 1000 }).catch(() => false)) await inp().fill("AIzaSyExample123");
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

    await shot("onboarding-agent-name");
    if (await inp().isVisible({ timeout: 1000 }).catch(() => false)) await inp().fill("Naia");
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

    await shot("onboarding-user-name");
    if (await inp().isVisible({ timeout: 1000 }).catch(() => false)) await inp().fill("Luke");
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

    await shot("onboarding-character");
    await next().click({ timeout: 10000 }); await page.waitForTimeout(600);

    await shot("onboarding-personality");
    await next().click({ timeout: 10000 }); await page.waitForTimeout(600);

    await page.waitForTimeout(500);
    const vis = await next().isVisible({ timeout: 1000 }).catch(() => false);
    if (vis) {
      const t = await next().textContent();
      if (t && !t.includes("시작") && !t.includes("Start")) {
        await next().click({ timeout: 3000 }); await page.waitForTimeout(600);
      }
    }
    await shot("onboarding-complete");
  } finally {
    await page.close();
  }
}

// ─── Lab (Dashboard) Mockup Captures ─────────────────────────
// These are standalone HTML mockups matching the site's design system
// since the actual pages require server-side auth (NextAuth + Gateway)

// Lab mockup i18n dictionary (only UI labels used in mockup HTML)
const LAB_I18N: Record<string, Record<string, string>> = {
  dashboard:       { ko:"대시보드", en:"Dashboard", ja:"ダッシュボード", zh:"仪表盘", fr:"Tableau de bord", de:"Dashboard", ru:"Панель управления", es:"Panel", ar:"لوحة التحكم", hi:"डैशबोर्ड", bn:"ড্যাশবোর্ড", pt:"Painel", id:"Dasbor", vi:"Bảng điều khiển" },
  creditBalance:   { ko:"크레딧 잔액", en:"Credit Balance", ja:"クレジット残高", zh:"信用余额", fr:"Solde de crédits", de:"Guthaben", ru:"Баланс кредитов", es:"Saldo de créditos", ar:"رصيد الائتمان", hi:"क्रेडिट शेष", bn:"ক্রেডিট ব্যালেন্স", pt:"Saldo de créditos", id:"Saldo Kredit", vi:"Số dư tín dụng" },
  totalRequests:   { ko:"총 요청", en:"Total Requests", ja:"総リクエスト", zh:"总请求", fr:"Requêtes totales", de:"Anfragen gesamt", ru:"Всего запросов", es:"Solicitudes totales", ar:"إجمالي الطلبات", hi:"कुल अनुरोध", bn:"মোট অনুরোধ", pt:"Total de requisições", id:"Total Permintaan", vi:"Tổng yêu cầu" },
  totalTokens:     { ko:"총 토큰", en:"Total Tokens", ja:"総トークン", zh:"总令牌", fr:"Tokens totaux", de:"Tokens gesamt", ru:"Всего токенов", es:"Tokens totales", ar:"إجمالي الرموز", hi:"कुल टोकन", bn:"মোট টোকেন", pt:"Total de tokens", id:"Total Token", vi:"Tổng token" },
  totalSpend:      { ko:"총 비용", en:"Total Spend", ja:"総コスト", zh:"总花费", fr:"Dépenses totales", de:"Gesamtausgaben", ru:"Общие расходы", es:"Gasto total", ar:"إجمالي الإنفاق", hi:"कुल खर्च", bn:"মোট খরচ", pt:"Total gasto", id:"Total Pengeluaran", vi:"Tổng chi phí" },
  currentPeriod:   { ko:"현재 기간", en:"Current Period", ja:"現在の期間", zh:"当前周期", fr:"Période en cours", de:"Aktueller Zeitraum", ru:"Текущий период", es:"Período actual", ar:"الفترة الحالية", hi:"वर्तमान अवधि", bn:"বর্তমান সময়কাল", pt:"Período atual", id:"Periode Saat Ini", vi:"Kỳ hiện tại" },
  active:          { ko:"활성", en:"Active", ja:"アクティブ", zh:"活跃", fr:"Actif", de:"Aktiv", ru:"Активен", es:"Activo", ar:"نشط", hi:"सक्रिय", bn:"সক্রিয়", pt:"Ativo", id:"Aktif", vi:"Hoạt động" },
  quickLinks:      { ko:"빠른 링크", en:"Quick Links", ja:"クイックリンク", zh:"快速链接", fr:"Liens rapides", de:"Schnellzugriff", ru:"Быстрые ссылки", es:"Accesos rápidos", ar:"روابط سريعة", hi:"त्वरित लिंक", bn:"দ্রুত লিঙ্ক", pt:"Links rápidos", id:"Tautan Cepat", vi:"Liên kết nhanh" },
  usage:           { ko:"사용량", en:"Usage", ja:"使用量", zh:"使用量", fr:"Utilisation", de:"Nutzung", ru:"Использование", es:"Uso", ar:"الاستخدام", hi:"उपयोग", bn:"ব্যবহার", pt:"Uso", id:"Penggunaan", vi:"Sử dụng" },
  logs:            { ko:"로그", en:"Logs", ja:"ログ", zh:"日志", fr:"Journaux", de:"Logs", ru:"Логи", es:"Registros", ar:"السجلات", hi:"लॉग", bn:"লগ", pt:"Logs", id:"Log", vi:"Nhật ký" },
  keys:            { ko:"API 키", en:"Keys", ja:"APIキー", zh:"API密钥", fr:"Clés API", de:"API-Schlüssel", ru:"API-ключи", es:"Claves API", ar:"مفاتيح API", hi:"API कुंजी", bn:"API কী", pt:"Chaves API", id:"Kunci API", vi:"Khóa API" },
  billing:         { ko:"결제", en:"Billing", ja:"請求", zh:"账单", fr:"Facturation", de:"Abrechnung", ru:"Оплата", es:"Facturación", ar:"الفوترة", hi:"बिलिंग", bn:"বিলিং", pt:"Faturamento", id:"Tagihan", vi:"Thanh toán" },
  days7:           { ko:"7일", en:"7D", ja:"7日", zh:"7天", fr:"7J", de:"7T", ru:"7Д", es:"7D", ar:"7أ", hi:"7दि", bn:"7দি", pt:"7D", id:"7H", vi:"7N" },
  days30:          { ko:"30일", en:"30D", ja:"30日", zh:"30天", fr:"30J", de:"30T", ru:"30Д", es:"30D", ar:"30أ", hi:"30दि", bn:"30দি", pt:"30D", id:"30H", vi:"30N" },
  days90:          { ko:"90일", en:"90D", ja:"90日", zh:"90天", fr:"90J", de:"90T", ru:"90Д", es:"90D", ar:"90أ", hi:"90दि", bn:"90দি", pt:"90D", id:"90H", vi:"90N" },
  requestsPerDay:  { ko:"일별 요청 수", en:"Requests per Day", ja:"日別リクエスト数", zh:"每日请求数", fr:"Requêtes par jour", de:"Anfragen pro Tag", ru:"Запросы в день", es:"Solicitudes por día", ar:"الطلبات يوميًا", hi:"प्रतिदिन अनुरोध", bn:"প্রতিদিন অনুরোধ", pt:"Requisições por dia", id:"Permintaan per Hari", vi:"Yêu cầu mỗi ngày" },
  tokensPerDay:    { ko:"일별 토큰 수", en:"Tokens per Day", ja:"日別トークン数", zh:"每日令牌数", fr:"Tokens par jour", de:"Tokens pro Tag", ru:"Токены в день", es:"Tokens por día", ar:"الرموز يوميًا", hi:"प्रतिदिन टोकन", bn:"প্রতিদিন টোকেন", pt:"Tokens por dia", id:"Token per Hari", vi:"Token mỗi ngày" },
  spendPerDay:     { ko:"일별 비용", en:"Spend per Day", ja:"日別コスト", zh:"每日花费", fr:"Dépenses par jour", de:"Ausgaben pro Tag", ru:"Расходы в день", es:"Gasto por día", ar:"الإنفاق يوميًا", hi:"प्रतिदिन खर्च", bn:"প্রতিদিন খরচ", pt:"Gasto por dia", id:"Pengeluaran per Hari", vi:"Chi phí mỗi ngày" },
  apiLogs:         { ko:"API 로그", en:"API Logs", ja:"APIログ", zh:"API日志", fr:"Journaux API", de:"API-Logs", ru:"API-логи", es:"Registros API", ar:"سجلات API", hi:"API लॉग", bn:"API লগ", pt:"Logs de API", id:"Log API", vi:"Nhật ký API" },
  time:            { ko:"시간", en:"Time", ja:"時間", zh:"时间", fr:"Heure", de:"Zeit", ru:"Время", es:"Hora", ar:"الوقت", hi:"समय", bn:"সময়", pt:"Hora", id:"Waktu", vi:"Thời gian" },
  model:           { ko:"모델", en:"Model", ja:"モデル", zh:"模型", fr:"Modèle", de:"Modell", ru:"Модель", es:"Modelo", ar:"النموذج", hi:"मॉडल", bn:"মডেল", pt:"Modelo", id:"Model", vi:"Mô hình" },
  tokens:          { ko:"토큰", en:"Tokens", ja:"トークン", zh:"令牌", fr:"Tokens", de:"Tokens", ru:"Токены", es:"Tokens", ar:"الرموز", hi:"टोकन", bn:"টোকেন", pt:"Tokens", id:"Token", vi:"Token" },
  cost:            { ko:"비용", en:"Cost", ja:"コスト", zh:"费用", fr:"Coût", de:"Kosten", ru:"Стоимость", es:"Costo", ar:"التكلفة", hi:"लागत", bn:"খরচ", pt:"Custo", id:"Biaya", vi:"Chi phí" },
  status:          { ko:"상태", en:"Status", ja:"ステータス", zh:"状态", fr:"Statut", de:"Status", ru:"Статус", es:"Estado", ar:"الحالة", hi:"स्थिति", bn:"অবস্থা", pt:"Status", id:"Status", vi:"Trạng thái" },
  prev:            { ko:"이전", en:"Prev", ja:"前", zh:"上一页", fr:"Préc.", de:"Zurück", ru:"Назад", es:"Ant.", ar:"السابق", hi:"पिछला", bn:"পূর্ববর্তী", pt:"Anterior", id:"Sebelumnya", vi:"Trước" },
  page:            { ko:"페이지", en:"Page", ja:"ページ", zh:"页", fr:"Page", de:"Seite", ru:"Страница", es:"Página", ar:"الصفحة", hi:"पृष्ठ", bn:"পৃষ্ঠা", pt:"Página", id:"Halaman", vi:"Trang" },
  next:            { ko:"다음", en:"Next", ja:"次", zh:"下一页", fr:"Suiv.", de:"Weiter", ru:"Далее", es:"Sig.", ar:"التالي", hi:"अगला", bn:"পরবর্তী", pt:"Próxima", id:"Selanjutnya", vi:"Tiếp" },
  createKey:       { ko:"새 키 생성", en:"Create New Key", ja:"新しいキーを作成", zh:"创建新密钥", fr:"Créer une clé", de:"Neuen Schlüssel erstellen", ru:"Создать ключ", es:"Crear clave", ar:"إنشاء مفتاح", hi:"नई कुंजी बनाएं", bn:"নতুন কী তৈরি", pt:"Criar chave", id:"Buat Kunci Baru", vi:"Tạo khóa mới" },
  keyPlaceholder:  { ko:"키 이름 (선택)", en:"Key name (optional)", ja:"キー名（任意）", zh:"密钥名称（可选）", fr:"Nom de la clé (optionnel)", de:"Schlüsselname (optional)", ru:"Имя ключа (опционально)", es:"Nombre de clave (opcional)", ar:"اسم المفتاح (اختياري)", hi:"कुंजी नाम (वैकल्पिक)", bn:"কী নাম (ঐচ্ছিক)", pt:"Nome da chave (opcional)", id:"Nama kunci (opsional)", vi:"Tên khóa (tùy chọn)" },
  create:          { ko:"생성", en:"Create", ja:"作成", zh:"创建", fr:"Créer", de:"Erstellen", ru:"Создать", es:"Crear", ar:"إنشاء", hi:"बनाएं", bn:"তৈরি", pt:"Criar", id:"Buat", vi:"Tạo" },
  delete:          { ko:"삭제", en:"Delete", ja:"削除", zh:"删除", fr:"Supprimer", de:"Löschen", ru:"Удалить", es:"Eliminar", ar:"حذف", hi:"हटाएं", bn:"মুছুন", pt:"Excluir", id:"Hapus", vi:"Xóa" },
  revoked:         { ko:"폐기됨", en:"Revoked", ja:"取消済み", zh:"已撤销", fr:"Révoqué", de:"Widerrufen", ru:"Отозван", es:"Revocada", ar:"ملغى", hi:"रद्द", bn:"বাতিল", pt:"Revogada", id:"Dicabut", vi:"Đã thu hồi" },
  requests:        { ko:"요청", en:"Requests", ja:"リクエスト", zh:"请求", fr:"Requêtes", de:"Anfragen", ru:"Запросы", es:"Solicitudes", ar:"الطلبات", hi:"अनुरोध", bn:"অনুরোধ", pt:"Requisições", id:"Permintaan", vi:"Yêu cầu" },
  spend:           { ko:"비용", en:"Spend", ja:"コスト", zh:"花费", fr:"Dépenses", de:"Ausgaben", ru:"Расходы", es:"Gasto", ar:"الإنفاق", hi:"खर्च", bn:"খরচ", pt:"Gasto", id:"Pengeluaran", vi:"Chi phí" },
};

function labT(key: string, locale: string): string {
  return LAB_I18N[key]?.[locale] ?? LAB_I18N[key]?.["en"] ?? key;
}

function labMockupHtml(pageName: string, locale: string): string {
  const t = (key: string) => labT(key, locale);

  // Shared styles matching shadcn/ui + naia theme
  const baseStyles = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1a1a1a; }
      .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
      .header-logo { font-weight: 700; font-size: 16px; color: #2563eb; }
      .header-user { display: flex; align-items: center; gap: 8px; }
      .avatar { width: 28px; height: 28px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 600; }
      .sidebar { display: none; }
      .main { padding: 16px; max-width: 100%; }
      h1 { font-size: 20px; font-weight: 700; margin-bottom: 16px; }
      .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px; overflow: hidden; }
      .card-header { padding: 12px 16px 4px; }
      .card-title { font-size: 12px; color: #888; font-weight: 500; }
      .card-content { padding: 8px 16px 16px; }
      .big-number { font-size: 32px; font-weight: 700; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
      .grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
      .small-card .card-content { padding: 12px 16px; }
      .small-label { font-size: 12px; color: #888; margin-bottom: 4px; }
      .small-value { font-size: 18px; font-weight: 700; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; }
      .badge-active { background: #e8f5e9; color: #2e7d32; }
      .badge-secondary { background: #f1f5f9; color: #2563eb; }
      .link-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .link-item { display: flex; align-items: center; gap: 8px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; color: #333; text-decoration: none; }
      .link-icon { color: #888; font-size: 14px; }
      .period-tabs { display: flex; gap: 6px; }
      .period-tab { padding: 4px 12px; border-radius: 6px; font-size: 13px; border: 1px solid #e2e8f0; background: white; }
      .period-tab.active { background: #2563eb; color: white; border-color: #2563eb; }
      .chart-placeholder { height: 140px; background: linear-gradient(180deg, transparent 0%, transparent 20%, #e8f0fe 20%, #e8f0fe 22%, transparent 22%, transparent 40%, #e8f0fe 40%, #e8f0fe 42%, transparent 42%, transparent 60%, #e8f0fe 60%, #e8f0fe 62%, transparent 62%, transparent 80%, #e8f0fe 80%, #e8f0fe 82%, transparent 82%); position: relative; display: flex; align-items: flex-end; padding: 0 4px; gap: 2px; }
      .chart-bar { background: #2563eb; border-radius: 2px 2px 0 0; flex: 1; min-width: 4px; }
      .chart-line-area { height: 140px; position: relative; overflow: hidden; }
      .chart-area { position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(180deg, rgba(107,76,59,0.15) 0%, rgba(107,76,59,0.02) 100%); clip-path: polygon(0% 100%, 0% 60%, 10% 50%, 20% 55%, 30% 40%, 40% 45%, 50% 30%, 60% 35%, 70% 20%, 80% 25%, 90% 15%, 100% 20%, 100% 100%); }
      .chart-line { position: absolute; bottom: 0; left: 0; right: 0; height: 60%; border-top: 2px solid #2563eb; clip-path: polygon(0% 60%, 10% 50%, 20% 55%, 30% 40%, 40% 45%, 50% 30%, 60% 35%, 70% 20%, 80% 25%, 90% 15%, 100% 20%); }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #888; font-weight: 500; font-size: 11px; }
      td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
      .status-success { color: #2e7d32; }
      .status-error { color: #d32f2f; }
      .mono { font-family: 'SF Mono', Monaco, monospace; font-size: 11px; }
      .key-row { display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; }
      .key-name { font-size: 13px; font-weight: 500; }
      .key-date { font-size: 11px; color: #888; }
      .key-actions { display: flex; align-items: center; gap: 8px; }
      .btn { padding: 4px 12px; border-radius: 6px; font-size: 12px; border: 1px solid #e2e8f0; background: white; cursor: pointer; }
      .btn-primary { background: #2563eb; color: white; border-color: #2563eb; }
      .btn-sm { padding: 3px 8px; font-size: 11px; }
      input.form-input { padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; width: 100%; }
      .form-row { display: flex; gap: 8px; align-items: center; }
      .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-around; padding: 8px 0 12px; }
      .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #888; gap: 2px; }
      .nav-item.active { color: #2563eb; }
      .nav-icon { font-size: 16px; }
      .flex-between { display: flex; justify-content: space-between; align-items: center; }
      .mb-12 { margin-bottom: 12px; }
    </style>
  `;

  const header = `
    <div class="header">
      <span class="header-logo">Naia</span>
      <div class="header-user">
        <span style="font-size:13px">Luke</span>
        <div class="avatar">L</div>
      </div>
    </div>
  `;

  const bottomNav = `
    <div class="bottom-nav">
      <div class="nav-item ${pageName === 'dashboard' ? 'active' : ''}"><span class="nav-icon">📊</span>${t('dashboard')}</div>
      <div class="nav-item ${pageName === 'usage' ? 'active' : ''}"><span class="nav-icon">📈</span>${t('usage')}</div>
      <div class="nav-item ${pageName === 'logs' ? 'active' : ''}"><span class="nav-icon">📋</span>${t('logs')}</div>
      <div class="nav-item ${pageName === 'keys' ? 'active' : ''}"><span class="nav-icon">🔑</span>${t('keys')}</div>
    </div>
  `;

  let content = '';

  if (pageName === 'dashboard') {
    content = `
      <h1>${t('dashboard')}</h1>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('creditBalance')}</div></div>
        <div class="card-content"><div class="big-number">4.8</div></div>
      </div>
      <div class="grid-4">
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('totalRequests')}</div><div class="small-value">47</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('totalTokens')}</div><div class="small-value">38,240</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('totalSpend')}</div><div class="small-value">$0.0156</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('currentPeriod')}</div><div><span class="badge badge-active">${t('active')}</span></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('quickLinks')}</div></div>
        <div class="card-content">
          <div class="link-grid">
            <div class="link-item"><span class="link-icon">📈</span>${t('usage')}</div>
            <div class="link-item"><span class="link-icon">📋</span>${t('logs')}</div>
            <div class="link-item"><span class="link-icon">🔑</span>${t('keys')}</div>
            <div class="link-item"><span class="link-icon">💳</span>${t('billing')}</div>
          </div>
        </div>
      </div>
    `;
  } else if (pageName === 'usage') {
    content = `
      <div class="flex-between mb-12">
        <h1>${t('usage')}</h1>
        <div class="period-tabs">
          <span class="period-tab">${t('days7')}</span>
          <span class="period-tab active">${t('days30')}</span>
          <span class="period-tab">${t('days90')}</span>
        </div>
      </div>
      <div class="grid-2" style="grid-template-columns:1fr 1fr 1fr; margin-bottom:16px;">
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('requests')}</div><div class="small-value">47</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('tokens')}</div><div class="small-value">38.2K</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('spend')}</div><div class="small-value">$0.016</div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('requestsPerDay')}</div></div>
        <div class="card-content">
          <div class="chart-placeholder">
            ${[20,35,15,45,30,55,40,60,25,50,70,45,35,55,40,30,50,65,45,35,55,40,60,45,50,65,75,55,40,50].map(h => `<div class="chart-bar" style="height:${h}%"></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('tokensPerDay')}</div></div>
        <div class="card-content">
          <div class="chart-line-area"><div class="chart-area"></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('spendPerDay')}</div></div>
        <div class="card-content">
          <div class="chart-line-area"><div class="chart-area" style="height:40%;"></div></div>
        </div>
      </div>
    `;
  } else if (pageName === 'logs') {
    const rows = [
      { time: '10:10:00', model: 'gemini-2.0-flash', tokens: '350', cost: '$0.0001', status: 'success' },
      { time: '10:08:01', model: 'gemini-2.0-flash', tokens: '280', cost: '$0.0001', status: 'success' },
      { time: '10:05:13', model: 'gemini-2.0-flash', tokens: '420', cost: '$0.0002', status: 'success' },
      { time: '09:55:20', model: 'claude-sonnet-4-6', tokens: '1,240', cost: '$0.0048', status: 'success' },
      { time: '09:45:00', model: 'gemini-2.0-flash', tokens: '180', cost: '$0.0001', status: 'error' },
      { time: '09:30:05', model: 'gemini-2.0-flash', tokens: '520', cost: '$0.0002', status: 'success' },
      { time: '09:15:42', model: 'gemini-2.0-flash', tokens: '310', cost: '$0.0001', status: 'success' },
      { time: '09:00:18', model: 'grok-3-mini', tokens: '890', cost: '$0.0012', status: 'success' },
    ];
    content = `
      <h1>${t('apiLogs')}</h1>
      <div class="card">
        <div class="card-content" style="padding:0; overflow-x:auto;">
          <table>
            <thead><tr>
              <th>${t('time')}</th>
              <th>${t('model')}</th>
              <th>${t('tokens')}</th>
              <th>${t('cost')}</th>
              <th>${t('status')}</th>
            </tr></thead>
            <tbody>
              ${rows.map(r => `<tr>
                <td class="mono">${r.time}</td>
                <td class="mono" style="font-size:10px">${r.model}</td>
                <td>${r.tokens}</td>
                <td class="mono">${r.cost}</td>
                <td class="${r.status === 'success' ? 'status-success' : 'status-error'}">${r.status === 'success' ? '✓' : '✕'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex-between" style="margin-top:12px;">
        <span class="btn" style="opacity:0.4">← ${t('prev')}</span>
        <span style="font-size:13px; color:#888">${t('page')} 1</span>
        <span class="btn">→ ${t('next')}</span>
      </div>
    `;
  } else if (pageName === 'keys') {
    content = `
      <h1>${t('keys')}</h1>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('createKey')}</div></div>
        <div class="card-content">
          <div class="form-row">
            <input class="form-input" placeholder="${t('keyPlaceholder')}" style="flex:1" />
            <button class="btn btn-primary">${t('create')}</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('keys')}</div></div>
        <div class="card-content">
          <div class="key-row">
            <div><div class="key-name">desktop-naia</div><div class="key-date">2026-02-20 14:30</div></div>
            <div class="key-actions"><span class="badge badge-active">${t('active')}</span><button class="btn btn-sm">${t('delete')}</button></div>
          </div>
          <div class="key-row">
            <div><div class="key-name">api-test</div><div class="key-date">2026-02-18 09:15</div></div>
            <div class="key-actions"><span class="badge badge-active">${t('active')}</span><button class="btn btn-sm">${t('delete')}</button></div>
          </div>
          <div class="key-row">
            <div><div class="key-name">old-key</div><div class="key-date">2026-01-15 11:00</div></div>
            <div class="key-actions"><span class="badge badge-secondary" style="background:#f5f5f5;color:#999">${t('revoked')}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${baseStyles}</head><body>${header}<div class="main">${content}</div>${bottomNav}</body></html>`;
}

async function captureLabMockups(browser: Browser, outDir: string, locale: string) {
  const pages = ['dashboard', 'usage', 'logs', 'keys'] as const;
  const fileNames: Record<string, string> = {
    dashboard: 'lab-dashboard.png',
    usage: 'lab-usage.png',
    logs: 'lab-logs.png',
    keys: 'lab-keys.png',
  };

  for (const pageName of pages) {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    try {
      const html = labMockupHtml(pageName, locale);
      await page.setContent(html, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, fileNames[pageName]), fullPage: true });
      console.log(`  -> ${fileNames[pageName]}`);
    } catch (e) {
      console.log(`  [error] ${pageName}: ${(e as Error).message.split("\\n")[0]}`);
    } finally {
      await page.close();
    }
  }
}

// ─── Main ────────────────────────────────────────────────────

async function run() {
  // Process only locales specified by CLI args, or all if none given
  const args = process.argv.slice(2);
  const locales = args.length > 0
    ? args.filter(a => ALL_LOCALES.includes(a as any)) as (typeof ALL_LOCALES[number])[]
    : [...ALL_LOCALES];

  for (const locale of locales) {
    // Fresh browser per locale to avoid memory leaks from VRM/Three.js
    const browser = await chromium.launch({ headless: true });
    const outDir = path.join(MANUAL_DIR, locale);
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`\n========== ${locale.toUpperCase()} ==========`);

    try {
      console.log("\n--- Onboarding ---");
      await captureOnboarding(browser, outDir);

      console.log("\n--- Main & Chat ---");
      await captureMainAndChat(browser, outDir, locale);

      console.log("\n--- Chat Cost ---");
      await captureChatCost(browser, outDir, locale);

      console.log("\n--- Chat Tool ---");
      await captureChatTool(browser, outDir, locale);

      console.log("\n--- Chat Approval ---");
      await captureChatApproval(browser, outDir, locale);

      console.log("\n--- History ---");
      await captureHistoryTab(browser, outDir, locale);

      console.log("\n--- Progress ---");
      await captureProgressTab(browser, outDir, locale);

      console.log("\n--- Skills ---");
      await captureSkillsTab(browser, outDir, locale);

      console.log("\n--- Channels ---");
      await captureChannelsTab(browser, outDir, locale);

      console.log("\n--- Agents ---");
      await captureAgentsTab(browser, outDir, locale);

      console.log("\n--- Diagnostics ---");
      await captureDiagnosticsTab(browser, outDir, locale);

      console.log("\n--- Settings ---");
      await captureSettingsSections(browser, outDir, locale);

      console.log("\n--- Lab (Dashboard) Mockups ---");
      await captureLabMockups(browser, outDir, locale);
    } catch (e) {
      console.error(`\n[FATAL] ${locale}: ${(e as Error).message}`);
    } finally {
      await browser.close();
    }

    // Brief pause between locales to let the app stabilize
    if (locale !== locales[locales.length - 1]) {
      console.log("\n... pause 3s ...");
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log("\nDone!");
}

run().catch(console.error);
