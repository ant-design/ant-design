import React from 'react';
import { Flex, TreeSelect } from 'antd';
import type { TreeSelectProps, TreeSelectSemanticAllType } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    width: 300,
    borderRadius: token.borderRadius,
  },
}));

const styleObject: TreeSelectProps['styles'] = {
  input: {
    fontSize: 16,
  },
  suffix: {
    color: '#1890ff',
  },
  popup: {
    root: {
      border: '1px solid #1890ff',
    },
  },
};

const styleFunction: TreeSelectProps['styles'] = (info): TreeSelectSemanticAllType['styles'] => {
  if (info.props.size === 'middle') {
    return {
      suffix: {
        color: '#722ed1',
      },
      popup: {
        item: {
          color: '#722ed1',
        },
      },
    };
  }
  return {};
};

const treeData: TreeSelectProps['treeData'] = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: 'leaf3',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedProps: TreeSelectProps = {
    treeData,
    classNames,
  };

  return (
    <Flex vertical gap="large">
      <TreeSelect {...sharedProps} styles={styleObject} placeholder="Object" />
      <TreeSelect {...sharedProps} styles={styleFunction} placeholder="Function" size="middle" />
    </Flex>
  );
};

export default App;
