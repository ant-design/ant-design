(()=>{"use strict";(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,898699,e=>{var t=e.i(391398),i=e.i(191788),s=e.i(95619),a=e.i(587834),r=e.i(504909),o=e.i(530670),l=e.i(827830),n=e.i(56206);let c=(0,l.createStyles)(e=>{let{css:t,iconPrefixCls:i,cssVar:s}=e;return{wrapper:t`
      position: relative;
      .${i} {
        color: ${s.colorTextQuaternary};
        font-size: ${s.fontSizeLG};
        transition: color ${s.motionDurationFast} ${s.motionEaseInOutCirc};
        &.isActive {
          color: ${s.colorPrimary};
        }
      }
    `,slider:t`
      flex: 1;
      width: 100%;
    `}}),u=e=>{let{max:l,min:u}=e,{styles:f}=c(),[m,d]=(0,i.useState)(0),x=Number(((l-u)/2).toFixed(5));return(0,t.jsxs)(r.f,{justify:"space-between",align:"center",gap:"small",className:f.wrapper,children:[(0,t.jsx)(s.f,{className:(0,n.clsx)({isActive:m<x})}),(0,t.jsx)(o.f,{...e,onChange:d,value:m,className:f.slider}),(0,t.jsx)(a.f,{className:(0,n.clsx)({isActive:m>=x})})]})};e.s(["default",0,()=>(0,t.jsx)(u,{min:0,max:20})])},530670,e=>{var t=e.i(509753);e.s(["f",()=>t.f])},95619,e=>{var t=e.i(192099);e.s(["f",()=>t.f])},587834,e=>{var t=e.i(800791);e.s(["f",()=>t.f])}])})();