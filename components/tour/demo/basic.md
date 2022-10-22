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
import React, { useRef,useState,useEffect } from 'react';
import { Button,Space } from 'antd';
import Tour from '../index';

const App: React.FC = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const [show,setShow] = useState(false)

  useEffect(()=>{
    if(!show) setShow(true)
  },[show])

  return (
    <div style={{ margin: 20 }}>
      <Space>
        <Button type="primary" ref={createBtnRef}>Create</Button>
        <Button ref={updateBtnRef}>Update</Button>
        <Button danger ref={deleteBtnRef} type="dashed">Delete</Button>
        <Button type="link"  onClick={() => {
          setShow(!show)
        }}>点击开启引导</Button>
      </Space>
      {
        show && <Tour
          steps={[
            {
              title: '引导标题',
              description:
                '我是内容我是内容我是内容我是内容,我是内容我是内容我是内容我是内容我是内容我是内容',
              target: () => createBtnRef.current,
              cover: (
                <img
                  style={{ height: 200 }}
                  alt='girl.png'
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              )
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
              style: { color: 'red' }
            },
          ]}
        />
      }

    </div>
  );
};

export default App;
```
