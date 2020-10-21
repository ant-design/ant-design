---
category: Components
subtitle: 穿梭框
type: 数据录入
cols: 1
title: Transfer
cover: https://gw.alipayobjects.com/zos/alicdn/QAXskNI4G/Transfer.svg
---

双栏穿梭选择框。

## 何时使用

- 需要在多个可选项中进行多选时。
- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。

选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。其中，左边一栏为 `source`，右边一栏为 `target`，API 的设计也反映了这两个概念。

## API

### Transfer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外 | [TransferItem](https://git.io/vMM64)\[] | \[] |  |
| disabled | 是否禁用 | boolean | false |  |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | (inputValue, option): boolean | - |  |
| footer | 底部渲染函数 | (props) => ReactNode | - |  |
| listStyle | 两个穿梭框的自定义样式 | object\|({direction: `left` \| `right`}) => object | - |  |
| locale | 各种语言 | { itemUnit: string; itemsUnit: string; searchPlaceholder: string; notFoundContent: ReactNode; } | { itemUnit: `项`, itemsUnit: `项`, searchPlaceholder: `请输入搜索内容` } |  |
| oneWay | 展示为单向样式 | boolean | false | 4.3.0 |
| operations | 操作文案集合，顺序从上至下 | string\[] | \[`>`, `<`] |  |
| pagination | 使用分页样式，自定义渲染列表下无效 | boolean \| { pageSize: number } | false | 4.3.0 |
| render | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 `label` 字段为 ReactElement，`value` 字段为 title | (record) => ReactNode | - |  |
| selectAllLabels | 自定义顶部多选框标题的集合 | (ReactNode \| (info: { selectedCount: number, totalCount: number }) => ReactNode)\[] | - |  |
| selectedKeys | 设置哪些项应该被选中 | string\[] | \[] |  |
| showSearch | 是否显示搜索框 | boolean | false |  |
| showSelectAll | 是否展示全选勾选框 | boolean | true |  |
| targetKeys | 显示在右侧框数据的 key 集合 | string\[] | \[] |  |
| titles | 标题集合，顺序从左至右 | ReactNode\[] | - |  |
| onChange | 选项在两栏之间转移时的回调函数 | (targetKeys, direction, moveKeys): void | - |  |
| onScroll | 选项列表滚动时的回调函数 | (direction, event): void | - |  |
| onSearch | 搜索框内容时改变时的回调函数 | (direction: `left` \| `right`, value: string): void | - |  |
| onSelectChange | 选中项发生改变时的回调函数 | (sourceSelectedKeys, targetSelectedKeys): void | - |  |

### Render Props

Transfer 支持接收 `children` 自定义渲染列表，并返回以下参数：

| 参数 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| direction | 渲染列表的方向 | `left` \| `right` |  |
| disabled | 是否禁用列表 | boolean |  |
| filteredItems | 过滤后的数据 | TransferItem\[] |  |
| selectedKeys | 选中的条目 | string\[] |  |
| onItemSelect | 勾选条目 | (key: string, selected: boolean) |  |
| onItemSelectAll | 勾选一组条目 | (keys: string\[], selected: boolean) |  |

#### 参考示例

```jsx
<Transfer {...props}>{listProps => <YourComponent {...listProps} />}</Transfer>
```

## 注意

按照 React 的[规范](http://facebook.github.io/react/docs/lists-and-keys.html#keys)，所有的组件数组必须绑定 key。在 Transfer 中，`dataSource`里的数据值需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。

```jsx
// 比如你的数据主键是 uid
return <Transfer rowKey={record => record.uid} />;
```

## FAQ

### 怎样让 Transfer 穿梭框列表支持异步数据加载

为了保持页码同步，在勾选时可以不移除选项而以禁用代替：<https://codesandbox.io/s/93xeb>
