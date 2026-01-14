import React from 'react';
import { Flex, Tree } from 'antd';
import type { TreeProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`padding: 8px; border-radius: 4px;`,
  item: css`border-radius: 2px;`,
  itemTitle: css`font-size: 14px;`,
}));

const treeData: TreeProps['treeData'] = [
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

const styles: TreeProps['styles'] = {
  root: { border: '2px solid #d9d9d9' },
  item: { margin: '2px 0' },
};

const stylesFn: TreeProps['styles'] = (info) => {
  if (!info.props.checkable) {
    return {
      root: {
        border: `2px solid #E5D9F2`,
        borderRadius: 4,
      },
    } satisfies TreeProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: TreeProps = {
    treeData,
    classNames,
    autoExpandParent: true,
    checkable: true,
  };
  return (
    <Flex vertical gap="middle">
      <Tree {...sharedProps} treeData={treeData} styles={styles} />
      <Tree
        {...sharedProps}
        checkable={false}
        treeData={treeData}
        styles={stylesFn}
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
      />
    </Flex>
  );
};

export default App;
