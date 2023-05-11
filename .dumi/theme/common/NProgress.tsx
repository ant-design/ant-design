import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';
import { theme } from 'antd';

const Container: React.FC<{
  animationDuration: number;
  isFinished: boolean;
  children?: React.ReactNode;
}> = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

const Bar: React.FC<{
  animationDuration: number;
  progress: number;
}> = ({ animationDuration, progress }) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        background: token.colorPrimary,
        height: 2,
        left: 0,
        marginLeft: `${(-1 + progress) * 100}%`,
        position: 'fixed',
        top: 0,
        transition: `margin-left ${animationDuration}ms linear`,
        width: '100%',
        zIndex: 1031,
      }}
    >
      <div
        style={{
          boxShadow: `0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary}`,
          display: 'block',
          height: '100%',
          opacity: 1,
          position: 'absolute',
          right: 0,
          transform: 'rotate(3deg) translate(0px, -4px)',
          width: 100,
        }}
      />
    </div>
  );
};

const NProgress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default NProgress;
