import React, { useState } from 'react';
import { Button, Flex, Timeline } from 'antd';

const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      <Timeline
        pending="Recording..."
        reverse={reverse}
        items={[
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            children: 'Technical testing 2015-09-01',
          },
        ]}
      />
      <Button type="primary" onClick={handleClick}>
        Toggle Reverse
      </Button>
    </Flex>
  );
};

export default App;
