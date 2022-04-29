---
order: 99
title:
  zh-CN: 统一高度
  en-US: Consistent height
debug: true
---

## zh-CN

与其他组件保持统一高度。

## en-US

Keep consistent height with other components.

```jsx
import { Button, Input, Select, Segmented } from 'antd';

export default () => (
  <>
    <div>
      <Segmented style={{ marginRight: 6 }} size="large" options={['Daily', 'Weekly', 'Monthly']} />
      <Button type="primary" size="large">
        Button
      </Button>
    </div>
    <div>
      <Segmented style={{ marginRight: 6 }} options={['Daily', 'Weekly', 'Monthly']} />
      <Input placeholder="default size" style={{ width: 150 }} />
    </div>
    <div>
      <Segmented style={{ marginRight: 6 }} size="small" options={['Daily', 'Weekly', 'Monthly']} />
      <Select size="small" defaultValue="lucy" style={{ width: 150 }}>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    </div>
  </>
);
```
