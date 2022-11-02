---
order: 0
title:
  zh-CN: 非模态
  en-US: Non-modal
---

## zh-CN

使用 `mask={false}` 可以将引导变为非模态，同时为了强调引导本身，建议与 `type="primary"` 组合使用。

## en-US

Use `mask={false}` to make Tour non-modal. At the meantime it is recommended to use with `type="primary"` to emphasize the guide itself.

```tsx
import React, { useRef, useState, useEffect } from 'react';
import { Button, Space, Tour } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

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
        <Button disabled ref={ref1}>
          Step 1
        </Button>
        <Button disabled ref={ref2}>
          Step 2
        </Button>
        <Button disabled ref={ref3}>
          Step 3
        </Button>
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        mask={false}
        type="primary"
        steps={[
          {
            title: 'Step 1',
            description: 'Here is the content of Tour.',
            target: () => ref1.current,
            cover: (
              <img
                alt="tour.png"
                src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
              />
            ),
          },
          {
            title: 'Step 2',
            description: 'Here is the content of Tour',
            placement: 'top',
            target: () => ref2.current,
          },
          {
            title: 'Step 3',
            description: 'Here is the content of Tour',
            placement: 'left',
            target: () => ref3.current,
          },
        ]}
      />
    </>
  );
};

export default App;
```
