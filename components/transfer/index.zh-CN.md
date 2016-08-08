---
category: Components
chinese: 穿梭框
type: Form Controls
cols: 1
english: Transfer
---

双栏穿梭选择框。选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。

其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反应了这两个概念。

## 何时使用

用直观的方式在两栏中移动元素，完成选择行为。

## API


| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。 | Array | [] |
| render | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 React element | Function(record)  |     |
| targetKeys | 显示在右侧框数据的key集合 | Array  | [] |
| onChange | 选项在两栏之间转移时的回调函数 | Function(targetKeys, direction, moveKeys) |  |
| listStyle | 两个穿梭框的自定义样式 | Object |  |
| className | 自定义类 | String |  |
| titles | 标题集合,顺序从左至右 | Array | ['源列表', '目的列表'] |
| operations | 操作文案集合,顺序从上至下 | Array | [] |
| showSearch | 是否显示搜索框 | Boolean | false |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。| Function(inputValue, option) | |
| searchPlaceholder | 搜索框的默认值 | String | '请输入搜索内容' |
| notFoundContent | 当列表为空时显示的内容 | React.node | '列表为空'  |
| footer | 底部渲染函数 | Function(props) |  |


## 注意

按照 React 的[规范](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)，所有的组件数组必须绑定 key。在 Transfer 中，`dataSource`里的数据值需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。
```jsx
// 比如你的数据主键是 uid
return <Transfer rowKey={record => record.uid} />;
```
