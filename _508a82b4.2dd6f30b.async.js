(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,898699,e=>{"use strict";var t=e.i(391398),i=e.i(191788),s=e.i(95619),r=e.i(587834),l=e.i(504909),a=e.i(530670),o=e.i(827830),n=e.i(56206);let u=(0,o.createStyles)(e=>{let{css:t,iconPrefixCls:i,cssVar:s}=e;return{wrapper:t`
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
    `}}),c=e=>{let{max:o,min:c}=e,{styles:d}=u(),[m,x]=(0,i.useState)(0),p=Number(((o-c)/2).toFixed(5));return(0,t.jsxs)(l.Flex,{justify:"space-between",align:"center",gap:"small",className:d.wrapper,children:[(0,t.jsx)(s.FrownOutlined,{className:(0,n.clsx)({isActive:m<p})}),(0,t.jsx)(a.Slider,{...e,onChange:x,value:m,className:d.slider}),(0,t.jsx)(r.SmileOutlined,{className:(0,n.clsx)({isActive:m>=p})})]})};e.s(["default",0,()=>(0,t.jsx)(c,{min:0,max:20})])},530670,e=>{"use strict";var t=e.i(509753);e.s(["Slider",()=>t.default])},95619,e=>{"use strict";var t=e.i(192099);e.s(["FrownOutlined",()=>t.default])},587834,e=>{"use strict";var t=e.i(800791);e.s(["SmileOutlined",()=>t.default])}]);