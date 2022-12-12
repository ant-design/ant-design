import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { ConfigProvider, Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <ConfigProvider theme={{ components: { Radio: { fontSizeLG: 24, fontSize: 16 } } }}>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    </ConfigProvider>
  );
};

export default App;
