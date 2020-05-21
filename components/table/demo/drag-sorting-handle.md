---
order: 27
title:
  en-US: Drag sorting with handler
  zh-CN:
---

## zh-CN

## en-US

Alternatively you can implement drag sorting with handler using _react-sortable-hoc_.

```jsx
import { Table } from 'antd';
import arrayMove from 'array-move';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => <span className="drag-handle" />);

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { data } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter(el => {
        return el != null;
      });
      this.props.onSort(newData);
      this.setState({ data: newData });
    }
  };

  render() {
    const { data } = this.state;

    const SortableItem = sortableElement(({ ...restProps }) => {
      return <tr {...restProps} />;
    });

    const SortableContainer = sortableContainer(({ children, ...restProps }) => {
      return (
        <tbody className="drag-container" {...restProps}>
          {children}
        </tbody>
      );
    });

    const DragableBodyRow = ({ index, className, style, ...restProps }) => {
      return <SortableItem index={restProps['data-row-key']} {...restProps} />;
    };

    const DraggableContainer = ({ children, ...restProps }) => {
      return (
        <SortableContainer
          useDragHandle
          helperClass="row-dragging"
          onSortEnd={this.onSortEnd}
          {...restProps}
        >
          {children}
        </SortableContainer>
      );
    };

    const dataSource = data.map((item, i) => {
      return { ...item, ...{ index: i } };
    });

    return (
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={this.props.tableColumns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DragableBodyRow,
          },
        }}
      />
    );
  }
}

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => {
      return <DragHandle />;
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

ReactDOM.render(
  <SortableTable
    data={data}
    tableColumns={tableColumns}
    onSort={sorted => {
      console.log('Sorted items: ', sorted);
    }}
  />,
  mountNode,
);
```

```css
.row-dragging {
  background: #fafafa;
  border: 1px solid #ccc;
}

.row-dragging td {
  visibility: hidden;
  padding: 16px;
}

.row-dragging .drag-visible {
  visibility: visible;
}

.drag-container {
  margin: 0;
  padding: 0;
}

.drag-item {
  position: relative;
  line-height: 30px;
  padding: 5px 10px;
  border: 1px solid black;
  margin-bottom: 5px;
}

.drag-handle {
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-block;
  width: 18px;
  height: 11px;
  background: linear-gradient(
    180deg,
    #000,
    #000 20%,
    #fff 0,
    #fff 40%,
    #000 0,
    #000 60%,
    #fff 0,
    #fff 80%,
    #000 0,
    #000
  );
  opacity: 0.25;
  cursor: row-resize;
}
```
