---
order: 2
title:
  zh-CN: 配合 Form 使用
  en-US: With Form
---

## zh-CN

受控模式，例如配合 Form 使用。

## en-US

Controlled mode, for example, to work with `Form`.

```jsx
import { Mentions, Form, Button } from 'antd';

const { Option, getMentions } = Mentions;

class App extends React.Component {
  handleReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in the form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  };

  checkMention = (rule, value, callback) => {
    const mentions = getMentions(value);
    if (mentions.length < 2) {
      callback(new Error('More than one must be selected!'));
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="horizontal">
        <Form.Item label="Top coders" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {getFieldDecorator('mention', {
            rules: [{ validator: this.checkMention }],
          })(
            <Mentions rows="3">
              <Option value="afc163">afc163</Option>
              <Option value="zombieJ">zombieJ</Option>
              <Option value="yesmeck">yesmeck</Option>
            </Mentions>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={this.handleReset}>Reset</Button>
        </Form.Item>
      </Form>
    );
  }
}

const FormDemo = Form.create()(App);

ReactDOM.render(<FormDemo />, mountNode);
```
