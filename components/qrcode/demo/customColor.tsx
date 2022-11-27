import React, { useState } from 'react';
import { QRCode, Button, Popover, Space } from 'antd';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

const App: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#fff');
  const [fgColor, setFgColor] = useState<string>('#000');

  const onBgColorChange = ({ hex }: ColorResult) => {
    setBgColor(hex);
  };

  const onFgColorChange = ({ hex }: ColorResult) => {
    setFgColor(hex);
  };

  return (
    <>
      <QRCode
        value="https://ant.design/"
        bgColor={bgColor}
        fgColor={fgColor}
        style={{ marginBottom: 16 }}
      />
      <Space>
        <Popover
          trigger="click"
          placement="bottom"
          content={<SketchPicker color={bgColor} onChange={onBgColorChange} />}
        >
          <Button>Background Color</Button>
        </Popover>
        <Popover
          trigger="click"
          placement="bottom"
          content={<SketchPicker color={fgColor} onChange={onFgColorChange} />}
        >
          <Button>Foreground Color</Button>
        </Popover>
      </Space>
    </>
  );
};

export default App;
