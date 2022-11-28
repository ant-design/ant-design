import React, { useRef, useState } from 'react';
import { App, Button } from 'antd';

export default () => {
  console.log('App.useApp()', App.useApp());
  // const { message } = App.useApp();
  // React.useEffect(() => {
  //   message.success('Good!');
  // }, []);

  return <div>Hello World</div>;
};
