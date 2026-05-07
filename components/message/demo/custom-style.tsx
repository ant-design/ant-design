import React from 'react';
import { Button, message } from 'antd';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message with custom className and style',
      styles: {
        root: {
          border: '1px solid #b7eb8f',
          boxShadow: '0 4px 12px rgba(82, 196, 26, 0.12)',
        },
        icon: {
          color: '#237804',
        },
        title: {
          color: '#237804',
          fontWeight: 600,
        },
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={success}>Customized style</Button>
    </>
  );
};

export default App;
