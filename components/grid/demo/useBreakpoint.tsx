import React from 'react';
import { Flex, Grid, Tag } from 'antd';

const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const screens = useBreakpoint();
  return (
    <Flex wrap="wrap" gap="small">
      Current break point:
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map<React.ReactNode>((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
    </Flex>
  );
};

export default App;
