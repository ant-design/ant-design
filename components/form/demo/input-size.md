# Input 尺寸

- order: 6

我们为定义了 `.ant-input` 类的输入框提供了三种尺寸：大（-lg）、中(默认)、小（-sm），往类名添加以上后缀即可。

但是在 `<form>` 表单里面，我们只使用**大尺寸**， 即高度为 **32px**，作为唯一的尺寸。

---

````html
<div class="row">
  <div class="ant-input-group">
    <div class="col-6">
      <input class="ant-input ant-input-lg" type="text" id="largeInput" placeholder="大尺寸"/>
    </div>
    <div class="col-6">
      <input class="ant-input" type="text" id="defaultInput" placeholder="默认尺寸"/>
    </div>
    <div class="col-6">
      <input class="ant-input ant-input-sm" type="text" id="smallInput" placeholder="小尺寸"/>
    </div>
  </div>
</div>
````
