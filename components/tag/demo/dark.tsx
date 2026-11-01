import React from 'react';
import { ConfigProvider, Divider, Flex, Tag, theme } from 'antd';

const presets = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const App: React.FC = () => (
  <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
    <Flex vertical gap="small">
      <Divider titlePlacement="left" plain>
        Filled
      </Divider>
      <Flex gap="small" align="center" wrap>
        {presets.map((color) => (
          <Tag key={color} color={color} variant="filled">
            {color}
          </Tag>
        ))}
      </Flex>
      <Divider titlePlacement="left" plain>
        Solid
      </Divider>
      <Flex gap="small" align="center" wrap>
        {presets.map((color) => (
          <Tag key={color} color={color} variant="solid">
            {color}
          </Tag>
        ))}
      </Flex>
      <Divider titlePlacement="left" plain>
        Outlined
      </Divider>
      <Flex gap="small" align="center" wrap>
        {presets.map((color) => (
          <Tag key={color} color={color} variant="outlined">
            {color}
          </Tag>
        ))}
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
