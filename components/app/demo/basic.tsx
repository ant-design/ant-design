import React, { useRef, useState } from 'react';
import { App, Button } from 'antd';

export default () => {
  const { message } = App.useApp();
  React.useEffect(() => {
    message.success('Good!');
  }, []);

  return (
    <App>
      <div>Hello World</div>
    </App>
  );
};
