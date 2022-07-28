---
order: 2
title:
  zh-CN: 间距大小
  en-US: Space Size
---

## zh-CN

间距预设大、中、小三种大小。

通过设置 `size` 为 `large` `middle` 分别把间距设为大、中间距。若不设置 `size`，则间距为小。

## en-US

`large`, `middle` and `small` preset sizes.

Set the size to `large` and `middle` by setting size to large and middle respectively. If `size` is not set, the spacing is `small`.

```tsx
import { Button, Radio, Space } from 'antd';
import type { SpaceSize } from 'antd/es/space';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>('small');

  return (
    <>
      <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
        <Radio value="small">Small</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="large">Large</Radio>
      </Radio.Group>
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
};

export default App;
```
