import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const GlobalReset: React.FC = () => {
  const token = useTheme();
  return (
    <Global
      styles={css`
        html {
          direction: initial;

          &.rtl {
            direction: rtl;
          }
        }

        body {
          overflow-x: hidden;
          scrollbar-width: thin;
          color: ${token.colorText};
          font-size: ${token.fontSize}px;
          font-family: ${token.fontFamily};
          line-height: ${token.lineHeight};
          background: ${token.colorBgContainer};
          transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      `}
    />
  );
};

export default GlobalReset;
