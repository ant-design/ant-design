---
order: 23
title:
  zh-CN: 大数据
  en-US: Big Data
---

## zh-CN

Select 使用了[虚拟滚动](https://github.com/react-component/virtual-list)技术，因而获得了比 (https://codesandbox.io/s/beautiful-banzai-m72lv)。

## en-US

Select use [virtual scroll](https://github.com/react-component/virtual-list) which get better performance (https://codesandbox.io/s/beautiful-banzai-m72lv).

```jsx
import { Select, Typography } from '@allenai/varnish';

const { Title } = Typography;

const options = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10,
  });
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <>
    <Title level={4}>{options.length} Items</Title>
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />
  </>,
  mountNode,
);
```
