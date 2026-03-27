import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Paragraph copyable editable>
      Paragraph action bar with copy and edit actions at the end.
    </Paragraph>
    <Paragraph copyable editable actions={{ placement: 'start' }}>
      Paragraph action bar with copy and edit actions at the start.
    </Paragraph>

    <Text style={{ display: 'block' }} editable>
      Text action bar with an edit action at the end.
    </Text>
    <Text style={{ display: 'block' }} editable actions={{ placement: 'start' }}>
      Text action bar with an edit action at the start.
    </Text>

    <Title level={5} copyable>
      Title action bar with a copy action at the end.
    </Title>
    <Title level={5} copyable actions={{ placement: 'start' }}>
      Title action bar with a copy action at the start.
    </Title>

    <Text copyable={{ text: 'Copyable text' }} actions={{ placement: 'start' }} />
  </div>
);

export default App;
