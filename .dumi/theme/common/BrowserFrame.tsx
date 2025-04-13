import React from 'react';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token, css }) => ({
  browserMockup: css`
    position: relative;
    border-top: 2em solid rgba(230, 230, 230, 0.7);
    border-radius: ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0 0;
    box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28);
    &::before {
      position: absolute;
      top: -1.25em;
      inset-inline-start: 1em;
      display: block;
      width: 0.5em;
      height: 0.5em;
      background-color: #f44;
      border-radius: 50%;
      box-shadow:
        0 0 0 2px #f44,
        1.5em 0 0 2px #9b3,
        3em 0 0 2px #fb5;
      content: '';
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -1.6em;
      inset-inline-start: 5.5em;
      width: calc(100% - 6em);
      height: 1.2em;
      background-color: #fff;
      border-radius: ${token.borderRadiusSM}px;
    }
    & > * {
      display: block;
    }
  `,
}));

const BrowserFrame: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { styles } = useStyle();
  return <div className={styles.browserMockup}>{children}</div>;
};

export default BrowserFrame;
