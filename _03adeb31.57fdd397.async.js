(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[o,n]=(0,t.useState)(...e);return[o,(...e)=>{(0,t.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),o=e.i(191788),n=e.i(218589),a=e.i(831036);let i=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:o})=>({codeSpan:e`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${o.siteMarkdownCodeBg};
    border-radius: ${t.borderRadius};
    font-family: monospace;
  `,dot:e`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${t.marginXXS};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
  `}));e.s(["default",0,e=>{let{styles:r,theme:l}=i(),{value:s,children:d,enablePopover:c}=e,u=o.useMemo(()=>new n.FastColor(s).toHexString(),[s]),p=(0,t.jsxs)("span",{className:r.codeSpan,children:[(0,t.jsx)("span",{className:r.dot,style:{backgroundColor:u}}),d??u]});return c&&(p=(0,t.jsx)(a.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:l.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),o=e.i(191788),n=e.i(48750),a=e.i(883376),i=e.i(686111),r=e.i(606552),l=e.i(504909),s=e.i(831036),d=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),m=e.i(470318);e.i(56925);var x=e.i(582225),h=e.i(632086),v=e.i(417546);let g=(e,t)=>{let o=e.toLowerCase().includes("color"),n=t.toLowerCase().includes("color");return o&&!n?-1:!o&&n?1:e<t?-1:1},I=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:S,comment:C}=e,[,$]=(0,x.default)(f),z=(0,u.useTheme)(),M=(0,h.useColumns)(),[w,D]=(0,o.useState)(p),{styles:E}=k(),L=(0,o.useMemo)(()=>{let e=S?`<ConfigProvider
  theme={{
    components: {
      ${S}: {
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
</ConfigProvider>`;return m.default.highlight(e,m.default.languages.jsx||m.default.languages.javascript,"jsx")},[S,C]);if(!y.length)return null;let N=y.sort(S?void 0:g).map(e=>{let t=S?v.tokenMeta.components[S].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===$?t.desc:t.descEn,type:t.type,value:S?v.tokenData[S]?.component[e]:I[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:E.tableTitle,onClick:()=>D(e=>!e),children:[(0,t.jsx)(i.RightOutlined,{className:E.arrowIcon,rotate:90*!!w}),(0,t.jsxs)(l.Flex,{className:E.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(s.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:E.help,children:[(0,t.jsx)(a.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),w&&(0,t.jsx)(r.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(d.Table,{size:"middle",columns:M,bordered:!0,dataSource:N,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=o.default.memo(({component:e})=>{let[n]=(0,x.default)(f),a=(0,o.useMemo)(()=>{let{componentComment:e,globalComment:t}=n;return{componentComment:e,globalComment:t}},[n]),i=(0,o.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:o=[]}=v.tokenData[e]||{};o.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:a}),i.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:i,comment:a})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),o=e.i(191788),n=e.i(91595),a=e.i(771229),i=e.i(707065),r=e.i(183668),l=e.i(788296),s=e.i(624057),d=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),m=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var h=()=>(0,t.jsx)(m.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:m,setShowDebug:x}=o.default.use(p.default),[v,g]=(0,u.default)(!1),I=o.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:o}=t,{debug:n}=o;return n&&!m?e:e.concat({...t,previewerProps:{...o,expand:v,debug:!1,originDebug:n}})},[]),[v,e,m]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(i.Global,{styles:i.css`
          :root {
            --antd-site-api-deprecated-display: ${m?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(r.Button,{type:"text",size:"small",icon:(0,t.jsx)(a.CodeOutlined,{}),onClick:()=>{g(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${m?"hide":"visible"}`}),children:(0,t.jsx)(r.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!m)},className:m?"icon-enabled":""})})]}),(0,t.jsx)(d.DumiDemoGrid,{items:I,demoRender:e=>(0,t.jsx)(o.Suspense,{fallback:(0,t.jsx)(h,{}),children:(0,t.jsx)(s.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),o=e.i(191788),n=e.i(504595),a=e.i(827830),i=e.i(964473),r=e.i(987058),l=e.i(464745),s=e.i(210336);function d(){var e,t,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,i.default)((0,i.default)({},l.default),o.token),a=null!=(e=o.algorithm)?e:r.default,d=Array.isArray(a)?a.reduce(function(e,t){return t(n,e)},void 0):a(n),c=(0,i.default)((0,i.default)((0,i.default)({},d),o.components),{},{override:null!=(t=o.token)?t:{}});return(0,s.default)(c)}e.s(["getDesignToken",0,d],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),m=e.i(788296),x=e.i(974398),h=e.i(973322),v=e.i(38415),g=e=>{let{controls:[n,a,i,r],width:l=180,height:s=l}=e,{token:d}=v.theme.useToken(),c=(e,t)=>"x"===t?e*l:s-e*s,u=l/5,p=(0,o.useId)();return(0,t.jsxs)("svg",{width:l,height:s,viewBox:`0 0 ${l} ${s}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:d.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:d.colorBorderSecondary,strokeWidth:d.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          C ${c(n,"x")} ${c(a,"y")},
            ${c(i,"x")} ${c(r,"y")},
            ${l} 0
        `,fill:"none",stroke:d.colorPrimary,strokeWidth:2*d.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          L ${c(n,"x")} ${c(a,"y")}
          L ${c(i,"x")} ${c(r,"y")}
          L ${l} 0
        `,fill:"none",stroke:d.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:d.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(n,"x"),cy:c(a,"y"),r:"5",fill:d["red-6"]}),(0,t.jsx)("circle",{cx:c(i,"x"),cy:c(r,"y"),r:"5",fill:d["green-6"]})]})};let I=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[a]=(0,c.default)(f),i=(0,o.useMemo)(()=>{let e=I.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return i?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(g,{controls:i}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:n}),(0,t.jsx)(m.Tooltip,{title:a.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${i.join(",")}`,target:"_blank",icon:(0,t.jsx)(h.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=d(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},S=(0,a.createStyles)(({css:e,cssVar:t,token:o})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${o.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,c.default)(T),{styles:o}=S();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,t.jsx)("span",{className:o.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,o)=>"string"==typeof o.value&&(o.value.startsWith("#")||o.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:o.value,enablePopover:!0,children:o.value}):"string"==typeof o.value&&o.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:o.value}):"string"!=typeof o.value?JSON.stringify(o.value):o.value}]}e.s(["default",0,({type:e})=>{let[,a]=(0,c.default)(T),i=C(),r=o.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===a?t.desc:t.descEn,type:t.type,value:j[e]})),[e,a]);return(0,t.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:r,columns:i,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var t=e.i(418031),o=e.i(353250);let n=t.default,a=o.default;e.s(["tokenData",0,a,"tokenMeta",0,n])},432870,e=>{"use strict";e.s(["texts",0,[{value:"When there is no data provided, display for friendly tips.",paraId:0,tocIndex:0},{value:"User tutorial to create something in fresh new situation.",paraId:0,tocIndex:0},{value:"Common props ref：",paraId:1,tocIndex:8},{value:"Common props",paraId:2,tocIndex:8},{value:"<Empty>\n  <Button>Create</Button>\n</Empty>\n",paraId:3,tocIndex:8},{value:"Property",paraId:4,tocIndex:8},{value:"Description",paraId:4,tocIndex:8},{value:"Type",paraId:4,tocIndex:8},{value:"Default",paraId:4,tocIndex:8},{value:"Version",paraId:4,tocIndex:8},{value:"Global Config",paraId:5,tocIndex:8},{value:"classNames",paraId:4,tocIndex:8},{value:"Customize class for each semantic structure inside the component. Supports object or function.",paraId:4,tocIndex:8},{value:"Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:6,tocIndex:8},{value:", string> | (info: { props })=> Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:7,tocIndex:8},{value:", string>",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"5.23.0",paraId:4,tocIndex:8},{value:"description",paraId:4,tocIndex:8},{value:"Customize description",paraId:4,tocIndex:8},{value:"ReactNode",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"×",paraId:4,tocIndex:8},{value:"image",paraId:4,tocIndex:8},{value:"Customize image. Will treat as image url when string provided",paraId:4,tocIndex:8},{value:"ReactNode",paraId:4,tocIndex:8},{value:"Empty.PRESENTED_IMAGE_DEFAULT",paraId:4,tocIndex:8},{value:"5.27.0",paraId:4,tocIndex:8},{value:"imageStyle",paraId:4,tocIndex:8},{value:"The style of image, please use ",paraId:4,tocIndex:8},{value:"styles.image",paraId:4,tocIndex:8},{value:" instead",paraId:4,tocIndex:8},{value:"CSSProperties",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"×",paraId:4,tocIndex:8},{value:"styles",paraId:4,tocIndex:8},{value:"Customize inline style for each semantic structure inside the component. Supports object or function.",paraId:4,tocIndex:8},{value:"Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:8,tocIndex:8},{value:", CSSProperties> | (info: { props })=> Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:9,tocIndex:8},{value:", CSSProperties>",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"5.23.0",paraId:4,tocIndex:8},{value:"Empty.PRESENTED_IMAGE_SIMPLE",paraId:10,tocIndex:9},{value:"Empty.PRESENTED_IMAGE_DEFAULT",paraId:11,tocIndex:9}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);