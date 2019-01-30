---
category: Components
type: Data Display
title: Description List
cols: 1
---

Empty state placeholder.

## When To Use

When there is no data provided, display for friendly tips.

## API

### DescriptionList

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | Describe the title of the list, displayed at the top | ReactNode | - |
| border | whether to display the border | boolean  | false |
| column | the number of `DescriptionItems` in a row | number  | 3 |
| size | set the size of the list. Can be set to `middle` and `small`, or not filled | `default | middle | small` | false |

### DescriptionItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | description of the content | boolean  | false |
| span  | The number of columns included | number  | 1 |