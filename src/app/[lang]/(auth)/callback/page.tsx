"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDictionary } from "@/components/providers/locale-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CallbackContent() {
  const searchParams = useSearchParams();
  const dict = useDictionary();
  const lang = dict.locale;
  const source = searchParams.get("source");
  const state = searchParams.get("state");
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function issueKey() {
      try {
        const res = await fetch("/api/gateway/desktop-key", {
          method: "POST",
        });
        if (!res.ok) throw new Error(dict.common.error);
        const data = await res.json();
        setKey(data.key);

        if (source !== "web") {
          // Include state param for deep link verification
          const deepLink = state
            ? `cafelua://auth?key=${encodeURIComponent(data.key)}&state=${encodeURIComponent(state)}`
            : `cafelua://auth?key=${encodeURIComponent(data.key)}`;
          window.location.href = deepLink;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : dict.common.error);
      }
    }
    issueKey();
  }, [source, state, dict.common.error]);

  if (error) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" asChild>
            <Link href={`/${lang}/dashboard`}>{dict.sidebar.dashboard}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!key) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">{dict.common.loading}</p>
        </CardContent>
      </Card>
    );
  }

  if (source === "web") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{dict.settings.desktopApp.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {dict.settings.desktopApp.description}
          </p>
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <code className="flex-1 text-xs break-all">{key}</code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(key);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? dict.common.copied : dict.common.copy}
            </Button>
          </div>
          <div className="text-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${lang}/settings`}>
                &larr; {dict.settings.title}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const deepLinkUrl = state
    ? `cafelua://auth?key=${encodeURIComponent(key)}&state=${encodeURIComponent(state)}`
    : `cafelua://auth?key=${encodeURIComponent(key)}`;

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6 text-center space-y-4">
        <p className="text-muted-foreground">{dict.auth.callbackRedirecting}</p>
        <p className="text-sm text-muted-foreground">
          {dict.auth.callbackManualPrefix}
          <a
            href={deepLinkUrl}
            className="underline text-primary"
          >
            {dict.auth.callbackManualLink}
          </a>
          {dict.auth.callbackManualSuffix}
        </p>
      </CardContent>
    </Card>
  );
}

function CallbackFallback() {
  const dict = useDictionary();
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6 text-center">
        <p className="text-muted-foreground">{dict.common.loadingShort}</p>
      </CardContent>
    </Card>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
