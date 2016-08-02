---
category: Components
type: Form Controls
cols: 1
title: Transfer
---

Double column transfer choice box.

## When To Use

Move the elements between two columns in an intuitive way to make a choice.

## API


| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| dataSource | to set data | Array | [] |
| render | the function to draw a record line| Function(record)  |     |
| targetKeys | a set of keys of the right box | Array  | [] |
| onChange | a callback function, can be executed when the choice is changing | Function(targetKeys, direction, moveKeys) |  |
| listStyle | custom style of the two transfer boxes | Object |  |
| className | custom class | String |  |
| titles | a set of titles that is sorted from left to right| Array | ['source list', 'target list'] |
| operations | a set of operations that is sorted form top to bottom | Array | [] |
| showSearch | to set if the search box can be shown | Boolean | false |
| searchPlaceholder | the default value of the search box | String | 'Please input the content' |
| notFoundContent | display the content when list is empty | React.node | 'The list is empty'  |
| footer | a function to render the footer | Function(props) |  |


## Warning

According the [standard](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children) of React, the key should always be supplied directly to the components in the array. In Transfer, the keys should be set for `dataSource`. `dataSource` use each record's `key` as the default unique flag. 

If there's no `key` in your data, you should use `rowKey` to specify the primary key.
```jsx
// eg. your primary key is `uid`
return <Transfer rowKey={record => record.uid} />;
```