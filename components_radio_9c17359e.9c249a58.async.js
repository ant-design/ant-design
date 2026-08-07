(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,870435,e=>{"use strict";var o=e.i(391398),l=e.i(191788),c=e.i(504909),s=e.i(606365),a=e.i(827830),r=e.i(56206);let t=(0,a.createStyles)(({token:e,css:o})=>({root:o`
    border-radius: ${e.borderRadius}px;
    background-color: ${e.colorBgContainer};
  `,icon:o`
    border-color: ${e.colorWarning};
  `,label:o`
    color: ${e.colorTextDisabled};
    font-weight: bold;
  `,iconChecked:o`
    background-color: ${e.colorWarning};
  `,labelChecked:o`
    color: ${e.colorWarning};
  `})),i={icon:{borderRadius:6},label:{color:"blue"}};e.s(["default",0,()=>{let[e,a]=l.default.useState("styles"),{styles:n}=t();return(0,o.jsxs)(c.Flex,{vertical:!0,gap:"medium",children:[(0,o.jsx)(s.Radio,{name:"style-class",styles:i,checked:"styles"===e,onChange:()=>a("styles"),children:"Object styles"}),(0,o.jsx)(s.Radio,{name:"style-class",classNames:e=>e.props.checked?{root:(0,r.clsx)(n.root),icon:(0,r.clsx)(n.icon,n.iconChecked),label:(0,r.clsx)(n.label,n.labelChecked)}:{root:n.root,icon:n.icon,label:n.label},checked:"classNames"===e,onChange:()=>a("classNames"),children:"Function classNames"})]})}])},606365,e=>{"use strict";var o=e.i(737989);e.s(["Radio",()=>o.default])}]);