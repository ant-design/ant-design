import React from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';

const treeData1: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf 1',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf 2',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf 3', key: '0-0-1-0' }],
      },
    ],
  },
];

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0',
        disableCheckbox: true,
        children: [
          {
            title: 'parent 1-0-0',
            key: '0-0-0',
            disableCheckbox: true,
            children: [
              {
                title: 'parent 1-0-0-0',
                key: '0-0-0-0',
                disableCheckbox: true,
                children: [
                  {
                    title: 'parent 1-0-0-0-0',
                    key: '0-0-0-0-0',
                    disableCheckbox: true,
                    children: [
                      {
                        title: 'parent 1-0-0-0-0-0',
                        key: '0-0-0-0-0-0',
                        disableCheckbox: true,
                      },
                      {
                        title: 'parent 1-0-0-0-0-1',
                        key: '0-0-0-0-0-1',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const treeData2: DataNode[] = [
  {
    title: '0',
    key: '0',
    children: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
          },
          {
            title: '0-0-1',
            key: '0-0-1',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <div
      style={{
        padding: 8,
        width: 200,
        border: '1px solid #f4f4f4',
        // whiteSpace: 'nowrap',
        // overflow: 'auto',
        // height: 200,
      }}
    >
      <Tree
        checkable
        defaultExpandAll
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        selectable={false}
        // defaultCheckedKeys={['0-0', '0-0-0-1', '0-0-1-0']}
        // defaultCheckedKeys={['0-0-0-1']}
        // defaultCheckedKeys={['0-0-0-0-0-1']}
        defaultCheckedKeys={['0-0', '0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData2}
        checkStrictly
      />
    </div>
  );
};

export default App;
