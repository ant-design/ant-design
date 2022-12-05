import React from 'react';
import { App, Button } from 'antd';

// Sub page
const MyPage = () => {
  const { message } = App.useApp();

  const showMessage = () => {
    message.success('Success!');
  };

  return (
    <Button type="primary" onClick={showMessage}>
      Open message
    </Button>
  );
};

// Entry component
export default () => (
  <App>
    <MyPage />
  </App>
);
