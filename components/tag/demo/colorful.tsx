import React from 'react';
import { Divider, Flex, Tag } from 'antd';

const variants = ['filled', 'solid', 'outlined'] as const;
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
const customs = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const App: React.FC = () => (
  <>
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Presets ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {presets.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Custom ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {customs.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
  </>
);

export default App;
