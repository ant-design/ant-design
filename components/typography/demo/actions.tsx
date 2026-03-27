import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Paragraph copyable actions={{ placement: 'start' }}>
      Paragraph copy action at the start.
    </Paragraph>

    <Text style={{ display: 'block' }} copyable actions={{ placement: 'start' }}>
      Text copy action at the start.
    </Text>

    <Title level={5} copyable actions={{ placement: 'start' }}>
      Title copy action at the start.
    </Title>
  </div>
);

export default App;
