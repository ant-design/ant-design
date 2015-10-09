# Input 输入框集合

- order: 5

---

````jsx
var Form = antd.Form;
var Input = Form.Input;
var FormItem = Form.Item;
var InputGroup = Input.Group;
var Select = antd.Select;
var Option = Select.Option;

React.render(
<Form horizontal>
  <FormItem
    label="标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Input type="text" addonBefore="Http://" value="mysite.com" id="site1"/>
  </FormItem>

  <FormItem
    label="标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <Input type="text" addonBefore="Http://"  addonAfter=".com" value="mysite" id="site2"/>
  </FormItem>

  <FormItem
    label="select 标签输入框："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <InputGroup>
      <Input type="text" id="site4" placeholder="www.mysite" />
      <div className="ant-input-group-wrap">
        <Select defaultValue=".com" style={{width:70}}>
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
        </Select>
      </div>
    </InputGroup>
  </FormItem>

  <FormItem
    label="输入身份证："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <InputGroup>
      <div className="col-6">
        <Input type="text" id="certNo1" />
      </div>
      <div className="col-6">
        <Input type="text" id="certNo2" />
      </div>
      <div className="col-6">
        <Input type="text" id="certNo3" />
      </div>
      <div className="col-6">
        <Input type="text" id="certNo4" />
      </div>
    </InputGroup>
  </FormItem>

  <FormItem
    label="电话号码："
    labelClassName="col-6"
    wrapperClassName="col-16">
    <div className="row">
      <div className="col-4">
        <Input type="text" id="tel1" value="086" />
      </div>
      <div className="col-2">
        <p className="ant-form-split">--</p>
      </div>
      <div className="col-18">
        <InputGroup type="group">
          <div className="col-8">
            <Input type="text" id="tel1" />
          </div>
          <div className="col-8">
            <Input type="text" id="tel2" />
          </div>
          <div className="col-8">
            <Input type="text" id="tel3" />
          </div>
        </InputGroup>
      </div>
    </div>
  </FormItem>
</Form>

, document.getElementById('components-form-demo-inputs'));
````
