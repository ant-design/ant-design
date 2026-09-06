import React from 'react';
import { ConfigProvider, Flex, Select } from 'antd';

const options = [{ value: 'light', label: 'Light' }];

const selectStyle: React.CSSProperties = { width: 180 };

const App: React.FC = () => (
  <Flex gap="small" align="start" wrap>
    <ConfigProvider theme={{ token: { lineHeight: 2 } }}>
      <Select style={selectStyle} defaultValue="light" options={options} />
      <Select style={selectStyle} mode="multiple" defaultValue={['light']} options={options} />
      <Select style={selectStyle} size="small" defaultValue="light" options={options} />
      <Select
        style={selectStyle}
        size="small"
        mode="multiple"
        defaultValue={['light']}
        options={options}
      />
    </ConfigProvider>
    <ConfigProvider theme={{ token: { lineHeightLG: 2 } }}>
      <Select style={selectStyle} size="large" defaultValue="light" options={options} />
      <Select
        style={selectStyle}
        size="large"
        mode="multiple"
        defaultValue={['light']}
        options={options}
      />
    </ConfigProvider>
    <ConfigProvider theme={{ components: { Select: { lineHeight: 2 } } }}>
      <Select style={selectStyle} defaultValue="light" options={options} />
    </ConfigProvider>
  </Flex>
);

export default App;
