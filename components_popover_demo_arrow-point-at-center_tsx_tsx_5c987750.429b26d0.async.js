(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,825674,t=>{"use strict";var e=t.i(391398);t.i(191788);var o=t.i(504909),i=t.i(831036);let r=(0,t.i(827830).createStaticStyles)(({css:t})=>({item:t`
    width: 280px;
    height: 280px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed purple;
  `,box:t`
    width: 40px;
    height: 40px;
    background-color: deepskyblue;
  `,cross:t`
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }
    &::before {
      top: 50%;
      height: 1px;
      background-color: red;
    }
    &::after {
      inset-inline-start: 50%;
      width: 1px;
      background-color: blue;
    }
  `})),n=["topLeft","top","topRight","leftTop","left","leftBottom","rightTop","right","rightBottom","bottomLeft","bottom","bottomRight"];t.s(["default",0,()=>(0,e.jsx)(o.Flex,{gap:16,wrap:!0,children:n.map(t=>(0,e.jsx)("div",{className:r.item,children:(0,e.jsx)(i.Popover,{placement:t,content:(0,e.jsx)(o.Flex,{align:"center",justify:"center",children:t}),autoAdjustOverflow:!1,arrow:{pointAtCenter:!0},forceRender:!0,open:!0,children:(0,e.jsx)("div",{className:`${r.box} ${r.cross}`})})},t))})])}]);