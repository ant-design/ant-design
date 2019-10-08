---
order: 7
title:
  zh-CN: Error
  en-US: Error
---

## zh-CN

复杂的错误反馈。

## en-US

Complex error feedback.

```jsx
import { Result, Button, Typography } from 'antd';
import { CloseCircle } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

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
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The content you submitted has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircle style={{ color: 'red' }} /> Your account has been frozen
        <a>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircle style={{ color: 'red' }} /> Your account is not yet eligible to apply{' '}
        <a>Apply Unlock &gt;</a>
      </Paragraph>
    </div>
  </Result>,
  mountNode,
);
```
