---
order: 2
title:
  zh-CN: Class Component 表单控制
  en-US: Form control with Class Component
---

## zh-CN

使用 `ref` 对表单进行控制。

## en-US

Control data of form by `ref`.

```tsx
import { Form, Input, Button } from 'antd';

class Demo extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item name="username">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button> <Button htmlType="button" onClick={this.onReset}>
          Reset
        </Button>
      </Form>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
