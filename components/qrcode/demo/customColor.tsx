import React, { useState } from 'react';
import { QRCode, Button, Popover, theme } from 'antd';
import type { ColorResult } from 'react-color';
import { SketchPicker } from 'react-color';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();
  const [color, setColor] = useState<string>(token.colorSuccessText);

  const onColorChange = ({ hex }: ColorResult) => {
    setColor(hex);
  };

  return (
    <>
      <QRCode
        value="https://ant.design/"
        color={color}
        style={{ marginBottom: 16, backgroundColor: token.colorBgLayout }}
      />
      <Popover
        trigger="click"
        placement="bottom"
        content={<SketchPicker color={color} onChange={onColorChange} />}
      >
        <Button type="primary">Change Color</Button>
      </Popover>
    </>
  );
};

export default App;
