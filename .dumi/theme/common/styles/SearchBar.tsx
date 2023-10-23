import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const THEME_PREFIX = 'dumi-default-';

export default () => {
  const token = useTheme();

  return (
    <Global
      styles={css`
        html {
          .${THEME_PREFIX}search-bar {
            &-input {
              color: ${token.colorText};
              background: ${token.colorBgContainer};
              &:focus {
                background: ${token.colorBgContainer};
              }
              &::placeholder {
                color: ${token.colorTextPlaceholder} !important;
              }
            }
          }
          .${THEME_PREFIX}search-popover {
            background-color: ${token.colorBgElevated} !important;
            &::before {
              border-bottom-color: ${token.colorBgElevated} !important;
            }
          }
          .${THEME_PREFIX}search-result {
            dl {
              dt {
                background-color: ${token.controlItemBgActive} !important;
              }
              dd {
                a {
                  &:hover {
                    background-color: ${token.controlItemBgHover};
                    h4,
                    p {
                      color: ${token.colorText} !important;
                    }
                    svg {
                      fill: ${token.colorText} !important;
                    }
                  }
                }
              }
            }
          }
        }
      `}
    />
  );
};
