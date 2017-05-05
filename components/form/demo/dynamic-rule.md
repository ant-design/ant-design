---
order: 13
title:
  zh-CN: 动态校验规则
  en-US: Dynamic Rules
---

## zh-CN

根据不同情况执行不同的校验规则。

## en-US

Perform different check rules according to different situations.

````jsx
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
  state = {
    checkNick: false,
  };
  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }
  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked,
    }, () => {
      this.props.form.validateFields(['nickname'], { force: true });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: '请输入姓名',
            }],
          })(
            <Input placeholder="请输入姓名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="昵称">
          {getFieldDecorator('nickname', {
            rules: [{
              required: this.state.checkNick,
              message: '请输入昵称',
            }],
          })(
            <Input placeholder="请输入昵称" />
          )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Checkbox
            value={this.state.checkNick}
            onChange={this.handleChange}
          >
            昵称必填
          </Checkbox>
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            Check
          </Button>
        </FormItem>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create()(DynamicRule);
ReactDOM.render(<WrappedDynamicRule />, mountNode);

````
