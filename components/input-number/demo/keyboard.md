---
order: 5
title:
  zh-CN: 键盘行为
  en-US: Keyboard
---

## zh-CN

使用 `keyboard` 属性可以控制键盘行为。

## en-US

Control keyboard behavior by `keyboard`.

```tsx
import { InputNumber, Checkbox, Space } from 'antd';

const App = () => {
  const [keyboard, setKeyboard] = React.useState(true);
  return (
    <Space>
      <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={3} />
      <Checkbox
        onChange={() => {
          setKeyboard(!keyboard);
        }}
        checked={keyboard}
      >
        Toggle keyboard
      </Checkbox>
    </Space>
  );
};

ReactDOM.render(<App />, mountNode);
```
