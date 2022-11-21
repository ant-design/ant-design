import React from 'react';
import { Global, css } from '@emotion/react';
import useSiteToken from '../../hooks/useSiteToken';
import { TinyColor } from '@ctrl/tinycolor';
import ColorStyle from '../common/Color/ColorStyle';

const GlobalStyles = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls } = token;

  const demoGridColor = token.colorPrimary;

  return (
    <>
      {/* reset */}
      <Global
        styles={css`
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
        `}
      />

      {/* common */}
      <Global
        styles={css`
          @font-face {
            font-weight: normal;
            font-family: PuHuiTi;
            src: url('//at.alicdn.com/t/webfont_6e11e43nfj.woff2') format('woff2'),
              url('//at.alicdn.com/t/webfont_6e11e43nfj.woff') format('woff'),
              /* chrome、firefox */ url('//at.alicdn.com/t/webfont_6e11e43nfj.ttf')
                format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
            font-display: swap;
          }

          @font-face {
            font-weight: bold;
            font-family: PuHuiTi;
            src: url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
              url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
              /* chrome、firefox */ url('//at.alicdn.com/t/webfont_exesdog9toj.ttf')
                format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
            font-display: swap;
          }

          // 组件丰富，选用自如定制主题随心所欲设计语言与研发框架1234567890 QWERTYUIOPLKJHGFDSAZXCVBNM,.mnbvcxzasdfghjklpoiuytrewq
          /* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
          @font-face {
            font-weight: 900;
            font-family: 'AliPuHui';
            src: url('//at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2')
                format('woff2'),
              url('//at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff')
                format('woff');
            font-display: swap;
          }

          html {
            direction: initial;

            &.rtl {
              direction: rtl;
            }
          }

          body {
            overflow-x: hidden;
            color: ${token.colorText};
            font-size: ${token.fontSize}px;
            font-family: ${token.fontFamily};
            line-height: ${token.lineHeight};
            background: ${token.colorBgContainer};
            transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        `}
      />

      {/* markdown */}
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
            background-color: ${token.siteMarkdownCodeBg};
            > pre.prism-code {
              font-size: 13px;
              line-height: 2;
            }
          }

          .markdown .dumi-default-table-content > table,
          .markdown > table {
            width: 100%;
            margin: 8px 0 16px;
            direction: ltr;
            empty-cells: show;
            border: 1px solid ${token.colorSplit};
            border-collapse: collapse;
            border-spacing: 0;
          }

          .markdown .dumi-default-table-content,
          .markdown {
            > table th {
              color: #5c6b77;
              font-weight: 500;
              white-space: nowrap;
              background: rgba(0, 0, 0, 0.02);
            }
          }

          .markdown .dumi-default-table-content,
          .markdown {
            > table th,
            > table td {
              padding: 16px 24px;
              text-align: left;
              border: 1px solid ${token.colorSplit};
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
            .component-api-table {
              display: block;

              td {
                &:first-child {
                  width: 18%;
                  color: #595959;
                  font-weight: 600;
                  white-space: nowrap;
                }

                &:nth-child(2) {
                  width: 55%;
                }

                &:nth-child(3) {
                  width: 22%;
                  color: ${token['magenta-7']};
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

          .markdown .dumi-default-table {
            table {
              margin: 2em 0;
              overflow-x: auto;
              overflow-y: hidden;
              font-size: ${Math.max(token.fontSize - 1, 12)}px;
              font-family: ${token.codeFamily};
              line-height: ${token.lineHeight};
              border: 0;
              -webkit-overflow-scrolling: touch;

              th,
              td {
                padding: 12px;
                border-color: ${token.colorSplit};
                border-width: 1px 0;

                &:first-child {
                  border-left: 1px solid ${token.colorSplit};
                }

                &:last-child {
                  border-right: 1px solid ${token.colorSplit};
                }
              }

              th {
                padding-top: 14px;
                border-width: 1px 0 2px;
              }

              tbody tr {
                transition: all 0.3s;

                &:hover {
                  background: rgba(60, 90, 100, 0.04);
                }
              }

              td {
                &:first-child {
                  min-width: 58px;
                }
              }
            }

            hr {
              margin: 12px 0;
            }
          }

          .grid-demo,
          [id^='components-grid-demo-'] {
            .demo-row,
            .code-box-demo .demo-row {
              margin-bottom: 8px;
              overflow: hidden;
              background-image: linear-gradient(
                90deg,
                #f5f5f5 4.16666667%,
                transparent 4.16666667%,
                transparent 8.33333333%,
                #f5f5f5 8.33333333%,
                #f5f5f5 12.5%,
                transparent 12.5%,
                transparent 16.66666667%,
                #f5f5f5 16.66666667%,
                #f5f5f5 20.83333333%,
                transparent 20.83333333%,
                transparent 25%,
                #f5f5f5 25%,
                #f5f5f5 29.16666667%,
                transparent 29.16666667%,
                transparent 33.33333333%,
                #f5f5f5 33.33333333%,
                #f5f5f5 37.5%,
                transparent 37.5%,
                transparent 41.66666667%,
                #f5f5f5 41.66666667%,
                #f5f5f5 45.83333333%,
                transparent 45.83333333%,
                transparent 50%,
                #f5f5f5 50%,
                #f5f5f5 54.16666667%,
                transparent 54.16666667%,
                transparent 58.33333333%,
                #f5f5f5 58.33333333%,
                #f5f5f5 62.5%,
                transparent 62.5%,
                transparent 66.66666667%,
                #f5f5f5 66.66666667%,
                #f5f5f5 70.83333333%,
                transparent 70.83333333%,
                transparent 75%,
                #f5f5f5 75%,
                #f5f5f5 79.16666667%,
                transparent 79.16666667%,
                transparent 83.33333333%,
                #f5f5f5 83.33333333%,
                #f5f5f5 87.5%,
                transparent 87.5%,
                transparent 91.66666667%,
                #f5f5f5 91.66666667%,
                #f5f5f5 95.83333333%,
                transparent 95.83333333%
              );
            }

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

          // For Changelog
          .markdown ul${antCls}-timeline {
            line-height: 2;

            li${antCls}-timeline-item {
              margin: 0;
              padding: 0 0 30px;
              list-style: none;

              ${antCls}-timeline-item-content {
                position: relative;
                top: -14px;
                padding-left: 32px;
                font-size: 14px;

                > h2 {
                  margin-top: 0;
                  padding-top: 4px;
                  direction: ltr;

                  span {
                    ${antCls}-row-rtl & {
                      float: right;
                    }
                  }
                }
              }
            }

            li${antCls}-timeline-item:first-child {
              margin-top: 40px;
            }
          }
        `}
      />

      {/* highlight */}
      <Global
        styles={css`
          /**
* prism.js default theme for JavaScript, CSS and HTML
* Based on dabblet (http://dabblet.com)
* @author Lea Verou
*/

          pre code {
            display: block;
            padding: 16px 32px;
            color: ${token.colorText};
            font-size: ${token.fontSize}px;
            font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            line-height: 2;
            white-space: pre;
            background: white;
            border: 1px solid #e9e9e9;
            border-radius: ${token.borderRadius}px;
          }

          code[class*='language-'],
          pre[class*='language-'] {
            color: black;
            font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            line-height: 1.5;
            direction: ltr;
            white-space: pre;
            text-align: left;
            word-wrap: normal;
            word-break: normal;
            word-spacing: normal;
            tab-size: 4;
            hyphens: none;
            background: none;
          }

          code[class*='css'] {
            direction: ltr;
          }

          pre[class*='language-'] ::selection,
          code[class*='language-'] ::selection {
            text-shadow: none;
            background: #b3d4fc;
          }

          @media print {
            code[class*='language-'],
            pre[class*='language-'] {
              text-shadow: none;
            }
          }

          /* Code blocks */
          pre[class*='language-'] {
            margin: 16px 0;
            padding: 12px 20px;
            overflow: auto;
          }

          :not(pre) > code[class*='language-'],
          pre[class*='language-'] {
            background: #f5f5f5;
          }

          /* Inline code */
          :not(pre) > code[class*='language-'] {
            padding: 0.1em;
            white-space: normal;
            border-radius: 0.3em;
          }

          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: slategray;
          }

          .token.punctuation {
            color: #999;
          }

          .namespace {
            opacity: 0.7;
          }

          .markdown {
            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #f81d22;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #0b8235;
            }

            .token.operator,
            .token.entity,
            .token.url,
            .language-css .token.string,
            .style .token.string {
              color: #0b8235;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword {
              color: #008dff;
            }

            .token.function {
              color: #f81d22;
            }

            .token.regex,
            .token.important,
            .token.variable {
              color: #e90;
            }

            .token.important,
            .token.bold {
              font-weight: bold;
            }

            .token.italic {
              font-style: italic;
            }

            .token.entity {
              cursor: help;
            }
          }
        `}
      />

      {/* demo */}
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
            overflow: hidden;
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

            &,
            .code-box-demo {
              background-color: ${token.colorBgContainer};
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
              margin-left: 12px;
              color: #3b4357;
              font-size: 20px;
              cursor: pointer;
              opacity: 0.75;
              transition: all 0.3s;

              &:hover {
                opacity: 1;
              }

              ${antCls}-row-rtl & {
                margin-right: 8px;
                margin-left: 0;
              }
            }

            &-title {
              position: absolute;
              top: -14px;
              margin-left: 16px;
              padding: 1px 8px;
              color: #777;
              background: ${token.colorBgContainer};
              border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
              transition: background-color 0.4s;

              ${antCls}-row-rtl & {
                margin-right: 16px;
                margin-left: 0;
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
              padding-right: 6px;
              font-size: 12px;
              text-decoration: none;
              background: inherit;
              transform: scale(0.9);

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
                margin-right: 0;
                padding-right: 8px;
                padding-left: 6px;
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
                padding-right: 25px;
                font-size: 12px;
                word-break: break-word;

                ${antCls}-row-rtl & {
                  padding-right: 0;
                  padding-left: 25px;
                }
              }
            }

            &.expand &-meta {
              border-bottom: 1px dashed ${token.colorSplit};
              border-radius: 0;
            }

            .code-expand-icon {
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

            &-actions > &-code-action {
              position: relative;
              display: flex;
              align-items: center;
              width: 16px;
              height: 16px;
              margin-left: 16px;
              color: ${token.colorTextSecondary};
              cursor: pointer;
              transition: all 0.24s;

              ${antCls}-row-rtl & {
                margin-right: 16px;
                margin-left: 0;
              }

              &:first-child {
                margin-left: 0;

                ${antCls}-row-rtl & {
                  margin-right: 0;
                }
              }

              &:hover {
                color: ${token.colorText};
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

              &:hover {
                transform: scale(1.1);
              }

              &${iconCls}-check {
                color: ${token['green-6']} !important;
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
              border-color: ${token['purple-3']};
            }

            &-debug &-title a {
              color: ${token['purple-6']};
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

      {/* icon */}
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
              border-radius: 4px;
              cursor: pointer;
              transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

              .rtl & {
                margin: 3px 0;
                padding: 10px 0 0;
              }

              ${iconCls} {
                margin: 12px 0 8px;
                font-size: 36px;
                transition: transform 0.3s ease-in-out;
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
                  transition: color 0.3s ease-in-out;
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
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                content: 'Copied!';
              }

              &.copied::after {
                top: -10px;
                opacity: 1;
              }
            }
          }

          .copied-code {
            padding: 2px 4px;
            font-size: 12px;
            background: #f5f5f5;
            border-radius: 2px;
          }
        `}
      />

      {/* iconPickSearcher */}
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

      {/* Browser mockup */}
      <Global
        styles={css`
          /* Browser mockup code
 * Contribute: https://gist.github.com/jarthod/8719db9fef8deb937f4f
 * Live example: https://updown.io
 */

          .browser-mockup {
            position: relative;
            border-top: 2em solid rgba(230, 230, 230, 0.7);
            border-radius: 3px 3px 0 0;
            box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.28);
          }

          .browser-mockup::before {
            position: absolute;
            top: -1.25em;
            left: 1em;
            display: block;
            width: 0.5em;
            height: 0.5em;
            background-color: #f44;
            border-radius: 50%;
            box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
            content: '';
          }

          .browser-mockup.with-tab::after {
            position: absolute;
            top: -2em;
            left: 5.5em;
            display: block;
            width: 20%;
            height: 0;
            border-right: 0.8em solid transparent;
            border-bottom: 2em solid white;
            border-left: 0.8em solid transparent;
            content: '';
          }

          .browser-mockup.with-url::after {
            position: absolute;
            top: -1.6em;
            left: 5.5em;
            display: block;
            width: ~'calc(100% - 6em)';
            height: 1.2em;
            background-color: white;
            border-radius: 2px;
            content: '';
          }

          .browser-mockup > * {
            display: block;
          }
        `}
      />

      {/* nprogress */}
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

      {/* Responsive */}
      <Global
        styles={css`
          .nav-phone-icon {
            position: absolute;
            top: 25px;
            right: 30px;
            z-index: 1;
            display: none;
            width: 16px;
            height: 22px;
            cursor: pointer;
          }

          @media only screen and (max-width: ${token.screenLG}px) {
            .code-boxes-col-2-1,
            .code-boxes-col-1-1 {
              float: none;
              width: 100%;
              max-width: unset;
            }
          }

          @media only screen and (max-width: 767.99px) {
            .preview-image-boxes {
              float: none;
              width: 100%;
              margin: 0 !important;
            }

            .preview-image-box {
              width: 100%;
              margin: 10px 0;
              padding: 0;
            }

            .image-wrapper {
              display: none;
            }

            div.version {
              display: block;
              margin: 29px auto 16px;
            }

            .toc {
              display: none;
            }

            .nav-phone-icon {
              display: block;
            }

            .main {
              height: calc(100% - 86px);
            }

            .aside-container {
              float: none;
              width: auto;
              padding-bottom: 30px;
              border-right: 0;
            }

            .ant-row-rtl {
              margin-right: 0;
              margin-left: 0;
              padding-right: 16px;
              padding-left: 16px;

              > .markdown > * {
                width: 100% !important;
              }
            }

            .main-wrapper {
              width: 100%;
              margin: 0;
              border-radius: 0;
            }

            .prev-next-nav {
              width: ~'calc(100% - 32px)';
              margin-left: 16px;

              .ant-row-rtl & {
                margin-right: 16px;
                margin-left: 64px;
              }
            }

            .drawer {
              .ant-menu-inline .ant-menu-item::after,
              .ant-menu-vertical .ant-menu-item::after {
                right: auto;
                left: 0;
              }
            }

            /** home 区块 **/
            .home-page-wrapper {
              .page {
                h2 {
                  margin: 80px auto 64px;
                }
              }

              .parallax-bg {
                display: none;
              }
            }

            .banner {
              display: block;
              height: 632px;

              &-bg-wrapper {
                display: none;
              }

              .img-wrapper,
              .text-wrapper {
                display: inline-block;
                width: 100%;
                min-width: unset;
                max-width: unset;
                margin: auto;
                text-align: center;
              }

              .img-wrapper {
                position: initial;
                margin-top: 20px;
                text-align: center;

                svg {
                  width: 100%;
                  max-width: 260px;
                  height: auto;
                  margin: 0 auto;
                }
              }

              .text-wrapper {
                min-height: 200px;
                margin-top: 32px;
                padding: 0;

                h1 {
                  display: none;
                }

                p {
                  color: #314659;
                  font-size: 14px;
                  line-height: 28px;
                }

                .banner-btns {
                  display: block;
                  min-width: 100%;
                  white-space: nowrap;
                  text-align: center;

                  .banner-btn {
                    padding: 0 20px;
                    font-size: 14px;
                  }
                }

                .banner-promote {
                  min-width: 100%;
                  margin-top: 32px;

                  .ant-divider {
                    display: none;
                  }

                  a {
                    font-size: 14px;
                    white-space: nowrap;

                    img {
                      width: 20px;
                    }
                  }
                }
              }
            }

            .page1 {
              min-height: 1300px;

              .ant-row {
                margin: 24px auto 64px;

                > div {
                  margin-bottom: 48px;
                }
              }
            }

            .page2 {
              min-height: 840px;
              background: ${token.colorBgContainer};

              &-content {
                box-shadow: none;
              }

              &-components {
                display: none;
              }

              &-product {
                min-height: auto;
                padding: 0 16px;

                .product-block {
                  margin-bottom: 34px;
                  padding-bottom: 35px;
                  border-bottom: 1px solid ${token.colorSplit};

                  &:last-child {
                    margin-bottom: 32px;
                    border-bottom: none;

                    .block-text-wrapper {
                      height: auto;
                    }
                  }

                  .block-image-wrapper {
                    height: 88px;

                    img {
                      height: 100%;
                    }
                  }

                  .block-text-wrapper {
                    padding-bottom: 0;
                    border-bottom: none;

                    h4 {
                      margin-bottom: 4px;
                      font-size: 18px;
                      line-height: 24px;
                    }

                    p {
                      margin-bottom: 8px;
                      font-size: 12px;
                      line-height: 20px;
                    }

                    a {
                      line-height: 20px;
                    }

                    .components-button-wrapper {
                      margin-top: 16px;
                      font-size: 12px;

                      a {
                        display: block;
                      }
                    }

                    a.more-mobile-react,
                    a.more-mobile-angular {
                      margin-top: 0;
                      color: ${token.colorLink};
                    }

                    a.more-mobile-react:hover,
                    a.more-mobile-angular:hover {
                      color: #40a9ff;
                    }
                  }
                }
              }
            }

            .page3 {
              min-height: 688px;
              background: url('https://gw.alipayobjects.com/zos/rmsportal/qICoJIqqQRMeRGhPHBBS.svg')
                no-repeat;
              background-size: cover;

              .ant-row {
                margin: 0 8px;
              }

              .page3-block {
                margin-bottom: 32px;
                padding: 24px;
                background: ${token.colorBgContainer};
                border-radius: 4px;
                box-shadow: 0 8px 16px rgba(174, 185, 193, 0.3);

                &:nth-child(2) {
                  .page3-img-wrapper img {
                    display: block;
                    width: 70%;
                    margin: auto;
                  }
                }

                p {
                  font-size: 12px;
                }

                .page3-img-wrapper {
                  width: 20%;

                  img {
                    width: 100%;
                  }
                }

                .page3-text-wrapper {
                  width: 80%;
                  max-width: initial;
                  margin: 0;
                  padding-left: 16px;
                }
              }
            }
          }
        `}
      />

      {/* Preview Image */}
      <Global
        styles={css`
          .preview-image-boxes {
            display: flex;
            float: right;
            clear: both;
            width: 496px;
            margin: 0 0 70px 64px;

            &-with-carousel {
              width: 420px;

              .preview-image-box img {
                padding: 0;
              }
            }

            .ant-row-rtl & {
              float: left;
              margin: 0 64px 70px 0;
            }
          }

          .preview-image-boxes + .preview-image-boxes {
            margin-top: -35px;
          }

          .preview-image-box {
            float: left;
            width: 100%;
          }

          .preview-image-box + .preview-image-box {
            margin-left: 24px;

            .ant-row-rtl & {
              margin-right: 24px;
              margin-left: 0;
            }
          }

          .preview-image-wrapper {
            position: relative;
            display: inline-block;
            width: 100%;
            padding: 16px;
            text-align: center;
            background: #f2f4f5;
          }

          .preview-image-wrapper.video {
            display: block;
            padding: 0;
            background: 0;
          }

          .preview-image-wrapper video {
            display: block;
            width: 100%;

            + svg {
              position: absolute;
              top: 0;
              left: 0;
            }
          }

          .preview-image-wrapper.good::after {
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 3px;
            background: @primary-color;
            content: '';
          }

          .preview-image-wrapper.bad::after {
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 3px;
            background: @error-color;
            content: '';
          }

          .preview-image-title {
            margin-top: 20px;
            color: @site-text-color;
            font-size: 12px;
          }

          .preview-image-description {
            margin-top: 2px;
            color: @site-text-color-secondary;
            font-size: 12px;
            line-height: 1.5;
          }

          .preview-image-description hr {
            margin: 2px 0;
            background: none;
            border: 0;
          }

          .preview-image-box img {
            max-width: 100%;
            padding: 12px;
            background: @body-background;
            border-radius: @border-radius-base;
            cursor: pointer;
            transition: all 0.3s;

            &.no-padding {
              padding: 0;
              background: none;
            }
          }

          .preview-image-boxes.preview-image-boxes-with-carousel img {
            padding: 0;
            box-shadow: 0 1px 0 0 #ddd, 0 3px 0 0 @body-background, 0 4px 0 0 #ddd,
              0 6px 0 0 @body-background, 0 7px 0 0 #ddd;
          }

          .preview-image-box img:hover {
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
          }

          .preview-img {
            float: right;
            clear: both;
            max-width: 496px !important;
            margin: 0 0 70px 64px;
            padding: 16px;
            background-color: #f2f4f5;
          }

          .image-modal {
            text-align: center;

            &-container {
              position: relative;
              text-align: center;
            }

            .ant-carousel {
              .slick-slider {
                padding-bottom: 24px;

                img {
                  display: inline;
                  max-width: 100%;
                }
              }

              .slick-dots {
                bottom: 4px;

                li button {
                  background: #888;
                }
              }
            }

            .image-modal-single.slick-slider {
              padding-bottom: 0;
            }

            .image-modal-single .slick-dots {
              display: none !important;
            }
          }

          .transition-video-player,
          .motion-video-min {
            float: right;
            width: 600px;
            padding: 0 0 70px 20px;

            .preview-image-wrapper {
              padding: 0;
            }

            .ant-row-rtl & {
              float: left;
            }
          }

          .motion-video-min {
            width: 390px;
          }

          .motion-principle-wrapper {
            width: 100%;
            max-width: 900px;
            margin: 48px 0 24px;
          }

          .principle-wrapper {
            width: 100%;

            .principle {
              display: inline-block;
              box-sizing: border-box;
              width: 100%;
              min-height: 180px;
              margin-right: 12.5%;
              margin-bottom: 24px;
              padding: 24px;
              font-size: 24px;
              text-align: center;
              border: 1px solid #e8e8e8;
              border-radius: 4px;

              &:last-child {
                margin-right: 0;
              }

              h4 {
                margin: 16px 0 8px;
              }

              p {
                font-size: 12px;
                line-height: 24px;
              }
            }
          }
        `}
      />

      <ColorStyle />
    </>
  );
};

export default GlobalStyles;
