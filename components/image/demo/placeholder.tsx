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
        placeholder={{
          progress: {
            percent: Math.round(percent),
            render: (_, p) => `Generating ${p}%`,
          },
        }}
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

const App: React.FC = () => {
  const [random, setRandom] = useState<number>(() => Date.now());

  return (
    <>
      <Space size={12}>
        {/* 渐进式加载 */}
        <Image
          width={200}
          alt="basic image"
          src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
          placeholder={
            <Image
              preview={false}
              alt="placeholder image"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
              width={200}
            />
          }
        />
        {/* 进度展示 */}
        <Image width={200} height={200} placeholder={{ progress: true }} />
        <Image width={200} height={200} placeholder={{ progress: { percent: 50 } }} />
        <Image
          width={200}
          height={200}
          placeholder={{
            progress: {
              percent: 75,
              render: (_, p) => `Generating ${p}%`,
            },
          }}
        />
      </Space>
      <Button
        type="primary"
        onClick={() => {
          setRandom(Date.now());
        }}
        style={{ marginTop: 12 }}
      >
        Reload Image
      </Button>
      <div style={{ marginTop: 16 }}>
        <GeneratingProgress />
      </div>
    </>
  );
};

export default App;
