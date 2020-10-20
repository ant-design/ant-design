---
category: Components
type: Data Display
title: Descriptions
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/MjtG9_FOI/Descriptions.svg
---

Display multiple read-only fields in groups.

## When To Use

Commonly displayed on the details page.

## API

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to display the border | boolean | false |  |
| colon | Change default props `colon` value of Descriptions.Item | boolean | true |  |
| column | The number of `DescriptionItems` in a row,could be a number or a object like `{ xs: 8, sm: 16, md: 24}`,(Only set `bordered={true}` to take effect) | number | 3 |  |
| extra | The action area of the description list, placed at the top-right | ReactNode | - | 4.5.0 |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| size | Set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | - |  |
| title | The title of the description list, placed at the top | ReactNode | - |  |

### DescriptionItem

| Property | Description                    | Type      | Default | Version |
| -------- | ------------------------------ | --------- | ------- | ------- |
| label    | The description of the content | ReactNode | -       |         |
| span     | The number of columns included | number    | 1       |         |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems.
