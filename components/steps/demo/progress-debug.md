---
order: 99
title:
  zh-CN: Progress Debug
  en-US: Progress Debug
debug: true
---

## zh-CN

Buggy!

## en-US

Buggy!

```jsx
import { Steps, Button } from 'antd';

const { Step } = Steps;

function Demo() {
  const [percent, setPercentage] = React.useState(0);
  const [current, setCurrent] = React.useState(1);
  const [status, setStatus] = React.useState('process');
  return (
    <>
      <Button onClick={() => setPercentage(undefined)}>Percentage to undefined</Button>
      <Button onClick={() => setPercentage((percent + 10) % 100)}>Percentage +</Button>
      <Button
        onClick={() => {
          setCurrent((current + 1) % 3);
          setPercentage(0);
        }}
      >
        Current +
      </Button>
      <Button onClick={() => setStatus('wait')}>Status Wait</Button>
      <Button onClick={() => setStatus('process')}>Status Process</Button>
      <Button onClick={() => setStatus('finish')}>Status Finish</Button>
      <Button onClick={() => setStatus('error')}>Status Error</Button>
      <Steps current={current} percent={percent} status={status}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
      <Steps current={current} percent={percent} status={status} size="small">
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
      <Steps current={current} percent={percent} status={status} direction="vertical">
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
      <Steps current={current} percent={percent} status={status} size="small" direction="vertical">
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```
