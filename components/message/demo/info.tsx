import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { Button, ConfigProvider, message } from 'antd';

const info = () => {
  message.info('This is a normal message', 50);
};

ConfigProvider.config({
  container: (children) => <StyleProvider hashPriority="high">{children}</StyleProvider>,
});

const App: React.FC = () => (
  <Button type="primary" onClick={info}>
    Static Method
  </Button>
);

export default App;
