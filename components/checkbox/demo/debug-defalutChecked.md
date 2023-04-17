---
order: 1
title:
  zh-CN: defaultChecked
  en-US: defaultChecked
debug: true
---

## zh-CN

defaultChecked is true

## en-US

defaultChecked is true

```tsx
import { Checkbox } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Checkbox checked={undefined} defaultChecked>
      checked 值为undefined
    </Checkbox>
    <br />
    <Checkbox checked defaultChecked>
      checked 值为 true
    </Checkbox>
  </>
);

export default App;
```
