---
order: 13
title:
  zh-CN: 可拖拽标签
  en-US: Draggable Tabs
---

## zh-CN

使用 `react-dnd@15+` 实现标签可拖拽。

## en-US

Use `react-dnd@15+` to make tabs draggable.

```tsx
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const { TabPane } = Tabs;

const type = 'DraggableTabNode';
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: 'dropping',
      };
    },
    drop: (item: { index: React.Key }) => {
      moveNode(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <div ref={ref} style={{ marginRight: 24 }} className={isOver ? dropClassName : ''}>
      {children}
    </div>
  );
};

const DraggableTabs: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const [order, setOrder] = useState<React.Key[]>([]);

  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    const newOrder = order.slice();

    React.Children.forEach(children, (c: React.ReactElement) => {
      if (c.key && newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    setOrder(newOrder);
  };

  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {node => (
        <DraggableTabNode key={node.key} index={node.key!} moveNode={moveTabNode}>
          {node}
        </DraggableTabNode>
      )}
    </DefaultTabBar>
  );

  const tabs: React.ReactElement[] = [];
  React.Children.forEach(children, (c: React.ReactElement) => {
    tabs.push(c);
  });

  const orderTabs = tabs.slice().sort((a, b) => {
    const orderA = order.indexOf(a.key!);
    const orderB = order.indexOf(b.key!);

    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    if (orderA !== -1) {
      return -1;
    }
    if (orderB !== -1) {
      return 1;
    }

    const ia = tabs.indexOf(a);
    const ib = tabs.indexOf(b);

    return ia - ib;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs renderTabBar={renderTabBar} {...props}>
        {orderTabs}
      </Tabs>
    </DndProvider>
  );
};

const App: React.FC = () => (
  <DraggableTabs>
    <TabPane tab="tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </DraggableTabs>
);

export default App;
```

```css
.dropping {
  background: #fefefe;
  transition: all 0.3s;
}
```
