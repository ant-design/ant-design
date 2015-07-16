# 水平排列的表单

- order: 0

为 `<form>` 标签添加 `.ant-form-horizontal` 类(这让 `.ant-form-item` 表现为栅格系统中的 `row`)，并结合使用我们提供的 [栅格系统](http://ant.design/components/layout/)，可以实现 label 标签和表单控件的水平排列。

如需将一行静态文本和 `<label>` 标签置于同一行，则只需为 `<p>` 标签添加 `.ant-form-text` 类即可。

为 `label` 标签添加 `required` 属性，表示该项必选。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
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
  <div class="ant-form-item">
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
      <p class="ant-form-explain">随便写点什么吧</p>
    </div>
  </div>
  <div class="ant-form-item">
    <div class="col-14 col-offset-6">
      <label>
        <input type="checkbox"> 我是同意的
      </label>
    </div>
  </div>
  <div class="row">
    <div class="col-16 col-offset-6">
      <input type="submit" class="ant-btn ant-btn-primary" value="确定" />
    </div>
  </div>
</form>
````
