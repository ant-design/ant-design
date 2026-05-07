import React from 'react';
import { Button, message, Space } from 'antd';
import type { GetProp, MessageArgsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const messageClassNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #91caff;
    box-shadow: 0 4px 14px rgba(22, 119, 255, 0.12);
  `,
  title: css`
    color: #0958d9;
    font-weight: 600;
  `,
}));

const stylesObject: MessageArgsProps['styles'] = {
  icon: { color: '#0958d9' },
};

const stylesFn: MessageArgsProps['styles'] = ({
  props,
}): GetProp<MessageArgsProps, 'styles', 'Return'> => {
  if (props.type === 'success') {
    return {
      root: {
        border: '1px solid #b7eb8f',
        boxShadow: '0 4px 14px rgba(82, 196, 26, 0.14)',
      },
      title: {
        color: '#237804',
        fontWeight: 600,
      },
    };
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
