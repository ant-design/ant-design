---
order: 7
title:
  zh-CN: 自定义位置
  en-US: To customize the position of modal
---

## zh-CN

使用 `centered` 或类似 `style.top` 的样式来设置对话框位置。

## en-US

You can use `centered`,`style.top` or other styles to set position of modal dialog.

```tsx
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModal1Visible(true)}>
        Display a modal dialog at 20px to Top
      </Button>
      <Modal
        title="20px to Top"
        style={{ top: 20 }}
        visible={modal1Visible}
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <br />
      <br />
      <Button type="primary" onClick={() => setModal2Visible(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
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
