import React, { useState } from 'react';
import { App, ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const Demo = () => {
  const { message } = App.useApp();
  const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff');
  return (
    <App>
      <ColorPicker
        value={value}
        onChangeComplete={(color) => {
          setValue(color);
          message.success(`The selected color is ${color.toHexString()}`);
        }}
      />
    </App>
  );
};

export default Demo;
