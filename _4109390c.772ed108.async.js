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
  `}));e.s(["default",0,e=>{let{styles:l,theme:d}=r(),{value:i,children:s,enablePopover:c}=e,u=t.useMemo(()=>new n.FastColor(i).toHexString(),[i]),p=(0,a.jsxs)("span",{className:l.codeSpan,children:[(0,a.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,a.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,a.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:d.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(48750),o=e.i(883376),r=e.i(686111),l=e.i(606552),d=e.i(504909),i=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),m=e.i(632086),v=e.i(417546);let h=(e,a)=>{let t=e.toLowerCase().includes("color"),n=a.toLowerCase().includes("color");return t&&!n?-1:!t&&n?1:e<a?-1:1},g=(0,p.getDesignToken)(),k={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},f=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:$,comment:S}=e,[,C]=(0,x.default)(k),M=(0,u.useTheme)(),z=(0,m.useColumns)(),[w,L]=(0,t.useState)(p),{styles:O}=f(),R=(0,t.useMemo)(()=>{let e=$?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[$,S]);if(!y.length)return null;let D=y.sort($?void 0:h).map(e=>{let a=$?v.tokenMeta.components[$].find(a=>a.token===e):v.tokenMeta.global[e];return a?{name:e,desc:"cn"===C?a.desc:a.descEn,type:a.type,value:$?v.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:O.tableTitle,onClick:()=>L(e=>!e),children:[(0,a.jsx)(r.RightOutlined,{className:O.arrowIcon,rotate:90*!!w}),(0,a.jsxs)(d.Flex,{className:O.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,a.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,a.jsxs)(c.Typography,{children:[(0,a.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,a.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:R}})}),(0,a.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,a.jsxs)("span",{className:O.help,children:[(0,a.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),w&&(0,a.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,a.jsx)(s.Table,{size:"middle",columns:z,bordered:!0,dataSource:D,style:{marginBottom:M.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=t.default.memo(({component:e})=>{let[n]=(0,x.default)(k),o=(0,t.useMemo)(()=>{let{componentComment:e,globalComment:a}=n;return{componentComment:e,globalComment:a}},[n]),r=(0,t.useMemo)(()=>{let a=new Set;return e.split(",").forEach(e=>{let{global:t=[]}=v.tokenData[e]||{};t.forEach(e=>{a.add(e)})}),Array.from(a)},[e]);return(0,a.jsxs)(a.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,a.jsx)(y,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,a.jsx)(y,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["default",0,b])},720637,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(91595),o=e.i(771229),r=e.i(707065),l=e.i(183668),d=e.i(788296),i=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:a})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${a.margin};
    border-radius: ${a.borderRadiusLG};
  `}));var m=()=>(0,a.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=t.default.use(p.default),[v,h]=(0,u.default)(!1),g=t.default.useMemo(()=>e.reduce((e,a)=>{let{previewerProps:t}=a,{debug:n}=t;return n&&!I?e:e.concat({...a,previewerProps:{...t,expand:v,debug:!1,originDebug:n}})},[]),[v,e,I]);return(0,a.jsxs)("div",{className:"demo-wrapper",children:[(0,a.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,a.jsxs)("span",{className:"all-code-box-controls",children:[(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,a.jsx)(s.DumiDemoGrid,{items:g,demoRender:e=>(0,a.jsx)(t.Suspense,{fallback:(0,a.jsx)(m,{}),children:(0,a.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(504595),o=e.i(827830),r=e.i(964473),l=e.i(987058),d=e.i(464745),i=e.i(210336);function s(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,r.default)((0,r.default)({},d.default),t.token),o=null!=(e=t.algorithm)?e:l.default,s=Array.isArray(o)?o.reduce(function(e,a){return a(n,e)},void 0):o(n),c=(0,r.default)((0,r.default)((0,r.default)({},s),t.components),{},{override:null!=(a=t.token)?a:{}});return(0,i.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),m=e.i(973322),v=e.i(38415),h=e=>{let{controls:[n,o,r,l],width:d=180,height:i=d}=e,{token:s}=v.theme.useToken(),c=(e,a)=>"x"===a?e*d:i-e*i,u=d/5,p=(0,t.useId)();return(0,a.jsxs)("svg",{width:d,height:i,viewBox:`0 0 ${d} ${i}`,children:[(0,a.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,a.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,a.jsx)("path",{d:`
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
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,a.jsx)("circle",{cx:c(n,"x"),cy:c(o,"y"),r:"5",fill:s["red-6"]}),(0,a.jsx)("circle",{cx:c(r,"x"),cy:c(l,"y"),r:"5",fill:s["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,k={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var f=e=>{let{value:n}=e,[o]=(0,c.default)(k),r=(0,t.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return r?(0,a.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,a.jsx)(h,{controls:r}),(0,a.jsxs)(p.Flex,{align:"center",children:[(0,a.jsx)(x.Typography.Text,{children:n}),(0,a.jsx)(I.Tooltip,{title:o.open,children:(0,a.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,a.jsx)(m.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=s(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,o.createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
    border-radius: ${a.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,c.default)(T),{styles:t}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,a.jsx)("span",{className:t.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,t)=>"string"==typeof t.value&&(t.value.startsWith("#")||t.value.startsWith("rgb"))?(0,a.jsx)(y.default,{value:t.value,enablePopover:!0,children:t.value}):"string"==typeof t.value&&t.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,a.jsx)(f,{value:t.value}):"string"!=typeof t.value?JSON.stringify(t.value):t.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)(T),r=S(),l=t.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,a])=>a.source===e).map(([e,a])=>({name:e,desc:"cn"===o?a.desc:a.descEn,type:a.type,value:j[e]})),[e,o]);return(0,a.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var a=e.i(418031),t=e.i(353250);let n=a.default,o=t.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},396921,e=>{"use strict";e.s(["texts",0,[{value:"瀑布流布局组件，用于展示不同高度的内容。",paraId:0},{value:"展示不规则高度的图片或卡片时",paraId:1,tocIndex:0},{value:"需要按照列数均匀分布内容时",paraId:1,tocIndex:0},{value:"需要响应式调整列数时",paraId:1,tocIndex:0},{value:"通用属性参考：",paraId:2,tocIndex:8},{value:"通用属性",paraId:3,tocIndex:8},{value:"参数",paraId:4,tocIndex:9},{value:"说明",paraId:4,tocIndex:9},{value:"类型",paraId:4,tocIndex:9},{value:"默认值",paraId:4,tocIndex:9},{value:"版本",paraId:4,tocIndex:9},{value:"全局配置",paraId:5,tocIndex:9},{value:"classNames",paraId:4,tocIndex:9},{value:"用于自定义组件内部各语义化结构的 class，支持对象或函数",paraId:4,tocIndex:9},{value:"Record<",paraId:4,tocIndex:9},{value:"SemanticDOM",paraId:6,tocIndex:9},{value:", string> | (info: { props })=> Record<",paraId:4,tocIndex:9},{value:"SemanticDOM",paraId:7,tocIndex:9},{value:", string>",paraId:4,tocIndex:9},{value:"-",paraId:4,tocIndex:9},{value:"6.0.0",paraId:4,tocIndex:9},{value:"6.0.0",paraId:4,tocIndex:9},{value:"columns",paraId:4,tocIndex:9},{value:"列数，可以是固定值或响应式配置",paraId:4,tocIndex:9},{value:"number | { xs?: number; sm?: number; md?: number }",paraId:4,tocIndex:9},{value:"3",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"fresh",paraId:4,tocIndex:9},{value:"是否持续监听子项尺寸变化",paraId:4,tocIndex:9},{value:"boolean",paraId:4,tocIndex:9},{value:"false",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"gutter",paraId:4,tocIndex:9},{value:"间距，可以是固定值、响应式配置或水平垂直间距配置",paraId:4,tocIndex:9},{value:"Gap",paraId:8,tocIndex:9},{value:" | [",paraId:4,tocIndex:9},{value:"Gap",paraId:9,tocIndex:9},{value:", ",paraId:4,tocIndex:9},{value:"Gap",paraId:10,tocIndex:9},{value:"]",paraId:4,tocIndex:9},{value:"0",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"items",paraId:4,tocIndex:9},{value:"瀑布流项",paraId:4,tocIndex:9},{value:"MasonryItem",paraId:11,tocIndex:9},{value:"[]",paraId:4,tocIndex:9},{value:"-",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"itemRender",paraId:4,tocIndex:9},{value:"自定义项渲染",paraId:4,tocIndex:9},{value:"(item: MasonryItem) => React.ReactNode",paraId:4,tocIndex:9},{value:"-",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"styles",paraId:4,tocIndex:9},{value:"语义化结构 style，支持对象和函数形式",paraId:4,tocIndex:9},{value:"Record<",paraId:4,tocIndex:9},{value:"SemanticDOM",paraId:12,tocIndex:9},{value:", CSSProperties> | ((info: { props }) => Record<",paraId:4,tocIndex:9},{value:"SemanticDOM",paraId:13,tocIndex:9},{value:", CSSProperties>)",paraId:4,tocIndex:9},{value:"-",paraId:4,tocIndex:9},{value:"6.0.0",paraId:4,tocIndex:9},{value:"6.0.0",paraId:4,tocIndex:9},{value:"onLayoutChange",paraId:4,tocIndex:9},{value:"列排序回调",paraId:4,tocIndex:9},{value:"({ key: React.Key; column: number }[]) => void",paraId:4,tocIndex:9},{value:"-",paraId:4,tocIndex:9},{value:"×",paraId:4,tocIndex:9},{value:"参数",paraId:14,tocIndex:10},{value:"说明",paraId:14,tocIndex:10},{value:"类型",paraId:14,tocIndex:10},{value:"默认值",paraId:14,tocIndex:10},{value:"children",paraId:14,tocIndex:10},{value:"自定义展示内容，相对 ",paraId:14,tocIndex:10},{value:"itemRender",paraId:14,tocIndex:10},{value:" 具有更高优先级",paraId:14,tocIndex:10},{value:"React.ReactNode",paraId:14,tocIndex:10},{value:"-",paraId:14,tocIndex:10},{value:"column",paraId:14,tocIndex:10},{value:"自定义所在列",paraId:14,tocIndex:10},{value:"number",paraId:14,tocIndex:10},{value:"-",paraId:14,tocIndex:10},{value:"data",paraId:14,tocIndex:10},{value:"自定义存储数据",paraId:14,tocIndex:10},{value:"T",paraId:14,tocIndex:10},{value:"-",paraId:14,tocIndex:10},{value:"height",paraId:14,tocIndex:10},{value:"高度",paraId:14,tocIndex:10},{value:"number",paraId:14,tocIndex:10},{value:"-",paraId:14,tocIndex:10},{value:"key",paraId:14,tocIndex:10},{value:"唯一标识",paraId:14,tocIndex:10},{value:"string",paraId:14,tocIndex:10},{value:" | ",paraId:14,tocIndex:10},{value:"number",paraId:14,tocIndex:10},{value:"-",paraId:14,tocIndex:10},{value:"Gap 是项之间的间距，可以是固定值，也可以是响应式配置。",paraId:15,tocIndex:11},{value:"type Gap = undefined | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;\n",paraId:16,tocIndex:11}]])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])},48750,e=>{"use strict";var a=e.i(251062);e.s(["LinkOutlined",()=>a.default])},883376,e=>{"use strict";var a=e.i(513875);e.s(["QuestionCircleOutlined",()=>a.default])},686111,e=>{"use strict";var a=e.i(571246);e.s(["RightOutlined",()=>a.default])}]);