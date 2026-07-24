(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,751879,e=>{"use strict";var t=e.i(391398);e.i(191788);var n=e.i(876591),s=e.i(54899);let r=(0,e.i(827830).createStyles)(e=>{let{prefixCls:t,css:n}=e;return{events:n`
      margin: 0;
      padding: 0;
      list-style: none;
      .${t}-badge-status {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,notesMonth:n`
      font-size: 28px;
      text-align: center;
      section {
        font-size: 28px;
      }
    `}});e.s(["default",0,()=>{let{styles:e}=r();return(0,t.jsx)(s.Calendar,{cellRender:(s,r)=>{if("date"===r.type){let r;return r=(e=>{let t=[];switch(e.date()){case 8:t=[{type:"warning",content:"This is warning event."},{type:"success",content:"This is usual event."}];break;case 10:t=[{type:"warning",content:"This is warning event."},{type:"success",content:"This is usual event."},{type:"error",content:"This is error event."}];break;case 15:t=[{type:"warning",content:"This is warning event"},{type:"success",content:"This is very long usual event......"},{type:"error",content:"This is error event 1."},{type:"error",content:"This is error event 2."},{type:"error",content:"This is error event 3."},{type:"error",content:"This is error event 4."}]}return t||[]})(s),(0,t.jsx)("ul",{className:e.events,children:r.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)(n.Badge,{status:e.type,text:e.content})},e.content))})}if("month"===r.type){let n;return(n=(e=>{if(8===e.month())return 1394})(s))?(0,t.jsxs)("div",{className:e.notesMonth,children:[(0,t.jsx)("section",{children:n}),(0,t.jsx)("span",{children:"Backlog number"})]}):null}return r.originNode}})}])},54899,e=>{"use strict";var t=e.i(745970);e.s(["Calendar",()=>t.default])}]);