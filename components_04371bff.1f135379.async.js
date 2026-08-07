(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,897782,e=>{"use strict";var t=e.i(482791);e.s(["Form",()=>t.default])},975278,e=>{"use strict";var t=e.i(897826);e.s(["Input",()=>t.default])},112914,e=>{"use strict";var t=e.i(453851);e.s(["Popconfirm",()=>t.default])},436580,e=>{"use strict";var t=e.i(391398),r=e.i(191788),a=e.i(183668),d=e.i(897782),n=e.i(975278),l=e.i(112914),i=e.i(504595);let o=(0,e.i(827830).createStyles)(e=>{let{css:t,cssVar:r}=e;return{editableRow:t`
      position: relative;
      .editable-cell-value-wrap {
        cursor: pointer;
        padding: ${r.paddingXXS} ${r.paddingSM};
        border-width: ${r.lineWidth};
        border-style: ${r.lineType};
        border-color: transparent;
        border-radius: ${r.borderRadiusSM};
        transition: all ${r.motionDurationFast} ${r.motionEaseInOut};
      }
      &:hover {
        .editable-cell-value-wrap {
          border-color: ${r.colorBorder};
        }
      }
    `}}),s=r.default.createContext(null),u=({index:e,...r})=>{let[a]=d.Form.useForm();return(0,t.jsx)(d.Form,{form:a,component:!1,children:(0,t.jsx)(s.Provider,{value:a,children:(0,t.jsx)("tr",{...r})})})},c=e=>{let{title:a,editable:l,children:i,dataIndex:o,record:u,handleSave:c,...m}=e,[p,b]=(0,r.useState)(!1),f=(0,r.useRef)(null),x=(0,r.useContext)(s);(0,r.useEffect)(()=>{p&&f.current?.focus()},[p]);let h=()=>{b(e=>!e),x.setFieldsValue({[o]:u[o]})},v=async()=>{try{let e=await x.validateFields();h(),c({...u,...e})}catch(e){console.log("Save failed:",e)}},g=i;return l&&(g=p?(0,t.jsx)(d.Form.Item,{style:{margin:0},name:o,rules:[{required:!0,message:`${a} is required.`}],children:(0,t.jsx)(n.Input,{ref:f,variant:"filled",onPressEnter:v,onBlur:v})}):(0,t.jsx)("div",{className:"editable-cell-value-wrap",style:{paddingInlineEnd:24},onClick:h,children:i})),(0,t.jsx)("td",{...m,children:g})};e.s(["default",0,()=>{let{styles:e}=o(),[d,n]=(0,r.useState)([{key:"0",name:"Edward King 0",age:"32",address:"London, Park Lane no. 0"},{key:"1",name:"Edward King 1",age:"32",address:"London, Park Lane no. 1"}]),[s,m]=(0,r.useState)(2),p=e=>{let t=[...d],r=t.findIndex(t=>e.key===t.key);if(-1!==r){let a=t[r];t.splice(r,1,{...a,...e}),n(t)}},b=[{title:"name",dataIndex:"name",width:"30%",editable:!0},{title:"age",dataIndex:"age"},{title:"address",dataIndex:"address"},{title:"operation",dataIndex:"operation",render:(e,r)=>d.length>=1?(0,t.jsx)(l.Popconfirm,{title:"Sure to delete?",onConfirm:()=>{var e;return e=r.key,void n(d.filter(t=>t.key!==e))},children:(0,t.jsx)("a",{children:"Delete"})}):null}].map(e=>e.editable?{...e,onCell:t=>({record:t,editable:e.editable,dataIndex:e.dataIndex,title:e.title,handleSave:p})}:e);return(0,t.jsxs)("div",{children:[(0,t.jsx)(a.Button,{onClick:()=>{n([...d,{key:s,name:`Edward King ${s}`,age:"32",address:`London, Park Lane no. ${s}`}]),m(e=>e+1)},type:"primary",style:{marginBottom:16},children:"Add a row"}),(0,t.jsx)(i.Table,{components:{body:{row:u,cell:c}},rowClassName:()=>e.editableRow,bordered:!0,dataSource:d,columns:b})]})}])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])}]);