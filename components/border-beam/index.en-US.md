---
category: Components
group: Other
title: BorderBeam
description: Decorative wrapper that renders a moving beam along a container border.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wr1ISY50SyYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*duAQQbjHlHQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 6.4.0
---

## When To Use

- Use when a container needs stronger visual emphasis without introducing business state semantics.
- Suitable for login panels, recommendation cards, AI modules, and key CTA blocks.
- As a decorative effect, it should not replace focus rings, validation borders, or status feedback.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/customized-color.tsx">Customized color</code>
<code src="./demo/radius.tsx">Rounded container</code>
<code src="./demo/non-uniform-radius.tsx">Non-uniform radius</code>
<code src="./demo/controlled.tsx">Controlled state</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| borderWidth | Width of the beam ring. | `number` | `1` | 6.4.0 | × |
| children | Wrapped content. | `ReactNode` | - | 6.4.0 | × |
| classNames | Customize class names for each semantic structure. Supports object or function. | `Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>` | - | 6.4.0 | 6.4.0 |
| color | Shortcut for using a single beam color. When set, it is used for both `colorFrom` and `colorTo`. | `string` | - | 6.4.0 | × |
| colorFrom | Beam start color. | `string` | `#1677ff` | 6.4.0 | × |
| colorTo | Beam end color. | `string` | `#4096ff` | 6.4.0 | × |
| delay | Animation delay in seconds. | `number` | `0` | 6.4.0 | × |
| disabled | Whether to disable the beam effect. | `boolean` | `false` | 6.4.0 | × |
| duration | Animation duration in seconds. | `number` | `6` | 6.4.0 | × |
| offset | Initial beam offset in percentage. | `number` | `0` | 6.4.0 | × |
| pathRadius | Beam track radius. Does not change the wrapped content radius. | `React.CSSProperties['borderRadius']` | - | 6.4.0 | × |
| paused | Whether to pause the animation. | `boolean` | `false` | 6.4.0 | × |
| reverse | Whether to reverse the beam direction. | `boolean` | `false` | 6.4.0 | × |
| size | Beam size in pixels. | `number` | `60` | 6.4.0 | × |
| styles | Customize inline styles for each semantic structure. Supports object or function. | `Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>` | - | 6.4.0 | 6.4.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### How does BorderBeam behave when reduced motion is enabled? {#faq-reduced-motion}

`BorderBeam` treats the beam as a decorative effect. When `prefers-reduced-motion: reduce` is active, the beam effect is hidden.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`pathRadius` only controls the beam track radius. `BorderBeam` does not write that radius back to the wrapped content.

If `pathRadius` is omitted, `BorderBeam` will try to read and follow the first child's computed `borderRadius` as a fallback. For stable cross-component usage, prefer passing `pathRadius` explicitly. When you already manage the track through root styles, `style.borderRadius` and `styles.root.borderRadius` are also treated as track configuration.

If you want the content shape to align visually with the beam, configure the content radius separately:

```tsx
const radius = 24;

<BorderBeam pathRadius={radius}>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
