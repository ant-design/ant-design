---
order: 999
title:
  zh-CN: 控制弹框动画原点
  en-US: control modal's animation origin position
debug: true
---

## zh-CN

通过 `mousePosition` 控制弹框动画原点.

## en-US

pass `mousePosition` to control modal's animation origin position

```tsx
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title="Basic Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        mousePosition={{ x: 300, y: 300 }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default App;
```
