import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

export const MANUAL_SLUGS = [
  "install",
  "getting-started",
  "main-screen",
  "chat",
  "history",
  "progress",
  "skills",
  "channels",
  "agents",
  "diagnostics",
  "settings",
  "tools",
  "naia-account",
  "troubleshooting",
] as const;

export type ManualSlug = (typeof MANUAL_SLUGS)[number];

export function isManualSlug(value: string): value is ManualSlug {
  return (MANUAL_SLUGS as readonly string[]).includes(value);
}

export async function readManual(
  lang: Locale,
  slug?: ManualSlug,
): Promise<string> {
  const filename = slug ?? "index";
  let fullPath = path.join(
    process.cwd(),
    "src",
    "content",
    "manual",
    lang,
    `${filename}.md`,
  );

  if (!existsSync(fullPath)) {
    fullPath = path.join(
      process.cwd(),
      "src",
      "content",
      "manual",
      "en",
      `${filename}.md`,
    );
  }

  return readFile(fullPath, "utf-8");
}

/** Slug → i18n section key mapping */
export const SLUG_TO_SECTION_KEY: Record<ManualSlug, string> = {
  install: "install",
  "getting-started": "gettingStarted",
  "main-screen": "mainScreen",
  chat: "chat",
  history: "history",
  progress: "progress",
  skills: "skills",
  channels: "channels",
  agents: "agents",
  diagnostics: "diagnostics",
  settings: "settings",
  tools: "tools",
  "naia-account": "naiaAccount",
  troubleshooting: "troubleshooting",
};
