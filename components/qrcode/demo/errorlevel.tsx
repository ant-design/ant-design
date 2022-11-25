import React, { useState } from 'react';
import { Segmented, QRCode } from 'antd';

const App: React.FC = () => {
  const [level, setLevel] = useState<string | number>('L');
  return (
    <>
      <QRCode style={{ marginBottom: 16 }} errorLevel={level} value="https://ant.design/" />
      <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
    </>
  );
};

export default App;
