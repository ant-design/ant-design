(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,213275,966691,e=>{"use strict";var t,n=e.i(391398),i=e.i(56206),o=e.i(494834);e.i(465038);var r=e.i(191788),a=e.i(606552),l=e.i(38415),s=e.i(385712),d=e.i(342824),c=e.i(64247),p=e.i(554054),u=e.i(898210),m=e.i(582225),g=e.i(270587),h=e.i(707065),x=e.i(827830);let f={1:"#fff",2:"#fafafa",3:"#f5f5f5",4:"#f0f0f0",5:"#d9d9d9",6:"#bfbfbf",7:"#8c8c8c",8:"#595959",9:"#434343",10:"#262626",11:"#1f1f1f",12:"#141414",13:"#000"};var b=()=>{let e=(0,x.useTheme)(),t=(n,i=1)=>i<=10?`
.palette-${n}-${i} {
  background: ${e[`${n}-${i}`]};
}
${t(n,i+1)}
    `:"",i=(e=1)=>e<=13?`
.palette-gray-${e} {
  background: ${f[e]};
}
${i(e+1)}
    `:"";return(0,n.jsx)(h.Global,{styles:h.css`
        .color-palettes {
          margin: 0 1%;

          &-dark {
            margin: 0;
            padding: 0 28px;
            background-color: #141414;

            .color-title {
              color: rgba(255, 255, 255, 0.85);
            }

            .color-description {
              color: rgba(255, 255, 255, 0.45);
            }

            .color-palette {
              margin: 45px 3.5% 45px 0;

              &:nth-of-type(3n) {
                margin-inline-end: 0;
              }

              .main-color-item {
                margin-inline-end: 0;

                &:hover {
                  margin-inline-end: -${e.paddingXS}px;
                }
              }
            }
          }
        }

        .color-palette {
          display: inline-block;
          width: 31%;
          margin: 45px 1%;

          &-pick {
            margin: 0 0 ${e.marginMD}px;
            font-size: ${e.fontSizeXL}px;
            text-align: center;
          }

          &-picker {
            margin: ${e.marginLG}px 0;

            &-value {
              position: relative;
              top: -3px;
              margin-inline-start: ${e.margin}px;
              font-size: ${e.fontSize}px;
              font-family: Consolas, sans-serif;
              .ant-row-rtl & {
                margin-inline-end: ${e.margin}px;
                margin-inline-start: 0;
              }
            }

            &-validation {
              position: relative;
              top: -3px;
              margin-inline-start: ${e.margin}px;
              color: ${e.colorError};
              font-size: ${e.fontSize}px;

              .ant-row-rtl & {
                margin-inline-end: ${e.margin}px;
                margin-inline-start: 0;
              }

              &-dark {
                margin-inline-start: 0;
              }
            }
          }
        }

        .main-color {
          ${t("blue")}
          ${t("purple")}
          ${t("cyan")}
          ${t("green")}
          ${t("magenta")}
          ${t("red")}
          ${t("volcano")}
          ${t("orange")}
          ${t("gold")}
          ${t("yellow")}
          ${t("lime")}
          ${t("geekblue")}
          ${i()}

  text-align: start;

          &-item {
            position: relative;
            height: 44px;
            margin-inline-end: ${e.marginXXS}px;
            padding: 0 ${e.paddingSM}px;
            font-size: ${e.fontSize}px;
            font-family: Consolas, sans-serif;
            line-height: 44px;
            cursor: pointer;
            transition: all ${e.motionDurationMid};

            &:first-child {
              border-radius: ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0 0;
            }

            &:last-child {
              border-radius: 0 0 ${e.borderRadiusSM}px ${e.borderRadiusSM}px;
            }

            &:hover {
              margin-inline-end: -${e.marginXS}px;
              border-radius: 0 ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0;
            }
          }

          &-item &-text {
            float: inline-start;
            transition: all ${e.motionDurationSlow};
          }

          &-item &-value {
            position: relative;
            inset-inline-start: ${e.marginXXS}px;
            float: inline-end;
            transform: scale(0.85);
            transform-origin: 100% 50%;
            opacity: 0;
            transition: all ${e.motionDurationSlow};
          }
        }

        .color-title {
          margin: 0 0 ${e.marginLG}px;
          color: #5c6b77;
          font-weight: 500;
          font-size: 22px;
          text-align: center;
          text-transform: capitalize;
        }

        .color-description {
          display: block;
          color: #777;
          font-weight: lighter;
          font-size: ${e.fontSize}px;
        }

        .main-color:hover {
          .main-color-value {
            inset-inline-start: 0;
            opacity: 0.7;
          }
        }

        .color-palette-horizontal {
          box-sizing: border-box;
          width: 100%;

          &-dark {
            height: 303px;
            padding: ${e.paddingXL}px ${e.paddingXL-4}px;
            background-color: #141414;

            .color-palette-picker {
              margin-bottom: 0;
            }

            .color-palette-pick {
              color: rgba(255, 255, 255, 0.65);
              text-align: start;

              &-hex {
                color: rgba(255, 255, 255, 0.65);
              }

              .ant-row-rtl & {
                direction: rtl;
              }
            }
          }

          .main-color {
            display: flex;

            &-item {
              position: relative;
              flex: 1;
              box-sizing: border-box;
              height: 86px;
              margin-inline-end: 0;
              padding: 37px 0 0;
              line-height: normal;
              text-align: center;
              border-radius: 0;

              .main-color-text {
                float: none;
              }

              &:hover {
                height: 96px;
                margin-top: -10px;
                border-radius: ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0 0;
              }
            }

            &-value {
              position: absolute;
              bottom: 0;
              inset-inline-start: 0;
              width: 100%;
              text-align: center;
              transform-origin: unset;
            }

            &:hover {
              .main-color-item {
                padding-top: ${e.paddingXS}px;
              }

              .main-color-value {
                bottom: 8px;
                opacity: 0.7;
              }
            }
          }
        }
      `})},w=e.i(758776),v=()=>{let e=(0,x.useTheme)(),{antCls:t,iconCls:i}=e;return(0,n.jsx)(h.Global,{styles:h.css`
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
          width: calc(100% - ${2*e.lineWidth}px);
          margin: 0 0 ${e.margin}px;
          background-color: ${e.colorBgContainer};
          border: 1px solid ${e.colorSplit};
          border-radius: ${e.borderRadiusLG}px;
          transition: all ${e.motionDurationMid};

          &.code-box-simplify {
            border-radius: 0;
            margin-bottom: 0;

            .code-box-demo {
              padding: 0;
              border-bottom: 0;
            }
          }

          .code-box-title {
            &,
            a {
              color: ${e.colorText} !important;
              background: ${e.colorBgContainer};
            }
          }

          .code-box-demo {
            background-color: ${e.colorBgContainer};
            border-radius: ${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0;
            > .demo {
              overflow: auto;
            }
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
            border: 1px solid ${e.colorPrimary};
          }

          &-title {
            position: absolute;
            top: -14px;
            padding: 1px 8px;
            color: #777;
            background: ${e.colorBgContainer};
            border-radius: ${e.borderRadius}px ${e.borderRadius}px 0 0;
            transition: background-color 0.4s;
            margin-inline-start: ${e.margin}px;

            a,
            a:hover {
              color: ${e.colorText};
              font-weight: 500;
              font-size: ${e.fontSize}px;
            }
          }

          &-description {
            padding: 18px 24px 12px;
          }

          a.edit-button {
            position: absolute;
            top: 7px;
            inset-inline-end: -16px;
            font-size: ${e.fontSizeSM}px;
            text-decoration: none;
            background: inherit;
            transform: scale(0.9);
            padding-inline-end: ${e.paddingXXS}px;

            ${i} {
              color: ${e.colorTextSecondary};
              transition: all ${e.motionDurationSlow};

              &:hover {
                color: ${e.colorText};
              }
            }

            ${t}-row${t}-row-rtl & {
              inset-inline-end: auto;
              inset-inline-start: -22px;
            }
          }

          &-demo {
            padding: 42px 24px 50px;
            color: ${e.colorText};
            border-bottom: 1px solid ${e.colorSplit};
          }

          iframe {
            width: 100%;
            border: 0;
          }

          &-meta {
            &.markdown {
              position: relative;
              width: 100%;
              font-size: ${e.fontSize}px;
              border-radius: 0 0 ${e.borderRadius}px ${e.borderRadius}px;
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
              font-size: ${e.fontSizeSM}px;
              word-break: break-word;
              padding-inline-end: 25px;
            }
          }

          &.expand &-meta {
            border-bottom: 1px dashed ${e.colorSplit};
            border-radius: 0;
          }

          .code-expand-icon {
            position: relative;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          .highlight-wrapper {
            display: none;
            border-radius: 0 0 ${e.borderRadius}px ${e.borderRadius}px;

            &-expand {
              display: block;
            }
          }

          .highlight {
            position: relative;

            pre {
              margin: 0;
              padding: 0;
              background: ${e.colorBgContainer};
            }

            &:not(:first-child) {
              border-top: 1px dashed ${e.colorSplit};
            }
          }

          &-actions {
            display: flex;
            justify-content: center;
            padding: ${e.paddingSM}px 0;
            border-top: 1px dashed ${e.colorSplit};
            opacity: 0.7;
            transition: opacity ${e.motionDurationSlow};

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
            color: ${e.colorTextSecondary};
            cursor: pointer;
            transition: all 0.24s;

            &:hover {
              color: ${e.colorText};
            }

            ${i} {
              display: block;
            }
          }

          &-code-copy {
            width: 14px;
            height: 14px;
            font-size: ${e.fontSize}px;
            text-align: center;
            background: ${e.colorBgContainer};
            cursor: pointer;
            transition: transform 0.24s;

            &${i}-check {
              color: ${e.green6} !important;
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

           &-codeblock {
            width: 16px;
            height: 16px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
            max-width: 100% !important;
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
              background: ${e.colorBgContainer};
              border: none;
              box-shadow: unset;
              padding: ${e.paddingSM}px ${e.padding}px;
              font-size: ${e.fontSize}px;
            }
          }

          &-debug {
            border-color: ${e.purple3};
          }

          &-debug &-title a {
            color: ${e.purple6};
          }
        }

        .demo-wrapper {
          position: relative;
        }

        .all-code-box-controls {
          position: absolute;
          top: -32px;
          inset-inline-end: 0;
          display: flex;
          align-items: center;
          column-gap: ${e.marginXS}px;
        }

        ${t}-btn {
          &.icon-enabled {
            background-color: ${e.colorFillSecondary};
            opacity: 1;
            ${i} {
              color: ${e.colorTextBase};
              font-weight: bold;
            }
          }
        }

        ${t}-row-rtl {
          #tooltip-demo-placement,
          #popover-demo-placement,
          #popconfirm-demo-placement {
            .code-box-demo {
              direction: ltr;
            }
          }
        }
      `})},y=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          > a[aria-hidden]:first-child {
            float: inline-start;
            width: 20px;
            padding-inline-end: ${e.paddingXXS}px;
            font-size: 0;
            line-height: inherit;
            text-align: end;
            padding-inline-end: ${e.paddingXXS}px;
            margin-inline-start: -${e.marginLG}px;

            [data-direction='rtl'] & {
              float: inline-end;
            }

            &:hover {
              border: 0;
            }

            > .icon-link::before {
              font-size: ${e.fontSizeXL}px;
              content: '#';
              color: ${e.colorTextSecondary};
              font-family: ${e.codeFamily};
            }
          }

          &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
            visibility: hidden;
          }
        }
      `})},$=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        /**
* prism.js default theme for JavaScript, CSS and HTML
* Based on dabblet (http://dabblet.com)
* @author Lea Verou
*/

        pre code {
          display: block;
          padding: ${e.padding}px ${e.paddingXL}px;
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          line-height: 2;
          white-space: pre;
          background: ${e.colorBgContainer};
          border: 1px solid ${e.colorBorderSecondary};
          border-radius: ${e.borderRadius}px;
        }

        code[class*='language-'],
        pre[class*='language-'] {
          color: ${e.colorText};
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          line-height: ${e.lineHeightLG};
          direction: ltr;
          white-space: pre;
          text-align: start;
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
          margin: ${e.margin}px 0;
          padding: ${e.paddingSM}px ${e.paddingMD}px;
          overflow: auto;
        }

        :not(pre) > code[class*='language-'],
        pre[class*='language-'] {
          background: ${e.colorBgLayout};
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
      `})},j=e.i(218589),k=()=>{let e=(0,x.useTheme)(),{antCls:t}=e,i=e.colorPrimary;return(0,n.jsx)(h.Global,{styles:h.css`
        .markdown {
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          line-height: 2;
        }

        .highlight {
          line-height: 1.5;
        }

        .markdown img {
          max-width: calc(100% - 32px);
          max-height: 100%;
          display: inline;
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
          margin-top: ${e.marginXS}px;
          margin-bottom: ${e.marginMD}px;
          color: ${e.colorTextHeading};
          font-weight: 500;
          font-size: 30px;
          font-family: Avenir, ${e.fontFamily}, sans-serif;
          line-height: 38px;

          .subtitle {
            margin-inline-start: ${e.marginSM}px;
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
          color: ${e.colorTextHeading};
          font-weight: 500;
          font-family: Avenir, ${e.fontFamily}, sans-serif;
        }

        .markdown h3 {
          font-size: 18px;
        }

        .markdown h4 {
          font-size: ${e.fontSizeLG}px;
        }

        .markdown h5 {
          font-size: ${e.fontSize}px;
        }

        .markdown h6 {
          font-size: ${e.fontSizeSM}px;
        }

        .markdown hr {
          clear: both;
          height: 1px;
          margin: ${e.marginLG}px 0;
          background: ${e.colorSplit};
          border: 0;
        }

        .markdown p,
        .markdown pre {
          margin: 1em 0;
          text-align: start;
          ${t}-row-rtl & {
            direction: rtl;
          }
        }

        .markdown ul > li,
        .markdown ol > li {
          padding-inline-start: ${e.paddingXXS}px;
          margin-inline-start: ${e.marginMD}px;
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
          background: ${e.siteMarkdownCodeBg};
          border: 1px solid ${e.colorSplit};
          border-radius: ${e.borderRadiusSM}px;
        }

        .markdown pre {
          font-family: ${e.codeFamily};
          background: ${e.siteMarkdownCodeBg};
          border-radius: ${e.borderRadius}px;
        }

        .markdown pre code {
          margin: 0;
          padding: 0;
          overflow: auto;
          color: ${e.colorText};
          font-size: ${Math.max(e.fontSize-1,12)}px;
          direction: ltr;
          text-align: start;
          background-color: ${e.colorBgLayout};
          border: none;
        }

        .markdown strong,
        .markdown b {
          font-weight: 500;
        }

        .markdown .dumi-default-source-code {
          margin: 1em 0;
          background-color: ${e.siteMarkdownCodeBg};
          border-radius: ${e.borderRadius}px;
          > pre.prism-code {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
            padding: ${e.paddingSM}px ${e.paddingMD}px;
            font-size: ${e.fontSize}px;
            line-height: 2;
          }
        }

        [data-prefers-color='dark'] {
          .markdown .dumi-default-source-code {
            background-color: ${e.siteMarkdownCodeBgDark};
          }
        }

        .pic-plus {
          & > * {
            display: inline-block !important;
            vertical-align: middle;
          }
          span {
            margin: 0 ${e.marginMD}px;
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
          color: ${e.colorTextSecondary};
          font-size: 90%;
          border-inline-start: 4px solid ${e.colorSplit};

          .rtl & {
            padding-inline-end: 0.8em;
            padding-inline-start: 0;
            border-inline-end: 4px solid ${e.colorSplit};
            border-inline-start: none;
          }
        }

        .markdown blockquote p {
          margin: 0;
        }

        .markdown .anchor {
          margin-inline-start: ${e.marginXS}px;
          opacity: 0;
          transition: opacity ${e.motionDurationSlow};

          .rtl & {
            margin-inline-end: ${e.marginXS}px;
            margin-inline-start: 0;
          }
        }

        .markdown .waiting {
          color: #ccc;
          cursor: not-allowed;
        }

        .markdown a.edit-button {
          display: inline-block;
          margin-inline-start: ${e.marginXS}px;
          text-decoration: none;

          .rtl & {
            margin-inline-end: ${e.marginXS}px;
            margin-inline-start: 0;
            transform: rotateY(180deg);
          }

          ${t}icon {
            display: block;
            color: ${e.colorTextSecondary};
            font-size: ${e.fontSizeLG}px;
            transition: all ${e.motionDurationSlow};

            &:hover {
              color: ${e.colorText};
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
            border: 1px solid ${e.colorSplit};
            border-collapse: collapse;
            border-spacing: 0;

            th,
            td {
              padding: ${e.paddingSM}px ${e.paddingLG}px;
              text-align: start;
              border: 1px solid ${e.colorSplit};

              &:first-child {
                border-inline-start: 1px solid ${e.colorSplit};
              }

              &:last-child {
                border-inline-end: 1px solid ${e.colorSplit};
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
              transition: all ${e.motionDurationSlow};

              &:hover {
                background: rgba(60, 90, 100, 0.04);
              }
            }
          }

          table.component-api-table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            font-size: ${Math.max(e.fontSize-1,12)}px;
            font-family: ${e.codeFamily};
            line-height: ${e.lineHeight};
            border: 1px solid ${e.colorSplit};
            border-width: 0 1px;

            th {
              border-width: 1px 0 2px;
            }

            td {
              border-width: 1px 0;
              &:first-child {
                width: 18%;
                min-width: 58px;
                color: ${e.colorText};
                font-weight: ${e.fontWeightStrong};
                white-space: nowrap;
              }

              &:nth-child(2) {
                min-width: 160px;
              }

              &:nth-child(3) {
                width: 22%;
                color: ${e.magenta7};
                font-size: ${Math.max(e.fontSize-1,12)}px;
              }

              &:nth-child(4) {
                width: 15%;
                font-size: ${Math.max(e.fontSize-1,12)}px;
              }

              &:nth-child(5) {
                width: 8%;
                font-size: ${Math.max(e.fontSize-1,12)}px;
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
            color: ${e.colorWarning} !important;
            background-color: ${e.colorWarningBg} !important;
            display: var(--antd-site-api-deprecated-display, none);

            del {
              color: ${e.colorWarning};
            }

            &:hover del {
              text-decoration: none;
            }
          }
        }

        .grid-demo,
        [id^='grid-demo-'] {
          ${t}-row > div,
            .code-box-demo ${t}-row > div {
            min-height: 30px;
            margin-top: ${e.marginXS}px;
            margin-bottom: ${e.marginXS}px;
            color: #fff;
            text-align: center;
            border-radius: 0;
          }

          .code-box-demo ${t}-row > div:not(.gutter-row) {
            padding: ${e.padding}px 0;
            background: ${i};

            &:nth-child(2n + 1) {
              background: ${new j.FastColor(i).setA(.75).toHexString()};
            }
          }

          ${t}-row .demo-col,
            .code-box-demo ${t}-row .demo-col {
            margin-top: 0;
            margin-bottom: 0;
            padding: 30px 0;
            color: ${e.colorWhite};
            font-size: 18px;
            text-align: center;
            border: none;
          }

          ${t}-row .demo-col-1 {
            background: ${new j.FastColor(i).setA(.75).toHexString()};
          }

          ${t}-row .demo-col-2,
            .code-box-demo ${t}-row .demo-col-2 {
            background: ${new j.FastColor(i).setA(.75).toHexString()};
          }

          ${t}-row .demo-col-3,
            .code-box-demo ${t}-row .demo-col-3 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          ${t}-row .demo-col-4,
            .code-box-demo ${t}-row .demo-col-4 {
            background: ${new j.FastColor(i).setA(.6).toHexString()};
          }

          ${t}-row .demo-col-5,
            .code-box-demo ${t}-row .demo-col-5 {
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
          > .code-box-demo ${t}-row > div {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `})},S=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        #nprogress {
          .bar {
            background: ${e.colorPrimary};
          }

          .peg {
            box-shadow:
              0 0 10px ${e.colorPrimary},
              0 0 5px ${e.colorPrimary};
          }

          .spinner-icon {
            border-top-color: ${e.colorPrimary};
            border-inline-start-color: ${e.colorPrimary};
          }
        }
      `})},C=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        .preview-image-boxes {
          display: flex;
          float: inline-end;
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
            float: inline-start;
            margin: 0 64px 70px 0;
          }
        }

        .preview-image-boxes + .preview-image-boxes {
          margin-top: -35px;
        }

        .preview-image-box {
          float: inline-start;
          width: 100%;
        }

        .preview-image-box + .preview-image-box {
          margin-inline-start: ${e.marginLG}px;

          .ant-row-rtl & {
            margin-inline-end: ${e.marginLG}px;
            margin-inline-start: 0;
          }
        }

        .preview-image-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
          padding: ${e.padding}px;
          text-align: center;
          background: #f2f4f5;
          box-sizing: border-box;
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
            inset-inline-start: 0;
          }
        }

        .preview-image-wrapper.good::after {
          position: absolute;
          bottom: 0;
          inset-inline-start: 0;
          display: block;
          width: 100%;
          height: 3px;
          background: ${e.colorPrimary};
          content: '';
        }

        .preview-image-wrapper.bad::after {
          position: absolute;
          bottom: 0;
          inset-inline-start: 0;
          display: block;
          width: 100%;
          height: 3px;
          background: ${e.colorError};
          content: '';
        }

        .preview-image-title {
          margin-top: ${e.marginMD}px;
          color: ${e.colorText};
          font-size: ${e.fontSizeSM}px;
        }

        .preview-image-description {
          margin-top: 2px;
          color: ${e.colorTextSecondary};
          font-size: ${e.fontSizeSM}px;
          line-height: 1.5;
        }

        .preview-image-description hr {
          margin: 2px 0;
          background: none;
          border: 0;
        }

        .preview-image-box img {
          box-sizing: border-box;
          max-width: 100%;
          padding: ${e.paddingSM}px;
          background: ${e.colorBgContainer};
          border-radius: ${e.borderRadius}px;
          cursor: pointer;
          transition: all ${e.motionDurationSlow};

          &.no-padding {
            padding: 0;
            background: none;
          }
        }

        .preview-image-boxes.preview-image-boxes-with-carousel img {
          padding: 0;
          box-shadow:
            0 1px 0 0 #ddd,
            0 3px 0 0 ${e.colorBgContainer},
            0 4px 0 0 #ddd,
            0 6px 0 0 ${e.colorBgContainer},
            0 7px 0 0 #ddd;
        }

        .preview-image-box img:hover {
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
        }

        .transition-video-player,
        .motion-video-min {
          float: inline-end;
          width: 600px;
          padding: 0 0 70px 20px;

          .preview-image-wrapper {
            padding: 0;
          }

          .ant-row-rtl & {
            float: inline-start;
          }
        }

        .motion-video-min {
          width: 390px;
        }

        .motion-principle-wrapper {
          width: 100%;
          max-width: 900px;
          margin: ${e.marginXXL}px 0 ${e.marginLG}px;
        }

        .principle-wrapper {
          width: 100%;

          .principle {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            min-height: 180px;
            margin-inline-end: 12.5%;
            margin-bottom: ${e.marginLG}px;
            padding: ${e.paddingLG}px;
            font-size: 24px;
            text-align: center;
            border: 1px solid #e8e8e8;
            border-radius: ${e.borderRadiusSM}px;

            &:last-child {
              margin-inline-end: 0;
            }

            h4 {
              margin: ${e.margin}px 0 ${e.marginXS}px;
            }

            p {
              font-size: ${e.fontSizeSM}px;
              line-height: 24px;
            }
          }
        }
      `})},E=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        html {
          direction: initial;

          &.rtl {
            direction: rtl;
          }
        }

        body {
          overflow-x: hidden;
          scrollbar-width: thin;
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          font-family: ${e.fontFamily};
          line-height: ${e.lineHeight};
          background: ${e.colorBgContainer};
          transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      `})},z=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        .nav-phone-icon {
          position: absolute;
          bottom: 17px;
          inset-inline-end: 30px;
          z-index: 1;
          display: none;
          width: 16px;
          height: 22px;
          cursor: pointer;
        }

        @media only screen and (max-width: ${e.screenLG}px) {
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
            border-inline-end: 0;
          }

          .ant-row-rtl {
            margin-inline-end: 0;
            margin-inline-start: 0;
            padding-inline-end: ${e.padding}px;
            padding-inline-start: ${e.padding}px;

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
            width: calc(100% - 32px);
            margin-inline-start: ${e.margin}px;
            .ant-row-rtl & {
              margin-inline-end: ${e.margin}px;
              margin-inline-start: 64px;
            }
          }

          .drawer {
            .ant-menu-inline .ant-menu-item::after,
            .ant-menu-vertical .ant-menu-item::after {
              inset-inline-end: auto;
              inset-inline-start: 0;
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
              margin-top: ${e.marginMD}px;
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
              margin-top: ${e.marginXL}px;
              padding: 0;

              h1 {
                display: none;
              }

              p {
                color: #314659;
                font-size: ${e.fontSize}px;
                line-height: 28px;
              }

              .banner-btns {
                display: block;
                min-width: 100%;
                white-space: nowrap;
                text-align: center;

                .banner-btn {
                  padding: 0 ${e.paddingMD}px;
                  font-size: ${e.fontSize}px;
                }
              }

              .banner-promote {
                min-width: 100%;
                margin-top: ${e.marginXL}px;

                .ant-divider {
                  display: none;
                }

                a {
                  font-size: ${e.fontSize}px;
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
            background: ${e.colorBgContainer};

            &-content {
              box-shadow: none;
            }

            &-components {
              display: none;
            }

            &-product {
              min-height: auto;
              padding: 0 ${e.padding}px;

              .product-block {
                margin-bottom: 34px;
                padding-bottom: 35px;
                border-bottom: 1px solid ${e.colorSplit};

                &:last-child {
                  margin-bottom: ${e.marginXL}px;
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
                    margin-bottom: ${e.marginXXS}px;
                    font-size: 18px;
                    line-height: 24px;
                  }

                  p {
                    margin-bottom: ${e.marginXS}px;
                    font-size: ${e.fontSizeSM}px;
                    line-height: 20px;
                  }

                  a {
                    line-height: 20px;
                  }

                  .components-button-wrapper {
                    margin-top: ${e.margin}px;
                    font-size: ${e.fontSizeSM}px;

                    a {
                      display: block;
                    }
                  }

                  a.more-mobile-react,
                  a.more-mobile-angular {
                    margin-top: 0;
                    color: ${e.colorLink};
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
            background-image: url('https://gw.alipayobjects.com/zos/rmsportal/qICoJIqqQRMeRGhPHBBS.svg');
            background-repeat: no-repeat;
            background-size: cover;
            .ant-row {
              margin: 0 ${e.marginXS}px;
            }

            .page3-block {
              margin-bottom: ${e.marginXL}px;
              padding: ${e.paddingLG}px;
              background: ${e.colorBgContainer};
              border-radius: ${e.borderRadiusSM}px;
              box-shadow: 0 8px 16px rgba(174, 185, 193, 0.3);

              &:nth-child(2) {
                .page3-img-wrapper img {
                  display: block;
                  width: 70%;
                  margin: auto;
                }
              }

              p {
                font-size: ${e.fontSizeSM}px;
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
                padding-inline-start: ${e.padding}px;
              }
            }
          }
        }
      `})};let M="dumi-default-";var N=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        html {
          .${M}search-bar {
            &-input {
              color: ${e.colorText};
              background: ${e.colorBgContainer};
              &:focus {
                background: ${e.colorBgContainer};
              }
              &::placeholder {
                color: ${e.colorTextPlaceholder} !important;
              }
            }
          }
          .${M}search-popover {
            background-color: ${e.colorBgElevated} !important;
            &::before {
              border-bottom-color: ${e.colorBgElevated} !important;
            }
          }
          .${M}search-result {
            dl {
              dt {
                background-color: ${e.controlItemBgActive} !important;
              }
              dd {
                a {
                  &:hover {
                    background-color: ${e.controlItemBgHover};
                    h4,
                    p {
                      color: ${e.colorText} !important;
                    }
                    svg {
                      fill: ${e.colorText} !important;
                    }
                  }
                }
              }
            }
          }
        }
      `})},A=()=>{let e=(0,x.useTheme)();return(0,n.jsx)(h.Global,{styles:h.css`
        .design-inline-cards {
          display: flex;
          margin: 0 -${e.marginMD}px;
        }
        .design-inline-cards > * {
          flex: 10%;
          margin: 0 ${e.marginMD}px;
        }
        .design-inline-cards img {
          width: 100%;
          max-width: 100%;
        }
        .design-inline-cards h4 {
          margin-bottom: 0;
        }
      `})},T=()=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(E,{}),(0,n.jsx)(w.Common,{}),(0,n.jsx)(k,{}),(0,n.jsx)($,{}),(0,n.jsx)(v,{}),(0,n.jsx)(z,{}),(0,n.jsx)(S,{}),(0,n.jsx)(C,{}),(0,n.jsx)(A,{}),(0,n.jsx)(b,{}),(0,n.jsx)(y,{}),(0,n.jsx)(N,{})]}),L=e.i(575796),L=L,D=e.i(774678),D=D,F=e.i(125308),I=e.i(183668),O=e.i(844678),B=e.i(831036),R=e.i(69017),H=e.i(183056),X=e.i(788296),P=Object.defineProperty,W=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,G=(e,t,n)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;let V=e=>r.createElement("svg",((e,t)=>{for(var n in t||(t={}))_.call(t,n)&&G(e,n,t[n]);if(W)for(var n of W(t))U.call(t,n)&&G(e,n,t[n]);return e})({viewBox:"64 64 896 896"},e),r.createElement("path",{d:"M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"}));var Z=Object.defineProperty,q=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable,Y=(e,t,n)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;let J=e=>r.createElement("svg",((e,t)=>{for(var n in t||(t={}))K.call(t,n)&&Y(e,n,t[n]);if(q)for(var n of q(t))Q.call(t,n)&&Y(e,n,t[n]);return e})({viewBox:"64 64 896 896"},e),r.createElement("path",{d:"M868 545.5 536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"}));var ee=Object.defineProperty,et=Object.getOwnPropertySymbols,en=Object.prototype.hasOwnProperty,ei=Object.prototype.propertyIsEnumerable,eo=(e,t,n)=>t in e?ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;let er=e=>r.createElement("svg",((e,t)=>{for(var n in t||(t={}))en.call(t,n)&&eo(e,n,t[n]);if(et)for(var n of et(t))ei.call(t,n)&&eo(e,n,t[n]);return e})({viewBox:"64 64 896 896"},e),r.createElement("path",{d:"M909.6 854.5 649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}));var ea=e.i(429792),el=Object.defineProperty,es=Object.getOwnPropertySymbols,ed=Object.prototype.hasOwnProperty,ec=Object.prototype.propertyIsEnumerable,ep=(e,t,n)=>t in e?el(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;let eu=e=>r.createElement("svg",((e,t)=>{for(var n in t||(t={}))ed.call(t,n)&&ep(e,n,t[n]);if(es)for(var n of es(t))ec.call(t,n)&&ep(e,n,t[n]);return e})({viewBox:"0 0 1024 1024"},e),r.createElement("path",{d:"m885.2 446.3-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"}));function em(e){let t=0,n=0,i=e;do t+=i.offsetTop||0,n+=i.offsetLeft||0,i=i.offsetParent;while(i)return{top:t,left:n}}class eg{constructor(e){this.element=e}getHorizontalScroll(){return this.element.scrollLeft}getVerticalScroll(){return this.element.scrollTop}getMaxHorizontalScroll(){return this.element.scrollWidth-this.element.clientWidth}getMaxVerticalScroll(){return this.element.scrollHeight-this.element.clientHeight}getHorizontalElementScrollOffset(e,t){return em(e).left-em(t).left}getVerticalElementScrollOffset(e,t){return em(e).top-em(t).top}scrollTo(e,t){this.element.scrollLeft=e,this.element.scrollTop=t}}class eh{constructor(){this.element=window}getHorizontalScroll(){return window.scrollX||document.documentElement.scrollLeft}getVerticalScroll(){return window.scrollY||document.documentElement.scrollTop}getMaxHorizontalScroll(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.body.clientWidth,document.documentElement.clientWidth)-window.innerWidth}getMaxVerticalScroll(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-window.innerHeight}getHorizontalElementScrollOffset(e){return(window.scrollX||document.documentElement.scrollLeft)+e.getBoundingClientRect().left}getVerticalElementScrollOffset(e){return(window.scrollY||document.documentElement.scrollTop)+e.getBoundingClientRect().top}scrollTo(e,t){window.scrollTo(e,t)}}let ex={elements:[],cancelMethods:[],add:(e,t)=>{ex.elements.push(e),ex.cancelMethods.push(t)},remove:(e,t)=>{let n=ex.elements.indexOf(e);n>-1&&(t&&ex.cancelMethods[n](),ex.elements.splice(n,1),ex.cancelMethods.splice(n,1))}},ef="u">typeof window,eb={cancelOnUserAction:!0,easing:e=>--e*e*e+1,elementToScroll:ef?window:null,horizontalOffset:0,maxDuration:3e3,minDuration:250,speed:500,verticalOffset:0};var ew=function(e){var t,n,i,o;return t=this,n=arguments,i=void 0,o=function*(e,t={}){let n,i;if(!ef)return new Promise(e=>{e(!1)});if(!window.Promise)throw"Browser doesn't support Promises, and animated-scroll-to depends on it, please provide a polyfill.";let o=Object.assign(Object.assign({},eb),t),r=o.elementToScroll===window,a=!!o.elementToScroll.nodeName;if(!r&&!a)throw"Element to scroll needs to be either window or DOM element.";let l=r?document.documentElement:o.elementToScroll,s=getComputedStyle(l);[{property:"scroll-behavior",value:"smooth"},{property:"scroll-snap-type",value:"mandatory"}].forEach(({property:e,value:t})=>{let n=s.getPropertyValue(e);n.includes(t)&&console.warn(`${l.tagName} has "${e}: ${n}" which can break animated-scroll-to's animations`)});let d=r?new eh:new eg(o.elementToScroll);if(e instanceof Element){if(a&&(!o.elementToScroll.contains(e)||o.elementToScroll.isSameNode(e)))throw"options.elementToScroll has to be a parent of scrollToElement";n=d.getHorizontalElementScrollOffset(e,o.elementToScroll),i=d.getVerticalElementScrollOffset(e,o.elementToScroll)}else if("number"==typeof e)n=d.getHorizontalScroll(),i=e;else if(Array.isArray(e)&&2===e.length)n=null===e[0]?d.getHorizontalScroll():e[0],i=null===e[1]?d.getVerticalScroll():e[1];else throw"Wrong function signature. Check documentation.\nAvailable method signatures are:\n  animateScrollTo(y:number, options)\n  animateScrollTo([x:number | null, y:number | null], options)\n  animateScrollTo(scrollToElement:Element, options)";n+=o.horizontalOffset,i+=o.verticalOffset;let c=d.getMaxHorizontalScroll(),p=d.getHorizontalScroll();n>c&&(n=c);let u=n-p,m=d.getMaxVerticalScroll(),g=d.getVerticalScroll();i>m&&(i=m);let h=i-g,x=Math.abs(Math.round(u/1e3*o.speed)),f=Math.abs(Math.round(h/1e3*o.speed)),b=x>f?x:f;return b<o.minDuration?b=o.minDuration:b>o.maxDuration&&(b=o.maxDuration),new Promise((e,t)=>{let r;0===u&&0===h&&e(!0),ex.remove(d.element,!0);let a=()=>{m(),cancelAnimationFrame(r),e(!1)};ex.add(d.element,a);let l=o.cancelOnUserAction?a:e=>e.preventDefault(),s=o.cancelOnUserAction?{passive:!0}:{passive:!1},c=["wheel","touchstart","keydown","mousedown"],m=()=>{c.forEach(e=>{d.element.removeEventListener(e,l,s)})};c.forEach(e=>{d.element.addEventListener(e,l,s)});let x=Date.now(),f=()=>{var t=Date.now()-x,a=t/b;let l=Math.round(p+u*o.easing(a)),s=Math.round(g+h*o.easing(a));t<b&&(l!==n||s!==i)?(d.scrollTo(l,s),r=requestAnimationFrame(f)):(d.scrollTo(n,i),cancelAnimationFrame(r),m(),ex.remove(d.element,!1),e(!0))};r=requestAnimationFrame(f)})},new(i||(i=Promise))(function(e,r){function a(e){try{s(o.next(e))}catch(e){r(e)}}function l(e){try{s(o.throw(e))}catch(e){r(e)}}function s(t){var n;t.done?e(t.value):((n=t.value)instanceof i?n:new i(function(e){e(n)})).then(a,l)}s((o=o.apply(t,n||[])).next())})},ev=e.i(927298),ey=e.i(850921),e$=e.i(846205);function ej(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"u">typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i,o,r,a,l=[],s=!0,d=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(i=r.call(n)).done)&&(l.push(i.value),l.length!==t);s=!0);}catch(e){d=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(d)throw o}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return ek(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ek(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ek(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var eS={title:function(){return r.default.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M5.333 10.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 13.333 4 12.89 4 12s.444-1.333 1.333-1.333Z"}),r.default.createElement("path",{d:"M13.207 2.667h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Zm8 0h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Z"}),r.default.createElement("path",{d:"M5.333 18.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 21.333 4 20.89 4 20s.444-1.333 1.333-1.333Z"}))},page:function(){return r.default.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M9.402 0h14.78L30 6.16V24.5c0 1.933-1.71 3.5-3.589 3.5H9.401C7.524 28 6 26.433 6 24.5v-21C6 1.567 7.523 0 9.402 0ZM23 2v4.183c0 .451.366.817.817.817H28l-5-5Zm3.333 24c.92 0 1.667-.768 1.667-1.714V8.857h-5c-.92 0-1.667-.767-1.667-1.714V2H9.667C8.747 2 8 2.768 8 3.714v20.572C8 25.232 8.746 26 9.667 26h16.666Z"}))},content:function(){return r.default.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M6.12 14.589h6.628l1.52 4.004h2.485l-5.938-15.19H8.053L2.115 18.732H4.6l1.52-4.143ZM8.88 6.855c.139-.414.277-.828.415-1.38h.138c0 .138.138.414.414 1.104 0 .138.138.276.138.276 0 .138.829 2.072 2.21 5.938H6.672c1.519-3.866 2.21-5.8 2.21-5.938Zm8.148 2.348h12.705v1.933H17.029V9.203ZM2.115 20.665h27.619v1.933H2.114v-1.933Zm14.914-5.662h12.705v1.933H17.029v-1.933ZM2.115 26.327h27.619v1.933H2.114v-1.933ZM17.029 3.54h12.705v1.934H17.029V3.54Z"}))},demo:function(){return r.default.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M28 6h-5a5 5 0 0 0-10 0H8a2 2 0 0 0-2 2v5a5 5 0 0 0 0 10v5a2 2 0 0 0 2 2h7v-2a3 3 0 0 1 6 0v2h7a2 2 0 0 0 2-2v-7h-2a3 3 0 0 1 0-6h2V8a2 2 0 0 0-2-2Zm-5 12a5 5 0 0 0 5 5v5h-5a5 5 0 0 0-10 0H8v-7H6a3 3 0 0 1 0-6h2V8h7V6a3 3 0 0 1 6 0v2h7v5a5 5 0 0 0-5 5Z"}))}},eC=function(e){return r.default.createElement(r.default.Fragment,null,e.texts.map(function(e,t){return r.default.createElement(r.Fragment,{key:t},e.highlighted?r.default.createElement("mark",null,e.text):e.text)}))},eE=function(e){var t=(0,r.useCallback)(function(){var t=0,n=[];return e.forEach(function(e){e.title&&n.push({type:"title",value:{title:e.title}}),e.hints.forEach(function(e){n.push({type:"hint",activeIndex:t++,value:e})})}),[n,t]},[e]),n=ej((0,r.useState)(t),2),i=n[0],o=n[1];return(0,r.useEffect)(function(){o(t)},[e]),i},ez=function(e){var t=ej(eE(e.data),2),n=t[0],i=t[1],o=ej((0,r.useState)(-1),2),a=o[0],l=o[1],s=(0,c.useLocation)().pathname,d=function(t){null==(n=e.onItemSelect)||n.call(e,t);var n,i=new URL(null==t?void 0:t.link,location.origin);(null==i?void 0:i.pathname)!==s||i.hash||setTimeout(function(){ew(0,{maxDuration:300})},1)};(0,r.useEffect)(function(){var e=function(e){if("ArrowDown"===e.key)l((a+1)%i);else if("ArrowUp"===e.key)l((a+i-1)%i);else if("Enter"===e.key&&a>=0){var t=n.find(function(e){return"hint"===e.type&&e.activeIndex===a}).value;ey.history.push(t.link),null==d||d(t),document.activeElement.blur()}["Escape","Enter"].includes(e.key)&&l(-1)};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}});var p=null;return p=e.loading?r.default.createElement("div",{className:"dumi-default-search-empty"},r.default.createElement(eu,null),r.default.createElement(ev.FormattedMessage,{id:"search.loading"})):e.data.length?r.default.createElement("dl",null,n.map(function(e,t){return"title"===e.type?r.default.createElement("dt",{key:String(t)},e.value.title):r.default.createElement("dd",{key:String(t)},r.default.createElement(e$.Link,{to:e.value.link,"data-active":a===e.activeIndex||void 0,onClick:function(){return null==d?void 0:d(e.value)}},r.default.createElement(eS[e.value.type]),r.default.createElement("h4",null,r.default.createElement(eC,{texts:e.value.highlightTitleTexts})),r.default.createElement("p",null,r.default.createElement(eC,{texts:e.value.highlightTexts}))))})):r.default.createElement("div",{className:"dumi-default-search-empty"},r.default.createElement(eu,null),r.default.createElement(ev.FormattedMessage,{id:"search.not.found"})),r.default.createElement("div",{className:"dumi-default-search-result",onMouseEnter:function(){return l(-1)},onMouseDownCapture:function(e){return e.preventDefault()},onMouseUpCapture:function(){document.activeElement.blur()}},p)},eM=e.i(116432),eN=(0,r.forwardRef)(function(e,t){var n=(0,eM.useIntl)(),i=(0,r.useRef)(!1),o=(0,r.useRef)(null);return(0,r.useImperativeHandle)(t,function(){return o.current}),r.default.createElement("input",{className:"dumi-default-search-bar-input",onCompositionStart:function(){return i.current=!0},onCompositionEnd:function(t){i.current=!1,e.onChange(t.currentTarget.value)},onFocus:e.onFocus,onBlur:e.onBlur,onMouseEnter:e.onMouseEnter,onKeyDown:function(e){["ArrowDown","ArrowUp"].includes(e.key)&&e.preventDefault(),"Escape"!==e.key||i.current||e.currentTarget.blur()},onChange:function(t){var n=t.target.value;setTimeout(function(){i.current||e.onChange(n)},1)},placeholder:n.formatMessage({id:"header.search.placeholder"}),ref:o})}),eA=function(e){return(0,r.useEffect)(function(){if(e.visible)document.body.style.overflow="hidden";else if(document.body.style.overflow){var t;document.body.style.overflow="",null==(t=e.onClose)||t.call(e)}},[e.visible]),e.visible?r.default.createElement("div",{className:"dumi-default-search-modal"},r.default.createElement("div",{className:"dumi-default-search-modal-mask",onClick:e.onMaskClick}),r.default.createElement("div",{className:"dumi-default-search-modal-content"},e.children)):null};function eT(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"u">typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i,o,r,a,l=[],s=!0,d=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(i=r.call(n)).done)&&(l.push(i.value),l.length!==t);s=!0);}catch(e){d=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(d)throw o}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return eL(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return eL(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function eL(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=Array(t);n<t;n++)i[n]=e[n];return i}var eD=/(mac|iphone|ipod|ipad)/i.test("u">typeof navigator?null==(t=navigator)?void 0:t.platform:""),eF=function(){var e=eT((0,r.useState)(!1),2),t=e[0],n=e[1],i=(0,r.useRef)(null),o=(0,r.useRef)(null),a=eT((0,r.useState)("⌘"),2),l=a[0],s=a[1],d=(0,ea.useSiteSearch)(),c=d.keywords,p=d.setKeywords,u=d.result,m=d.loading,g=d.load,h=eT((0,r.useState)(!1),2),x=h[0],f=h[1];return(0,r.useEffect)(function(){eD||s("Ctrl");var e=function(e){var t;if(((eD?e.metaKey:e.ctrlKey)&&"k"===e.key||"/"===e.key&&!(["TEXTAREA","INPUT"].includes((t=e.target).tagName)||"true"===t.contentEditable))&&(e.preventDefault(),i.current)){var n=i.current.getBoundingClientRect(),r=n.top,a=n.bottom,l=n.left,s=n.right;r>=0&&l>=0&&a<=window.innerHeight&&s<=window.innerWidth?i.current.focus():(p(""),f(!0),setTimeout(function(){var e;null==(e=o.current)||e.focus()}))}"Escape"===e.key&&(e.preventDefault(),f(!1))};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}},[]),r.default.createElement("div",{className:"dumi-default-search-bar"},r.default.createElement(er,{className:"dumi-default-search-bar-svg",title:"Search"}),r.default.createElement(eN,{onFocus:function(){n(!0),g()},onMouseEnter:function(){g()},onBlur:function(){setTimeout(function(){n(!1)},1)},onChange:function(e){return p(e)},ref:i}),r.default.createElement("span",{className:"dumi-default-search-shortcut"},l," K"),c.trim()&&t&&!x&&r.default.createElement("div",{className:"dumi-default-search-popover"},r.default.createElement("section",null,r.default.createElement(ez,{data:u,loading:m}))),r.default.createElement(eA,{visible:x,onMaskClick:function(){f(!1)},onClose:function(){return p("")}},r.default.createElement("div",{style:{position:"relative"}},r.default.createElement(er,{className:"dumi-default-search-bar-svg"}),r.default.createElement(eN,{onFocus:function(){return n(!0)},onBlur:function(){setTimeout(function(){n(!1)},1)},onChange:function(e){return p(e)},ref:o})),r.default.createElement(ez,{data:u,loading:m,onItemSelect:function(){f(!1)}}),r.default.createElement("footer",null,r.default.createElement("ul",{className:"dumi-default-search-modal-commands"},r.default.createElement("li",{className:"dumi-default-search-modal-commands-arrow"},r.default.createElement("span",{className:"dumi-default-search-modal-shortcut"},r.default.createElement(J,{width:"10px",height:"10px",fill:"rgba(0, 0, 0, 0.45)"})),r.default.createElement("span",{className:"dumi-default-search-modal-shortcut"},r.default.createElement(V,{width:"10px",height:"10px",fill:"rgba(0, 0, 0, 0.45)"})),r.default.createElement("span",{className:"dumi-default-search-modal-commands-text"},"to navigate")),r.default.createElement("li",null,r.default.createElement("span",{className:"dumi-default-search-modal-shortcut"},"esc"),r.default.createElement("span",{className:"dumi-default-search-modal-commands-text"},"to close"))))))};e.s(["default",0,eF],966691),e.i(966691);var eI=e.i(950323),eO=e.i(45024),eB=e.i(917231),eR=e.i(358144),eH=e.i(690639),eX=e.i(309999);let eP=({direction:e})=>(0,n.jsxs)("svg",{viewBox:"0 0 20 20",width:"20",height:"20",fill:"currentColor",style:{transform:`scaleX(${"ltr"===e?"1":"-1"})`},children:[(0,n.jsx)("title",{children:"Direction Icon"}),(0,n.jsx)("path",{d:"m14.6961816 11.6470802.0841184.0726198 2 2c.2662727.2662727.2904793.682876.0726198.9764816l-.0726198.0841184-2 2c-.2929.2929-.7677.2929-1.0606 0-.2662727-.2662727-.2904793-.682876-.0726198-.9764816l.0726198-.0841184.7196-.7197h-10.6893c-.41421 0-.75-.3358-.75-.75 0-.3796833.28215688-.6934889.64823019-.7431531l.10176981-.0068469h10.6893l-.7196-.7197c-.2929-.2929-.2929-.7677 0-1.0606.2662727-.2662727.682876-.2904793.9764816-.0726198zm-8.1961616-8.6470802c.30667 0 .58246.18671.69635.47146l3.00003 7.50004c.1538.3845-.0333.821-.41784.9749-.38459.1538-.82107-.0333-.9749-.4179l-.81142-2.0285h-2.98445l-.81142 2.0285c-.15383.3846-.59031.5717-.9749.4179-.38458-.1539-.57165-.5904-.41781-.9749l3-7.50004c.1139-.28475.38968-.47146.69636-.47146zm8.1961616 1.14705264.0841184.07261736 2 2c.2662727.26626364.2904793.68293223.0726198.97654222l-.0726198.08411778-2 2c-.2929.29289-.7677.29289-1.0606 0-.2662727-.26626364-.2904793-.68293223-.0726198-.97654222l.0726198-.08411778.7196-.7196675h-3.6893c-.4142 0-.75-.3357925-.75-.7500025 0-.3796925.2821653-.69348832.6482323-.74315087l.1017677-.00684663h3.6893l-.7196-.7196725c-.2929-.29289-.2929-.76777 0-1.06066.2662727-.26626364.682876-.29046942.9764816-.07261736zm-8.1961616 1.62238736-.89223 2.23056h1.78445z"})]});var eW=e=>{let{ref:t,direction:i,...o}=e;return(0,n.jsx)(eX.default,{component:()=>(0,n.jsx)(eP,{direction:i}),ref:t,...o})},e_=e.i(369381),eU=e.i(729946),eG=e.i(558222),eV=e.i(171745);let eZ=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>{let{headerHeight:i,mobileMaxWidth:o}=t,{colorTextHeading:r}=e;return{logo:n`
      height: ${i}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${r};
      font-weight: bold;
      font-size: 18px;
      font-family: Avenir, ${e.fontFamily}, sans-serif;
      line-height: ${i}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      column-gap: ${e.marginSM};

      &:hover {
        color: ${r};
      }

      img {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
      }

      @media only screen and (max-width: ${o}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,title:n`
      line-height: 32px;
    `}});var eq=({isZhCN:e})=>{let{search:t}=(0,c.useLocation)(),{styles:i}=eZ();return(0,n.jsx)("h1",{children:(0,n.jsxs)(eV.default,{to:eU.getLocalizedPathname("/",e,t),className:i.logo,children:[(0,n.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",draggable:!1,alt:"logo"}),(0,n.jsx)("span",{className:i.title,children:"Ant Design"})]})})},D=D,eK=e.i(329282),eQ=e.i(38451);let eY={cn:{design:"设计",development:"研发",components:"组件",resources:"资源",blog:"博客"},en:{design:"Design",development:"Development",components:"Components",resources:"Resources",blog:"Blog"}},eJ=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>({nav:n`
      height: 100%;
      font-size: ${e.fontSize};
      font-family: Avenir, ${e.fontFamily}, sans-serif;
      border: 0 !important;

      &${t.antCls}-menu-horizontal {
        border-bottom: none;

        & > ${t.antCls}-menu-item, & > ${t.antCls}-menu-submenu {
          min-width: ${56}px;
          height: ${t.headerHeight}px;
          padding-inline-end: 8px;
          padding-inline-start: 8px;
          line-height: ${t.headerHeight}px;
        }

        & ${t.antCls}-menu-submenu-title ${t.iconCls} {
          margin: 0;
        }

        & > ${t.antCls}-menu-item-selected {
          a {
            color: ${e.colorPrimary};
          }
        }
      }

      & > ${t.antCls}-menu-item, & > ${t.antCls}-menu-submenu {
        text-align: center;
      }
    `}));var e0=e=>{let{isZhCN:t,isMobile:i,responsive:o,directionText:r,onLangChange:l,onDirectionChange:s}=e,{pathname:d,search:p}=(0,c.useLocation)(),[u]=(0,m.default)(eY),g=(0,eQ.useFullSidebarData)(),h=g["/docs/blog"]?.[0]?.children||[],{styles:x}=eJ(),f=d.split("/").filter(Boolean).slice(0,-1).join("/")||"home";d.startsWith("/changelog")?f="docs/react":d.startsWith("/docs/resources")&&(f="docs/resources");let b=[],w=[{label:(0,n.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer",children:"GitHub"}),key:"github"},{label:(0,n.jsx)(ev.FormattedMessage,{id:"app.header.lang"}),onClick:l,key:"switch-lang"},{label:r,onClick:s,key:"switch-direction"}];i?b=w:"crowded"===o&&(b=[{label:(0,n.jsx)(D.default,{}),key:"additional",children:[...w]}]);let v=[{label:(0,n.jsx)(eV.default,{to:eU.getLocalizedPathname("/docs/spec/introduce",t,p),children:u.design}),key:"docs/spec"},{label:(0,n.jsx)(eV.default,{to:eU.getLocalizedPathname("/docs/react/introduce",t,p),children:u.development}),key:"docs/react"},{label:(0,n.jsx)(eV.default,{to:eU.getLocalizedPathname("/components/overview/",t,p),children:u.components}),key:"components"},h.length?{label:(0,n.jsx)(eV.default,{to:eU.getLocalizedPathname(h.sort((e,t)=>e.frontmatter?.date>t.frontmatter?.date?-1:1)[0].link,t,p),children:u.blog}),key:"docs/blog"}:null,{label:(0,n.jsx)(eV.default,{to:eU.getLocalizedPathname("/docs/resources",t,p),children:u.resources}),key:"docs/resources"},t?{key:"mirror",label:(0,n.jsx)("a",{href:"https://ant-design.antgroup.com",target:"_blank",rel:"noopener noreferrer",children:"国内镜像"})}:null,...b??[]].filter(Boolean);return(0,n.jsx)(a.ConfigProvider,{theme:{token:{colorBgContainer:"transparent"}},children:(0,n.jsx)(eK.Menu,{mode:i?"inline":"horizontal",selectedKeys:[f],className:x.nav,disabledOverflow:!0,items:v})})},e1=e.i(711412),e2=e.i(475685);let e6=(0,x.createStyles)(({cssVar:e,css:t})=>({wrap:t`
    display: flex;
    align-items: center;
    margin-inline-start: 8px;
    margin-inline-end: 12px;
  `,avatarLink:t`
    display: block;
    border-radius: 50%;
    margin-inline-start: -6px;
    border: 2px solid ${e.colorBgLayout};
    position: relative;
    z-index: 0;

    &:first-child {
      margin-inline-start: 0;
    }

    &:hover,
    &:focus-within {
      z-index: 1;

      img {
        transform: translateY(-2px);
        opacity: 1;
      }
    }
  `,avatar:t`
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: contain;
    background: ${e.colorBgContainer};
    opacity: 0.5;
    transition:
      transform ${e.motionDurationFast},
      opacity ${e.motionDurationSlow};
  `}));var e3=()=>{let{styles:e}=e6(),[,t]=(0,m.default)();return(0,n.jsx)("div",{className:e.wrap,"aria-label":"Sponsors",children:e2.sponsors.map(i=>(0,n.jsx)(B.Popover,{content:(0,n.jsx)(e1.default,{sponsor:i,lang:t}),trigger:["hover","focus"],placement:"bottomRight",arrow:{pointAtCenter:!0},destroyOnHidden:!0,children:(0,n.jsx)("a",{href:(0,e2.getSponsorUrl)(i.url,t),target:"_blank",rel:"noopener noreferrer",className:e.avatarLink,children:(0,n.jsx)("img",{src:i.logo,alt:i.name,className:e.avatar,draggable:!1})})},i.name))})},e4=e.i(151304);let e8="1.2em",e5=(0,x.createStaticStyles)(({cssVar:e,css:t})=>({btn:t`
      width: ${e.controlHeight};
      .btn-inner {
        transition: all ${e.motionDurationMid};
        display: flex;
      }
      img {
        width: ${e8};
        height: ${e8};
      }
    `,innerDiv:t`
      position: relative;
      width: ${e8};
      height: ${e8};
    `,labelStyle:t`
      position: absolute;
      font-size: ${e8};
      line-height: 1;
      border: 1px solid ${e.colorText};
      color: ${e.colorText};
    `,label1Style:t`
      inset-inline-start: -5%;
      top: 0;
      z-index: 1;
      background-color: ${e.colorText};
      color: ${e.colorBgContainer};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,label2Style:t`
      inset-inline-end: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `}));var e7=e=>{let{label1:t,label2:o,tooltip1:r,tooltip2:a,value:l,pure:s,onClick:d,...c}=e,{btn:p,innerDiv:u,labelStyle:m,label1Style:g,label2Style:h}=e5,x=(0,n.jsx)(I.Button,{type:"text",onClick:d,className:p,...(0,e4.omit)(c,["className"]),children:(0,n.jsxs)("div",{className:"btn-inner",children:[s&&(1===l?t:o),!s&&(0,n.jsxs)("div",{className:u,children:[(0,n.jsx)("span",{className:(0,i.clsx)(m,1===l?g:h),children:t}),(0,n.jsx)("span",{className:(0,i.clsx)(m,1===l?h:g),children:o})]})]})},"lang-button");return r||a?(0,n.jsx)(X.Tooltip,{title:1===l?r:a,children:x}):x};let e9=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>{let i="#ced4d9";return{header:n`
      position: sticky;
      top: 0;
      z-index: 1000;
      max-width: 100%;
      background: ${e.colorBgContainer};
      box-shadow: ${e.boxShadowTertiary};
      backdrop-filter: blur(8px);

      @media only screen and (max-width: ${t.mobileMaxWidth}px) {
        text-align: center;
        border: none;
      }

      .dumi-default-search-bar {
        display: inline-flex;
        align-items: center;
        flex: auto;
        max-width: 220px;
        height: 32px;
        margin: 0;
        margin-inline-end: 16px !important;
        background: ${e.colorBgContainer};
        border-radius: ${e.borderRadiusSM};
        transition: background ${e.motionDurationSlow};

        > svg {
          width: 14px;
          fill: ${i};
          flex-shrink: 0;
          margin-inline-start: -6px;
        }

        > input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: 0;
          background: transparent;
          padding-inline-start: 32px;

          &:focus {
            box-shadow: none;
            background: transparent;
          }

          &::placeholder {
            color: ${i};
          }
        }

        &:hover,
        &:focus-within {
          background: ${e.colorFillSecondary};
        }

        .dumi-default-search-shortcut {
          display: none;
        }

        .dumi-default-search-popover {
          inset-inline-start: ${e.paddingSM};
          inset-inline-end: unset;
          z-index: 1;
          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
          & > section {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
        }
      }
    `,menuRow:n`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      column-gap: 2px;
      padding-inline-end: ${e.paddingMD};

      > * {
        flex: none;
        margin: 0;
      }

      .ant-btn {
        font-family: sans-serif;
      }
    `,dataDirectionIcon:n`
      width: 20px;
    `,popoverMenu:{width:300,[`${t.antCls}-popover-inner-content`]:{padding:0}},banner:n`
      width: 100%;
      text-align: center;
      word-break: keep-all;
      user-select: none;
    `,link:n`
      margin-inline-start: 10px;
      @media only screen and (max-width: ${t.mobileMaxWidth}px) {
        margin-inline-start: 0;
      }
    `,versionSelect:n`
      width: 88px;
      min-width: 88px; // 这个宽度需要和 Empty 状态的宽度保持一致
      margin-inline-end: 6px;
      .rc-virtual-list {
        .rc-virtual-list-holder {
          scrollbar-width: thin;
          scrollbar-gutter: stable;
        }
      }
    `}}),te=(...e)=>fetch(...e).then(e=>e.json());var tt=()=>{let[,e]=(0,m.default)(),{pkg:t}=(0,u.useSiteData)(),l=void 0!==window.location&&window.location.hostname.includes(".antgroup.com"),{data:s=[],isLoading:d}=(0,eI.default)(`${window.location.origin}/versions.json`,te,{fallbackData:eO.default,errorRetryCount:3}),p=(0,r.useMemo)(()=>d?[]:s.map(e=>{let n=e.version.startsWith(t.version[0])?t.version:e.version;return{value:l&&e.chineseMirrorUrl?e.chineseMirrorUrl:e.url,label:n}}),[s,d,t.version,l]),[g,h]=(0,r.useState)({menuVisible:!1,windowWidth:1400,searching:!1}),{direction:x,isMobile:f,bannerVisible:b,updateSiteConfig:w}=r.default.use(eG.default),v=(0,r.useRef)(null),y=(0,c.useLocation)(),{pathname:$,search:j}=y,{styles:k}=e9(),[,S]=(0,eB.default)(e_.ANT_DESIGN_NOT_SHOW_BANNER,{defaultValue:void 0}),[,C]=(0,eB.default)("ANT_LOCAL_TYPE_KEY",{defaultValue:void 0}),E=(0,r.useCallback)(()=>{h(e=>({...e,menuVisible:!1}))},[]),z=(0,r.useCallback)(()=>{h(e=>({...e,windowWidth:window.innerWidth}))},[]),M=(0,r.useCallback)(e=>{h(t=>({...t,menuVisible:e}))},[]),N=()=>{w({direction:"rtl"!==x?"rtl":"ltr"})};(0,r.useEffect)(()=>{E()},[E,y]),(0,r.useEffect)(()=>(z(),window.addEventListener("resize",z),()=>{window.removeEventListener("resize",z),v.current&&clearTimeout(v.current)}),[z]);let A=(0,r.useCallback)(e=>{let t=window.location.href,n=window.location.pathname;if(/overview/.test(n)&&/0?[1-39][0-3]?x/.test(e)){window.location.href=t.replace(window.location.origin,e).replace(/\/components\/overview/,`/docs${/0(9|10)x/.test(e)?"":"/react"}/introduce`).replace(/\/$/,"");return}let i=new URL(t.replace(window.location.origin,e));i.host.includes("antgroup")?(i.pathname=`${i.pathname.replace(/\/$/,"")}/`,window.location.href=i.toString()):window.location.href=i.href.replace(/\/$/,"")},[]),T=(0,r.useCallback)(()=>{let e=`${window.location.protocol}//`,t=window.location.href.slice(e.length);C(eU.isZhCN($)?"en-US":"zh-CN"),window.location.href=e+t.replace(window.location.pathname,eU.getLocalizedPathname($,!eU.isZhCN($),j).pathname)},[$,j]),P=(0,r.useMemo)(()=>"rtl"!==x?"RTL":"LTR",[x]),W=(0,r.useMemo)(()=>"rtl"===x?{direction:"ltr",textAlign:"end"}:{},[x]),{menuVisible:_,windowWidth:U,searching:G}=g,V=["","index","index-cn"].includes($),Z="cn"===e,q="rtl"===x,K=(0,eR.getBannerData)(),Q=K?.title||"",Y=K?.href||"",J=null;U<1120?J="crowded":U<1200&&(J="narrow");let ee=(0,i.clsx)(k.header,"clearfix",{"home-header":V}),et={isZhCN:Z,isRTL:q},en=(0,n.jsx)(e0,{...et,responsive:J,isMobile:f,directionText:P,onLangChange:T,onDirectionChange:N},"nav"),ei=[en,(0,n.jsx)(e3,{},"sponsors"),(0,n.jsx)(H.Select,{size:"small",variant:"filled",loading:d,className:k.versionSelect,defaultValue:t.version,onChange:A,styles:{popup:{root:W}},popupMatchSelectWidth:!1,getPopupContainer:e=>e.parentNode,options:p},"version"),(0,n.jsx)(e7,{onClick:T,value:eU.isZhCN($)?1:2,label1:"中",label2:"En",tooltip1:"中文 / English",tooltip2:"English / 中文"},"lang"),(0,n.jsx)(e7,{onClick:N,value:"rtl"===x?2:1,label1:(0,n.jsx)(eW,{className:k.dataDirectionIcon,direction:"ltr"}),tooltip1:"LTR",label2:(0,n.jsx)(eW,{className:k.dataDirectionIcon,direction:"rtl"}),tooltip2:"RTL",pure:!0,"aria-label":"RTL Switch Button"},"direction"),(0,n.jsx)(eH.default,{},"theme"),(0,n.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(X.Tooltip,{title:"GitHub",destroyOnHidden:!0,children:(0,n.jsx)(I.Button,{type:"text",icon:(0,n.jsx)(L.default,{}),style:{fontSize:16}})})},"github")];U<1120?ei=G?[]:[en]:U<1200&&(ei=G?[]:ei);let eo=V?[{flex:"none"},{flex:"auto"}]:[{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24},{xxl:20,xl:19,lg:18,md:18,sm:0,xs:0}];return(0,n.jsxs)("header",{className:ee,children:[f&&(0,n.jsx)(B.Popover,{classNames:{root:k.popoverMenu},placement:"bottomRight",content:ei,trigger:"click",open:_,arrow:{pointAtCenter:!0},onOpenChange:M,children:(0,n.jsx)(D.default,{className:"nav-phone-icon"})}),Z&&b&&Q&&Y&&(0,n.jsx)(a.ConfigProvider,{theme:{token:{colorInfoBg:"linear-gradient(90deg, #84fab0, #8fd3f4)",colorTextBase:"#000"}},children:(0,n.jsx)(F.Alert,{className:k.banner,title:Q&&Y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:Q}),(0,n.jsx)("a",{className:k.link,href:Y,target:"_blank",rel:"noopener noreferrer",onClick:()=>{window.gtag?.("event","点击",{event_category:"top_banner",event_label:Y})},children:"前往了解"})]}):null,type:"info",banner:!0,showIcon:!1,closable:{closeIcon:!0,onClose:()=>{w({bannerVisible:!1}),S((0,o.default)().toISOString())}}})}),(0,n.jsxs)(R.Row,{style:{flexFlow:"nowrap",height:64},children:[(0,n.jsx)(O.Col,{...eo[0],children:(0,n.jsx)(eq,{...et,location:y})}),(0,n.jsx)(O.Col,{...eo[1],children:(0,n.jsxs)("div",{className:k.menuRow,children:[(0,n.jsx)(eF,{}),!f&&ei]})})]})]})},tn=e.i(537755),ti=e.i(256047),to=e.i(91595),L=L,tr=e.i(71780),tr=tr,ta=e.i(709238),ta=ta,tl=e.i(750636),tl=tl,ts=e.i(739561),td=e.i(883376),tc=e.i(600321),tc=tc,tp=e.i(207744),tp=tp,tu=e.i(930634),tm=e.i(65940),tm=tm,tg=e.i(516160),th=e.i(964473),tx=e.i(987250),tf=e.i(845186),tb=e.i(272043),tw=function(e){var t=e.prefixCls,n=e.icon,i=e.title,o=e.items,a=e.style,l=e.className;return r.default.createElement("div",{className:(0,tb.default)("".concat(t,"-column"),l),style:a},(i||n)&&r.default.createElement("h2",null,n&&r.default.createElement("span",{className:"".concat(t,"-column-icon")},n),i),(void 0===o?[]:o).map(function(e,n){var i=e.LinkComponent||"a";return r.default.createElement("div",{className:(0,tb.default)("".concat(t,"-item"),e.className),style:e.style,key:n},r.default.createElement(i,{href:e.url,to:"string"!=typeof i?e.url:void 0,target:e.openExternal?"_blank":void 0,rel:e.openExternal?"noopener noreferrer":void 0},e.icon&&r.default.createElement("span",{className:"".concat(t,"-item-icon")},e.icon),e.title),e.description&&r.default.createElement(r.default.Fragment,null,r.default.createElement("span",{className:"".concat(t,"-item-separator")},"-"),r.default.createElement("span",{className:"".concat(t,"-item-description")},e.description)))}))},tv=["prefixCls","className","style","bottom","columns","maxColumnsPerRow","backgroundColor","columnLayout","theme"],ty=function(e){var t=e.prefixCls,n=void 0===t?"rc-footer":t,i=e.className,o=e.style,a=e.bottom,l=e.columns,s=e.maxColumnsPerRow,d=e.backgroundColor,c=e.columnLayout,p=e.theme,u=void 0===p?"dark":p,m=(0,tf.default)(e,tv),g=(0,tb.default)("".concat(n),i,(0,tx.default)({},"".concat(n,"-").concat(u),!!u)),h="number"==typeof s&&s>0;return r.default.createElement("footer",(0,th.default)((0,th.default)({},m),{},{className:g,style:(0,th.default)((0,th.default)({},o),{},{backgroundColor:d})}),r.default.createElement("section",{className:"".concat(n,"-container")},l&&l.length>0&&r.default.createElement("section",{className:"".concat(n,"-columns"),style:{justifyContent:c,flexWrap:h?"wrap":void 0}},l.map(function(e,t){var i=e.title,o=e.icon,a=e.style,l=e.className,d=e.items,c=(0,th.default)({},a);return h&&(c.flex="0 0 ".concat(100/(s+1)+.1,"%")),r.default.createElement(tw,{key:t,prefixCls:n,title:i,icon:o,items:void 0===d?[]:d,style:c,className:l})}))),a&&r.default.createElement("section",{className:"".concat(n,"-bottom")},r.default.createElement("div",{className:"".concat(n,"-bottom-container")},a)))};let t$="ant-where-checker",tj={cn:{whereNotSupport:"你的浏览器不支持现代 CSS Selector，请使用现代浏览器（如 Chrome、Firefox 等等）查看官网。如果需要对旧版浏览器进行样式支持，欢迎查阅配置文档：",whereDocTitle:"兼容性调整（请使用现代浏览器访问）",whereDocUrl:"/docs/react/customize-theme-cn#兼容性调整"},en:{whereNotSupport:"Your browser not support modern CSS Selector. Please use modern browser to view (e.g. Chrome, Firefox, etc). If you want to compatible style with legacy browser, please refer to the configuration document:",whereDocTitle:"Compatible adjustment (Please use modern browser to visit)",whereDocUrl:"/docs/react/customize-theme#compatible-adjustment"}},tk=(0,x.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
    position: fixed;
    inset-inline-start: 0;
    inset-inline-end: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999;
    background-color: ${t.colorTextSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
  `,alertBox:e`
    border: 1px solid ${t.colorWarningBorder};
    background-color: ${t.colorWarningBg};
    color: ${t.colorTextHeading};
    padding: ${t.paddingXS} ${t.paddingSM};
    border-radius: ${t.borderRadiusLG};
    z-index: 9999999999;
    line-height: 22px;
    width: 520px;
    a {
      color: ${t.colorPrimary};
      text-decoration-line: none;
    }
  `}));var tS=()=>{let[e]=(0,m.default)(tj),[t,i]=r.useState(!0);return(r.useEffect(()=>{let e=document.createElement("p");e.className=t$,e.style.position="fixed",e.style.pointerEvents="none",e.style.visibility="hidden",e.style.width="0",document.body.appendChild(e),(0,e4.updateCSS)(`
:where(.${t$}) {
  content: "__CHECK__";
}
    `,t$);let{content:t}=getComputedStyle(e);i(String(t).includes("CHECK")),document.body.removeChild(e),(0,e4.removeCSS)(t$)},[]),t)?null:(0,n.jsx)("div",{className:tk.container,children:(0,n.jsxs)("div",{className:tk.alertBox,children:[e.whereNotSupport," ",(0,n.jsx)("a",{href:e.whereDocUrl,children:e.whereDocTitle})]})})};let tC={cn:{owner:"蚂蚁集团和 Ant Design 开源社区"},en:{owner:"Ant Group and Ant Design Community"}},tE=(0,x.createStyles)(({cssVar:e,token:t,css:n},i)=>{let o=new j.FastColor((0,tg.default)("#f0f3fa","#fff")).onBackground(t.colorBgContainer).toHexString();return{holder:n`
      background: ${o};
    `,footer:n`
      background: ${o};
      color: ${e.colorTextSecondary};
      box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

      * {
        box-sizing: border-box;
      }

      h2,
      a {
        color: ${e.colorText};
      }
      .rc-footer-column {
        margin-bottom: ${60*!!i}px;
        :last-child {
          margin-bottom: ${20*!!i}px;
        }
      }
      .rc-footer-item-icon {
        top: -1.5px;
      }
      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${e.marginXXL};
      }
      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${e.fontSize};
        }
      }
    `}});var tz=()=>{let e=(0,g.default)(),[t,i]=(0,m.default)(tC),{isMobile:o}=r.default.use(eG.default),{styles:a}=tE(o),{getLink:l}=e,s=r.default.useMemo(()=>{let e="cn"===i,t={title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.resources"}),items:[{title:"Ant Design X",url:e?"https://ant-design-x.antgroup.com":"https://x.ant.design",openExternal:!0},{title:"Ant Design Charts",url:e?"https://ant-design-charts.antgroup.com":"https://charts.ant.design",openExternal:!0},{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Pro Components",url:e?"https://pro-components.antdigital.dev":"https://procomponents.ant.design",openExternal:!0},{title:"Ant Design Mobile",url:e?"https://ant-design-mobile.antgroup.com/zh":"https://mobile.ant.design",openExternal:!0},{title:"Ant Design Mini",url:e?"https://ant-design-mini.antgroup.com/":"https://mini.ant.design",openExternal:!0},{title:"Ant Design Web3",url:e?"https://web3.antdigital.dev":"https://web3.ant.design",openExternal:!0},{title:"Ant Design Landing",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.landing"}),url:"https://landing.ant.design",openExternal:!0},{title:"Scaffolds",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.scaffolds"}),url:"https://scaffold.ant.design",openExternal:!0},{title:"Umi",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.umi"}),url:"https://umijs.org",openExternal:!0},{title:"dumi",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.dumi"}),url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.qiankun"}),url:"https://qiankun.umijs.org",openExternal:!0},{title:"Ant Motion",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.motion"}),url:"https://motion.ant.design",openExternal:!0},{title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.chinamirror"}),url:"https://ant-design.antgroup.com"}]},o={title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.community"}),items:[{icon:(0,n.jsx)(tn.AntDesignOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.awesome"}),url:"https://github.com/websemantics/awesome-ant-design",openExternal:!0},{icon:(0,n.jsx)(tl.default,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,n.jsx)(tu.XOutlined,{}),title:"X",url:"http://x.com/antdesignui",openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.yuque.repo"}),url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,n.jsx)(tm.default,{style:{color:"#056de8"}}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.zhihu"}),url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,n.jsx)(tm.default,{style:{color:"#056de8"}}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.zhihu.xtech"}),url:"https://www.zhihu.com/column/c_1543658574504751104",openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",width:16,height:16,alt:"seeconf logo"}),title:"SEE Conf",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.seeconf"}),url:"https://seeconf.antfin.com/",openExternal:!0}]};return e&&o.items.push({icon:(0,n.jsx)(tp.default,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.work_with_us"}),url:l("/docs/resources",{cn:"加入我们",en:"JoinUs"}),LinkComponent:e$.Link}),[t,o,{title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.help"}),items:[{icon:(0,n.jsx)(L.default,{}),title:"GitHub",url:"https://github.com/ant-design/ant-design",openExternal:!0},{icon:(0,n.jsx)(tr.default,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.change-log"}),url:l("/changelog"),LinkComponent:e$.Link},{icon:(0,n.jsx)(td.QuestionCircleOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.faq"}),url:l("/docs/react/faq"),LinkComponent:e$.Link},{icon:(0,n.jsx)(tc.default,{}),title:"For Agents",url:e?"https://ant.design/docs/react/for-agents-cn.md":"https://ant.design/docs/react/for-agents.md",openExternal:!0},{icon:(0,n.jsx)(to.BugOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.bug-report"}),url:"https://new-issue.ant.design/",openExternal:!0},{icon:(0,n.jsx)(ta.default,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.issues"}),url:"https://github.com/ant-design/ant-design/issues",openExternal:!0},{icon:(0,n.jsx)(ts.MessageOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.discussions"}),url:"https://github.com/ant-design/ant-design/discussions",openExternal:!0},{icon:(0,n.jsx)(td.QuestionCircleOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.stackoverflow"}),url:"http://stackoverflow.com/questions/tagged/antd",openExternal:!0},{icon:(0,n.jsx)(td.QuestionCircleOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.segmentfault"}),url:"https://segmentfault.com/t/antd",openExternal:!0}]},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:22,height:22,alt:"Ant XTech logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.more-product"}),items:[{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.yuque"}),url:"https://yuque.com",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.yuque.slogan"}),openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",width:16,height:16,alt:"AntV logo"}),title:"AntV",url:"https://antv.antgroup.com",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.antv.slogan"}),openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://www.eggjs.org/logo.svg",alt:"Egg logo",width:16,height:16}),title:"Egg",url:"https://eggjs.org",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.egg.slogan"}),openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",width:16,height:16,alt:"Kitchen logo"}),title:"Kitchen",description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.kitchen"}),url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*3ittT5OEo2gAAAAAAAAAAAAADvGmAQ/original",width:16,height:16,alt:"Galacean logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.galacean"}),description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.galacean.slogan"}),url:"https://galacean.antgroup.com/",openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_4qpv3u/afts/img/iH6wQKX4WCYAAAAAAAAAAAAAeocTAQFr/original",width:16,height:16,alt:"WeaveFox logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.weavefox"}),description:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.weavefox.slogan"}),url:"https://weavefox.cn/",openExternal:!0},{icon:(0,n.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:16,height:16,alt:"xtech logo"}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.xtech"}),url:"https://xtech.antfin.com/",openExternal:!0},{icon:(0,n.jsx)(ti.BgColorsOutlined,{}),title:(0,n.jsx)(ev.FormattedMessage,{id:"app.footer.theme"}),url:l("/theme-editor"),LinkComponent:e$.Link}]}]},[l,i]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(ty,{columns:s,className:a.footer,bottom:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{style:{opacity:"0.4"},children:["Made with ",(0,n.jsx)("span",{style:{color:"#fff"},children:"❤"})," by"]}),(0,n.jsx)("div",{children:t.owner})]})}),(0,n.jsx)(tS,{})]})},tM=e=>{let{children:t,title:i,desc:o}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.Helmet,{children:[(0,n.jsx)("title",{children:i}),(0,n.jsx)("meta",{property:"og:title",content:i}),o&&(0,n.jsx)("meta",{name:"description",content:o})]}),(0,n.jsx)("div",{style:{minHeight:"100vh"},children:t}),(0,n.jsx)(tz,{})]})},tN=e.i(57170),tA=e.i(974398),tT=e.i(687800),tL=()=>{let e=(0,tT.useRouteMeta)(),[t,i]=r.default.useMemo(()=>[e.frontmatter.subtitle||e.frontmatter.title?`${e.frontmatter.subtitle||""} ${e.frontmatter?.title||""} - Ant Design`:"404 Not Found - Ant Design",e.frontmatter.description||""],[e]);return(0,n.jsxs)(d.Helmet,{children:[(0,n.jsx)("title",{children:t}),(0,n.jsx)("meta",{property:"og:title",content:t}),i&&(0,n.jsx)("meta",{name:"description",content:i})]})},tD=e.i(6924),tF=e.i(566826),tI=e.i(952169),tO=e.i(469146),tB=e.i(131254);let tR=["scroll","resize"],tH=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>{let{antCls:i}=t,{boxShadowSecondary:o}=e;return{affixTabs:n`
      position: fixed;
      top: 0;
      inset-inline-end: 0;
      inset-inline-start: 0;
      z-index: 1001;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${o};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition:
        opacity ${e.motionDurationSlow},
        transform ${e.motionDurationSlow};

      ${i}-tabs {
        max-width: 1208px;
        margin: 0 auto;

        ${i}-tabs-nav {
          margin: 0;

          &::before {
            border-bottom-color: transparent;
          }

          ${i}-tabs-tab {
            padding: 21px 0;
          }
        }
      }
    `,affixTabsFixed:n`
      transform: translate3d(0, 0, 0);
      opacity: 1;
    `,span:n`
      text-transform: capitalize;
    `}});var tX=()=>{let e=r.useRef(null),t=r.useRef([]),[o,a]=r.useState(!1),[l,s]=r.useState(void 0),{styles:{affixTabs:d,affixTabsFixed:c,span:p}}=tH();function u(t){let n=document.getElementById(t);if(n){let t=n.offsetTop-e.current.offsetHeight-32;(0,tO.default)(t)}}r.useEffect(()=>{t.current=Array.from(document.querySelectorAll("h2[id]")).map(({id:e})=>e),a(!0)},[]),r.useEffect(()=>{let e=decodeURIComponent((location.hash||"").slice(1));e&&u(e)},[o]);let m=r.useMemo(()=>(0,tB.default)(function(){let{scrollY:n}=window,i=e.current.offsetHeight;for(let e=t.current.length-1;e>=0;e-=1){let o=t.current[e];if(document.getElementById(o).offsetTop-i-32<=n)return void s(o)}s(void 0)}),[]);return r.useEffect(()=>(tR.forEach(e=>{window.addEventListener(e,m)}),m(),()=>{tR.forEach(e=>{window.removeEventListener(e,m)})}),[m]),(0,n.jsx)("div",{className:(0,i.clsx)(d,l&&c),ref:e,children:(0,n.jsx)(tI.Tabs,{activeKey:l,centered:!0,size:"large",onChange:u,items:t.current.map(e=>({key:e,label:(0,n.jsx)("span",{className:p,children:e.replace(/-/g," ")})}))})})};let tP=(0,x.createStyles)(({cssVar:e,token:t,css:n},i)=>({resourcePage:n`
      footer {
        margin-top: 176px;
        .rc-footer-container {
          max-width: ${1208}px;
          margin: 0 auto;
          padding-inline-end: 0;
          padding-inline-start: 0;
        }
      }
    `,resourceContent:n`
      padding: 0 ${40}px;
      max-width: ${1208}px;
      margin: 0 auto;
      box-sizing: content-box;
      min-height: 100vh;

      @media only screen and (max-width: 767.99px) {
        & {
          article {
            padding: 0 ${24}px;
          }
          ${t.antCls}-col {
            padding-top: ${e.padding} !important;
            padding-bottom: ${e.padding} !important;
          }
        }
      }
    `,banner:n`
      padding: 0 ${40}px;
      overflow: hidden;
      ${i?"":"background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');"}
      background-size: cover;

      h1 {
        box-sizing: content-box;
        max-width: ${1208}px;
        margin: 56px auto 16px;
      }

      section {
        max-width: ${1208}px;
        margin: 0 auto 56px;
        font-weight: 200;
        font-size: ${e.fontSizeLG};
        line-height: 24px;
      }

      @media only screen and (max-width: 767.99px) {
        & {
          margin: 0 -${24}px;
          padding: 0 ${24}px;
        }
      }
    `}));var tW=({children:e})=>{let t=r.default.use(tF.DarkContext),{styles:i}=tP(t),o=(0,tT.useRouteMeta)(),l=(0,n.jsxs)(tN.Layout,{children:[(0,n.jsx)(tL,{}),(0,n.jsxs)("div",{id:"resources-page",className:i.resourcePage,children:[(0,n.jsx)(tX,{}),(0,n.jsxs)("div",{className:i.banner,children:[(0,n.jsxs)(tA.Typography.Title,{style:{fontSize:30},children:[o.frontmatter?.title,(0,n.jsx)(tD.default,{title:(0,n.jsx)(ev.FormattedMessage,{id:"app.content.edit-page"}),filename:o.frontmatter.filename})]}),(0,n.jsx)("section",{children:o.frontmatter.description})]}),(0,n.jsx)("div",{className:i.resourceContent,children:e}),(0,n.jsx)(tz,{})]})]});return t?l:(0,n.jsx)(a.ConfigProvider,{theme:{token:{colorBgLayout:"#fff"}},children:l})},t_=e.i(504909),tU=e.i(897283),tG=e.i(741214),tV=e.i(997643),tZ=e.i(564062),tq=e.i(596766),tq=tq,tK=e.i(265992),tQ=e.i(418037),L=L,tr=tr,ta=ta,tY=e.i(977892),tJ=e.i(208745),t0=e.i(360945),t1=e.i(906491),t2=e.i(809952);let t6=async e=>{let t,n=await fetch(e,{headers:{Accept:"application/vnd.github+json"}}),i=await n.json();return"number"!=typeof(t=i?.total_count)||Number.isNaN(t)?0:i.total_count},t3={revalidateOnReconnect:!0,dedupingInterval:6e4,shouldRetryOnError:!0,errorRetryCount:3};var t4=e.i(767372),t8=e.i(290265),t5=e.i(768215);let t7={cn:()=>e.A(634553).then(e=>e.default),en:()=>e.A(628139).then(e=>e.default)},t9=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>({listWrap:n`
    > li {
      line-height: 2;
    }
  `,linkRef:n`
    margin-inline-start: ${e.marginXS};
  `,bug:n`
    font-size: ${e.fontSize};
    color: #aaa;
    margin-inline-start: ${e.marginXS};
    display: inline-block;
    vertical-align: inherit;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  `,bugReasonTitle:n`
    padding: ${e.paddingXXS} ${e.paddingXS};
  `,bugReasonList:n`
    width: 100%;
    max-width: 100%;
    li {
      padding: ${e.paddingXXS} ${e.paddingXS};
      a {
        display: flex;
        align-items: center;
        gap: ${e.marginXXS};
      }
    }
  `,extraLink:n`
    font-size: ${e.fontSize};
  `,drawerContent:{position:"relative",[`> ${t.antCls}-drawer-body`]:{scrollbarWidth:"thin",scrollbarGutter:"stable"}},versionWrap:n`
    margin-bottom: 1em;
  `,versionTitle:n`
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    font-size: 20px;
    margin: 0 !important;
    padding: 0;
  `,versionTag:n`
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-inline-end: 0;
    }
  `})),ne={cn:{full:"查看完整日志",changelog:"更新日志",loading:"加载中...",empty:"暂无更新",bugList:"Bug 版本"},en:{full:"Full Changelog",changelog:"Changelog",loading:"loading...",empty:"Nothing update",bugList:"Bug Versions"}},nt=e=>{let{changelog:t=""}=e,i=r.default.useMemo(()=>{let e=[],i=!1,o=!1,r="";for(let a=0;a<t.length;a+=1){let l=t[a],s="*"===l&&"*"===t[a+1];if("`"===l||s){let t=r;i?t=(0,n.jsx)("code",{children:t},`code-${a}`):o&&(t=(0,n.jsx)("strong",{children:t},`strong-${a}`)),e.push(t),r="","`"===l?i=!i:s&&(o=!o,a+=1)}else r+=l}return e.push(r),e},[t]);return(0,n.jsx)("span",{children:i})},nn=({refs:e,contributors:t})=>{let{styles:i}=t9();return(0,n.jsxs)(n.Fragment,{children:[e?.map(e=>(0,n.jsx)(r.default.Fragment,{children:(0,n.jsxs)("a",{className:i.linkRef,href:e,target:"_blank",rel:"noopener noreferrer",children:["#",e.match(/[^/]+$/)?.[0]]},e)},e)),t?.map(e=>(0,n.jsx)(r.default.Fragment,{children:(0,n.jsxs)("a",{className:i.linkRef,href:`https://github.com/${e}`,target:"_blank",rel:"noopener noreferrer",children:["@",e]},e)},e))]})},ni=({changelogList:e})=>{let t=[],{styles:i}=t9(),o=e.length;for(let i=0;i<o;i+=1){let{refs:r,changelog:a,contributors:l}=e[i],s=e[i+1]?.changelog||"";if(i+1<o&&s.trim().startsWith("<img")){let e=new DOMParser().parseFromString(s,"text/html").querySelector("img");t.push((0,n.jsxs)("li",{children:[(0,n.jsx)(nt,{changelog:a}),(0,n.jsx)(nn,{refs:r,contributors:l}),(0,n.jsx)("br",{}),(0,n.jsx)("img",{draggable:!1,src:e?.getAttribute("src")||"",alt:e?.getAttribute("alt")||"",width:e?.getAttribute("width")||""})]},`img-${i}`)),i+=1}else t.push((0,n.jsxs)("li",{children:[(0,n.jsx)(nt,{changelog:a}),(0,n.jsx)(nn,{refs:r,contributors:l})]},`changelog-${i}`))}return(0,n.jsx)("ul",{className:i.listWrap,children:t})};var no=e=>{let{children:t}=e,[i,o]=(0,m.default)(ne),[a,l]=r.default.useState(!1),{pathname:s}=(0,g.default)(),{styles:d}=t9(),c=((e,t)=>{let{data:n,error:i,isLoading:o}=(0,eI.default)(t?`component-changelog-${t}`:null,t7[t]);if(i||o||!n)return[];let r=e.replace(/-/g,""),a=Object.keys(n).find(e=>e.toLowerCase()===r.toLowerCase());return a&&n?.[a]||[]})(s.match(/\/components\/([^/]+)/)?.[1]||"",o),p=r.default.useMemo(()=>{let e={};return c?.forEach(t=>{e[t.version]=e[t.version]||[],e[t.version].push(t)}),Object.keys(e).map(t=>{let r=e[t],a=(0,eU.matchDeprecated)(t);return{children:(0,n.jsxs)(tA.Typography,{children:[(0,n.jsxs)(t_.Flex,{className:d.versionWrap,justify:"flex-start",align:"center",gap:"middle",children:[(0,n.jsxs)(I.Button,{color:"default",className:d.versionTitle,variant:"link",href:`/changelog${"cn"===o?"-cn":""}/#${t.replace(/\./g,"").replace(/\s.*/g,"-")}`,children:[t,a.match&&(0,n.jsx)(B.Popover,{destroyOnHidden:!0,placement:"right",title:(0,n.jsx)("span",{className:d.bugReasonTitle,children:i.bugList}),content:(0,n.jsx)("ul",{className:d.bugReasonList,children:a.reason.map((e,t)=>(0,n.jsx)("li",{children:(0,n.jsxs)("a",{target:"_blank",rel:"noopener noreferrer",href:e,children:[(0,n.jsx)(to.BugOutlined,{}),e?.replace(/#.*$/,"")?.replace(/^https:\/\/github\.com\/ant-design\/ant-design\/(issues|pull)\//,"#")]})},`reason-${t}`))}),children:(0,n.jsx)(to.BugOutlined,{className:d.bug})})]}),(0,n.jsx)(t8.Tag,{className:d.versionTag,variant:"filled",color:"blue",children:r[0]?.releaseDate})]}),(0,n.jsx)(ni,{changelogList:r})]})}})},[o,c,i.bugList,d.bug,d.bugReasonList,d.bugReasonTitle,d.versionTag,d.versionTitle,d.versionWrap]);return s.startsWith("/components/")&&c&&c.length?(0,n.jsxs)(n.Fragment,{children:[(0,r.isValidElement)(t)&&(0,r.cloneElement)(t,{onClick:()=>l(!0)}),(0,n.jsx)(t4.Drawer,{destroyOnHidden:!0,className:d.drawerContent,title:i.changelog,extra:(0,n.jsx)(eV.default,{className:d.extraLink,to:`/changelog${"cn"===o?"-cn":""}`,children:i.full}),open:a,size:"large",onClose:()=>l(!1),children:(0,n.jsx)(t5.Timeline,{items:p})})]}):null},nr=({children:e})=>(0,n.jsx)(r.default.Suspense,{fallback:"...",children:(0,n.jsx)(no,{children:e})});let na={cn:{import:"使用",copy:"复制",copied:"已复制",source:"反馈",docs:"文档",edit:"编辑此页",changelog:"更新日志",design:"设计指南",version:"版本",issueNew:"提交问题",issueOpen:"待解决",copyError:"复制失败"},en:{import:"Import",copy:"Copy",copied:"Copied",source:"GitHub",docs:"Docs",edit:"Edit this page",changelog:"Changelog",design:"Design",version:"Version",issueNew:"Issue",issueOpen:"Open issues",copyError:"Copy failed"}},nl=(0,x.createStyles)(({cssVar:e,token:t})=>({code:x.css`
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    column-gap: ${e.paddingXXS};
    border-radius: ${e.borderRadiusSM};
    padding-inline: ${e.paddingXXS} !important;
    transition: all ${e.motionDurationSlow} !important;
    font-family: ${t.codeFamily};
    color: ${e.colorTextSecondary} !important;
    &:hover {
      background: ${e.controlItemBgHover};
    }
    a&:hover {
      text-decoration: underline !important;
    }
  `,icon:x.css`
    margin-inline-end: 4px;
  `}));var ns=e=>{let{component:t,source:i,filename:o,llmsPath:a,version:s,designUrl:d,searchTitleKeywords:c,repo:p,showImport:u=!0,showEdit:g=!0,showChangelog:h=!0}=e,{token:x}=l.theme.useToken(),[f,b]=(0,m.default)(na),w="cn"===b,{styles:v}=nl(),[y,$,j]=r.default.useMemo(()=>{if("true"===String(i)&&t){let e=(0,t2.default)(t);return[`https://github.com/${p}/blob/master/components/${e}`,`components/${e}`,`https://ant.design/components/${e}${w?"-cn":""}.md`]}return"string"!=typeof i?[null,null,null]:[i,i,null]},[t,p,i,w]),k=a??j,S=g&&o||d||k||h,{issueCount:C,issueCountLoading:E,issueNewUrl:z,issueSearchUrl:M}=(e=>{let{repo:t,enabled:n=!0,proxyEndpoint:i,titleKeywords:o}=e,a=(0,r.useMemo)(()=>{let e=(o||[]).filter(Boolean).map(encodeURIComponent),n=e.length>0?e.join("%20OR%20"):"",i=n?`in:title+(${n})`:"in:title",r=`repo:${t}+is:issue+is:open+${i}`;return`https://api.github.com/search/issues?q=${r}`},[t,o]),{data:l,error:s,isLoading:d}=(0,eI.default)((n?i||a:null)||null,t6,t3);return{issueCount:l,issueCountError:s,issueCountLoading:d,issueNewUrl:`https://github.com/${t}/issues/new/choose`,issueSearchUrl:(0,r.useMemo)(()=>{let e=(o||[]).filter(Boolean).map(String),n=e.length>0?`(${e.map(e=>`is:issue in:title ${e}`).join(" OR ")})`:"",i=`is:open ${n}`.trim();return`https://github.com/${t}/issues?q=${encodeURIComponent(i)}`},[t,o])}})({repo:p,enabled:!!y,titleKeywords:c}),[N,A]=r.default.useState(!1),T="Icon"===t?"import { AntDesignOutlined } from '@ant-design/icons';":t?`import { ${"Notification"===t||"Message"===t?t.toLowerCase():t} } from 'antd';`:"",D=async()=>{await (0,t1.default)(T),A(!0)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(tJ.Descriptions,{size:"small",colon:!1,column:1,style:{marginTop:x.margin},styles:{label:{paddingInlineEnd:x.padding,width:56}},items:[u&&t&&{label:f.import,children:(0,n.jsx)(X.Tooltip,{placement:"right",title:N?f.copied:f.copy,onOpenChange:e=>{e&&A(!1)},children:(0,n.jsx)(tA.Typography.Text,{className:v.code,style:{cursor:"pointer"},onClick:D,children:T})})},y&&{label:f.source,children:(0,n.jsxs)(t_.Flex,{justify:"flex-start",align:"center",gap:"small",children:[(0,n.jsxs)(tA.Typography.Link,{className:v.code,href:y,target:"_blank",children:[(0,n.jsx)(L.default,{className:v.icon}),(0,n.jsx)("span",{children:$})]}),(0,n.jsxs)(tA.Typography.Link,{className:v.code,href:z,target:"_blank",children:[(0,n.jsx)(to.BugOutlined,{className:v.icon}),(0,n.jsx)("span",{children:f.issueNew})]}),(0,n.jsxs)(tA.Typography.Link,{className:v.code,href:M,target:"_blank",children:[(0,n.jsx)(ta.default,{className:v.icon}),(0,n.jsxs)("span",{children:[f.issueOpen," ",E?(0,n.jsx)(tY.LoadingOutlined,{}):C]})]})]})},S&&{label:f.docs,children:(0,n.jsxs)(t_.Flex,{justify:"flex-start",align:"center",gap:"small",children:[g&&o&&(0,n.jsxs)(tA.Typography.Link,{className:v.code,href:`https://github.com/${p}/edit/master/${o}`,target:"_blank",children:[(0,n.jsx)(tK.EditOutlined,{className:v.icon}),(0,n.jsx)("span",{children:f.edit})]}),d&&(0,n.jsxs)(eV.default,{className:v.code,to:d,children:[(0,n.jsx)(tq.default,{className:v.icon}),(0,n.jsx)("span",{children:f.design})]}),k&&(0,n.jsxs)(tA.Typography.Link,{className:v.code,href:k,target:"_blank",rel:"noopener noreferrer",children:[(0,n.jsx)(tQ.FileTextOutlined,{className:v.icon}),(0,n.jsx)("span",{children:"LLMs.md"})]}),h&&(0,n.jsx)(nr,{children:(0,n.jsxs)(tA.Typography.Link,{className:v.code,children:[(0,n.jsx)(tr.default,{className:v.icon}),(0,n.jsx)("span",{children:f.changelog})]})})]})},s&&/^\d+\.\d+\.\d+$/.test(s)&&{label:f.version,children:(0,n.jsx)(tA.Typography.Text,{className:v.code,children:w?`自 ${s} 起支持`:`supported since ${s}`})}].filter(Boolean)}),(0,n.jsx)(t0.Divider,{})]})},nd=e.i(632311),nc=e.i(686111),np=e.i(340242);let nu={cn:{deprecated:"废弃",updated:"更新",new:"新增"},en:{deprecated:"DEPRECATED",updated:"UPDATED",new:"NEW"}},nm=(0,x.createStaticStyles)(({css:e,cssVar:t})=>({link:e`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,tag:e`
    margin-inline-end: 0;
  `,subtitle:e`
    font-weight: normal;
    font-size: ${t.fontSizeSM};
    opacity: 0.8;
    margin-inline-start: ${t.marginSM};
  `})),ng=e=>{let{before:t,after:o,link:r,title:a,subtitle:l,search:s,tag:d,className:c}=e,[p]=(0,m.default)(nu);if(!t&&!o){let e;return(0,n.jsxs)(eV.default,{to:`${r}${s}`,className:(0,i.clsx)(c,{[nm.link]:d}),children:[(0,n.jsxs)(t_.Flex,{justify:"flex-start",align:"center",children:[a&&(0,n.jsx)("span",{children:a}),l&&(0,n.jsx)("span",{className:nm.subtitle,children:l})]}),d&&(0,n.jsx)(t8.Tag,{variant:"filled",className:(0,i.clsx)(nm.tag),color:(e=>{switch(e?.toUpperCase()){case"UPDATED":return"processing";case"DEPRECATED":return"red";default:return"success"}})(d),children:p[(e=d.replace(/VERSION/i,np.version)).toLowerCase()]??e})]})}return(0,n.jsxs)(eV.default,{to:`${r}${s}`,className:c,children:[t,a,l&&(0,n.jsx)("span",{className:nm.subtitle,children:l}),o]})};var nh=(e={})=>{let t=(0,eQ.useFullSidebarData)(),{pathname:i,search:o}=(0,g.default)(),a=(0,eQ.useSidebarData)(),{before:l,after:s}=e;return[(0,r.useMemo)(()=>{let e=[...a??[]];if(i.startsWith("/docs/spec")){let t=e.splice(0,1);e.push(...t)}if(i.startsWith("/docs/react")){let n=Object.entries(t).find(([e])=>e.startsWith("/changelog"))?.[1];n&&e.splice(1,0,n[0])}if(i.startsWith("/changelog")){let n=Object.entries(t).find(([e])=>e.startsWith("/docs/react"))?.[1];n&&(e.unshift(n[0]),e.push(...n.slice(1)))}return e?.reduce((e,t)=>{if(t?.title)if(i.startsWith("/docs/spec")){let i=t.children.reduce((e,t)=>{let n=t.frontmatter?.type??"default";return e[n]||(e[n]=[]),e[n].push(t),e},{}),r=[];r.push(...i.default?.map(e=>({label:(0,n.jsxs)(eV.default,{to:`${e.link}${o}`,children:[l,e?.title,s]}),key:e.link.replace(/(-cn$)/g,"")}))??[]),Object.entries(i).forEach(([e,t])=>{"default"!==e&&r.push({type:"group",label:e,key:e,children:t?.map(e=>({label:(0,n.jsxs)(eV.default,{to:`${e.link}${o}`,children:[l,e?.title,s]}),key:e.link.replace(/(-cn$)/g,"")}))})}),e.push({label:t?.title,key:t?.title,children:r})}else e.push({type:"group",label:t?.title,key:t?.title,children:t.children?.map(e=>({label:(0,n.jsx)(ng,{before:l,after:s,link:e.link,title:e?.title,subtitle:e.frontmatter?.subtitle,search:o,tag:e.frontmatter?.tag}),key:e.link.replace(/(-cn$)/g,"")}))});else{let i=t.children||[];i.every(e=>e?.frontmatter?.date)&&i.sort((e,t)=>e.frontmatter?.date>t.frontmatter?.date?-1:1),e.push(...i.map(e=>({label:(0,n.jsx)(ng,{before:l,after:s,link:e.link,title:e?.title,search:o,tag:e.frontmatter?.tag}),key:e.link.replace(/(-cn$)/g,"")})))}return e},[])??[]},[a,i,t,o,l,s]),i]};let nx=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>{let{iconCls:i}=t,{colorSplit:o,fontSizeIcon:r}=e;return{prevNextNav:n`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: ${e.fontSize};
      border-top: ${e.lineWidth} ${e.lineType} ${o};
      display: flex;
    `,pageNav:n`
      flex: 1;
      height: 72px;
      line-height: 72px;
      text-decoration: none;

      ${i} {
        color: #999;
        font-size: ${r};
        transition: all ${e.motionDurationSlow};
      }

      .chinese {
        margin-inline-start: ${e.marginXXS};
      }
    `,prevNav:n`
      text-align: start;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .footer-nav-icon-after {
        display: none;
      }

      .footer-nav-icon-before {
        position: relative;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-end ${e.motionDurationSlow};
        margin-inline-end: 1em;
        inset-inline-end: 0;
      }

      &:hover .footer-nav-icon-before {
        inset-inline-end: 0.2em;
      }
    `,nextNav:n`
      text-align: end;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .footer-nav-icon-before {
        display: none;
      }

      .footer-nav-icon-after {
        position: relative;
        margin-bottom: 1px;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-start ${e.motionDurationSlow};
        margin-inline-start: 1em;
        inset-inline-start: 0;
      }

      &:hover .footer-nav-icon-after {
        inset-inline-start: 0.2em;
      }
    `}}),nf=e=>Array.isArray(e)?e.reduce((e,t)=>t?"children"in t&&t.children?e.concat(nf(t.children)??[]):e.concat(t):e,[]):null;var nb=({rtl:e})=>{let{styles:t}=nx(),o={className:"footer-nav-icon-before"},a={className:"footer-nav-icon-after"},[l,s]=nh({before:e?(0,n.jsx)(nc.RightOutlined,{...o}):(0,n.jsx)(nd.LeftOutlined,{...o}),after:e?(0,n.jsx)(nd.LeftOutlined,{...a}):(0,n.jsx)(nc.RightOutlined,{...a})}),{isMobile:d}=r.default.use(eG.default),[c,p]=(0,r.useMemo)(()=>{let e=nf(l);if(!e)return[null,null];let t=-1;return e.forEach((e,n)=>{e&&e.key===s&&(t=n)}),[e[t-1],e[t+1]]},[l,s]);return d?null:(0,n.jsxs)("section",{className:t.prevNextNav,children:[c&&r.default.cloneElement(c.label,{className:(0,i.clsx)(t.pageNav,t.prevNav,c.className)}),p&&r.default.cloneElement(p.label,{className:(0,i.clsx)(t.pageNav,t.nextNav,p.className)})]})},nw=e.i(926602),nv=e.i(58997),nv=nv,tm=tm,ny=e.i(122381),n$=e=>(0,n.jsxs)("svg",{width:"36",height:"28",viewBox:"0 0 36 28",fill:"currentColor",...e,children:[(0,n.jsx)("title",{children:"Juejin logo"}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z",fill:"currentColor"})]});let nj="https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b",nk=(0,x.createStaticStyles)(({cssVar:e,css:t})=>({card:t`
    width: 100%;
    margin: calc(${e.marginMD} * 2) 0;
    transition: all ${e.motionDurationMid};
    background-color: ${e.colorFillQuaternary};
  `,bigTitle:t`
    color: #121212;
    font-size: ${e.fontSizeLG};
    margin-bottom: ${e.marginLG};
    font-weight: ${e.fontWeightStrong};
  `,cardBody:t`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,leftCard:t`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 200px;
      overflow: hidden;
      margin-inline-end: ${e.marginLG};
      border-radius: ${e.borderRadiusLG};
    }
  `,title:t`
    color: #444;
    font-size: ${e.fontSizeLG};
    font-weight: ${e.fontWeightStrong};
    user-select: none;
  `,subTitle:t`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #646464;
    font-size: ${e.fontSize};
    font-weight: 400;
    margin-top: ${e.marginXS};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,logo:t`
    width: 24px;
    height: 24px;
    font-size: 24px;
    &.zhihu-logo {
      color: #056de8;
    }
    &.yuque-logo {
      color: #00b96b;
    }
    &.juejin-logo {
      color: #1e80ff;
    }
  `,arrowIcon:t`
    color: #8a8f8d;
    margin: 0 ${e.marginXS};
    font-size: ${e.fontSizeSM};
  `,zlBtn:t`
    padding: 0;
    color: #646464;
  `,discussLogo:t`
    width: 16px;
    height: 16px;
    font-size: 16px;
  `})),nS={cn:{bigTitle:"文章被以下专栏收录：",zhiHu:"一个 UI 设计体系",yuQue:"Ant Design 官方专栏",junjin:"Ant Design 开源专栏",buttonText:"我有想法，去参与讨论"},en:{bigTitle:"Articles are included in the column:",zhiHu:"A UI design system",yuQue:"Ant Design official column",junjin:"Ant Design Open Source Column",buttonText:"Go to discuss"}};var nC=({zhihuLink:e,yuqueLink:t,juejinLink:o})=>{let[r]=(0,m.default)(nS),{card:a,bigTitle:l,cardBody:s,leftCard:d,title:c,subTitle:p,logo:u,arrowIcon:g,zlBtn:h,discussLogo:x}=nk;return e||t||o?(0,n.jsxs)(ny.Card,{className:a,variant:"borderless",children:[(0,n.jsx)("h3",{className:l,children:r.bigTitle}),e&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t0.Divider,{}),(0,n.jsxs)("div",{className:s,children:[(0,n.jsxs)("div",{className:d,children:[(0,n.jsx)("img",{draggable:!1,src:nj,alt:"antd"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:c,children:"Ant Design"}),(0,n.jsxs)("div",{className:p,children:[(0,n.jsx)(tm.default,{className:(0,i.clsx)(u,"zhihu-logo")}),(0,n.jsx)(nc.RightOutlined,{className:g}),(0,n.jsx)(I.Button,{target:"_blank",href:"https://www.zhihu.com/column/c_1564262000561106944",className:h,type:"link",children:r.zhiHu})]})]})]}),(0,n.jsx)(I.Button,{ghost:!0,type:"primary",icon:(0,n.jsx)(tm.default,{className:x}),target:"_blank",href:e,children:r.buttonText})]})]}),t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t0.Divider,{}),(0,n.jsxs)("div",{className:s,children:[(0,n.jsxs)("div",{className:d,children:[(0,n.jsx)("img",{draggable:!1,src:nj,alt:"antd"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:c,children:"Ant Design"}),(0,n.jsxs)("div",{className:p,children:[(0,n.jsx)(nv.default,{className:(0,i.clsx)(u,"yuque-logo")}),(0,n.jsx)(nc.RightOutlined,{className:g}),(0,n.jsx)(I.Button,{target:"_blank",href:"https://www.yuque.com/ant-design/ant-design",className:h,type:"link",children:r.yuQue})]})]})]}),(0,n.jsx)(I.Button,{ghost:!0,type:"primary",icon:(0,n.jsx)(nv.default,{className:x}),target:"_blank",href:t,children:r.buttonText})]})]}),o&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t0.Divider,{}),(0,n.jsxs)("div",{className:s,children:[(0,n.jsxs)("div",{className:d,children:[(0,n.jsx)("img",{draggable:!1,src:nj,alt:"antd"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:c,children:"Ant Design"}),(0,n.jsxs)("div",{className:p,children:[(0,n.jsx)(n$,{className:(0,i.clsx)(u,"juejin-logo")}),(0,n.jsx)(nc.RightOutlined,{className:g}),(0,n.jsx)(I.Button,{target:"_blank",href:"https://juejin.cn/column/7247354308258054200",className:h,type:"link",children:r.junjin})]})]})]}),(0,n.jsx)(I.Button,{ghost:!0,type:"primary",icon:(0,n.jsx)(n$,{className:x}),target:"_blank",href:o,children:r.buttonText})]})]})]}):null},nE=e.i(528147),nz=e=>{let{item:{username:t,url:i}={}}=e;return t&&i?(0,n.jsx)(X.Tooltip,{destroyOnHidden:!0,title:t,children:(0,n.jsx)("li",{children:(0,n.jsx)("a",{href:`https://github.com/${t}`,target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(nE.Avatar,{size:"small",src:i,alt:t,children:t})})})}):null};let nM=(0,x.createStaticStyles)(({cssVar:e,css:t})=>({listMobile:t`
    margin: 1em 0 !important;
  `,title:t`
    font-size: ${e.fontSizeSM};
    opacity: 0.5;
    margin-bottom: ${e.marginXS};
  `,list:t`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${e.motionDurationSlow};
      margin-inline-end: calc(-1 * ${e.marginXS});
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `})),nN=(...e)=>fetch(...e).then(e=>e.json()),nA=[[/^components\/([^/]+)\/index\.(zh-CN|en-US)\.md$/,"components"],[/^docs\/blog\/(.+)\.(zh-CN|en-US)\.md$/,"blog"],[/^docs\/react\/(.+)\.(zh-CN|en-US)\.md$/,"react"],[/^docs\/spec\/(.+)\.(zh-CN|en-US)\.md$/,"spec"]],nT={errorRetryCount:3},nL=({filename:e})=>{let{formatMessage:t}=(0,eM.useIntl)(),{isMobile:o}=r.default.use(eG.default),a=function(e){for(let[t,n]of nA){let i=e?.match(t);if(i){let[,e]=i;return`${n}/${e}`}}return null}(e),{data:l,error:s,isLoading:d}=(0,eI.default)(a?"/contributors.json":null,nN,nT);if(s)return console.error("Failed to fetch contributors data:",s),null;if(!a||!l||d)return null;let[c,...p]=a.split("/"),u=p.join("/"),m=l[c]?.[u]??[];if(!m.length)return null;let g=m.map(e=>{let t=l.logins[e];return{username:t,url:`https://github.com/${t}.png?size=24`}});return(0,n.jsxs)("div",{className:(0,i.clsx)({[nM.listMobile]:o}),children:[(0,n.jsx)("div",{className:nM.title,children:t({id:"app.content.contributors"})}),(0,n.jsx)("ul",{className:nM.list,children:g.map(e=>(0,n.jsx)(nz,{item:e},e.username))})]})};var nD=e=>(0,n.jsx)(r.Suspense,{fallback:null,children:(0,n.jsx)(nL,{...e})}),nF=e.i(398829),nI=e.i(628309);let nO=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>{let{antCls:i}=t;return{anchorToc:n`
      scrollbar-width: thin;
      scrollbar-gutter: stable;
      ${i}-anchor {
        ${i}-anchor-link-title {
          font-size: ${e.fontSizeSM};
        }
      }
    `,tocWrapper:n`
      position: fixed;
      top: calc(${t.headerHeight}px + ${e.marginXL} - 4px);
      inset-inline-end: 0;
      width: 148px;
      padding: 0;
      border-radius: ${e.borderRadius};
      box-sizing: border-box;
      margin-inline-end: calc(8px - 100vw + 100%);
      z-index: 10;
      .toc-debug {
        color: ${e.purple6};
        &:hover {
          color: ${e.purple5};
        }
      }
      > div {
        box-sizing: border-box;
        width: 100%;
        max-height: calc(100vh - ${t.headerHeight}px - ${e.marginXL} - 24px) !important;
        margin: auto;
        overflow: auto;
        padding: ${e.paddingXXS};
        backdrop-filter: blur(8px);
      }

      @media only screen and (max-width: ${e.screenLG}) {
        display: none;
      }
    `,articleWrapper:n`
      padding-inline: 48px 164px;
      padding-block: 0 32px;

      @media only screen and (max-width: ${e.screenLG}) {
        & {
          padding: 0 calc(${e.paddingLG} * 2);
        }
      }
    `}});var nB=({showDebug:e,debugDemos:t=[]})=>{let{styles:o}=nO(),a=(0,x.useTheme)(),l=(0,tT.useRouteMeta)(),s=(0,nI.useTabMeta)(),d=r.default.useMemo(()=>(s?.toc||l.toc).reduce((e,t)=>{if(2===t.depth)e.push({...t});else if(3===t.depth){let n=e[e.length-1];n&&(n.children=n.children||[],n.children.push({...t}))}return e},[]),[s?.toc,l.toc]);return l.frontmatter.toc?(0,n.jsx)("section",{className:o.tocWrapper,children:(0,n.jsx)(nF.Anchor,{affix:!1,className:o.anchorToc,targetOffset:a.anchorTop,showInkInFixed:!0,items:d.map(o=>({href:`#${o.id}`,title:o.title,key:o.id,children:o.children?.filter(n=>e||!t.includes(n.id)).map(e=>({key:e.id,href:`#${e.id}`,title:(0,n.jsx)("span",{className:(0,i.clsx)({"toc-debug":t.includes(e.id)}),children:e?.title})}))}))})}):null},nR=e.i(342458);let nH=({name:e,avatar:t})=>{let[i,o]=(0,r.useState)(!0),[a,l]=(0,r.useState)(!1);return((0,r.useLayoutEffect)(()=>{let e=new Image;e.src=t,e.onload=()=>o(!1),e.onerror=()=>l(!0)},[t]),a)?null:i?(0,n.jsx)(tG.Skeleton.Avatar,{size:"small",active:!0}):(0,n.jsx)(nE.Avatar,{size:"small",src:t,alt:e,children:e})};var nX=()=>{let e=(0,tT.useRouteMeta)(),{author:t}=e.frontmatter,i=(0,r.useMemo)(()=>t?"string"==typeof t?t.split(",").map(e=>({name:e,avatar:`https://github.com/${e}.png`})):Array.isArray(t)?t:[]:[],[t]);return e.frontmatter.date||e.frontmatter.author?(0,n.jsx)(tA.Typography.Paragraph,{children:(0,n.jsxs)(t_.Flex,{gap:"small",children:[e.frontmatter.date&&(0,n.jsxs)("span",{style:{opacity:.65},children:[(0,n.jsx)(nR.CalendarOutlined,{})," ",(0,o.default)(e.frontmatter.date).format("YYYY-MM-DD")]}),i.map(e=>(0,n.jsx)("a",{href:`https://github.com/${e.name}`,target:"_blank",rel:"noopener noreferrer",children:(0,n.jsxs)(t_.Flex,{gap:4,children:[(0,n.jsx)(nH,{name:e.name,avatar:e.avatar}),(0,n.jsxs)("span",{style:{opacity:.65},children:["@",e.name]})]})},e.name))]})}):null};let nP=({num:e=6})=>Array.from({length:e}).map((e,t)=>(0,n.jsx)(tG.Skeleton.Avatar,{size:"small",active:!0,style:{marginInlineStart:0===t?0:-8}},t));var nW=({children:e,className:t})=>{let o=(0,tT.useRouteMeta)(),a=(0,c.useLocation)(),{pathname:l,hash:s}=(0,g.default)(),{direction:d}=r.default.use(eG.default),{styles:p}=nO(),[u,m]=(0,tZ.default)(!1),[h,x]=(0,r.useState)("tsx"),f=(0,r.useMemo)(()=>o.toc?.filter(e=>e._debug_demo).map(e=>e.id)||[],[o]),b=f.includes(s.slice(1));(0,r.useLayoutEffect)(()=>{m(b)},[b]);let w=(0,r.useMemo)(()=>({showDebug:u,setShowDebug:m,codeType:h,setCodeType:x}),[u,h]),v="rtl"===d,y=!l.startsWith("/components/")&&o.frontmatter?.filename?`${a.pathname.replace(/\/$/,"")||"/index"}.md`:void 0,$="Components"===o.frontmatter.category&&"false"!==String(o.frontmatter.showImport),j="Components"!==o.frontmatter.category&&y,k=!l.startsWith("/components/overview")&&!$&&!j;return(0,n.jsx)(nw.default,{value:w,children:(0,n.jsxs)(O.Col,{xxl:20,xl:19,lg:18,md:18,sm:24,xs:24,className:t,children:[(0,n.jsx)(nB,{showDebug:u,debugDemos:f}),(0,n.jsxs)("article",{className:(0,i.clsx)(p.articleWrapper,{rtl:v}),children:[o.frontmatter?.title?(0,n.jsx)(t_.Flex,{justify:"space-between",children:(0,n.jsx)(tA.Typography.Title,{style:{fontSize:32,position:"relative"},children:(0,n.jsxs)(tV.Space,{children:[(0,n.jsx)("span",{children:o.frontmatter?.title}),(0,n.jsx)("span",{children:o.frontmatter?.subtitle}),k&&(0,n.jsx)(tD.default,{title:(0,n.jsx)(ev.FormattedMessage,{id:"app.content.edit-page"}),filename:o.frontmatter.filename})]})})}):null,(0,n.jsx)(nX,{}),!o.frontmatter.__autoDescription&&o.frontmatter.description,$&&(0,n.jsx)(ns,{source:!0,component:o.frontmatter.title,filename:o.frontmatter.filename,version:o.frontmatter.tag,designUrl:o.frontmatter.designUrl,searchTitleKeywords:[o.frontmatter.title,o.frontmatter.subtitle].filter(Boolean),repo:"ant-design/ant-design"}),j&&(0,n.jsx)(ns,{filename:o.frontmatter.filename,llmsPath:y,repo:"ant-design/ant-design",showChangelog:!1,showImport:!1}),(0,n.jsxs)("div",{style:{minHeight:"calc(100vh - 64px)"},children:[e,(0,n.jsx)(tU.FloatButton.BackTop,{})]}),(0,n.jsx)(nC,{zhihuLink:o.frontmatter.zhihu_url,yuqueLink:o.frontmatter.yuque_url,juejinLink:o.frontmatter.juejin_url}),(0,n.jsx)("div",{style:{marginTop:120},children:(0,n.jsx)(r.Suspense,{fallback:(0,n.jsx)(nP,{}),children:(0,n.jsx)(nD,{filename:o.frontmatter.filename})})})]}),(0,n.jsx)(nb,{rtl:v}),(0,n.jsx)(tz,{})]})})},n_=e.i(11523);let nU=(0,x.createStyles)(({cssVar:e,token:t,css:n})=>({asideContainer:n`
      min-height: 100%;
      padding-top: 0;
      padding-bottom: ${e.marginXXL} !important;
      font-family: Avenir, ${e.fontFamily}, sans-serif;
      padding-inline: ${e.paddingXXS};

      &${t.antCls}-menu-inline {
        ${t.antCls}-menu-submenu-title h4,
        > ${t.antCls}-menu-item,
        ${t.antCls}-menu-item a {
          overflow: hidden;
          font-size: ${e.fontSize};
          text-overflow: ellipsis;
        }

        > ${t.antCls}-menu-item-group > ${t.antCls}-menu-item-group-title {
          margin-top: ${e.margin};
          margin-bottom: ${e.margin};
          font-size: ${e.fontSize};

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${e.colorSplit};
            content: '';
          }
        }

        > ${t.antCls}-menu-item,
          > ${t.antCls}-menu-submenu
          > ${t.antCls}-menu-submenu-title,
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-title,
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-list
          > ${t.antCls}-menu-item,
          &${t.antCls}-menu-inline
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-list
          > ${t.antCls}-menu-item {
          padding-inline: 36px 12px !important;
        }

        // Nest Category > Type > Article
        &${t.antCls}-menu-inline {
          ${t.antCls}-menu-item-group-title {
            margin-inline-start: ${e.marginXXS};
            padding-inline-start: 60px;

            ${t.antCls}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${e.padding};
            }
          }

          ${t.antCls}-menu-item-group-list > ${t.antCls}-menu-item {
            padding-inline-start: 80px !important;

            ${t.antCls}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${e.padding} !important;
            }
          }
        }

        ${t.antCls}-menu-item-group:first-child {
          ${t.antCls}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }
    `,mainMenu:n`
      z-index: 1;
      position: sticky;
      top: ${t.headerHeight}px;
      width: 100%;
      max-height: calc(100vh - ${t.headerHeight}px);
      overflow: hidden;
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      &:hover {
        overflow-y: auto;
      }
    `}));var nG=()=>{let e=(0,eQ.useSidebarData)(),{isMobile:t,isDark:i}=r.default.use(eG.default),{styles:o}=nU(),[l,s]=nh(),{colorBgContainer:d}=(0,x.useTheme)(),c=e?.map(({title:e})=>e).filter(Boolean)||[],[p,u]=r.default.useState(c);(0,r.useEffect)(()=>{p.join(",")!==c.join(",")&&u(c)},[c.join(",")]);let m=(0,n.jsx)(a.ConfigProvider,{theme:{components:{Menu:{itemBg:d,darkItemBg:d}}},children:(0,n.jsx)(eK.Menu,{items:l,inlineIndent:30,className:o.asideContainer,mode:"inline",theme:i?"dark":"light",selectedKeys:[s],openKeys:p,onOpenChange:u})});return t?(0,n.jsx)(n_.default,{children:m},"Mobile-menu"):(0,n.jsx)(O.Col,{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24,className:o.mainMenu,children:m})};let nV=(0,x.createStaticStyles)(({css:e,cssVar:t})=>({main:e`
    display: flex;
    margin-top: ${t.marginXL};
  `}));var nZ=({children:e})=>{let[t]=(0,p.useSearchParams)(),i="false"===t.get("layout");return(0,n.jsxs)("main",{className:nV.main,children:[(0,n.jsx)(tL,{}),!i&&(0,n.jsx)(nG,{}),(0,n.jsx)(nW,{children:e})]})},nq=e.i(222424);e.i(245420),e.i(795073),e.i(580372),e.i(309930),e.i(80157);var nK=e.i(979085),nQ=e.i(445682),nY=e.i(611282);let nJ=[{value:"\n  ",paraId:0},{value:"After extensive refinement, v6 is officially released! This upgrade focuses on deep technical optimizations for better performance and developer experience:",paraId:1},{value:"Technical Upgrades",paraId:2},{value:": Minimum React 18 support; defaults to Pure CSS Variables mode, supporting zero-runtime styles and real-time theme switching.",paraId:2},{value:"Semantic Structure",paraId:2},{value:": All components now feature semantic DOM structure, enabling flexible customization via ",paraId:2},{value:"classNames",paraId:2},{value:".",paraId:2},{value:"New Features",paraId:2},{value:": Added Masonry component; Tooltip panning; InputNumber spinner mode; Resizable Drawer; default blur mask for overlays.",paraId:2},{value:"Smooth Migration",paraId:2},{value:": Direct upgrade from v5 without codemod tools. For v5 documentation, please visit ",paraId:2},{value:"5x.ant.design",paraId:2},{value:".",paraId:2},{value:"Ant Design X 2.0",paraId:3},{value:" for AI scenarios is also released simultaneously. Explore now!",paraId:3}],n0=[{value:"\n  ",paraId:0},{value:"经过大量打磨，v6 版本现已正式发布！本次升级专注于技术深度优化，带来更佳的性能与开发体验：",paraId:1},{value:"技术升级",paraId:2},{value:"：最低支持 React 18，移除历史包袱；默认启用纯 CSS 变量模式，支持零运行时样式与实时主题切换。",paraId:2},{value:"语义化结构",paraId:2},{value:"：全量组件完成 DOM 语义化改造，配合 ",paraId:2},{value:"classNames",paraId:2},{value:" 属性实现更灵活的样式定制。",paraId:2},{value:"新特性",paraId:2},{value:"：新增 Masonry 瀑布流组件；Tooltip 支持平移；InputNumber 新增按钮模式；Drawer 支持拖拽；弹层默认开启模糊背景。",paraId:2},{value:"平滑迁移",paraId:2},{value:"：v5 项目可直接升级，无需 codemod 工具。如需查看 v5 文档，请访问 ",paraId:2},{value:"5x.ant.design",paraId:2},{value:"。",paraId:2},{value:"同时，面向 AI 场景的 ",paraId:3},{value:"Ant Design X 2.0",paraId:3},{value:" 也同步发布，欢迎探索！",paraId:3}],n1={cn:function(){return(0,n.jsx)(nY.DumiPage,{children:(0,n.jsx)(r.Suspense,{fallback:(0,n.jsx)(nQ.default,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsxs)("p",{align:"center",children:[n0[0].value,(0,n.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*_DMIQaxDuXsAAAAAgDAAAAgAegCCAQ/fmt.webp",alt:"Ant Design 6.0"})]}),(0,n.jsx)("p",{children:n0[1].value}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:n0[2].value}),n0[3].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:n0[4].value}),n0[5].value,(0,n.jsx)("code",{children:n0[6].value}),n0[7].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:n0[8].value}),n0[9].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:n0[10].value}),n0[11].value,(0,n.jsx)(nK.default,{href:"https://5x.ant.design",sourceType:"a",children:n0[12].value}),n0[13].value]})]}),(0,n.jsxs)("p",{children:[n0[14].value,(0,n.jsx)("strong",{children:(0,n.jsx)(nK.default,{href:"https://github.com/ant-design/x/issues/1358",sourceType:"a",children:n0[15].value})}),n0[16].value]})]})})})})},en:function(){return(0,n.jsx)(nY.DumiPage,{children:(0,n.jsx)(r.Suspense,{fallback:(0,n.jsx)(nQ.default,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsxs)("p",{align:"center",children:[nJ[0].value,(0,n.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*_DMIQaxDuXsAAAAAgDAAAAgAegCCAQ/fmt.webp",alt:"Ant Design 6.0"})]}),(0,n.jsx)("p",{children:nJ[1].value}),(0,n.jsxs)("ul",{children:[(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:nJ[2].value}),nJ[3].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:nJ[4].value}),nJ[5].value,(0,n.jsx)("code",{children:nJ[6].value}),nJ[7].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:nJ[8].value}),nJ[9].value]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("strong",{children:nJ[10].value}),nJ[11].value,(0,n.jsx)(nK.default,{href:"https://5x.ant.design",sourceType:"a",children:nJ[12].value}),nJ[13].value]})]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("strong",{children:(0,n.jsx)(nK.default,{href:"https://github.com/ant-design/x/issues/1357",sourceType:"a",children:nJ[14].value})}),nJ[15].value]})]})})})})}},n2=(0,x.createStaticStyles)(({css:e})=>({container:e`
    max-height: max(62vh, 500px);
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #eaeaea transparent;
    /* 图片铺满 */
    && img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `}));var n6=()=>{let[,e]=(0,m.default)(),t=Object.keys(n1).includes(e)?e:"en",i=n1[t];return(0,n.jsx)("div",{className:n2.container,children:(0,n.jsx)(i,{})})};let[n3]=np.version.split("."),n4=`antd${n3}-version-upgrade-notify`,n8=new Date("2026/02/01").getTime(),n5={cn:{title:"Ant Design 6.0 现已发布  🎉",releasePost:"发布公告 🚀",fullChangelog:"完整更新日志 📝"},en:{title:"Ant Design 6.0 has been released  🎉",releasePost:"Release Post 🚀",fullChangelog:"Full Changelog 📝"}};var n7=()=>{let[e,t]=(0,m.default)(n5),{pathname:i}=(0,c.useLocation)(),[o,a]=r.default.useState(!1),l="cn"===t||eU.isZhCN(i);function s(){localStorage.setItem(n4,Date.now().toString()),a(!1)}r.default.useEffect(()=>{let e=localStorage.getItem(n4);if(!(Date.now()>n8)&&!e){let e=setTimeout(()=>{a(!0)},1e3);return()=>{clearTimeout(e)}}},[]);let d=eU.getLocalizedPathname("/changelog",l).pathname,p=`https://github.com/ant-design/ant-design/issues/${l?"55805":"55804"}`;return(0,n.jsx)(nq.Modal,{title:e.title,open:o,width:"min(90vw, 800px)",centered:!0,onCancel:s,styles:{body:{padding:0}},footer:()=>(0,n.jsxs)(t_.Flex,{align:"center",gap:"middle",justify:"flex-end",children:[(0,n.jsx)(I.Button,{href:d,onClick:s,children:e.fullChangelog}),(0,n.jsx)(I.Button,{color:"primary",variant:"solid",href:p,target:"_blank",onClick:s,children:e.releasePost})]}),children:(0,n.jsx)(n6,{})})};let n9={cn:{title:"Ant Design - 一套企业级 UI 设计语言和 React 组件库",description:"基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。"},en:{title:"Ant Design - The world's second most popular React UI framework",description:"An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises"}};e.s(["default",0,()=>{let e=(0,c.useOutlet)(),{pathname:t,search:h,hash:x}=(0,g.default)(),[f,b]=(0,m.default)(n9),w=(0,r.useRef)(null),{direction:v}=r.default.use(eG.default),{loading:y}=(0,u.useSiteData)(),{token:$}=l.theme.useToken(),[j]=(0,p.useSearchParams)(),k="false"===j.get("layout");(0,r.useLayoutEffect)(()=>{"cn"===b?o.default.locale("zh-cn"):o.default.locale("en")},[b]),(0,r.useEffect)(()=>{let e=document.getElementById("nprogress-style");return w.current=setTimeout(()=>{e?.remove()},0),()=>clearTimeout(w.current)},[]),(0,r.useEffect)(()=>{let e=x.replace("#","");e&&document.getElementById(decodeURIComponent(e))?.scrollIntoView()},[y,x]),(0,r.useEffect)(()=>{void 0!==window.ga&&window.ga("send","pageview",t+h)},[t,h]);let S=r.default.useMemo(()=>["","/"].includes(t)||["/index"].some(e=>t.startsWith(e))?(0,n.jsx)(tM,{title:f.title,desc:f.description,children:e}):t.startsWith("/docs/resource")?(0,n.jsx)(tW,{children:e}):t.startsWith("/theme-editor")||t.startsWith("/theme-market")?e:(0,n.jsx)(nZ,{children:e}),[t,e,f.title,f.description]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.Helmet,{encodeSpecialCharacters:!1,children:[(0,n.jsx)("html",{lang:"cn"===b?"zh-CN":b,"data-direction":v,className:(0,i.clsx)({rtl:"rtl"===v})}),(0,n.jsx)("link",{sizes:"144x144",href:"https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"}),(0,n.jsx)("meta",{property:"og:description",content:f.description}),(0,n.jsx)("meta",{property:"og:type",content:"website"}),(0,n.jsx)("meta",{property:"og:image",content:"https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"})]}),(0,n.jsxs)(a.ConfigProvider,{direction:v,locale:"cn"===b?s.default:void 0,theme:{token:{fontFamily:`AlibabaSans, ${$.fontFamily}`}},children:[(0,n.jsx)(T,{}),!k&&(0,n.jsx)(tt,{}),(0,n.jsx)(n7,{}),S]})]})}],213275)},429892,(e,t,n)=>{t.exports=function(e,t,n,i){var o=-1,r=null==e?0:e.length;for(i&&r&&(n=e[++o]);++o<r;)n=t(n,e[o],o,e);return n}},406882,(e,t,n)=>{t.exports=function(e){return function(t){return null==e?void 0:e[t]}}},640195,(e,t,n)=>{t.exports=e.r(406882)({À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"})},640928,(e,t,n)=>{var i=e.r(640195),o=e.r(782346),r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,a=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");t.exports=function(e){return(e=o(e))&&e.replace(r,i).replace(a,"")}},447850,(e,t,n)=>{var i=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;t.exports=function(e){return e.match(i)||[]}},313716,(e,t,n)=>{var i=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;t.exports=function(e){return i.test(e)}},370541,(e,t,n)=>{var i="\\ud800-\\udfff",o="\\u2700-\\u27bf",r="a-z\\xdf-\\xf6\\xf8-\\xff",a="A-Z\\xc0-\\xd6\\xd8-\\xde",l="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",s="['’]",d="["+l+"]",c="["+r+"]",p="[^"+i+l+"\\d+"+o+r+a+"]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",m="[\\ud800-\\udbff][\\udc00-\\udfff]",g="["+a+"]",h="(?:"+c+"|"+p+")",x="(?:"+g+"|"+p+")",f="(?:"+s+"(?:d|ll|m|re|s|t|ve))?",b="(?:"+s+"(?:D|LL|M|RE|S|T|VE))?",w="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",v="[\\ufe0e\\ufe0f]?",y="(?:\\u200d(?:"+["[^"+i+"]",u,m].join("|")+")"+v+w+")*",$="(?:"+["["+o+"]",u,m].join("|")+")"+(v+w+y),j=RegExp([g+"?"+c+"+"+f+"(?="+[d,g,"$"].join("|")+")",x+"+"+b+"(?="+[d,g+h,"$"].join("|")+")",g+"?"+h+"+"+f,g+"+"+b,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])|\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])|\\d+",$].join("|"),"g");t.exports=function(e){return e.match(j)||[]}},327708,(e,t,n)=>{var i=e.r(447850),o=e.r(313716),r=e.r(782346),a=e.r(370541);t.exports=function(e,t,n){return(e=r(e),void 0===(t=n?void 0:t))?o(e)?a(e):i(e):e.match(t)||[]}},422471,(e,t,n)=>{var i=e.r(429892),o=e.r(640928),r=e.r(327708),a=RegExp("['’]","g");t.exports=function(e){return function(t){return i(r(o(t).replace(a,"")),e,"")}}},809952,(e,t,n)=>{t.exports=e.r(422471)(function(e,t,n){return e+(n?"-":"")+t.toLowerCase()})},131254,(e,t,n)=>{var i=e.r(979021),o=e.r(903275);t.exports=function(e,t,n){var r=!0,a=!0;if("function"!=typeof e)throw TypeError("Expected a function");return o(n)&&(r="leading"in n?!!n.leading:r,a="trailing"in n?!!n.trailing:a),i(e,t,{leading:r,maxWait:t,trailing:a})}},45024,(e,t,n)=>{t.exports=[{version:"6.x",url:"https://ant.design",chineseMirrorUrl:"https://ant-design.antgroup.com"},{version:"5.x",url:"https://5x.ant.design",chineseMirrorUrl:"https://5x-ant-design.antgroup.com"},{version:"4.x",url:"https://4x.ant.design",chineseMirrorUrl:"https://4x-ant-design.antgroup.com"},{version:"3.x",url:"https://3x.ant.design"},{version:"2.x",url:"https://2x.ant.design"},{version:"1.x",url:"https://1x.ant.design"},{version:"0.12.x",url:"https://012x.ant.design"},{version:"0.11.x",url:"https://011x.ant.design"},{version:"0.10.x",url:"https://010x.ant.design"},{version:"0.9.x",url:"https://09x.ant.design"}]}]);