import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

export default () => {
  const token = useTheme();
  return (
    <Global
      styles={css`
        .design-inline-cards {
          display: flex;
          margin: 0 -${token.marginMD}px;
        }
        .design-inline-cards > * {
          flex: 10%;
          margin: 0 ${token.marginMD}px;
        }
        .design-inline-cards img {
          width: 100%;
          max-width: 100%;
        }
        .design-inline-cards h4 {
          margin-bottom: 0;
        }
      `}
    />
  );
};
