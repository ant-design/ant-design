# 行内排列的表单

- order: 1

你可以为 `<form>` 标签添加 `.ant-form-inline` 类可使其表现为 inline-block 级别的控件。

---

````jsx
var Checkbox = antd.Checkbox;

React.render(
<form className="ant-form-inline">
  <div className="ant-form-item">
    <label htmlFor="userName">账户：</label>
    <input className="ant-input" type="text" id="userName" placeholder="请输入账户名" />
  </div>
  <div className="ant-form-item">
    <label htmlFor="password2">密码：</label>
    <input className="ant-input" type="password" id="password2" placeholder="请输入密码" />
  </div>
  <div className="ant-form-item">
    <label className="ant-checkbox-inline">
      <Checkbox /> 记住我
    </label>
  </div>
  <input type="submit" className="ant-btn ant-btn-primary" value="登 录" />
</form>
, document.getElementById('components-form-demo-inline-form'));
````
