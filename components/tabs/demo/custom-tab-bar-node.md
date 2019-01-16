---
order: 13
title:
  zh-CN: 可拖拽标签
  en-US: Draggable Tabs
---

## zh-CN

使用 `react-dnd` 实现标签可拖拽。

## en-US

Use `react-dnd` to make tabs draggable.

````jsx
import { Tabs } from 'antd';
import { DragDropContextProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const TabPane = Tabs.TabPane;

// Drag & Drop node
class TabNode extends React.Component {
  render() {
		const {
			connectDragSource,
      connectDropTarget,
      children,
		} = this.props

		return connectDragSource(
			connectDropTarget(children),
    );
	}
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
};

const WrapTabNode = DropTarget(
	'DND_NODE',
	cardTarget,
	(connect) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(
	DragSource(
		'DND_NODE',
		cardSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		}),
	)(TabNode),
);

// Demo
class Demo extends React.Component {
  state = {
    activeKey: '1',
    tabs: ['1', '2', '3'],
  };

  onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
    this.setState({
      activeKey,
    });
  }

  moveTabNode = (dragKey, hoverKey) => {
    const { tabs } = this.state;
    const dragIndex = tabs.indexOf(dragKey);
    const hoverIndex = tabs.indexOf(hoverKey);
    const dragTab = this.state.tabs[dragIndex];
    this.setState(
			update(this.state, {
				tabs: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTab]],
				},
			}),
		);
  };

  renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {node => (
        <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>{node}</WrapTabNode>
      )}
    </DefaultTabBar>
  );

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Tabs
          renderTabBar={this.renderTabBar}
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          {this.state.tabs.map(id => (
            <TabPane tab={`tab ${id}`} key={id}>
              Content of Tab Pane {id}
            </TabPane>
          ))}
        </Tabs>
      </DragDropContextProvider>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
