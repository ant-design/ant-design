import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';

const PureRenderColorPicker = ColorPicker._InternalPanelDoNotUseOrYouWillBeFired;

export default () => {
  const [color, setColor] = useState<Color | string>('#1677ff');

  return (
    <div style={{ paddingLeft: 100 }}>
      <PureRenderColorPicker value={color} onChange={setColor} />
    </div>
  );
};
