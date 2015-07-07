# 表单控件

- order: 3

展示所有支持的表单控件。

`注`： 输入框：只有正确设置了 type 属性的输入控件才能被赋予正确的样式。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label class="col-6">输入框：</label>
    <div class="col-18">
      <input type="text" class="ant-input" placeholder="Please enter...">  
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">文本域：</label>
    <div class="col-18">
      <textarea class="ant-input"></textarea>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">下拉列表：</label>
    <div class="col-18">
      <select class="ant-input">
        <option>选项一</option>
        <option>选项二</option>
        <option>选项三</option>
        <option>选项四</option>
        <option>选线五</option>
      </select>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">checkbox 复选框：</label>
    <div class="col-18">
      <div class="ant-checkbox">
        <label>
          <input type="checkbox" value="apple"> Apple
        </label>
      </div>
      <!-- disabled checkbox -->
      <div class="ant-checkbox disabled">
        <label>
          <input type="checkbox" value="banana" disabled> Banana(disabled)
        </label>
      </div>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">内联的 checkbox：</label>
    <div class="col-18">
      <!-- 内联的checkbox -->
      <label class="ant-checkbox-inline">
        <input type="checkbox" id="inlineCheckbox1" value="Kevin"> Kevin
      </label>
      <label class="ant-checkbox-inline">
        <input type="checkbox" id="inlineCheckbox2" value="Bob"> Bob
      </label>
      <label class="ant-checkbox-inline">
        <input type="checkbox" id="inlineCheckbox3" value="Stuart"> Stuart
      </label>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">radio 单选框：</label>
    <div class="col-18">
      <div class="ant-radio">
        <label>
          <input type="radio" name="radios" id="optionsRadios1" value="option1" checked> Apple
        </label>
      </div>
      <!-- disabled radio -->
      <div class="ant-radio disabled">
        <label>
          <input type="radio" name="radios" id="optionsRadios3" value="option3" disabled> Banana(disabled)
        </label>
      </div>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">内联的 radio：</label>
    <div class="col-18">
      <!-- 内联的radio -->
      <label class="ant-radio-inline">
        <input type="radio" name="inlineRadios" id="inlineRadio1" value="Kevin"> Kevin
      </label>
      <label class="ant-radio-inline">
        <input type="radio" name="inlineRadios" id="inlineRadio2" value="Stuart"> Stuart
      </label>
      <label class="ant-radio-inline">
        <input type="radio" name="inlineRadios" id="inlineRadio3" value="Bob"> Bob
      </label>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6" for="InputFile">头像：</label>
    <div class="col-18">
      <input type="file" id="InputFile" class="ant-upload">
      <p class="ant-form-explain">请选择一个文件</p>
    </div>
  </div>
</form>
````
