import React from 'react';
import { ConfigProvider, Pagination } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { wireframe: true } }}>
    <Pagination showSizeChanger defaultCurrent={3} total={500} />
    <br />
    <Pagination showSizeChanger defaultCurrent={3} total={500} disabled />
  </ConfigProvider>
);

export default App;
