# 行内排列的表单

- order: 1

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var Checkbox = antd.Checkbox;
var Button = antd.Button;

React.render(
<Form inline>
  <FormItem
    label="账户：">
    <Input type="text" placeholder="请输入账户名" id="userName" />
  </FormItem>
  <FormItem
    label="密码：">
    <Input type="password" placeholder="请输入密码" id="password2" />
  </FormItem>
  <FormItem
    type="checkbox">
    <label className="ant-checkbox-inline">
      <Checkbox /> 记住我
    </label>
  </FormItem>
  <input type="submit" className="ant-btn ant-btn-primary" value="登 录" />
</Form>
, document.getElementById('components-form-demo-inline-form'));
````
