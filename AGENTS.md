# naia.nextain.io — Agent Entry Point

## Context Loading (MUST read first)

1. `.agents/context/agents-rules.json` — Project rules (SoT)
2. `.agents/context/project-index.yaml` — Context index + mirroring rules

## On-demand Context

| Context | When to read |
|---------|-------------|
| `.agents/workflows/development-cycle.yaml` | Before any coding (ALWAYS) |

## Mirroring

Every `.agents/context/*.json` has a `.users/context/*.md` mirror (Korean, detailed).
When updating one side, update the other.

## Quick Reference

- **Brand Identity**: 
  - Company: Nextain (Next AI Networks)
  - Product: Naia OS
  - Tagline: The Next Generation AI OS
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Package manager**: npm
- **Auth**: NextAuth.js v5 (Google + Discord OAuth)
- **Backend**: Next.js API Routes (BFF) → any-llm gateway
- **Deployment**: Vercel
- **Test**: Vitest + React Testing Library, integration-first TDD
- **Commits**: English, `<type>(<scope>): <description>`
- **Response language**: Korean
