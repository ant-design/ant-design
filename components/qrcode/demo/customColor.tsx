import React, { useState } from 'react';
import { QRCode, Button, Popover } from 'antd';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

const App: React.FC = () => {
  const [color, setColor] = useState<string>('#000');

  const onColorChange = ({ hex }: ColorResult) => {
    setColor(hex);
  };

  return (
    <>
      <QRCode value="https://ant.design/" color={color} style={{ marginBottom: 12 }} />
      <Popover
        trigger="click"
        placement="bottom"
        content={<SketchPicker color={color} onChange={onColorChange} />}
      >
        <Button>Change Color</Button>
      </Popover>
    </>
  );
};

export default App;
