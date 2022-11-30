import React from 'react';
import { App } from 'antd';

// Sub page
const MyPage = () => {
  const { message } = App.useApp();
  React.useEffect(() => {
    message.success('Good!');
  }, [message]);

  return <div>Hello World</div>;
};

// Entry component
export default () => (
  <App>
    <MyPage />
  </App>
);
