import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { ColorPicker, Space, theme } from 'antd';

const Demo = () => {
  const [open, setOpen] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Space direction="vertical">
      <ColorPicker defaultValue={colorPrimary} showText />
      <ColorPicker
        defaultValue={colorPrimary}
        showText={(color) => <span>Custom Text ({color.toHexString()})</span>}
      />
      <ColorPicker
        defaultValue={colorPrimary}
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
