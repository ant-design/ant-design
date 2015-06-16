# Basic from

- order: 1 

表单基本实例

表单一定会包含表单域，表单域包含了一个标签和一个输入控件，这里我们用类 `.ant-form-item` 表示。

为了获得更好的排列，请将 label 元素和 `<input>`、`<textarea>`、`<select>` 控件包裹在 `.ant-form-item` 中。

`注`：`.ant-input`  类为 `<input>`、`<textarea>`、`<select>` 元素默认设置了 `width: 100%`。

---

````html
<form>
  <div class="ant-form-item">
    <label for="userName">Username</label>
	  <input class="ant-input" type="text" id="userName" placeholder="Please enter userName"/>
  </div>
  <div class="ant-form-item">
    <label for="password">Password</label>
	  <input class="ant-input" type="text" id="password" placeholder="Please enter password"/>
  </div>
  <div class="ant-checkbox">
    <label>
      <input type="checkbox"> Remember me!
    </label>
  </div>
  <input type="submit" class="ant-btn ant-btn-primary" value="Submit" />
</form>
````
