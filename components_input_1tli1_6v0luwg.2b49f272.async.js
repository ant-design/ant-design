(()=>{"use strict";(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,690701,e=>{var t=e.i(391398),n=e.i(191788),r=e.i(975278),i=e.i(788296);let u=(0,e.i(827830).createStyles)(e=>{let{css:t,prefixCls:n,cssVar:r}=e;return{numericInput:t`
      .${n}-tooltip-container {
        min-width: 32px;
        min-height: 38px;
      }
    `,numericInputTitle:t`
      font-size: ${r.fontSize};
    `}}),l=e=>{let n,{value:l,onChange:a}=e,{styles:o}=u(),s=l?(0,t.jsx)("span",{className:o.numericInputTitle,children:"-"!==l?(n=Number(l),new Intl.NumberFormat().format(n)):"-"}):"Input a number";return(0,t.jsx)(i.f,{destroyOnHidden:!0,trigger:["focus"],title:s,placement:"topLeft",classNames:{root:o.numericInput},children:(0,t.jsx)(r.f,{...e,onChange:e=>{let{value:t}=e.target;(/^-?\d*(\.\d*)?$/.test(t)||""===t||"-"===t)&&a(t)},onBlur:()=>{let e=l;("."===l.charAt(l.length-1)||"-"===l)&&(e=l.slice(0,-1)),a(e.replace(/0*(\d+)/,"$1"))},placeholder:"Input a number",maxLength:16})})};e.s(["default",0,()=>{let[e,r]=(0,n.useState)("");return(0,t.jsx)(l,{style:{width:120},value:e,onChange:r})}])},975278,e=>{var t=e.i(897826);e.s(["f",()=>t.f])}])})();