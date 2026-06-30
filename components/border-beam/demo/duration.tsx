import React from 'react';
import { BorderBeam, Card, Flex, Tag, Typography } from 'antd';

const durations = [
  {
    name: 'Fast',
    seconds: 3,
    description: 'A quick loop for temporary highlights and active modules.',
  },
  {
    name: 'Default',
    seconds: 6,
    description: 'The original pacing for most emphasized containers.',
  },
  {
    name: 'Slow',
    seconds: 12,
    description: 'A calmer loop for persistent panels and ambient surfaces.',
  },
];

const App: React.FC = () => (
  <Flex gap={16} wrap>
    {durations.map(({ name, seconds, description }) => (
      <div key={name} style={{ width: 220 }}>
        <BorderBeam duration={seconds}>
          <Card title={name} extra={<Tag variant="filled">{seconds}s</Tag>}>
            <Typography.Text type="secondary">{description}</Typography.Text>
          </Card>
        </BorderBeam>
      </div>
    ))}
  </Flex>
);

export default App;
