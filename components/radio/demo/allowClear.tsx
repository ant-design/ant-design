import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

const App: React.FC = () => {
  const [value1, setValue1] = useState<string | undefined>('Apple');
  const [value2, setValue2] = useState<string | undefined>('Apple');
  const [value3, setValue3] = useState<string | undefined>('Apple');

  const onChange1 = (e: RadioChangeEvent) => {
    console.log('radio1 checked', e.target.value);
    setValue1(e.target.value);
  };

  const onChange2 = (e: RadioChangeEvent) => {
    console.log('radio2 checked', e.target.value);
    setValue2(e.target.value);
  };

  const onChange3 = (e: RadioChangeEvent) => {
    console.log('radio3 checked', e.target.value);
    setValue3(e.target.value);
  };

  return (
    <Flex vertical gap="middle">
      <Radio.Group onChange={onChange1} value={value1} allowClear>
        <Radio value="Apple">Apple</Radio>
        <Radio value="Pear">Pear</Radio>
        <Radio value="Orange">Orange</Radio>
      </Radio.Group>
      <Radio.Group onChange={onChange2} value={value2} allowClear optionType="button">
        <Radio.Button value="Apple">Apple</Radio.Button>
        <Radio.Button value="Pear">Pear</Radio.Button>
        <Radio.Button value="Orange">Orange</Radio.Button>
      </Radio.Group>
      <Radio.Group
        onChange={onChange3}
        value={value3}
        allowClear
        optionType="button"
        buttonStyle="solid"
      >
        <Radio.Button value="Apple">Apple</Radio.Button>
        <Radio.Button value="Pear">Pear</Radio.Button>
        <Radio.Button value="Orange">Orange</Radio.Button>
      </Radio.Group>
    </Flex>
  );
};

export default App;
