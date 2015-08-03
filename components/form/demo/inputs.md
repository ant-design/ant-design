# Input 输入框集合

- order: 5

带标签的输入框：使用 `.ant-input-group` 类并结合 `.ant-input-group-addon` 类可以创建带标签的输入框。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;

React.render(
<form className="ant-form-horizontal">
  <div className="ant-form-item">
    <label className="col-6" for="site1">标签输入框：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <span className="ant-input-group-addon" id="basic-addon1">Http://</span>
        <input type="text" id="site1" className="ant-input" value="mysite.com" />
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6" for="site3">标签输入框：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <span className="ant-input-group-addon" id="basic-addon3">Http://</span>
        <input type="text" className="ant-input" id="site3" value="mysite" />
        <span className="ant-input-group-addon" id="basic-addon4">.com</span>
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6" for="site4">select 标签输入框：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <input type="text" className="ant-input" id="site4" placeholder="www.mysite" />
        <div className="ant-input-group-wrap">
          <Select value=".com" style={{width:65}}>
            <Option value=".com">.com</Option>
            <Option value=".jp">.jp</Option>
            <Option value=".cn">.cn</Option>
            <Option value=".org">.org</Option>
          </Select>
        </div>
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6">输入身份证：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <div className="col-6">
          <input className="ant-input" type="text" id="certNo1" />
        </div>
        <div className="col-6">
          <input className="ant-input" type="text" id="certNo2" />
        </div>
        <div className="col-6">
          <input className="ant-input" type="text" id="certNo3" />
        </div>
        <div className="col-6">
          <input className="ant-input" type="text" id="certNo4" />
        </div>
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6">电话号码：</label>
    <div className="col-16">
      <div className="row">
        <div className="col-4">
          <input className="ant-input" type="text" id="tel1" value="086" />
        </div>
        <div className="col-2">
          <p className="ant-form-split">--</p>
        </div>
        <div className="col-18">
          <div className="ant-input-group">
            <div className="col-8">
              <input className="ant-input" type="text" id="tel1" />
            </div>
            <div className="col-8">
              <input className="ant-input" type="text" id="tel2" />
            </div>
            <div className="col-8">
              <input className="ant-input" type="text" id="tel3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
, document.getElementById('components-form-demo-inputs'));
````
