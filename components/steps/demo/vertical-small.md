# 竖直方向的小型步骤条

- order: 5

简单的竖直方向的小型步骤条。

---

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-vertical-small');

var steps = [{
  title: '已完成',
  description: '这里是信息的描述'
}, {
  title: '进行中',
  description: '这里是信息的描述'
}, {
  title: '待运行',
  description: '这里是信息的描述'
}].map(function(s, i) {
  return (
    <Step key={i} title={s.title} description={s.description} />
  );
});

ReactDOM.render(<Steps size='small' direction='vertical' current={1}>{steps}</Steps>, container);
````
