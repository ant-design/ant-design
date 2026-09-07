(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,844678,69017,e=>{"use strict";var t=e.i(289473);e.s(["f",()=>t.f],844678);var r=e.i(9292);e.s(["f",()=>r.f],69017)},285710,e=>{"use strict";var t=e.i(391398),r=e.i(191788),o=e.i(844678),n=e.i(69017),s=e.i(530670);let i=(0,e.i(827830).createStyles)(e=>{let{css:t,cssVar:r}=e;return{colContainer:t`
      border: 0;
      padding-block: 0 !important;
      background-color: transparent !important;
    `,box:t`
      height: 120px;
      font-size: ${r.fontSize};
      line-height: 120px;
      background-color: #0092ff;
      border-radius: ${r.borderRadiusSM};
    `,code:t`
      direction: ltr;
      padding: ${r.paddingXS} ${r.padding};
      font-size: ${r.fontSize};
      background-color: #f9f9f9;
      border-radius: ${r.borderRadius};
    `}}),a={},l={},d={};[8,16,24,32,40,48].forEach((e,t)=>{a[t]=e}),[8,16,24,32,40,48].forEach((e,t)=>{l[t]=e}),[2,3,4,6,8,12].forEach((e,t)=>{d[t]=e}),e.s(["default",0,()=>{let{styles:e}=i(),[c,u]=(0,r.useState)(1),[h,f]=(0,r.useState)(1),[p,m]=(0,r.useState)(2),x=[],g=d[p],j="";for(let r=0;r<g;r++)x.push((0,t.jsx)(o.f,{className:e.colContainer,span:24/g,children:(0,t.jsx)("div",{className:e.box,children:"Column"})},r.toString())),j+=`  <Col span={${24/g}} />
`;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:"Horizontal Gutter (px): "}),(0,t.jsx)("div",{style:{width:"50%"},children:(0,t.jsx)(s.f,{min:0,max:Object.keys(a).length-1,value:c,onChange:u,marks:a,step:null,tooltip:{formatter:e=>a[e]}})}),(0,t.jsx)("span",{children:"Vertical Gutter (px): "}),(0,t.jsx)("div",{style:{width:"50%"},children:(0,t.jsx)(s.f,{min:0,max:Object.keys(l).length-1,value:h,onChange:f,marks:l,step:null,tooltip:{formatter:e=>l[e]}})}),(0,t.jsx)("span",{children:"Column Count:"}),(0,t.jsx)("div",{style:{width:"50%",marginBottom:48},children:(0,t.jsx)(s.f,{min:0,max:Object.keys(d).length-1,value:p,onChange:m,marks:d,step:null,tooltip:{formatter:e=>d[e]}})}),(0,t.jsxs)(n.f,{gutter:[a[c],l[h]],children:[x,x]}),"Another Row:",(0,t.jsx)(n.f,{gutter:[a[c],l[h]],children:x}),(0,t.jsx)("pre",{className:e.code,children:`<Row gutter={[${a[c]}, ${l[h]}]}>
${j}
${j}</Row>`}),(0,t.jsx)("pre",{className:e.code,children:`<Row gutter={[${a[c]}, ${l[h]}]}>
${j}</Row>`})]})}])},530670,e=>{"use strict";var t=e.i(509753);e.s(["f",()=>t.f])}]);