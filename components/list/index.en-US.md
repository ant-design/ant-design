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
| loadMore    | -| string\|ReactNode   |  -  |
| pagination | - | boolean \| object   |  false  |
| grid | - | object   |  -  |

### List grid props
| Property     | Description           | Type     | Default       |
---------|-------------|------|---------
| gutter | - | number | 0 |
| column | - | number | - |
| xs | `<768px` - | number   |  -  |
| sm | `≥768px` - | number   |  -  |
| md | `≥992px` - | number   |  -  |
| lg | `≥1200px` - | number   |  -  |
| xl | `≥1600px` - | number   |  -  |

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
