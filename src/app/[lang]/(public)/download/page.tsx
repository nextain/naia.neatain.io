import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import {
  Download,
  Package,
  Shield,
  Terminal,
  ExternalLink,
  Github,
  CheckCircle,
  HardDrive,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import Link from "next/link";

const GITHUB_REPO = "nextain/naia-os";
const RELEASE_BASE = `https://github.com/${GITHUB_REPO}/releases`;

const DOWNLOAD_URLS: Record<string, string> = {
  flatpak: `${RELEASE_BASE}/latest/download/Naia-Shell-x86_64.flatpak`,
  appimage: `${RELEASE_BASE}/latest/download/Naia.Shell_0.1.0_amd64.AppImage`,
  deb: `${RELEASE_BASE}/latest/download/Naia.Shell_0.1.0_amd64.deb`,
  rpm: `${RELEASE_BASE}/latest/download/Naia.Shell-0.1.0-1.x86_64.rpm`,
};

const FORMAT_ICONS = {
  flatpak: Shield,
  appimage: Package,
  deb: Download,
  rpm: Download,
} as const;

/** Formats that have passed verification and are available for download */
const ENABLED_FORMATS = new Set(["flatpak"]);


export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const d = dict.download;

  const formats = ["flatpak", "appimage", "deb", "rpm"] as const;

  return (
    <div className="mx-auto max-w-4xl overflow-x-hidden px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-lg text-muted-foreground">{d.subtitle}</p>
      </div>

      {/* Verification Notice */}
      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
        {d.verificationNotice}
      </div>

      {/* Naia OS — Recommended */}
      <Card className="mb-8 border-primary/50 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HardDrive className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{d.naiaOs.title}</CardTitle>
              <Badge variant="default" className="text-xs">
                {d.recommended}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted-foreground">
            {d.naiaOs.description}
          </p>
          <p className="mb-4 flex items-start gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {d.naiaOs.note}
          </p>
          <Button className="w-full" disabled>
            <Download className="mr-2 h-4 w-4" />
            {d.naiaOs.cta} — {dict.common.comingSoon}
          </Button>
        </CardContent>
      </Card>

      {/* Shell-only notice */}
      <p className="mb-4 text-center text-sm text-muted-foreground">
        {d.shellOnly}
      </p>

      {/* Shell Download Cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {formats.map((key) => {
          const fmt = d.formats[key];
          const Icon = FORMAT_ICONS[key];

          return (
            <Card key={key} className="min-w-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{fmt.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  {fmt.description}
                </p>
                <p className="mb-3 flex items-start gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {fmt.note}
                </p>
                <div className="relative mb-4 overflow-hidden rounded-md bg-muted/50 py-3 pl-3 pr-10">
                  <div className="overflow-x-auto">
                    <pre className="text-xs leading-relaxed">
                      <code>{fmt.command}</code>
                    </pre>
                  </div>
                  <CopyButton text={fmt.command} />
                </div>
                {ENABLED_FORMATS.has(key) ? (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={DOWNLOAD_URLS[key]} target="_blank" rel="noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      {fmt.name}
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    {fmt.name} — {dict.common.comingSoon}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* OpenClaw Gateway Guide */}
      <Card className="mb-12 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
              <Info className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg">{d.gateway.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>{d.gateway.description}</p>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <span>{d.gateway.naiaOsIncluded}</span>
            </li>
            <li className="flex items-start gap-2">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {d.gateway.shellOnlyGuide}{" "}
                <Link
                  href="https://github.com/openclaw/openclaw"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {d.gateway.openclawLink}
                </Link>
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Requirements */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{d.requirements}</h2>
        <ul className="space-y-2">
          {d.requirementsList.map((req) => (
            <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Checksum */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">{d.checksum}</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          {d.checksumDescription}
        </p>
        <div className="relative rounded-md bg-muted/50 py-3 pl-3 pr-10">
          <div className="overflow-x-auto">
            <code className="text-xs">sha256sum -c SHA256SUMS</code>
          </div>
          <CopyButton text="sha256sum -c SHA256SUMS" />
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link href={RELEASE_BASE} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            {d.allReleases}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href={`https://github.com/${GITHUB_REPO}`}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            {d.sourceCode}
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href={`/${lang}/manual/install`}>
            <Terminal className="mr-2 h-4 w-4" />
            {dict.manual.sections.install}
          </Link>
        </Button>
      </div>
    </div>
  );
}
