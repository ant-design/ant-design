# Input 输入框集合

- order: 5

使用 `.ant-input-group` 类并结合 `.ant-input-group-addon` 类可以创建带标签的 Input 输入框。

---

````jsx

var Menu = antd.Menu;
var Dropdown = antd.Dropdown;

var menu = <Menu>
  <Menu.Item>
    <a target="_blank" href="http://www.alipay.com/">.net</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.taobao.com/">.jp</a>
  </Menu.Item>
  <Menu.Item>
    <a target="_blank" href="http://www.tmall.com/">.org</a>
  </Menu.Item>
</Menu>;

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
    <label className="col-6" for="site4">按钮式下拉输入框：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <input type="text" className="ant-input" id="site4" placeholder="Search for..." />
        <div className="ant-input-group-btn">    
          <Dropdown overlay={menu}>
            <button className="ant-btn ant-btn-menu">
              .com <i className="anticon anticon-down"></i>
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6" for="site5">带按钮的输入框：</label>
    <div className="col-16">
      <div className="ant-input-group">
        <input type="text" className="ant-input" id="site5" placeholder="Search for..." />
        <div className="ant-input-group-btn">
          <button className="ant-btn" type="button">GO!</button>
        </div>
      </div>
    </div>
  </div>
  <div className="ant-form-item">
    <label className="col-6">输入身份证：</label>
    <div className="col-16">
    <div className="row">
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
  <div className="ant-form-item has-error">
    <label className="col-6">电话号码：</label>
    <div className="col-16">
      <div className="row">
        <div className="col-4">
          <input className="ant-input" type="text" id="tel1" value="086" />
        </div>
        <div className="col-2">
          <p className="ant-form-split">--</p>
        </div>
        <div className="col-6">
          <input className="ant-input" type="text" id="tel2" />
        </div>
        <div className="col-6">
          <input className="ant-input" type="text" id="tel3" />
        </div>      
        <div className="col-6">
          <input className="ant-input" type="text" id="tel4" />
        </div>
        <p className="ant-form-explain">请输入正确的电话号码</p>
      </div>
    </div>
  </div>
</form> 
, document.getElementById('components-form-demo-inputs'));
````
