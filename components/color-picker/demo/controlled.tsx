import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const Demo: React.FC = () => {
  const [color, setColor] = useState<ColorPickerProps['value']>('#1677ff');
  return <ColorPicker value={color} onChange={setColor} />;
};

export default Demo;
