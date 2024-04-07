import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

const colors = ['#6253E1', '#04BEFE'];
const hovers = colors.map((color) => new TinyColor(color).lighten(5).toString());
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const hovers2 = colors2.map((color) => new TinyColor(color).lighten(5).toString());
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const hovers3 = colors3.map((color) => new TinyColor(color).lighten(5).toString());

const App: React.FC = () => (
  <Space>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${hovers.join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large">
        Gradient 1
      </Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(90deg,  ${colors2.join(', ')})`,
            colorPrimaryHover: `linear-gradient(90deg, ${hovers2.join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large">
        Gradient 2
      </Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
            colorPrimaryHover: `linear-gradient(116deg, ${hovers3.join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large">
        Gradient 3
      </Button>
    </ConfigProvider>
  </Space>
);

export default App;
