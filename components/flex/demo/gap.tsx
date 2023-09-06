import React from 'react';
import { Button, Flex, Radio, Slider } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
  const [gapSize, setGapSize] = React.useState<SizeType | number | 'customize'>('small');

  const [showSlider, setShowSlider] = React.useState<boolean>(gapSize === 'customize');

  return (
    <>
      <Radio.Group
        value={gapSize}
        onChange={(e) => {
          setGapSize(e.target.value);
          setShowSlider(e.target.value === 'customize');
        }}
      >
        {['small', 'middle', 'large', 'customize'].map((size) => (
          <Radio key={size} value={size}>
            {size}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      {showSlider && (
        <>
          <Slider value={typeof gapSize === 'number' ? gapSize : 0} onChange={setGapSize} />
          <br />
        </>
      )}
      <Flex gap={gapSize}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </>
  );
};

export default App;
