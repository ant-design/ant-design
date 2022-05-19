---
order: 4
title:
  zh-CN: 动态展示
  en-US: Dynamic
---

## zh-CN

会动的进度条才是好进度条。

## en-US

A dynamic progress bar is better.

```jsx
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
  const [percent, setPercent] = React.useState(0);

  const increase = () => {
    let percentValue = percent + 10;
    if (percentValue > 100) {
      percentValue = 100;
    }
    setPercent(percentValue);
  };

  const decline = () => {
    let percentValue = percent - 10;
    if (percentValue < 0) {
      percentValue = 0;
    }
    setPercent(percentValue);
  };

  return (
    <>
      <Progress percent={percent} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};
```
