/* eslint-disable @next/next/no-img-element */
import { Children, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** If any child is a block element (figure), render as div instead of p. */
function SmartParagraph({ children }: { children?: React.ReactNode }) {
  const hasBlock = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === "figure",
  );
  if (hasBlock) return <div className="my-4">{children}</div>;
  return <p>{children}</p>;
}

interface ManualMarkdownProps {
  markdown: string;
  lang: string;
}

export function ManualMarkdown({ markdown, lang }: ManualMarkdownProps) {
  return (
    <article className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mb-2 mt-8 clear-both text-xl font-semibold text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-1 mt-5 clear-both text-base font-semibold text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-1 mt-4 clear-both text-sm font-semibold text-foreground">
              {children}
            </h4>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-5">{children}</ol>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border/50 bg-muted/30 px-3 py-2 text-left font-medium text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border/50 px-3 py-2">{children}</td>
          ),
          img: ({ src, alt }) => {
            const srcStr = typeof src === "string" ? src : "";
            const imgSrc = srcStr.startsWith("/")
              ? srcStr
              : `/manual/${lang}/${srcStr}`;
            return (
              <figure
                className="my-6 md:float-right md:my-2 md:ml-6"
                style={{ width: "min(400px, 100%)" }}
              >
                <img
                  src={imgSrc}
                  alt={alt ?? ""}
                  className="h-auto w-full rounded-lg border border-border/30 shadow-sm"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground/70">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded bg-muted/50 px-1.5 py-0.5 text-xs font-mono text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className={className}>{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground/80">
              {children}
            </blockquote>
          ),
          p: SmartParagraph,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
