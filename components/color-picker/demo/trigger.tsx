import React, { useMemo, useState } from 'react';
import { Button, ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const Demo: React.FC = () => {
  const [color, setColor] = useState<ColorPickerProps['value']>('#1677ff');

  const bgColor = useMemo<string>(
    () => (typeof color === 'string' ? color : color!.toHexString()),
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
