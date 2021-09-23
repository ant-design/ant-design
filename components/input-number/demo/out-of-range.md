---
order: 6
title:
  zh-CN: 超出边界
  en-US: Out of range
---

## zh-CN

当通过受控将 `value` 超出边界时，提供警告样式。

## en-US

Show warning style when `value` is out of range by control.

```tsx
import { InputNumber, Button, Space } from 'antd';

const Demo = () => {
  const [value, setValue] = React.useState<string | number>('99');

  return (
    <Space>
      <InputNumber min={1} max={10} value={value} onChange={setValue} />
      <Button
        type="primary"
        onClick={() => {
          setValue(99);
        }}
      >
        Reset
      </Button>
    </Space>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
