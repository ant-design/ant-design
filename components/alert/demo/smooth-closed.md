---
order: 7
title:
  zh-CN: 平滑地卸载
  en-US: Smoothly Unmount
---

## zh-CN

平滑、自然的卸载提示。

## en-US

Smoothly unmount Alert upon close.

```tsx
import React, { useState } from 'react';
import { Alert } from 'antd';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div>
      {visible ? (
        <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />
      ) : null}
      <p>placeholder text here</p>
    </div>
  );
};

ReactDOM.render(<App />, mountNode);
```
