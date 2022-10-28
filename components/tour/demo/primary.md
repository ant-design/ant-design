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
import React, { useState } from 'react';
import { Button, Space, Tour } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = useState(-1);

  const onChange = (nextCurrent: number) => {
    setCurrent(nextCurrent);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button
          type="primary"
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
        onChange={onChange}
        onClose={onClose}
        onFinish={onClose}
        type="primary"
        steps={new Array(3).fill(null).map((_, index) => {
          const id = index + 1;
          return {
            title: `Title ${id}`,
            description: `description ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;
```
