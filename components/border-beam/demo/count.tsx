import React from 'react';
import { BorderBeam, Card, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
    <BorderBeam count={3}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
    <BorderBeam
      count={[
        { color: '#1677ff', size: 48 },
        { color: '#52c41a', size: 72 },
        { color: '#fa8c16', size: 96 },
      ]}
    >
      <Card title="Configured beams">
        Use an array to customize the color and size of each beam.
      </Card>
    </BorderBeam>
  </Flex>
);

export default App;
