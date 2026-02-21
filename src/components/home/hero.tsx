import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Sparkles, Terminal, Code2, Bot } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Hero({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [line1, line2] = dict.home.hero.title.split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border/40 pb-12 pt-16 md:pb-20 md:pt-24 lg:pt-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing Animated Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]" style={{ animation: 'float 15s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute right-[5%] top-[10%] -z-10 h-[700px] w-[700px] rounded-full bg-cyan-500/20 blur-[150px]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px]" style={{ animation: 'float 18s ease-in-out infinite reverse' }} />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text Content */}
          <SectionReveal>
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" />
                Next Generation AI OS
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.1]">
                <span className="block text-foreground">{line1 ?? dict.home.hero.title}</span>
                {line2 ? (
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    {line2}
                  </span>
                ) : null}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {dict.home.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/login`}
                  className="rounded-md bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:opacity-90 hover:shadow-cyan-500/40"
                >
                  {dict.home.hero.cta}
                </Link>
                <Link
                  href={`/${lang}#pricing`}
                  className="rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {dict.home.hero.secondaryCta}
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Mockup Graphic */}
          <SectionReveal delay={200}>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur-xl">
                <div className="flex h-8 items-center gap-1.5 rounded-t-xl border-b border-border/50 bg-muted/50 px-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[10px] font-medium text-muted-foreground">nan-os-terminal ~</span>
                </div>
                <div className="p-4 sm:p-6 space-y-4 rounded-b-xl bg-black/5 dark:bg-black/40 font-mono text-sm">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <Terminal className="h-4 w-4" />
                    <span>nan start --avatar vrm</span>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span>[System] LLM Engines initialized (Gemini, Grok, Claude)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span>[System] Local tools and file system access granted</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 text-white">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-foreground font-sans text-sm font-medium">Nan</p>
                        <p className="mt-1 font-sans text-sm text-muted-foreground">
                          시스템이 성공적으로 부팅되었습니다. 마스터, 오늘 어떤 작업을 도와드릴까요?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
