import { DownOutlined } from '@ant-design/icons';
import { ColorPicker, Space } from 'antd';
import React, { useState } from 'react';

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <ColorPicker showText />
      <ColorPicker showText={(color) => <span>Custom Text ({color.toHexString()})</span>} />
      <ColorPicker
        open={open}
        onOpenChange={setOpen}
        showText={() => (
          <DownOutlined
            rotate={open ? 180 : 0}
            style={{
              color: 'rgba(0, 0, 0, 0.25)',
            }}
          />
        )}
      />
    </Space>
  );
};

export default Demo;
