---
order: 8
title:
  zh-CN: 搜索
  en-US: Search
---

## zh-CN

可以直接搜索选项并选择。

> `Cascader[showSearch]` 暂不支持服务端搜索，更多信息见 [#5547](https://github.com/ant-design/ant-design/issues/5547)

## en-US

Search and select options directly.

> Now, `Cascader[showSearch]` doesn't support search on server, more info [#5547](https://github.com/ant-design/ant-design/issues/5547)

```tsx
import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import React from 'react';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  disabled?: boolean;
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
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
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
            label: 'Zhong Hua men',
          },
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
    option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );

const App: React.FC = () => (
  <Cascader
    options={options}
    onChange={onChange}
    placeholder="Please select"
    showSearch={{ filter }}
    onSearch={value => console.log(value)}
  />
);

export default App;
```
