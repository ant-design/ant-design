---
category: Components
type: Data Entry
cols: 1
title: Transfer
---

Double column transfer choice box.

## When To Use

Transfer the elements between two columns in an intuitive and efficient way.

One or more elements can be selected from either column, one click on the proper 'direction' button, and the transfer is done. The left column is considered the 'source' and the right column is considered the 'target'. As you can see in the API description, these names are reflected in.

## API

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| dataSource | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in `targetKeys` prop. | [TransferItem](https://git.io/vMM64)[] | [] |
| render | The function to generate the item shown on a column. Based on an record (element of the dataSource array), this function should return a React element which is generated from that record. | Function(record) |     |
| targetKeys | A set of keys of elements that are listed on the right column. | string[] | [] |
| selectedKeys | A set of keys of selected items. | string[] | [] |
| onChange | A callback function that is executed when the transfer between columns is complete. | (targetKeys, direction, moveKeys): void | |
| onSelectChange | A callback function which is executed when selected items are changed. | (sourceSelectedKeys, targetSelectedKeys): void | |
| onScroll | A callback function which is executed when scroll options list | (direction, event): void | |
| listStyle | A custom CSS style used for rendering the transfer columns. | object |  |
| className | A custom CSS class. | string | ['', ''] |
| titles | A set of titles that are sorted from left to right. | string[] | - |
| operations | A set of operations that are sorted from top to bottom. | string[] | [] |
| showSearch | If included, a search box is shown on each column. | boolean | false |
| filterOption | A function to determine whether an item should show in search result list | (inputValue, option): boolean | |
| searchPlaceholder | The hint text of the search box. | string | 'Search here' |
| notFoundContent | Text to display when a column is empty. | string\|ReactNode | 'The list is empty'  |
| footer | A function used for rendering the footer. | (props): ReactNode |  |
| lazy | property of [react-lazy-load](https://github.com/loktar00/react-lazy-load) for lazy rendering items | object | `{ height: 32, offset: 32 }` |
| onSearchChange | A callback function which is executed when search field are changed | (direction: 'left'\|'right', event: Event): void | - |

## Warning

According the [standard](http://facebook.github.io/react/docs/lists-and-keys.html#keys) of React, the key should always be supplied directly to the elements in the array. In Transfer, the keys should be set on the elements included in `dataSource` array. By default, `key` property is used as an unique identifier.

If there's no `key` in your data, you should use `rowKey` to specify the key that will be used for uniquely identify each element.
```jsx
// eg. your primary key is `uid`
return <Transfer rowKey={record => record.uid} />;
```
