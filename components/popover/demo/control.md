---
order: 3
title:
  zh-CN: 从浮层内关闭
  en-US: Controlling the close of the dialog
---

## zh-CN

使用 `visible` 属性控制浮层显示。

## en-US

Use `visible` prop to control the display of the card.

```jsx
import { Popover, Button } from 'antd';

export default () => {
  const [visible, setVisible] = React.useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = visiblePopover => {
    setVisible(visiblePopover);
  };

  return (
    <Popover
      content={<a onClick={hide}>Close</a>}
      title="Title"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>
  );
};
```
