(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,58804,e=>{"use strict";var a=e.i(391398);e.i(191788);var t=e.i(504595);let l=(0,e.i(827830).createStyles)(({css:e,token:a})=>{let{antCls:t}=a;return{customTable:e`
      ${t}-table {
        ${t}-table-container {
          ${t}-table-body,
          ${t}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `}}),r=[{title:"Name",dataIndex:"name",width:150},{title:"Age",dataIndex:"age",width:150},{title:"Address",dataIndex:"address"}],n=Array.from({length:100}).map((e,a)=>({key:a,name:`Edward King ${a}`,age:32,address:`London, Park Lane no. ${a}`}));e.s(["default",0,()=>{let{styles:e}=l();return(0,a.jsx)(t.Table,{className:e.customTable,columns:r,dataSource:n,pagination:{pageSize:50},scroll:{y:275}})}])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])}]);