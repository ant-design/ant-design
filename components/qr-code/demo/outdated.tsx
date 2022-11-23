import React from 'react';
import { QrCode } from 'antd';

const App: React.FC = () => (
  <QrCode value="https://ant.design/" expired onRefresh={() => console.log('已刷新')} />
);

export default App;
