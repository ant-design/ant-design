import { css, Global } from '@emotion/react';
import React from 'react';
import useSiteToken from '../../../hooks/useSiteToken';

const GlobalDemoStyles: React.FC = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls } = token;

  return (
    <Global
      styles={css`
        .code-boxes-col-1-1 {
          width: 100%;
        }

        .code-boxes-col-2-1 {
          display: inline-block;
          vertical-align: top;
        }

        .code-box {
          position: relative;
          display: inline-block;
          width: 100%;
          margin: 0 0 16px;
          background-color: ${token.colorBgContainer};
          border: 1px solid ${token.colorSplit};
          border-radius: ${token.borderRadius}px;
          transition: all 0.2s;

          .code-box-title {
            &,
            a {
              color: ${token.colorText} !important;
              background: ${token.colorBgContainer};
            }
          }

          .code-box-demo {
            background-color: ${token.colorBgContainer};
            border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
          }

          .markdown {
            pre {
              margin: 0.5em 0;
              padding: 6px 12px;
            }

            pre code {
              margin: 0;
              background: #f5f5f5;
            }
          }

          &:target {
            border: 1px solid ${token.colorPrimary};
          }

          &-expand-trigger {
            position: relative;
            color: #3b4357;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.75;
            transition: all 0.3s;
            margin-inline-start: 12px;

            &:hover {
              opacity: 1;
            }
          }

          &-title {
            position: absolute;
            top: -14px;
            padding: 1px 8px;
            color: #777;
            background: ${token.colorBgContainer};
            border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
            transition: background-color 0.4s;
            margin-inline-start: 16px;

            ${antCls}-row-rtl & {
              border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px;
            }

            a,
            a:hover {
              color: ${token.colorText};
              font-weight: 500;
              font-size: ${token.fontSize}px;
            }
          }

          &-description {
            padding: 18px 24px 12px;
          }

          a.edit-button {
            position: absolute;
            top: 7px;
            right: -16px;
            font-size: 12px;
            text-decoration: none;
            background: inherit;
            transform: scale(0.9);
            padding-inline-end: 6px;

            ${iconCls} {
              color: ${token.colorTextSecondary};
              transition: all 0.3s;

              &:hover {
                color: ${token.colorText};
              }
            }

            ${antCls}-row${antCls}-row-rtl & {
              right: auto;
              left: -22px;
            }
          }

          &-demo {
            padding: 42px 24px 50px;
            color: ${token.colorText};
            border-bottom: 1px solid ${token.colorSplit};
          }

          iframe {
            width: 100%;
            border: 0;
          }

          &-meta {
            &.markdown {
              position: relative;
              width: 100%;
              font-size: ${token.fontSize}px;
              border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;
              transition: background-color 0.4s;
            }

            blockquote {
              line-height: 1.5;
            }

            h4,
            section& p {
              margin: 0;
            }

            > p {
              width: 100%;
              margin: 0.5em 0;
              font-size: 12px;
              word-break: break-word;
              padding-inline-end: 25px;
            }
          }

          &.expand &-meta {
            border-bottom: 1px dashed ${token.colorSplit};
            border-radius: 0;
          }

          .code-expand-icon {
            position: relative;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          .code-expand-icon-show,
          .code-expand-icon-hide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-shadow: none;
            transition: all 0.4s;
            user-select: none;

            ${antCls}-row-rtl & {
              right: 0;
              left: auto;
            }
          }

          .code-expand-icon-show {
            opacity: 0.55;
            pointer-events: auto;

            &:hover {
              opacity: 1;
            }
          }

          .code-expand-icon${antCls}-tooltip-open .code-expand-icon-show {
            opacity: 1;
          }

          .code-expand-icon-hide {
            opacity: 0;
            pointer-events: none;
          }

          .highlight-wrapper {
            display: none;
            overflow: auto;
            border-radius: 0 0 ${token.borderRadius}px ${token.borderRadius}px;

            &-expand {
              display: block;
            }
          }

          .highlight {
            position: relative;

            pre {
              margin: 0;
              padding: 0;
              background: ${token.colorBgContainer};
            }

            &:not(:first-child) {
              border-top: 1px dashed ${token.colorSplit};
            }
          }

          &-actions {
            display: flex;
            justify-content: center;
            padding: 12px 0;
            border-top: 1px dashed ${token.colorSplit};
            opacity: 0.7;
            transition: opacity 0.3s;

            &:hover {
              opacity: 1;
            }
          }

          &-actions &-code-action {
            position: relative;
            display: flex;
            align-items: center;
            width: 16px;
            height: 16px;
            color: ${token.colorTextSecondary};
            cursor: pointer;
            transition: all 0.24s;

            &:hover {
              color: ${token.colorText};
            }

            ${iconCls} {
              display: block;
            }
          }

          &-code-copy {
            width: 14px;
            height: 14px;
            font-size: 14px;
            text-align: center;
            background: ${token.colorBgContainer};
            cursor: pointer;
            transition: transform 0.24s;

            &${iconCls}-check {
              color: ${token.green6} !important;
              font-weight: bold;
            }
          }

          &-codepen {
            width: 14px;
            height: 14px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
          }

          &-riddle {
            width: 14px;
            height: 14px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
          }

          &-codesandbox {
            width: 16px;
            height: 16px;
            overflow: hidden;
            border: 0;
            cursor: pointer;

            &:hover {
              opacity: 1;
            }
          }

          .highlight-wrapper:hover &-code-copy,
          .highlight-wrapper:hover &-codepen,
          .highlight-wrapper:hover &-codesandbox,
          .highlight-wrapper:hover &-riddle {
            opacity: 1;
          }

          pre {
            width: auto;
            margin: 0;

            code {
              background: ${token.colorBgContainer};
              border: none;
              box-shadow: unset;
            }
          }

          &-debug {
            border-color: ${token.purple3};
          }

          &-debug &-title a {
            color: ${token.purple6};
          }
        }

        .demo-wrapper {
          position: relative;
        }

        .all-code-box-controls {
          position: absolute;
          top: -32px;
          inset-inline-end: 0;
        }

        ${antCls}-row-rtl {
          #components-tooltip-demo-placement,
          #components-popover-demo-placement,
          #components-popconfirm-demo-placement {
            .code-box-demo {
              direction: ltr;
            }
          }
        }
      `}
    />
  );
};

export default GlobalDemoStyles;
