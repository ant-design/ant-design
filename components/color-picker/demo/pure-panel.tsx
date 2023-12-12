import React, { useState } from 'react';
import { ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const PureRenderColorPicker = ColorPicker._InternalPanelDoNotUseOrYouWillBeFired;

export default () => {
  const [color, setColor] = useState<ColorPickerProps['value']>('#1677ff');

  return (
    <div style={{ paddingLeft: 100 }}>
      <PureRenderColorPicker value={color} onChange={setColor} />
    </div>
  );
};
