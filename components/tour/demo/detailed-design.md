---
order: 0
title:
  zh-CN: 展示媒体内容
  en-US: Detailed-design
---

## zh-CN

展示媒体图片或者视频。

## en-US

The most basic usage.

```tsx
import React, { useRef } from 'react';
import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import Tour from '../index';

const App: React.FC = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ margin: 20 }}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open: {String(open)}
      </button>
      <div>
        <Button type="primary" ref={createBtnRef} style={{ marginLeft: 100 }}>
          Create
        </Button>
        <div style={{ height: 200 }} />
        <Button ref={updateBtnRef}>Update</Button>
        <Button danger ref={deleteBtnRef} style={{ marginLeft: 200 }}>
          Delete
        </Button>
      </div>

      <div style={{ height: 200 }} />

      <Tour
        defaultCurrent={0}
        open={open}
        steps={[
          {
            title: '引导标题',
            description:
              '我是内容我是内容我是内容我是内容,我是内容我是内容我是内容我是内容我是内容我是内容',
            target: () => createBtnRef.current,
            cover: (
              <img
                style={{ height: 200 }}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            ),
          },
          {
            title: '更新',
            description: (
              <div>
                <span>更新一条数据</span>
                <Button type="link">帮助文档</Button>
              </div>
            ),
            target: () => updateBtnRef.current,
          },
        ]}
      />
    </div>
  );
};

export default App;
```
