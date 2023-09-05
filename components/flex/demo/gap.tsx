import React from 'react';
import { Button, Flex, Radio, Slider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
  const [gapSize, setGapSize] = React.useState<SizeType | number>('small');

  const onChange = (e: RadioChangeEvent) => {
    setGapSize(e.target.value);
  };

  const sliderValue = React.useMemo<number>(() => {
    switch (gapSize) {
      case 'small':
        return 8;
      case 'middle':
        return 16;
      case 'large':
        return 24;
      default:
        return gapSize || 0;
    }
  }, [gapSize]);

  return (
    <>
      <p>Select gap :</p>
      <br />
      <Radio.Group value={gapSize} onChange={onChange}>
        {['small', 'middle', 'large'].map((size) => (
          <Radio key={size} value={size}>
            {size}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <p>Custom gap :</p>
      <br />
      <Slider value={sliderValue} onChange={setGapSize} />
      <br />
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
