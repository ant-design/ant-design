import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxOptionType, GetProp } from 'antd';

const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
  console.log('checked = ', checkedValues);
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

const options: CheckboxOptionType<string>[] = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', className: 'label-3' },
];

const optionsWithDisabled: CheckboxOptionType<string>[] = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', className: 'label-3', disabled: false },
];

const App: React.FC = () => (
  <>
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group
      options={optionsWithDisabled}
      disabled
      defaultValue={['Apple']}
      onChange={onChange}
    />
  </>
);

export default App;
