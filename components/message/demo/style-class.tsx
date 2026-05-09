import React from 'react';
import { Button, message, Space } from 'antd';
import type { GetProp, MessageArgsProps } from 'antd';

const defaultStyles: GetProp<MessageArgsProps, 'styles', 'Return'> = {
  root: {
    backgroundColor: '#f6ffed',
    border: '2px solid #95de64',
    borderRadius: 16,
    boxShadow: '4px 4px 0 #d9f7be',
  },
  icon: {
    color: '#237804',
  },
  title: {
    color: '#237804',
    fontWeight: 600,
  },
};

const stylesFn: MessageArgsProps['styles'] = ({
  props,
}): GetProp<MessageArgsProps, 'styles', 'Return'> => {
  if (props.type === 'error') {
    return {
      root: {
        ...defaultStyles.root,
        backgroundColor: '#fff2f0',
        borderColor: '#ffccc7',
        boxShadow: '4px 4px 0 #ffccc7',
      },
      icon: {
        color: '#cf1322',
      },
      title: {
        color: '#cf1322',
        fontWeight: 600,
      },
    };
  }
  return defaultStyles;
};

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showObjectStyle = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a message with object styles',
      styles: defaultStyles,
    });
  };

  const showFunctionStyle = () => {
    messageApi.open({
      type: 'error',
      content: 'This is a message with function styles',
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
