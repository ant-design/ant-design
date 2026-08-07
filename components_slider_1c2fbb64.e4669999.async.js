(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,45923,e=>{"use strict";var t=e.i(391398);e.i(191788);var r=e.i(504909),a=e.i(530670),d=e.i(827830);let l=(0,d.createStyles)(({css:e})=>({root:e`
    width: 300px;
  `})),o=(0,d.createStyles)(({css:e,prefixCls:t,cssVar:r})=>({root:e`
    width: 100px;
    &:hover {
      .${t}-slider-handle:after {
        box-shadow: 0 0 0 ${r.lineWidthBold} #722ed1;
      }
    }
  `,handle:e`
    &.${t}-slider-handle:hover::after,
      &.${t}-slider-handle:active::after,
      &.${t}-slider-handle:focus::after,
      &.${t}-slider-handle::after {
      box-shadow: 0 0 0 ${r.lineWidthBold} #722ed1;
    }
  `})),i={track:{backgroundImage:"linear-gradient(180deg, #91caff, #1677ff)"},handle:{borderColor:"#1677ff",boxShadow:"0 2px 8px #1677ff"}},s=e=>"vertical"===e.props.orientation?{root:{height:300},track:{backgroundImage:"linear-gradient(180deg, #722cc0, #722ed1)"},handle:{borderColor:"#722ed1",boxShadow:"0 2px 8px #722ed1"}}:{},n={defaultValue:30};e.s(["default",0,()=>{let{styles:e}=l(),{styles:d}=o();return(0,t.jsxs)(r.Flex,{vertical:!0,gap:"medium",children:[(0,t.jsx)(a.Slider,{...n,orientation:"horizontal",classNames:e,styles:i}),(0,t.jsx)(a.Slider,{...n,classNames:d,orientation:"vertical",reverse:!0,styles:s})]})}])},530670,e=>{"use strict";var t=e.i(509753);e.s(["Slider",()=>t.default])}]);