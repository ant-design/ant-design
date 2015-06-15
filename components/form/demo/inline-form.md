# Horizontal form

- order: 3

内联的表单

在**视口宽度大于等于 768px **时，你可以为 `<form>` 标签添加 `.ant-form-inline` 类可使其表现为 inline-block 级别的控件。

---

````html
<form class="ant-form-inline">
  <div class="ant-form-item">
    <label for="userName">Username</label>
    <input class="ant-input" type="text" id="userName" placeholder="Please enter userName"/>
  </div>
  <div class="ant-form-item">
    <label for="password">Password</label>
    <input class="ant-input" type="text" id="password" placeholder="Please enter password"/>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="Submit" />
</form>
````
