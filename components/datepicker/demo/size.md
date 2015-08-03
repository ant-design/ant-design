# 三种大小

- order: 1

三种大小的输入框，`size`为`lg`和`sm`分别表示高为`32px`和`22px`，默认`28px`。

---

````jsx
// or require('antd/lib/datepicker');
var Datepicker = antd.Datepicker;

React.render(
  <div>
    <Datepicker size="sm" value="" />
    <Datepicker value="" />
    <Datepicker size="lg" value="" />
  </div>
, document.getElementById('components-datepicker-demo-size'));
````
