# 表单组合

- order: 7

集中营，展示和表单相关的其他 ant-design 组件。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;
var InputNumber = antd.InputNumber;
var Datepicker = antd.Datepicker;
var Switch = antd.Switch;
var Menu = antd.Menu;
var Dropdown = antd.Dropdown;
var Slider = antd.Slider;
var Checkbox = antd.Checkbox;

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

function handleSelectChange(value) {
  console.log('selected ' + value);
}

function onInputNumberChange(v){
  console.log('changed',v);
}

React.render(
  <form className="ant-form-horizontal">
    <div className="ant-form-item">
      <label className="col-6" required>Input-Number:</label>
      <div className="col-6">
        <InputNumber min={1} max={10} defaultValue={3} onChange={onInputNumberChange} style={{width:100}}/>
      </div>
      <div className="col-3"><p className="ant-form-text"> 台机器</p></div>
    </div>
    <div className="ant-form-item">
      <label className="col-6" required><i className="anticon anticon-exclamation-circle"></i>我是标题:</label>
      <div className="col-7">
        <p className="ant-form-text">唧唧复唧唧木兰当户织呀</p>
      </div>
      <div className="col-9">
        <p className="ant-form-text">
          <a href="javascript:;">链接文字</a>
        </p>
      </div>
    </div>
    <div className="ant-form-item">
      <label for="" className="col-6" required>Switch 开关:</label>
      <div className="col-10">
        <Switch />
      </div>
    </div>
    <div className="ant-form-item">
      <label for="" className="col-6" required>Slider 滑动输入条:</label>
      <div className="col-10">
        <Slider marks={["A","B","C","D","E","F","G"]} />
      </div>
    </div>
    <div className="ant-form-item">
      <label for="" className="col-6" required>Select 选择器:</label>
      <div className="col-18">
        <Select value="lucy" style={{width:200}} onChange={handleSelectChange}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>disabled</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
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
      <label for="" className="col-6" required>ant-radio:</label>
      <div className="col-10">
        <p className="ant-form-text">请填写 ant-design 的 radio</p>
      </div>
    </div>
    <div className="ant-form-item">
      <label for="" className="col-6" required>ant-checkbox:</label>
      <div className="col-10">
        <p className="ant-form-text">
         <Checkbox />
        </p>
      </div>
    </div>
    <div className="ant-form-item">
      <label for="" className="col-6" required>Datepicker:</label>
      <div className="col-6">
        <Datepicker value="" />
      </div>
      <div className="col-2">
        <p className="ant-form-split">--</p>
      </div>
      <div className="col-6">
        <Datepicker value="" />
      </div>
    </div>
    <div className="ant-form-item has-error">
      <label for="" className="col-6" required>Datepicker 校验:</label>
      <div className="col-6">
        <Datepicker value="" />
      </div>
      <div className="col-2">
        <p className="ant-form-split">--</p>
      </div>
      <div className="col-6">
        <Datepicker value="" />
      </div>
      <div className="col-19 col-offset-6">
        <p className="ant-form-explain">请输入正确选项</p>
      </div>
    </div>
  </form>
, document.getElementById('components-form-demo-mix'));
````
