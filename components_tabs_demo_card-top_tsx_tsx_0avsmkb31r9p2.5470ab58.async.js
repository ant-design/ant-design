(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,917570,n=>{"use strict";var r=n.i(391398),e=n.i(952169);let t=(0,n.i(827830).o)(n=>{let{cssVar:r,prefixCls:e,css:t}=n,a=`.${e}-tabs`;return t`
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
  `}),a=Array.from({length:3}).map((n,e)=>{let t=String(e+1);return{label:`Tab Title ${t}`,key:t,children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]}),(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]}),(0,r.jsxs)("p",{children:["Content of Tab Pane ",t]})]})}});n.s(["default",0,()=>{let{styles:n}=t();return(0,r.jsx)("div",{className:n,children:(0,r.jsx)(e.f,{type:"card",items:a})})}])}]);