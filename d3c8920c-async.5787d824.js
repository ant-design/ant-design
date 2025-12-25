(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["d3c8920c"],{"6074743a":function(e,r,i){"use strict";i.d(r,"__esModule",{value:!0}),i.d(r,"useMermaidCode",{enumerable:!0,get:function(){return t;}});var n=i("5b220c3d");let t=e=>{let r=e=>{let r=[];r.push("graph LR"),r.push("classDef baseNode fill:#fff,stroke:none,stroke-width:0px,rx:5,ry:5,font-size:14px");let i=(e,n)=>{let t=`node_${e.id.replace(/[^a-z0-9]/gi,"_")}`,a=e.label.replace(/"/g,"'");n?"mvp"===e.targetType?a=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(22, 119, 255);border-radius:50%;margin-right:8px;vertical-align:middle;"></span>${a}`:"extension"===e.targetType&&(a=`<span style="display:inline-block;width:8px;height:8px;background-color:rgb(160, 160, 160);border-radius:50%;margin-right:8px;vertical-align:middle;"></span>${a}`):(r.push(`style ${t} font-size:16px`),a=`**${a}**`),r.push(`${t}["${a}"]:::baseNode`),e.link&&r.push(`click ${t} "#${e.link}"`),n&&r.push(`${n} --> ${t}`),e.children&&e.children.length>0&&e.children.forEach(e=>i(e,t));};return i(e),r.join("\n");};return(0,n.useMemo)(()=>r(e),[e]);};},d3c8920c:function(e,r,i){"use strict";var n=i("852bbaa9")._;i.d(r,"__esModule",{value:!0}),i.d(r,"default",{enumerable:!0,get:function(){return h;}});var t=i("777fffbe"),a=i("f19d2b93"),s=i("5b220c3d"),o=i("3835a2b7"),l=i("9c86e52a"),d=t._(i("23546486")),c=i("6074743a");let u=(0,o.createStyles)(({cssVar:e})=>({container:(0,o.css)`
    width: 100%;
    min-height: 600px;
    height: fit-content;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: ${e.borderRadiusLG};
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,chartContainer:(0,o.css)`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    > svg {
      margin: auto;
    }
  `,title:(0,o.css)`
    position: absolute;
    top: 20px;
    inset-inline-start: 20px;
    font-size: ${e.fontSizeLG};
    z-index: 10;
  `,tips:(0,o.css)`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
    z-index: 10;
    border-radius: 4px;
    font-size: 14px;
  `,mvp:(0,o.css)`
    margin-inline-end: ${e.marginMD};
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS};
      background-color: rgb(22, 119, 255);
      border-radius: 50%;
      content: '';
    }
  `,extension:(0,o.css)`
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS};
      background-color: rgb(160, 160, 160);
      border-radius: 50%;
      content: '';
    }
  `})),p={cn:{MVPPurpose:"MVP \u884C\u4E3A\u76EE\u7684",extensionPurpose:"\u62D3\u5C55\u884C\u4E3A\u76EE\u7684",behaviorMap:"\u884C\u4E3A\u6A21\u5F0F\u5730\u56FE"},en:{MVPPurpose:"MVP behavior purpose",extensionPurpose:"Extension behavior purpose",behaviorMap:"Behavior Map"}};var h=({data:e})=>{let r=(0,s.useRef)(null),{styles:t}=u(),[o]=(0,d.default)(p),h=(0,l.useRouteMeta)(),b=(0,c.useMermaidCode)(e);return(0,s.useEffect)(()=>{let e=!1;return(async()=>{if(r.current&&b)try{let t=(await Promise.all([i.ensure("vendors_0"),i.ensure("2bf1ac51")]).then(i.dr(n,i.bind(i,"2bf1ac51")))).default;if(e)return;t.initialize({startOnLoad:!1,theme:"base",securityLevel:"strict",flowchart:{htmlLabels:!0,curve:"linear",rankSpacing:150,nodeSpacing:10}});let a=`mermaid-${Date.now()}-1`,{svg:s}=await t.render(a,b);!e&&r.current&&(r.current.innerHTML=s);}catch(i){!e&&r.current&&(console.error("Mermaid render error:",i),r.current.innerHTML="Render Error");}})(),()=>{e=!0;};},[b]),(0,a.jsxs)("div",{className:t.container,children:[(0,a.jsx)("div",{className:t.title,children:`${h.frontmatter.title} ${o.behaviorMap}`}),(0,a.jsx)("div",{ref:r,className:t.chartContainer}),(0,a.jsxs)("div",{className:t.tips,children:[(0,a.jsx)("div",{className:t.mvp,children:o.MVPPurpose}),(0,a.jsx)("div",{className:t.extension,children:o.extensionPurpose})]})]});};}}]);