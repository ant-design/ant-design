---
order: 2
title:
  zh-CN: 文案展现
  en-US: Show copywriting
---

## zh-CN

给评分组件加上文案展示。

## en-US

Add copywriting in rate components.

```jsx
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default () => {
  const [value, setValue] = React.useState(3);

  const handleChange = rateValue => {
    setValue(rateValue);
  };

  return (
    <span>
      <Rate tooltips={desc} onChange={handleChange} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
  );
};
```
