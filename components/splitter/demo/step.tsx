import React from 'react';
import { Flex, Space, Splitter, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <div>
      <Typography.Title level={5}>Two Panels with Step: ["10%"]</Typography.Title>
      <Typography.Text type="secondary">
        Drag the splitter bar and it will snap to 10% positions. Panel1 can snap to 0 when dragged
        to the left, and snap to 100% when dragged to the right.
      </Typography.Text>
      <Splitter
        step={['10%']}
        style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel defaultSize="30%" min="0" max="100%">
          <Desc text="First Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second Panel" />
        </Splitter.Panel>
      </Splitter>
    </div>

    <div>
      <Typography.Title level={5}>Two Panels with Step and Lazy Mode: ["10%"]</Typography.Title>
      <Typography.Text type="secondary">
        Lazy mode: dragging does not update the size immediately, but updates when released.
        Combined with step snapping.
      </Typography.Text>
      <Splitter
        lazy
        step={['10%']}
        style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel defaultSize="30%" min="0" max="100%">
          <Desc text="First Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second Panel" />
        </Splitter.Panel>
      </Splitter>
    </div>

    <div>
      <Typography.Title level={5}>Step with percentage: ["10%"]</Typography.Title>
      <Typography.Text type="secondary">
        Drag the splitter bar and it will snap to 10% or 30% positions
      </Typography.Text>
      <Splitter
        step={['10%']}
        style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel defaultSize="20%" min="0" max="100%">
          <Desc text="First Panel" />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="70%" min="0" max="100%">
          <Desc text="Second Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Third Panel" />
        </Splitter.Panel>
      </Splitter>
    </div>

    <div>
      <Typography.Title level={5}>Step with pixels: [100, 200, 500]</Typography.Title>
      <Typography.Text type="secondary">
        Drag the splitter bar and it will snap to 100px, 200px, or 500px positions
      </Typography.Text>
      <Splitter
        step={[100, 200, 500]}
        style={{ height: 200, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel defaultSize={150} min={100} max={600}>
          <Desc text="First Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Third Panel" />
        </Splitter.Panel>
      </Splitter>
    </div>

    <div>
      <Typography.Title level={5}>Vertical Splitter with Step</Typography.Title>
      <Typography.Text type="secondary">
        Vertical splitter with step={['20%', '50%', '80%']}
      </Typography.Text>
      <Splitter
        vertical
        step={['20%', '50%', '80%']}
        style={{ height: 300, marginTop: 16, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel defaultSize="25%">
          <Desc text="Top Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Middle Panel" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Bottom Panel" />
        </Splitter.Panel>
      </Splitter>
    </div>
  </Space>
);

export default App;
