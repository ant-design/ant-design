import React from 'react';
import { ConfigProvider, Radio } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { wireframe: true } }}>
    <Radio.Group value={1}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
    <br />
    <Radio.Group value={1} disabled>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  </ConfigProvider>
);

export default App;
