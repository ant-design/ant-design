---
category: Components
type: Navigation
title: Pagination
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/1vqv2bj68/Pagination.svg
---

A long list can be divided into several pages using `Pagination`, and only one page will be loaded at a time.

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## API

```jsx
<Pagination onChange={onChange} total={50} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| current | Current page number | number | - |  |
| defaultCurrent | Default initial page number | number | 1 |  |
| defaultPageSize | Default number of data items per page | number | 10 |  |
| disabled | Disable pagination | boolean | - |  |
| hideOnSinglePage | Whether to hide pager on single page | boolean | false |  |
| itemRender | To customize item's innerHTML | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |  |
| onChange | Called when the page number is changed, and it takes the resulting page number and pageSize as its arguments | function(page, pageSize) | - |  |
| onShowSizeChange | Called when `pageSize` is changed | function(current, size) | - |  |
| pageSize | Number of data items per page | number | - |  |
| pageSizeOptions | Specify the sizeChanger options | string\[] | \[`10`, `20`, `50`, `100`] |  |
| responsive | If `size` is not specified, `Pagination` would resize according to the width of the window | boolean | - |  |
| showLessItems | Show less page items | boolean | false |  |
| showQuickJumper | Determine whether you can jump to pages directly | boolean \| { goButton: ReactNode } | false |  |
| showSizeChanger | Determine whether to show `pageSize` select, it will be true when `total > 50` | boolean | - |  |
| showTitle | Show page item's title | boolean | true |  |
| showTotal | To display the total number and range | function(total, range) | - |  |
| simple | Whether to use simple mode | boolean | - |  |
| size | Specify the size of `Pagination`, can be set to `small` | `default` \| `small` | `default` |  |
| total | Total number of data items | number | 0 |  |
