import { ConfigProvider, FloatButton, Slider } from 'antd';
import type { AliasToken } from 'antd/es/theme/interface';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [radius, setRadius] = useState<number>(0);

  const token: Partial<AliasToken> = {
    borderRadius: radius,
  };

  return (
    <>
      <Slider min={0} max={20} style={{ margin: 16 }} onChange={setRadius} />
      <ConfigProvider theme={{ token }}>
        <FloatButton shape="square" badge={{ dot: true }} />
      </ConfigProvider>
    </>
  );
};

export default App;
