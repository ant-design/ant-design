---
order: 1
title:
  zh-CN: 不可用
  en-US: Disabled
---

## zh-CN

Switch 失效状态。

## en-US

Disabled state of `Switch`.

```jsx
import { Switch, Button } from 'antd';

const App = () => {
  const [disabled, setDisabled] = React.useState(true);

  const toggle = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <Switch disabled={disabled} defaultChecked />
      <br />
      <Button type="primary" onClick={toggle}>
        Toggle disabled
      </Button>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
