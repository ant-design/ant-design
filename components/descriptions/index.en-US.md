---
category: Components
type: Data Display
title: Descriptions
cols: 1
---

Display multiple read-only fields in groups.

## When To Use

Commonly displayed on the details page.

## API

### Descriptions

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | The title of the description list, placed at the top | ReactNode | - |  |
| bordered | whether to display the border | boolean | false |  |
| column | the number of `DescriptionItems` in a row,could be a number or a object like `{ xs: 8, sm: 16, md: 24}`,(Only set `bordered={true}` to take effect) | number | 3 |  |
| size | set the size of the list. Can be set to `middle`,`small`, or not filled | `default` \| `middle` \| `small` | false |  |
| layout | Define description layout | `horizontal` \| `vertical` | `horizontal` |  |
| colon | change default props `colon` value of `Descriptions.Item` | boolean | true |  |

### DescriptionItem

| Property | Description                    | Type      | Default | Version |
| -------- | ------------------------------ | --------- | ------- | ------- |
| label    | description of the content     | ReactNode | -       |         |
| span     | The number of columns included | number    | 1       |         |

> The number of span Description.Item. Span={2} takes up the width of two DescriptionItems.
