# 切换到下一步

- order: 3

随机生成 3~6 个步骤，初始随机进行到其中一个步骤。

---

````css
#components-steps-demo-step-next > div > div {
  margin-bottom: 30px;
}
````

````jsx
import { Steps, Button } from 'antd';
const Step = Steps.Step;
const array = Array.apply(null, Array(Math.floor(Math.random() * 3) + 3));
const steps = array.map(function(item, i) {
  return {
    title: '步骤' + (i + 1)
  };
});

const App = React.createClass({
  getInitialState() {
    return {
      currentStep: Math.floor(Math.random() * steps.length)
    };
  },
  next() {
    let s = this.state.currentStep + 1;
    if (s === steps.length) {
      s = 0;
    }
    this.setState({
      currentStep: s
    });
  },
  render() {
    const cs = this.state.currentStep;
    return (
      <div>
        <div>当前正在执行第 {cs + 1} 步</div>
        <Steps current={cs}>
          {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
        </Steps>
        <div>
          <Button onClick={this.next}>下一步</Button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('components-steps-demo-step-next'));
````
