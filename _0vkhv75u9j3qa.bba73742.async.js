(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,972070,e=>{"use strict";var s=e.i(391398),t=e.i(191788),i=e.i(894687),r=e.i(360618),n=e.i(183668),a=e.i(897782),l=e.i(975278);let o=(0,e.i(827830).createStyles)(e=>{let{css:s,cssVar:t}=e;return{dynamicDeleteButton:s`
      position: relative;
      top: ${t.marginXXS};
      margin: 0 ${t.marginXS};
      color: #999;
      font-size: 24px;
      cursor: pointer;
      transition: all ${t.motionDurationSlow} ease;
      &:hover {
        color: #777;
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `}}),d={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},c={wrapperCol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}};e.s(["default",0,()=>{let{styles:e}=o();return(0,s.jsxs)(a.f,{name:"dynamic_form_item",...c,onFinish:e=>{console.log("Received values of form:",e)},style:{maxWidth:600},children:[(0,s.jsx)(a.f.List,{name:"names",rules:[{validator:async(e,s)=>{if(!s||s.length<2)return Promise.reject(Error("At least 2 passengers"))}}],children:(o,{add:m,remove:f},{errors:h})=>(0,s.jsxs)(s.Fragment,{children:[o.map((r,n)=>(0,t.createElement)(a.f.Item,{...0===n?d:c,label:0===n?"Passengers":void 0,required:!1,key:r.key,children:[(0,s.jsx)(a.f.Item,{...r,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input passenger's name or delete this field."}],noStyle:!0,children:(0,s.jsx)(l.f,{placeholder:"passenger name",style:{width:"60%"}})}),o.length>1?(0,s.jsx)(i.f,{className:e.dynamicDeleteButton,onClick:()=>f(r.name)}):null]})),(0,s.jsxs)(a.f.Item,{children:[(0,s.jsx)(n.f,{type:"dashed",onClick:()=>m(),style:{width:"60%"},icon:(0,s.jsx)(r.f,{}),children:"Add field"}),(0,s.jsx)(n.f,{type:"dashed",onClick:()=>{m("The head item",0)},style:{width:"60%",marginTop:"20px"},icon:(0,s.jsx)(r.f,{}),children:"Add field at head"}),(0,s.jsx)(a.f.ErrorList,{errors:h})]})]})}),(0,s.jsx)(a.f.Item,{children:(0,s.jsx)(n.f,{type:"primary",htmlType:"submit",children:"Submit"})})]})}])},897782,e=>{"use strict";var s=e.i(482791);e.s(["f",()=>s.f])},975278,e=>{"use strict";var s=e.i(897826);e.s(["f",()=>s.f])},894687,e=>{"use strict";var s=e.i(248460);e.s(["f",()=>s.f])},360618,e=>{"use strict";var s=e.i(439214);e.s(["f",()=>s.f])}]);