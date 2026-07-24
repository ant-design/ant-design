(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,972070,e=>{"use strict";var t=e.i(391398),s=e.i(191788),r=e.i(894687),i=e.i(360618),l=e.i(183668),n=e.i(897782),a=e.i(975278);let o=(0,e.i(827830).createStyles)(e=>{let{css:t,cssVar:s}=e;return{dynamicDeleteButton:t`
      position: relative;
      top: 4px;
      margin: 0 ${s.marginXS};
      color: #999;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        color: #777;
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `}}),d={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},u={wrapperCol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}};e.s(["default",0,()=>{let{styles:e}=o();return(0,t.jsxs)(n.Form,{name:"dynamic_form_item",...u,onFinish:e=>{console.log("Received values of form:",e)},style:{maxWidth:600},children:[(0,t.jsx)(n.Form.List,{name:"names",rules:[{validator:async(e,t)=>{if(!t||t.length<2)return Promise.reject(Error("At least 2 passengers"))}}],children:(o,{add:c,remove:m},{errors:p})=>(0,t.jsxs)(t.Fragment,{children:[o.map((i,l)=>(0,s.createElement)(n.Form.Item,{...0===l?d:u,label:0===l?"Passengers":void 0,required:!1,key:i.key,children:[(0,t.jsx)(n.Form.Item,{...i,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input passenger's name or delete this field."}],noStyle:!0,children:(0,t.jsx)(a.Input,{placeholder:"passenger name",style:{width:"60%"}})}),o.length>1?(0,t.jsx)(r.MinusCircleOutlined,{className:e.dynamicDeleteButton,onClick:()=>m(i.name)}):null]})),(0,t.jsxs)(n.Form.Item,{children:[(0,t.jsx)(l.Button,{type:"dashed",onClick:()=>c(),style:{width:"60%"},icon:(0,t.jsx)(i.PlusOutlined,{}),children:"Add field"}),(0,t.jsx)(l.Button,{type:"dashed",onClick:()=>{c("The head item",0)},style:{width:"60%",marginTop:"20px"},icon:(0,t.jsx)(i.PlusOutlined,{}),children:"Add field at head"}),(0,t.jsx)(n.Form.ErrorList,{errors:p})]})]})}),(0,t.jsx)(n.Form.Item,{children:(0,t.jsx)(l.Button,{type:"primary",htmlType:"submit",children:"Submit"})})]})}])},897782,e=>{"use strict";var t=e.i(482791);e.s(["Form",()=>t.default])},975278,e=>{"use strict";var t=e.i(897826);e.s(["Input",()=>t.default])},894687,e=>{"use strict";var t=e.i(248460);e.s(["MinusCircleOutlined",()=>t.default])},360618,e=>{"use strict";var t=e.i(439214);e.s(["PlusOutlined",()=>t.default])}]);