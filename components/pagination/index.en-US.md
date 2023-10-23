---
category: Components
group: Navigation
title: Pagination
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8y_iTJGY_aUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WM86SrBC8TsAAAAAAAAAAAAADrJ8AQ/original
---

A long list can be divided into several pages using `Pagination`, and only one page will be loaded at a time.

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/more.tsx">More</code>
<code src="./demo/changer.tsx">Changer</code>
<code src="./demo/jump.tsx">Jumper</code>
<code src="./demo/mini.tsx">Mini size</code>
<code src="./demo/simple.tsx">Simple mode</code>
<code src="./demo/controlled.tsx">Controlled</code>
<code src="./demo/total.tsx">Total number</code>
<code src="./demo/all.tsx">Show All</code>
<code src="./demo/itemRender.tsx">Prev and next</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

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
| pageSize | Number of data items per page | number | - |  |
| pageSizeOptions | Specify the sizeChanger options | string\[] \| number\[] | \[`10`, `20`, `50`, `100`] |  |
| responsive | If `size` is not specified, `Pagination` would resize according to the width of the window | boolean | - |  |
| showLessItems | Show less page items | boolean | false |  |
| showQuickJumper | Determine whether you can jump to pages directly | boolean \| { goButton: ReactNode } | false |  |
| showSizeChanger | Determine whether to show `pageSize` select, it will be true when `total > 50` | boolean | - |  |
| showTitle | Show page item's title | boolean | true |  |
| showTotal | To display the total number and range | function(total, range) | - |  |
| simple | Whether to use simple mode | boolean | - |  |
| size | Specify the size of `Pagination`, can be set to `small` | `default` \| `small` | `default` |  |
| total | Total number of data items | number | 0 |  |
| onChange | Called when the page number or `pageSize` is changed, and it takes the resulting page number and pageSize as its arguments | function(page, pageSize) | - |  |
| onShowSizeChange | Called when `pageSize` is changed | function(current, size) | - |  |

## Design Token

<ComponentTokenTable component="Pagination"></ComponentTokenTable>
