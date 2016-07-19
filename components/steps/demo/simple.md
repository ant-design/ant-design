---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

简单的步骤条。

## en-US

The most basic step bar.

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

const steps = [{
  title: '已完成',
  description: '这里是多信息的描述啊',
}, {
  title: '进行中',
  description: '这里是多信息的耶哦耶哦哦耶哦耶',
}, {
  title: '又一个待运行',
  description: '描述啊描述啊',
}, {
  title: '待运行',
  description: '这里是多信息的描述啊',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

ReactDOM.render(<Steps current={1}>{steps}</Steps>, mountNode);
````
