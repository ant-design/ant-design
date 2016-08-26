---
order: 3
title: 受控模式
---

## zh-CN

受控模式，例如配合 Form 使用

## en-US

Controlled mode, for example, work with `Form` .

````jsx
import { Mention, Form, Button } from 'antd';
const { toEditorState, getMentions } = Mention;
const FormItem = Form.Item;

let App = React.createClass({
  getInitialState() {
    return {
      initValue: toEditorState('@afc163'),
    };
  },
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },
  checkMention(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    const mentions = getMentions(getFieldValue('mention'));
    if (mentions.length < 2) {
      callback(new Error('最帅的码农不止一个！!'));
    } else {
      callback();
    }
  },
  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const mentionProps = getFieldProps('mention', {
      rules: [
        { validator: this.checkMention },
      ],
      initialValue: this.state.initValue,
    });
    console.log('>> render', getFieldValue('mention') === this.state.initValue);
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          id="control-mention"
          label="最帅的码农"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Mention
            {...mentionProps}
            suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
          />
        </FormItem>
        <FormItem wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

App = Form.create()(App);

ReactDOM.render(<App />, mountNode);
````
