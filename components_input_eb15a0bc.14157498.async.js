(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,690701,t=>{"use strict";var e=t.i(391398),n=t.i(191788),r=t.i(975278),u=t.i(788296);let i=(0,t.i(827830).createStyles)(t=>{let{css:e,prefixCls:n,cssVar:r}=t;return{numericInput:e`
      .${n}-tooltip-container {
        min-width: 32px;
        min-height: 38px;
      }
    `,numericInputTitle:e`
      font-size: ${r.fontSize};
    `}}),l=t=>{let n,{value:l,onChange:a}=t,{styles:o}=i(),s=l?(0,e.jsx)("span",{className:o.numericInputTitle,children:"-"!==l?(n=Number(l),new Intl.NumberFormat().format(n)):"-"}):"Input a number";return(0,e.jsx)(u.Tooltip,{destroyOnHidden:!0,trigger:["focus"],title:s,placement:"topLeft",classNames:{root:o.numericInput},children:(0,e.jsx)(r.Input,{...t,onChange:t=>{let{value:e}=t.target;(/^-?\d*(\.\d*)?$/.test(e)||""===e||"-"===e)&&a(e)},onBlur:()=>{let t=l;("."===l.charAt(l.length-1)||"-"===l)&&(t=l.slice(0,-1)),a(t.replace(/0*(\d+)/,"$1"))},placeholder:"Input a number",maxLength:16})})};t.s(["default",0,()=>{let[t,r]=(0,n.useState)("");return(0,e.jsx)(l,{style:{width:120},value:t,onChange:r})}])},975278,t=>{"use strict";var e=t.i(897826);t.s(["Input",()=>e.default])}]);