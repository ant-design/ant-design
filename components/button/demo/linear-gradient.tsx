import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const App: React.FC = () => (
  <Space>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
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
            colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
            colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
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
            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
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
