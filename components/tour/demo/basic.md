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
import { Button, Space } from 'antd';
import Tour from '../index';

const App: React.FC = () => {
  const coverBtnRef = useRef<HTMLButtonElement>(null);
  const placementBtnRef = useRef<HTMLButtonElement>(null);
  // const firstUpload = useRef(false);

  const [show, setShow] = useState<boolean | undefined>();

  useEffect(() => {
    if (show === false) {
      setShow(true);
    }
  }, [show]);

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setShow(false);
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

      {show && (
        <Tour
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
      )}
    </>
  );
};

export default App;
```
