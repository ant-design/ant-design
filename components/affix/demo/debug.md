---
order: 99
title:
  zh-CN: 调整浏览器大小，观察 Affix 容器是否发生变化。跟随变化为正常。#17678
  en-US: debug
debug: true
---

## zh-CN

DEBUG

## en-US

DEBUG

```tsx
import React, { useState } from 'react';
import { Affix, Button } from 'antd';

const Demo: React.FC = () => {
  const [top, setTop] = useState(10);
  return (
    <div style={{ height: 10000 }}>
      <div>Top</div>
      <Affix offsetTop={top}>
        <div style={{ background: 'red' }}>
          <Button type="primary" onClick={() => setTop(top + 10)}>
            Affix top
          </Button>
        </div>
      </Affix>
      <div>Bottom</div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
