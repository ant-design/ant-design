import React from 'react';
import { Alert, Button, Flex } from 'antd';
import type { AlertProps, AlertResultType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 12px;
  `,
}));

const styleFn: AlertProps['styles'] = ({ props: { type } }): AlertResultType['styles'] => {
  if (type === 'success') {
    return {
      root: {
        backgroundColor: 'rgba(82, 196, 26, 0.1)',
        borderColor: '#b7eb8f',
      },
      icon: {
        color: '#52c41a',
      },
    };
  }

  if (type === 'warning') {
    return {
      root: {
        backgroundColor: 'rgba(250, 173, 20, 0.1)',
        borderColor: '#ffe58f',
      },
      icon: {
        color: '#faad14',
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const alertSharedProps: AlertProps = {
    showIcon: true,
    classNames: {
      root: classNames.root,
    },
  };

  return (
    <Flex vertical gap="middle">
      <Alert
        {...alertSharedProps}
        title="Object styles"
        type="info"
        styles={{
          icon: {
            fontSize: 18,
          },
          section: {
            fontWeight: 500,
          },
        }}
        action={<Button size="small">Action</Button>}
      />
      <Alert {...alertSharedProps} title="Function styles" type="success" styles={styleFn} />
    </Flex>
  );
};

export default App;
