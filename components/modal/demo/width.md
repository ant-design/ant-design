---
order: 13
title:
  zh-CN: 自定义模态的宽度
  en-US: To customize the width of modal
---

## zh-CN

使用 `width` 来设置模态对话框的宽度。

## en-US

Use `width` to set the width of the modal dialog.

```tsx
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default App;
```
