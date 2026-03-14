import React from 'react';
import { ColorPicker } from 'antd';

const Demo: React.FC = () => {
  const [color, setColor] = React.useState<string>('#1677ff');
  return (
    <ColorPicker
      value={color}
      allowClear
      onChange={(c) => {
        setColor(c.toHexString());
      }}
    />
  );
};

export default Demo;
