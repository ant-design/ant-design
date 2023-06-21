---
category: Components
group: Layout
title: Space
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZiJ3SbOH9SUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*37T2R6O9oi0AAAAAAAAAAAAADrJ8AQ/original
---

Set components spacing.

## When To Use

- Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `antd@4.24.0` Supported).

## Examples

<!-- prettier-ignore -->
<code src="./demo/base.tsx">Basic Usage</code>
<code src="./demo/vertical.tsx">Vertical Space</code>
<code src="./demo/size.tsx">Space Size</code>
<code src="./demo/align.tsx">Align</code>
<code src="./demo/customize.tsx">Customize Size</code>
<code src="./demo/wrap.tsx">Wrap</code>
<code src="./demo/split.tsx">Split</code>
<code src="./demo/compact.tsx">Compact Mode for form component</code>
<code src="./demo/compact-buttons.tsx">Button Compact Mode</code>
<code src="./demo/compact-button-vertical.tsx">Vertical Compact Mode</code>
<code src="./demo/compact-debug.tsx" debug>Input addon debug</code>
<code src="./demo/compact-nested.tsx" debug>Nested Space Compact</code>
<code src="./demo/debug.tsx" debug>Diverse Child</code>
<code src="./demo/gap-in-line.tsx" debug>Flex gap style</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align items | `start` \| `end` \|`center` \|`baseline` | - | 4.2.0 |
| direction | The space direction | `vertical` \| `horizontal` | `horizontal` | 4.1.0 |
| size | The space size | [Size](#size) \| [Size\[\]](#size) | `small` | 4.1.0 \| Array: 4.9.0 |
| split | Set split | ReactNode | - | 4.7.0 |
| wrap | Auto wrap line, when `horizontal` effective | boolean | false | 4.9.0 |

### Size

`'small' | 'middle' | 'large' | number`

### Space.Compact

Use Space.Compact when child form components are compactly connected and the border is collapsed. The supported components are：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- Select
- TimePicker
- TreeSelect

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false | 4.24.0 |
| direction | Set direction of layout | `vertical` \| `horizontal` | `horizontal` | 4.24.0 |
| size | Set child component size | `large` \| `middle` \| `small` | `middle` | 4.24.0 |

### `styles` and `classNames` attribute

<!-- prettier-ignore -->
| Property | Description | Version |
| -------- | ------------------------- | ------- |
| item     | set `Space` child element | 5.6.0   |

## Design Token

<ComponentTokenTable component="Space"></ComponentTokenTable>
