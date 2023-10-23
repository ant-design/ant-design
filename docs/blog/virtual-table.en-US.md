---
title: Virtual Table is here!
date: 2023-08-29
author: zombieJ
---

## Preface

In v4, we added a custom `components` example for Table, which replaces the default `<tbody>` with `components.body` to achieve virtual scrolling. But many developers feedback that the virtual table in the Demo has many functions that cannot be implemented. For example, fixed columns, merged rows and columns, expandable rows, etc.

So we proposed [[RFC] StaticTable for fast perf & virtual scroll support](https://github.com/ant-design/ant-design/discussions/41500) in v5. The RFC expects to provide a high-performance Table.StaticTable, which will support virtual scrolling by default. But as the development progressed, we eventually decided to implement StaticTable on the underlying `rc-table`, and on the antd side, we only need to enable it with `<Table virtual />`.

## TL;DR

Table supports virtual scrolling by setting the `virtual` prop. At the same time, the original Table's functions except `components.body` can be used normally:

```tsx
<Table virtual scroll={{ x: 2000, y: 500 }} {...otherProps} />
```

### Fixed columns

![Fixed Columns](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*V2FcS7ZAReMAAAAAAAAAAAAADrJ8AQ/original)

### Expandable

![Expandable](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*nd61R4YsknsAAAAAAAAAAAAADrJ8AQ/original)

### RowSpan & ColSpan

![Rowspan & Colspan](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*DYkYQo8tU6sAAAAAAAAAAAAADrJ8AQ/original)

You can visit the [virtual list](/components/table#components-table-demo-virtual-list) example to experience it.

## Some details

Table in antd internally uses the `rc-table` component. Our virtual scrolling feature also reuses the `components` property mentioned above. Replace the middle `<tbody>` with `rc-virtual-list`, which is widely used in various virtual scrolling scenarios of antd like Select and Tree. `rc-virtual-list` itself does not support horizontal scrolling, so we also added horizontal scrolling support for it in this refactoring.

### Fixed columns

In v4, we refactored the fixed columns of Table into `position: sticky`. This CSS allows you to fix an element at a certain position when scrolling. So as to avoid the need to render an extra Table in v3 to achieve the fixed position effect:

<img alt="Sticky" height="279" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WNoMQKQwX-YAAAAAAAAAAAAADrJ8AQ/original" />

For overlapping fixed columns, you only need to configure different offsets:

<img alt="Stack Sticky" height="279" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HSW-S40yR_wAAAAAAAAAAAAADrJ8AQ/original" />

We can also use this feature in virtual scrolling. Just reuse the `sticky` style to achieve the effect of fixed columns. `rc-virtual-list` only needs to provide horizontal scrolling, and does not need to care about the implementation of fixed columns.

### Expandable

We will flatten the tree structure of `dataSource` through `useFlattenRecords` in `rc-table`, so as to support developers' custom virtual scrolling capabilities. Thanks to [@crawler-django](https://github.com/react-component/table/pull/619) for his contribution at that time, so we don't need to implement the flattening logic again.

But in testing, we found a strange phenomenon. When the table is rendered for the first time or re-render, there will be a very large lag. When debugging, it comes from the `useFlattenRecords` hook. It's strange that test code itself does not use the expandable tree function. It was found that there were a lot of GC operations in `useFlattenRecords`. And these operations are caused by a piece of inconspicuous code:

```tsx
// Fake code. Not used in real word
function flatten<T extends { children?: T[] }>(data: T[] = []) {
  let tmpList: T[] = [];

  for (let i = 0; i < data.length; i += 1) {
    const record = data[i];
    tmpList = [...tmpList, record, ...flatten(record.children)];
  }

  return tmpList;
}
```

When traversing, although `children` is empty and only enters recursion once. But when looping through each Record, a temporary empty array will be created. But when `dataSource` data is huge, they will continue to trigger GC to clean up these temporary arrays. So we added logic to avoid unnecessary consumption:

```tsx
// Fake code. Not used in real word
function flatten<T extends { children?: T[] }>(data: T[] = [], list: T[] = []) {
  for (let i = 0; i < data.length; i += 1) {
    const record = data[i];
    list.push(record);
    flatten(record.children, list);
  }

  return list;
}
```

### RowSpan & ColSpan

If you are familiar with the implementation of Table, you will know that row and column merging is achieved through `rowSpan` and `colSpan`. In virtual scrolling, since not all nodes are rendered, there will be cases where the rows and columns to be rendered do not exist:

<img alt="RowSpan" height="400" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*S94JSpL-9rUAAAAAAAAAAAAADrJ8AQ/original" />

To render this content, we need to calculate the `rowSpan` and `colSpan` of all Records in the current visible area. And this calculation process is very complicated. We need to traverse all Records and calculate the `rowSpan` and `colSpan` of each Record. Obviously, this is a very time-consuming operation, and when the `rowSpan` data is too far away from the visible area, the amount of content it needs to render will also be very large:

<img alt="Huge Size" height="600" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*52qqQ7nmv9kAAAAAAAAAAAAADrJ8AQ/original" />

Maybe you will think of whether we can calculate the `rowSpan` in advance and then get these data when scrolling. This is actually not possible. The row and column data is provided by `onCell`, and calculating `onCell` every time when rendering the parent node will cause huge performance loss:

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

Thus, even if we count the `rowSpan` data and render the rows outside the screen, it is still not enough. It may appear that `rowSpan` alternates:

<img alt="Multiple Row Span" height="700" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NbckQIUqTIUAAAAAAAAAAAAADrJ8AQ/original" />

And for the worst case, all rows have `rowSpan` with other rows, then the amount of content we need to render will be the entire `dataSource`. That is, virtual scrolling is no longer virtual. Therefore, we need to clip it to render only the `rowSpan` in the visible area, and remove the irrelevant parts outside the screen:

<img alt="cut off" height="500" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QxM9SJ1mlAIAAAAAAAAAAAAADrJ8AQ/original" />

So, think backwards. We only need to start from the visible area. Then get the Records affected by `rowSpan` up and down. Then only render the `cell` that provides `rowSpan`:

<img alt="fully cut off" height="400" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_LBQRKPhLaIAAAAAAAAAAAAADrJ8AQ/original" />

`rc-virtual-list` provides the `extraRender` method, which will provide the row number currently rendered in virtual scrolling. We only need to execute `onCell` on each Record in this range to get the `rowSpan` and `colSpan` information of each `cell`. So we can know whether the current row has `rowSpan`:

```tsx
// Fake code. Not used in real word
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

You should note that, in the actual collection process, we will record all `cell` with `rowSpan` in the range instead of just the head and tail Record. Then render these `cell` through the `extraRender` method (and skip rendering for `cell` affected by `rowSpan` in the original Record). This ensures the correctness of `rowSpan`.

Of course, this implementation is based on the assumption that `rowSpan > 1` and `rowSpan = 0` will appear. It does not support the case where `rowSpan` is used to squeeze to the lower level, but for data tables, this is enough.

## Finally

Virtual scrolling is a very complex feature, and there are many factors to consider. But we believe that it is worth spending this effort, and developers no longer need to choose between functionality and performance. Instead, you can have both. However, it should be noted that since we have implemented virtual scrolling through `components.body`, developers cannot override the `body` part of the component.

That's all.
