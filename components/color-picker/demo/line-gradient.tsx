import React from 'react';
import { ColorPicker } from 'antd';

const Demo = () => (
  <ColorPicker defaultValue="#1677ff" allowClear showText mode={['single', 'gradient']} />
);

export default Demo;
