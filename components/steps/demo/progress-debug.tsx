import React, { useState } from 'react';
import type { StepsProps } from 'antd';
import { Button, Space, Steps } from 'antd';

const App: React.FC = () => {
  const [percent, setPercentage] = useState<number | undefined>(0);
  const [current, setCurrent] = useState(1);
  const [status, setStatus] = useState<StepsProps['status']>('process');
  const content = 'This is a content.';
  const items = [
    {
      title: 'Finished',
      content,
    },
    {
      title: 'In Progress',
      subTitle: 'Left 00:00:08',
      content,
    },
    {
      title: 'Waiting',
      content,
    },
  ];
  return (
    <>
      <Space.Compact block>
        <Button onClick={() => setPercentage(undefined)}>Percentage to undefined</Button>
        <Button
          onClick={() =>
            setPercentage((prev) => {
              const next = (prev ?? 0) + 10;
              return next > 100 ? 0 : next;
            })
          }
        >
          Percentage +
        </Button>
        <Button onClick={() => setCurrent((prev) => (prev + 1) % 3)}>Current +</Button>
        <Button onClick={() => setStatus('wait')}>Status Wait</Button>
        <Button onClick={() => setStatus('process')}>Status Process</Button>
        <Button onClick={() => setStatus('finish')}>Status Finish</Button>
        <Button onClick={() => setStatus('error')}>Status Error</Button>
      </Space.Compact>
      <br />
      <Steps current={current} percent={percent} status={status} items={items} />
      <Steps current={current} percent={percent} status={status} size="small" items={items} />
      <Steps
        current={current}
        percent={percent}
        status={status}
        orientation="vertical"
        items={items}
      />
      <Steps
        current={current}
        percent={percent}
        status={status}
        size="small"
        orientation="vertical"
        items={items}
      />
      {percent}
    </>
  );
};

export default App;
