import React from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      ${token.colorPrimary}08 0%,
      ${token.colorPrimaryBg} 25%,
      ${token.colorBgBase} 50%,
      ${token.colorPrimaryBg} 75%,
      ${token.colorPrimary}08 100%
    );
  `,
}));

interface LuminousBgProps {
  className?: string;
}

export default function LuminousBg({ className }: LuminousBgProps) {
  const { styles, cx } = useStyles();

  return <div className={cx(styles.container, className)}></div>;
}
