import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { QRCode, Button } from 'antd';

const App: React.FC = () => {
  const [size, setSize] = useState<number>(128);

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 16;
      if (newSize > 256) {
        return 256;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 16;
      if (newSize < 16) {
        return 16;
      }
      return newSize;
    });
  };

  return (
    <>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button onClick={decline} disabled={size <= 16} icon={<MinusOutlined />}>
          Smaller
        </Button>
        <Button onClick={increase} disabled={size >= 256} icon={<PlusOutlined />}>
          Larger
        </Button>
      </Button.Group>
      <QRCode
        size={size}
        iconSize={size / 4}
        value="https://ant.design/"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </>
  );
};

export default App;
