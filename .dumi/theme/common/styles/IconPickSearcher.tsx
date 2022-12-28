import { css, Global } from '@emotion/react';
import React from 'react';
import useSiteToken from '../../../hooks/useSiteToken';

export default () => {
  const { token } = useSiteToken();

  const { iconCls } = token;

  return (
    <Global
      styles={css`
        .icon-pic-searcher {
          display: inline-block;
          margin: 0 8px;

          .icon-pic-btn {
            color: ${token.colorIcon};
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              color: ${token.colorIconHover};
            }
          }
        }

        .icon-pic-preview {
          width: 66px;
          height: 66px;
          margin-top: 10px;
          padding: 8px;
          text-align: center;
          border: 1px solid ${token.colorBorder};
          border-radius: 4px;

          > img {
            max-width: 50px;
            max-height: 50px;
          }
        }

        .icon-pic-search-result {
          min-height: 50px;
          padding: 0 10px;

          > .result-tip {
            padding: 10px 0;
            color: ${token.colorTextSecondary};
          }

          > table {
            width: 100%;

            .col-icon {
              width: 80px;
              padding: 10px 0;

              > ${iconCls} {
                font-size: 30px;

                :hover {
                  color: ${token.colorLinkHover};
                }
              }
            }
          }
        }
      `}
    />
  );
};
