---
order: 2
title:
  zh-CN: 受控的 Checkbox
  en-US: Controlled Checkbox
---

## zh-CN

联动 checkbox。

## en-US

Communicated with other components.

```tsx
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };

  const label = `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}`;

  return (
    <>
      <p style={{ marginBottom: '20px' }}>
        <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
          {label}
        </Checkbox>
      </p>
      <p>
        <Button type="primary" size="small" onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button style={{ margin: '0 10px' }} type="primary" size="small" onClick={toggleDisable}>
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </p>
    </>
  );
};

export default App;
```
