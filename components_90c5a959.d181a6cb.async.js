(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,844678,69017,e=>{"use strict";var t=e.i(289473);e.s(["Col",()=>t.default],844678);var r=e.i(9292);e.s(["Row",()=>r.default],69017)},285710,e=>{"use strict";var t=e.i(391398),r=e.i(191788),o=e.i(844678),i=e.i(69017),n=e.i(530670);let a=(0,e.i(827830).createStyles)(e=>{let{css:t,cssVar:r}=e;return{colContainer:t`
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
    `}}),s={},l={},d={};[8,16,24,32,40,48].forEach((e,t)=>{s[t]=e}),[8,16,24,32,40,48].forEach((e,t)=>{l[t]=e}),[2,3,4,6,8,12].forEach((e,t)=>{d[t]=e}),e.s(["default",0,()=>{let{styles:e}=a(),[c,u]=(0,r.useState)(1),[h,p]=(0,r.useState)(1),[m,x]=(0,r.useState)(2),g=[],f=d[m],j="";for(let r=0;r<f;r++)g.push((0,t.jsx)(o.Col,{className:e.colContainer,span:24/f,children:(0,t.jsx)("div",{className:e.box,children:"Column"})},r.toString())),j+=`  <Col span={${24/f}} />
`;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:"Horizontal Gutter (px): "}),(0,t.jsx)("div",{style:{width:"50%"},children:(0,t.jsx)(n.Slider,{min:0,max:Object.keys(s).length-1,value:c,onChange:u,marks:s,step:null,tooltip:{formatter:e=>s[e]}})}),(0,t.jsx)("span",{children:"Vertical Gutter (px): "}),(0,t.jsx)("div",{style:{width:"50%"},children:(0,t.jsx)(n.Slider,{min:0,max:Object.keys(l).length-1,value:h,onChange:p,marks:l,step:null,tooltip:{formatter:e=>l[e]}})}),(0,t.jsx)("span",{children:"Column Count:"}),(0,t.jsx)("div",{style:{width:"50%",marginBottom:48},children:(0,t.jsx)(n.Slider,{min:0,max:Object.keys(d).length-1,value:m,onChange:x,marks:d,step:null,tooltip:{formatter:e=>d[e]}})}),(0,t.jsxs)(i.Row,{gutter:[s[c],l[h]],children:[g,g]}),"Another Row:",(0,t.jsx)(i.Row,{gutter:[s[c],l[h]],children:g}),(0,t.jsx)("pre",{className:e.code,children:`<Row gutter={[${s[c]}, ${l[h]}]}>
${j}
${j}</Row>`}),(0,t.jsx)("pre",{className:e.code,children:`<Row gutter={[${s[c]}, ${l[h]}]}>
${j}</Row>`})]})}])},530670,e=>{"use strict";var t=e.i(509753);e.s(["Slider",()=>t.default])}]);