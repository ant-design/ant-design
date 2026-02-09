import React from 'react';
import { Flex, Tabs } from 'antd';
import type { TabsProps, TabsSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border-width: 2px;
    border-style: dashed;
    padding: 16px;
    margin-bottom: 10px;
  `,
}));

const stylesObject: TabsProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16, marginBottom: 10 },
  header: { backgroundColor: 'rgba(245,245,245,0.5)' },
  item: { fontWeight: 'bold', color: '#1890ff', padding: `6px 10px` },
  indicator: { backgroundColor: 'rgba(255,77,79, 0.3)', height: 4 },
  content: { backgroundColor: 'rgba(230,247,255,0.8)', padding: 16 },
};

const stylesFn: TabsProps['styles'] = (info): TabsSemanticAllType['styles'] => {
  if (info.props.type === 'card') {
    return {
      root: { backgroundColor: 'rgba(250,250,250, 0.8)', borderColor: '#d9d9d9' },
      header: { textAlign: 'start' },
    };
  }
  return {};
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
  const shareProps: TabsProps = {
    items,
    defaultActiveKey: '1',
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Tabs {...shareProps} styles={stylesObject} />
      <Tabs tabPlacement="start" type="card" {...shareProps} styles={stylesFn} />
    </Flex>
  );
};

export default App;
