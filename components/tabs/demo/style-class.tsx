import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const classNamesObject: TabsProps['classNames'] = {
  root: 'demo-tabs-root',
  header: 'demo-tabs-header',
  item: 'demo-tabs-item',
  indicator: 'demo-tabs-indicator',
  content: 'demo-tabs-content',
};

const classNamesFn: TabsProps['classNames'] = (info) => {
  if (info.props.type === 'card') {
    return {
      root: 'demo-tabs-root--card',
    } satisfies TabsProps['classNames'];
  } else {
    return {
      root: 'demo-tabs-root--line',
    } satisfies TabsProps['classNames'];
  }
};

const stylesObject: TabsProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16, marginBottom: 10 },
  header: { backgroundColor: '#f5f5f5' },
  item: { fontWeight: 'bold', color: '#1890ff', padding: `6px 10px` },
  indicator: { backgroundColor: '#ff4d4f', height: 4 },
  content: { backgroundColor: '#e6f7ff', padding: 16 },
};

const stylesFn: TabsProps['styles'] = (info) => {
  if (info.props.centered) {
    return {
      root: { backgroundColor: '#f0f2f5', borderColor: '#1890ff' },
      header: { textAlign: 'center' },
      content: { padding: 8 },
    } satisfies TabsProps['styles'];
  } else {
    return {
      root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' },
      header: { textAlign: 'start' },
      content: { padding: 8 },
    } satisfies TabsProps['styles'];
  }
};

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        styles={stylesObject}
        classNames={classNamesObject}
      />
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabPlacement="start"
        type="card"
        styles={stylesFn}
        classNames={classNamesFn}
      />
    </>
  );
};

export default App;
