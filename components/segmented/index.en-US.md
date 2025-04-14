---
category: Components
group: Data Display
title: Segmented
description: Display multiple options and allow users to select a single option.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-9tSSoO_MkIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

This component is available since `antd@4.20.0`.

## When To Use

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/vertical.tsx" version="5.21.0">Vertical Direction</code>
<code src="./demo/block.tsx">Block Segmented</code>
<code src="./demo/shape.tsx" version="5.24.0">Round shape</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/controlled.tsx">Controlled mode</code>
<code src="./demo/custom.tsx">Custom Render</code>
<code src="./demo/dynamic.tsx">Dynamic</code>
<code src="./demo/size.tsx">Three sizes of Segmented</code>
<code src="./demo/with-icon.tsx">With Icon</code>
<code src="./demo/icon-only.tsx">With Icon only</code>
<code src="./demo/with-name.tsx" version="5.23.0">With name</code>
<code src="./demo/controlled-two.tsx" debug>Controlled Synced mode</code>
<code src="./demo/size-consistent.tsx" debug>Consistent height</code>
<code src="./demo/componentToken.tsx" debug>Custom component token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@4.20.0`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false |  |
| defaultValue | Default selected value | string \| number |  |  |
| disabled | Disable all segments | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | function(value: string \| number) |  |  |
| options | Set children optional | string\[] \| number\[] \| SegmentedItemType\[] | [] |  |
| size | The size of the Segmented. | `large` \| `middle` \| `small` | `middle` |  |
| vertical | Orientation | boolean | `false` | 5.21.0 |
| value | Currently selected value | string \| number |  |  |
| shape | shape of Segmented | `default` \| `round` | `default` | 5.24.0 |
| name | The `name` property of all `input[type="radio"]` children. if not set, it will fallback to a randomly generated name | string |  | 5.23.0 |

### SegmentedItemType

| Property  | Description                      | Type             | Default | Version |
| --------- | -------------------------------- | ---------------- | ------- | ------- |
| label     | Display text for Segmented item  | ReactNode        | -       |         |
| value     | Value for Segmented item         | string \| number | -       |         |
| icon      | Display icon for Segmented item  | ReactNode        | -       |         |
| disabled  | Disabled state of segmented item | boolean          | false   |         |
| className | The additional css class         | string           | -       |         |

## Design Token

<ComponentTokenTable component="Segmented"></ComponentTokenTable>
