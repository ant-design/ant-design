import React from 'react';
import { App } from 'antd';

export default () => {
  const { message } = App.useApp();

  React.useEffect(() => {
    message.success('Good!');
  }, [message]);

  return <div>Hello World</div>;
};
