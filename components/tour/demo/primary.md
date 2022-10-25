---
order: 0
title:
  zh-CN: Primary主题模式
  en-US: Primary
---

## zh-CN

Primary 主题模式。

## en-US

Primary theme mode.

```tsx
import React, { useRef, useState } from 'react';
import { Button, Space, Tour } from 'antd';

const App: React.FC = () => {
  const showBtnRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = useState(-1);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button
          type="primary"
          ref={showBtnRef}
          onClick={() => {
            setCurrent(0);
            setOpen(true);
          }}
        >
          Show
        </Button>
      </Space>

      <Tour
        open={open}
        current={current}
        onClose={onClose}
        onFinish={onClose}
        type="primary"
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => showBtnRef.current,
          },
        ]}
      />
    </>
  );
};

export default App;
```
