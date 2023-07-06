import { App, ColorPicker } from 'antd';
import React from 'react';

const Demo = () => {
  const { message } = App.useApp();
  return (
    <App>
      <ColorPicker
        onChangeComplete={(color) =>
          message.success(`The selected color is ${color.toHexString()}`)
        }
      />
    </App>
  );
};

export default Demo;
