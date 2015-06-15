# Static control

- order: 5

静态文本表单控件：将一行静态文本和 label 标签置于同一行。

为 `<p>` 标签添加 `.ant-form-text` 类即可。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label for="userName" class="col-6">Username</label>
    <div class="col-18">
      <p class="ant-form-text">Ant</p>
    </div>
  </div>
  <div class="ant-form-item">
    <label for="password" class="col-6">Password</label>
    <div class="col-18">
      <input class="ant-input" type="text" id="password" placeholder="Please enter password"/>
   </div>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="Submit" />
</form>
````
