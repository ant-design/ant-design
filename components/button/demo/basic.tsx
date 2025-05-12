import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const enterLoading = (index: number) => {
    console.log('click');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Button
      type="primary"
      // disabled={loading}
      loading={loading}
      onClick={() => enterLoading(0)}
    >
      Click me!
    </Button>
  );
};

export default App;
