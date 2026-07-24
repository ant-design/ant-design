(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,974327,e=>{"use strict";var t=e.i(391398);e.i(191788);var a=e.i(504595);let d=(0,e.i(827830).createStyles)(({css:e,token:t})=>{let{antCls:a}=t;return{customTable:e`
      ${a}-table {
        ${a}-table-container {
          ${a}-table-body,
          ${a}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `}}),n=[{title:"Name",dataIndex:"name",key:"name",width:100,fixed:"start",filters:[{text:"Joe",value:"Joe"},{text:"John",value:"John"}],onFilter:(e,t)=>0===t.name.indexOf(e)},{title:"Other",children:[{title:"Age",dataIndex:"age",key:"age",width:150,sorter:(e,t)=>e.age-t.age},{title:"Address",children:[{title:"Street",dataIndex:"street",key:"street",width:150},{title:"Block",children:[{title:"Building",dataIndex:"building",key:"building",width:100},{title:"Door No.",dataIndex:"number",key:"number",width:100}]}]}]},{title:"Company",children:[{title:"Company Address",dataIndex:"companyAddress",key:"companyAddress",width:200},{title:"Company Name",dataIndex:"companyName",key:"companyName"}]},{title:"Gender",dataIndex:"gender",key:"gender",width:80,fixed:"end"}],r=Array.from({length:100}).map((e,t)=>({key:t,name:"John Brown",age:t+1,street:"Lake Park",building:"C",number:2035,companyAddress:"Lake Street 42",companyName:"SoftLake Co",gender:"M"}));e.s(["default",0,()=>{let{styles:e}=d();return(0,t.jsx)(a.Table,{className:e.customTable,columns:n,dataSource:r,bordered:!0,size:"medium",scroll:{x:"calc(700px + 50%)",y:235}})}])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])}]);