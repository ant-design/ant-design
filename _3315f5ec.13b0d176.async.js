(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,238922,e=>{"use strict";var n=e.i(391398),i=e.i(191788),r=e.i(827830),t=e.i(687800),s=e.i(582225);let a=(0,r.createStaticStyles)(({css:e,cssVar:n})=>({container:e`
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
  `})),o={cn:{MVPPurpose:"MVP 行为目的",extensionPurpose:"拓展行为目的",behaviorMap:"行为模式地图"},en:{MVPPurpose:"MVP behavior purpose",extensionPurpose:"Extension behavior purpose",behaviorMap:"Behavior Map"}};e.s(["default",0,({data:r})=>{let d=(0,i.useRef)(null),[l]=(0,s.default)(o),c=(0,t.useRouteMeta)(),u=(0,i.useMemo)(()=>{let e,n;return(e=[]).push("graph LR"),e.push("classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px"),(n=(i,r)=>{let t=`node_${i.id.replace(/[^a-z0-9]/gi,"_")}`,s=i.label.replace(/"/g,"'");r?"mvp"===i.targetType?s=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${s}`:"extension"===i.targetType&&(s=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-inline-end:8px;vertical-align:middle;"></span>${s}`):(e.push(`style ${t} font-size:16px`),s=`**${s}**`),e.push(`${t}["${s}"]:::baseNode`),i.link&&e.push(`click ${t} "#${i.link}"`),r&&e.push(`${r} --> ${t}`),i.children&&i.children.length>0&&i.children.forEach(e=>{n(e,t)})})(r),e.join("\n")},[r]),p=(0,i.useRef)(!1);return(0,i.useEffect)(()=>(p.current=!1,(async()=>{if(d.current&&u)try{let n=(await e.A(692041)).default;if(p.current)return;n.initialize({startOnLoad:!1,theme:"base",securityLevel:"strict",flowchart:{htmlLabels:!0,curve:"linear",rankSpacing:150,nodeSpacing:10}});let i=`mermaid-${Date.now()}`,{svg:r}=await n.render(i,u);!p.current&&d.current&&(d.current.innerHTML=r)}catch{!p.current&&d.current&&(d.current.innerHTML="Render Error")}})(),()=>{p.current=!0}),[u]),(0,n.jsxs)("div",{className:a.container,children:[(0,n.jsx)("div",{className:a.title,children:`${c.frontmatter.title} ${l.behaviorMap}`}),(0,n.jsx)("div",{ref:d,className:a.chartContainer}),(0,n.jsxs)("div",{className:a.tips,children:[(0,n.jsx)("div",{className:a.mvp,children:l.MVPPurpose}),(0,n.jsx)("div",{className:a.extension,children:l.extensionPurpose})]})]})}],238922)},692041,e=>{e.v(n=>Promise.all(["node_modules_fd25e27e.29f9f826.async.js","node_modules_8a010589.072c149b.async.js","node_modules_mermaid_dist_chunks_mermaid_core_f417175a.f086a9d1.async.js","node_modules_mermaid_dist_5d96b85d.782b6a38.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-WYO6CB5R_mjs_5aae8062.25aa137d.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-ZGVPDNZ5_mjs_5182927e.26270d72.async.js","node_modules_093c2281.420215c8.async.js","node_modules_8e748179.bd1faf5c.async.js","node_modules_mermaid_dist_chunks_mermaid_core_chunk-ZIRB5QZD_mjs_32b428b6.81b10567.async.js"].map(n=>e.l(n))).then(()=>n(139691)))}]);