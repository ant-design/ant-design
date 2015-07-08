# 禁用状态

- order: 3

1) 单独为输入框设置 `disabled` 属性；

2) 为 `<fieldset>` 设置 `disabled` 属性，可以禁用 `<fieldset>` 中包含的所有控件。

---

````html
<h4>禁用的表单控件</h4>
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label class="col-5">禁用的输入框：</label>
    <div class="col-12">
      <input class="ant-input" type="text" value="我是禁用的" disabled>
    </div>
  </div>
</form>

<br />

<h4>禁用的 fieldset</h4>
<form class="ant-form-horizontal">
  <fieldset disabled>
    <div class="ant-form-item">
      <label for="disabledTextInput" class="col-5">Input:</label>
      <div class="col-12">
        <input type="text" id="disabledTextInput" class="ant-input" placeholder="Disabled input">
      </div>
    </div>
    <div class="ant-form-item">
      <label for="disabledSelect" class="col-5">Select:</label>
      <div class="col-12">
        <select id="disabledSelect" class="ant-input">
          <option>Disabled select</option>
        </select>
      </div>
    </div>
    <div class="ant-form-item">
      <div class="ant-checkbox col-14 col-offset-5">
        <label>
          <input type="checkbox"> checkbox
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col-14 col-offset-5">
        <input type="submit" class="ant-btn ant-btn-primary" value="确定">
      </div>
    </div>
  </fieldset>
</form>

````
