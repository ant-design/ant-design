import React from 'react';
import { Divider, Flex, GetProp, Timeline } from 'antd';

const renderTimeline = (mode: GetProp<typeof Timeline, 'mode'>) => (
  <Timeline
    mode={mode}
    orientation="horizontal"
    items={[
      {
        content: 'Init',
      },
      {
        content: 'Start',
      },
      {
        content: 'Pending',
      },
      {
        content: 'Completed',
      },
    ]}
  />
);

const App: React.FC = () => (
  <Flex vertical>
    {renderTimeline('start')}
    <Divider />
    {renderTimeline('end')}
    <Divider />
    {renderTimeline('alternate')}
  </Flex>
);

export default App;
