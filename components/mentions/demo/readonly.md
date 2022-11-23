---
order: 4
title:
  zh-CN: 无效或只读
  en-US: disabled or readOnly
---

## zh-CN

通过 `disabled` 属性设置是否生效。通过 `readOnly` 属性设置是否只读。

## en-US

Configurate `disabled` and `readOnly`.

```tsx
import React from 'react';
import { Mentions } from 'antd';

const options = ['afc163', 'zombiej', 'yesmeck'].map(value => ({
  value,
  key: value,
  label: value,
}));

const App: React.FC = () => (
  <>
    <div style={{ marginBottom: 10 }}>
      <Mentions
        style={{ width: '100%' }}
        placeholder="this is disabled Mentions"
        disabled
        options={options}
      />
    </div>
    <Mentions
      style={{ width: '100%' }}
      placeholder="this is readOnly Mentions"
      readOnly
      options={options}
    />
  </>
);

export default App;
```
