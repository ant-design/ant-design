# 基本用法

- order: 0

简单的步骤条。

---

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-simple');

var steps = [{
  status: 'finish',
  title: '已完成',
  description: '这里是多信息的描述啊'
}, {
  status: 'process',
  title: '进行中',
  description: '这里是多信息的耶哦耶哦哦耶哦耶哦耶哦耶哦耶'
}, {
  status: 'wait',
  title: '又一个待运行',
  description: '描述啊描述啊'
}, {
  status: 'wait',
  title: '待运行',
  description: '这里是多信息的描述啊'
}].map(function(s, i) {
  return (<Step
    key={i}
    status={s.status}
    title={s.title}
    description={s.description}></Step>
  );
});

React.render(<Steps>{steps}</Steps>, container);
````
