---
category: Components
type: Form Controls
cols: 1
title: Transfer
---

Double column transfer choice box. One or more elements can be selected from either column, one click on the proper 'direction' button, and the transfer is done.

The left column is considered the 'source' and the right column is considered the 'target'. As you can see in the API description, these names are reflected in.

## When To Use

To transfer the elements between two columns in an intuitive and efficient way.

## API


| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| dataSource | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in `targetKeys` prop. | Array | [] |
| render | The function to generate the item shown on a column. Based on an record (element of the dataSource array), this function should return a React element which is generated from that record. | Function(record) |     |
| targetKeys | A set of keys of elements that are listed on the right column. | Array | [] |
| onChange | A callback function that is executed when the transfer between columns is complete. | Function(targetKeys, direction, moveKeys) |  |
| listStyle | A custom CSS style used for rendering the transfer columns. | Object |  |
| className | A custom CSS class. | String |  |
| titles | A set of titles that are sorted from left to right. | Array | ['源列表', '目的列表'] |
| operations | A set of operations that are sorted form top to bottom. | Array | [] |
| showSearch | If included, a search box is shown on each column. | Boolean | false |
| searchPlaceholder | The hint text of the search box. | String | 'Please input the content' |
| notFoundContent | Text to display when a column is empty. | React.node | 'The list is empty'  |
| footer | A function used for rendering the footer. | Function(props) |  |


## Warning

According the [standard](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children) of React, the key should always be supplied directly to the elements in the array. In Transfer, the keys should be set on the elements included in `dataSource` array. By default, `key` property is used as an unique identifier. 

If there's no `key` in your data, you should use `rowKey` to specify the key that will be used for uniquely identify each element.
```jsx
// eg. your primary key is `uid`
return <Transfer rowKey={record => record.uid} />;
```
