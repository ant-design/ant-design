import React from 'react';
import { Spin } from 'antd';

const App: React.FC = () => {
  const [percent, setPercent] = React.useState(-50);

  React.useEffect(() => {
    setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
  }, [percent]);

  return (
    <>
      <Spin percent={percent} />
      {/* <Spin percent={10} />
      <Spin percent={50} />
      <Spin percent={60} />
      你
      <Spin percent={100} />
      好
      <Spin percent={150} /> */}
    </>
  );
};

export default App;
