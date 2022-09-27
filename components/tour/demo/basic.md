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
import React, { useRef } from 'react';
import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import Tour from '../index';

const App: React.FC = () => {
  const createRef = useRef<HTMLButtonElement>(null);
  const updateRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Button type="primary" ref={createRef}>
        Create
      </Button>
      <Button ref={updateRef}>Update</Button>
      <Button danger ref={deleteRef}>
        Delete
      </Button>
      <Tour
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            getTarget: () => createRef.current,
          },
          {
            title: '更新',
            description: '更新一条数据',
            media: <img src="example.com" />,
            extra: (
              <Button type="link">
                帮助文档
                <LinkOutlined />
              </Button>
            ),
            getTarget: () => updateRef.current,
          },
          {
            title: '删除',
            description: '危险操作：删除一条数据',
            media: <video src="example.com" />,
            extra: (
              <Button type="link">
                帮助文档
                <LinkOutlined />
              </Button>
            ),
            getTarget: () => deleteRef.current,
          },
        ]}
      />
      <a href="">asdfasdf</a>
    </div>
  );
};

export default App;
```
