import React, { useState } from 'react';
import { ColorPicker, theme } from 'antd';
import type { GetProp } from 'antd';

type Color = GetProp<typeof ColorPicker, 'value'>;

const Demo: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  return <ColorPicker value={color} onChange={setColor} />;
};

export default Demo;
