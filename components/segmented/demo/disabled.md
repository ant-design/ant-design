---
order: 0
title:
  zh-CN: 不可用
  en-US: Basic
---

## zh-CN

Segmented 不可用。

## en-US

Disabled Segmented.

```jsx
import { Segmented } from 'antd';

ReactDOM.render(
  <>
    <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
    <br />
    <Segmented
      options={[
        'Daily',
        { label: 'Weekly', value: 'Weekly', disabled: true },
        'Monthly',
        { label: 'Quarterly', value: 'Quarterly', disabled: true },
        'Yearly',
      ]}
    />
  </>,
  mountNode,
);
```
