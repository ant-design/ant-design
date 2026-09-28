(()=>{"use strict";(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,975278,e=>{var a=e.i(897826);e.s(["f",()=>a.f])},329282,e=>{var a=e.i(95108);e.s(["f",()=>a.f])},903099,e=>{var a=e.i(391398),r=e.i(191788),t=e.i(975278),o=e.i(329282),l=e.i(952169),i=e.i(231372);let n=(0,e.i(827830).createStyles)(({token:e,css:a})=>({container:a`
    width: 200px;
    background: ${e.colorBgContainer};
    box-shadow: ${e.boxShadow};
    border-radius: ${e.borderRadiusLG}px;
    overflow: hidden;
  `,searchWrapper:a`
    padding: ${e.paddingXS}px ${e.paddingSM}px;
    border-bottom: ${e.lineWidth}px ${e.lineType} ${e.colorBorder};
  `,menuWrapper:a`
    max-height: 300px;
    overflow-y: auto;
  `,empty:a`
    padding: ${e.paddingSM}px;
    color: ${e.colorTextDisabled};
    text-align: center;
  `})),s=Array.from({length:30},(e,a)=>{let r=String(a);return{label:`Tab-${r}`,key:r,disabled:28===a,children:`Content of tab ${r}`}}),d=({restTabs:e,activeKey:l,onChange:s})=>{let[d,c]=(0,r.useState)(""),p=(0,r.useRef)(null),{styles:u}=n(),h=(0,r.useMemo)(()=>e.map(e=>({key:e.key,label:e.label,disabled:e.disabled})),[e]),b=(0,r.useMemo)(()=>d?h.filter(e=>String(e.label).toLowerCase().includes(d.toLowerCase())):h,[h,d]);return(0,a.jsxs)("div",{className:u.container,children:[(0,a.jsx)("div",{className:u.searchWrapper,children:(0,a.jsx)(t.f,{placeholder:"Search tabs...",prefix:(0,a.jsx)(i.f,{}),value:d,onChange:e=>c(e.target.value),onKeyDown:e=>{("ArrowUp"===e.key||"ArrowDown"===e.key)&&p.current?.focus()},allowClear:!0})}),(0,a.jsx)("div",{className:u.menuWrapper,children:(0,a.jsx)(o.f,{ref:p,defaultSelectedKeys:[l],items:b,onClick:({key:e})=>{c(""),s(e)}})}),0===b.length&&(0,a.jsx)("div",{className:u.empty,children:"No matching tabs"})]})};e.s(["default",0,()=>{let[e,t]=r.default.useState("1");return(0,a.jsx)(l.f,{activeKey:e,onChange:t,items:s,more:{trigger:"click",placement:"bottomLeft",popupRender:(r,{restTabs:o,onClose:l})=>(0,a.jsx)(d,{restTabs:o,activeKey:e,onChange:e=>{t(e),l()}})}})}])},231372,e=>{var a=e.i(690417);e.s(["f",()=>a.f])}])})();