---
category: Components
group: Other
title: BorderBeam
description: Decorative component that renders a moving beam along a container border.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
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
<code src="./demo/hover.tsx">Show on hover</code>
<code src="./demo/custom-container.tsx">Custom container</code>
<code src="./demo/customized-color.tsx">Gradients</code>
<code src="./demo/duration.tsx" version="6.5.0">Duration</code>
<code src="./demo/size.tsx" version="6.5.0">Size</code>
<code src="./demo/line-width.tsx" version="6.5.0">Line width</code>
<code src="./demo/non-uniform-radius.tsx" debug>Non-uniform radius</code>
<code src="./demo/component-token.tsx" debug>Component token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | Decorated content | `ReactNode` | - | 6.4.0 | × |
| color | Beam color configuration. Supports a single color string or gradient stops. `percent` uses the `0 ~ 100` input range and BorderBeam reserves tail space for the transparent fade | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| duration | Time in seconds for the beam to complete one loop | number | 6 | 6.5.0 | × |
| lineWidth | Width of the beam line. Numbers are treated as pixels | `number \| string` | `1px` | 6.5.0 | × |
| outset | Outset distance of the beam layer from the container edge. Set to `0` for clipped containers | `number \| string` | - | 6.4.0 | × |
| size | Size of the visible beam segment. Numbers are treated as pixels | `number \| string` | 100 | 6.5.0 | × |

## Design Token

<ComponentTokenTable component="BorderBeam"></ComponentTokenTable>

## FAQ

### How does BorderBeam behave when reduced motion is enabled? {#faq-reduced-motion}

`BorderBeam` treats the beam as a decorative effect. When `prefers-reduced-motion: reduce` is active, the beam effect is hidden.

### What does `percent` mean in `color`? {#faq-color-percent}

`percent` represents the authored stop position and accepts values from `0` to `100`. BorderBeam maps those stops into the visible beam segment and reserves the trailing area for transparent fade-out so the moving tail stays visible.

### Why is `BorderBeam` not working? {#faq-not-working}

`BorderBeam` needs to resolve the actual DOM node from `children` and insert the beam layer into that node. Make sure the wrapped content is a native DOM element, or a React component that correctly forwards its `ref` to a DOM element. Otherwise BorderBeam cannot locate the real container and the beam cannot be rendered.

The beam layer is positioned with `position: absolute`, so the resolved DOM node also needs to provide a positioning context. In most cases, set `position: relative` on the wrapped element. BorderBeam does not inspect or patch the child positioning style for you.

For performance reasons, whether `children` can host the beam and its positioning information are resolved during initialization, and are not continuously updated when the child structure or positioning styles change later.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`BorderBeam` renders the beam layer as a child of the actual container and directly inherits its radius through `border-radius: inherit`. For a single-container child such as `Card`, the beam automatically follows the container radius. For more complex child trees, make sure the radius is set on the actual container root.

The radius stays in sync through CSS inheritance, without being read or measured during initialization. Later changes made through `className`, responsive styles, or CSS variables are automatically reflected by the beam layer.
