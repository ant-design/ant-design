---
order: 0
title:
  zh-CN: Primary主题模式
  en-US: Primary
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
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ margin: 20 }}>
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
        type="primary"
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => createBtnRef.current,
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
          {
            title: '删除',
            description: (
              <div>
                <span>危险操作：删除一条数据</span>
              </div>
            ),
            target: () => deleteBtnRef.current,
            style: { color: 'red' },
          },
        ]}
      />
    </div>
  );
};

export default App;
```
