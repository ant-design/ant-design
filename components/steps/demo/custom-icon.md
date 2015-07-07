# 自定义图标步骤条

- order: 2

通过设置`Steps.Step`的`icon`属性，可以启用自定义图标。

---

<style>
.my-step-icon {
  width: 35px;
  height: 35px;
  font-size: 35px;
  line-height: 1;
  position: relative;
  top: -9px;
}
.my-step-icon > img {
  width: 45px;
  height: 45px;
}
</style>

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-custom-icon');


React.render(<Steps>
  <Step status='finish' title='步骤1' icon={<div className='my-step-icon'><span className='anticon anticon-cloud'></span></div>}></Step>
  <Step status='process' title='步骤2' icon={<div className='my-step-icon'><span className='anticon anticon-apple'></span></div>}></Step>
  <Step status='wait' title='步骤3' icon={<div className='my-step-icon'><span className='anticon anticon-github'></span></div>}></Step>
</Steps>, container);
````
