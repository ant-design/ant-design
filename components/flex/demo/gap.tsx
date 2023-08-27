import React, { useState } from 'react';
import { Button, Flex, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
  const [gap, setGap] = useState<SizeType>('small');
  return (
    <>
      <Radio.Group value={gap} onChange={(e) => setGap(e.target.value)}>
        <Radio value="small">small</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Flex gap={gap}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </>
  );
};

export default App;
