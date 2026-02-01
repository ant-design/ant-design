import React, { useEffect, useState } from 'react';
import { useEvent } from '@rc-component/util';
import { createStyles } from 'antd-style';

import { DarkContext } from '../../../../hooks/useDark';

const useStyles = createStyles(({ css, cssVar }) => ({
  container: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: ${cssVar.colorBgContainer};
  `,
  bubble: css`
    filter: blur(100px);
    border-radius: 50%;
    position: absolute;
    transition: all 5s ease-in-out;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
      animation: none;
    }
  `,
}));

interface BubbleProps {
  size: number | string;
  left?: number | string;
  top?: number | string;
  color: string;
  offsetXMultiple?: number;
  offsetYMultiple?: number;
  defaultOpacity?: number;
}

const MAX_OFFSET = 200;

const Bubble: React.FC<BubbleProps> = (props) => {
  const {
    size,
    left,
    top,
    color,
    offsetXMultiple = 1,
    offsetYMultiple = 1,
    defaultOpacity = 0.1,
  } = props;

  const { styles } = useStyles();

  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  const [opacity, setOpacity] = useState(defaultOpacity);
  const [sizeOffset, setSizeOffset] = useState(1);

  const isDark = React.use(DarkContext);

  const randomPos = useEvent(() => {
    const baseOffsetX = (Math.random() - 0.5) * MAX_OFFSET * 2 * offsetXMultiple;
    const baseOffsetY = (Math.random() - 0.5) * MAX_OFFSET * 2 * offsetYMultiple;
    setOffset([baseOffsetX, baseOffsetY]);

    setOpacity(isDark ? 0.1 + Math.random() * 0.2 : 0.1 + Math.random() * 0.05);
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
      className={styles.bubble}
      draggable={false}
      style={{
        opacity,
        width: size,
        height: size,
        background: color,
        left,
        top,
        transform: `translate3d(-50%, -50%, 0) translate3d(${offset[0]}px, ${offset[1]}px, 0) scale(${sizeOffset})`,
      }}
    />
  );
};

interface LuminousBgProps {
  className?: string;
}

const LuminousBg: React.FC<LuminousBgProps> = ({ className }) => {
  const { styles, cx } = useStyles();
  return (
    <div className={cx(styles.container, className)}>
      {/* Left + Top */}
      <Bubble
        size={300}
        color="#ee35f1"
        left="0vw"
        top="0vh"
        offsetXMultiple={2}
        defaultOpacity={0.2}
      />
      {/* Left + Bottom */}
      <Bubble size={300} color="#5939dc" left="30vw" top="80vh" defaultOpacity={0.1} />
      {/* Right + Middle */}
      <Bubble
        size={300}
        color="#00D6FF"
        left="100vw"
        top="50vh"
        offsetYMultiple={2}
        defaultOpacity={0.2}
      />
    </div>
  );
};

export default LuminousBg;
