import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';

const App: React.FC = () => {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    let newPercent = percent + 10;
    if (newPercent > 100) {
      newPercent = 100;
    }
    setPercent(newPercent);
  };

  const decline = () => {
    let newPercent = percent - 10;
    if (newPercent < 0) {
      newPercent = 0;
    }
    setPercent(newPercent);
  };

  return (
    <>
      <Progress type="circle" percent={percent} style={{ marginRight: 8 }} />
      <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </>
  );
};

export default App;
