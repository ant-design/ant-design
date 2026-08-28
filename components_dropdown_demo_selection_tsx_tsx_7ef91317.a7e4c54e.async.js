(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,971402,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(747985),r=e.i(638204),i=e.i(827830);let s={mask:"Mask keyword",mark:"Mark keyword",search:"Search keyword"},a=(0,i.createStyles)(({cssVar:e,css:t})=>{let{colorText:n,colorBgLayout:o,borderRadiusLG:r,paddingLG:i}=e;return{wrapper:t`
      padding: ${i};
      user-select: text;
      color: ${n};
      background-color: ${o};
      border-radius: ${r};
    `,trigger:t`
      position: fixed;
      display: block;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      pointer-events: none;
    `}}),l=Object.entries(s).map(([e,t])=>({key:e,label:t}));e.s(["default",0,()=>{let[e,i]=r.message.useMessage(),{styles:u}=a(),d=(0,n.useRef)(null),[c,g]=(0,n.useState)(null),p=()=>{let e=window.getSelection(),t=e?.toString().trim();if(!e||!t||0===e.rangeCount)return void g(null);let n=e.getRangeAt(0);if(!d.current?.contains(n.commonAncestorContainer))return void g(null);let o=n.getBoundingClientRect();o.width&&o.height?g({text:t,x:o.left+o.width/2,y:o.bottom+4}):g(null)};return(0,t.jsxs)(t.Fragment,{children:[i,(0,t.jsx)(o.Dropdown,{menu:{items:l,onClick:({key:t})=>{c&&(e.info(`${s[t]}: ${c.text}`),window.getSelection()?.removeAllRanges(),g(null))}},open:!!c,placement:"bottom",trigger:[],onOpenChange:e=>{e||g(null)},children:(0,t.jsx)("span",{"aria-hidden":!0,className:u.trigger,style:{left:c?.x??-9999,top:c?.y??-9999}})}),(0,t.jsx)("div",{ref:d,onMouseDown:()=>g(null),onMouseUp:()=>{setTimeout(p)},className:u.wrapper,children:"Select any text in this paragraph to open a Dropdown menu near the selection. This is useful for actions such as masking sensitive words, marking entities, or searching the selected keyword. Example data: Alice, phone 13800138000, ID 110101199001011234."})]})}])}]);