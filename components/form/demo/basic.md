# 基本使用

- order: 0

为了获得更好的排列，请将 `label` 标签和 `<input>`、`<textarea>`、`<select>` 控件包裹在 `.ant-form-item` 中。

`注`：`.ant-input`  类为 `<input>`、`<textarea>`、`<select>` 元素默认设置了 `width: 100%`。

为 `label` 标签添加 `required` 属性，表示该项必选。

---

````html
<form>
  <div class="ant-form-item">
    <label for="userName" required>用户名：</label>
	  <input class="ant-input" type="text" id="userName" placeholder="请输入"/>
  </div>
  <div class="ant-form-item">
    <label for="password" required>密码：</label>
	  <input class="ant-input" type="password" id="password" placeholder="请输入密码"/>
  </div>
  <div class="ant-checkbox">
    <label>
      <input type="checkbox"> 保持登录
    </label>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="确定" />
  <input type="submit" class="ant-btn" value="取消" />
</form>
````
