import React from 'react';
import { Button, message, Space } from 'antd';
import type { MessageArgsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    margin-top: 20vh;
  `,
}));

const stylesObject: MessageArgsProps['styles'] = {
  icon: { fontSize: 20 },
};

const stylesFn: MessageArgsProps['styles'] = ({ props: { type } }) => {
  if (type === 'success') {
    return {
      root: {
        border: '1px solid #eee',
        display: 'inline-flex',
        borderRadius: 10,
        overflow: 'hidden',
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();

  const showObjectStyle = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a message with object classNames and styles',
      classNames: {
        root: styles.root,
      },
      styles: stylesObject,
    });
  };

  const showFunctionStyle = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a message with function classNames and styles',
      classNames: {
        root: styles.root,
      },
      styles: stylesFn,
      duration: 10000000000,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={showObjectStyle}>Object style</Button>
        <Button onClick={showFunctionStyle} type="primary">
          Function style
        </Button>
      </Space>
    </>
  );
};

export default App;
