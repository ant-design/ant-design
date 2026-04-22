import React from 'react';
import { Button, Divider, Space, TextTooltip } from 'antd';

const presetColors = ['pink', 'red', 'orange', 'cyan', 'green', 'blue', 'purple'] as const;
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Preset</Divider>
    <Space wrap>
      {presetColors.map((color) => (
        <TextTooltip key={color} title={`Preset color: ${color}`} color={color}>
          <Button>{color}</Button>
        </TextTooltip>
      ))}
    </Space>
    <Divider titlePlacement="start">Custom</Divider>
    <Space wrap>
      {customColors.map((color) => (
        <TextTooltip key={color} title={`Custom color: ${color}`} color={color}>
          <Button>{color}</Button>
        </TextTooltip>
      ))}
    </Space>
  </>
);

export default App;
