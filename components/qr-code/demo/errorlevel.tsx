import React, { useState } from 'react';
import { Radio, QrCode } from 'antd';

const App: React.FC = () => {
  const [level, setLevel] = useState<string>('L');
  return (
    <>
      <Radio.Group value={level} onChange={(e) => setLevel(e.target.value)}>
        <Radio.Button value="L">L</Radio.Button>
        <Radio.Button value="M">M</Radio.Button>
        <Radio.Button value="Q">Q</Radio.Button>
        <Radio.Button value="H">H</Radio.Button>
      </Radio.Group>
      <QrCode
        style={{ marginTop: 16 }}
        mode="svg"
        errorLevel={level}
        value="https://ant.design/"
        logo="https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg"
      />
    </>
  );
};

export default App;
