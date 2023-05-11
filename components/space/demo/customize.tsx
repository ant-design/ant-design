import React, { useState } from 'react';
import { Button, Slider, Space } from 'antd';

const App: React.FC = () => {
  const [size, setSize] = useState(8);

  return (
    <>
      <Slider value={size} onChange={(value) => setSize(value)} />
      <br />
      <br />
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
};

export default App;
