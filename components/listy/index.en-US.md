---
category: Components
group: Data Display
title: Listy
description: A high-performance list that virtualizes long data sets and supports grouping.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When you need to render a long list without paying the cost of mounting every row — Listy virtualizes and only renders the rows in view.
- When the list needs grouped sections with sticky headers.
- When you need imperative control over scroll position (jump to an item, a group, or a pixel offset).

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| items | Data source of the list | `T[]` | `[]` | - |
| rowKey | Unique key of an item, a field name or a getter | `keyof T \| (item: T) => Key` | - | - |
| itemRender | Render a single row | `(item: T, index: number) => ReactNode` | - | - |
| height | Height of the scroll container; content scrolls when it overflows | number | - | - |
| virtual | Whether to enable virtual scrolling, rendering only rows in view | boolean | true | - |
| sticky | Whether group headers stick to the top | boolean | false | - |
| group | Grouping config, see [Group](#group) below | `Group<T, K>` | - | - |
| onScroll | Native scroll event handler | `React.UIEventHandler<HTMLElement>` | - | - |
| classNames | Semantic class names | `{ root?, item?, groupHeader? }` | - | - |
| styles | Semantic inline styles | `{ root?, item?, groupHeader? }` | - | - |

### Group

| Property | Description | Type |
| --- | --- | --- |
| key | Extract the group key from an item | `(item: T) => K` |
| title | Render the group header; receives the group key and its items | `(groupKey: K, items: T[]) => ReactNode` |

### Ref

| Name     | Description                               | Type                                |
| -------- | ----------------------------------------- | ----------------------------------- |
| scrollTo | Scroll to a position, an item, or a group | `(config?: ScrollToConfig) => void` |

`ScrollToConfig` is one of:

| Shape                           | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| number                          | Scroll to a pixel offset (scrollTop)            |
| `{ top?, left? }`               | Scroll to an absolute pixel position            |
| `{ key, align?, offset? }`      | Scroll to the item whose `rowKey` matches `key` |
| `{ groupKey, align?, offset? }` | Scroll to a group header                        |

`align` is `'top' \| 'bottom' \| 'auto'`; `offset` is an extra pixel offset applied after alignment.

## Design Token

<ComponentTokenTable component="Listy"></ComponentTokenTable>
