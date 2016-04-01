---
order: 1
title: 迷你版
---

迷你版的步骤条，通过设置 `<Steps size="small">` 启用.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

const steps = [{
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
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

ReactDOM.render(<Steps size="small" current={1}>{steps}</Steps>, mountNode);
````
