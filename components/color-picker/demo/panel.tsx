import React, { useState } from 'react';
import { ColorPicker, Space } from 'antd';
import type { ColorPickerProps } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff');
  const [css, setCss] = useState('#1677ff');

  const handleChange: ColorPickerProps['onChange'] = (color, nextCss) => {
    setValue(color);
    setCss(nextCss);
  };

  return (
    <Space align="start" wrap>
      <ColorPicker.Panel value={value} onChange={handleChange} />
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 8,
          border: '1px solid rgba(5, 5, 5, 0.06)',
          background: css,
        }}
      />
    </Space>
  );
};

export default Demo;
