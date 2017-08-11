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
| noHovering | - | boolean  |  true  |

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

