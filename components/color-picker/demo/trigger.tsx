import { Button, ColorPicker, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React, { useMemo, useState } from 'react';

const Demo: React.FC = () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  const bgColor = useMemo<string>(
    () => (typeof color === 'string' ? color : color.toHexString()),
    [color],
  );

  const btnStyle: React.CSSProperties = {
    backgroundColor: bgColor,
  };

  return (
    <ColorPicker value={color} onChange={setColor}>
      <Button type="primary" style={btnStyle}>
        open
      </Button>
    </ColorPicker>
  );
};

export default Demo;
