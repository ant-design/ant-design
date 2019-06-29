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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| bordered | Toggles rendering of the border around the list | boolean | false | 3.0.0 |
| footer | List footer renderer | string\|ReactNode | - | 3.0.0 |
| grid | The grid type of list. You can set grid to something like {gutter: 16, column: 4} | object | - | 3.0.0 |
| header | List header renderer | string\|ReactNode | - | 3.0.0 |
| itemLayout | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | string | - | 3.0.0 |
| rowKey | Item's unique key, could be a string or function that returns a string | string\|Function(record):string | `key` | 3.12.0 |
| loading | Shows a loading indicator while the contents of the list are being fetched | boolean\|[object](https://ant.design/components/spin-cn/#API) ([more](https://github.com/ant-design/ant-design/issues/8659)) | false | 3.0.0 |
| loadMore | Shows a load more content | string\|ReactNode | - | 3.0.0 |
| locale | i18n text including empty text | object | emptyText: 'No Data' <br> | 3.4.2 |
| pagination | Pagination [config](https://ant.design/components/pagination/), hide it by setting it to false | boolean \| object | false | 3.0.0 |
| split | Toggles rendering of the split under the list item | boolean | true | 3.0.0 |
| dataSource | dataSource array for list | any[] | - | 3.20.1 |
| renderItem | customize list item when using `dataSource` | `item => ReactNode` | - | 3.20.1 |

### pagination

Properties for pagination.

| Property | Description                          | Type                        | Default  |
| -------- | ------------------------------------ | --------------------------- | -------- |
| position | specify the position of `Pagination` | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.6.0 |

More about pagination, please check [`Pagination`](/components/pagination/).

### List grid props

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| column | column of grid, [optional number](https://github.com/ant-design/ant-design/blob/a7f17b4cdebbca07b3b9ce5698de61e772d46237/components/list/index.tsx#L16) | number | - | 3.0.0 |
| gutter | spacing between grid | number | 0 | 3.0.0 |
| size | Size of list | `default` \| `middle` \| `small` | `default` | 3.0.0 |
| xs | `<576px` column of grid | number | - | 3.0.0 |
| sm | `≥576px` column of grid | number | - | 3.0.0 |
| md | `≥768px` column of grid | number | - | 3.0.0 |
| lg | `≥992px` column of grid | number | - | 3.0.0 |
| xl | `≥1200px` column of grid | number | - | 3.0.0 |
| xxl | `≥1600px` column of grid | number | - | 3.0.0 |

### List.Item

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| actions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right. | Array<ReactNode> | - | 3.0.0 |
| extra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right. | string\|ReactNode | - | 3.0.0 |

### List.Item.Meta

| Property    | Description                  | Type              | Default | Version Added |
| ----------- | ---------------------------- | ----------------- | ------- | ------------- |
| avatar      | The avatar of list item      | ReactNode         | -       | 3.0.0         |
| description | The description of list item | string\|ReactNode | -       | 3.0.0         |
| title       | The title of list item       | string\|ReactNode | -       | 3.0.0         |
