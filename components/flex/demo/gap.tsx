import React from 'react';
import { Button, Flex, Radio, Slider } from 'antd';

import type { FlexProps } from '../interface';

const App: React.FC = () => {
  const [gapSize, setGapSize] = React.useState<FlexProps['gap']>('small');
  const [customGapSize, setCustomGapSize] = React.useState<number>(0);
  return (
    <Flex gap="middle" vertical>
      <Radio.Group value={gapSize} onChange={(e) => setGapSize(e.target.value)}>
        {['small', 'middle', 'large', 'customize'].map((size) => (
          <Radio key={size} value={size}>
            {size}
          </Radio>
        ))}
      </Radio.Group>
      {gapSize === 'customize' && <Slider value={customGapSize} onChange={setCustomGapSize} />}
      <Flex gap={gapSize !== 'customize' ? gapSize : customGapSize}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </Flex>
  );
};

export default App;
