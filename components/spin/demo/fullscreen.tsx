import React from 'react';
import { Button, Spin } from 'antd';

const App: React.FC = () => {
  const [spinning, setSpinning] = React.useState<boolean>(false);

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  return (
    <>
      <Button onClick={showLoader}>Show fullscreen for 3s</Button>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};

export default App;
