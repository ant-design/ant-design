import { ColorPicker, Space, theme } from 'antd';
import type { Color } from 'antd/lib/color-picker';
import React, { useMemo, useState } from 'react';
export default () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);
  const genColor = useMemo(
    () => (typeof color === 'string' ? color : (color as Color).toHexString()),
    [color],
  );

  const handleChange = (newColor: Color) => {
    setColor(newColor);
  };

  return (
    <ColorPicker value={color} onChange={handleChange}>
      <Space>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: genColor,
          }}
        ></div>
        <span>{genColor}</span>
      </Space>
    </ColorPicker>
  );
};
