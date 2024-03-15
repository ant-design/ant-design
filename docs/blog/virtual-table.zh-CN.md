---
title: 虚拟表格来了！
date: 2023-08-29
author: zombieJ
---

## 前言

在 v4 时期，我们为 Table 添加了一个自定义 `components` 的示例，通过 `components.body` 替换默认的 `<tbody>`，实现虚拟滚动的效果。但是很多开发者反馈 Demo 中的虚拟表格有很多功能无法实现。例如 固定列、合并行列、展开行 等等。

所以在 v5 中，我们提出了 [[RFC] StaticTable for fast perf & virtual scroll support](https://github.com/ant-design/ant-design/discussions/41500)。该 RFC 期望提供一个高性能的 Table.StaticTable，它会默认支持虚拟滚动。但是随着开发进行，我们最终决定 StaticTable 在底层 `rc-table` 上实现，而在 antd 侧则只需要通过 `<Table virtual />` 即可开启。

## 太长不看

Table 通过 `virtual` 属性即可开启虚拟滚动能力。同时，原 Table 的功能都能正常使用：

```tsx
<Table virtual scroll={{ x: 2000, y: 500 }} {...otherProps} />
```

### 固定列

![Fixed Columns](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*V2FcS7ZAReMAAAAAAAAAAAAADrJ8AQ/original)

### 可展开

![Expandable](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*nd61R4YsknsAAAAAAAAAAAAADrJ8AQ/original)

### 行列组合

![Rowspan & Colspan](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DYkYQo8tU6sAAAAAAAAAAAAADrJ8AQ/original)

你可以直接访问 [虚拟列表](/components/table#components-table-demo-virtual-list) 示例进行体验。

## 一些细节

antd 的 Table 底层使用了 `rc-table` 组件，我们的虚拟滚动功能也是复用了上文提到的 `components` 属性。将中间的 `<tbody>` 替换为 `rc-virtual-list`，该组件广泛应用于 antd 的各个虚拟滚动场景中。例如 Select、Tree 都可以见到它的身影。而 `rc-virtual-list` 本身并不支持横向滚动能力，因而我们在这次改造中，也为其添加了横向滚动的支持。

### 固定列

在 v4 时期，我们便将 Table 的固定列改造成了 `position: sticky` 实现。该 CSS 允许你在滚动时，将元素固定在某个位置。从而避免 v3 时期需要额外渲染一份 Table 用于实现固定位置的效果：

<img alt="Sticky" height="279" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WNoMQKQwX-YAAAAAAAAAAAAADrJ8AQ/original" />

对于叠加固定，只需要配置不同的偏移量即可：

<img alt="Stack Sticky" height="279" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HSW-S40yR_wAAAAAAAAAAAAADrJ8AQ/original" />

在虚拟滚动中，我们同样可以利用该特性。直接复用 `sticky` 样式，即可实现固定列的效果。而 `rc-virtual-list` 需要付出的仅仅是提供横向滚动，而不需要关心固定列的实现。

### 可展开

在 `rc-table` 中，我们会将 `dataSource` 通过 `useFlattenRecords` 将树状结构打平，从而支持开发者自定义的虚拟滚动能力。感谢 [@crawler-django](https://github.com/react-component/table/pull/619) 当年的贡献，因而我们这次并不需要再实现一次打平逻辑。

但是在测试时，我们发现一个奇怪的现象。表格在首次、再次渲染时，会有非常大的卡顿。在进行断点时，它来自于 `useFlattenRecords` hooks。而测试的代码本身并没有使用可展开树的功能，于是我们对其进行了排查。发现在 `useFlattenRecords` 中，存在大量的 GC 操作。而这些操作是由于一段不起眼的代码引起的：

```tsx
// Fake code. Not used in real world
function flatten<T extends { children?: T[] }>(data: T[] = []) {
  let tmpList: T[] = [];

  for (let i = 0; i < data.length; i += 1) {
    const record = data[i];
    tmpList = [...tmpList, record, ...flatten(record.children)];
  }

  return tmpList;
}
```

在遍历过程中，虽然 `children` 为空只会进入一次递归。但是在循环每个 Record 时都会创建一次临时的空数组。但是当 `dataSource` 数据巨大时，它们会不断触发 GC 清理这些临时数组。因而我们通过改造添加逻辑以避免不必要的消耗：

```tsx
// Fake code. Not used in real world
function flatten<T extends { children?: T[] }>(data: T[] = [], list: T[] = []) {
  for (let i = 0; i < data.length; i += 1) {
    const record = data[i];
    list.push(record);
    flatten(record.children, list);
  }

  return list;
}
```

### 行列组合

如果你对 Table 的实现有所了解，那么你会知道行列合并是通过 `rowSpan` 和 `colSpan` 实现的。而在虚拟滚动中，由于并不是所有节点都是渲染，所以会出现需要渲染的行列并不存在的情况：

<img alt="RowSpan" height="400" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*S94JSpL-9rUAAAAAAAAAAAAADrJ8AQ/original" />

为了渲染该项内容，我们就需要计算出当前屏幕区域内的所有 Record 相关的 `rowSpan` 和 `colSpan`。而这个计算过程是非常复杂的，我们需要遍历所有的 Record，计算出每个 Record 的 `rowSpan` 和 `colSpan`。显然这是一个非常耗时的操作，而且当 `rowSpan` 数据距离可见区域过远时，它需要额外渲染的内容量也会非常大：

<img alt="Huge Size" height="600" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*52qqQ7nmv9kAAAAAAAAAAAAADrJ8AQ/original" />

对于 `rowSpan`，你可能会想到我们是否可以提前把 `rowSpan` 计算好，然后在滚动时获取这些数据。这其实是不行的，行列数据由 `onCell` 提供，而在父节点渲染时都全部计算一次 `onCell` 会产生巨量的性能损耗：

```jsx
const Demo = () => {
  const [spanCount, setSpanCount] = useState(3);

  const columns = [
    {
      dataIndex: 'group',
      onCell: (_, index) => ({
        rowSpan: index % spanCount === 0 ? spanCount : 0,
      }),
    },
  ];

  // WOW!
  React.useEffect(() => {
    setSpanCount(5);
  }, []);

  return <Table columns={columns} {...props} />;
};
```

此外，即便我们统计了 `rowSpan` 的数据，并且将屏幕外的行也进行渲染仍然不够。它可能会出现 `rowSpan` 交替的情况：

<img alt="Multiple Row Span" height="700" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NbckQIUqTIUAAAAAAAAAAAAADrJ8AQ/original" />

假设出现最糟的情况，所有的行都和其他的行有 `rowSpan`，那么我们需要渲染的内容量将会是整个 `dataSource`。即虚拟滚动不再虚拟。因而，我们需要对其进行裁剪，只渲染可见区域内的 `rowSpan`，而将屏幕外的无关部分去除：

<img alt="cut off" height="500" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QxM9SJ1mlAIAAAAAAAAAAAAADrJ8AQ/original" />

所以，反向思考。我们只需要从可见区域出发。然后向上、向下获取被 `rowSpan` 影响到的 Record。然后仅对提供 `rowSpan` 的 `cell` 进行渲染即可：

<img alt="fully cut off" height="400" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_LBQRKPhLaIAAAAAAAAAAAAADrJ8AQ/original" />

`rc-virtual-list` 提供了 `extraRender` 方法，它会提供当前虚拟滚动中所渲染的行号。我们只需要对这个范围内的 Record 执行一次 `onCell` 获取每个 `cell` 的 `rowSpan` 和 `colSpan` 信息。既可以知道当前行是否存在对外的 `rowSpan` 依赖：

```tsx
// Fake code. Not used in real world
const extraRender = ({ start, end }) => {
  // Start record
  const startRecord = flattenData[start];
  columns.forEach((col) => {
    // `rowSpan` === 0 means upper record has `rowSpan`
    const { rowSpan } = col.onCell(startRecord, start);
  });

  // End record
  const endRecord = flattenData[end];
  columns.forEach((col) => {
    // `rowSpan` > 1 means it should extend to next records
    const { rowSpan } = col.onCell(endRecord, end);
  });
};
```

需要注意的是，在实际收集过程中，我们会将整个范围有 `rowSpan` 的 `cell` 都记录下来而不仅仅是头尾的 Record。然后通过 `extraRender` 方法将这些 `cell` 渲染出来（而原本的 Record 对于被 `rowSpan` 影响到的 `cell` 则跳过渲染）。这样就可以保证 `rowSpan` 的正确性了。

当然，这种实现是基于 `rowSpan > 1` 和 `rowSpan = 0` 会匹配出现的假设。它不支持 `rowSpan` 用于挤压至下层的情况，但是对于数据表格而言，这已经足够了。

## 总结

虚拟滚动是一个非常复杂的功能，它需要考虑的因素非常多。但是我们相信花费这些精力是值得的，开发者不用再在功能和性能之间做取舍，而是可以同时拥有两者。

以上。
