import React, { useLayoutEffect } from 'react';
import { App, Button, ConfigProvider, message } from 'antd';

const info = () => {
  message.info('This is a normal message');
};

const Demo: React.FC = () => {
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <ConfigProvider
          prefixCls="test"
          iconPrefixCls="icon"
          theme={{ token: { borderRadius: 0 } }}
        >
          <App message={{ maxCount: 1 }}>{children}</App>
        </ConfigProvider>
      ),
    });
  }, []);

  return (
    <Button type="primary" onClick={info}>
      Static Method
    </Button>
  );
};

export default Demo;
