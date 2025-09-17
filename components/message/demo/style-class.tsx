import React from 'react';
import { Button, message } from 'antd';
import type { MessageArgsProps } from 'antd';

const classNamesObject: MessageArgsProps['classNames'] = {
  content: 'demo-message-content',
  icon: 'demo-message-icon',
};

const classNamesFn: MessageArgsProps['classNames'] = (info) => {
  if (info.props.type === 'success') {
    return { content: 'demo-message-content--success' };
  }
  return { content: 'demo-message-content--info' };
};

const stylesObject: MessageArgsProps['styles'] = {
  content: { fontWeight: 'bold', fontSize: '16px' },
  icon: { fontSize: '20px' },
};

const stylesFn: MessageArgsProps['styles'] = (info) => {
  if (info.props.type === 'error') {
    return { content: { backgroundColor: '#fff1f0', borderColor: '#ffccc7' } };
  }
  return { content: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' } };
};

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showObjectStyle = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a message with object classNames and styles',
      classNames: classNamesObject,
      styles: stylesObject,
    });
  };

  const showFunctionStyle = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a message with function classNames and styles',
      classNames: classNamesFn,
      styles: stylesFn,
    });
  };

  const showErrorStyle = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message with function styles',
      classNames: classNamesFn,
      styles: stylesFn,
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={showObjectStyle} style={{ marginRight: 8 }}>
        Object Style
      </Button>
      <Button onClick={showFunctionStyle} style={{ marginRight: 8 }}>
        Function Style
      </Button>
      <Button onClick={showErrorStyle}>Error Style</Button>
    </>
  );
};

export default App;
