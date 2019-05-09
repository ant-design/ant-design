---
order: 11
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

省市区级联。

## en-US

Cascade selection box for selecting province/city/district.

```jsx
import { Cascader, Icon } from 'antd';

const options = [
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

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <div>
    <Cascader
      suffixIcon={<Icon type="smile" />}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
    <Cascader
      suffixIcon="ab"
      style={{ marginTop: '1rem' }}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    />
  </div>,
  mountNode,
);
```
