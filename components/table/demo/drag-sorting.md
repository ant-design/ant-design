---
order: 25
title:
  en-US: Drag sorting
  zh-CN: 拖拽排序
---

## zh-CN

使用自定义元素，我们可以集成 react-dnd 来实现拖拽排序。

## en-US

By using custom components, we can integrate table with react-dnd to implement drag sorting.

````jsx
import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

var dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={className}
          style={style}
        />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget(
  'row',
  rowTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'row',
    rowSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
    }),
  )(BodyRow),
);

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

class DragSortingTable extends React.Component {
  pendingUpdateFn;
  requestedFrame = undefined;

  state = {
    data: [{ key: '1', name: 'John Brown', age: 1, address: 'New York No. 1 Lake Park', },
    { key: '2', name: 'Jim Green', age: 2, address: 'London No. 1 Lake Park', },
    { key: '3', name: 'Joe Black', age: 3, address: 'Sidney No. 1 Lake Park', },
    { key: '4', name: 'Joe Black', age: 4, address: 'Sidney No. 1 Lake Park', },
    { key: '5', name: 'Joe Black', age: 5, address: 'Sidney No. 1 Lake Park', },
    { key: '6', name: 'Joe Black', age: 6, address: 'Sidney No. 1 Lake Park', },
    { key: '7', name: 'Joe Black', age: 7, address: 'Sidney No. 1 Lake Park', },
    { key: '8', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', },
    { key: '9', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', },
    { key: '10', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', },
    ],
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  scheduleUpdate(updateFn) {
    this.pendingUpdateFn = updateFn;

    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  }

  drawFrame = () => {
    const nextState = update(this.state, this.pendingUpdateFn);
    this.setState(nextState);

    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  }

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }


  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.scheduleUpdate({
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
      },
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        pagination={false}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
        size={"small"}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragSortingTable);

ReactDOM.render(<Demo />, mountNode);
````

````css
#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}

#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}
````
