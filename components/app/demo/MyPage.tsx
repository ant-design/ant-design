import React from 'react';
import { App } from 'antd';

const MyPage = () => {
  const { message } = App.useApp();
  React.useEffect(() => {
    message.success('Good!');
  }, [message]);

  return <div>Hello World</div>;
};

export default MyPage;
