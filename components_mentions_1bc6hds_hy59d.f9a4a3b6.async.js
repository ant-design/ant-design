(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,405713,e=>{"use strict";var t=e.i(391398),a=e.i(191788),s=e.i(207193),i=e.i(827830),l=e.i(979021);let r=(0,i.createStyles)(e=>{let{css:t,cssVar:a}=e;return{optionItem:t`
      position: relative;
    `,avatarImage:t`
      width: 20px;
      height: 20px;
      margin-inline-end: ${a.marginXS};
    `}});e.s(["default",0,()=>{let{styles:e}=r(),[i,n]=(0,a.useState)(!1),[o,u]=(0,a.useState)([]),c=(0,a.useRef)(null),h=(0,a.useCallback)((0,l.default)(e=>{e?fetch(`https://api.github.com/search/users?q=${e}`).then(e=>e.json()).then(({items:t=[]})=>{c.current===e&&(n(!1),u(t.slice(0,10)))}):u([])},800),[]);return(0,t.jsx)(s.f,{style:{width:"100%"},loading:i,onSearch:e=>{console.log("Search:",e),c.current=e,n(!!e),u([]),h(e)},options:o.map(({login:a,avatar_url:s})=>({key:a,value:a,className:e.optionItem,label:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("img",{className:e.avatarImage,draggable:!1,src:s,title:a,alt:a}),(0,t.jsx)("span",{children:a})]})}))})}])},207193,e=>{"use strict";var t=e.i(838569);e.s(["f",()=>t.f])}]);