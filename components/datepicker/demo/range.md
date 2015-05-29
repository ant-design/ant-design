# 范围

- order: 3
- description: 设置可选日期的范围，用 disabled 方法来定义不可选择时间。比如不可选择今天之后的日期。

---

````jsx
var Datepicker = antd.datepicker;
var disabledDate = function(current, value) {
  // can not select days after today
  return current.getTime() > Date.now();
};

React.render(
  <Datepicker disabled={disabledDate} />
, document.getElementById('components-datepicker-demo-range'));
````
