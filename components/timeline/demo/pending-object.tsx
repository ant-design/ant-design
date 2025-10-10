import React from 'react';
import { Timeline, Divider } from 'antd';
import { LoadingOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <div>
    <h4>🆕 Pending as Object with Custom Properties</h4>
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
        style: { fontWeight: 'bold', color: 'red' },
      }}
    />

    <Divider />
    
    <h4>🆕 Pending as Object with Loading State</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
        { content: 'Solve initial network problems 2015-09-01' },
      ]}
      pending={{
        content: 'Processing...',
        loading: true,
        color: 'blue',
        title: 'Current Task',
      }}
    />

    <Divider />

    <h4>🆕 Pending as Object with Legacy Properties</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending={{
        children: 'Using legacy children prop',
        dot: <CheckCircleOutlined style={{ color: 'orange' }} />,
        label: 'Legacy Label',
        position: 'right' as const,
      }}
    />

    <Divider />

    <h4>✅ Backward Compatibility - React Node</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending={<span style={{ color: 'green' }}>React Node Pending</span>}
      pendingDot={<LoadingOutlined style={{ color: 'green' }} />}
    />

    <Divider />

    <h4>✅ Backward Compatibility - Boolean True</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending={true}
      pendingDot={<LoadingOutlined style={{ color: 'blue' }} />}
    />

    <Divider />

    <h4>✅ Backward Compatibility - String</h4>
    <Timeline
      items={[
        { content: 'Create a services site 2015-09-01' },
      ]}
      pending="String pending content"
    />
  </div>
);

export default App;