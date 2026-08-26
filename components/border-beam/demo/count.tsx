import React from 'react';
import { BorderBeam, Card, Flex } from 'antd';

const beamPattern = [
  { color: '#1677ff', size: 48 },
  { color: '#52c41a', size: 72 },
];

const App: React.FC = () => (
  <Flex vertical gap="medium">
    <BorderBeam count={3}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
    <BorderBeam count={4} getItemConfig={(index) => beamPattern[index % beamPattern.length]}>
      <Card title="Configured beams">
        Use getItemConfig to cycle through color and size configurations.
      </Card>
    </BorderBeam>
  </Flex>
);

export default App;
