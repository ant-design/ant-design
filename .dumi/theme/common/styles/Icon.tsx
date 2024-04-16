import React from 'react';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

export default () => {
  const token = useTheme();

  const { antCls, iconCls } = token;

  return (
    <Global
      styles={css`
        ul.anticons-list {
          margin: 10px 0;
          overflow: hidden;
          direction: ltr;
          list-style: none;

          li {
            position: relative;
            float: left;
            width: 16.66%;
            height: 100px;
            margin: 3px 0;
            padding: 10px 0 0;
            overflow: hidden;
            color: #555;
            text-align: center;
            list-style: none;
            background-color: inherit;
            border-radius: ${token.borderRadiusSM}px;
            cursor: pointer;
            transition:
              color ${token.motionDurationSlow} ease-in-out,
              background-color ${token.motionDurationSlow} ease-in-out;

            .rtl & {
              margin: 3px 0;
              padding: 10px 0 0;
            }

            ${iconCls} {
              margin: ${token.marginSM}px 0 ${token.marginXS}px;
              font-size: 36px;
              transition: transform ${token.motionDurationSlow} ease-in-out;
              will-change: transform;
            }

            .anticon-class {
              display: block;
              font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
                monospace;
              white-space: nowrap;
              text-align: center;
              transform: scale(0.83);

              ${antCls}-badge {
                transition: color ${token.motionDurationSlow} ease-in-out;
              }
            }

            &:hover {
              color: #fff;
              background-color: ${token.colorPrimary};

              ${iconCls} {
                transform: scale(1.4);
              }

              ${antCls}-badge {
                color: #fff;
              }
            }

            &.TwoTone:hover {
              background-color: #8ecafe;
            }

            &.copied:hover {
              color: rgba(255, 255, 255, 0.2);
            }

            &::after {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #fff;
              line-height: 110px;
              text-align: center;
              background: #1677ff;
              opacity: 0;
              transition: all ${token.motionDurationSlow} cubic-bezier(0.18, 0.89, 0.32, 1.28);
              content: 'Copied!';
            }

            &.copied::after {
              opacity: 1;
            }
          }
        }

        .copied-code {
          padding: 2px 4px;
          font-size: ${token.fontSizeSM}px;
          background: ${token.colorBgLayout};
          border-radius: ${token.borderRadiusXS}px;
        }
      `}
    />
  );
};
