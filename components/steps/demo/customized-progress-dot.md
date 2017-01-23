---
order: 9
title:
  zh-CN: 自定义点状步骤条
  en-US: Customized Dot Style
---

## zh-CN

为点状步骤条增加自定义展示。

## en-US

You can customize the display for Steps with progress dot style.

````__react
import { Steps, Popover } from 'antd';
const Step = Steps.Step;

const customDot = (dot, stepObj) => {
  const content = <span>status: {stepObj.status}</span>;
  return <Popover content={content}>{dot}</Popover>;
};

ReactDOM.render(
  <Steps current={1} progressDot={customDot}>
    <Step title="Finished" description="You can hover on the dot." />
    <Step title="In Progress" description="You can hover on the dot." />
    <Step title="Waiting" description="You can hover on the dot." />
    <Step title="Waiting" description="You can hover on the dot." />
  </Steps>
, mountNode);
````
