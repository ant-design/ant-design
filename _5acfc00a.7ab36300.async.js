(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var a=e.i(191788);e.s(["default",0,(...e)=>{let[t,n]=(0,a.useState)(...e);return[t,(...e)=>{(0,a.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(218589),o=e.i(831036);let r=(0,e.i(827830).createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border-radius: ${a.borderRadius};
    font-family: monospace;
  `,dot:e`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${a.marginXXS};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
  `}));e.s(["default",0,e=>{let{styles:l,theme:d}=r(),{value:i,children:s,enablePopover:c}=e,u=t.useMemo(()=>new n.FastColor(i).toHexString(),[i]),p=(0,a.jsxs)("span",{className:l.codeSpan,children:[(0,a.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,a.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,a.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:d.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(48750),o=e.i(883376),r=e.i(686111),l=e.i(606552),d=e.i(504909),i=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),v=e.i(632086),m=e.i(417546);let h=(e,a)=>{let t=e.toLowerCase().includes("color"),n=a.toLowerCase().includes("color");return t&&!n?-1:!t&&n?1:e<a?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:$,component:T,comment:S}=e,[,C]=(0,x.default)(f),z=(0,u.useTheme)(),M=(0,v.useColumns)(),[w,O]=(0,t.useState)(p),{styles:L}=k(),D=(0,t.useMemo)(()=>{let e=T?`<ConfigProvider
  theme={{
    components: {
      ${T}: {
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[T,S]);if(!y.length)return null;let N=y.sort(T?void 0:h).map(e=>{let a=T?m.tokenMeta.components[T].find(a=>a.token===e):m.tokenMeta.global[e];return a?{name:e,desc:"cn"===C?a.desc:a.descEn,type:a.type,value:T?m.tokenData[T]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:L.tableTitle,onClick:()=>O(e=>!e),children:[(0,a.jsx)(r.RightOutlined,{className:L.arrowIcon,rotate:90*!!w}),(0,a.jsxs)(d.Flex,{className:L.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,a.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,a.jsxs)(c.Typography,{children:[(0,a.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,a.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:D}})}),(0,a.jsxs)("a",{href:$,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,a.jsxs)("span",{className:L.help,children:[(0,a.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),w&&(0,a.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,a.jsx)(s.Table,{size:"middle",columns:M,bordered:!0,dataSource:N,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=t.default.memo(({component:e})=>{let[n]=(0,x.default)(f),o=(0,t.useMemo)(()=>{let{componentComment:e,globalComment:a}=n;return{componentComment:e,globalComment:a}},[n]),r=(0,t.useMemo)(()=>{let a=new Set;return e.split(",").forEach(e=>{let{global:t=[]}=m.tokenData[e]||{};t.forEach(e=>{a.add(e)})}),Array.from(a)},[e]);return(0,a.jsxs)(a.Fragment,{children:[m.tokenMeta.components[e]?.length>0&&(0,a.jsx)(y,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:m.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,a.jsx)(y,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["default",0,b])},720637,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(91595),o=e.i(771229),r=e.i(707065),l=e.i(183668),d=e.i(788296),i=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:a})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${a.margin};
    border-radius: ${a.borderRadiusLG};
  `}));var v=()=>(0,a.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=t.default.use(p.default),[m,h]=(0,u.default)(!1),g=t.default.useMemo(()=>e.reduce((e,a)=>{let{previewerProps:t}=a,{debug:n}=t;return n&&!I?e:e.concat({...a,previewerProps:{...t,expand:m,debug:!1,originDebug:n}})},[]),[m,e,I]);return(0,a.jsxs)("div",{className:"demo-wrapper",children:[(0,a.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,a.jsxs)("span",{className:"all-code-box-controls",children:[(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${m?"collapse":"expand"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!m)},className:m?"icon-enabled":""})}),(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,a.jsx)(s.DumiDemoGrid,{items:g,demoRender:e=>(0,a.jsx)(t.Suspense,{fallback:(0,a.jsx)(v,{}),children:(0,a.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(504595),o=e.i(827830),r=e.i(964473),l=e.i(987058),d=e.i(464745),i=e.i(210336);function s(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,r.default)((0,r.default)({},d.default),t.token),o=null!=(e=t.algorithm)?e:l.default,s=Array.isArray(o)?o.reduce(function(e,a){return a(n,e)},void 0):o(n),c=(0,r.default)((0,r.default)((0,r.default)({},s),t.components),{},{override:null!=(a=t.token)?a:{}});return(0,i.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),v=e.i(973322),m=e.i(38415),h=e=>{let{controls:[n,o,r,l],width:d=180,height:i=d}=e,{token:s}=m.theme.useToken(),c=(e,a)=>"x"===a?e*d:i-e*i,u=d/5,p=(0,t.useId)();return(0,a.jsxs)("svg",{width:d,height:i,viewBox:`0 0 ${d} ${i}`,children:[(0,a.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,a.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,a.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:s.colorBorderSecondary,strokeWidth:s.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          C ${c(n,"x")} ${c(o,"y")},
            ${c(r,"x")} ${c(l,"y")},
            ${d} 0
        `,fill:"none",stroke:s.colorPrimary,strokeWidth:2*s.controlOutlineWidth}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          L ${c(n,"x")} ${c(o,"y")}
          L ${c(r,"x")} ${c(l,"y")}
          L ${d} 0
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,a.jsx)("circle",{cx:c(n,"x"),cy:c(o,"y"),r:"5",fill:s["red-6"]}),(0,a.jsx)("circle",{cx:c(r,"x"),cy:c(l,"y"),r:"5",fill:s["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[o]=(0,c.default)(f),r=(0,t.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return r?(0,a.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,a.jsx)(h,{controls:r}),(0,a.jsxs)(p.Flex,{align:"center",children:[(0,a.jsx)(x.Typography.Text,{children:n}),(0,a.jsx)(I.Tooltip,{title:o.open,children:(0,a.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,a.jsx)(v.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=s(),$={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},T=(0,o.createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
    border-radius: ${a.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,c.default)($),{styles:t}=T();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,a.jsx)("span",{className:t.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,t)=>"string"==typeof t.value&&(t.value.startsWith("#")||t.value.startsWith("rgb"))?(0,a.jsx)(y.default,{value:t.value,enablePopover:!0,children:t.value}):"string"==typeof t.value&&t.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,a.jsx)(k,{value:t.value}):"string"!=typeof t.value?JSON.stringify(t.value):t.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)($),r=S(),l=t.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,a])=>a.source===e).map(([e,a])=>({name:e,desc:"cn"===o?a.desc:a.descEn,type:a.type,value:j[e]})),[e,o]);return(0,a.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var a=e.i(418031),t=e.i(353250);let n=a.default,o=t.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},280223,e=>{"use strict";e.s(["texts",0,[{value:"对不同章节的文本段落进行分割。",paraId:0,tocIndex:0},{value:"对行内文字/链接进行分割，例如表格的操作列。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:11},{value:"通用属性",paraId:2,tocIndex:11},{value:"参数",paraId:3,tocIndex:11},{value:"说明",paraId:3,tocIndex:11},{value:"类型",paraId:3,tocIndex:11},{value:"默认值",paraId:3,tocIndex:11},{value:"版本",paraId:3,tocIndex:11},{value:"全局配置",paraId:4,tocIndex:11},{value:"children",paraId:3,tocIndex:11},{value:"嵌套的标题",paraId:3,tocIndex:11},{value:"ReactNode",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"classNames",paraId:3,tocIndex:11},{value:"用于自定义组件内部各语义化结构的 class，支持对象或函数",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:5,tocIndex:11},{value:", string> | (info: { props })=> Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:6,tocIndex:11},{value:", string>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"dashed",paraId:3,tocIndex:11},{value:"是否虚线",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"orientation",paraId:3,tocIndex:11},{value:"水平或垂直类型",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"orientationMargin",paraId:3,tocIndex:11},{value:"标题和最近 left/right 边框之间的距离，去除了分割线，同时 ",paraId:3,tocIndex:11},{value:"titlePlacement",paraId:3,tocIndex:11},{value:" 不能为 ",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:"。如果传入 ",paraId:3,tocIndex:11},{value:"string",paraId:3,tocIndex:11},{value:" 类型的数字且不带单位，默认单位是 px",paraId:3,tocIndex:11},{value:"string | number",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"plain",paraId:3,tocIndex:11},{value:"文字是否显示为普通正文样式",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"4.2.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"styles",paraId:3,tocIndex:11},{value:"用于自定义组件内部各语义化结构的行内 style，支持对象或函数",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:7,tocIndex:11},{value:", CSSProperties> | (info: { props })=> Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:8,tocIndex:11},{value:", CSSProperties>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"size",paraId:3,tocIndex:11},{value:"间距大小，仅对水平布局有效",paraId:3,tocIndex:11},{value:"small",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"medium",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"large",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"5.25.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"titlePlacement",paraId:3,tocIndex:11},{value:"分割线标题的位置",paraId:3,tocIndex:11},{value:"start",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"end",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"type",paraId:3,tocIndex:11},{value:"水平还是垂直类型",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"variant",paraId:3,tocIndex:11},{value:"分割线是虚线、点线还是实线",paraId:3,tocIndex:11},{value:"dashed",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"dotted",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"solid",paraId:3,tocIndex:11},{value:"solid",paraId:3,tocIndex:11},{value:"5.20.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"是否垂直，和 orientation 同时配置以 orientation 优先",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11}]])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])},48750,e=>{"use strict";var a=e.i(251062);e.s(["LinkOutlined",()=>a.default])},883376,e=>{"use strict";var a=e.i(513875);e.s(["QuestionCircleOutlined",()=>a.default])},686111,e=>{"use strict";var a=e.i(571246);e.s(["RightOutlined",()=>a.default])}]);