# Validate status

- order: 7

校验状态

提供三种校验状态类：`.has-success` `.has-error` `.has-warning`, 分别代表成功、失败、警告

为 `ant-form-item` 类添加以上三种校验状态类即可。

---

````html
<h4>成功</h4>
<div class="ant-form-item has-success">
  <label for="userName">Username</label>
  <input class="ant-input" type="text" id="userName" value="ant"/>
  <div class="ant-form-explain">
    Yes, I know you are ant.
  </div>
</div>

<h4>失败</h4>
<div class="ant-form-item has-error">
  <label for="userName">Username</label>
  <input class="ant-input" type="text" id="userName" placeholder="有错误啦"/>
</div>

<h4>警告</h4>
<div class="ant-form-item has-warning">
  <label for="userName">Username</label>
  <input class="ant-input" type="text" id="userName" placeholder="前方高能预警"/>
</div>

````
