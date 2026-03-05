import React, { useEffect, useState } from 'react';
import { Button, Flex, Image } from 'antd';

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
        placeholder={{
          progress: {
            percent: Math.round(percent),
            render: (progress, p) => (
              <>
                {progress}
                <div style={{ marginTop: 8 }}>Generating {p}%</div>
              </>
            ),
          },
        }}
      />
    );

  return (
    <>
      <Button type="primary" onClick={handleStart} disabled={status === 'generating'}>
        Generate
      </Button>
      {imageNode}
    </>
  );
};

const App: React.FC = () => {
  const [random, setRandom] = useState<number>(() => Date.now());

  return (
    <>
      <Flex gap={16}>
        <Image width={200} height={200} placeholder={{ progress: true }} />
        <Image
          width={200}
          height={200}
          placeholder={{ progress: { render: () => 'loading...' } }}
        />
        <Image width={200} height={200} placeholder={{ progress: { percent: 50 } }} />
        <Image
          width={200}
          height={200}
          placeholder={{
            progress: {
              percent: 75,
              render: (progress, p) => (
                <>
                  {progress}
                  <div style={{ marginTop: 8 }}>Generating {p}%</div>
                </>
              ),
            },
          }}
        />
      </Flex>
      <Flex gap={16} style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setRandom(Date.now());
          }}
        >
          Reload Image
        </Button>
        <Image
          width={200}
          height={200}
          alt="basic image"
          src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
          placeholder={
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
              }}
            />
          }
        />
        <GeneratingProgress />
      </Flex>
    </>
  );
};

export default App;
