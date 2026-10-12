(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,238922,e=>{"use strict";var i=e.i(391398),n=e.i(191788),r=e.i(827830),s=e.i(687800),t=e.i(582225);let a=(0,r.createStaticStyles)(({css:e,cssVar:i})=>({container:e`
    width: 100%;
    min-height: 600px;
    height: fit-content;
    background-color: ${i.colorBgLayout};
    border: 1px solid #e8e8e8;
    border-radius: ${i.borderRadiusLG};
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,chartContainer:e`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    > svg {
      margin: auto;
    }
  `,title:e`
    position: absolute;
    top: 20px;
    inset-inline-start: 20px;
    font-size: ${i.fontSizeLG};
    z-index: 10;
  `,tips:e`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
    z-index: 10;
    border-radius: 4px;
    font-size: ${i.fontSize};
  `,mvp:e`
    margin-inline-end: ${i.marginMD};
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${i.marginXS};
      background-color: rgb(22, 119, 255);
      border-radius: 50%;
      content: '';
    }
  `,extension:e`
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${i.marginXS};
      background-color: rgb(160, 160, 160);
      border-radius: 50%;
      content: '';
    }
  `})),o={cn:{MVPPurpose:"MVP 行为目的",extensionPurpose:"拓展行为目的",behaviorMap:"行为模式地图"},en:{MVPPurpose:"MVP behavior purpose",extensionPurpose:"Extension behavior purpose",behaviorMap:"Behavior Map"}};e.s(["default",0,({data:r})=>{let d=(0,n.useRef)(null),[l]=(0,t.default)(o),c=(0,s.T)(),u=(0,n.useMemo)(()=>{let e,i;return(e=[]).push("graph LR"),e.push("classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px"),(i=(n,r)=>{let s=`node_${n.id.replace(/[^a-z0-9]/gi,"_")}`,t=n.label.replace(/"/g,"'");r?"mvp"===n.targetType?t=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${t}`:"extension"===n.targetType&&(t=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${t}`):(e.push(`style ${s} font-size:16px`),t=`**${t}**`),e.push(`${s}["${t}"]:::baseNode`),n.link&&e.push(`click ${s} "#${n.link}"`),r&&e.push(`${r} --> ${s}`),n.children&&n.children.length>0&&n.children.forEach(e=>{i(e,s)})})(r),e.join("\n")},[r]),p=(0,n.useRef)(!1);return(0,n.useEffect)(()=>(p.current=!1,(async()=>{if(d.current&&u)try{let i=(await e.A(692041)).default;if(p.current)return;i.initialize({startOnLoad:!1,theme:"base",securityLevel:"strict",flowchart:{htmlLabels:!0,curve:"linear",rankSpacing:150,nodeSpacing:10}});let n=`mermaid-${Date.now()}`,{svg:r}=await i.render(n,u);!p.current&&d.current&&(d.current.innerHTML=r)}catch{!p.current&&d.current&&(d.current.innerHTML="Render Error")}})(),()=>{p.current=!0}),[u]),(0,i.jsxs)("div",{className:a.container,children:[(0,i.jsx)("div",{className:a.title,children:`${c.frontmatter.title} ${l.behaviorMap}`}),(0,i.jsx)("div",{ref:d,className:a.chartContainer}),(0,i.jsxs)("div",{className:a.tips,children:[(0,i.jsx)("div",{className:a.mvp,children:l.MVPPurpose}),(0,i.jsx)("div",{className:a.extension,children:l.extensionPurpose})]})]})}],238922)},692041,e=>{e.v(i=>Promise.all(["node_modules_1nizg0jea7i8v.b44aa156.async.js","node_modules_0kk6dotz6tfcp.caf3a3a4.async.js","node_modules_164nij8-2amqs.c9375716.async.js","node_modules_mermaid_dist_chunks_mermaid_core_1s98u1ffiaw2b.e82c1a69.async.js","node_modules_mermaid_dist_0d1p0velzcz61.d6e7da25.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-LNGE3PJU_mjs_20dg6lyeiat2r.2effb046.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-E2ZNV5FY_mjs_1cuw03b-bzsd4.dcd43610.async.js","node_modules_041dzgf85kjyo.f45329cd.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-XC4XBNZT_mjs_0iotbvn2u6peb.72a0877b.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-VPRB5NB3_mjs_1rlgpwwi_xhqc.3339c112.async.js"].map(i=>e.l(i))).then(()=>i(139691)))}]);