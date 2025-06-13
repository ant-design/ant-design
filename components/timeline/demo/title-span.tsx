import React from 'react';
import { Flex, Timeline } from 'antd';

const App: React.FC = () => {
  const sharedProps = {
    items: [
      {
        title: '05:10',
        content: 'Create a services',
      },
      {
        title: '09:03',
        content: 'Solve initial network problems',
      },
      {
        content: 'Technical testing',
      },
      {
        title: '11:28',
        content: 'Network problems being solved',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Timeline {...sharedProps} titleSpan="25%" />
      <Timeline {...sharedProps} titleSpan={18} mode="end" />
    </Flex>
  );
};

export default App;
