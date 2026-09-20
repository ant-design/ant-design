(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,917570,e=>{"use strict";var r=e.i(391398),n=e.i(952169);let t=(0,e.i(827830).createStyles)(e=>{let{cssVar:r,prefixCls:n,css:t}=e,a=`.${n}-tabs`;return t`
    ${a}${a}-card {
      ${a}-body {
        padding: ${r.padding};
        background: ${r.colorBgContainer};
      }

      ${a}-nav {
        margin: 0;

        ${a}-nav-wrap > ${a}-nav-list > ${a}-tab {
          background: transparent;
          border-color: transparent;
          &-active {
            border-color: ${r.colorBorderBg};
            background: ${r.colorBgContainer};
          }
        }

        &::before {
          display: none;
        }
      }
    }
  `}),a=Array.from({length:3}).map((e,n)=>{let t=String(n+1);return{label:`Tab Title ${t}`,key:t,children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]}),(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]}),(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]})]})}});e.s(["default",0,()=>{let{styles:e}=t();return(0,r.jsx)("div",{className:e,children:(0,r.jsx)(n.f,{type:"card",items:a})})}])}]);