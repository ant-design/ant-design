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
  const firstUpload = useRef(false);

  const [show, setShow] = useState(false);
  const [placement, setPlacement] = useState('bottom');

  useEffect(() => {
    if (!firstUpload.current) {
      return (firstUpload.current = true);
    }
    if (!show) setShow(true);
  }, [show]);

  return (
    <div style={{ margin: 20 }}>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setShow(!show);
          }}
        >
          Show
        </Button>
        <Button ref={coverBtnRef}>Cover</Button>
        <Button
          ref={placementBtnRef}
          onClick={() => {
            setPlacement('top');
          }}
        >
          Placement
        </Button>
      </Space>
      {show && (
        <Tour
          steps={[
            {
              title: '引导标题',
              description:
                '我是内容我是内容我是内容我是内容,我是内容我是内容我是内容我是内容我是内容我是内容',
              target: null,
            },
            {
              title: '更新',
              description: (
                <div>
                  <span>更新一条数据</span>
                  <Button type="link">帮助文档</Button>
                </div>
              ),
              target: () => coverBtnRef.current,
              cover: (
                <img
                  alt="tour.png"
                  src="https://user-images.githubusercontent.com/5378891/197374836-6a42fed4-4f4a-4a57-b6ca-337824ad9ff9.png"
                />
              ),
            },
            {
              title: '删除',
              description: (
                <div>
                  <span>危险操作：删除一条数据</span>
                </div>
              ),
              placement,
              target: () => placementBtnRef.current,
              style: { color: 'red' },
            },
          ]}
        />
      )}
    </div>
  );
};

export default App;
```
