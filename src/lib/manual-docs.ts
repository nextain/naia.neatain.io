import { readFile } from "fs/promises";
import path from "path";
import type { Locale } from "@/i18n/config";

export const MANUAL_SLUGS = [
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
  "lab",
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
  const fullPath = path.join(
    process.cwd(),
    "src",
    "content",
    "manual",
    lang,
    `${filename}.md`,
  );
  return readFile(fullPath, "utf-8");
}

/** Slug → i18n section key mapping */
export const SLUG_TO_SECTION_KEY: Record<ManualSlug, string> = {
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
  lab: "lab",
  troubleshooting: "troubleshooting",
};
