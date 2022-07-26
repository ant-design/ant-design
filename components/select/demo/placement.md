---
order: 38
title:
  zh-CN: 弹出位置
  en-US: Placement
---

## zh-CN

可以通过 `placement` 手动指定弹出的位置。

## en-US

You can manually specify the position of the popup via `placement`.

```tsx
import type { RadioChangeEvent } from 'antd';
import { Radio, Select } from 'antd';
import type { SelectCommonPlacement } from 'antd/es/_util/motion';
import React, { useState } from 'react';

const { Option } = Select;

const App: React.FC = () => {
  const [placement, SetPlacement] = useState<SelectCommonPlacement>('topLeft');

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Select
        defaultValue="HangZhou"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        placement={placement}
      >
        <Option value="HangZhou">HangZhou #310000</Option>
        <Option value="NingBo">NingBo #315000</Option>
        <Option value="WenZhou">WenZhou #325000</Option>
      </Select>
    </>
  );
};

export default App;
```
