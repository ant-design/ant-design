import React from 'react';
import type { CascaderAutoProps, CascaderProps } from 'antd';
import { Cascader } from 'antd';
import type { DefaultOptionType } from 'rc-cascader';

interface Option {
  value: string;
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

function MyCascader<
  OptionType extends DefaultOptionType = DefaultOptionType,
  ValueField extends keyof OptionType = keyof OptionType,
>(props: CascaderAutoProps<OptionType, ValueField>) {
  return <Cascader {...props} />;
}

const App: React.FC = () => (
  <MyCascader options={options} onChange={onChange} placeholder="Please select" />
);

export default App;
