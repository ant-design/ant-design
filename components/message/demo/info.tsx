import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider iconPrefixCls="aaaa" prefixCls="bbb">
    <ExclamationCircleFilled />
    <Button>aaaa</Button>
  </ConfigProvider>
);

export default App;
