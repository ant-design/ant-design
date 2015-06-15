# Disabled status

- order: 6

禁用状态
  
  1. 单独为输入框设置 disabled 属性
  2. 为<fieldset> 设置 disabled 属性，可以禁用 <fieldset> 中包含的所有控件

---

````html
<h4>禁用的表单控件</h4>
<input class="ant-input" type="text" placeholder="Disabled input here..." disabled>

<h4>禁用的fieldset</h4>
<form>
  <fieldset disabled>
    <div class="ant-form-item">
      <label for="disabledTextInput">Disabled input</label>
      <input type="text" id="disabledTextInput" class="ant-input" placeholder="Disabled input">
    </div>
    <div class="ant-form-item">
      <label for="disabledSelect">Disabled select</label>
      <select id="disabledSelect" class="ant-input">
        <option>Disabled select</option>
      </select>
    </div>
    <div class="ant-checkbox">
      <label>
        <input type="checkbox"> Disabled checkbox
      </label>
    </div>
    <button type="submit" class="ant-btn ant-btn-primary">Submit</button>
  </fieldset>
</form>

````
