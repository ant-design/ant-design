(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[n,o]=(0,t.useState)(...e);return[n,(...e)=>{(0,t.startTransition)(()=>{o(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(218589),i=e.i(831036);let l=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:r,theme:s}=l(),{value:a,children:d,enablePopover:c}=e,u=n.useMemo(()=>new o.FastColor(a).toHexString(),[a]),m=(0,t.jsxs)("span",{className:r.codeSpan,children:[(0,t.jsx)("span",{className:r.dot,style:{backgroundColor:u}}),d??u]});return c&&(m=(0,t.jsx)(i.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:s.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:m})),m}])},742754,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(48750),i=e.i(883376),l=e.i(686111),r=e.i(606552),s=e.i(504909),a=e.i(831036),d=e.i(504595),c=e.i(974398),u=e.i(827830),m=e.i(750298),p=e.i(470318);e.i(56925);var h=e.i(582225),g=e.i(632086),x=e.i(417546);let k=(e,t)=>{let n=e.toLowerCase().includes("color"),o=t.toLowerCase().includes("color");return n&&!o?-1:!n&&o?1:e<t?-1:1},f=(0,m.getDesignToken)(),y={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},b=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),j=e=>{let{defaultOpen:m=!0,tokens:j,title:v,helpText:$,helpLink:T,component:C,comment:S}=e,[,z]=(0,h.default)(y),w=(0,u.useTheme)(),M=(0,g.useColumns)(),[L,O]=(0,n.useState)(m),{styles:N}=b(),D=(0,n.useMemo)(()=>{let e=C?`<ConfigProvider
  theme={{
    components: {
      ${C}: {
        /* ${S?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`:`<ConfigProvider
  theme={{
    token: {
      /* ${S?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;return p.default.highlight(e,p.default.languages.jsx||p.default.languages.javascript,"jsx")},[C,S]);if(!j.length)return null;let W=j.sort(C?void 0:k).map(e=>{let t=C?x.tokenMeta.components[C].find(t=>t.token===e):x.tokenMeta.global[e];return t?{name:e,desc:"cn"===z?t.desc:t.descEn,type:t.type,value:C?x.tokenData[C]?.component[e]:f[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:N.tableTitle,onClick:()=>O(e=>!e),children:[(0,t.jsx)(l.RightOutlined,{className:N.arrowIcon,rotate:90*!!L}),(0,t.jsxs)(s.Flex,{className:N.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[v,(0,t.jsx)(a.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:D}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(o.LinkOutlined,{style:{marginInlineEnd:4}}),$]})]}),children:(0,t.jsxs)("span",{className:N.help,children:[(0,t.jsx)(i.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),$]})})]})]}),L&&(0,t.jsx)(r.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(d.Table,{size:"middle",columns:M,bordered:!0,dataSource:W,style:{marginBottom:w.margin},pagination:!1,rowKey:e=>e.name})})]})};var v=n.default.memo(({component:e})=>{let[o]=(0,h.default)(y),i=(0,n.useMemo)(()=>{let{componentComment:e,globalComment:t}=o;return{componentComment:e,globalComment:t}},[o]),l=(0,n.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:n=[]}=x.tokenData[e]||{};n.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[x.tokenMeta.components[e]?.length>0&&(0,t.jsx)(j,{defaultOpen:!0,title:o.componentToken,helpText:o.help,helpLink:o.customizeTokenLink,tokens:x.tokenMeta.components[e].map(e=>e.token),component:e,comment:i}),l.length>0&&(0,t.jsx)(j,{defaultOpen:!0,title:o.globalToken,helpText:o.help,helpLink:o.customizeComponentTokenLink,tokens:l,comment:i})]})});e.s(["default",0,v])},720637,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(91595),i=e.i(771229),l=e.i(707065),r=e.i(183668),s=e.i(788296),a=e.i(624057),d=e.i(797091),c=e.i(927298),u=e.i(564062),m=e.i(926602),p=e.i(741214);let h=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var g=()=>(0,t.jsx)(p.Skeleton.Node,{active:!0,className:h.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:p,setShowDebug:h}=n.default.use(m.default),[x,k]=(0,u.default)(!1),f=n.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:n}=t,{debug:o}=n;return o&&!p?e:e.concat({...t,previewerProps:{...n,expand:x,debug:!1,originDebug:o}})},[]),[x,e,p]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(l.Global,{styles:l.css`
          :root {
            --antd-site-api-deprecated-display: ${p?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(s.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${x?"collapse":"expand"}`}),children:(0,t.jsx)(r.Button,{type:"text",size:"small",icon:(0,t.jsx)(i.CodeOutlined,{}),onClick:()=>{k(!x)},className:x?"icon-enabled":""})}),(0,t.jsx)(s.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${p?"hide":"visible"}`}),children:(0,t.jsx)(r.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.BugOutlined,{}),onClick:()=>{h?.(!p)},className:p?"icon-enabled":""})})]}),(0,t.jsx)(d.DumiDemoGrid,{items:f,demoRender:e=>(0,t.jsx)(n.Suspense,{fallback:(0,t.jsx)(g,{}),children:(0,t.jsx)(a.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(504595),i=e.i(827830),l=e.i(964473),r=e.i(987058),s=e.i(464745),a=e.i(210336);function d(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,l.default)((0,l.default)({},s.default),n.token),i=null!=(e=n.algorithm)?e:r.default,d=Array.isArray(i)?i.reduce(function(e,t){return t(o,e)},void 0):i(o),c=(0,l.default)((0,l.default)((0,l.default)({},d),n.components),{},{override:null!=(t=n.token)?t:{}});return(0,a.default)(c)}e.s(["getDesignToken",0,d],750298);var c=e.i(582225),u=e.i(183668),m=e.i(504909),p=e.i(788296),h=e.i(974398),g=e.i(973322),x=e.i(38415),k=e=>{let{controls:[o,i,l,r],width:s=180,height:a=s}=e,{token:d}=x.theme.useToken(),c=(e,t)=>"x"===t?e*s:a-e*a,u=s/5,m=(0,n.useId)();return(0,t.jsxs)("svg",{width:s,height:a,viewBox:`0 0 ${s} ${a}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:d.colorBgContainer}),(0,t.jsx)("pattern",{id:m,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:d.colorBorderSecondary,strokeWidth:d.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${m})`}),(0,t.jsx)("path",{d:`
          M 0 ${a}
          C ${c(o,"x")} ${c(i,"y")},
            ${c(l,"x")} ${c(r,"y")},
            ${s} 0
        `,fill:"none",stroke:d.colorPrimary,strokeWidth:2*d.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${a}
          L ${c(o,"x")} ${c(i,"y")}
          L ${c(l,"x")} ${c(r,"y")}
          L ${s} 0
        `,fill:"none",stroke:d.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:d.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(o,"x"),cy:c(i,"y"),r:"5",fill:d["red-6"]}),(0,t.jsx)("circle",{cx:c(l,"x"),cy:c(r,"y"),r:"5",fill:d["green-6"]})]})};let f=/^cubic-bezier\((.*)\)$/,y={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var b=e=>{let{value:o}=e,[i]=(0,c.default)(y),l=(0,n.useMemo)(()=>{let e=f.exec(o.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[o]);return l?(0,t.jsxs)(m.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(k,{controls:l}),(0,t.jsxs)(m.Flex,{align:"center",children:[(0,t.jsx)(h.Typography.Text,{children:o}),(0,t.jsx)(p.Tooltip,{title:i.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${l.join(",")}`,target:"_blank",icon:(0,t.jsx)(g.default,{})})})]})]}):null},j=e.i(758035),v=e.i(417546);let $=d(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},C=(0,i.createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${n.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,c.default)(T),{styles:n}=C();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,o)=>(0,t.jsx)("span",{className:n.codeSpan,children:o.type})},{title:e.value,key:"value",render:(e,n)=>"string"==typeof n.value&&(n.value.startsWith("#")||n.value.startsWith("rgb"))?(0,t.jsx)(j.default,{value:n.value,enablePopover:!0,children:n.value}):"string"==typeof n.value&&n.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(b,{value:n.value}):"string"!=typeof n.value?JSON.stringify(n.value):n.value}]}e.s(["default",0,({type:e})=>{let[,i]=(0,c.default)(T),l=S(),r=n.useMemo(()=>Object.entries(v.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===i?t.desc:t.descEn,type:t.type,value:$[e]})),[e,i]);return(0,t.jsx)(o.Table,{bordered:!0,rowKey:e=>e.name,dataSource:r,columns:l,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var t=e.i(418031),n=e.i(353250);let o=t.default,i=n.default;e.s(["tokenData",0,i,"tokenMeta",0,o])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);