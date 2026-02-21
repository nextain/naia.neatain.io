import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { lookupUser } from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DISCORD_OAUTH2_URL = process.env.DISCORD_OAUTH2_URL ?? "";

export default async function IntegrationsPage({
	params,
	searchParams,
}: {
	params: Promise<{ lang: string }>;
	searchParams: Promise<{ channel?: string; source?: string; linked?: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const { channel, source, linked } = await searchParams;
	const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  const email = session.user?.email ?? undefined;
  let isDiscordLinked = false;
  if (email) {
    try {
      const linkedUser = await lookupUser("discord", { email });
      isDiscordLinked = linkedUser?.user_id === session.gwUserId;
    } catch {
      isDiscordLinked = false;
    }
  }

  // 아직 채널별 실제 연동 상태 저장/조회 API가 준비되지 않아 고정 false 처리.
  const isGoogleLinked = false;

  const t = dict.settings.integrations;
  const redirectTo =
    channel === "discord" && source === "naia-shell"
      ? `/${lang}/callback?source=naia-shell&channel=discord`
      : `/${lang}/settings/integrations?channel=discord&linked=oauth`;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.description}</p>
        {linked === "oauth" && (
          <p className="mt-2 text-sm text-primary">
            Discord 계정 연동이 완료되었습니다. 이제 봇을 서버에 추가하세요.
          </p>
        )}
      </div>

      {/* Discord */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t.discord.title}</CardTitle>
            <Badge variant={isDiscordLinked ? "default" : "secondary"}>
              {isDiscordLinked ? t.discord.connected : t.discord.notConnected}
            </Badge>
          </div>
          <CardDescription>
            Discord 계정 연동(OAuth)과 서버 봇 추가는 별도 단계입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("discord", {
                redirectTo,
              });
            }}
          >
            <Button type="submit" size="sm" data-testid="discord-link-account-btn">
              {isDiscordLinked ? "Discord 계정 다시 연동" : "Discord 계정 연동"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">{t.discord.howToUse}</p>
          {channel === "discord" && source === "naia-shell" && (
            <p className="text-sm text-primary">
              Naia Shell에서 요청한 Discord 연동입니다. 계정 연동 후 봇을 추가하세요.
            </p>
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium">1) Discord 계정 연동</p>
            <p className="text-sm text-muted-foreground">
              위 버튼으로 계정을 연결합니다.
            </p>
          </div>
          {DISCORD_OAUTH2_URL && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                2) 봇 서버 추가
              </p>
              <p className="text-sm font-medium">
                {t.discord.inviteBotDescription}
              </p>
              <Button asChild variant="outline" size="sm">
                <a
                  href={DISCORD_OAUTH2_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.discord.inviteBot}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Chat */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {t.googleChat.title}
            </CardTitle>
            <Badge variant={isGoogleLinked ? "default" : "secondary"}>
              {isGoogleLinked
                ? t.googleChat.connected
                : t.googleChat.notConnected}
            </Badge>
          </div>
          <CardDescription>Google Chat 채널은 준비 중입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t.googleChat.howToUse}
          </p>
        </CardContent>
      </Card>

      {/* Back to settings */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/${lang}/settings`}>
            &larr; {dict.settings.title}
          </Link>
        </Button>
      </div>
    </div>
  );
}
