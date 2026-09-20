(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,898699,e=>{"use strict";var t=e.i(391398),s=e.i(191788),i=e.i(95619),r=e.i(587834),a=e.i(504909),o=e.i(530670),l=e.i(827830),c=e.i(56206);let n=(0,l.createStyles)(e=>{let{css:t,iconPrefixCls:s,cssVar:i}=e;return{wrapper:t`
      position: relative;
      .${s} {
        color: ${i.colorTextQuaternary};
        font-size: ${i.fontSizeLG};
        transition: color ${i.motionDurationFast} ${i.motionEaseInOutCirc};
        &.isActive {
          color: ${i.colorPrimary};
        }
      }
    `,slider:t`
      flex: 1;
      width: 100%;
    `}}),u=e=>{let{max:l,min:u}=e,{styles:f}=n(),[m,d]=(0,s.useState)(0),x=Number(((l-u)/2).toFixed(5));return(0,t.jsxs)(a.f,{justify:"space-between",align:"center",gap:"small",className:f.wrapper,children:[(0,t.jsx)(i.f,{className:(0,c.clsx)({isActive:m<x})}),(0,t.jsx)(o.f,{...e,onChange:d,value:m,className:f.slider}),(0,t.jsx)(r.f,{className:(0,c.clsx)({isActive:m>=x})})]})};e.s(["default",0,()=>(0,t.jsx)(u,{min:0,max:20})])},530670,e=>{"use strict";var t=e.i(509753);e.s(["f",()=>t.f])},95619,e=>{"use strict";var t=e.i(192099);e.s(["f",()=>t.f])},587834,e=>{"use strict";var t=e.i(800791);e.s(["f",()=>t.f])}]);