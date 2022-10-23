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
  const showBtnRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = React.useState(false);
  const [current,setCurrent] = useState(-1)

  const onClose=()=>{
    setCurrent(-1)
  }
  return (
    <div style={{ margin: 20 }}>
      <Space>
        <Button
          type="primary"
          ref={showBtnRef}
          onClick={() => {
            setCurrent(0)
            setOpen(true)
          }}
        >
          Show
        </Button>
      </Space>
      <Tour
        current={current}
        onClose={onClose}
        type='primary'
        steps={[
          {
            title: '创建',
            description: '创建一条数据',
            target: () => showBtnRef.current,
            prevButtonProps:{
              onClick: ()=>setCurrent(current-1)
            },
            nextButtonProps:{
              onClick:()=>setCurrent(current+1)
            },
            finishButtonProps:{
              onClick:onClose,
            }
          }
        ]}
      />
    </div>
  );
};

export default App;
```
