## Overview

This reference targets **Ant Design X 2.x (`@ant-design/x@^2`)**, a UI layer for building AI products: chat interfaces, copilots, agents, and streaming experiences. It assumes Ant Design 6.x is used as the underlying design system and token source.

Use this file when:

- Designing or implementing **chat, copilot, agent, or tools UI**.
- Modeling **messages, tools, streaming state, and interruptions** for LLM backends.
- Coordinating **AI‑specific tokens** and semantics with the core Ant Design theme.

## Version & scope

- **Target package**: `@ant-design/x@^2`
- **Design system dependency**: `antd@^6` and `@ant-design/cssinjs`
- **In scope**:
  - State models for messages, tools, and streaming.
  - Layout patterns for chat UIs, side panels, and tool result blocks.
  - Integration patterns with LLM backends and server APIs.
- **Out of scope**:
  - Generic Ant Design components and tokens (see `ant-design.md`).
  - Pro routing, layouts, and CRUD scaffolding (see `ant-design-pro.md`).

When the question is only about Button / Form / Table behavior and not AI flows, route to `ant-design.md` instead.

## Primary documentation

Check the official Ant Design X 2.x documentation for:

- **Component overview** – high‑level catalog of chat and AI‑centric components.
- **Usage guides** – recommended patterns for chat layouts and message models.
- **Integration examples** – how to connect X with typical LLM APIs and tools.

This reference describes the intent and constraints; for exact props and component names, follow the official docs for the current 2.x minor version.

## Recommended workflows

### 1. Analyse AI product context

- AI form: chatbot, copilot, agent, multi‑agent, workflow builder.
- Message types: user, assistant, tool, system, error.
- Output types: plain text, Markdown, tables, charts, code blocks, files.
- Runtime: React 18–19, CSR vs. SSR vs. streaming SSR.

These decisions drive which components you use (for example, message list vs. timeline, inline vs. side‑panel tools).

### 2. Model messages and tools as data

- Treat messages and tool invocations as **serializable data**, not JSX:
  - Define a stable `Message` structure including `id`, `role`, `content`, and metadata.
  - Represent tool inputs/outputs explicitly rather than embedded text.
- Use X components as **pure views** over this message state.
- Keep message state in a dedicated store (React state, reducer, or external store), not scattered across components.

### 3. Set up streaming and interruption

- Use a minimal state model such as:
  - `messages: Message[]`
  - `streamingMessageId?: string`
  - `isGenerating: boolean`

- Append new tokens to the current streaming message instead of replacing the entire content.
- Support **stop / cancel / retry** operations explicitly in both state and UI.

### 4. Map tool results to visual components

- Distinguish between **assistant messages** and **tool results**.
- Present tool output using dedicated visual blocks (cards, lists, tables, code, etc.).
- Ensure that tool output can be expanded/collapsed and remains inspectable for debugging.

## Best practices checklist

- [ ] Messages and tools are modeled as **plain data**, not JSX trees.
- [ ] The message list is **virtualized** or otherwise optimized for long conversations.
- [ ] Streaming updates are batched or throttled to avoid excessive re‑renders.
- [ ] The UI supports **stop** and **retry** actions during generation.
- [ ] Errors are represented as first‑class messages, not only console logs.
- [ ] AI‑related tokens (assistant/user/tool backgrounds, thinking states) are defined in one place.

## Common anti-patterns

- Treating X as a simple chat bubble renderer without structured message data.
- Manually constructing chat DOM trees in business components instead of using X building blocks.
- Using many independent `useState` hooks for message pieces instead of a single message state model.
- Replacing the full message content on every streaming chunk, causing layout jank and scroll jumps.
- Encoding tool outputs as free‑form assistant text instead of structured, inspectable results.

When you see these patterns, refactor toward a serializable, append‑only message log and dedicated tool result components.

## Integration with other Ant Design skills

- With **Ant Design 6.x** (`ant-design.md`):
  - X uses the same `ConfigProvider` and tokens; do not create a separate theme system.
  - Use core components (Button, Input, Tabs, Layout) to build surrounding chrome and sidebars.
- With **Ant Design Pro** (`ant-design-pro.md`):
  - Place X chat and copilot panels inside Pro layouts and pages.
  - Reuse Pro’s routing, layout shell, and permission model; keep X focused on the AI interaction surface.

In all cases, keep the message and tool state independent of routing and layout so that it can be reused across different shells.

## When to choose / avoid Ant Design X

Choose **Ant Design X 2.x** when:

- You are building a chat / copilot / agent interface on top of Ant Design 6.x.
- You need streaming‑native UI with strong support for tools, errors, and multi‑modal content.
- You want a design‑system‑compatible AI UI rather than a fully bespoke implementation.

Avoid using X as the primary solution when:

- The product has only minimal AI features that can be expressed as simple forms and result cards.
- You are not using Ant Design as the underlying design system.

In those cases, standard Ant Design components may be sufficient without introducing X.
