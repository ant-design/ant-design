(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,980106,o=>{"use strict";var e=o.i(391398);o.i(191788);var r=o.i(504909),s=o.i(975278);let t=(0,o.i(827830).createStaticStyles)(({css:o,cssVar:e})=>({root:o`
    border-width: ${e.lineWidth};
    border-radius: ${e.borderRadius};
    transition: box-shadow ${e.motionDurationMid};
    &:hover {
      border: 1px solid #d9d9d9;
    }
    &:focus-visible {
      border-color: lab(66.128% 0 0);
      box-shadow: 0 0 0 4px color-mix(in oklab, lab(66.128% 0 0) 50%, transparent);
    }
  `})),{Search:a,TextArea:i,OTP:l,Password:d}=s.Input,n=o=>"medium"===o.props.size?{root:{borderColor:"#696FC7"}}:{},c=o=>o.props.showCount?{root:{borderColor:"#BDE3C3"},textarea:{resize:"none"},count:{color:"#BDE3C3"}}:{},u=o=>"medium"===o.props.size?{root:{borderColor:"#F5D3C4"}}:{},p=o=>"medium"===o.props.size?{root:{borderWidth:0},input:{borderColor:"#6E8CFB",width:32}}:{},m=o=>"large"===o.props.size?{root:{color:"#4DA8DA",borderWidth:0},input:{color:"#4DA8DA",borderColor:"#4DA8DA"},prefix:{color:"#4DA8DA"},suffix:{color:"#4DA8DA"},count:{color:"#4DA8DA"},button:{root:{color:"#4DA8DA",borderColor:"#4DA8DA"},icon:{color:"#4DA8DA"}}}:{};o.s(["default",0,()=>(0,e.jsxs)(r.Flex,{vertical:!0,gap:"large",children:[(0,e.jsx)(s.Input,{classNames:t,placeholder:"Object",name:"input-object"}),(0,e.jsx)(s.Input,{classNames:t,styles:n,placeholder:"Function",size:"medium",name:"input-fn"}),(0,e.jsx)(i,{classNames:t,styles:c,value:"TextArea",showCount:!0,name:"textarea-fn"}),(0,e.jsx)(d,{classNames:t,styles:u,value:"Password",size:"medium",name:"password-fn"}),(0,e.jsx)(l,{classNames:t,styles:p,size:"medium",length:6,separator:"*"}),(0,e.jsx)(a,{classNames:t,styles:m,size:"large",placeholder:"Search",name:"search-fn"})]})])},975278,o=>{"use strict";var e=o.i(897826);o.s(["Input",()=>e.default])}]);