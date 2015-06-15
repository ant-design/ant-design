# Feedback input

- order: 8

带反馈图标的输入框

为输入框添加反馈图标，可以更好地反馈当前的状态。只需用 `.has-feedback` 类包裹 input 输入框即可。

另外可为 `label` 标签添加 `required` 属性，表示该项必选。

> 注意: 反馈图标只能使用在文本输入框 `<input class="ant-input">` 元素上哦~

---

````html
<!-- 校验失败 -->
<div class="ant-form-item has-error">
  <label for="userName">Username</label>
  <div class="has-feedback">
    <input class="ant-input" type="text" id="userName" placeholder="有错误啦"/>
    <i class="anticon anticon-cross-round"></i>
  </div>
</div>

<!-- 警告状态 -->
<div class="ant-form-item has-warning">
  <label for="userName" ant-input-group>Username</label>
  <div class="has-feedback">
    <input class="ant-input" type="text" id="userName" placeholder="前方高能预警"/>
    <i class="anticon anticon-exclamation-round"></i>
  </div>
  <div class="ant-form-explain">该项必选</div>
</div>

<!-- 校验成功 -->
<div class="ant-form-item has-success">
  <label for="userName">Username</label>
  <div class="has-feedback">
    <input class="ant-input" type="text" id="userName" placeholder="请输入"/>
    <i class="anticon anticon-check-round"></i>
  </div>
</div>

<div class="ant-form-item">
  <label for="userName">Username</label>
  <div class="has-feedback">
    <input class="ant-input" type="text" id="userName" placeholder="努力加载中..."/>
    <i class="anticon anticon-loading"></i>
  </div>
</div>
````
