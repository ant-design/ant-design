import { ColorPicker, theme } from 'antd';
import type { Color } from 'antd/lib/color-picker';
import React, { useState } from 'react';

const PureRenderColorPicker = ColorPicker._InternalPanelDoNotUseOrYouWillBeFired;

export default () => {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color | string>(token.colorPrimary);

  return <PureRenderColorPicker value={color} onChange={setColor} />;
};
