import React, { useState } from 'react';
import { Button, Spin } from 'antd';

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const showLoader = () => {
    setShow(true);
  };
  const closeLoader = () => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={showLoader}>Show fullscreen</Button>
      {show && <Spin fullscreen onClick={closeLoader} />}
    </>
  );
};

export default App;
