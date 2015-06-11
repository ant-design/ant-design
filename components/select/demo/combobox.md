# combobox

- order: 2

combobox

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

var style = {
  color: 'red'
};
var c3 = (
  <div>
    <div style={{width: 300}}>
      <Select combobox>
        <Option value="jack">
          <b style={style}>jack</b>
        </Option>
        <Option value="lucy" >lucy</Option>
        <Option value="disabled" disabled>disabled</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </div>
  </div>
);

React.render(
  c3
, document.getElementById('components-select-demo-combobox'));
````
