import React from 'react';
import { BorderBeam, Card, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
    <BorderBeam count={3}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
    <BorderBeam count={2}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
  </Flex>
);

export default App;
