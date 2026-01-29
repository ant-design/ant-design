## Overview

This reference targets the **latest Ant Design Pro 5.x (`ant-design-pro@^5`)** series. Ant Design Pro is an **enterprise application framework** built on top of Ant Design and ProComponents, focusing on layouts, routing, permissions, and standardized CRUD experiences.

Use this file when:

- Designing **admin / back‑office / B2B** applications.
- Making decisions about **layouts, routing, menus, and permission models**.
- Standardizing **CRUD, forms, and tables** using ProComponents (ProTable, ProForm, etc.).

## Version & scope

- **Target packages**:
  - `ant-design-pro@^5`
  - `@ant-design/pro-components` (for ProTable, ProForm, etc.)
- **Design system dependency**: `antd@^6`
- **Typical stack**: React + Umi / React Router / Next.js
- **In scope**:
  - Project structure, layout shells, routing configuration, and access control.
  - Usage of ProTable, ProForm, and related ProComponents in standard CRUD flows.
  - Performance and maintainability patterns for mid‑ to large‑scale admin apps.
- **Out of scope**:
  - Low‑level component styling and tokens (see `ant-design.md`).
  - AI chat and copilot UI (see `ant-design-x.md`).

## Primary documentation

Cross‑check this reference with the latest Ant Design Pro documentation:

- **Overview and concepts** – high‑level introduction to Pro as an application scaffold.
- **Routing & layout** – how routes drive menus, breadcrumbs, and layout shells.
- **Access control** – usage of `access.ts` and role‑based permission patterns.
- **ProComponents** – guides for ProTable, ProForm, and related components.

When the official docs update, this reference should be validated against those changes for the current 5.x line.

## Recommended workflows

### 1. Analyse business and engineering context

- Application type: admin console, internal tool, multi‑tenant SaaS, approval flows.
- User model: single role, multi‑role, RBAC, organization hierarchy.
- Page types: lists, forms, detail views, dashboards, approval flows.
- Backend: REST, GraphQL, BFF, microservices.

This context informs how many layouts, route branches, and access rules you need.

### 2. Establish project structure and boundaries

- Use a predictable directory layout, for example:
  - `layouts/` – global layout shells.
  - `pages/` – route‑driven pages.
  - `access.ts` – permission definitions.
  - `services/` – API layer.
  - `components/` – reusable UI and composites.

- Ensure that:
  - `pages` correspond directly to routes.
  - Network access is encapsulated in `services`, not inside page components.

### 3. Design routing, layout, and permissions

- Let **route configuration define the menu**; avoid hand‑crafting menu JSON.
- Keep layout configuration centralized to avoid per‑page layout hacks.
- Use an `access` module (for example `access.ts`) to define reusable permission checks.
- Apply the principle: **page‑level permission > button‑level permission**; UI hides, backend enforces.

### 4. Standardize CRUD with ProComponents

- Use **ProTable** for typical list + search + pagination + actions scenarios:
  - Treat `columns` as a schema definition, kept in one place.
  - Centralize action columns to keep operations consistent.
- Use **ProForm** for forms:
  - Let ProForm manage form state and validation.
  - Avoid wrapping ProForm fields with extra `useState` layers.

These patterns keep CRUD implementations consistent and easier to maintain over time.

## Best practices checklist

- [ ] Pages use a consistent **layout shell** rather than custom per‑page layouts.
- [ ] Routes are the single source of truth for **navigation and menu items**.
- [ ] Permissions are defined in an `access` layer, not scattered across components.
- [ ] All network calls live in a **services** layer; pages handle data shape, not transport.
- [ ] ProTable and ProForm are used for standard list and form screens.
- [ ] Large pages are split by route; avoid very large “god pages”.
- [ ] Tokens and theming are configured via `ConfigProvider` and consumed by Pro, not overridden by global CSS.

## Common anti-patterns

- Treating Pro as a one‑time template to copy‑paste code from instead of a living framework.
- Bypassing Pro layouts and manually rendering pages, leading to inconsistent shells and navigation.
- Writing fetch/axios calls directly in page components.
- Implementing many slightly different ad‑hoc tables and forms instead of converging on ProComponents.
- Applying global CSS hacks on Pro layouts and menus instead of using tokens and configuration.

When you see these patterns, refactor toward a clearer layering: routes → pages → ProComponents → services.

## Integration with other Ant Design skills

- With **Ant Design 6.x** (`ant-design.md`):
  - Pro consumes the Ant Design design system and components.
  - Tokens and theming remain defined at the Ant Design level; Pro does not create a separate design system.
- With **Ant Design X** (`ant-design-x.md`):
  - Place chat, copilot, and AI panels inside Pro pages or layouts.
  - Let Pro handle navigation, layout, and permissions; let X handle AI interaction surfaces.

Keep the responsibility split clear: Pro provides **structure and conventions**, Ant Design provides **components and tokens**, X provides **AI UI**.

## When to choose / avoid Ant Design Pro

Choose **Ant Design Pro 5.x** when:

- Building medium to large enterprise back‑office or internal systems.
- You have significant CRUD, tables, and forms that should look and behave consistently.
- You value a convention‑over‑configuration approach to layouts, routing, and permissions.

Avoid Pro when:

- Building content‑heavy marketing sites or highly bespoke consumer experiences.
- Creating very small apps where a full scaffold and ProComponents would be overkill.
- Focusing purely on AI chat / copilot experiences without the surrounding admin shell (use `ant-design-x.md` plus `ant-design.md` instead).
