---
category: Components
type: Data Entry
cols: 1
title: Transfer
---

Double column transfer choice box.

## When To Use

- It is a select control essentially which can be use for selecting multiple items.
- Transfer can display more information for items and take up more space.

Transfer the elements between two columns in an intuitive and efficient way.

One or more elements can be selected from either column, one click on the proper `direction` button, and the transfer is done. The left column is considered the `source` and the right column is considered the `target`. As you can see in the API description, these names are reflected in.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | A custom CSS class. | string | \['', ''] |  |
| dataSource | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in `targetKeys` prop. | [TransferItem](https://git.io/vMM64)\[] | \[] |  |
| disabled | Whether disabled transfer | boolean | false | 3.10.0 |
| filterOption | A function to determine whether an item should show in search result list | (inputValue, option): boolean |  |  |
| footer | A function used for rendering the footer. | (props): ReactNode |  |  |
| lazy | property of [react-lazy-load](https://github.com/loktar00/react-lazy-load) for lazy rendering items. Turn off it by set to `false`. | object\|boolean | `{ height: 32, offset: 32 }` |  |
| listStyle | A custom CSS style used for rendering the transfer columns. | object |  |  |
| locale | i18n text including filter, empty text, item unit, etc | { itemUnit: string; itemsUnit: string; searchPlaceholder: string; notFoundContent: ReactNode; } | `{ itemUnit: 'item', itemsUnit: 'items', notFoundContent: 'The list is empty', searchPlaceholder: 'Search here' }` | 3.9.0 |
| operations | A set of operations that are sorted from top to bottom. | string\[] | \['>', '<'] |  |
| operationStyle | A custom CSS style used for rendering the operations column. | object |  | 3.6.0 |
| render | The function to generate the item shown on a column. Based on an record (element of the dataSource array), this function should return a React element which is generated from that record. Also, it can return a plain object with `value` and `label`, `label` is a React element and `value` is for title | Function(record) |  |  |
| selectedKeys | A set of keys of selected items. | string\[] | \[] |  |
| showSearch | If included, a search box is shown on each column. | boolean | false |  |
| showSelectAll | Show select all checkbox on the header | boolean | true | 3.18.0 |
| style | A custom CSS style used for rendering wrapper element. | object |  | 3.6.0 |
| targetKeys | A set of keys of elements that are listed on the right column. | string\[] | \[] |  |
| titles | A set of titles that are sorted from left to right. | string\[] | - |  |
| onChange | A callback function that is executed when the transfer between columns is complete. | (targetKeys, direction, moveKeys): void |  |  |
| onScroll | A callback function which is executed when scroll options list | (direction, event): void |  |  |
| onSearch | A callback function which is executed when search field are changed | (direction: 'left'\|'right', value: string): void | - | 3.11.0 |
| onSelectChange | A callback function which is executed when selected items are changed. | (sourceSelectedKeys, targetSelectedKeys): void |  |  |

### Render Props

New in 3.18.0. Transfer accept `children` to customize render list, using follow props:

| Property        | Description             | Type                                | Version |
| --------------- | ----------------------- | ----------------------------------- | ------- |
| direction       | List render direction   | 'left' \| 'right'                   | 3.18.0  |
| disabled        | Disable list or not     | boolean                             | 3.18.0  |
| filteredItems   | Filtered items          | TransferItem[]                      | 3.18.0  |
| onItemSelect    | Select item             | (key: string, selected: boolean)    | 3.18.0  |
| onItemSelectAll | Select a group of items | (keys: string[], selected: boolean) | 3.18.0  |
| selectedKeys    | Selected items          | string[]                            | 3.18.0  |

#### example

```jsx
<Transfer {...props}>{listProps => <YourComponent {...listProps} />}</Transfer>
```

## Warning

According the [standard](http://facebook.github.io/react/docs/lists-and-keys.html#keys) of React, the key should always be supplied directly to the elements in the array. In Transfer, the keys should be set on the elements included in `dataSource` array. By default, `key` property is used as an unique identifier.

If there's no `key` in your data, you should use `rowKey` to specify the key that will be used for uniquely identify each element.

```jsx
// eg. your primary key is `uid`
return <Transfer rowKey={record => record.uid} />;
```

## FAQ

### How to support fetch and present data from a remote server in Transfer column.

In order to keep the page number synchronized, you can disable columns you checked without removing the option: <https://codesandbox.io/s/93xeb>
