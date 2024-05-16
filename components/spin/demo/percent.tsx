import React from 'react';
import { Space, Spin } from 'antd';

const App: React.FC = () => {
  const [percent, setPercent] = React.useState(-50);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [percent]);

  return (
    <Space>
      <Spin percent={percent} size="small" />
      <Spin percent={percent} />
      <Spin percent={percent} size="large" />
    </Space>
  );
};

export default App;
