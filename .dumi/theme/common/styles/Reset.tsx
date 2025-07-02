import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

export default () => {
  const token = useTheme();

  return (
    <Global
      styles={css`
        html {
          direction: initial;

          @supports (overflow-x: clip) {
            overflow-x: clip;
          }

          &.rtl {
            direction: rtl;
          }
        }

        body {
          @supports (overflow-x: clip) {
            overflow-x: clip;
          }

          @supports not (overflow-x: clip) {
            overflow-x: hidden;
          }

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
