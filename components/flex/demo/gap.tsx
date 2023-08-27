import React from 'react';
import { Button, Flex, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
  const [gap, setGap] = React.useState<SizeType>('small');
  return (
    <>
      <Radio.Group value={gap} onChange={(e) => setGap(e.target.value)}>
        {['small', 'middle', 'large'].map((item) => (
          <Radio key={item} value={item}>
            {item}
          </Radio>
        ))}
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
