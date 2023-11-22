import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';

const Demo: React.FC = () => {
  const [color, setColor] = useState<Color | string>('#1677ff');
  return <ColorPicker value={color} onChange={setColor} />;
};

export default Demo;
