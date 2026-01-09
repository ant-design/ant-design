import React, { useEffect, useState } from 'react';
import { useEvent } from '@rc-component/util';
import { createStyles } from 'antd-style';

interface BubbleProps {
  size: number | string;
  left?: number | string;
  top?: number | string;
  color: string;
}

const MAX_OFFSET = 500;

const Bubble = ({ size, left, top, color }: BubbleProps) => {
  const [offset, setOffset] = useState([0, 0]);
  const [opacity, setOpacity] = useState(0.05);
  const [sizeOffset, setSizeOffset] = useState(1);

  const randomPos = useEvent(() => {
    setOffset([(Math.random() - 0.5) * MAX_OFFSET * 2, (Math.random() - 0.5) * MAX_OFFSET * 2]);
    setOpacity(0.05 + Math.random() * 0.05);
    setSizeOffset(1 + Math.random() * 1);
  });

  useEffect(() => {
    randomPos();
  }, []);

  useEffect(() => {
    const randomTimeout = Math.random() * 2000 + 3000;
    const id = setTimeout(randomPos, randomTimeout);

    return () => clearTimeout(id);
  }, [offset]);

  return (
    <div
      aria-hidden="true"
      data-desc="luminous-bubble"
      style={{
        opacity,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(100px)',
        left,
        top,
        transform: `translate(-50%, -50%) translate(${offset[0]}px, ${offset[1]}px) scale(${sizeOffset})`,
        transition: 'all 5s ease-in-out',
        position: 'absolute',
      }}
    />
  );
};

const useStyles = createStyles(({ css, cssVar }) => ({
  container: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: ${cssVar.colorBgContainer};
  `,
}));

interface LuminousBgProps {
  className?: string;
}

export default function LuminousBg({ className }: LuminousBgProps) {
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles.container, className)}>
      <Bubble size={300} color="#ee35f1" left="0vw" top="0vh" />
      <Bubble size={300} color="#5939dc" left="30vw" top="80vh" />
      <Bubble size={300} color="#00D6FF" left="100vw" top="50vh" />
    </div>
  );
}
