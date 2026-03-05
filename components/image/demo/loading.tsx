import React, { useEffect, useState } from 'react';
import { Button, Image, Space } from 'antd';

const LoadingProgress: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle');

  useEffect(() => {
    if (status === 'loading' && percent < 100) {
      const timer = setTimeout(() => {
        setPercent((prev) => Math.min(prev + Math.random() * 8 + 2, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (status === 'loading' && percent >= 100) {
      const timer = setTimeout(() => {
        setStatus('complete');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [status, percent]);

  const handleStart = () => {
    setPercent(0);
    setStatus('loading');
  };

  const imageNode =
    status === 'complete' ? (
      <Image
        width={200}
        height={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ) : (
      <Image
        width={200}
        height={200}
        loading={{ percent: Math.round(percent), percentRender: (p) => `Generating ${p}%` }}
        style={{ opacity: status === 'idle' ? 0.6 : 1 }}
      />
    );

  return (
    <div>
      <Button
        type="primary"
        onClick={handleStart}
        disabled={status === 'loading'}
        style={{ marginBottom: 12 }}
      >
        Generate
      </Button>
      <div>{imageNode}</div>
    </div>
  );
};

const App: React.FC = () => (
  <>
    <Space size={12}>
      <Image width={200} height={200} loading />
      <Image width={200} height={200} loading={{ percent: 50 }} />
      <Image width={200} height={200} loading={{ percent: 50, progress: false }} />
      <Image
        width={200}
        height={200}
        loading={{ percent: 75, percentRender: (p) => `Generating ${p}%` }}
      />
    </Space>
    <div style={{ marginTop: 16 }}>
      <LoadingProgress />
    </div>
  </>
);

export default App;
