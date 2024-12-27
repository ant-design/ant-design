import React, { useState } from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState<Promise<void> | null>(null);

  const handleClick = () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    setLoading(promise);

    promise.finally(() => {
      setLoading(null);
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
