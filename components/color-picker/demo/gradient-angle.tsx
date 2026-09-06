import React from 'react';
import { ColorPicker } from 'antd';

const DEFAULT_COLOR = {
  angle: 135,
  colors: [
    {
      color: 'rgb(16, 142, 233)',
      percent: 0,
    },
    {
      color: 'rgb(135, 208, 104)',
      percent: 100,
    },
  ],
};

const Demo = () => (
  <ColorPicker
    defaultValue={DEFAULT_COLOR}
    mode="gradient"
    showGradientAngle
    onChangeComplete={(color) => {
      console.log(color.toCssString());
    }}
  />
);

export default Demo;
