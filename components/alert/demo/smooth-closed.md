---
order: 7
title:
  zh-CN: 平滑地卸载
  en-US: Smoothly Unmount
---

## zh-CN

平滑、自然的卸载提示。

## en-US

Smoothly unmount Alert upon close.

```jsx
import { Alert } from 'antd';

const App = () => {
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />
      )}
      <p>placeholder text here</p>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
