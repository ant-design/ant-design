---
order: 1
title:
  zh-CN: 复杂的例子
  en-US: Complex example
---

## zh-CN

提供更加复杂的反馈。

## en-US

Provide more complex feedback.

```jsx
import { Result, Button, Icon, Typography } from 'antd';

const { Title, Paragraph } = Typography;

ReactDOM.render(
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  >
    <div className="desc">
      <Title level={4}>The content you submitted has the following error:</Title>
      <Paragraph>
        <Icon style={{ color: 'red' }} type="close-circle" /> Your account has been frozen{' '}
        <a>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <Icon type="close-circle" /> Your account is not yet eligible to apply{' '}
        <a>Apply immediately &gt;</a>
      </Paragraph>
    </div>
  </Result>,
  mountNode,
);
```
