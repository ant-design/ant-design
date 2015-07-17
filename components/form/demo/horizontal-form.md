# 水平排列的表单

- order: 0

为 `<form>` 标签添加 `.ant-form-horizontal` 类(这让 `.ant-form-item` 表现为栅格系统中的 `row`)，并结合使用我们提供的 [栅格系统](http://ant.design/components/layout/)，可以实现 label 标签和表单控件的水平排列。

如需将一行静态文本和 `<label>` 标签置于同一行，则只需为 `<p>` 标签添加 `.ant-form-text` 类即可。

为 `label` 标签添加 `required` 属性，表示该项必选。

**注意**：对于表单域(`.ant-form-item`) 为静态文本、`checkbox`、`radio`以及`input[type="file"]`的，其高度不同于一般的表单域，需要在 `.ant-form-item` 类后再加上 `.ant-form-item-compact`。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item ant-form-item-compact">
    <label for="userName" class="col-6" required>用户名：</label>
    <div class="col-6">
      <p class="ant-form-text">大眼萌 minion</p>
    </div>
  </div>
  <div class="ant-form-item">
    <label for="password" class="col-6" required>密码：</label>
    <div class="col-14">
      <input class="ant-input" type="password" id="password" placeholder="请输入密码"/>
	 </div>
  </div>
  <div class="ant-form-item ant-form-item-compact">
    <label  class="col-6" required>您的性别：</label>
    <div class="col-14">
      <label class="ant-radio-inline">
        <input type="radio" name="radios" id="male-radio" value="male" checked> 男的
      </label>
      <label class="ant-radio-inline">
        <input type="radio" name="radios" id="female-radio" value="female"> 女的
      </label>
    </div>
  </div>
  <div class="ant-form-item">
    <label for="password" class="col-6" required>备注：</label>
    <div class="col-14">
      <textarea class="ant-input" placeholder="随便写"></textarea>
    </div>
  </div>
  <div class="ant-form-item ant-form-item-compact">
    <div class="col-14 col-offset-6">
      <label>
        <input type="checkbox"> 我是同意的
      </label>
    </div>
  </div>
  <div class="row">
    <div class="col-16 col-offset-6">
      <input type="submit" class="ant-btn ant-btn-primary" value="确 定" />
    </div>
  </div>
</form>
````
