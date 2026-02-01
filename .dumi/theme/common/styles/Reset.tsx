import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

export default () => {
  const token = useTheme();

  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*1GSgSYDD_aIAAAAAQsAAAAgAegCCAQ/AlibabaSans-Light.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*2zEUQqnPNesAAAAAQtAAAAgAegCCAQ/AlibabaSans-Regular.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Medium.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Bold.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Heavy.woff2')
            format('woff2');
        }

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
          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }
        }
      `}
    />
  );
};
