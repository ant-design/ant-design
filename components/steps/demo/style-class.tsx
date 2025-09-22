import React from 'react';
import { Flex, Space, Steps } from 'antd';
import type { StepsProps } from 'antd';

const classNamesObject: StepsProps['classNames'] = {
  root: 'demo-steps-root',
  item: 'demo-steps-item',
  itemWrapper: 'demo-steps-item-wrapper',
  itemIcon: 'demo-steps-item-icon',
  itemHeader: 'demo-steps-item-header',
  itemTitle: 'demo-steps-item-title',
  itemContent: 'demo-steps-item-content',
};

const classNamesFn: StepsProps['classNames'] = (info) => {
  if (info.props.type === 'navigation') {
    return { root: 'demo-steps-root--navigation' };
  }
  return { root: 'demo-steps-root--default' };
};

const stylesObject: StepsProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 16 },
  item: { backgroundColor: '#f5f5f5' },
  itemIcon: { borderRadius: '50%', border: '2px solid #1890ff' },
  itemTitle: { fontWeight: 'bold', color: '#1890ff' },
  itemContent: { fontStyle: 'italic', color: '#666' },
};

const stylesFn: StepsProps['styles'] = (info) => {
  if (info.props.current === 1) {
    return {
      root: { backgroundColor: '#e6f7ff', borderColor: '#1890ff' },
      itemTitle: { color: '#1890ff' },
    };
  }
  return {
    root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' },
    itemTitle: { color: '#666' },
  };
};

const items = [
  {
    title: 'Finished',
    content: 'This is a content.',
  },
  {
    title: 'In Progress',
    content: 'This is a content.',
  },
  {
    title: 'Waiting',
    content: 'This is a content.',
  },
];

const App: React.FC = () => {
  return (
    <Space size={[8, 24]} orientation="vertical" style={{ width: '100%' }}>
      <Flex vertical gap="middle">
        <Steps current={1} items={items} styles={stylesObject} classNames={classNamesObject} />
      </Flex>
      <Flex vertical gap="middle">
        <Steps
          current={1}
          items={items}
          type="navigation"
          styles={stylesFn}
          classNames={classNamesFn}
        />
      </Flex>
    </Space>
  );
};

export default App;
