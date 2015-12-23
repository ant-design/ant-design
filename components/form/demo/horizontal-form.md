# 水平排列的表单

- order: 2

示例展示了如何通过使用 `Form.ValueMixin` 来获取和更新表单提交的数值。

**注意：** 1）需要为每个输入控件声明 `name` 属性；2）ES6 语法 [不支持 `mixins`](https://facebook.github.io/react/docs/reusable-components.html#no-mixins)；

---

````jsx
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Demo = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        userName: '大眼萌 minion',
        password: undefined,
        gender: 'male',
        remark: undefined,
        agreement: undefined,
      }
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  },

  render() {
    const formData = this.state.formData;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名："
          labelCol={{span: 6}}
          wrapperCol={{span: 6}}
          required>
          <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
        </FormItem>
        <FormItem
          id="password"
          label="密码："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required>
          <Input type="password" id="password" name="password" placeholder="请输入密码" value={formData.password} onChange={this.setValue.bind(this, 'password')} />
        </FormItem>
        <FormItem
          label="您的性别："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required>
            <RadioGroup name="gender" value={formData.gender} onChange={this.setValue.bind(this, 'gender')} >
              <Radio value="male">男的</Radio>
              <Radio value="female">女的</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem
          id="remark"
          label="备注："
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          required
          help="随便写点什么">
          <Input type="textarea" placeholder="随便写" id="remark" name="remark" value={formData.remark} onChange={this.setValue.bind(this, 'remark')} />
        </FormItem>
        <FormItem
          wrapperCol={{span: 14, offset: 6}} >
          <label>
            <Checkbox name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 同意
          </label>
        </FormItem>
        <Row>
          <Col span="16" offset="6">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-form-demo-horizontal-form'));
````
