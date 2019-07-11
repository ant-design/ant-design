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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Toggles rendering of the border around the list | boolean | false |  |
| footer | List footer renderer | string\|ReactNode | - |  |
| grid | The grid type of list. You can set grid to something like {gutter: 16, column: 4} | object | - |  |
| header | List header renderer | string\|ReactNode | - |  |
| itemLayout | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | string | - |  |
| rowKey | Item's unique key, could be a string or function that returns a string | string\|Function(record):string | `key` | 3.12.0 |
| loading | Shows a loading indicator while the contents of the list are being fetched | boolean\|[object](https://ant.design/components/spin-cn/#API) ([more](https://github.com/ant-design/ant-design/issues/8659)) | false |  |
| loadMore | Shows a load more content | string\|ReactNode | - |  |
| locale | i18n text including empty text | object | emptyText: 'No Data' <br> | 3.4.2 |
| pagination | Pagination [config](https://ant.design/components/pagination/), hide it by setting it to false | boolean \| object | false |  |
| split | Toggles rendering of the split under the list item | boolean | true |  |
| dataSource | dataSource array for list | any[] | - | 3.20.1 |
| renderItem | customize list item when using `dataSource` | `item => ReactNode` | - | 3.20.1 |

### pagination

Properties for pagination.

| Property | Description                          | Type                        | Default  |
| -------- | ------------------------------------ | --------------------------- | -------- |
| position | specify the position of `Pagination` | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.6.0 |

More about pagination, please check [`Pagination`](/components/pagination/).

### List grid props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| column | column of grid, [optional number](https://github.com/ant-design/ant-design/blob/a7f17b4cdebbca07b3b9ce5698de61e772d46237/components/list/index.tsx#L16) | number | - |  |
| gutter | spacing between grid | number | 0 |  |
| size | Size of list | `default` \| `middle` \| `small` | `default` |  |
| xs | `<576px` column of grid | number | - |  |
| sm | `≥576px` column of grid | number | - |  |
| md | `≥768px` column of grid | number | - |  |
| lg | `≥992px` column of grid | number | - |  |
| xl | `≥1200px` column of grid | number | - |  |
| xxl | `≥1600px` column of grid | number | - |  |

### List.Item

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right. | Array<ReactNode> | - |  |
| extra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right. | string\|ReactNode | - |  |

### List.Item.Meta

| Property    | Description                  | Type              | Default | Version |
| ----------- | ---------------------------- | ----------------- | ------- | ------- |
| avatar      | The avatar of list item      | ReactNode         | -       |         |
| description | The description of list item | string\|ReactNode | -       |         |
| title       | The title of list item       | string\|ReactNode | -       |         |
