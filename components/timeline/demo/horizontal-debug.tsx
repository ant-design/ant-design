import React from 'react';
import { Divider, Flex, GetProp, Timeline } from 'antd';

const longText = 'Long Text '.repeat(5);

const renderTimeline = (mode: GetProp<typeof Timeline, 'mode'>) => (
  <Timeline
    mode={mode}
    orientation="horizontal"
    styles={{
      item: {
        boxShadow: '0 0 1px rgba(255,0,0,0.6)',
      },
    }}
    items={[
      {
        title: longText,
        content: longText,
      },
      {
        content: longText,
      },
      {
        content: longText,
      },
      {
        title: longText,
        content: longText,
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
