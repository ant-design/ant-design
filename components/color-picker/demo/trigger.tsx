import { ColorPicker, Space, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React, { useMemo, useState } from 'react';

export default () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  const bgColor = useMemo<string>(
    () => (typeof color === 'string' ? color : color.toHexString()),
    [color],
  );

  const divStyle: React.CSSProperties = {
    width: token.sizeMD,
    height: token.sizeMD,
    borderRadius: token.borderRadiusSM,
    backgroundColor: bgColor,
  };

  return (
    <ColorPicker value={color} onChange={setColor}>
      <Space>
        <div style={divStyle} />
        <span>{bgColor}</span>
      </Space>
    </ColorPicker>
  );
};
