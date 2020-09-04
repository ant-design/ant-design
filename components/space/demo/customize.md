---
order: 3
title:
  zh-CN: 自定义尺寸
  en-US: Customize Size
---

## zh-CN

自定义间距大小。

## en-US

Custom spacing size.

```jsx
import React, { useState } from 'react';
import { Space, Slider, Button } from 'antd';

function SpaceCustomizeSize() {
  const [size, setSize] = useState(8);

  return (
    <>
      <Slider value={size} onChange={value => setSize(value)} />
      <br />
      <br />
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
}

ReactDOM.render(<SpaceCustomizeSize />, mountNode);
```
