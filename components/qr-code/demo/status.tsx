import React from 'react';
import { Flex, QRCode } from 'antd';

const value = 'https://ant.design';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <QRCode value={value} status="loading" />
    <QRCode value={value} status="expired" onRefresh={() => console.log('refresh')} />
    <QRCode value={value} status="scanned" />
  </Flex>
);

export default App;
