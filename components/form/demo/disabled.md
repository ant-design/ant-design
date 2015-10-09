# 禁用状态

- order: 2

1) 单独为输入框设置 `disabled` 属性；

2) 为 `<fieldset>` 设置 `disabled` 属性，可以禁用 `<fieldset>` 中包含的所有控件。

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var Button = antd.Button;
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;

React.render(
<Form horizontal>
  <FormItem
    label="单独禁用输入框："
    labelClassName="col-5"
    wrapperClassName="col-12">
    <Input type="text" value="我是禁用的" disabled />
  </FormItem>

  <fieldset disabled>
    <legend>禁用的 fieldset</legend>
    <FormItem
      label="用户名："
      labelClassName="col-5"
      wrapperClassName="col-12"
      required={true}
      isCompact={true} >
      <Input type="static" value="大眼萌 minion" id="userName" />
    </FormItem>
    <FormItem
      label="密码："
      labelClassName="col-5"
      wrapperClassName="col-12"
      required={true} >
      <Input type="password" value="123456" id="password" />
    </FormItem>
    <div className="row">
      <div className="col-12 col-offset-5">
        <input type="submit" className="ant-btn ant-btn-primary" value="确 定" />
      </div>
    </div>
  </fieldset>
</Form>
, document.getElementById('components-form-demo-disabled'));
````
