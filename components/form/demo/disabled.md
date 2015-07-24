# 禁用状态

- order: 2

1) 单独为输入框设置 `disabled` 属性；

2) 为 `<fieldset>` 设置 `disabled` 属性，可以禁用 `<fieldset>` 中包含的所有控件。

---

#### 禁用的表单控件

<br>

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label class="col-5">禁用的输入框：</label>
    <div class="col-12">
      <input class="ant-input" type="text" value="我是禁用的" disabled>
    </div>
  </div>
</form>
````

#### 禁用的 fieldset

<br>

````html
<form class="ant-form-horizontal">
  <fieldset disabled>
    <div class="ant-form-item ant-form-item-compact">
      <label for="userName" class="col-5" required>用户名：</label>
      <div class="col-12">
        <p class="ant-form-text">大眼萌 minion</p>
      </div>
    </div>
    <div class="ant-form-item">
      <label for="password" class="col-5" required>密码：</label>
      <div class="col-12">
        <input class="ant-input" type="password" id="password" value="123456"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-offset-5">
        <input type="submit" class="ant-btn ant-btn-primary" value="确 定" />
      </div>
    </div>
  </fieldset>
</form>
````
