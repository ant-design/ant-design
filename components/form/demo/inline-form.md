# 行内排列的表单

- order: 1

---

````jsx
var Form = antd.Form;
var Checkbox = antd.Checkbox;
var Button = antd.Button;
var message = antd.message;

var Demo = React.createClass({
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
      <Form inline onSubmit={this.handleSubmit}>
        <Form.Item
          id="userName"
          label="账户：">
          <Form.Input type="text" placeholder="请输入账户名" id="userName" name="userName" onChange={this.setValue.bind(this, 'userName')} />
        </Form.Item>
        <Form.Item
          id="password"
          label="密码：">
          <Form.Input type="password" placeholder="请输入密码" id="password" name="password" onChange={this.setValue.bind(this, 'password')} />
        </Form.Item>
        <Form.Item>
          <label className="ant-checkbox-inline">
            <Checkbox  name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 记住我
          </label>
        </Form.Item>
        <Form.Input type="submit" className="ant-btn ant-btn-primary" defaultValue="登 录" />
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-form-demo-inline-form'));
````
