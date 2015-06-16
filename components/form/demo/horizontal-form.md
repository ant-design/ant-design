# Horizontal form

- order: 2

水平排列的表单

为 `<form>` 标签添加 `.ant-form-horizontal` 类(这让 `.ant-form-item` 表现为栅格系统中的 `row`)，并结合使用我们提供的 [栅格系统](http://ant.design/components/layout/)，可以实现 label 标签和表单控件的水平排列。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label for="userName" class="col-6">Username</label>
    <div class="col-18">
      <input class="ant-input" type="text" id="userName" placeholder="Please enter userName"/>
    </div>
  </div>
  <div class="ant-form-item">
    <label for="password" class="col-6">Password</label>
    <div class="col-18">
      <input class="ant-input" type="text" id="password" placeholder="Please enter password"/>
	 </div>
  </div>
  <div class="ant-form-item">
    <div class="ant-checkbox col-24">
      <label>
        <input type="checkbox"> Remember me!
      </label>
    </div>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="Submit" />
</form>
````
