# 三种大小

- order: 1

三种大小的数字输入框，当 className 分别为 `ant-input-number-lg` 和 `ant-input-number-sm` 时，输入框高度为 `32px` 和 `22px` ，默认高度为 `28px`

---

````jsx
var InputNumber = antd.InputNumber;

function onChange(value) {
  console.log('changed', value);
}

React.render(
<div>
  <InputNumber className="ant-input-number-lg" min={1} max={100000} defaultValue={3} onChange={onChange} />
  <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
  <InputNumber className="ant-input-number-sm" min={1} max={100000} defaultValue={3} onChange={onChange} />
</div>
, document.getElementById('components-input-number-demo-size'));
````

````css
.ant-input-number{
  margin-right: 10px;
}
````