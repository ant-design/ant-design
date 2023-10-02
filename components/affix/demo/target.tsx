import React, { useState } from 'react';
import { Affix, Button } from 'antd';

const App: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div className="scrollable-container" ref={setContainer}>
      <div className="background">
        <Affix target={() => container}>
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    </div>
  );
};

export default App;
