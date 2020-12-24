---
order: 99
title:
  zh-CN: 响应式
  en-US: Responsive
only: true
---

## zh-CN

多选下的响应式布局。

## en-US

Responsive for multiple.

```tsx
import { Select } from 'antd';

const options: {
  label: string;
  value: string;
}[] = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}

ReactDOM.render(
  <>
    {/*<Select
      mode="multiple"
      style={{ width: '100%' }}
      defaultValue={['a10', 'c12']}
      options={options}
      placeholder="Select Item..."
      maxTagCount="responsive"
    />*/}

    <br />

    <Select
      open
      mode="multiple"
      style={{ width: '100%' }}
      defaultValue={[]}
      options={options}
      placeholder="Select Item..."
      maxTagCount="responsive"
    />
  </>,
  mountNode,
);
```
