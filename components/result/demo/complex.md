---
order: 2
title:
  zh-CN: 复杂的例子
  en-US: Complex example
---

## zh-CN

提供更加复杂的反馈。

## en-US

Provide more complex feedback.

```jsx
import { Result, Button, Icon } from 'antd';

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
    <p>The content you submitted has the following error:</p>
    <div className="desc">
      <span>
        <Icon type="close-circle" />
        Your account has been frozen <a>Thaw immediately &gt;</a>
      </span>
      <span>
        <Icon type="close-circle" />
        Your account is not yet eligible to apply <a>Apply immediately &gt;</a>
      </span>
    </div>
  </Result>,
  mountNode,
);
```

<style>
#components-result-demo-complex .ant-result .ant-result-content p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1.5;
}
#components-result-demo-complex .ant-result .ant-result-content .desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.4;
}
#components-result-demo-complex .ant-result .ant-result-content .desc span {
  display: block;
  margin: 16px 0;
}
#components-result-demo-complex .ant-result .ant-result-content .desc i {
  color: red;
  margin-right: 8px;
  vertical-align: top;
  display: inline-block;
  margin-top: 3px;
}
#components-result-demo-complex .ant-result .ant-result-content .desc a {
  margin-left: 16px;
}
</style>
