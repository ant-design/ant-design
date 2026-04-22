---
category: Components
group: Data Display
title: TextTooltip
description: Lightweight tooltip component for plain text scenarios.
demo:
  cols: 2
---

## When To Use

`TextTooltip` is designed for frequent, lightweight plain text hints.

Compared with `Tooltip`, it does not support complex content, auto flip, or popup container mounting, but it is lighter for text-only cases.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/colorful.tsx">Color</code>
<code src="./demo/trigger.tsx">Trigger</code>
<code src="./demo/perf.tsx">Performance</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | Tooltip text. Only plain string is supported | string | - | - |
| color | Set background color | string | - | - |
| arrow | Whether to show arrow | boolean | true | - |
| placement | Tooltip placement | `top` \| `left` \| `right` \| `bottom` \| `topLeft` \| `topRight` \| `bottomLeft` \| `bottomRight` \| `leftTop` \| `leftBottom` \| `rightTop` \| `rightBottom` | `top` | - |
| trigger | Trigger mode. Only `hover`, `focus`, or both are supported | `'hover' \| 'focus' \| Array<'hover' \| 'focus'>` | `hover` | - |
| defaultOpen | Whether to show by default | boolean | false | - |
| open | Controlled open state | boolean | - | 6.3.7 |
| mouseEnterDelay | Delay before showing on mouse enter, in seconds | number | 0.1 | - |
| mouseLeaveDelay | Delay before hiding on mouse leave, in seconds | number | 0.1 | - |
| onOpenChange | Callback when open state changes | `(open: boolean) => void` | - | 6.3.7 |
| zIndex | Tooltip z-index | number | 1070 | - |

## Notes

- `TextTooltip` only supports string `title`.
- It does not support full popup capabilities such as `align`, `autoAdjustOverflow`, or `getPopupContainer`.
- It throws when unsupported capabilities are used instead of silently falling back to `Tooltip`.

## Design Token

<ComponentTokenTable component="TextTooltip"></ComponentTokenTable>
