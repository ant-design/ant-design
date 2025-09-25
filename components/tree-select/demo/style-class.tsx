import React from 'react';
import { Flex, TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    width: 300,
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: token.borderRadius,
  },
}));

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
  const styleObject: TreeSelectProps['styles'] = {
    input: {
      backgroundColor: '#f6ffed',
      fontSize: '16px',
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

  const styleFunction: TreeSelectProps['styles'] = (info) => {
    if (info.props.size === 'middle') {
      return {
        root: {
          border: '1px solid #722ed1',
        },

        suffix: {
          color: '#722ed1',
        },
        popup: {
          root: {
            border: '1px solid #722ed1',
          },
        },
      };
    }
    return {};
  };

  const { styles: classNames } = useStyles();

  const sharedProps: TreeSelectProps = {
    treeData,
    classNames,
  };

  return (
    <Flex vertical gap="large">
      <TreeSelect {...sharedProps} placeholder="Object" styles={styleObject} />

      <TreeSelect {...sharedProps} placeholder="Function" size="middle" styles={styleFunction} />
    </Flex>
  );
};

export default App;
