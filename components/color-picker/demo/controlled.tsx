import React, { useState } from 'react';
import { ColorPicker, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';

const Demo: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  return <ColorPicker value={color} onChange={setColor} />;
};

export default Demo;
