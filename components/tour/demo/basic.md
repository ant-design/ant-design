---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```tsx
import React, { useRef, useState, useEffect } from 'react';
import { Button, Space, Tour } from 'antd';

const App: React.FC = () => {
  const coverBtnRef = useRef(null);
  const placementBtnRef = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Show
        </Button>
        <Button disabled ref={coverBtnRef}>
          Cover
        </Button>
        <Button disabled ref={placementBtnRef}>
          Placement
        </Button>
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Show in Center',
            description: 'Here is the content of Tour.',
            target: null,
          },
          {
            title: 'With Cover',
            description: 'Here is the content of Tour.',
            target: () => coverBtnRef.current,
            cover: (
              <img
                alt="tour.png"
                src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
              />
            ),
          },
          {
            title: 'Adjust Placement',
            description: 'Here is the content of Tour which show on the right.',
            placement: 'right',
            target: () => placementBtnRef.current,
          },
        ]}
      />
    </>
  );
};

export default App;
```
