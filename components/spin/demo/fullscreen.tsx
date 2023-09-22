import React, { useState } from 'react';
import { Button, Spin } from 'antd';

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const showLoader = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  return (
    <>
      <Button onClick={showLoader}>Show fullscreen for 2s</Button>
      {show && <Spin fullscreen size="large" />}
    </>
  );
};

export default App;
