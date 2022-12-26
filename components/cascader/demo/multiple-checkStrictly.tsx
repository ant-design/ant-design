import React, { useState } from 'react';
import { Cascader, Checkbox } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20)
      .fill(null)
      .map((_, index) => ({ label: `Number ${index}`, value: index })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];

const onChange = (value: string[][]) => {
  console.log(value);
};

const App: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <Checkbox checked={checked} onChange={(e) => setChecked(e?.target?.checked)}>
          Enable checkStrictly
        </Checkbox>
      </div>
      <Cascader
        style={{ width: '100%' }}
        multiple={{ checkStrictly: checked }}
        options={options}
        onChange={onChange}
        maxTagCount="responsive"
      />
    </>
  );
};

export default App;
