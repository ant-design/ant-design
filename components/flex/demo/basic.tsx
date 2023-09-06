import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [direction, setDirection] = React.useState<React.CSSProperties['flexDirection']>('row');
  const onChange = (e: RadioChangeEvent) => {
    setDirection(e.target.value);
  };
  return (
    <>
      <Radio.Group value={direction} onChange={onChange}>
        {['row', 'column'].map((dir) => (
          <Radio key={dir} value={dir}>
            {dir}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <Flex direction={direction}>
        <div />
        <div />
        <div />
        <div />
      </Flex>
    </>
  );
};

export default App;
