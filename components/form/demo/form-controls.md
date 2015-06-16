# Form controls

- order: 4

表单控件

展示所有支持的表单控件。

`注`： 输入框：只有正确设置了 type 属性的输入控件才能被赋予正确的样式。

---

````html
<h4>input 输入框</h4>
<!-- text input -->
<input type="text" class="ant-input" placeholder="Please enter...">
<!-- password input -->
<input type="password" class="ant-input" value="123456">

<h4>textarea 文本域</h4>
<textarea class="ant-input"></textarea>

<h4>select 下拉列表</h4>
<select class="ant-input">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>

<h4>checkbox 复选框</h4>
<div class="ant-checkbox">
  <label>
    <input type="checkbox" value="">
    Apple
  </label>
</div>
<!-- disabled checkbox -->
<div class="ant-checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Banana disabled
  </label>
</div>

<!-- 内联的checkbox -->
<label class="ant-checkbox-inline">
  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
</label>
<label class="ant-checkbox-inline">
  <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
</label>
<label class="ant-checkbox-inline">
  <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
</label>

<h4>radio 单选框</h4>
<div class="ant-radio">
  <label>
    <input type="radio" name="radios" id="optionsRadios1" value="option1" checked>
    Apple
  </label>
</div>
<div class="ant-radio">
  <label>
    <input type="radio" name="radios" id="optionsRadios2" value="option2">
    Peach
  </label>
</div>
<!-- disabled radio -->
<div class="ant-radio disabled">
  <label>
    <input type="radio" name="radios" id="optionsRadios3" value="option3" disabled>
    Banana
  </label>
</div>

<!-- 内联的radio -->
<label class="ant-radio-inline">
  <input type="radio" name="inlineRadios" id="inlineRadio1" value="option1"> 1
</label>
<label class="ant-radio-inline">
  <input type="radio" name="inlineRadios" id="inlineRadio2" value="option2"> 2
</label>
<label class="ant-radio-inline">
  <input type="radio" name="inlineRadios" id="inlineRadio3" value="option3"> 3
</label>

<h4>文件输入框</h4>
<div class="ant-form-item">
    <label for="InputFile">File input</label>
    <input type="file" id="InputFile">
    <p class="ant-form-explain">Choose a file...</p>
  </div>
````
