/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [vertical, setVertical] = React.useState<boolean>(false);
  const onChange = (e: RadioChangeEvent) => {
    setVertical(e.target.value);
  };
  return (
    <>
      <Radio.Group value={vertical} onChange={onChange}>
        {[true, false].map((ver, i) => (
          <Radio key={i} value={ver}>
            vertical is {ver.toString()}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <Flex vertical={vertical}>
        <div />
        <div />
        <div />
        <div />
      </Flex>
    </>
  );
};

export default App;
