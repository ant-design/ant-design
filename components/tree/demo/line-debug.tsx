import React from 'react';
import { CarryOutOutlined } from '@ant-design/icons';
import { ConfigProvider, Tree } from 'antd';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    icon: <CarryOutOutlined />,
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
            icon: <CarryOutOutlined />,
          },
          {
            value: 'leaf2',
            title: 'leaf2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            value: 'sss',
            title: 'sss',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            titleHeight: 32,
          },
        },
      }}
    >
      <Tree showLine defaultExpandAll treeData={treeData} />
      <Tree showLine defaultExpandAll treeData={treeData} draggable />
      <Tree showLine defaultExpandAll treeData={treeData} checkable />
    </ConfigProvider>
  );
};

export default App;
