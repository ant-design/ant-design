# 竖直方向的小型步骤条

- order: 5

简单的竖直方向的小型步骤条。

---

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-vertical-small');

var steps = [{
  status: 'finish',
  title: '已完成',
  description: '这里是多信息的描述啊这里是多信息的描述啊这里是多信息的描述啊这里是多信息的描述啊这里是多信息的描述啊'
}, {
  status: 'process',
  title: '进行中',
  description: '描述啊描述啊描述啊描述啊描述啊描述啊'
}, {
  status: 'wait',
  title: '待运行',
  description: '描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊描述啊'
}].map(function(s, i) {
  return (<Step
    key={i}
    status={s.status}
    title={s.title}
    description={s.description}></Step>
  );
});

React.render(<Steps size='small' direction='vertical'>{steps}</Steps>, container);
````
