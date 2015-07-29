# 校验提示

- order: 4

我们为表单控件的校验状态定义了样式，共有三种校验状态类：

`.has-success` `.has-error` `.has-warning`, 分别代表校验成功、校验失败、有警告。

将以上三种校验状态类添加到这些控件的父级元素即可。

另外为输入框添加反馈图标，可以更好地反馈当前的校验状态，使用 `.has-feedback` 类包裹 input 输入框即可。

**注意**: 反馈图标只能使用在文本输入框 `<input class="ant-input">` 元素上。

---

````html
<h4>不带反馈图标的校验提示</h4>
<br />
<form class="ant-form-horizontal">
  <div class="ant-form-item has-error">
    <label for="error" class="col-5">失败校验：</label>
    <div class="col-12">
      <input class="ant-input" type="text" id="error" value="无效选择"/>
      <div class="ant-form-explain">请输入数字和字母组合</div>
    </div>
  </div>
  <div class="ant-form-item has-warning">
    <label for="warning" class="col-5">警告校验：</label>
    <div class="col-12">
      <input class="ant-input" type="text" id="warning" value="前方高能预警"/>
    </div>
  </div>
</form>

<h4>带图标的校验提示（水平排列的表单）</h4>
<br />
<form class="ant-form-horizontal">
	<div class="ant-form-item">
  	<label class="col-5" for="validating">校验中：</label>
  	<div class="col-12">
  		<div class="has-feedback is-validating">
    		<input class="ant-input" type="text" id="validating" value="我是被校验的内容"/>
        <div class="ant-form-explain">信息审核中...</div>
  		</div>
  	</div>
	</div>

	<div class="ant-form-item">
  	<label class="col-5" for="input1">成功校验：</label>
  	<div class="col-12">
  		<div class="has-feedback has-success">
    		<input class="ant-input" type="text" id="input1" value="我是正文"/>
  		</div>
  	</div>
	</div>

	<div class="ant-form-item">
  	<label class="col-5" for="input2">失败校验：</label>
  	<div class="col-12">
  		<div class="has-feedback has-error">
    		<input class="ant-input" type="text" id="input2" value="无效选择"/>
        <div class="ant-form-explain">请输入数字和字母组合</div>
  		</div>
  	</div>
	</div>

	<div class="ant-form-item">
  	<label class="col-5" for="input3">警告校验：</label>
  	<div class="col-12">
  		<div class="has-feedback has-warning">
    		<input class="ant-input" type="text" id="input3" value="前方高能预警"/>
  		</div>
  	</div>
	</div>
</form>
````
