import React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { css, Global } from '@emotion/react';
import { useTheme } from 'antd-style';

const GlobalStyle: React.FC = () => {
  const token = useTheme();

  const { antCls } = token;

  const demoGridColor = token.colorPrimary;

  return (
    <Global
      styles={css`
        .markdown {
          color: ${token.colorText};
          font-size: ${token.fontSize}px;
          line-height: 2;
        }

        .highlight {
          line-height: 1.5;
        }

        .markdown img {
          max-width: calc(100% - 32px);
          max-height: 100%;
        }

        .markdown > a > img,
        .markdown > img {
          display: block;
          margin: 0 auto;
        }

        .markdown p > img,
        .markdown li > img {
          margin: 34px auto;
          box-shadow: 0 8px 20px rgba(143, 168, 191, 0.35);
          display: block;
        }

        .markdown p > img.markdown-inline-image {
          margin: 0;
          box-shadow: none;
        }

        .markdown h1 {
          margin-top: ${token.marginXS}px;
          margin-bottom: ${token.marginMD}px;
          color: ${token.colorTextHeading};
          font-weight: 500;
          font-size: 30px;
          font-family: Avenir, ${token.fontFamily}, sans-serif;
          line-height: 38px;

          .subtitle {
            margin-inline-start: ${token.marginSM}px;
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
          font-size: ${token.fontSizeLG}px;
        }

        .markdown h5 {
          font-size: ${token.fontSize}px;
        }

        .markdown h6 {
          font-size: ${token.fontSizeSM}px;
        }

        .markdown hr {
          clear: both;
          height: 1px;
          margin: ${token.marginLG}px 0;
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

        .markdown ul > li,
        .markdown ol > li {
          padding-inline-start: ${token.paddingXXS}px;
          margin-inline-start: ${token.marginMD}px;
          > p {
            margin: 0.2em 0;
          }
          &:empty {
            display: none;
          }
        }

        .markdown ul > li {
          list-style-type: circle;
        }

        .markdown ol > li {
          list-style-type: decimal;
        }

        .markdown code {
          margin: 0 1px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          background: ${token.siteMarkdownCodeBg};
          border: 1px solid ${token.colorSplit};
          border-radius: ${token.borderRadiusSM}px;
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
          background-color: ${token.colorBgLayout};
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
            scrollbar-width: thin;
            scrollbar-gutter: stable;
            padding: ${token.paddingSM}px ${token.paddingMD}px;
            font-size: ${token.fontSize}px;
            line-height: 2;
          }
        }
        .pic-plus {
          & > * {
            display: inline-block !important;
            vertical-align: middle;
          }
          span {
            margin: 0 ${token.marginMD}px;
            color: #aaa;
            font-size: 30px;
            user-select: none;
          }
        }

        .markdown table td > a:not(:last-child) {
          margin-inline-end: 0 !important;

          &::after {
            position: relative !important;
          }
        }

        .markdown blockquote {
          margin: 1em 0;
          padding-inline-start: 0.8em;
          color: ${token.colorTextSecondary};
          font-size: 90%;
          border-left: 4px solid ${token.colorSplit};

          .rtl & {
            padding-inline-end: 0.8em;
            padding-inline-start: 0;
            border-right: 4px solid ${token.colorSplit};
            border-left: none;
          }
        }

        .markdown blockquote p {
          margin: 0;
        }

        .markdown .anchor {
          margin-inline-start: ${token.marginXS}px;
          opacity: 0;
          transition: opacity ${token.motionDurationSlow};

          .rtl & {
            margin-inline-end: ${token.marginXS}px;
            margin-inline-start: 0;
          }
        }

        .markdown .waiting {
          color: #ccc;
          cursor: not-allowed;
        }

        .markdown a.edit-button {
          display: inline-block;
          margin-inline-start: ${token.marginXS}px;
          text-decoration: none;

          .rtl & {
            margin-inline-end: ${token.marginXS}px;
            margin-inline-start: 0;
            transform: rotateY(180deg);
          }

          ${antCls}icon {
            display: block;
            color: ${token.colorTextSecondary};
            font-size: ${token.fontSizeLG}px;
            transition: all ${token.motionDurationSlow};

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
          &-content {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
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
              padding: ${token.paddingSM}px ${token.paddingLG}px;
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
              transition: all ${token.motionDurationSlow};

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
                color: ${token.colorText};
                font-weight: ${token.fontWeightStrong};
                white-space: nowrap;
              }

              &:nth-child(2) {
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

            /*
              Api 表中某些属性用 del 标记，表示已废弃（但仍期望给开发者一个过渡期)用 css 标记出来。仅此而已。
              有更多看法？移步讨论区: https://github.com/ant-design/ant-design/discussions/51298
            */
            tr:has(td:first-child > del) {
              color: ${token.colorWarning} !important;
              background-color: ${token.colorWarningBg} !important;
              display: var(--antd-site-api-deprecated-display, none);

              del {
                color: ${token.colorWarning};
              }

              &:hover del {
                text-decoration: none;
              }
            }
        }

        .grid-demo,
        [id^='grid-demo-'] {
          ${antCls}-row > div,
            .code-box-demo ${antCls}-row > div {
            min-height: 30px;
            margin-top: ${token.marginXS}px;
            margin-bottom: ${token.marginXS}px;
            color: #fff;
            text-align: center;
            border-radius: 0;
          }

          .code-box-demo ${antCls}-row > div:not(.gutter-row) {
            padding: ${token.padding}px 0;
            background: ${demoGridColor};

            &:nth-child(2n + 1) {
              background: ${new FastColor(demoGridColor).setA(0.75).toHexString()};
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
            background: ${new FastColor(demoGridColor).setA(0.75).toHexString()};
          }

          ${antCls}-row .demo-col-2,
            .code-box-demo ${antCls}-row .demo-col-2 {
            background: ${new FastColor(demoGridColor).setA(0.75).toHexString()};
          }

          ${antCls}-row .demo-col-3,
            .code-box-demo ${antCls}-row .demo-col-3 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          ${antCls}-row .demo-col-4,
            .code-box-demo ${antCls}-row .demo-col-4 {
            background: ${new FastColor(demoGridColor).setA(0.6).toHexString()};
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

        [id='grid-demo-playground'],
        [id='grid-demo-gutter'] {
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
