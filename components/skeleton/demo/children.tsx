import React, { useState } from 'react';
import { Button, Skeleton } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const showSkeleton = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <Skeleton loading={loading}>
        <h4 style={{ marginBottom: 16 }}>Ant Design, a design language</h4>
        <p style={{ marginBottom: 16 }}>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      </Skeleton>
      <Button onClick={showSkeleton} disabled={loading}>
        Show Skeleton
      </Button>
    </>
  );
};

export default App;
