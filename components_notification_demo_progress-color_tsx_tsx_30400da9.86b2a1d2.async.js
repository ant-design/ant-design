(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,979674,o=>{"use strict";var t=o.i(391398);o.i(191788);var e=o.i(183668),i=o.i(606552),n=o.i(265934),r=o.i(827830);let s="linear-gradient(135deg,#6253e1, #04befe)",a=(0,r.createStyles)(({cssVar:o,prefixCls:t,css:e})=>({linearGradientButton:e`
    &.${t}-btn-primary:not([disabled]):not(.${t}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: ${s};
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all ${o.motionDurationSlow};
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `}));o.s(["default",0,()=>{let{styles:o}=a(),[r,c]=n.notification.useNotification();return(0,t.jsxs)(i.ConfigProvider,{button:{className:o.linearGradientButton},theme:{components:{Notification:{progressBg:s}}},children:[c,(0,t.jsx)(e.Button,{type:"primary",onClick:()=>{r.open({title:"Customize progress bar color",description:"You can use component token to customize the progress bar color",showProgress:!0,duration:20})},children:"Show custom progress color"})]})}])}]);