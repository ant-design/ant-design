import { ConfigProvider, Image } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider image={{ className: 'config-provider-image', style: { backgroundColor: 'red' } }}>
    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
  </ConfigProvider>
);

export default App;
