---
order: 26
title:
  en-US: Drag sorting columns
  zh-CN: 拖拽排序列
---

## zh-CN

集成 react-dnd 来实现拖拽排序列。注意 因为此例和下面的行拖动例子 dnd 冲突 所以做了 hoc 来处理 在单独使用中可以不需要这么做

## en-US

we can integrate table with react-dnd to implement drag sorting columns.

```jsx
import React, { useState } from 'react';
import { Table } from 'antd';
import { useDrag, useDrop } from 'react-dnd';

import HOCDndProvider from '../DnDHoc.tsx';

const type = 'DragTableHeadRow';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 600,
  },
  // 一般最后的操作列可能是fixed 代码里做了特殊处理
  // 叫btn 这里可以自行更改 注意不要遗漏代码处理里面的btn
  {
    title: 'btn',
    dataIndex: 'btn',
    key: 'btn',
    fixed: 'right',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    btn: '1',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    btn: '1',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    btn: '1',
  },
];

const rowSelection = {
  onChange: selectedRowKeys => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`);
  },
};
const Dragdrop = (index, moveCol) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveCol(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));
  return {
    ref,
    isOver,
    dropClassName,
  };
};
// 拖拽headComponents处理
const DragTableHeadRow = ({ children, moveCol }) => {
  // 过滤掉 勾选和fixed定位col
  const filerChildren = children.filter(
    i => i.props.className !== 'ant-table-selection-column' && i.key !== 'btn',
  );

  const Ths = filerChildren.map((th, index) => {
    const {
      props: { className, style, children: thChildren },
    } = th;
    const { ref, isOver, dropClassName } = Dragdrop(index, moveCol);

    const cloneTh = React.cloneElement(
      th,
      {
        ...th.props,
        ref,
        className: `${className} ${isOver ? dropClassName : ''}`,
        style: { cursor: 'move', ...style },
      },
      thChildren,
    );
    return cloneTh;
  });
  if (children[0].props.className === 'ant-table-selection-column') {
    Ths.unshift(children[0]);
  }
  if (children[children.length - 1].key === 'btn') {
    Ths.push(children[children.length - 1]);
  }
  return <tr>{Ths}</tr>;
};

const DragColumnTable = () => {
  const [nowColumns, setColumns] = useState(columns);

  // 拆入位置函数
  const moveCol = (dragIndex, hoverIndex) => {
    function swapArray(arr, index1, index2) {
      const drag = arr[index1];
      arr.splice(index1, 1);
      arr.splice(index2, 0, drag);
      return arr;
    }
    const newColumns = swapArray(nowColumns, dragIndex, hoverIndex);
    setColumns([].concat(newColumns));
  };

  const components = {
    header: {
      row: props => <DragTableHeadRow {...props} moveCol={moveCol} />,
    },
  };

  return (
    <HOCDndProvider>
      <Table
        columns={nowColumns}
        dataSource={data}
        components={components}
        rowSelection={rowSelection}
        scroll={{ x: true }}
        style={{ width: '800px' }}
      />
    </HOCDndProvider>
  );
};

ReactDOM.render(<DragColumnTable />, mountNode);
```

```css
#components-table-demo-drag-column th.drop-over-downward {
  border-right: 2px dashed #1890ff;
}

#components-table-demo-drag-column th.drop-over-upward {
  border-left: 2px dashed #1890ff;
}
```
