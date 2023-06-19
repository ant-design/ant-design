import { ColorPicker } from 'antd';
import React from 'react';

const Demo = () => <ColorPicker textRender={(color) => color.toHexString()} />;

export default Demo;
