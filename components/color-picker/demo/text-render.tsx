import { ColorPicker, Select, Space } from 'antd';
import type { ColorPickerProps } from 'antd/es/color-picker';
import React, { useRef, useState } from 'react';

const { Option } = Select;
const COLOR_PRESETS = ['#1677ff', '#f1d76f', '#b4ff16', '#ea16ff'];

const Demo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ColorPickerProps['value']>('#1677ff');
  const popupOpenRef = useRef(true);

  return (
    <Space direction="vertical">
      <ColorPicker showText />
      <ColorPicker showText={(color) => <span>Custom Text ({color.toHexString()})</span>} />
      <ColorPicker
        open={open}
        value={value}
        onChange={setValue}
        onOpenChange={(visible) => {
          if (popupOpenRef.current) {
            setOpen(visible);
          }
        }}
        showText={(color) => (
          <Select
            value={color.toHexString()}
            bordered={false}
            onMouseEnter={() => {
              popupOpenRef.current = false;
            }}
            onMouseLeave={() => {
              popupOpenRef.current = true;
            }}
            onDropdownVisibleChange={() => {
              if (open) {
                setOpen(false);
              }
            }}
            onChange={setValue}
          >
            {COLOR_PRESETS.map((preset) => (
              <Option value={preset.toUpperCase()} key={preset}>
                <div style={{ backgroundColor: preset, height: 20, width: 100 }} />
              </Option>
            ))}
          </Select>
        )}
      />
    </Space>
  );
};

export default Demo;
