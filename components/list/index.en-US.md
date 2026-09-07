---
category: Components
group: Data Display
title: List
description: Basic list display, which can carry text, lists, pictures, paragraphs.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
tag: DEPRECATED
---

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

<!-- prettier-ignore -->
:::warning{title=Deprecated Notice}
List component has been deprecated. Will be removed in the next major version. Please use [Listy](/components/listy) instead. See [How do I migrate off List?](#faq-migrate-from-list).
:::

## Examples

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">Simple list</code>
<code src="./demo/basic.tsx">Basic list</code>
<code src="./demo/loadmore.tsx">Load more</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/pagination.tsx">Pagination Settings</code>
<code src="./demo/grid.tsx">Grid</code>
<code src="./demo/grid-test.tsx" debug>Test Grid</code>
<code src="./demo/responsive.tsx">Responsive grid list</code>
<code src="./demo/infinite-load.tsx">Scrolling loaded</code>
<code src="./demo/drag-sorting.tsx">Drag sorting</code>
<code src="./demo/drag-sorting-handler.tsx">Drag sorting with handler</code>
<code src="./demo/grid-drag-sorting.tsx">Grid Drag sorting</code>
<code src="./demo/grid-drag-sorting-handler.tsx">Grid Drag sorting with handler</code>
<code src="./demo/virtual-list.tsx">virtual list</code>
<code src="./demo/component-token.tsx" debug>custom component token</code>
<code src="./demo/spin-debug.tsx" debug>Spin loading debug</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### List

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| bordered | Toggles rendering of the border around the list | boolean | false |  | × |
| dataSource | DataSource array for list | any\[] | - |  | × |
| footer | List footer renderer | ReactNode | - |  | × |
| grid | The grid type of list. You can set grid to something like {gutter: 16, column: 4} | [object](#list-grid-props) | - |  | × |
| header | List header renderer | ReactNode | - |  | × |
| itemLayout | The layout of list | `horizontal` \| `vertical` | `horizontal` |  | × |
| loading | Shows a loading indicator while the contents of the list are being fetched | boolean \| [SpinProps](/components/spin/#api) ([more](https://github.com/ant-design/ant-design/issues/8659)) | false |  | × |
| loadMore | Shows a load more content | ReactNode | - |  | × |
| locale | The i18n text including empty text | object | {emptyText: `No Data`} |  | × |
| pagination | Pagination [config](/components/pagination/), hide it by setting it to false | boolean \| object | false |  | × |
| renderItem | Customize list item when using `dataSource` | (item: T, index: number) => ReactNode | - |  | × |
| rowKey | Item's unique value, could be an Item's key which holds a unique value of type `React.Key` or function that receives Item and returns a `React.Key` | `keyof` T \| (item: T) => `React.Key` | `"key"` |  | × |
| size | Size of list | `default` \| `large` \| `small` | `default` |  | × |
| split | Toggles rendering of the split under the list item | boolean | true |  | × |

### pagination

Properties for pagination.

| Property | Description                               | Type                         | Default  |
| -------- | ----------------------------------------- | ---------------------------- | -------- |
| position | The specify the position of `Pagination`  | `top` \| `bottom` \| `both`  | `bottom` |
| align    | The specify the alignment of `Pagination` | `start` \| `center` \| `end` | `end`    |

More about pagination, please check [`Pagination`](/components/pagination/).

### List grid props

| Property | Description              | Type   | Default | Version |
| -------- | ------------------------ | ------ | ------- | ------- |
| column   | The column of grid       | number | -       |         |
| gutter   | The spacing between grid | number | 0       |         |
| xs       | `<576px` column of grid  | number | -       |         |
| sm       | `≥576px` column of grid  | number | -       |         |
| md       | `≥768px` column of grid  | number | -       |         |
| lg       | `≥992px` column of grid  | number | -       |         |
| xl       | `≥1200px` column of grid | number | -       |         |
| xxl      | `≥1600px` column of grid | number | -       |         |
| xxxl     | `≥1920px` column of grid | number | -       | 6.3.0   |

### List.Item

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| actions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right | Array&lt;ReactNode> | - |  | × |
| classNames | Semantic structure className | [`Record<actions \| extra, string>`](#semantic-dom) | - | 5.18.0 | 5.18.0 |
| extra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right | ReactNode | - |  | × |
| styles | Semantic DOM style | [`Record<actions \| extra, CSSProperties>`](#semantic-dom) | - | 5.18.0 | 5.18.0 |

### List.Item.Meta

| Property    | Description                  | Type      | Default | Version |
| ----------- | ---------------------------- | --------- | ------- | ------- |
| avatar      | The avatar of list item      | ReactNode | -       |         |
| description | The description of list item | ReactNode | -       |         |
| title       | The title of list item       | ReactNode | -       |         |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="List"></ComponentTokenTable>

## FAQ {#faq}

### Is there a replacement for the deprecated List component? {#faq-listy-replacement}

Yes — please use [Listy](/components/listy), available since `antd@6.6.0`. It is the successor to List, with built-in capabilities such as virtual scrolling, sticky group headers and programmatic scrolling. It also supports flexible custom rendering, aiming to cover list needs across different scenarios.

### How do I migrate off List? {#faq-migrate-from-list}

Lists take different shapes in different scenarios, so it is hard to give a one-to-one migration guide. Thanks to the custom rendering capability of Listy, the preset structures in List can now be recomposed with plain JSX inside `itemRender`.

The mapping is as follows:

- **Data and rendering**: `dataSource` maps to `items`, `renderItem` maps to `itemRender`; `rowKey` keeps its meaning but is required in Listy and no longer defaults to the `key` field — pass `rowKey="key"` explicitly if you relied on the default. For large datasets, no third-party dependency is needed — turn on `virtual` with a `height` to get virtual scrolling.
- **Preset structures inside a row**: `List.Item`, `List.Item.Meta`, `actions`, `extra` can all be recomposed inside `itemRender`.
- **Structures outside the list**: put `header` and `footer` around Listy directly, wrap the list with [Spin](/components/spin) for `loading`, slice the data yourself and pass it to `items` together with [Pagination](/components/pagination) for `pagination`, and see the [infinite loading](/components/listy#listy-demo-infinite) demo for `loadMore`.
- **Styles**: adjust `bordered`, `split` and `size` through semantic DOM `classNames` / `styles` and Design Token; for `grid`, migrating to Listy is not recommended — use [Row / Col](/components/grid) with [Card](/components/card) to build the card layout instead.
