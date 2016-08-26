---
order: 3
title:
  zh-CN: 切换到下一步
  en-US: Switch to next
---

## zh-CN

随机生成 3~6 个步骤，初始随机进行到其中一个步骤。

## en-US

Let's generate 3~6 steps randomly, and proceed to a random step.

````jsx
import { Steps, Button } from 'antd';
const Step = Steps.Step;
const array = [...Array(Math.floor(Math.random() * 3) + 3)];
const steps = array.map((item, i) => ({
  title: `步骤${i + 1}`,
}));

const App = React.createClass({
  getInitialState() {
    return {
      current: Math.floor(Math.random() * steps.length),
    };
  },
  next() {
    let current = this.state.current + 1;
    if (current === steps.length) {
      current = 0;
    }
    this.setState({ current });
  },
  render() {
    const { current } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 24 }}>当前正在执行第 {current + 1} 步</div>
        <Steps current={current}>
          {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
        </Steps>
        <div style={{ marginTop: 24 }}>
          <Button onClick={this.next}>下一步</Button>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
