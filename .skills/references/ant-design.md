## Overview

This reference targets **Ant Design 6.x (`antd@^6`)** as the core React UI library and design system. It focuses on mid‑ to large‑scale React / Next.js / Umi / Vite projects that use Ant Design as their primary component library and token system.

Use this file when:

- Choosing or configuring **core components** (Button, Table, Form, Layout, Modal, Drawer, etc.).
- Designing **tokens, themes, and CSS‑in‑JS** with `@ant-design/cssinjs`.
- Solving **a11y, performance, or SSR issues** that are specific to Ant Design components.

## Version & scope

- **Target package**: `antd@^6`
- **Supported React versions**: React 18–19 (as documented in `docs/react/introduce.en-US.md`)
- **Design system**: Ant Design 6 token system and CSS‑in‑JS (`@ant-design/cssinjs`)
- **In scope**:
  - Component APIs and usage patterns from `docs/react/*.md`
  - Design principles and patterns from `docs/spec/*.md`
  - Theming, tokens, layout primitives, a11y, and performance
- **Out of scope**:
  - Ant Design X chat / AI components (see `ant-design-x.md`)
  - Ant Design Pro routing, layout shell, and ProComponents (see `ant-design-pro.md`)

If the question is about application scaffolding, complex routing, or AI chat flows, route first to the Pro or X references.

## Primary documentation

When applying this reference, cross‑check with the following docs in this repository:

- **Getting started & usage**
  - `docs/react/getting-started.en-US.md`
  - `docs/react/introduce.en-US.md`
- **Design & tokens**
  - `docs/react/customize-theme.en-US.md`
  - `docs/spec/colors.en-US.md`
  - `docs/spec/dark.en-US.md`
  - `docs/spec/layout.en-US.md`
- **Migration to 6.x**
  - `docs/react/migration-v6.en-US.md`

This reference should never contradict those docs; when in doubt, follow the repository documentation.

## Recommended workflows

### 1. Analyse project context

- Application type: admin console, content system, B2B platform, forms‑heavy product, dashboards.
- Rendering: CSR / SSR / Streaming (Next.js, Vite, Rspack, Umi).
- Theming: single brand, multiple themes, dark mode requirements.
- Customization depth: token‑only vs. component behavior overrides.

Use these answers to decide how much you rely on tokens vs. composition vs. wrappers.

### 2. Set up providers and theming

- Always configure **a single top‑level `ConfigProvider`**.
- Wrap it with `StyleProvider` from `@ant-design/cssinjs` for deterministic style ordering, especially with SSR.
- Define global tokens in one place and avoid scattering theme logic across pages.

### 3. Apply component usage patterns

- **Forms**:
  - Use `Form` as the source of truth instead of ad‑hoc `useState`.
  - Keep validation rules and field state at the `Form` level.
- **Tables**:
  - Ensure a stable `rowKey`.
  - Memoize `columns` to avoid re‑creating them on every render.
  - Use pagination or virtual scrolling for large datasets.
- **Modals / Drawers**:
  - Prefer `destroyOnClose` for dialogs that contain complex state.
  - Keep modal content focused; avoid deep nested trees and duplicated state.

### 4. Design tokens and themes

- Model tokens with three layers:
  - **Global tokens** (brand, spacing, typography).
  - **Component tokens** (per‑component fine‑tuning).
  - **Alias tokens** for semantics (for example, success, warning, or domain‑specific meanings).
- Implement theme switching via `ConfigProvider.theme`, not via global CSS overrides.
- For dark mode, base your design on `docs/spec/dark.en-US.md` and avoid hard‑coded color values.

## Best practices checklist

- [ ] Use a **single** `ConfigProvider` at the app root.
- [ ] Centralize tokens and avoid duplicating theme logic in components.
- [ ] Use `@ant-design/cssinjs` and `StyleProvider` when SSR or theming is involved.
- [ ] For large tables, enable pagination or virtualization and memoize columns.
- [ ] Use `destroyOnClose` for stateful modals and drawers.
- [ ] Follow accessibility guidance from `docs/spec/*` and ensure keyboard and screen‑reader support.
- [ ] Keep page files reasonably small; extract reusable composites into separate components.

## Common anti-patterns

- Global overrides of `.ant-*` selectors that bypass the token system.
- Copy‑pasting internal component implementation instead of using public APIs.
- Mixing a global CSS framework (for example, heavy Tailwind overrides) with Ant Design styles in an ad‑hoc way.
- Controlling form field state exclusively with local `useState` instead of `Form`.
- Building “mega pages” with multiple screens of logic instead of leveraging routing and composition.

When you detect these patterns, prefer refactoring toward token‑driven theming and smaller, focused components.

## Integration with other Ant Design skills

- With **Ant Design X** (`ant-design-x.md`):
  - Ant Design provides the base typography, layout, and tokens.
  - X builds chat and AI surfaces on top of these tokens; they should share `ConfigProvider`.
- With **Ant Design Pro** (`ant-design-pro.md`):
  - Pro uses Ant Design components for pages, forms, and tables.
  - Maintain compatibility by following token and component usage guidance from this file.

In mixed stacks, ensure that there is still only **one** source of truth for tokens and theming.

## When to choose / avoid Ant Design

Choose **Ant Design 6.x** when:

- You need a full design system with comprehensive component coverage.
- You care about consistent theming, dark mode, and design tokens across an app.
- You are building an enterprise‑grade React application (with or without Pro / X).

Avoid using Ant Design as the primary library when:

- The product is a highly custom, animation‑heavy, consumer‑facing experience that does not follow typical desktop‑web patterns.
- You only need a very small subset of primitives and want a minimal footprint with no design system.

In those cases, you can still selectively use Ant Design components, but many of the design‑system recommendations in this reference may not apply.
