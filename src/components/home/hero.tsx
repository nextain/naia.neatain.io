"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Sparkles, Terminal, Code2, Bot } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Hero({ dict, lang, hasSession = false }: { dict: Dictionary; lang: string; hasSession?: boolean }) {
  const [line1, line2] = dict.home.hero.title.split("\n");
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);

  useEffect(() => {
    // Start with a random character, avoiding layout shift by setting it after mount
    let currentIndex = Math.floor(Math.random() * 2);
    setActiveCharIndex(currentIndex);

    const interval = setInterval(() => {
      // Start fade out by setting active to null
      setActiveCharIndex(null);

      // Wait 1 second for fade out to complete, then show the next character
      setTimeout(() => {
        currentIndex = currentIndex === 0 ? 1 : 0;
        setActiveCharIndex(currentIndex);
      }, 1000);
    }, 7000); // Cycle every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border/40 pb-12 pt-16 md:pb-20 md:pt-24 lg:pt-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing Animated Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]" style={{ animation: 'float 15s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute right-[5%] top-[10%] -z-10 h-[700px] w-[700px] rounded-full bg-cyan-500/20 blur-[150px]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px]" style={{ animation: 'float 18s ease-in-out infinite reverse' }} />

      <style jsx>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

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
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  {dict.home.hero.title}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {dict.home.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {hasSession ? (
                  <Link
                    href={`/${lang}/dashboard`}
                    className="rounded-md bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:opacity-90 hover:shadow-cyan-500/40"
                  >
                    {dict.sidebar.dashboard}
                  </Link>
                ) : (
                  <Link
                    href={`/${lang}/login`}
                    className="rounded-md bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:opacity-90 hover:shadow-cyan-500/40"
                  >
                    {dict.home.hero.cta}
                  </Link>
                )}
                <Link
                  href={`/${lang}/download`}
                  className="rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {dict.home.hero.secondaryCta}
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Character Graphic */}
          <SectionReveal delay={200}>
            <div className="relative mx-auto max-w-lg lg:max-w-none flex justify-center h-[400px] md:h-[500px] items-center">
              <div 
                className="relative h-full w-full flex justify-center items-center"
                style={{ animation: 'subtle-float 4s ease-in-out infinite' }}
              >
                <img 
                  src="/naia-default-character.png"
                  alt="Naia Default Character" 
                  className={`absolute inset-0 m-auto h-[110%] w-auto object-contain drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${activeCharIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
                />
                <img 
                  src="/naia-character.png"
                  alt="Naia Character" 
                  className={`absolute inset-0 m-auto h-[110%] w-auto object-contain drop-shadow-2xl transition-opacity duration-1000 ease-in-out ${activeCharIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

