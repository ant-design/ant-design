(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["f",0,(...e)=>{let[n,i]=(0,t.useState)(...e);return[n,(...e)=>{(0,t.startTransition)(()=>{i(...e)})}]}])},89562,e=>{"use strict";var t=e.i(391398),n=e.i(191788),i=e.i(99168);e.s(["f",0,e=>{let{component:o,...r}=e,s=i[o]??n.Fragment;return(0,t.jsx)(s,{...r})}])},758035,e=>{"use strict";var t=e.i(391398),n=e.i(191788),i=e.i(218589),o=e.i(831036);let r=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${n.siteMarkdownCodeBg};
    border-radius: ${t.borderRadius};
    font-family: monospace;
  `,dot:e`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${t.marginXXS};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
  `}));e.s(["f",0,e=>{let{styles:s,theme:l}=r(),{value:a,children:c,enablePopover:d}=e,u=n.useMemo(()=>new i.FastColor(a).toHexString(),[a]),m=(0,t.jsxs)("span",{className:s.codeSpan,children:[(0,t.jsx)("span",{className:s.dot,style:{backgroundColor:u}}),c??u]});return d&&(m=(0,t.jsx)(o.f,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:l.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:m})),m}])},742754,e=>{"use strict";var t=e.i(391398),n=e.i(191788),i=e.i(48750),o=e.i(883376),r=e.i(686111),s=e.i(606552),l=e.i(504909),a=e.i(831036),c=e.i(504595),d=e.i(974398),u=e.i(827830),m=e.i(750298),p=e.i(470318);e.i(56925);var f=e.i(582225),h=e.i(632086),x=e.i(417546);let g=(e,t)=>{let n=e.toLowerCase().includes("color"),i=t.toLowerCase().includes("color");return n&&!i?-1:!n&&i?1:e<t?-1:1},k=(0,m.f)(),y={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here are your component tokens",globalComment:"here are your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},j=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    margin-bottom: ${e.margin};
    gap: ${e.marginXS};
  `,arrowIcon:u.css`
    font-size: ${e.fontSizeLG};
    & svg {
      transition: all ${e.motionDurationSlow};
    }
  `,help:u.css`
    font-size: ${e.fontSizeSM};
    font-weight: normal;
    color: #999;
    a {
      color: #999;
    }
  `,tokenTitle:u.css`
    font-size: ${e.fontSizeLG};
    font-weight: bold;
  `})),b=e=>{let{defaultOpen:m=!0,tokens:b,title:v,helpText:$,helpLink:T,component:S,comment:z}=e,[,C]=(0,f.default)(y),w=(0,u.useTheme)(),L=(0,h.Y)(),[M,N]=(0,n.useState)(m),{styles:B}=j(),W=(0,n.useMemo)(()=>{let e=S?`<ConfigProvider
  theme={{
    components: {
      ${S}: {
        /* ${z?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`:`<ConfigProvider
  theme={{
    token: {
      /* ${z?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;return p.default.highlight(e,p.default.languages.jsx||p.default.languages.javascript,"jsx")},[S,z]);if(!b.length)return null;let O=b.sort(S?void 0:g).map(e=>{let t=S?x.B.components[S].find(t=>t.token===e):x.B.global[e];return t?{name:e,desc:"cn"===C?t.desc:t.descEn,type:t.type,value:S?x.A[S]?.component[e]:k[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:B.tableTitle,onClick:()=>N(e=>!e),children:[(0,t.jsx)(r.f,{className:B.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(l.f,{className:B.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[v,(0,t.jsx)(a.f,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(d.f,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:W}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(i.f,{style:{marginInlineEnd:4}}),$]})]}),children:(0,t.jsxs)("span",{className:B.help,children:[(0,t.jsx)(o.f,{style:{marginInlineEnd:4}}),$]})})]})]}),M&&(0,t.jsx)(s.f,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(c.f,{size:"middle",columns:L,bordered:!0,dataSource:O,style:{marginBottom:w.margin},pagination:!1,rowKey:e=>e.name})})]})};var v=n.default.memo(({component:e})=>{let[i]=(0,f.default)(y),o=(0,n.useMemo)(()=>{let{componentComment:e,globalComment:t}=i;return{componentComment:e,globalComment:t}},[i]),r=(0,n.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:n=[]}=x.A[e]||{};n.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[x.B.components[e]?.length>0&&(0,t.jsx)(b,{defaultOpen:!0,title:i.componentToken,helpText:i.help,helpLink:i.customizeTokenLink,tokens:x.B.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,t.jsx)(b,{defaultOpen:!0,title:i.globalToken,helpText:i.help,helpLink:i.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["f",0,v])},720637,e=>{"use strict";var t=e.i(391398),n=e.i(191788),i=e.i(91595),o=e.i(771229),r=e.i(707065),s=e.i(183668),l=e.i(788296),a=e.i(624057),c=e.i(797091),d=e.i(927298),u=e.i(564062),m=e.i(926602),p=e.i(741214);let f=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var h=()=>(0,t.jsx)(p.f.Node,{active:!0,className:f.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["f",0,({items:e})=>{let{showDebug:p,setShowDebug:f}=n.default.use(m.f),[x,g]=(0,u.f)(!1),k=n.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:n}=t,{debug:i}=n;return i&&!p?e:e.concat({...t,previewerProps:{...n,expand:x,debug:!1,originDebug:i}})},[]),[x,e,p]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.B,{styles:r.m`
          :root {
            --antd-site-api-deprecated-display: ${p?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(l.f,{title:(0,t.jsx)(d.f,{id:`app.component.examples.${x?"collapse":"expand"}`}),children:(0,t.jsx)(s.f,{type:"text",size:"small",icon:(0,t.jsx)(o.f,{}),onClick:()=>{g(!x)},className:x?"icon-enabled":""})}),(0,t.jsx)(l.f,{title:(0,t.jsx)(d.f,{id:`app.component.examples.${p?"hide":"visible"}`}),children:(0,t.jsx)(s.f,{type:"text",size:"small",icon:(0,t.jsx)(i.f,{}),onClick:()=>{f?.(!p)},className:p?"icon-enabled":""})})]}),(0,t.jsx)(c.f,{items:k,demoRender:e=>(0,t.jsx)(n.Suspense,{fallback:(0,t.jsx)(h,{}),children:(0,t.jsx)(a.f,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),n=e.i(191788),i=e.i(504595),o=e.i(827830),r=e.i(964473),s=e.i(987058),l=e.i(464745),a=e.i(210336);function c(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=(0,r.f)((0,r.f)({},l.default),n.token),o=null!=(e=n.algorithm)?e:s.default,c=Array.isArray(o)?o.reduce(function(e,t){return t(i,e)},void 0):o(i),d=(0,r.f)((0,r.f)((0,r.f)({},c),n.components),{},{override:null!=(t=n.token)?t:{}});return(0,a.default)(d)}e.s(["f",0,c],750298);var d=e.i(582225),u=e.i(183668),m=e.i(504909),p=e.i(788296),f=e.i(974398),h=e.i(973322),x=e.i(38415),g=e=>{let{controls:[i,o,r,s],width:l=180,height:a=l}=e,{token:c}=x.f.useToken(),d=(e,t)=>"x"===t?e*l:a-e*a,u=l/5,m=(0,n.useId)();return(0,t.jsxs)("svg",{width:l,height:a,viewBox:`0 0 ${l} ${a}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:c.colorBgContainer}),(0,t.jsx)("pattern",{id:m,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:c.colorBorderSecondary,strokeWidth:c.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${m})`}),(0,t.jsx)("path",{d:`
          M 0 ${a}
          C ${d(i,"x")} ${d(o,"y")},
            ${d(r,"x")} ${d(s,"y")},
            ${l} 0
        `,fill:"none",stroke:c.colorPrimary,strokeWidth:2*c.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${a}
          L ${d(i,"x")} ${d(o,"y")}
          L ${d(r,"x")} ${d(s,"y")}
          L ${l} 0
        `,fill:"none",stroke:c.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:c.controlOutlineWidth}),(0,t.jsx)("circle",{cx:d(i,"x"),cy:d(o,"y"),r:"5",fill:c["red-6"]}),(0,t.jsx)("circle",{cx:d(r,"x"),cy:d(s,"y"),r:"5",fill:c["green-6"]})]})};let k=/^cubic-bezier\((.*)\)$/,y={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var j=e=>{let{value:i}=e,[o]=(0,d.default)(y),r=(0,n.useMemo)(()=>{let e=k.exec(i.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[i]);return r?(0,t.jsxs)(m.f,{vertical:!0,gap:"small",children:[(0,t.jsx)(g,{controls:r}),(0,t.jsxs)(m.f,{align:"center",children:[(0,t.jsx)(f.f.Text,{children:i}),(0,t.jsx)(p.f,{title:o.open,children:(0,t.jsx)(u.f,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(h.f,{})})})]})]}):null},b=e.i(758035),v=e.i(417546);let $=c(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},S=(0,o.createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${n.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function z(){let[e]=(0,d.default)(T),{styles:n}=S();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,i)=>(0,t.jsx)("span",{className:n.codeSpan,children:i.type})},{title:e.value,key:"value",render:(e,n)=>"string"==typeof n.value&&(n.value.startsWith("#")||n.value.startsWith("rgb"))?(0,t.jsx)(b.f,{value:n.value,enablePopover:!0,children:n.value}):"string"==typeof n.value&&n.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(j,{value:n.value}):"string"!=typeof n.value?JSON.stringify(n.value):n.value}]}e.s(["U",0,({type:e})=>{let[,o]=(0,d.default)(T),r=z(),s=n.useMemo(()=>Object.entries(v.B.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===o?t.desc:t.descEn,type:t.type,value:$[e]})),[e,o]);return(0,t.jsx)(i.f,{bordered:!0,rowKey:e=>e.name,dataSource:s,columns:r,pagination:!1})},"Y",0,z],632086)},417546,e=>{"use strict";var t=e.i(418031),n=e.i(353250);let i=t.default,o=n.default;e.s(["A",0,o,"B",0,i])},504595,e=>{"use strict";var t=e.i(833663);e.s(["f",()=>t.f])},48750,e=>{"use strict";var t=e.i(251062);e.s(["f",()=>t.f])},883376,e=>{"use strict";var t=e.i(513875);e.s(["f",()=>t.f])},686111,e=>{"use strict";var t=e.i(571246);e.s(["f",()=>t.f])}]);