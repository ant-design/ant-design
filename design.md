---
version: alpha
name: Ant Design
description: Enterprise-grade React UI design system from Ant Group, built around the values Natural, Certain, Meaningful, and Growing.
colors:
  primary: '#1677FF'
  success: '#52C41A'
  warning: '#FAAD14'
  error: '#FF4D4F'
  info: '#1677FF'
  blue: '#1677FF'
  blue-7: '#0958D9'
  purple: '#722ED1'
  cyan: '#13C2C2'
  green: '#52C41A'
  magenta: '#EB2F96'
  red: '#F5222D'
  orange: '#FA8C16'
  yellow: '#FADB14'
  volcano: '#FA541C'
  geekblue: '#2F54EB'
  gold: '#FAAD14'
  lime: '#A0D911'
  surface: '#FFFFFF'
  surface-container: '#FAFAFA'
  surface-layout: '#F5F5F5'
  on-surface: '#1F1F1F'
  on-surface-variant: '#595959'
  on-surface-disabled: '#BFBFBF'
  outline: '#D9D9D9'
  outline-variant: '#F0F0F0'
typography:
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
  headline-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 20px
  code:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  none: 0px
  sm: 2px
  md: 4px
  DEFAULT: 6px
  lg: 8px
  xl: 16px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  control-height: 32px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-primary-hover:
    backgroundColor: '#4096FF'
  button-primary-active:
    backgroundColor: '#0958D9'
  button-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-default-hover:
    textColor: '#4096FF'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 4px 11px
  input-field-focus:
    backgroundColor: '{colors.surface}'
  select-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 11px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 24px
  modal:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 20px 24px
  menu-item-selected:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  tabs-tab-active:
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  table-header:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.title-md}'
    padding: 16px
  tag:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  tooltip:
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: 6px 8px
  dropdown-item-hover:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
  alert-success:
    backgroundColor: '#F6FFED'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-warning:
    backgroundColor: '#FFFBE6'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-error:
    backgroundColor: '#FFF2F0'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-info:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  badge-status-error:
    backgroundColor: '{colors.error}'
    rounded: '{rounded.full}'
    width: 6px
    height: 6px
  tag-blue:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.blue-7}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
---

## Overview

This document describes the default light theme of **Ant Design v6**. The system follows semantic versioning: major releases (v5 → v6) signal an overhaul of the design language, while minor and patch releases keep this document stable. Refer to [CHANGELOG.en-US.md](https://github.com/ant-design/ant-design/blob/master/CHANGELOG.en-US.md) for the per-release token drift inside a major.

Ant Design is the open-source design system Ant Group uses to ship enterprise software — primarily mid- and back-office consoles, dashboards, and operational tools. The system was created in 2015 to give large product teams a shared, opinionated foundation so they could ship dense, data-rich interfaces without re-deciding the basics on every screen.

Four values guide every decision in the system:

- **Natural.** The interface follows established conventions; nothing surprises a returning user. Patterns that already exist in operating systems and prior generations of enterprise software are preferred over novel inventions.
- **Certain.** Users always know what state they're in, what their inputs did, and what the next step is. Hover, focus, loading, and error states are explicit and consistent.
- **Meaningful.** Visual emphasis is reserved for action. Decoration that does not communicate is removed.
- **Growing.** The system scales from small forms to dense tables to multi-tenant admin consoles without losing coherence.

## Colors

The palette is built from one **primary** brand seed, four semantic state seeds (`success`, `warning`, `error`, `info`), and neutral base colors for text and surfaces. Color seeds expand automatically through `@ant-design/colors` into gradient steps covering background tint, hover, active, and outline variants — change the seed, and the entire derived palette moves with it.

`#1677FF` was chosen as the primary because blue reads as trustworthy and focused without the corporate flatness of a darker navy or the playfulness of a saturated cyan. It is the default brand color for actions, links, focus rings, selected navigation, and active tabs.

Accessibility note: this file records Ant Design's default visual tokens. Some brand-color pairs, especially white text on `#1677FF` and primary text on pale selected backgrounds, are below WCAG AA's 4.5:1 contrast threshold for small text. For strict accessibility targets, darken `colorPrimary` through `ConfigProvider` or use component-specific token overrides rather than inventing one-off colors.

Neutral text and overlays in the runtime token system are expressed as `rgba(0, 0, 0, α)` rather than flat grey hex values. The reason is overlay: when text sits above a tinted card or a colored cell highlight, an opaque grey breaks the tint, while a transparent black blends naturally. The four standard alpha steps are `0.88` (primary text, exported here as `#1F1F1F`), `0.65` (secondary text, `#595959`), `0.45` (tertiary / description text), and `0.25` (placeholder / disabled, `#BFBFBF`). The hex values listed in this document are the equivalent composited result on a white surface, suitable for static export targets that require hex; downstream consumers that support alpha should prefer the `rgba()` form from `@ant-design/cssinjs`.

The preset colors (`blue`, `purple`, `cyan`, `green`, `magenta`, `red`, `orange`, `yellow`, `volcano`, `geekblue`, `gold`, `lime`; `pink` is a deprecated alias of `magenta` in runtime tokens) are reserved for tags, charts, and categorical visualization — never for primary UI affordances. Use functional colors (`success`/`warning`/`error`/`info`) for status, and reserve `primary` for the single most important action on each screen.

## Typography

The base font size is **14 px**, not 16. Enterprise consoles trade legibility headroom for information density — a 1440 px-wide window has to comfortably fit a sidebar, a header, a data table with eight columns, and a detail pane. At 14 px, a row of body copy reaches the eye-saccade sweet spot of ~75 characters at the column widths these layouts demand.

The font stack prioritizes the OS UI font in order: Apple's `-apple-system`, then `BlinkMacSystemFont`, then Windows' `Segoe UI`, then Android/ChromeOS' `Roboto`, then `Helvetica Neue`, then `Arial`, with `Noto Sans` covering Linux. Emoji fallbacks are kept short. The code font uses `SFMono-Regular`, `Consolas`, `Liberation Mono`, `Menlo`, and `Courier` in the same order.

Only **two font weights** appear in product UI: 400 (body, controls, menu items, tab labels) and 600 (`fontWeightStrong` — headings, table headers, and any title-grade typography). Thin (100–300), bold (700+), and italics are not used in interface chrome — they fight the calm, certain tone the system targets. Italics are acceptable only inside long-form documentation prose. Visual emphasis on selected/active states comes from color and stroke (border, underline), not weight.

## Layout

All spacing snaps to a **4 px grid**. The six-step spacing scale (`unit`, `xs`, `sm`, `md`, `lg`, `xl` → 4 / 4 / 8 / 16 / 24 / 32 px) covers every gap, gutter, and inset in the system. Magic numbers — `padding: 11px`, `gap: 13px` — do not appear in token-driven code; the input field's 11 px horizontal padding exists only because the design pre-dates the 4 px grid and a one-pixel migration would shift millions of existing screens.

Surfaces use a **three-layer model**:

1. **`bg-layout`** (`#F5F5F5`) — the page background. It surrounds and contains everything else.
2. **`bg-container`** (`#FFFFFF`) — the surface for cards, panels, tables, and forms. This is where most content lives.
3. **`bg-elevated`** (`#FFFFFF`, same hex as `bg-container`) — the surface for modals, dropdowns, popovers. Distinguished from `bg-container` not by color but by shadow.

Never hard-code `#FFF` or `#FAFAFA` in product code. Read the token. The three-layer model is what lets a dark-mode algorithm flip the surface ladder without breaking layouts.

## Elevation & Depth

Ant Design is **flat-first**. Borders and tonal contrast carry hierarchy. Shadows appear only on surfaces that genuinely float above their context.

Shadow tokens are generated from `colorShadow`, so the same names adapt across light and dark themes. The core tiers are:

- **Tertiary** (`boxShadowTertiary`) — the light raised-surface shadow: `0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 6px -1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.03)`.
- **Popup** (`boxShadow` and `boxShadowSecondary`) — the standard floating-layer shadow: `0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)`.
- **Card** (`boxShadowCard`) — a card-specific raised shadow with tighter spread, used when cards need separation from the container.
- **Directional drawer and overflow shadows** (`boxShadowDrawer*`, `boxShadowTabsOverflow*`) — specialized tokens for edge-attached surfaces and scroll affordances.
- **Popover arrow** (`boxShadowPopoverArrow`) — used only for the small triangular pointer on tooltip and popover arrows.

Motion uses three durations and a small library of cubic-bezier easings, all exposed as tokens:

- `motionDurationFast` — 0.1 s, for state changes (hover, focus, press).
- `motionDurationMid` — 0.2 s, for component-internal transitions (collapse, fade).
- `motionDurationSlow` — 0.3 s, for surface-level changes (modal enter, drawer slide).

Easings are pre-defined: `motionEaseInOut`, `motionEaseOut`, `motionEaseIn`, `motionEaseOutBack`, `motionEaseOutCirc`, etc. Do not pick a `transition-timing-function` arbitrarily. If the design need does not match an existing easing, use `motionEaseInOut` and move on.

## Shapes

The default corner radius is **6 px**. It is round enough to read as modern and friendly, but small enough that a 32-pixel-tall button still presents a clean, almost-rectangular silhouette suitable for dense forms.

By component class:

- **Controls** (button, input, select, dropdown trigger) — 6 px (`rounded.DEFAULT`).
- **Surfaces** (card, modal, drawer, notification) — 8 px (`rounded.lg`).
- **Tags and small chips** — 4 px (`rounded.md`).
- **Tooltip and popover** — 4 px (`rounded.md`).

Full-pill (`rounded.full`, 9999 px) is reserved for circular avatars, badges, and dots — not for buttons or tags. Square (0 px) is reserved for tables and the inner edges of segmented controls. Mixing radii on adjacent elements is a smell: a card with 8 px corners should not contain a button with 16 px corners.

## Components

Component archetypes capture the system's most common surfaces and states. Each entry below maps to the token references in the YAML front-matter.

- **Button (primary)** — the single dominant action per screen. Solid `primary` fill, white text, 32 px tall, 6 px radius. Hover lightens the fill to `#4096FF`; active darkens to `#0958D9`. Do not stack two `primary` buttons in one decision.
- **Button (default)** — secondary actions. Transparent background on a white surface, dark text, 1 px outline border. Hover changes text color to `#4096FF`; the border tints to match.
- **Input field** — 32 px tall to match buttons. Subtle 1 px outline border; focus state thickens the border to `primary` and adds an inset glow. Placeholder text uses `on-surface-disabled`.
- **Select** — visually identical to Input. The trigger reads as an input until interacted with.
- **Card** — the workhorse container. White surface, 8 px radius, optional `boxShadowCard` elevation. Internal padding is 24 px on all sides; nested controls maintain 16 px gaps.
- **Modal** — same surface and radius as Card, but uses the secondary shadow tier and is centered on a `rgba(0, 0, 0, 0.45)` mask. Body padding is 20 px top/bottom × 24 px left/right.
- **Menu (selected item)** — `#E6F4FF` background, `primary` text. This is the single visual cue for "you are here" in navigation.
- **Tabs (active tab)** — `primary` text and a 2 px `primary` underline. Inactive tabs are `on-surface-variant`. No background fill on tabs at any state.
- **Table (header row)** — `surface-container` background, `title-md` typography (14 px / 600). Body rows alternate on hover only, not by default — the system trusts users to read dense data without zebra striping.
- **Tag** — small categorical label. 4 px radius, 12 px font, low-saturation pastel fills from the preset palette. Never use a tag for a critical state — use Alert or Badge.
- **Alert** — semantic feedback surface. Success, warning, error, and info alerts use pale semantic backgrounds with normal text color; the status is communicated by icon and tint, not by low-contrast colored body text.
- **Badge status dot** — compact status indicator. Critical status may use `error` fill, but the dot is not a substitute for text in accessibility-critical flows.
- **Tooltip** — high-contrast inverse surface: `rgba(0,0,0,0.85)` background, white text. Always positioned by the framework, never manually pinned.
- **Dropdown menu (item hover)** — `surface-container` fill on hover, no text-color change. The hover affordance is enough.

## Do's and Don'ts

- **Do** use the four design values as a tie-breaker. When two approaches conflict, the one that produces a more certain, more legible state for the user wins.
- **Don't** stack two `primary`-colored buttons on the same surface. Pick one. Demote the rest to `default`.
- **Do** read surfaces from `colors.surface`, `colors.surface-container`, and `colors.surface-layout`. They reflect the three-layer model.
- **Don't** hard-code `#FFFFFF` or `#FAFAFA`. The hex is incidental; the role is what matters.
- **Do** use `motionDurationMid` (0.2 s) for any component-level transition you cannot find a more specific token for.
- **Don't** invent custom `cubic-bezier` curves. Use the named easings.
- **Do** reserve the preset color palette (`blue` through `lime`) for tags, charts, and categorical visualization.
- **Don't** mint accent colors outside the preset palette for one-off UI surfaces. If a screen seems to need one, the design probably needs a different layout instead.
- **Do** snap every gap, inset, and gutter to the 4 px grid through the spacing scale.
- **Don't** use magic numbers in product code. If the scale lacks a step you need, the design needs revisiting, not a one-pixel override.

## Customization

Every value in the YAML front-matter above is a **default** produced by `defaultAlgorithm` — the light theme. Ant Design theming is broader than Design Token replacement: it includes algorithmic derivation, component-scoped overrides, dynamic switching, nested theme scopes, CSS variable output, static token consumption, and zero-runtime CSS extraction. See [Customize Theme](https://ant.design/docs/react/customize-theme.md) for the complete runtime API and examples.

The primary theme configuration entry is `ConfigProvider`'s `theme` prop:

1. **Seed token overrides.** Pass `theme.token` to `ConfigProvider` to replace any seed. The primary and semantic color seeds (`colorPrimary`, `colorSuccess`, `colorWarning`, `colorError`, `colorInfo`) expand into derived gradients, while `colorBgBase` and `colorTextBase` drive neutral surfaces and text. Spacing, radius, and font-size seeds work the same way.

2. **Algorithm switching.** Set `theme.algorithm` to swap the derivation logic. `defaultAlgorithm`, `darkAlgorithm`, and `compactAlgorithm` can be used alone or composed as an array — do not invert colors manually; the algorithms account for non-linear palette, surface, shadow, and size relationships.

3. **Component-level overrides.** `theme.components.Button` (or any component's token namespace) can override a single component's Component Token and consumed Alias Token without affecting others. In component config, `algorithm` can opt that component into token derivation when the override should still follow seed-token relationships.

4. **Runtime scope.** Themes can switch dynamically by changing `ConfigProvider.theme`, and nested `ConfigProvider` instances create local themes that inherit unchanged tokens from their parent. Static APIs such as `message.xxx`, `Modal.xxx`, and `notification.xxx` do not automatically receive the surrounding context; use hook-based APIs, `App`, or explicit context holders when themed static feedback is required.

5. **Token consumption and output.** Use `theme.useToken()` inside React and `theme.getDesignToken()` outside React to consume resolved tokens. Use `theme.cssVar` when CSS variables are needed, and `theme.zeroRuntime` with prebuilt or extracted CSS when runtime style generation must be disabled.

For custom theme generation, keep Ant Design's interaction structure, density, state feedback, and component semantics first. Then change the smallest necessary seed set: usually `colorPrimary`, status colors, `borderRadius`, `fontFamily`, `fontSize`, and neutral surface bases. Brand pages may look distinct, but forms, tables, navigation, overlays, focus states, and validation feedback should still feel like Ant Design. Avoid generating custom CSS rules that bypass tokens, algorithms, `theme.components`, CSS variables, or extracted static styles; if a theme cannot be expressed through those official layers, treat that as a design-system extension rather than a one-off page style.
