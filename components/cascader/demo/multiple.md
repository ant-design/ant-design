---
order: 5.1
version: 4.17.0
title:
  zh-CN: 多选
  en-US: Multiple
---

## zh-CN

一次性选择多个选项。

## en-US

Select multiple options

```jsx
import { Cascader } from 'antd';

const options = [
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

const App = () => {
  const onChange = value => {
    console.log(value);
  };
  return (
    <Cascader
      style={{ width: '100%' }}
      options={options}
      onChange={onChange}
      multiple
      maxTagCount="responsive"
    />
  );
};

ReactDOM.render(<App />, mountNode);
```
