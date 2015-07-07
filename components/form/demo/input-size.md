# Input 尺寸

- order: 7

关于尺寸，我们为 `.ant-input` `.ant-input-group` 均提供了三种尺寸：大（-lg）、中(默认)、小（-sm），往类名后添加后缀即可。

但是在 `<form>` 表单里面，我们只使用**大尺寸**作为唯一的尺寸。

---

````html
<h4>input</h4>
<!-- 大尺寸 -->
<input class="ant-input ant-input-lg" type="text" id="userName" placeholder="大输入框"/>
<br>
<!-- 默认尺寸 -->
<input class="ant-input" type="text" id="userName" placeholder="默认大小输入框"/>
<br>
<!-- 小尺寸 -->
<input class="ant-input ant-input-sm" type="text" id="userName" placeholder="小输入框"/>

<h4>input-group</h4>
<!-- 大尺寸 -->
<div class="ant-input-group ant-input-group-lg">
  <input type="text" class="ant-input" placeholder="大输入框组合">
  <div class="ant-input-group-btn">
    <button class="input-btn" type="button">
      <span>.com</span>
      <i class="anticon anticon-caret-down"></i>
    </button>
  </div>
</div>

<br>
<!-- 默认尺寸 -->
<div class="ant-input-group">
  <input type="text" class="ant-input" placeholder="Search for...">
  <div class="ant-input-group-btn">
    <button class="input-btn" type="button">
      <span>.com</span>
      <i class="anticon anticon-caret-down"></i>
    </button>
  </div>
</div>

<br>
<!-- 小尺寸 -->
<div class="ant-input-group ant-input-group-sm">
  <input type="text" class="ant-input" placeholder="小输入框组合">
  <div class="ant-input-group-btn">
    <button class="input-btn" type="button">
      <span>.com</span>
      <i class="anticon anticon-caret-down"></i>
    </button>
  </div>
</div>

````
