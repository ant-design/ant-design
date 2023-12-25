import React from 'react';
import { Button, ConfigProvider, message } from 'antd';

const info = () => {
  // message.info('This is a normal message', 50);
};

ConfigProvider.config({
  container: (children) => (
    <ConfigProvider prefixCls="test" iconPrefixCls="aaa">
      {children}
    </ConfigProvider>
  ),
});
// ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });
// message.config({ prefixCls: 'config' });

message.info('This is a normal message', 0);

const App: React.FC = () => (
  <Button type="primary" onClick={info}>
    Static Method
  </Button>
);

export default App;
