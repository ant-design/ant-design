import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import React, { useState } from 'react';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple', name: 'group1' },
  { label: 'Pear', value: 'Pear', name: 'group1' },
  { label: 'Orange', value: 'Orange', name: 'group1' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple', name: 'group2' },
  { label: 'Pear', value: 'Pear', name: 'group2' },
  { label: 'Orange', value: 'Orange', name: 'group2', disabled: true },
];

const optionsWithDisabledForButtonRadio = [
  { label: 'Apple', value: 'Apple', name: 'group3' },
  { label: 'Pear', value: 'Pear', name: 'group3' },
  { label: 'Orange', value: 'Orange', name: 'group3', disabled: true },
];

const App: React.FC = () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Apple');
  const [value3, setValue3] = useState('Apple');
  const [value4, setValue4] = useState('Apple');

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value);
    setValue4(value);
  };

  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br />
      <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabledForButtonRadio}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
};

export default App;
