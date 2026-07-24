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
  `}));e.s(["default",0,e=>{let{styles:l,theme:d}=r(),{value:i,children:s,enablePopover:c}=e,u=a.useMemo(()=>new n.FastColor(i).toHexString(),[i]),p=(0,t.jsxs)("span",{className:l.codeSpan,children:[(0,t.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,t.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:d.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(48750),o=e.i(883376),r=e.i(686111),l=e.i(606552),d=e.i(504909),i=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),m=e.i(632086),v=e.i(417546);let h=(e,t)=>{let a=e.toLowerCase().includes("color"),n=t.toLowerCase().includes("color");return a&&!n?-1:!a&&n?1:e<t?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:$,component:T,comment:S}=e,[,C]=(0,x.default)(f),z=(0,u.useTheme)(),w=(0,m.useColumns)(),[M,N]=(0,a.useState)(p),{styles:O}=k(),L=(0,a.useMemo)(()=>{let e=T?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[T,S]);if(!y.length)return null;let D=y.sort(T?void 0:h).map(e=>{let t=T?v.tokenMeta.components[T].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===C?t.desc:t.descEn,type:t.type,value:T?v.tokenData[T]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:O.tableTitle,onClick:()=>N(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:O.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(d.Flex,{className:O.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:$,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:O.help,children:[(0,t.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,t.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(s.Table,{size:"middle",columns:w,bordered:!0,dataSource:D,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=a.default.memo(({component:e})=>{let[n]=(0,x.default)(f),o=(0,a.useMemo)(()=>{let{componentComment:e,globalComment:t}=n;return{componentComment:e,globalComment:t}},[n]),r=(0,a.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:a=[]}=v.tokenData[e]||{};a.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(91595),o=e.i(771229),r=e.i(707065),l=e.i(183668),d=e.i(788296),i=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var m=()=>(0,t.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=a.default.use(p.default),[v,h]=(0,u.default)(!1),g=a.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:a}=t,{debug:n}=a;return n&&!I?e:e.concat({...t,previewerProps:{...a,expand:v,debug:!1,originDebug:n}})},[]),[v,e,I]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(d.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(d.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,t.jsx)(s.DumiDemoGrid,{items:g,demoRender:e=>(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(m,{}),children:(0,t.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),a=e.i(191788),n=e.i(504595),o=e.i(827830),r=e.i(964473),l=e.i(987058),d=e.i(464745),i=e.i(210336);function s(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,r.default)((0,r.default)({},d.default),a.token),o=null!=(e=a.algorithm)?e:l.default,s=Array.isArray(o)?o.reduce(function(e,t){return t(n,e)},void 0):o(n),c=(0,r.default)((0,r.default)((0,r.default)({},s),a.components),{},{override:null!=(t=a.token)?t:{}});return(0,i.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),m=e.i(973322),v=e.i(38415),h=e=>{let{controls:[n,o,r,l],width:d=180,height:i=d}=e,{token:s}=v.theme.useToken(),c=(e,t)=>"x"===t?e*d:i-e*i,u=d/5,p=(0,a.useId)();return(0,t.jsxs)("svg",{width:d,height:i,viewBox:`0 0 ${d} ${i}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:s.colorBorderSecondary,strokeWidth:s.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${i}
          C ${c(n,"x")} ${c(o,"y")},
            ${c(r,"x")} ${c(l,"y")},
            ${d} 0
        `,fill:"none",stroke:s.colorPrimary,strokeWidth:2*s.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${i}
          L ${c(n,"x")} ${c(o,"y")}
          L ${c(r,"x")} ${c(l,"y")}
          L ${d} 0
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(n,"x"),cy:c(o,"y"),r:"5",fill:s["red-6"]}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(l,"y"),r:"5",fill:s["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[o]=(0,c.default)(f),r=(0,a.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(h,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:n}),(0,t.jsx)(I.Tooltip,{title:o.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(m.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=s(),$={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},T=(0,o.createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,c.default)($),{styles:a}=T();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,t.jsx)("span",{className:a.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,a)=>"string"==typeof a.value&&(a.value.startsWith("#")||a.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:a.value,enablePopover:!0,children:a.value}):"string"==typeof a.value&&a.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:a.value}):"string"!=typeof a.value?JSON.stringify(a.value):a.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)($),r=S(),l=a.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===o?t.desc:t.descEn,type:t.type,value:j[e]})),[e,o]);return(0,t.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var t=e.i(418031),a=e.i(353250);let n=t.default,o=a.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},728285,e=>{"use strict";e.s(["texts",0,[{value:"页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:11},{value:"通用属性",paraId:2,tocIndex:11},{value:"参数",paraId:3,tocIndex:11},{value:"说明",paraId:3,tocIndex:11},{value:"类型",paraId:3,tocIndex:11},{value:"默认值",paraId:3,tocIndex:11},{value:"版本",paraId:3,tocIndex:11},{value:"全局配置",paraId:4,tocIndex:11},{value:"classNames",paraId:3,tocIndex:11},{value:"用于自定义组件内部各语义化结构的 class，支持对象或函数",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:5,tocIndex:11},{value:", string> | (info: { props }) => Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:6,tocIndex:11},{value:", string>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"delay",paraId:3,tocIndex:11},{value:"延迟显示加载效果的时间（防止闪烁）",paraId:3,tocIndex:11},{value:"number (毫秒)",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"description",paraId:3,tocIndex:11},{value:"可以自定义描述文案",paraId:3,tocIndex:11},{value:"ReactNode",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.3.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"fullscreen",paraId:3,tocIndex:11},{value:"显示带有 ",paraId:3,tocIndex:11},{value:"Spin",paraId:3,tocIndex:11},{value:" 组件的背景",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"5.11.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"indicator",paraId:3,tocIndex:11},{value:"加载指示符",paraId:3,tocIndex:11},{value:"ReactNode",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"5.20.0",paraId:3,tocIndex:11},{value:"percent",paraId:3,tocIndex:11},{value:"展示进度，当设置 ",paraId:3,tocIndex:11},{value:'percent="auto"',paraId:3,tocIndex:11},{value:" 时会预估一个永远不会停止的进度",paraId:3,tocIndex:11},{value:"number | 'auto'",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"5.18.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"size",paraId:3,tocIndex:11},{value:"组件大小，可选值为 ",paraId:3,tocIndex:11},{value:"small",paraId:3,tocIndex:11},{value:" ",paraId:3,tocIndex:11},{value:"medium",paraId:3,tocIndex:11},{value:" ",paraId:3,tocIndex:11},{value:"large",paraId:3,tocIndex:11},{value:"string",paraId:3,tocIndex:11},{value:"medium",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"spinning",paraId:3,tocIndex:11},{value:"是否为加载中状态",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"true",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"styles",paraId:3,tocIndex:11},{value:"用于自定义组件内部各语义化结构的行内 style，支持对象或函数",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:7,tocIndex:11},{value:", CSSProperties> | (info: { props }) => Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:8,tocIndex:11},{value:", CSSProperties>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"tip",paraId:3,tocIndex:11},{value:"当作为包裹元素时，可以自定义描述文案。已废弃，请使用 ",paraId:3,tocIndex:11},{value:"description",paraId:3,tocIndex:11},{value:"ReactNode",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"wrapperClassName",paraId:3,tocIndex:11},{value:"包装器的类属性。已废弃，请使用 ",paraId:3,tocIndex:11},{value:"classNames.root",paraId:3,tocIndex:11},{value:"string",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"Spin.setDefaultIndicator(indicator: ReactNode)",paraId:9,tocIndex:12},{value:"你可以自定义全局默认 Spin 的元素。",paraId:10,tocIndex:12}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);