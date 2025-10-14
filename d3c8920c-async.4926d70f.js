(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["d3c8920c"],{aa27d056:function(e,t,r){"use strict";r.d(t,"__esModule",{value:!0}),r.d(t,"renderReactToHTMLString",{enumerable:!0,get:function(){return a;}});var n=r("537ebc91"),i=r("b1104263");let a=e=>{let t=document.createElement("div"),r=(0,i.createRoot)(t);(0,n.flushSync)(()=>{r.render(e);});let a=t.innerHTML;return r.unmount(),a;};},d3c8920c:function(e,t,r){"use strict";var n=r("852bbaa9")._;r.d(t,"__esModule",{value:!0}),r.d(t,"default",{enumerable:!0,get:function(){return g;}});var i=r("777fffbe"),a=r("f19d2b93"),o=r("5b220c3d"),s=r("e22febe0"),l=r("a9d1a279"),d=r("3835a2b7"),c=r("9c86e52a"),h=i._(r("23546486")),u=r("aa27d056");let p=e=>{let t=(e,r=0)=>{let n={...e};switch(r){case 0:n.type="behavior-start-node";break;case 1:n.type="behavior-sub-node",n.collapsed=!0;break;default:n.type="behavior-sub-node";}return Array.isArray(e.children)&&(n.children=e.children.map(e=>t(e,r+1))),n;};return t(e);},f=(0,d.createStyles)(({token:e})=>({container:(0,d.css)`
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: ${e.borderRadiusLG}px;
    overflow: hidden;
    position: relative;
  `,title:(0,d.css)`
    position: absolute;
    top: 20px;
    inset-inline-start: 20px;
    font-size: ${e.fontSizeLG}px;
  `,tips:(0,d.css)`
    display: flex;
    position: absolute;
    bottom: 20px;
    inset-inline-end: 20px;
  `,mvp:(0,d.css)`
    margin-inline-end: ${e.marginMD}px;
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS}px;
      background-color: #1677ff;
      border-radius: 50%;
      content: '';
    }
  `,extension:(0,d.css)`
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS}px;
      background-color: #a0a0a0;
      border-radius: 50%;
      content: '';
    }
  `})),b={cn:{MVPPurpose:"MVP \u884C\u4E3A\u76EE\u7684",extensionPurpose:"\u62D3\u5C55\u884C\u4E3A\u76EE\u7684",behaviorMap:"\u884C\u4E3A\u6A21\u5F0F\u5730\u56FE"},en:{MVPPurpose:"MVP behavior purpose",extensionPurpose:"Extension behavior purpose",behaviorMap:"Behavior Map"}};var g=({data:e})=>{let t=(0,o.useRef)(null),{styles:i}=f(),[d]=(0,h.default)(b),g=(0,c.useRouteMeta)();return(0,o.useEffect)(()=>{Promise.all([r.ensure("vendors_2"),r.ensure("vendors_0"),r.ensure("vendors_1"),r.ensure("143b1800")]).then(r.dr(n,r.bind(r,"143b1800"))).then(r=>{r.registerNode("behavior-start-node",{draw:(e,t)=>{let n=[r.Util.getTextSize(e.label,16)[0]+40,48],i=t.addShape("rect",{name:"start-node",attrs:{width:n[0],height:n[1],y:-n[1]/2,radius:8,fill:"#fff"}});return t.addShape("text",{attrs:{text:`${e.label}`,fill:"rgba(0, 0, 0, 0.88)",fontSize:16,fontWeight:500,x:20,textBaseline:"middle"},name:"start-node-text"}),i;},getAnchorPoints:()=>[[0,.5],[1,.5]]}),r.registerNode("behavior-sub-node",{draw:(e,t)=>{let n=[r.Util.getTextSize(e.label,14)[0]+32+(e.targetType?12:0)+(e.link?20:0),40],i=t.addShape("rect",{name:"sub-node",attrs:{width:n[0],height:n[1],y:-n[1]/2,radius:8,fill:"#fff",cursor:"pointer"}});if(t.addShape("text",{attrs:{text:`${e.label}`,x:e.targetType?28:16,fill:"rgba(0, 0, 0, 0.88)",fontSize:14,textBaseline:"middle",cursor:"pointer"},name:"sub-node-text"}),e.targetType&&t.addShape("rect",{name:"sub-node-type",attrs:{width:8,height:8,radius:4,y:-4,x:12,fill:"mvp"===e.targetType?"#1677ff":"#A0A0A0",cursor:"pointer"}}),e.children){let{length:i}=e.children;t.addShape("rect",{name:"sub-node-children-length",attrs:{width:20,height:20,radius:10,y:-10,x:n[0]-4,fill:"#404040",cursor:"pointer"}}),t.addShape("text",{name:"sub-node-children-length-text",attrs:{text:`${i}`,x:n[0]+6-r.Util.getTextSize(`${i}`,12)[0]/2,textBaseline:"middle",fill:"#fff",fontSize:12,cursor:"pointer"}});}return e.link&&t.addShape("dom",{attrs:{width:16,height:16,x:n[0]-12-16,y:-8,cursor:"pointer",html:(0,u.renderReactToHTMLString)((0,a.jsx)(l.Flex,{align:"center",justify:"center",children:(0,a.jsx)(s.RightCircleOutlined,{style:{color:"#BFBFBF"}})}))},name:"sub-node-link"}),i;},getAnchorPoints:()=>[[0,.5],[1,.5]],options:{stateStyles:{hover:{stroke:"#1677ff","sub-node-link":{html:(0,u.renderReactToHTMLString)((0,a.jsx)(l.Flex,{align:"center",justify:"center",children:(0,a.jsx)(s.RightCircleOutlined,{style:{color:"#1677ff"}})}))}}}}},"rect");let n=new r.TreeGraph({container:t.current,width:t.current.scrollWidth,height:t.current.scrollHeight,renderer:"svg",modes:{default:["collapse-expand","drag-canvas"]},defaultEdge:{type:"cubic-horizontal",style:{lineWidth:1,stroke:"#BFBFBF"}},layout:{type:"mindmap",direction:"LR",getHeight:()=>48,getWidth:e=>r.Util.getTextSize(e.label,16)[0]+40,getVGap:()=>10,getHGap:()=>60,getSide:e=>e.data.direction}});n.on("node:mouseenter",e=>{n.setItemState(e.item,"hover",!0);}),n.on("node:mouseleave",e=>{n.setItemState(e.item,"hover",!1);}),n.on("node:click",e=>{let{link:t}=e.item.getModel();t&&(window.location.hash=t);}),n.data(p(e)),n.render(),n.fitCenter();});},[]),(0,a.jsxs)("div",{ref:t,className:i.container,children:[(0,a.jsx)("div",{className:i.title,children:`${g.frontmatter.title} ${d.behaviorMap}`}),(0,a.jsxs)("div",{className:i.tips,children:[(0,a.jsx)("div",{className:i.mvp,children:d.MVPPurpose}),(0,a.jsx)("div",{className:i.extension,children:d.extensionPurpose})]})]});};}}]);