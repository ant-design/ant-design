import React from 'react';
import { Tree } from 'antd';
import type { TreeProps } from 'antd';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const staticClassNames: TreeProps['classNames'] = {
  root: 'custom-tree-root',
  item: 'custom-tree-item',
  itemIcon: 'custom-tree-item-icon',
  itemTitle: 'custom-tree-item-title',
};

const staticStyles: TreeProps['styles'] = {
  root: { border: '2px solid #d9d9d9', borderRadius: 6, padding: 8 },
  item: { backgroundColor: '#f0f0f0', margin: '2px 0' },
  itemIcon: { color: '#1890ff' },
  itemTitle: { fontWeight: 'bold', color: '#262626' },
};

const dynamicClassNames: TreeProps['classNames'] = ({ props }) => ({
  root: `dynamic-tree-root ${props.showLine ? 'show-line' : ''}`,
  item: props.checkable ? 'checkable-tree-item' : 'selectable-tree-item',
  itemIcon: 'dynamic-tree-item-icon',
  itemTitle: 'dynamic-tree-item-title',
});

const dynamicStyles: TreeProps['styles'] = ({ props }) => ({
  root: {
    backgroundColor: props.disabled ? '#f5f5f5' : '#ffffff',
    border: `1px solid ${props.disabled ? '#d9d9d9' : '#40a9ff'}`,
    borderRadius: 4,
  },
  item: {
    padding: props.showIcon ? '4px 8px' : '2px 4px',
    borderRadius: 2,
  },
  itemIcon: {
    fontSize: props.showIcon ? 16 : 14,
    color: props.disabled ? '#bfbfbf' : '#52c41a',
  },
  itemTitle: {
    color: props.disabled ? '#bfbfbf' : '#1890ff',
    fontSize: 14,
  },
});

const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>(['0-0']);
  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>(['0-0-0']);
  const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(true);

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <h3>Static classNames and styles</h3>
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        classNames={staticClassNames}
        styles={staticStyles}
      />

      <h3 style={{ marginTop: 32 }}>Function-based classNames and styles</h3>
      <Tree
        showLine
        showIcon
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        classNames={dynamicClassNames}
        styles={dynamicStyles}
      />

      <h3 style={{ marginTop: 32 }}>Disabled state with dynamic styles</h3>
      <Tree
        disabled
        showIcon
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        classNames={dynamicClassNames}
        styles={dynamicStyles}
      />
    </div>
  );
};

export default App;
