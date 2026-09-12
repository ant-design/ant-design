import React from 'react';
import { Alert, Button, Flex, Spin } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <Flex gap="medium" vertical>
      <Spin spinning={loading} minDuration={1000}>
        <Alert
          type="info"
          title="Alert message title"
          description="Further details about the context of this alert."
        />
      </Spin>
      <Button onClick={loadData} disabled={loading} style={{ alignSelf: 'flex-start' }}>
        Load data
      </Button>
    </Flex>
  );
};

export default App;
