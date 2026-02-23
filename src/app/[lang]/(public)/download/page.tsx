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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const GITHUB_REPO = "nextain/naia-os";
const RELEASE_BASE = `https://github.com/${GITHUB_REPO}/releases`;

const DOWNLOAD_URLS: Record<string, string> = {
  flatpak: `${RELEASE_BASE}/latest/download/Naia-Shell-x86_64.flatpak`,
  appimage: `${RELEASE_BASE}/latest/download/Naia_0.1.0_amd64.AppImage`,
  deb: `${RELEASE_BASE}/latest/download/Naia_0.1.0_amd64.deb`,
  rpm: `${RELEASE_BASE}/latest/download/Naia-0.1.0-1.x86_64.rpm`,
};

const FORMAT_ICONS = {
  flatpak: Shield,
  appimage: Package,
  deb: Download,
  rpm: Download,
} as const;


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
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-lg text-muted-foreground">{d.subtitle}</p>
      </div>

      {/* Download Cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {formats.map((key) => {
          const fmt = d.formats[key];
          const Icon = FORMAT_ICONS[key];
          const isFlatpak = key === "flatpak";

          return (
            <Card
              key={key}
              className={
                isFlatpak
                  ? "border-primary/50 bg-primary/5 sm:col-span-2"
                  : ""
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${isFlatpak ? "bg-primary/10 text-primary" : "bg-muted"}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{fmt.name}</CardTitle>
                    {isFlatpak && (
                      <Badge variant="default" className="text-xs">
                        {d.recommended}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {fmt.description}
                </p>
                <div className="mb-4 rounded-md bg-muted/50 p-3">
                  <code className="text-xs break-all">{fmt.command}</code>
                </div>
                <Button
                  className="w-full"
                  variant={isFlatpak ? "default" : "outline"}
                  asChild
                >
                  <Link href={DOWNLOAD_URLS[key]} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {fmt.name} {d.version}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
        <div className="rounded-md bg-muted/50 p-3">
          <code className="text-xs">sha256sum -c SHA256SUMS</code>
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
