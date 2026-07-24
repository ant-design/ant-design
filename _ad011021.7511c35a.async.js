(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[a,o]=(0,t.useState)(...e);return[a,(...e)=>{(0,t.startTransition)(()=>{o(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(218589),n=e.i(831036);let r=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border-radius: ${t.borderRadius};
    font-family: monospace;
  `,dot:e`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${t.marginXXS};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
  `}));e.s(["default",0,e=>{let{styles:i,theme:l}=r(),{value:s,children:d,enablePopover:c}=e,u=a.useMemo(()=>new o.FastColor(s).toHexString(),[s]),p=(0,t.jsxs)("span",{className:i.codeSpan,children:[(0,t.jsx)("span",{className:i.dot,style:{backgroundColor:u}}),d??u]});return c&&(p=(0,t.jsx)(n.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:l.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(48750),n=e.i(883376),r=e.i(686111),i=e.i(606552),l=e.i(504909),s=e.i(831036),d=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),m=e.i(470318);e.i(56925);var x=e.i(582225),I=e.i(632086),v=e.i(417546);let h=(e,t)=>{let a=e.toLowerCase().includes("color"),o=t.toLowerCase().includes("color");return a&&!o?-1:!a&&o?1:e<t?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:$,comment:C}=e,[,S]=(0,x.default)(f),z=(0,u.useTheme)(),w=(0,I.useColumns)(),[M,O]=(0,a.useState)(p),{styles:D}=k(),L=(0,a.useMemo)(()=>{let e=$?`<ConfigProvider
  theme={{
    components: {
      ${$}: {
        /* ${C?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`:`<ConfigProvider
  theme={{
    token: {
      /* ${C?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;return m.default.highlight(e,m.default.languages.jsx||m.default.languages.javascript,"jsx")},[$,C]);if(!y.length)return null;let N=y.sort($?void 0:h).map(e=>{let t=$?v.tokenMeta.components[$].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===S?t.desc:t.descEn,type:t.type,value:$?v.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:D.tableTitle,onClick:()=>O(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:D.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(l.Flex,{className:D.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(s.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(o.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:D.help,children:[(0,t.jsx)(n.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,t.jsx)(i.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(d.Table,{size:"middle",columns:w,bordered:!0,dataSource:N,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=a.default.memo(({component:e})=>{let[o]=(0,x.default)(f),n=(0,a.useMemo)(()=>{let{componentComment:e,globalComment:t}=o;return{componentComment:e,globalComment:t}},[o]),r=(0,a.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:a=[]}=v.tokenData[e]||{};a.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:o.componentToken,helpText:o.help,helpLink:o.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:n}),r.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:o.globalToken,helpText:o.help,helpLink:o.customizeComponentTokenLink,tokens:r,comment:n})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(91595),n=e.i(771229),r=e.i(707065),i=e.i(183668),l=e.i(788296),s=e.i(624057),d=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),m=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var I=()=>(0,t.jsx)(m.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:m,setShowDebug:x}=a.default.use(p.default),[v,h]=(0,u.default)(!1),g=a.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:a}=t,{debug:o}=a;return o&&!m?e:e.concat({...t,previewerProps:{...a,expand:v,debug:!1,originDebug:o}})},[]),[v,e,m]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${m?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(i.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${m?"hide":"visible"}`}),children:(0,t.jsx)(i.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.BugOutlined,{}),onClick:()=>{x?.(!m)},className:m?"icon-enabled":""})})]}),(0,t.jsx)(d.DumiDemoGrid,{items:g,demoRender:e=>(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(I,{}),children:(0,t.jsx)(s.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(504595),n=e.i(827830),r=e.i(964473),i=e.i(987058),l=e.i(464745),s=e.i(210336);function d(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,r.default)((0,r.default)({},l.default),a.token),n=null!=(e=a.algorithm)?e:i.default,d=Array.isArray(n)?n.reduce(function(e,t){return t(o,e)},void 0):n(o),c=(0,r.default)((0,r.default)((0,r.default)({},d),a.components),{},{override:null!=(t=a.token)?t:{}});return(0,s.default)(c)}e.s(["getDesignToken",0,d],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),m=e.i(788296),x=e.i(974398),I=e.i(973322),v=e.i(38415),h=e=>{let{controls:[o,n,r,i],width:l=180,height:s=l}=e,{token:d}=v.theme.useToken(),c=(e,t)=>"x"===t?e*l:s-e*s,u=l/5,p=(0,a.useId)();return(0,t.jsxs)("svg",{width:l,height:s,viewBox:`0 0 ${l} ${s}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:d.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:d.colorBorderSecondary,strokeWidth:d.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          C ${c(o,"x")} ${c(n,"y")},
            ${c(r,"x")} ${c(i,"y")},
            ${l} 0
        `,fill:"none",stroke:d.colorPrimary,strokeWidth:2*d.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          L ${c(o,"x")} ${c(n,"y")}
          L ${c(r,"x")} ${c(i,"y")}
          L ${l} 0
        `,fill:"none",stroke:d.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:d.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(o,"x"),cy:c(n,"y"),r:"5",fill:d["red-6"]}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(i,"y"),r:"5",fill:d["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:o}=e,[n]=(0,c.default)(f),r=(0,a.useMemo)(()=>{let e=g.exec(o.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[o]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(h,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:o}),(0,t.jsx)(m.Tooltip,{title:n.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(I.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=d(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,n.createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,c.default)(T),{styles:a}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,o)=>(0,t.jsx)("span",{className:a.codeSpan,children:o.type})},{title:e.value,key:"value",render:(e,a)=>"string"==typeof a.value&&(a.value.startsWith("#")||a.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:a.value,enablePopover:!0,children:a.value}):"string"==typeof a.value&&a.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:a.value}):"string"!=typeof a.value?JSON.stringify(a.value):a.value}]}e.s(["default",0,({type:e})=>{let[,n]=(0,c.default)(T),r=C(),i=a.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===n?t.desc:t.descEn,type:t.type,value:j[e]})),[e,n]);return(0,t.jsx)(o.Table,{bordered:!0,rowKey:e=>e.name,dataSource:i,columns:r,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var t=e.i(418031),a=e.i(353250);let o=t.default,n=a.default;e.s(["tokenData",0,n,"tokenMeta",0,o])},876297,e=>{"use strict";e.s(["texts",0,[{value:"Use when important operations need to inform the user to process the results and the feedback is more complicated.",paraId:0,tocIndex:0},{value:"Common props ref：",paraId:1,tocIndex:12},{value:"Common props",paraId:2,tocIndex:12},{value:"Property",paraId:3,tocIndex:12},{value:"Description",paraId:3,tocIndex:12},{value:"Type",paraId:3,tocIndex:12},{value:"Default",paraId:3,tocIndex:12},{value:"Version",paraId:3,tocIndex:12},{value:"Global Config",paraId:4,tocIndex:12},{value:"classNames",paraId:3,tocIndex:12},{value:"Customize class for each semantic structure inside the component. Supports object or function",paraId:3,tocIndex:12},{value:"Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:5,tocIndex:12},{value:", string> | (info: { props }) => Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:6,tocIndex:12},{value:", string>",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"extra",paraId:3,tocIndex:12},{value:"Operating area",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"icon",paraId:3,tocIndex:12},{value:"Custom back icon",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"status",paraId:3,tocIndex:12},{value:"Result status, decide icons and colors",paraId:3,tocIndex:12},{value:"success",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"error",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"info",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"warning",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"404",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"403",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"500",paraId:3,tocIndex:12},{value:"info",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"styles",paraId:3,tocIndex:12},{value:"Customize inline style for each semantic structure inside the component. Supports object or function",paraId:3,tocIndex:12},{value:"Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:7,tocIndex:12},{value:", CSSProperties> | (info: { props }) => Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:8,tocIndex:12},{value:", CSSProperties>",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"subTitle",paraId:3,tocIndex:12},{value:"The subTitle",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"title",paraId:3,tocIndex:12},{value:"The title",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);