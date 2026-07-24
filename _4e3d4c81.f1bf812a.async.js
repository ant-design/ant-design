(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[a,n]=(0,t.useState)(...e);return[a,(...e)=>{(0,t.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(218589),o=e.i(831036);let r=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:l,theme:i}=r(),{value:d,children:s,enablePopover:c}=e,u=a.useMemo(()=>new n.FastColor(d).toHexString(),[d]),p=(0,t.jsxs)("span",{className:l.codeSpan,children:[(0,t.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,t.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:i.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(48750),o=e.i(883376),r=e.i(686111),l=e.i(606552),i=e.i(504909),d=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),x=e.i(470318);e.i(56925);var m=e.i(582225),I=e.i(632086),v=e.i(417546);let h=(e,t)=>{let a=e.toLowerCase().includes("color"),n=t.toLowerCase().includes("color");return a&&!n?-1:!a&&n?1:e<t?-1:1},g=(0,p.getDesignToken)(),k={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},f=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:$,comment:S}=e,[,C]=(0,m.default)(k),w=(0,u.useTheme)(),z=(0,I.useColumns)(),[M,O]=(0,a.useState)(p),{styles:L}=f(),N=(0,a.useMemo)(()=>{let e=$?`<ConfigProvider
  theme={{
    components: {
      ${$}: {
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
</ConfigProvider>`;return x.default.highlight(e,x.default.languages.jsx||x.default.languages.javascript,"jsx")},[$,S]);if(!y.length)return null;let D=y.sort($?void 0:h).map(e=>{let t=$?v.tokenMeta.components[$].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===C?t.desc:t.descEn,type:t.type,value:$?v.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:L.tableTitle,onClick:()=>O(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:L.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(i.Flex,{className:L.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(d.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:N}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:L.help,children:[(0,t.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,t.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(s.Table,{size:"middle",columns:z,bordered:!0,dataSource:D,style:{marginBottom:w.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=a.default.memo(({component:e})=>{let[n]=(0,m.default)(k),o=(0,a.useMemo)(()=>{let{componentComment:e,globalComment:t}=n;return{componentComment:e,globalComment:t}},[n]),r=(0,a.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:a=[]}=v.tokenData[e]||{};a.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(91595),o=e.i(771229),r=e.i(707065),l=e.i(183668),i=e.i(788296),d=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),x=e.i(741214);let m=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var I=()=>(0,t.jsx)(x.Skeleton.Node,{active:!0,className:m.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:x,setShowDebug:m}=a.default.use(p.default),[v,h]=(0,u.default)(!1),g=a.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:a}=t,{debug:n}=a;return n&&!x?e:e.concat({...t,previewerProps:{...a,expand:v,debug:!1,originDebug:n}})},[]),[v,e,x]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${x?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(i.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(i.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${x?"hide":"visible"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.BugOutlined,{}),onClick:()=>{m?.(!x)},className:x?"icon-enabled":""})})]}),(0,t.jsx)(s.DumiDemoGrid,{items:g,demoRender:e=>(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(I,{}),children:(0,t.jsx)(d.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(504595),o=e.i(827830),r=e.i(964473),l=e.i(987058),i=e.i(464745),d=e.i(210336);function s(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,r.default)((0,r.default)({},i.default),a.token),o=null!=(e=a.algorithm)?e:l.default,s=Array.isArray(o)?o.reduce(function(e,t){return t(n,e)},void 0):o(n),c=(0,r.default)((0,r.default)((0,r.default)({},s),a.components),{},{override:null!=(t=a.token)?t:{}});return(0,d.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),x=e.i(788296),m=e.i(974398),I=e.i(973322),v=e.i(38415),h=e=>{let{controls:[n,o,r,l],width:i=180,height:d=i}=e,{token:s}=v.theme.useToken(),c=(e,t)=>"x"===t?e*i:d-e*d,u=i/5,p=(0,a.useId)();return(0,t.jsxs)("svg",{width:i,height:d,viewBox:`0 0 ${i} ${d}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:s.colorBorderSecondary,strokeWidth:s.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${d}
          C ${c(n,"x")} ${c(o,"y")},
            ${c(r,"x")} ${c(l,"y")},
            ${i} 0
        `,fill:"none",stroke:s.colorPrimary,strokeWidth:2*s.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${d}
          L ${c(n,"x")} ${c(o,"y")}
          L ${c(r,"x")} ${c(l,"y")}
          L ${i} 0
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(n,"x"),cy:c(o,"y"),r:"5",fill:s["red-6"]}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(l,"y"),r:"5",fill:s["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,k={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var f=e=>{let{value:n}=e,[o]=(0,c.default)(k),r=(0,a.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(h,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(m.Typography.Text,{children:n}),(0,t.jsx)(x.Tooltip,{title:o.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(I.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=s(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,o.createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,c.default)(T),{styles:a}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,t.jsx)("span",{className:a.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,a)=>"string"==typeof a.value&&(a.value.startsWith("#")||a.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:a.value,enablePopover:!0,children:a.value}):"string"==typeof a.value&&a.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(f,{value:a.value}):"string"!=typeof a.value?JSON.stringify(a.value):a.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)(T),r=S(),l=a.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===o?t.desc:t.descEn,type:t.type,value:j[e]})),[e,o]);return(0,t.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var t=e.i(418031),a=e.i(353250);let n=t.default,o=a.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},674271,e=>{"use strict";e.s(["texts",0,[{value:"当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:12},{value:"通用属性",paraId:2,tocIndex:12},{value:"参数",paraId:3,tocIndex:12},{value:"说明",paraId:3,tocIndex:12},{value:"类型",paraId:3,tocIndex:12},{value:"默认值",paraId:3,tocIndex:12},{value:"版本",paraId:3,tocIndex:12},{value:"全局配置",paraId:4,tocIndex:12},{value:"classNames",paraId:3,tocIndex:12},{value:"自定义组件内部各语义化结构的类名。支持对象或函数",paraId:3,tocIndex:12},{value:"Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:5,tocIndex:12},{value:", string> | (info: { props }) => Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:6,tocIndex:12},{value:", string>",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"extra",paraId:3,tocIndex:12},{value:"操作区",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"icon",paraId:3,tocIndex:12},{value:"自定义 icon",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"status",paraId:3,tocIndex:12},{value:"结果的状态，决定图标和颜色",paraId:3,tocIndex:12},{value:"success",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"error",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"info",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"warning",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"404",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"403",paraId:3,tocIndex:12},{value:" | ",paraId:3,tocIndex:12},{value:"500",paraId:3,tocIndex:12},{value:"info",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"styles",paraId:3,tocIndex:12},{value:"自定义组件内部各语义化结构的内联样式。支持对象或函数",paraId:3,tocIndex:12},{value:"Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:7,tocIndex:12},{value:", CSSProperties> | (info: { props }) => Record<",paraId:3,tocIndex:12},{value:"SemanticDOM",paraId:8,tocIndex:12},{value:", CSSProperties>",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"6.0.0",paraId:3,tocIndex:12},{value:"subTitle",paraId:3,tocIndex:12},{value:"subTitle 文字",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12},{value:"title",paraId:3,tocIndex:12},{value:"title 文字",paraId:3,tocIndex:12},{value:"ReactNode",paraId:3,tocIndex:12},{value:"-",paraId:3,tocIndex:12},{value:"×",paraId:3,tocIndex:12}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);