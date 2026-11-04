(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,238922,e=>{"use strict";var n=e.i(391398),i=e.i(191788),r=e.i(827830),s=e.i(687800),t=e.i(582225);let a=(0,r.l)(({css:e,cssVar:n})=>({container:e`
    width: 100%;
    min-height: 600px;
    height: fit-content;
    background-color: ${n.colorBgLayout};
    border: 1px solid #e8e8e8;
    border-radius: ${n.borderRadiusLG};
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
    font-size: ${n.fontSizeLG};
    z-index: 10;
  `,tips:e`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
    z-index: 10;
    border-radius: 4px;
    font-size: ${n.fontSize};
  `,mvp:e`
    margin-inline-end: ${n.marginMD};
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${n.marginXS};
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
      margin-inline-end: ${n.marginXS};
      background-color: rgb(160, 160, 160);
      border-radius: 50%;
      content: '';
    }
  `})),o={cn:{MVPPurpose:"MVP 行为目的",extensionPurpose:"拓展行为目的",behaviorMap:"行为模式地图"},en:{MVPPurpose:"MVP behavior purpose",extensionPurpose:"Extension behavior purpose",behaviorMap:"Behavior Map"}};e.s(["default",0,({data:r})=>{let d=(0,i.useRef)(null),[l]=(0,t.default)(o),c=(0,s.T)(),u=(0,i.useMemo)(()=>{let e,n;return(e=[]).push("graph LR"),e.push("classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px"),(n=(i,r)=>{let s=`node_${i.id.replace(/[^a-z0-9]/gi,"_")}`,t=i.label.replace(/"/g,"'");r?"mvp"===i.targetType?t=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${t}`:"extension"===i.targetType&&(t=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${t}`):(e.push(`style ${s} font-size:16px`),t=`**${t}**`),e.push(`${s}["${t}"]:::baseNode`),i.link&&e.push(`click ${s} "#${i.link}"`),r&&e.push(`${r} --> ${s}`),i.children&&i.children.length>0&&i.children.forEach(e=>{n(e,s)})})(r),e.join("\n")},[r]),h=(0,i.useRef)(!1);return(0,i.useEffect)(()=>(h.current=!1,(async()=>{if(d.current&&u)try{let n=(await e.A(692041)).default;if(h.current)return;n.initialize({startOnLoad:!1,theme:"base",securityLevel:"strict",flowchart:{htmlLabels:!0,curve:"linear",rankSpacing:150,nodeSpacing:10}});let i=`mermaid-${Date.now()}`,{svg:r}=await n.render(i,u);!h.current&&d.current&&(d.current.innerHTML=r)}catch{!h.current&&d.current&&(d.current.innerHTML="Render Error")}})(),()=>{h.current=!0}),[u]),(0,n.jsxs)("div",{className:a.container,children:[(0,n.jsx)("div",{className:a.title,children:`${c.frontmatter.title} ${l.behaviorMap}`}),(0,n.jsx)("div",{ref:d,className:a.chartContainer}),(0,n.jsxs)("div",{className:a.tips,children:[(0,n.jsx)("div",{className:a.mvp,children:l.MVPPurpose}),(0,n.jsx)("div",{className:a.extension,children:l.extensionPurpose})]})]})}],238922)},692041,e=>{e.v(n=>Promise.all(["node_modules_0j35gyvga25a5.20506a60.async.js","node_modules_1hyzs6yj6kho3.bc66f578.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-DQASFODM_mjs_11wiycul_r1kg.3a9ffe4e.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-STOXU5M4_mjs_0zujldgz_ysso.d65c2e5a.async.js","node_modules_13y7j4biyhsb9.b3ed4594.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-HPSUCWAI_mjs_0wwxr8gr0ianc.a0999d1e.async.js","node_modules_0itpn825e0chk.4a8bbf8a.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-BG4553SI_mjs_001o-hvbt_c5x.482e7763.async.js","node_modules_mermaid_dist_1trwry1eepe_s.4030fea1.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-AXFCVDMN_mjs_0lhd1li6htmhk.bc28fb34.async.js"].map(n=>e.l(n))).then(()=>n(139691)))}]);