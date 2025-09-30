import React from 'react';
import { Collapse, Flex } from 'antd';
import { createStyles } from 'antd-style';

import type { CollapseProps } from '..';
const useStyles = createStyles(() => ({
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
  },
  header: {
    color: '#141414',
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const children = (
    <p>
      A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
      found as a welcome guest in many households across the world.
    </p>
  );
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children,
    },
  ];

  const sharedProps: CollapseProps = {
    classNames,
    items,
  };

  const styles: CollapseProps['styles'] = {
    root: {
      backgroundColor: '#fafafa',
      border: '1px solid #e0e0e0',
      borderRadius: 8,
    },
    header: {
      backgroundColor: '#f0f0f0',
      padding: '12px 16px',
    },
  };

  const stylesFn: CollapseProps['styles'] = ({ props }) => {
    if (props.size === 'large') {
      return {
        root: {
          backgroundColor: '#fff',
          border: '1px solid #696FC7',
          borderRadius: 8,
        },
        header: {
          backgroundColor: '#F5EFFF',
          padding: '12px 16px',
        },
      };
    }
  };

  return (
    <Flex vertical gap="middle">
      <Collapse {...sharedProps} defaultActiveKey={['1']} styles={styles} />
      <Collapse {...sharedProps} defaultActiveKey={['2']} size="large" styles={stylesFn} />
    </Flex>
  );
};

export default App;
