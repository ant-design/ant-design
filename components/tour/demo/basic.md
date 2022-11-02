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
import { Button, Divider, Space, Tour, TourProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
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
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}> Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Upload File',
            description: 'Put your files here.',
            cover: (
              <img
                alt="tour.png"
                src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
              />
            ),
            target: () => ref1.current,
          },
          {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
          },
          {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
          },
        ]}
      />
    </>
  );
};

export default App;
```
