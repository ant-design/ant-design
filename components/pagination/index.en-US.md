---
category: Components
type: Navigation
title: Pagination
---

A long list can be divided into several pages by `Pagination`, and only one page will be loaded at a time.

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by switching in the pages.

## API

```html
<Pagination onChange={onChange} total={50} />
```

Property | Description | Type | Default
-----|-----|-----|------
current | current page number | number | -
defaultCurrent | default current page number | number | 1
total | total number of data | number | 0
defaultPageSize | default number of data per page | number | 10
pageSize | number of data per page | number | -
onChange | a callback function, can be executed when the page number is changing, and it takes the resulting page number as an argument | Function(page) | noop
showSizeChanger | determine whether `pageSize` can be changed | boolean | false
pageSizeOptions | specify the sizeChanger selections | string[] | ['10', '20', '30', '40']
onShowSizeChange | a callback function, can be executed when `pageSize` is changing | Function(current, size) | noop
showQuickJumper | determine whether you can jump to a page directly | boolean | false
size | specify the size of `Pagination`, can be set to `small` | string | ""
simple | whether to use simple mode | object | -
showTotal | to display the total number and range | Function(total, range) | -
