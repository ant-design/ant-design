---
order: 2
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

export default () => (
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
  </>
);
```
