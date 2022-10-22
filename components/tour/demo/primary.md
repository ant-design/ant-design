---
order: 0
title:
  zh-CN: Primary主题模式
  en-US: Primary
---

## zh-CN

Primary主题模式。

## en-US

Primary theme mode.

```tsx
import React, { useRef,useState } from 'react';
import { Button,Space } from 'antd';
import Tour from '../index';

const App: React.FC = () => {
  const createBtnRef = useRef<HTMLButtonElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [current,setCurrent] = useState(-1)

  const onClose=()=>{
    setCurrent(-1)
  }
  return (
    <div style={{ margin: 20 }}>
      <Space>
        <Button type="primary" ref={createBtnRef}>Create</Button>
        <Button ref={updateBtnRef}>Update</Button>
        <Button danger ref={deleteBtnRef} type="dashed">Delete</Button>
        <Button type="link"  onClick={() => {
          setCurrent(0)
          setOpen(true)
        }}>点击开启引导</Button>
      </Space>
      <Tour
        current={current}
        onClose={onClose}
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => createBtnRef.current,
            prevButtonProps:{
              onClick: ()=>setCurrent(current-1)
            },
            nextButtonProps:{
              onClick:()=>setCurrent(current+1)
            }
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
            prevButtonProps:{
              onClick: ()=>setCurrent(current-1)
            },
            nextButtonProps:{
              onClick:()=>setCurrent(current+1)
            }
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
            prevButtonProps:{
              onClick: ()=>setCurrent(current-1)
            },
            finishButtonProps:{
              onClick:onClose,
            }
          },
        ]}
      />
    </div>
  );
};

export default App;
```
