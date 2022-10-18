---
category: Components
group: Layout
title: Space
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
demo:
  cols: 2
---

Set components spacing.

## When To Use

Avoid components clinging together and set a unified space.

## Examples

<code src="./demo/base.tsx">Basic Usage</code>
<code src="./demo/vertical.tsx">Vertical Space</code>
<code src="./demo/size.tsx">Space Size</code>
<code src="./demo/align.tsx">Align</code>
<code src="./demo/customize.tsx">Customize Size</code>
<code src="./demo/wrap.tsx">Wrap</code>
<code src="./demo/debug.tsx">Diverse Child</code>
<code src="./demo/gap-in-line.tsx">Flex gap style</code>
<code src="./demo/split.tsx">Split</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align items | `start` \| `end` \|`center` \|`baseline` | - | 4.2.0 |
| direction | The space direction | `vertical` \| `horizontal` | `horizontal` | 4.1.0 |
| size | The space size | [Size](#Size) \| [Size\[\]](#Size) | `small` | 4.1.0 \| Array: 4.9.0 |
| split | Set split | ReactNode | - | 4.7.0 |
| wrap | Auto wrap line, when `horizontal` effective | boolean | false | 4.9.0 |

### Size

`'small' | 'middle' | 'large' | number`
