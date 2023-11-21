import React, { useState } from 'react';
import { App, ColorPicker, theme } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';

const Demo = () => {
  const { message } = App.useApp();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [value, setValue] = useState<ColorPickerProps['value']>(colorPrimary);
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
