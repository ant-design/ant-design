---
order: 6
title: 步骤运行错误
---

使用 Steps 的 `status` 属性来指定当前步骤的状态。

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

const steps = [{
  title: '已完成',
  description: '这里是多信息的描述啊',
}, {
  title: '错误示例',
  description: '这里是多信息的耶哦耶哦哦耶哦耶',
}, {
  title: '又一个待运行',
  description: '描述啊描述啊',
}, {
  title: '待运行',
  description: '这里是多信息的描述啊',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

ReactDOM.render(<Steps current={1} status="error">{steps}</Steps>, mountNode);
````
