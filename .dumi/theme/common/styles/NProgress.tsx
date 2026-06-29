import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const NProgress: React.FC = () => {
  const token = useTheme();
  return (
    <Global
      styles={css`
        #nprogress {
          .bar {
            background: ${token.colorPrimary};
          }

          .peg {
            box-shadow:
              0 0 10px ${token.colorPrimary},
              0 0 5px ${token.colorPrimary};
          }

          .spinner-icon {
            border-top-color: ${token.colorPrimary};
            border-inline-start-color: ${token.colorPrimary};
          }
        }
      `}
    />
  );
};

export default NProgress;
