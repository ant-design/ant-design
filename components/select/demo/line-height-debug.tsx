import React from 'react';
import { ConfigProvider, Flex, Select } from 'antd';

const options = [{ value: 'light', label: 'Light' }];

const selectStyle: React.CSSProperties = { width: 200 };

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { lineHeight: 2 } }}>
    <Flex gap="small" align="start">
      <Select style={selectStyle} defaultValue="light" options={options} />
      <Select style={selectStyle} mode="multiple" defaultValue={['light']} options={options} />
    </Flex>
  </ConfigProvider>
);

export default App;
