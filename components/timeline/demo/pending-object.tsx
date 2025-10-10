import React from 'react';
import { Timeline } from 'antd';
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <div>
    <h4>Pending as Object with Custom Properties</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
        { content: 'Solve initial network problems 2015-09-01' },
        { content: 'Technical testing 2015-09-01' },
      ]}
      pending={{
        content: 'Recording with custom icon...',
        icon: <ClockCircleOutlined style={{ color: 'red' }} />,
        className: 'custom-pending-item',
        style: { fontWeight: 'bold' },
      }}
    />

    <h4>Pending as Object with Loading State</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
        { content: 'Solve initial network problems 2015-09-01' },
      ]}
      pending={{
        content: 'Processing...',
        loading: true,
        color: 'blue',
      }}
    />

    <h4>Pending as Object with Legacy Properties</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending={{
        children: 'Using legacy children prop',
        dot: <LoadingOutlined />,
        label: 'Legacy Label',
        position: 'right' as const,
      }}
    />

    <h4>Backward Compatibility - React Node</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending={<span style={{ color: 'green' }}>React Node Pending</span>}
      pendingDot={<LoadingOutlined style={{ color: 'green' }} />}
    />
  </div>
);

export default App;