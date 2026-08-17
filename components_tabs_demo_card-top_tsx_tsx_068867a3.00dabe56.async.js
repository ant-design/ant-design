(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,917570,r=>{"use strict";var e=r.i(391398);r.i(191788);var n=r.i(952169);let a=(0,r.i(827830).createStyles)(r=>{let{cssVar:e,prefixCls:n,css:a}=r,t=`.${n}-tabs`;return a`
    ${t}${t}-card {
      ${t}-body {
        padding: ${e.padding};
        background: ${e.colorBgContainer};
      }

      ${t}-nav {
        margin: 0;

        ${t}-nav-wrap > ${t}-nav-list > ${t}-tab {
          background: transparent;
          border-color: transparent;
          &-active {
            border-color: ${e.colorBorderBg};
            background: ${e.colorBgContainer};
          }
        }

        &::before {
          display: none;
        }
      }
    }
  `}),t=Array.from({length:3}).map((r,n)=>{let a=String(n+1);return{label:`Tab Title ${a}`,key:a,children:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("p",{children:["Content of Tab Pane ",a]}),(0,e.jsxs)("p",{children:["Content of Tab Pane ",a]}),(0,e.jsxs)("p",{children:["Content of Tab Pane ",a]})]})}});r.s(["default",0,()=>{let{styles:r}=a();return(0,e.jsx)("div",{className:r,children:(0,e.jsx)(n.Tabs,{type:"card",items:t})})}])}]);