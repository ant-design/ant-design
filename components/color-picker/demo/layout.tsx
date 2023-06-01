import { ColorPicker, Segmented, Space } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';
import React, { useState } from 'react';

const Demo = () => {
  const [layout, setLayout] = useState<ColorPickerProps['layout']>('horizontal');
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical" size="middle">
      <Segmented
        value={layout}
        options={['horizontal', 'vertical']}
        onChange={(value) => {
          setOpen(true);
          setLayout(value as ColorPickerProps['layout']);
        }}
      />
      <ColorPicker
        layout={layout}
        open={open}
        onOpenChange={setOpen}
        presets={[
          {
            label: 'Recommended',
            colors: [
              '#000000',
              '#000000E0',
              '#000000A6',
              '#00000073',
              '#00000040',
              '#00000026',
              '#0000001A',
              '#00000012',
              '#0000000A',
              '#00000005',
              '#F5222D',
              '#FA8C16',
              '#FADB14',
              '#8BBB11',
              '#52C41A',
              '#13A8A8',
              '#1677FF',
              '#2F54EB',
              '#722ED1',
              '#EB2F96',
              '#F5222D4D',
              '#FA8C164D',
              '#FADB144D',
              '#8BBB114D',
              '#52C41A4D',
              '#13A8A84D',
              '#1677FF4D',
              '#2F54EB4D',
              '#722ED14D',
              '#EB2F964D',
            ],
          },
          {
            label: 'Recent',
            colors: ['#F5222D', '#FA8C16', '#FADB14'],
          },
        ]}
        allowClear
      />
    </Space>
  );
};

export default Demo;
