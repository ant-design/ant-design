# 水平排列的表单

- order: 0

为 `<form>` 标签添加 `.ant-form-horizontal` 类(这让 `.ant-form-item` 表现为栅格系统中的 `row`)，并结合使用我们提供的 [栅格系统](http://ant.design/components/layout/)，可以实现 label 标签和表单控件的水平排列。

如需将一行静态文本和 `<label>` 标签置于同一行，则只需为 `<p>` 标签添加 `.ant-form-text` 类即可。

为 `label` 标签添加 `required` 属性，表示该项必选。

**注意**：对于表单域(`.ant-form-item`) 为静态文本、`checkbox`、`radio`以及`input[type="file"]`的，其高度不同于一般的表单域，需要在 `.ant-form-item` 类后再加上 `.ant-form-item-compact`。

---

````jsx
var Checkbox = antd.Checkbox;
var Radio = antd.Radio;
var RadioGroup = antd.RadioGroup;

React.render(
<form className="ant-form-horizontal">
  <div className="ant-form-item ant-form-item-compact">
    <label for="userName" className="col-6" required>用户名：</label>
    <div className="col-6">
      <p className="ant-form-text">大眼萌 minion</p>
    </div>
  </div>
  <div className="ant-form-item">
    <label for="password" className="col-6" required>密码：</label>
    <div className="col-14">
      <input className="ant-input" type="password" id="password" placeholder="请输入密码"/>
    </div>
  </div>
  <div className="ant-form-item ant-form-item-compact">
    <label  className="col-6" required>您的性别：</label>
    <div className="col-14">
      <RadioGroup value="male">
        <Radio value="male">男的</Radio>
        <Radio value="female">女的</Radio>
      </RadioGroup>
    </div>
  </div>
  <div className="ant-form-item">
    <label for="password" className="col-6" required>备注：</label>
    <div className="col-14">
      <textarea className="ant-input" placeholder="随便写"></textarea>
      <p className="ant-form-explain">随便写点什么</p>
    </div>
  </div>
  <div className="ant-form-item ant-form-item-compact">
    <div className="col-14 col-offset-6">
      <label>
        <Checkbox /> 同意
      </label>
    </div>
  </div>
  <div className="row">
    <div className="col-16 col-offset-6">
      <input type="submit" className="ant-btn ant-btn-primary" value="确 定" />
    </div>
  </div>
</form>
, document.getElementById('components-form-demo-horizontal-form'));
````
