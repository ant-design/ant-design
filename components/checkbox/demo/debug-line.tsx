import React from 'react';
import { Checkbox, ConfigProvider, Radio, Space } from 'antd';

const sharedStyle: React.CSSProperties = {
  border: '1px solid red',
  marginBottom: 16,
};

const App: React.FC = () => (
  <div>
    <Space style={sharedStyle} align="center">
      <Checkbox value="light" />
      <div>Bamboo</div>
      <Checkbox value="little">Little</Checkbox>
    </Space>

    <Space style={sharedStyle} align="center">
      <Radio value="light" />
      <div>Bamboo</div>
      <Radio value="little">Little</Radio>
    </Space>

    <div
      style={{
        ...sharedStyle,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Checkbox value="light" />
      <div>Bamboo</div>
      <Checkbox value="little">Little</Checkbox>
    </div>

    <div
      style={{
        ...sharedStyle,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Radio value="light" />
      <div>Bamboo</div>
      <Radio value="little">Little</Radio>
    </div>

    <div>
      <ConfigProvider
        theme={{
          token: {
            controlHeight: 48,
          },
        }}
      >
        <Checkbox>Aligned</Checkbox>
      </ConfigProvider>
    </div>

    <div>
      <Checkbox>
        <span style={{ fontSize: 32 }}>Aligned</span>
      </Checkbox>
    </div>
  </div>
);

export default App;
