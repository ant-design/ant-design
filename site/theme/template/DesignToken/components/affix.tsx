import React, { useState } from 'react';
import { Affix, Button } from 'antd';

const Demo: React.FC = () => {
  const [top, setTop] = useState(10);
  return (
    <Affix offsetTop={top}>
      <Button type="primary" onClick={() => setTop(top + 10)}>
        Affix top
      </Button>
    </Affix>
  );
};
export default () => <Demo />;
