import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  Bot,
  Layers3,
  Mic,
  Wrench,
  Monitor,
} from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Features({ dict }: { dict: Dictionary }) {
  const items = dict.home.features.items;
  const cards = [
    { icon: Bot, title: items.companion.title, description: items.companion.description },
    {
      icon: Layers3,
      title: items.multiProvider.title,
      description: items.multiProvider.description,
    },
    { icon: Mic, title: items.voice.title, description: items.voice.description },
    { icon: Wrench, title: items.tools.title, description: items.tools.description },
    { icon: Monitor, title: items.desktop.title, description: items.desktop.description },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionReveal>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.home.features.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {dict.home.features.subtitle}
          </p>
        </div>
      </SectionReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <SectionReveal key={card.title} delay={idx * 40}>
            <article className="h-full rounded-xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 shadow-sm">
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-medium">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
