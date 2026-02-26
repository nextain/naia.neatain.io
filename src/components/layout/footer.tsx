"use client";

import Link from "next/link";
import { useDictionary } from "@/components/providers/locale-provider";
import { NanLogo } from "@/components/ui/naia-logo";
import { Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const dict = useDictionary();
  const lang = dict.locale;

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <NanLogo className="h-6 w-6" />
              <span className="font-bold">{dict.footer.brand}</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {dict.footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <Link href="https://github.com/nextain/naia-os" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <Link href="https://discord.gg/FGYJN7auty" target="_blank" rel="noreferrer">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Discord</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link
              href={`/${lang}/privacy`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.privacy}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.terms}
            </Link>
            <Link
              href={`/${lang}/refund`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.refund}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.contact}
            </Link>
            <a
              href="https://about.nextain.io"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.about}
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
