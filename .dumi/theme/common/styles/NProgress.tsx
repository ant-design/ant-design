import { css, Global } from '@emotion/react';
import React from 'react';
import { useTheme } from 'antd-style';

export default () => {
  const token = useTheme();
  return (
    <Global
      styles={css`
        #nprogress {
          .bar {
            background: ${token.colorPrimary};
          }

          .peg {
            box-shadow: 0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary};
          }

          .spinner-icon {
            border-top-color: ${token.colorPrimary};
            border-left-color: ${token.colorPrimary};
          }
        }
      `}
    />
  );
};
