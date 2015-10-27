# 水平排列的表单

- order: 0

示例展示了如何通过使用 `Form.ValueMixin` 来获取和更新表单提交的数值。

**注意：** 你需要为每个输入控件声明 `name` 属性。

---

````jsx
var Form = antd.Form;
var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;
var Button = antd.Button;
var message = antd.message;

var Demo = React.createClass({
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
    message.success("收到表单值~~~ ：" + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  },

  render() {
    var formData = this.state.formData;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Form.Item
          id="userName"
          label="用户名："
          labelClassName="col-6"
          wrapperClassName="col-6"
          required={true} >
          <Form.Input type="static" value="大眼萌 minion" id="userName" name="userName" />
        </Form.Item>
        <Form.Item
          id="password"
          label="密码："
          labelClassName="col-6"
          wrapperClassName="col-14"
          required={true} >
          <Form.Input type="password" id="password" name="password" placeholder="请输入密码" value={formData.password} onChange={this.setValue.bind(this, 'password')} />
        </Form.Item>
        <Form.Item
          label="您的性别："
          labelClassName="col-6"
          wrapperClassName="col-14"
          required={true} >
            <RadioGroup value="male" name="gender" value={formData.gender} onChange={this.setValue.bind(this, 'gender')} >
              <Radio value="male">男的</Radio>
              <Radio value="female">女的</Radio>
            </RadioGroup>
        </Form.Item>
        <Form.Item
          id="remark"
          label="备注："
          labelClassName="col-6"
          wrapperClassName="col-14"
          required={true}
          help="随便写点什么" >
          <Form.Input type="textarea" placeholder="随便写" id="remark" name="remark" value={formData.remark} onChange={this.setValue.bind(this, 'remark')} />
        </Form.Item>
        <Form.Item
          wrapperClassName="col-14 col-offset-6" >
          <label>
            <Checkbox name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 同意
          </label>
        </Form.Item>
        <div className="row">
          <div className="col-16 col-offset-6">
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </div>
      </Form>
    );
  }
});
ReactDOM.render(<Demo />, document.getElementById('components-form-demo-horizontal-form'));
````
