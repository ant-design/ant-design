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
<code src="./demo/component-token.tsx">Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | Wrapped content | `ReactNode` | - | 6.4.0 | × |
| classNames | Customize class names for each semantic structure. Supports object or function | `Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>` | - | 6.4.0 | 6.4.0 |
| color | Beam color configuration. Supports a single color string or gradient stops | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| styles | Customize inline styles for each semantic structure. Supports object or function | `Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>` | - | 6.4.0 | 6.4.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### How does BorderBeam behave when reduced motion is enabled? {#faq-reduced-motion}

`BorderBeam` treats the beam as a decorative effect. When `prefers-reduced-motion: reduce` is active, the beam effect is hidden.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`BorderBeam` will infer the beam track from the root radius provided through component styles, or from the computed radius on the first child.

If you want the content shape to align visually with the beam, configure the radius on the actual content element. The running beam may still apply internal motion smoothing.

For example:

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
