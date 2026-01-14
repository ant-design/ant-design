import React from 'react';
import { Button, message, Space } from 'antd';
import type { MessageArgsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const messageClassNames = createStaticStyles(({ css }) => ({
  icon: css`font-size: 14px;`,
}));

const stylesObject: MessageArgsProps['styles'] = {
  icon: { fontSize: 20 },
};

const stylesFn: MessageArgsProps['styles'] = ({ props }) => {
  if (props.type === 'success') {
    return {
      root: {
        border: '1px solid #eee',
        display: 'inline-flex',
        borderRadius: 10,
        overflow: 'hidden',
      },
    } satisfies MessageArgsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showObjectStyle = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a message with object classNames and styles',
      classNames: messageClassNames,
      styles: stylesObject,
    });
  };

  const showFunctionStyle = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a message with function classNames and styles',
      classNames: messageClassNames,
      styles: stylesFn,
      duration: 60 * 1000,
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
