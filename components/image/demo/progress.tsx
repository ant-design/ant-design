import React, { useEffect, useState } from 'react';
import { Button, Image, Space } from 'antd';

const GeneratingProgress: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<'idle' | 'generating' | 'complete'>('idle');

  useEffect(() => {
    if (status === 'generating' && percent < 100) {
      const timer = setTimeout(() => {
        setPercent((prev) => Math.min(prev + Math.random() * 8 + 2, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (status === 'generating' && percent >= 100) {
      const timer = setTimeout(() => {
        setStatus('complete');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [status, percent]);

  const handleStart = () => {
    setPercent(0);
    setStatus('generating');
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
        progress={{ percent: Math.round(percent), percentRender: (p) => `Generating ${p}%` }}
        style={{ opacity: status === 'idle' ? 0.6 : 1 }}
      />
    );

  return (
    <div>
      <Button
        type="primary"
        onClick={handleStart}
        disabled={status === 'generating'}
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
      <Image width={200} height={200} progress />
      <Image width={200} height={200} progress={{ percent: 50 }} />
      <Image width={200} height={200} progress={{ percent: 50, showProgressBar: false }} />
      <Image
        width={200}
        height={200}
        progress={{ percent: 75, percentRender: (p) => `Generating ${p}%` }}
      />
    </Space>
    <div style={{ marginTop: 16 }}>
      <GeneratingProgress />
    </div>
  </>
);

export default App;
