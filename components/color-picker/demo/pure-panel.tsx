import React, { useState } from 'react';
import { ColorPicker, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';

const PureRenderColorPicker = ColorPicker._InternalPanelDoNotUseOrYouWillBeFired;

export default () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  return (
    <div style={{ paddingLeft: 100 }}>
      <PureRenderColorPicker value={color} onChange={setColor} />
    </div>
  );
};
