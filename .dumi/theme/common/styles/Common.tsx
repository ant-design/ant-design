import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';

export default () => {
  const { anchorTop } = useTheme();

  React.useInsertionEffect(() => {
    updateCSS(`@layer global, antd;`, 'site-global', {
      prepend: true,
    });
  }, []);

  return (
    <Global
      styles={css`
        @layer global {
          body,
          div,
          dl,
          dt,
          dd,
          ul,
          ol,
          li,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          pre,
          code,
          form,
          fieldset,
          legend,
          input,
          textarea,
          p,
          blockquote,
          th,
          td,
          hr,
          button,
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            margin: 0;
            padding: 0;
          }

          ul,
          ol {
            list-style: none;
          }

          img {
            vertical-align: middle;
            border-style: none;
          }

          [id] {
            scroll-margin-top: ${anchorTop}px;
          }

          [data-prefers-color='dark'] {
            color-scheme: dark;
          }

          [data-prefers-color='light'] {
            color-scheme: light;
          }
        }
      `}
    />
  );
};
