# 自定义关闭

- order: 4

可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。

---

````jsx
var Alert = antd.Alert;
var link = <a href="javascript:;">不再提醒</a>

ReactDOM.render(
<Alert message="消息提示的文案" type="info" closeText={link} />
, document.getElementById('components-alert-demo-close-type'));
````
