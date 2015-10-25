# 禁用状态

- order: 2

1) 单独为输入控件设置 `disabled` 属性；

2) 为 `<fieldset>` 设置 `disabled` 属性，可以禁用 `<fieldset>` 中包含的所有控件。

---

````jsx
var Form = antd.Form;
var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;

ReactDOM.render(
<Form horizontal>
  <Form.Item
    label="单独禁用输入框："
    labelClassName="col-5"
    wrapperClassName="col-12">
    <Form.Input type="text" defaultValue="我是禁用的" disabled />
  </Form.Item>

  <fieldset disabled>
    <legend>禁用的 fieldset</legend>
    <Form.Item
      label="用户名："
      labelClassName="col-5"
      wrapperClassName="col-12"
      required={true} >
      <Form.Input type="static" value="大眼萌 minion" id="userName" />
    </Form.Item>
    <Form.Item
      label="密码："
      labelClassName="col-5"
      wrapperClassName="col-12"
      required={true} >
      <Form.Input type="password" defaultValue="123456" id="password" />
    </Form.Item>
    <div className="row">
      <div className="col-12 col-offset-5">
        <Form.Input type="submit" className="ant-btn ant-btn-primary" defaultValue="确 定" />
      </div>
    </div>
  </fieldset>
</Form>
, document.getElementById('components-form-demo-disabled'));
````
