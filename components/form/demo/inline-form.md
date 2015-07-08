# 行内排列的表单

- order: 1

在**视口宽度大于等于 768px **时，你可以为 `<form>` 标签添加 `.ant-form-inline` 类可使其表现为 inline-block 级别的控件。

---

````html
<form class="ant-form-inline">
  <div class="ant-form-item">
    <label for="userName">账户：</label>
    <input class="ant-input" type="text" id="userName" placeholder="请输入"/>
  </div>
  <div class="ant-form-item">
    <label for="password">密码：</label>
    <input class="ant-input" type="text" id="password" placeholder="请输入密码"/>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="登录" />
</form>

<br />

<form class="ant-form-inline">
  <div class="ant-form-item">
    <input class="ant-input" type="text" id="userName" placeholder="请输入账户名"/>
  </div>
  <div class="ant-form-item">
    <input class="ant-input" type="text" id="password" placeholder="请输入密码"/>
  </div>
  <div class="ant-checkbox">
    <label>
      <input type="checkbox"> 记住我
    </label>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="登录" />
</form>

````
