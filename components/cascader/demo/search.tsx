import React from 'react';
import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disabled?: boolean;
}

const options: Option[] = [
  {
    value: '待实验配置',
    label: '待实验配置',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
        ],
      },
    ],
  },
 {
    value: '已配置实验',
    label: '已配置实验',
    children: [
      {
        value: '自营商品提权实验',
        label: '自营商品提权实验',
        children: [
          {
            value: '策略1',
            label: 'West Lake',
          },
          {
            value: '策略2',
            label: 'Xia Sha',
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    value: '100%',
    label: '100%',
    children: [
        ],
      },
    ],
  },
];

const onChange = (value: string[], selectedOptions: Option[]) => {
  console.log(value, selectedOptions);
};

const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );

const App: React.FC = () => (
  <Cascader
    options={options}
    onChange={onChange}
    placeholder="Please select"
    showSearch={{ filter }}
    onSearch={(value) => console.log(value)}
  />
);

export default App;
