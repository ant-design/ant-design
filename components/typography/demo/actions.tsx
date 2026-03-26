import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Paragraph copyable>Paragraph action bar at the end.</Paragraph>
    <Paragraph copyable actions={{ placement: 'start' }}>
      Paragraph action bar at the start.
    </Paragraph>

    <Text style={{ display: 'block' }} copyable>
      Text action bar at the end.
    </Text>
    <Text style={{ display: 'block' }} copyable actions={{ placement: 'start' }}>
      Text action bar at the start.
    </Text>

    <Title level={5} copyable>
      Title action bar at the end.
    </Title>
    <Title level={5} copyable actions={{ placement: 'start' }}>
      Title action bar at the start.
    </Title>
  </div>
);

export default App;
