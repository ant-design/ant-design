# Input 输入框集合

- order: 5


带标签的输入框：使用 `.ant-input-group` 类并结合 `.ant-input-group-addon` `.ant-input-group-btn` 类可以创建带标签、按钮的 Input 输入框。

输入框组合：`.ant-inputs` 类由多个 `.ant-inputs-item` 组成，使多个 Input 可以在一行显示出来。

---

````html
<form class="ant-form-horizontal">
  <div class="ant-form-item">
    <label class="col-6" for="site1">标签输入框：</label>
    <div class="col-16">
      <div class="ant-input-group">
        <span class="ant-input-group-addon" id="basic-addon1">Http://</span>
        <input type="text" id="site1" class="ant-input" value="mysite.com" />
      </div>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6" for="site3">标签输入框：</label>
    <div class="col-16">
      <div class="ant-input-group">
        <span class="ant-input-group-addon" id="basic-addon3">Http://</span>
        <input type="text" class="ant-input" id="site3" value="mysite" />
        <span class="ant-input-group-addon" id="basic-addon4">.com</span>
      </div>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6" for="site5">带按钮的输入框：</label>
    <div class="col-16">
      <div class="ant-input-group">
        <input type="text" class="ant-input" id="site5" placeholder="Search for..." />
        <div class="ant-input-group-btn">
          <button class="ant-btn" type="button">GO!</button>
        </div>
      </div>
    </div>
  </div>
  <div class="ant-form-item">
    <label class="col-6">输入身份证：</label>
    <div class="col-16">
      <div class="ant-input-group">
        <div class="col-6">
          <input class="ant-input" type="text" id="certNo1" />
        </div>
        <div class="col-6">
          <input class="ant-input" type="text" id="certNo2" />
        </div>
        <div class="col-6">
          <input class="ant-input" type="text" id="certNo3" />
        </div>
        <div class="col-6">
          <input class="ant-input" type="text" id="certNo4" />
        </div>
      </div>
    </div>
  </div>
  <div class="ant-form-item has-error">
    <label class="col-6">电话号码：</label>
    <div class="col-16">
      <div class="row">
        <div class="col-4">
          <input class="ant-input" type="text" id="tel1" value="086" />
        </div>
        <div class="col-2">
          <p class="ant-form-split">--</p>
        </div>
        <div class="col-18">
          <div class="ant-input-group">
            <div class="col-8">
              <input class="ant-input" type="text" id="tel1" />
            </div>
            <div class="col-8">
              <input class="ant-input" type="text" id="tel2" />
            </div>
            <div class="col-8">
              <input class="ant-input" type="text" id="tel3" />
            </div>
          </div>
        </div>
        <p class="ant-form-explain">请输入正确的电话号码</p>
      </div>
    </div>
  </div>
</form> 
````
