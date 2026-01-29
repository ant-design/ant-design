---

name: ant-design-ecosystem
description: Skill for working across the Ant Design ecosystem: ant-design 6.x, ant-design-x 2.x, and ant-design-pro v5.x. Provides structured, version-aware guidance for UI components, AI interfaces, and enterprise application scaffolding.

---

## Overview

This SKILL package describes how to use the Ant Design ecosystem in a consistent, engineering-focused way. It is organized as one root skill file (`.skills/SKILL.md`, this file) plus three reference files under `.skills/references`:

- `ant-design.md` – core design system and React component library, targeting **`antd@^6`**
- `ant-design-x.md` – AI / chat / copilot UI layer, targeting **`@ant-design/x@^2`**
- `ant-design-pro.md` – enterprise application framework, targeting **`ant-design-pro@^5`** (latest v5 series)

Each reference file follows the same structure so that AI tools and agents can route questions and tasks deterministically.

## How this SKILL relates to `.skills/references`

- **This file (`SKILL.md`)**:
  - Defines the **scope of the whole ecosystem skill**
  - Explains **when to load which reference** based on the task
  - Documents the **shared section structure** each reference must implement
- **Reference files (`.skills/references/*.md`)**:
  - Contain **concrete, version-specific guidance** for one library
  - Are **kept in sync with official documentation**:
    - `ant-design.md` aligns with docs under `docs/react/*.md` and `docs/spec/*.md`
    - `ant-design-x.md` aligns with the official Ant Design X 2.x documentation
    - `ant-design-pro.md` aligns with the latest Ant Design Pro (v5) documentation

When using this skill, tools should:

1. Load `.skills/SKILL.md` to understand the ecosystem and routing rules.
2. Then load exactly one of the reference files depending on the library being used.

## Shared reference structure

All files in `.skills/references` use the same section layout:

1. **Overview** – What this library is and the main kind of problems it solves.
2. **Version & scope** – Target npm packages, supported React versions, and what is explicitly out of scope.
3. **Primary documentation** – Pointers to the most relevant official docs and guides.
4. **Recommended workflows** – Step‑by‑step checklists for the most common tasks.
5. **Best practices checklist** – Short, actionable rules for daily development.
6. **Common anti-patterns** – Things that should almost never be done.
7. **Integration with other Ant Design skills** – How this library relates to the other two references.
8. **When to choose / avoid this library** – High-level decision guidance.

This structure is intentionally stable so that tools can:

- Parse sections by heading name
- Compare guidance across `ant-design`, `ant-design-x`, and `ant-design-pro`
- Keep answers consistent with the current major versions

## Ecosystem routing rules

- Use **`ant-design.md`** when:
  - Working with **core UI components** (Button, Table, Form, Layout, etc.)
  - Designing or tuning **tokens, themes, and styling** with `@ant-design/cssinjs`
  - Addressing **accessibility (a11y)**, responsiveness, or performance at the component level
- Use **`ant-design-x.md`** when:
  - Building **chat, copilot, agent, or streaming AI interfaces**
  - Modeling **messages, tools, streaming state, and AI‑specific tokens**
  - Integrating with **LLM backends** while keeping the UI state‑driven and serializable
- Use **`ant-design-pro.md`** when:
  - Designing **enterprise layouts, routing, menus, and permissions**
  - Standardizing **CRUD, forms, and tables** in a mid‑ or large‑scale application
  - Making decisions about **project scaffolding and long‑term maintainability**

If a task spans multiple libraries (for example, a Pro layout that embeds an X chat panel with core antd components), load all relevant references and respect their individual scopes.

## High-level workflow for Ant Design ecosystem projects

1. **Analyse project context**
   - Application type: enterprise admin, SaaS dashboard, AI product, etc.
   - Tech stack: React 18–19, Next.js, Umi, Vite, Rspack, SSR/CSR/Streaming.
   - Requirements: theming, dark mode, i18n, accessibility, AI features.
2. **Choose the right subset of the ecosystem**
   - `antd` only for design‑system‑centric UI libraries or simple apps.
   - `antd` + `ant-design-pro` for classic enterprise back‑office systems.
   - `antd` + `@ant-design/x` for AI chat / copilot interfaces.
   - All three together for complex admin‑plus‑AI products.
3. **Set up tokens, theming, and providers**
   - Use `ConfigProvider` and `@ant-design/cssinjs` as described in `ant-design.md`.
   - Centralize token definitions and avoid scattered overrides.
4. **Apply library‑specific workflows**
   - For component usage, follow `ant-design.md`.
   - For AI interfaces, follow `ant-design-x.md`.
   - For layouts, routing, and permissions, follow `ant-design-pro.md`.
5. **Run ecosystem checklists before delivery**
   - UI and a11y pass basic checks.
   - Tokens and themes are consistent and do not rely on global CSS hacks.
   - Performance is acceptable for large tables, long chats, and complex layouts.

## SKILL standard compliance

This SKILL file and all reference files are written to be:

- **Deterministic** – Section titles and order are stable and machine‑friendly.
- **Version‑aware** – Each reference explicitly lists the major versions it targets.
- **Actionable** – Focus on checklists, do/don’t guidance, and concrete workflows.
- **Non‑intrusive** – No assumptions about business logic, only about UI and architecture.

When the Ant Design ecosystem releases a new major version (for example, `antd@7` or `ant-design-pro@6`), each reference file should be updated and its **Version & scope** section revised accordingly.
