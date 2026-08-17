(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,975278,e=>{"use strict";var t=e.i(897826);e.s(["Input",()=>t.default])},329282,e=>{"use strict";var t=e.i(95108);e.s(["Menu",()=>t.default])},903099,e=>{"use strict";var t=e.i(391398),a=e.i(191788),r=e.i(975278),l=e.i(329282),o=e.i(952169),i=e.i(231372);let n=(0,e.i(827830).createStyles)(({token:e,css:t})=>({container:t`
    width: 200px;
    background: ${e.colorBgContainer};
    box-shadow: ${e.boxShadow};
    border-radius: ${e.borderRadiusLG}px;
    overflow: hidden;
  `,searchWrapper:t`
    padding: ${e.paddingXS}px ${e.paddingSM}px;
    border-bottom: ${e.lineWidth}px ${e.lineType} ${e.colorBorder};
  `,menuWrapper:t`
    max-height: 300px;
    overflow-y: auto;
  `,empty:t`
    padding: ${e.paddingSM}px;
    color: ${e.colorTextDisabled};
    text-align: center;
  `})),s=Array.from({length:30},(e,t)=>{let a=String(t);return{label:`Tab-${a}`,key:a,disabled:28===t,children:`Content of tab ${a}`}}),d=({restTabs:e,activeKey:o,onChange:s})=>{let[d,u]=(0,a.useState)(""),c=(0,a.useRef)(null),{styles:p}=n(),h=(0,a.useMemo)(()=>e.map(e=>({key:e.key,label:e.label,disabled:e.disabled})),[e]),b=(0,a.useMemo)(()=>d?h.filter(e=>String(e.label).toLowerCase().includes(d.toLowerCase())):h,[h,d]);return(0,t.jsxs)("div",{className:p.container,children:[(0,t.jsx)("div",{className:p.searchWrapper,children:(0,t.jsx)(r.Input,{placeholder:"Search tabs...",prefix:(0,t.jsx)(i.SearchOutlined,{}),value:d,onChange:e=>u(e.target.value),onKeyDown:e=>{("ArrowUp"===e.key||"ArrowDown"===e.key)&&c.current?.focus()},allowClear:!0})}),(0,t.jsx)("div",{className:p.menuWrapper,children:(0,t.jsx)(l.Menu,{ref:c,defaultSelectedKeys:[o],items:b,onClick:({key:e})=>{u(""),s(e)}})}),0===b.length&&(0,t.jsx)("div",{className:p.empty,children:"No matching tabs"})]})};e.s(["default",0,()=>{let[e,r]=a.default.useState("1");return(0,t.jsx)(o.Tabs,{activeKey:e,onChange:r,items:s,more:{trigger:"click",placement:"bottomLeft",popupRender:(a,{restTabs:l,onClose:o})=>(0,t.jsx)(d,{restTabs:l,activeKey:e,onChange:e=>{r(e),o()}})}})}])},231372,e=>{"use strict";var t=e.i(690417);e.s(["SearchOutlined",()=>t.default])}]);