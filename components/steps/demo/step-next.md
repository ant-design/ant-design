# 切换到下一步

- order: 3

随机生成3~6个步骤，初始随机进行到其中一个步骤。

---

````css
form.my-step-form > div {
  margin-bottom: 30px;
}
````

````jsx
var Steps = antd.Steps;
var Step = Steps.Step;
var container = document.getElementById('components-steps-demo-step-next');
var steps = (function generateRandomSteps() {
  var n = Math.floor(Math.random() * 3) + 3;
  var arr = [];
  for (var i = 0; i < n; i++ ) {
    arr.push({
      title: '步骤' + (i+1)
    });
  }
  return arr;
})();

var MyForm = React.createClass({
  getInitialState() {
    return {
      currentStep: Math.floor(Math.random() * steps.length)
    }
  },
  nextStep() {
    var s = this.state.currentStep + 1;
    if (s === steps.length) {
      s = 0;
    }
    this.setState({
      currentStep: s
    });
  },
  render() {
    var cs = this.state.currentStep;
    return (<form className='my-step-form'>
      <div>当前正在执行第{cs + 1}步</div>
      <div className='my-step-container'><Steps>
        {steps.map(function(s, i) {
          return <Steps.Step
            key={i}
            status={cs === i ? 'process' : (cs > i ? 'finish' : 'wait')}
            title={s.title}
            ></Steps.Step>
        })}
      </Steps></div>
      <div><span className='ant-btn' onClick={this.nextStep}>下一步</span></div>
    </form>)
  }
});

React.render(<MyForm></MyForm>, container);
````
