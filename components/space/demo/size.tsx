import React, { useState } from 'react';
import { Button, Radio, Space } from 'antd';
import type { SpaceSize } from 'antd/es/space';

const App: React.FC = () => {
  const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>('small');

  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio value="small">Small</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="large">Large</Radio>
      </Radio.Group>
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
