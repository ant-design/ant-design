import React, { useState } from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const promise = new Promise<void>((resolve) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 3000);
    });

    return promise;
  };

  return (
    <Flex gap="small" wrap>
      <Button loading={loading} onClick={handleClick}>
        Click me to load
      </Button>
    </Flex>
  );
};

export default App;
