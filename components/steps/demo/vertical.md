# 竖直方向的步骤条

- order: 4

简单的竖直方向的步骤条。

---

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-vertical');

var steps = [{
  title: '已完成',
  description: '这里是信息的描述'
}, {
  title: '进行中',
  description: '这里是信息的描述'
}, {
  title: '待运行',
  description: '这里是信息的描述'
}, {
  title: '又一个待运行',
  description: '这里是信息的描述'
}].map(function(s, i) {
  return (
    <Step key={i} title={s.title} description={s.description} />
  );
});

React.render(<Steps direction='vertical' current={1}>{steps}</Steps>, container);
````
