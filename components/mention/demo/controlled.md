---
order: 4
title:
  zh-CN: 配合 Form 使用
  en-US: With Form
---

## zh-CN

受控模式，例如配合 Form 使用。

## en-US

Controlled mode, for example, to work with `Form`.

````jsx
import { Mention, Form, Button } from 'antd';
const { toContentState, getMentions } = Mention;
const FormItem = Form.Item;

class App extends React.Component {
  state = {
    initValue: toContentState('@afc163'),
  }
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }
  checkMention = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    const mentions = getMentions(getFieldValue('mention'));
    if (mentions.length < 2) {
      callback(new Error('More than one must be selected!'));
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log('>> render', getFieldValue('mention') === this.state.initValue);
    return (
      <Form layout="horizontal">
        <FormItem
          id="control-mention"
          label="Top coders"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          {getFieldDecorator('mention', {
            rules: [
              { validator: this.checkMention },
            ],
            initialValue: this.state.initValue,
          })(
            <Mention
              suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
              style={{ height: 60 }}
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={this.handleReset}>Reset</Button>
        </FormItem>
      </Form>
    );
  }
}

const FormDemo = Form.create()(App);

ReactDOM.render(<FormDemo />, mountNode);
````
