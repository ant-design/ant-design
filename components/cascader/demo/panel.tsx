import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Flex, Switch } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const onMultipleChange: CascaderProps<Option, 'value', true>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Flex vertical gap="small" align="flex-start">
      <Switch
        checked={disabled}
        checkedChildren="Enabled"
        unCheckedChildren="Disabled"
        onChange={setDisabled}
        aria-label="disabled switch"
      />
      <Cascader.Panel options={options} onChange={onChange} disabled={disabled} />
      <Cascader.Panel multiple options={options} onChange={onMultipleChange} disabled={disabled} />
      <Cascader.Panel />
    </Flex>
  );
};

export default App;
