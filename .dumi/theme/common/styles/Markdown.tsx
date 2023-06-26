import { TinyColor } from '@ctrl/tinycolor';
import { css, Global } from '@emotion/react';
import React from 'react';
import useSiteToken from '../../../hooks/useSiteToken';

const GlobalStyle: React.FC = () => {
  const { token } = useSiteToken();

  const { antCls } = token;

  const demoGridColor = token.colorPrimary;

  return (
    <Global
      styles={css`
        .markdown {
          color: ${token.colorText};
          font-size: 14px;
          line-height: 2;
        }

        .highlight {
          line-height: 1.5;
        }

        .markdown img {
          max-width: calc(100% - 32px);
          max-height: 100%;
        }

        .markdown p > img {
          margin: 34px 0;
          box-shadow: 0 8px 20px rgba(143, 168, 191, 0.35);
        }

        .markdown p > img.markdown-inline-image {
          margin: 0;
          box-shadow: none;
        }

        .markdown h1 {
          margin-top: 8px;
          margin-bottom: 20px;
          color: ${token.colorTextHeading};
          font-weight: 500;
          font-size: 30px;
          font-family: Avenir, ${token.fontFamily}, sans-serif;
          line-height: 38px;

          .subtitle {
            margin-left: 12px;
          }
        }

        .markdown h2 {
          font-size: 24px;
          line-height: 32px;
        }

        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          clear: both;
          margin: 1.6em 0 0.6em;
          color: ${token.colorTextHeading};
          font-weight: 500;
          font-family: Avenir, ${token.fontFamily}, sans-serif;
        }

        .markdown h3 {
          font-size: 18px;
        }

        .markdown h4 {
          font-size: 16px;
        }

        .markdown h5 {
          font-size: 14px;
        }

        .markdown h6 {
          font-size: 12px;
        }

        .markdown hr {
          clear: both;
          height: 1px;
          margin: 24px 0;
          background: ${token.colorSplit};
          border: 0;
        }

        .markdown p,
        .markdown pre {
          margin: 1em 0;

          ${antCls}-row-rtl & {
            direction: rtl;
            text-align: right;
          }
        }

        .markdown ul > li {
          margin-left: 20px;
          padding-left: 4px;
          list-style-type: circle;

          .rtl & {
            margin-right: 20px;
            margin-left: 0;
            padding-right: 4px;
            padding-left: 0;
          }

          &:empty {
            display: none;
          }
        }

        .markdown ol > li {
          margin-left: 20px;
          padding-left: 4px;
          list-style-type: decimal;

          ${antCls}-row-rtl & {
            margin-right: 20px;
            margin-left: 0;
            padding-right: 4px;
            padding-left: 0;
          }
        }

        .markdown ul > li > p,
        .markdown ol > li > p {
          margin: 0.2em 0;
        }

        .markdown code {
          margin: 0 1px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          background: ${token.siteMarkdownCodeBg};
          border: 1px solid ${token.colorSplit};
          border-radius: 3px;
        }

        .markdown pre {
          font-family: ${token.codeFamily};
          background: ${token.siteMarkdownCodeBg};
          border-radius: ${token.borderRadius}px;
        }

        .markdown pre code {
          margin: 0;
          padding: 0;
          overflow: auto;
          color: ${token.colorText};
          font-size: ${Math.max(token.fontSize - 1, 12)}px;
          direction: ltr;
          text-align: left;
          background: #f5f5f5;
          border: none;
        }

        .markdown strong,
        .markdown b {
          font-weight: 500;
        }

        .markdown .dumi-default-source-code {
          margin: 1em 0;
          background-color: ${token.siteMarkdownCodeBg};
          border-radius: ${token.borderRadius}px;
          > pre.prism-code {
            padding: 12px 20px;
            font-size: 13px;
            line-height: 2;
          }
        }
        .pic-plus {
          & > * {
            display: inline-block !important;
            vertical-align: middle;
          }
          span {
            margin: 0 20px;
            color: #aaa;
            font-size: 30px;
          }
        }
        .antd-site-snippet {
          .ant-tabs-tab {
            .snippet-label {
              display: flex;
              align-items: center;
              justify-content: center;
              svg {
                margin-inline-end: 8px;
              }
            }
          }
          .dumi-default-source-code {
            margin: 0 auto;
            background-color: ${token.siteMarkdownCodeBg};
            border-radius: ${token.borderRadius}px;
            > pre.prism-code {
              padding: 12px 20px;
              font-size: 13px;
              line-height: 2;
            }
          }
        }

        .markdown table td > a:not(:last-child) {
          margin-right: 0 !important;

          &::after {
            position: relative !important;
          }
        }

        .markdown blockquote {
          margin: 1em 0;
          padding-left: 0.8em;
          color: ${token.colorTextSecondary};
          font-size: 90%;
          border-left: 4px solid ${token.colorSplit};

          .rtl & {
            padding-right: 0.8em;
            padding-left: 0;
            border-right: 4px solid ${token.colorSplit};
            border-left: none;
          }
        }

        .markdown blockquote p {
          margin: 0;
        }

        .markdown .anchor {
          margin-left: 8px;
          opacity: 0;
          transition: opacity 0.3s;

          .rtl & {
            margin-right: 8px;
            margin-left: 0;
          }
        }

        .markdown .waiting {
          color: #ccc;
          cursor: not-allowed;
        }

        .markdown a.edit-button {
          display: inline-block;
          margin-left: 8px;
          text-decoration: none;

          .rtl & {
            margin-right: 8px;
            margin-left: 0;
            transform: rotateY(180deg);
          }

          ${antCls}icon {
            display: block;
            color: ${token.colorTextSecondary};
            font-size: 16px;
            transition: all 0.3s;

            &:hover {
              color: ${token.colorText};
            }
          }
        }

        .markdown h1:hover .anchor,
        .markdown h2:hover .anchor,
        .markdown h3:hover .anchor,
        .markdown h4:hover .anchor,
        .markdown h5:hover .anchor,
        .markdown h6:hover .anchor {
          display: inline-block;
          opacity: 1;
        }

        .markdown > br,
        .markdown > p > br {
          clear: both;
        }

        .markdown .dumi-default-table {
          table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            direction: ltr;
            empty-cells: show;
            border: 1px solid ${token.colorSplit};
            border-collapse: collapse;
            border-spacing: 0;

            th,
            td {
              padding: 12px 24px;
              text-align: left;
              border: 1px solid ${token.colorSplit};

              &:first-child {
                border-left: 1px solid ${token.colorSplit};
              }

              &:last-child {
                border-right: 1px solid ${token.colorSplit};
              }

              img {
                max-width: unset;
              }
            }

            th {
              color: #5c6b77;
              font-weight: 500;
              white-space: nowrap;
              background: rgba(0, 0, 0, 0.02);
              border-width: 1px 1px 2px;
            }

            tbody tr {
              transition: all 0.3s;

              &:hover {
                background: rgba(60, 90, 100, 0.04);
              }
            }
          }

          table.component-api-table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            font-size: ${Math.max(token.fontSize - 1, 12)}px;
            font-family: ${token.codeFamily};
            line-height: ${token.lineHeight};
            border: 1px solid ${token.colorSplit};
            border-width: 0 1px;

            th {
              border-width: 1px 0 2px;
            }

            td {
              border-width: 1px 0;
              &:first-child {
                width: 18%;
                min-width: 58px;
                color: #595959;
                font-weight: 600;
                white-space: nowrap;
              }

              &:nth-child(2) {
                width: 55%;
                min-width: 160px;
              }

              &:nth-child(3) {
                width: 22%;
                color: ${token.magenta7};
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-child(4) {
                width: 15%;
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-child(5) {
                width: 8%;
                font-size: ${Math.max(token.fontSize - 1, 12)}px;
              }

              &:nth-last-child(3):first-child {
                width: 38%;
              }

              &:nth-last-child(3):first-child ~ td:nth-last-child(2) {
                width: 70%;
              }
            }
          }
        }

        .grid-demo,
        [id^='components-grid-demo-'] {
          ${antCls}-row > div,
            .code-box-demo ${antCls}-row > div {
            min-height: 30px;
            margin-top: 8px;
            margin-bottom: 8px;
            color: #fff;
            text-align: center;
            border-radius: 0;
          }

          .code-box-demo ${antCls}-row > div:not(.gutter-row) {
            padding: 16px 0;
            background: ${demoGridColor};

            &:nth-child(2n + 1) {
              background: ${new TinyColor(demoGridColor).setAlpha(0.75).toHex8String()};
            }
          }

          ${antCls}-row .demo-col,
            .code-box-demo ${antCls}-row .demo-col {
            margin-top: 0;
            margin-bottom: 0;
            padding: 30px 0;
            color: ${token.colorWhite};
            font-size: 18px;
            text-align: center;
            border: none;
          }

          ${antCls}-row .demo-col-1 {
            background: ${new TinyColor(demoGridColor).setAlpha(0.75).toHexString()};
          }

          ${antCls}-row .demo-col-2,
            .code-box-demo ${antCls}-row .demo-col-2 {
            background: ${new TinyColor(demoGridColor).setAlpha(0.75).toHexString()};
          }

          ${antCls}-row .demo-col-3,
            .code-box-demo ${antCls}-row .demo-col-3 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          ${antCls}-row .demo-col-4,
            .code-box-demo ${antCls}-row .demo-col-4 {
            background: ${new TinyColor(demoGridColor).setAlpha(0.6).toHexString()};
          }

          ${antCls}-row .demo-col-5,
            .code-box-demo ${antCls}-row .demo-col-5 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          .code-box-demo .height-100 {
            height: 100px;
            line-height: 100px;
          }

          .code-box-demo .height-50 {
            height: 50px;
            line-height: 50px;
          }

          .code-box-demo .height-120 {
            height: 120px;
            line-height: 120px;
          }

          .code-box-demo .height-80 {
            height: 80px;
            line-height: 80px;
          }
        }

        [id='components-grid-demo-playground'],
        [id='components-grid-demo-gutter'] {
          > .code-box-demo ${antCls}-row > div {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `}
    />
  );
};

export default GlobalStyle;
