import React, { useState } from 'react';
import { Button, Card, Radio, Splitter } from 'antd';

import type { SplitterProps } from '../Splitter';

const App: React.FC = () => {
  const [layout, setLayout] = useState<SplitterProps['layout']>('horizontal');
  const [count, setCount] = useState(0);

  return (
    <>
      <Radio.Group
        value={layout}
        style={{ marginBottom: 24 }}
        onChange={(e) => setLayout(e.target.value)}
      >
        <Radio.Button value="vertical">vertical</Radio.Button>
        <Radio.Button value="horizontal">horizontal</Radio.Button>
      </Radio.Group>

      <Button onClick={() => setCount(count + 1)}>{count}</Button>

      <Splitter
        layout={layout}
        style={{
          height: 300,
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Splitter.Panel max="200px" defaultSize="100px" collapsible>
          <Card title="first" bordered={false}>
            <div>{count > 2 ? <h1>{count}</h1> : 'something'}</div>
          </Card>
        </Splitter.Panel>

        <Splitter.Panel>
          <Card title="second" bordered={false}>
            <div>something</div>
          </Card>
        </Splitter.Panel>
      </Splitter>
    </>
  );
};

export default App;
