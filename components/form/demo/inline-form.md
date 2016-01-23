# 平行排列

- order: 1

行内排列，常用于登录界面。

---

````jsx
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const Demo = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        userName: undefined,
        password: undefined,
        agreement: undefined,
      }
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.state.formData);
  },

  render() {
    const formData = this.state.formData;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          id="userName"
          label="账户：">
          <Input placeholder="请输入账户名" id="userName" name="userName" onChange={this.setValue.bind(this, 'userName')} value={formData.userName} />
        </FormItem>
        <FormItem
          id="password"
          label="密码：">
          <Input type="password" placeholder="请输入密码" id="password" name="password" onChange={this.setValue.bind(this, 'password')} value={formData.password} />
        </FormItem>
        <FormItem>
          <label className="ant-checkbox-inline">
            <Checkbox name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} />记住我
          </label>
        </FormItem>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, mountNode);
````
