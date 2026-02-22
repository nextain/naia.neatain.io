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

const KO_DIR = path.resolve(__dirname, "../public/manual/ko");
const EN_DIR = path.resolve(__dirname, "../public/manual/en");

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

  // i18n lookup for mock data
  const _locale = window.__MOCK_LOCALE || "ko";
  const _t = (ko, en) => _locale === "ko" ? ko : en;

  // Gateway mock responses for directToolCall pattern
  // directToolCall: invoke("send_to_agent_command") → listen("agent_response") for tool_result + finish
  const GATEWAY_RESPONSES = {
    skill_sessions: (args) => {
      if (args.action === "list") return JSON.stringify({
        sessions: [
          { key: "session-001", label: _t("날씨와 메모", "Weather & Memo"), messageCount: 6, createdAt: Date.now()-3600000, updatedAt: Date.now()-300000 },
          { key: "session-002", label: _t("코드 리뷰", "Code Review"), messageCount: 12, createdAt: Date.now()-86400000, updatedAt: Date.now()-7200000 },
          { key: "session-003", label: _t("일정 관리", "Schedule"), messageCount: 4, createdAt: Date.now()-172800000, updatedAt: Date.now()-86400000 },
          { key: "discord:dm:123456", label: "Discord DM", messageCount: 8, createdAt: Date.now()-86400000, updatedAt: Date.now()-3600000 },
        ]
      });
      return "{}";
    },
    skill_agents: (args) => {
      if (args.action === "list") return JSON.stringify({
        agents: [
          { id: "naia-default", name: "Naia", description: _t("기본 AI 컴패니언", "Default AI Companion"), model: "gemini-2.0-flash" },
          { id: "coder-agent", name: _t("코딩 에이전트", "Coding Agent"), description: _t("코드 작성 및 리뷰 전문", "Code writing & review specialist"), model: "claude-sonnet-4-6" },
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
    { id:"d1", content:_t("나이아, 내일 회의 시간 알려줘","Naia, when is tomorrow's meeting?"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T09:30:00Z" },
    { id:"d2", content:_t("내일 오후 3시에 팀 미팅이 있어요! 📋","You have a team meeting at 3 PM tomorrow! 📋"), author:{ id:"bot-999", username:"Naia", bot:true }, timestamp:"2026-02-23T09:30:05Z" },
    { id:"d3", content:_t("고마워. 오늘 날씨는?","Thanks. What's the weather today?"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T10:00:00Z" },
    { id:"d4", content:_t("오늘 서울은 맑고 12°C예요. 가벼운 겉옷 추천해요! 🌤️","It's clear and 12°C in Seoul today. A light jacket is recommended! 🌤️"), author:{ id:"bot-999", username:"Naia", bot:true }, timestamp:"2026-02-23T10:00:05Z" },
    { id:"d5", content:_t("알겠어, 감사!","Got it, thanks!"), author:{ id:"user-456", username:"Luke", bot:false }, timestamp:"2026-02-23T10:01:00Z" },
  ];

  window.__TAURI_INTERNALS__ = {
    invoke: (cmd, args) => {
      // Skills
      if (cmd === "list_skills") return Promise.resolve([
        {name:"skill_time",description:_t("현재 날짜/시간 확인","Check current date/time"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_system_status",description:_t("시스템 상태 확인","Check system status"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_memo",description:_t("메모 저장/조회","Save/read memos"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_weather",description:_t("날씨 조회","Check weather"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_naia_discord",description:_t("Discord DM 전송","Send Discord DM"),type_:"builtin",tier:"T1",enabled:true,source:"built-in"},
        {name:"skill_soul",description:_t("AI 페르소나 관리","Manage AI persona"),type_:"builtin",tier:"T0",enabled:true,source:"built-in"},
        {name:"skill_exit",description:_t("앱 종료","Exit app"),type_:"builtin",tier:"T2",enabled:true,source:"built-in"},
        {name:"skill_read_file",description:_t("파일 읽기","Read file"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_write_file",description:_t("파일 쓰기","Write file"),type_:"gateway",tier:"T2",enabled:true,source:"custom"},
        {name:"skill_execute_command",description:_t("명령 실행","Execute command"),type_:"command",tier:"T3",enabled:true,source:"custom"},
        {name:"skill_web_search",description:_t("웹 검색","Web search"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_notify_slack",description:_t("Slack 알림","Slack notification"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
        {name:"skill_notify_discord",description:_t("Discord 알림","Discord notification"),type_:"gateway",tier:"T1",enabled:true,source:"custom"},
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
        {id:5,timestamp:"2026-02-23T10:07:31Z",request_id:"r3",event_type:"tool_result",tool_name:"skill_weather",tool_call_id:"tc2",tier:0,success:true,payload:JSON.stringify({weather:_t("맑음 12°C","Clear 12°C")})},
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

async function injectChatMessages(page: Page, locale: string) {
  const isKo = locale === "ko";
  await page.evaluate((ko) => {
    const store = (window as any).useChatStore;
    if (!store) { console.warn("[mock] useChatStore not found on window"); return; }
    const now = Date.now();
    store.setState({
      messages: [
        {
          id: "m1", role: "user",
          content: ko ? "오늘 날씨 알려줘" : "What's the weather today?",
          timestamp: now - 300000,
        },
        {
          id: "m2", role: "assistant",
          content: ko
            ? "오늘 서울 날씨는 맑음이고, 현재 기온은 12°C입니다. 오후에는 최고 16°C까지 올라갈 예정이에요. 외출 시 가벼운 겉옷을 챙기시면 좋을 것 같아요!"
            : "Today's weather in Seoul is clear with a current temperature of 12°C. The high will reach 16°C this afternoon. I'd recommend a light jacket if you're heading out!",
          timestamp: now - 295000,
          cost: { inputTokens: 156, outputTokens: 89, cost: 0.00082, provider: "gemini", model: "gemini-2.0-flash" },
          toolCalls: [
            { toolCallId: "tc1", toolName: "skill_weather", args: { location: "Seoul" }, status: "success" as const, output: '{"temp":12,"condition":"Clear","high":16}' },
          ],
        },
        {
          id: "m3", role: "user",
          content: ko ? "메모 저장해줘: 내일 오후 3시 미팅" : "Save a memo: Meeting tomorrow at 3 PM",
          timestamp: now - 200000,
        },
        {
          id: "m4", role: "assistant",
          content: ko
            ? "메모를 저장했어요!\n\n**내일 오후 3시 미팅** — 잊지 않도록 알려드릴게요."
            : "Memo saved!\n\n**Meeting tomorrow at 3 PM** — I'll make sure to remind you.",
          timestamp: now - 198000,
          cost: { inputTokens: 210, outputTokens: 65, cost: 0.00095, provider: "gemini", model: "gemini-2.0-flash" },
          toolCalls: [
            { toolCallId: "tc2", toolName: "skill_memo", args: { action: "save", content: ko ? "내일 오후 3시 미팅" : "Meeting tomorrow at 3 PM" }, status: "success" as const, output: '{"saved":true}' },
          ],
        },
        {
          id: "m5", role: "user",
          content: ko ? "지금 몇 시야?" : "What time is it now?",
          timestamp: now - 100000,
        },
        {
          id: "m6", role: "assistant",
          content: ko
            ? "지금은 오후 2시 35분이에요. 오늘 하루 잘 보내고 계신가요?"
            : "It's 2:35 PM right now. How's your day going?",
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
  }, isKo);
}

async function injectPendingApproval(page: Page, locale: string) {
  await page.evaluate((loc) => {
    const store = (window as any).useChatStore;
    if (!store) return;
    store.setState({
      pendingApproval: {
        requestId: "req-approval-demo",
        toolCallId: "tc-approval-1",
        toolName: "skill_execute_command",
        args: { command: "ls -la ~/Documents" },
        tier: 3,
        description: loc === "ko" ? "시스템 명령어를 실행합니다" : "Execute a system command",
      },
    });
  }, locale);
}

async function injectProgressData(page: Page, locale: string) {
  await page.evaluate((loc) => {
    const store = (window as any).useProgressStore;
    if (!store) { console.warn("[mock] useProgressStore not found"); return; }
    const weatherStr = loc === "ko" ? "맑음 12°C" : "Clear 12°C";
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

    const sections: [string, string[]][] = [
      ["settings-ai", ["AI 설정", "AI Settings"]],
      ["settings-voice", ["음성", "Voice", "TTS"]],
      ["settings-persona", ["페르소나", "Persona"]],
      ["settings-memory", ["기억", "Memory"]],
      ["settings-avatar", ["아바타", "Avatar"]],
      ["settings-device", ["디바이스", "Device"]],
      ["settings-tools", ["도구", "Tool"]],
      ["settings-channels", ["채널", "Channel"]],
      ["settings-lab", ["Nextain", "NEXTAIN", "Naia 계정", "Naia Account"]],
    ];

    const divTexts = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".settings-section-divider span")).map(el => el.textContent)
    );
    console.log(`  Settings dividers: ${divTexts.length} [${divTexts.join(", ")}]`);

    for (const [name, keywords] of sections) {
      let found = false;
      for (let j = 0; j < divTexts.length && !found; j++) {
        if (divTexts[j] && keywords.some(kw => divTexts[j]!.includes(kw))) {
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
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

    await shot("onboarding-personality");
    await next().click({ timeout: 3000 }); await page.waitForTimeout(600);

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

function labMockupHtml(pageName: string, locale: string): string {
  const isKo = locale === "ko";
  const t = (ko: string, en: string) => isKo ? ko : en;

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
      <div class="nav-item ${pageName === 'dashboard' ? 'active' : ''}"><span class="nav-icon">📊</span>${t('대시보드','Dashboard')}</div>
      <div class="nav-item ${pageName === 'usage' ? 'active' : ''}"><span class="nav-icon">📈</span>${t('사용량','Usage')}</div>
      <div class="nav-item ${pageName === 'logs' ? 'active' : ''}"><span class="nav-icon">📋</span>${t('로그','Logs')}</div>
      <div class="nav-item ${pageName === 'keys' ? 'active' : ''}"><span class="nav-icon">🔑</span>${t('API 키','Keys')}</div>
    </div>
  `;

  let content = '';

  if (pageName === 'dashboard') {
    content = `
      <h1>${t('대시보드','Dashboard')}</h1>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('크레딧 잔액','Credit Balance')}</div></div>
        <div class="card-content"><div class="big-number">4.8</div></div>
      </div>
      <div class="grid-4">
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 요청','Total Requests')}</div><div class="small-value">47</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 토큰','Total Tokens')}</div><div class="small-value">38,240</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 비용','Total Spend')}</div><div class="small-value">$0.0156</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('현재 기간','Current Period')}</div><div><span class="badge badge-active">${t('활성','Active')}</span></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('빠른 링크','Quick Links')}</div></div>
        <div class="card-content">
          <div class="link-grid">
            <div class="link-item"><span class="link-icon">📈</span>${t('사용량','Usage')}</div>
            <div class="link-item"><span class="link-icon">📋</span>${t('로그','Logs')}</div>
            <div class="link-item"><span class="link-icon">🔑</span>${t('API 키','Keys')}</div>
            <div class="link-item"><span class="link-icon">💳</span>${t('결제','Billing')}</div>
          </div>
        </div>
      </div>
    `;
  } else if (pageName === 'usage') {
    content = `
      <div class="flex-between mb-12">
        <h1>${t('사용량','Usage')}</h1>
        <div class="period-tabs">
          <span class="period-tab">${t('7일','7D')}</span>
          <span class="period-tab active">${t('30일','30D')}</span>
          <span class="period-tab">${t('90일','90D')}</span>
        </div>
      </div>
      <div class="grid-2" style="grid-template-columns:1fr 1fr 1fr; margin-bottom:16px;">
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 요청','Requests')}</div><div class="small-value">47</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 토큰','Tokens')}</div><div class="small-value">38.2K</div></div></div>
        <div class="card small-card"><div class="card-content"><div class="small-label">${t('총 비용','Spend')}</div><div class="small-value">$0.016</div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('일별 요청 수','Requests per Day')}</div></div>
        <div class="card-content">
          <div class="chart-placeholder">
            ${[20,35,15,45,30,55,40,60,25,50,70,45,35,55,40,30,50,65,45,35,55,40,60,45,50,65,75,55,40,50].map(h => `<div class="chart-bar" style="height:${h}%"></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('일별 토큰 수','Tokens per Day')}</div></div>
        <div class="card-content">
          <div class="chart-line-area"><div class="chart-area"></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('일별 비용','Spend per Day')}</div></div>
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
      <h1>${t('API 로그','API Logs')}</h1>
      <div class="card">
        <div class="card-content" style="padding:0; overflow-x:auto;">
          <table>
            <thead><tr>
              <th>${t('시간','Time')}</th>
              <th>${t('모델','Model')}</th>
              <th>${t('토큰','Tokens')}</th>
              <th>${t('비용','Cost')}</th>
              <th>${t('상태','Status')}</th>
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
        <span class="btn" style="opacity:0.4">← ${t('이전','Prev')}</span>
        <span style="font-size:13px; color:#888">${t('페이지','Page')} 1</span>
        <span class="btn">→ ${t('다음','Next')}</span>
      </div>
    `;
  } else if (pageName === 'keys') {
    content = `
      <h1>${t('API 키','API Keys')}</h1>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('새 키 생성','Create New Key')}</div></div>
        <div class="card-content">
          <div class="form-row">
            <input class="form-input" placeholder="${t('키 이름 (선택)','Key name (optional)')}" style="flex:1" />
            <button class="btn btn-primary">${t('생성','Create')}</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">${t('API 키','API Keys')}</div></div>
        <div class="card-content">
          <div class="key-row">
            <div><div class="key-name">desktop-naia</div><div class="key-date">2026-02-20 14:30</div></div>
            <div class="key-actions"><span class="badge badge-active">${t('활성','Active')}</span><button class="btn btn-sm">${t('삭제','Delete')}</button></div>
          </div>
          <div class="key-row">
            <div><div class="key-name">api-test</div><div class="key-date">2026-02-18 09:15</div></div>
            <div class="key-actions"><span class="badge badge-active">${t('활성','Active')}</span><button class="btn btn-sm">${t('삭제','Delete')}</button></div>
          </div>
          <div class="key-row">
            <div><div class="key-name">old-key</div><div class="key-date">2026-01-15 11:00</div></div>
            <div class="key-actions"><span class="badge badge-secondary" style="background:#f5f5f5;color:#999">${t('폐기됨','Revoked')}</span></div>
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
  const browser = await chromium.launch({ headless: true });

  for (const locale of ["ko", "en"]) {
    const outDir = locale === "ko" ? KO_DIR : EN_DIR;
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`\n========== ${locale.toUpperCase()} ==========`);

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
  }

  await browser.close();
  console.log("\nDone!");
}

run().catch(console.error);
