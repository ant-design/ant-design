# Input 输入框集合

- order: 5

---

````jsx
var Form = antd.Form;
var Select = antd.Select;
var Option = Select.Option;

ReactDOM.render(
<Form horizontal>
  <Form.Item
    label="标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Form.Input type="text" addonBefore="Http://" value="mysite.com" id="site1"/>
  </Form.Item>

  <Form.Item
    label="标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Form.Input type="text" addonBefore="Http://"  addonAfter=".com" value="mysite" id="site2"/>
  </Form.Item>

  <Form.Item
    label="select 标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Form.InputGroup>
      <Form.Input type="text" id="site4" placeholder="www.mysite" />
      <div className="ant-input-group-wrap">
        <Select defaultValue=".com" style={{width:70}}>
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
        </Select>
      </div>
    </Form.InputGroup>
  </Form.Item>

  <Form.Item
    label="输入身份证："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Form.InputGroup>
      <div className="col-6">
        <Form.Input type="text" id="certNo1" />
      </div>
      <div className="col-6">
        <Form.Input type="text" id="certNo2" />
      </div>
      <div className="col-6">
        <Form.Input type="text" id="certNo3" />
      </div>
      <div className="col-6">
        <Form.Input type="text" id="certNo4" />
      </div>
    </Form.InputGroup>
  </Form.Item>

  <Form.Item
    label="电话号码："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <div className="row">
      <div className="col-4">
        <Form.Input type="text" id="tel1" value="086" />
      </div>
      <div className="col-2">
        <p className="ant-form-split">--</p>
      </div>
      <div className="col-18">
        <Form.InputGroup type="group">
          <div className="col-8">
            <Form.Input type="text" id="tel1" />
          </div>
          <div className="col-8">
            <Form.Input type="text" id="tel2" />
          </div>
          <div className="col-8">
            <Form.Input type="text" id="tel3" />
          </div>
        </Form.InputGroup>
      </div>
    </div>
  </Form.Item>
</Form>

, document.getElementById('components-form-demo-inputs'));
````
