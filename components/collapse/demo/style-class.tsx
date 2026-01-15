import React from 'react';
import { Collapse, Flex } from 'antd';
import { createStaticStyles } from 'antd-style';

import type { CollapseProps } from '..';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `,
}));

const element = (
  <p>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: element,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: element,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: element,
  },
];

const styles: CollapseProps['styles'] = {
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: '12px 16px',
    color: '#141414',
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
        color: '#141414',
      },
    } satisfies CollapseProps['styles'];
  }
};

const App: React.FC = () => {
  const sharedProps: CollapseProps = { classNames, items };

  return (
    <Flex vertical gap="middle">
      <Collapse {...sharedProps} defaultActiveKey={['1']} styles={styles} />
      <Collapse {...sharedProps} defaultActiveKey={['2']} styles={stylesFn} size="large" />
    </Flex>
  );
};

export default App;
