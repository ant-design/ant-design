import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const HeadingAnchor: React.FC = () => {
  const token = useTheme();
  return (
    <Global
      styles={css`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          > a[aria-hidden]:first-child {
            float: inline-start;
            width: 20px;
            padding-inline-end: ${token.paddingXXS}px;
            font-size: 0;
            line-height: inherit;
            text-align: end;
            padding-inline-end: ${token.paddingXXS}px;
            margin-inline-start: -${token.marginLG}px;

            [data-direction='rtl'] & {
              float: inline-end;
            }

            &:hover {
              border: 0;
            }

            > .icon-link::before {
              font-size: ${token.fontSizeXL}px;
              content: '#';
              color: ${token.colorTextSecondary};
              font-family: ${token.codeFamily};
            }
          }

          &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
            visibility: hidden;
          }
        }
      `}
    />
  );
};

export default HeadingAnchor;
