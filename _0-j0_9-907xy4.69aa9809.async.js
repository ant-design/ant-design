(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,975278,e=>{"use strict";var r=e.i(897826);e.s(["f",()=>r.f])},329282,e=>{"use strict";var r=e.i(95108);e.s(["f",()=>r.f])},903099,e=>{"use strict";var r=e.i(391398),t=e.i(191788),a=e.i(975278),o=e.i(329282),i=e.i(952169),l=e.i(231372);let s=(0,e.i(827830).createStyles)(({token:e,css:r})=>({container:r`
    width: 200px;
    background: ${e.colorBgContainer};
    box-shadow: ${e.boxShadow};
    border-radius: ${e.borderRadiusLG}px;
    overflow: hidden;
  `,searchWrapper:r`
    padding: ${e.paddingXS}px ${e.paddingSM}px;
    border-bottom: ${e.lineWidth}px ${e.lineType} ${e.colorBorder};
  `,menuWrapper:r`
    max-height: 300px;
    overflow-y: auto;
  `,empty:r`
    padding: ${e.paddingSM}px;
    color: ${e.colorTextDisabled};
    text-align: center;
  `})),n=Array.from({length:30},(e,r)=>{let t=String(r);return{label:`Tab-${t}`,key:t,disabled:28===r,children:`Content of tab ${t}`}}),d=({restTabs:e,activeKey:i,onChange:n})=>{let[d,c]=(0,t.useState)(""),u=(0,t.useRef)(null),{styles:p}=s(),h=(0,t.useMemo)(()=>e.map(e=>({key:e.key,label:e.label,disabled:e.disabled})),[e]),b=(0,t.useMemo)(()=>d?h.filter(e=>String(e.label).toLowerCase().includes(d.toLowerCase())):h,[h,d]);return(0,r.jsxs)("div",{className:p.container,children:[(0,r.jsx)("div",{className:p.searchWrapper,children:(0,r.jsx)(a.f,{placeholder:"Search tabs...",prefix:(0,r.jsx)(l.f,{}),value:d,onChange:e=>c(e.target.value),onKeyDown:e=>{("ArrowUp"===e.key||"ArrowDown"===e.key)&&u.current?.focus()},allowClear:!0})}),(0,r.jsx)("div",{className:p.menuWrapper,children:(0,r.jsx)(o.f,{ref:u,defaultSelectedKeys:[i],items:b,onClick:({key:e})=>{c(""),n(e)}})}),0===b.length&&(0,r.jsx)("div",{className:p.empty,children:"No matching tabs"})]})};e.s(["default",0,()=>{let[e,a]=t.default.useState("1");return(0,r.jsx)(i.f,{activeKey:e,onChange:a,items:n,more:{trigger:"click",placement:"bottomLeft",popupRender:(t,{restTabs:o,onClose:i})=>(0,r.jsx)(d,{restTabs:o,activeKey:e,onChange:e=>{a(e),i()}})}})}])},231372,e=>{"use strict";var r=e.i(690417);e.s(["f",()=>r.f])}]);