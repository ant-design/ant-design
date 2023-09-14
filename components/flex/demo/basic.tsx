import React from 'react';
import { Flex, Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = React.useState<string>('horizontal');
  return (
    <>
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <br />
      <br />
      <Flex vertical={value === 'vertical'}>
        <div />
        <div />
        <div />
        <div />
      </Flex>
    </>
  );
};

export default App;
