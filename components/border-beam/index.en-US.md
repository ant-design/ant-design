---
category: Components
group: Other
title: BorderBeam
description: Decorative component that renders a moving beam along a container border.
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
<code src="./demo/customized-color.tsx">Gradients</code>
<code src="./demo/non-uniform-radius.tsx" debug>Non-uniform radius</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | Decorated content | `ReactNode` | - | 6.4.0 | × |
| color | Beam color configuration. Supports a single color string or gradient stops. `percent` uses the `0 ~ 100` input range and BorderBeam reserves tail space for the transparent fade | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |

## Design Token

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### How does BorderBeam behave when reduced motion is enabled? {#faq-reduced-motion}

`BorderBeam` treats the beam as a decorative effect. When `prefers-reduced-motion: reduce` is active, the beam effect is hidden.

### What does `percent` mean in `color`? {#faq-color-percent}

`percent` represents the authored stop position and accepts values from `0` to `100`. BorderBeam maps those stops into the visible beam segment and reserves the trailing area for transparent fade-out so the moving tail stays visible.

### Do I need to set `position` myself? {#faq-position}

In most cases you do not need to set `position` manually. If your layout depends on an explicit containing block, set the positioning style on the actual container root.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`BorderBeam` reads the computed `border-radius` from the actual container during initialization. This works best for a single-container child such as `Card`; for more complex child trees, set the radius on the actual container root for a more deterministic result. Later radius changes caused by size, ancestor styles, or internal child state are not guaranteed to resync automatically. The running beam may still apply internal motion smoothing.

For example:

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
