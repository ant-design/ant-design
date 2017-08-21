---
category: Components
type: Data Display
title: List 
cols: 1
---

Simple List.

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

## API

### List

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| bordered | - | string \| boolean   |  false  |
| loading | -| boolean   |  false  |
| itemLayout | - | string |  -  |
| showLoadMore    | -| boolean   |  false  |
| loadingMore  | - | boolean   |  false  |
| onMoreClick    | -| function   | - |
| pagination | - | boolean \| object   |  false  |
| grid | - | object   |  -  |
| xs | `<768px` - | object   |  -  |
| sm | `≥768px` - | object   |  -  |
| md | `≥992px` - | object   |  -  |
| lg | `≥1200px` - | object   |  -  |
| xl | `≥1600px` - | object   |  -  |

### List grid props
| Property     | Description           | Type     | Default       |
---------|-------------|------|---------
| gutter | - | number | 0 |
| column | - | number | - |

### List.Item

| Property     | Description           | Type     | Default       |
---------|-------------|------|---------
| extra | - | string\|ReactNode |  -  |
| actions | - | Array<ReactNode> |  -  |

### List.Item.Meta

| Property     | Description           | Type     | Default       |
---------|-------------|------|---------
| avatar | - | ReactNode |  -  |
| title | - | string\|ReactNode |  -  |
| description | - | string\|ReactNode |  -  |

