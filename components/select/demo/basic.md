# 基本使用

- order: 0

基本使用

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}


var c1 = (
  <div>
    <h1>Single Select</h1>
    <div style={{width: 300}}>
      <Select value="lucy" style={{width:250}} onChange={handleChange}>
        <Option value="jack">
          <b style={{
            color: 'red'
          }}>jack</b>
        </Option>
        <Option value="lucy">lucy</Option>
        <Option value="disabled" disabled>disabled</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </div>
  </div>
);

React.render(
  c1
, document.getElementById('components-select-demo-basic'));
````
