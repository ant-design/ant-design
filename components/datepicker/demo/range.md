# 范围

- order: 3

设置 `disabledDate` 方法，来确定不可选时段。

如上例：不可选择今天之后的日期。

---

````jsx
var Datepicker = antd.Datepicker;
var disabledDate = function(current, value) {
  // can not select days after today
  return current.getTime() > Date.now();
};

React.render(
  <Datepicker disabledDate={disabledDate} />
, document.getElementById('components-datepicker-demo-range'));
````
