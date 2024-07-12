import React from 'react';
import { ColorPicker } from 'antd';

// const Demo = () => <ColorPicker defaultValue="#1677ff" />;
const Demo = () => (
  <>
    <input value={631515} />
    <ColorPicker format="hex" />
  </>
);

export default Demo;
