import React from 'react';
import { Alert, Spin, Switch } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <>
      <Spin spinning={loading} delay={500}>
        <Alert
          type="info"
          message="Alert message title"
          description="Further details about the context of this alert."
        />
      </Spin>
      <div style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={loading} onChange={setLoading} />
      </div>
    </>
  );
};

export default App;
