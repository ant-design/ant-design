# 迷你版

- order: 1

迷你版的步进条，通过设置`<Steps size='small'>`启用.

---

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-small-size');

var steps = [{
  status: 'finish',
  title: '已完成'
}, {
  status: 'process',
  title: '进行中'
}, {
  status: 'wait',
  title: '待运行'
}, {
  status: 'wait',
  title: '待运行'
}].map(function(s, i) {
  return (<Step
    key={i}
    status={s.status}
    title={s.title}>
  </Step>);
});

React.render(<Steps size="small">{steps}</Steps>, container);
````
