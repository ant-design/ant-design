import React from 'react';
import { Badge, Divider, Space } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const App: React.FC = () => (
  <>
    <Divider orientation="left">Presets</Divider>
    <Space direction="vertical">
      {colors.map((color) => (
        <Badge key={color} color={color} text={color} />
      ))}
    </Space>
    <Divider orientation="left">Custom</Divider>
    <Space direction="vertical">
      <Badge color="#f50" text="#f50" />
      <Badge color="rgb(45, 183, 245)" text="rgb(45, 183, 245)" />
      <Badge color="hsl(102, 53%, 61%)" text="hsl(102, 53%, 61%)" />
      <Badge color="hwb(205 6% 9%)" text="hwb(205 6% 9%)" />
    </Space>
  </>
);

export default App;
