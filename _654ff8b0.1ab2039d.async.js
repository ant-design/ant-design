(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var a=e.i(191788);e.s(["default",0,(...e)=>{let[t,n]=(0,a.useState)(...e);return[t,(...e)=>{(0,a.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(218589),o=e.i(831036);let d=(0,e.i(827830).createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:l,theme:r}=d(),{value:i,children:c,enablePopover:s}=e,u=t.useMemo(()=>new n.FastColor(i).toHexString(),[i]),p=(0,a.jsxs)("span",{className:l.codeSpan,children:[(0,a.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),c??u]});return s&&(p=(0,a.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,a.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:r.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(48750),o=e.i(883376),d=e.i(686111),l=e.i(606552),r=e.i(504909),i=e.i(831036),c=e.i(504595),s=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),v=e.i(632086),m=e.i(417546);let h=(e,a)=>{let t=e.toLowerCase().includes("color"),n=a.toLowerCase().includes("color");return t&&!n?-1:!t&&n?1:e<a?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),b=e=>{let{defaultOpen:p=!0,tokens:b,title:y,helpText:j,helpLink:T,component:$,comment:S}=e,[,C]=(0,x.default)(f),z=(0,u.useTheme)(),w=(0,v.useColumns)(),[M,O]=(0,t.useState)(p),{styles:L}=k(),N=(0,t.useMemo)(()=>{let e=$?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[$,S]);if(!b.length)return null;let D=b.sort($?void 0:h).map(e=>{let a=$?m.tokenMeta.components[$].find(a=>a.token===e):m.tokenMeta.global[e];return a?{name:e,desc:"cn"===C?a.desc:a.descEn,type:a.type,value:$?m.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:L.tableTitle,onClick:()=>O(e=>!e),children:[(0,a.jsx)(d.RightOutlined,{className:L.arrowIcon,rotate:90*!!M}),(0,a.jsxs)(r.Flex,{className:L.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[y,(0,a.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,a.jsxs)(s.Typography,{children:[(0,a.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,a.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:N}})}),(0,a.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,a.jsxs)("span",{className:L.help,children:[(0,a.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,a.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,a.jsx)(c.Table,{size:"middle",columns:w,bordered:!0,dataSource:D,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var y=t.default.memo(({component:e})=>{let[n]=(0,x.default)(f),o=(0,t.useMemo)(()=>{let{componentComment:e,globalComment:a}=n;return{componentComment:e,globalComment:a}},[n]),d=(0,t.useMemo)(()=>{let a=new Set;return e.split(",").forEach(e=>{let{global:t=[]}=m.tokenData[e]||{};t.forEach(e=>{a.add(e)})}),Array.from(a)},[e]);return(0,a.jsxs)(a.Fragment,{children:[m.tokenMeta.components[e]?.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:m.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),d.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:d,comment:o})]})});e.s(["default",0,y])},720637,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(91595),o=e.i(771229),d=e.i(707065),l=e.i(183668),r=e.i(788296),i=e.i(624057),c=e.i(797091),s=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:a})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${a.margin};
    border-radius: ${a.borderRadiusLG};
  `}));var v=()=>(0,a.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=t.default.use(p.default),[m,h]=(0,u.default)(!1),g=t.default.useMemo(()=>e.reduce((e,a)=>{let{previewerProps:t}=a,{debug:n}=t;return n&&!I?e:e.concat({...a,previewerProps:{...t,expand:m,debug:!1,originDebug:n}})},[]),[m,e,I]);return(0,a.jsxs)("div",{className:"demo-wrapper",children:[(0,a.jsx)(d.Global,{styles:d.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,a.jsxs)("span",{className:"all-code-box-controls",children:[(0,a.jsx)(r.Tooltip,{title:(0,a.jsx)(s.FormattedMessage,{id:`app.component.examples.${m?"collapse":"expand"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!m)},className:m?"icon-enabled":""})}),(0,a.jsx)(r.Tooltip,{title:(0,a.jsx)(s.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,a.jsx)(l.Button,{type:"text",size:"small",icon:(0,a.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,a.jsx)(c.DumiDemoGrid,{items:g,demoRender:e=>(0,a.jsx)(t.Suspense,{fallback:(0,a.jsx)(v,{}),children:(0,a.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(504595),o=e.i(827830),d=e.i(964473),l=e.i(987058),r=e.i(464745),i=e.i(210336);function c(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,d.default)((0,d.default)({},r.default),t.token),o=null!=(e=t.algorithm)?e:l.default,c=Array.isArray(o)?o.reduce(function(e,a){return a(n,e)},void 0):o(n),s=(0,d.default)((0,d.default)((0,d.default)({},c),t.components),{},{override:null!=(a=t.token)?a:{}});return(0,i.default)(s)}e.s(["getDesignToken",0,c],750298);var s=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),v=e.i(973322),m=e.i(38415),h=e=>{let{controls:[n,o,d,l],width:r=180,height:i=r}=e,{token:c}=m.theme.useToken(),s=(e,a)=>"x"===a?e*r:i-e*i,u=r/5,p=(0,t.useId)();return(0,a.jsxs)("svg",{width:r,height:i,viewBox:`0 0 ${r} ${i}`,children:[(0,a.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:c.colorBgContainer}),(0,a.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,a.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:c.colorBorderSecondary,strokeWidth:c.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          C ${s(n,"x")} ${s(o,"y")},
            ${s(d,"x")} ${s(l,"y")},
            ${r} 0
        `,fill:"none",stroke:c.colorPrimary,strokeWidth:2*c.controlOutlineWidth}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          L ${s(n,"x")} ${s(o,"y")}
          L ${s(d,"x")} ${s(l,"y")}
          L ${r} 0
        `,fill:"none",stroke:c.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:c.controlOutlineWidth}),(0,a.jsx)("circle",{cx:s(n,"x"),cy:s(o,"y"),r:"5",fill:c["red-6"]}),(0,a.jsx)("circle",{cx:s(d,"x"),cy:s(l,"y"),r:"5",fill:c["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[o]=(0,s.default)(f),d=(0,t.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return d?(0,a.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,a.jsx)(h,{controls:d}),(0,a.jsxs)(p.Flex,{align:"center",children:[(0,a.jsx)(x.Typography.Text,{children:n}),(0,a.jsx)(I.Tooltip,{title:o.open,children:(0,a.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${d.join(",")}`,target:"_blank",icon:(0,a.jsx)(v.default,{})})})]})]}):null},b=e.i(758035),y=e.i(417546);let j=c(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,o.createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
    border-radius: ${a.borderRadiusSM};
    font-family: monospace;
  `}));function S(){let[e]=(0,s.default)(T),{styles:t}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,a.jsx)("span",{className:t.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,t)=>"string"==typeof t.value&&(t.value.startsWith("#")||t.value.startsWith("rgb"))?(0,a.jsx)(b.default,{value:t.value,enablePopover:!0,children:t.value}):"string"==typeof t.value&&t.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,a.jsx)(k,{value:t.value}):"string"!=typeof t.value?JSON.stringify(t.value):t.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,s.default)(T),d=S(),l=t.useMemo(()=>Object.entries(y.tokenMeta.global).filter(([,a])=>a.source===e).map(([e,a])=>({name:e,desc:"cn"===o?a.desc:a.descEn,type:a.type,value:j[e]})),[e,o]);return(0,a.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:d,pagination:!1})},"useColumns",0,S],632086)},417546,e=>{"use strict";var a=e.i(418031),t=e.i(353250);let n=a.default,o=t.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},811101,e=>{"use strict";e.s(["texts",0,[{value:"自 ",paraId:0},{value:"antd@4.20.0",paraId:0},{value:" 版本开始提供该组件。",paraId:0},{value:"用于展示多个选项并允许用户选择其中单个选项；",paraId:1,tocIndex:0},{value:"当切换选中选项时，关联区域的内容会发生变化。",paraId:1,tocIndex:0},{value:"通用属性参考：",paraId:2,tocIndex:18},{value:"通用属性",paraId:3,tocIndex:18},{value:"自 ",paraId:4,tocIndex:18},{value:"antd@4.20.0",paraId:4,tocIndex:18},{value:" 版本开始提供该组件。",paraId:4,tocIndex:18},{value:"参数",paraId:5,tocIndex:19},{value:"说明",paraId:5,tocIndex:19},{value:"类型",paraId:5,tocIndex:19},{value:"默认值",paraId:5,tocIndex:19},{value:"版本",paraId:5,tocIndex:19},{value:"全局配置",paraId:6,tocIndex:19},{value:"block",paraId:5,tocIndex:19},{value:"将宽度调整为父元素宽度的选项",paraId:5,tocIndex:19},{value:"boolean",paraId:5,tocIndex:19},{value:"false",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"classNames",paraId:5,tocIndex:19},{value:"用于自定义 Segmented 组件内部各语义化结构的 class，支持对象或函数",paraId:5,tocIndex:19},{value:"Record<",paraId:5,tocIndex:19},{value:"SemanticDOM",paraId:7,tocIndex:19},{value:", string> | (info: { props }) => Record<",paraId:5,tocIndex:19},{value:"SemanticDOM",paraId:8,tocIndex:19},{value:", string>",paraId:5,tocIndex:19},{value:"-",paraId:5,tocIndex:19},{value:"6.0.0",paraId:5,tocIndex:19},{value:"defaultValue",paraId:5,tocIndex:19},{value:"默认选中的值",paraId:5,tocIndex:19},{value:"string | number",paraId:5,tocIndex:19},{value:"options",paraId:5,tocIndex:19},{value:" 首项的值",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"disabled",paraId:5,tocIndex:19},{value:"是否禁用",paraId:5,tocIndex:19},{value:"boolean",paraId:5,tocIndex:19},{value:"false",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"onChange",paraId:5,tocIndex:19},{value:"选项变化时的回调函数",paraId:5,tocIndex:19},{value:"function(value: string | number)",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"options",paraId:5,tocIndex:19},{value:"数据化配置选项内容",paraId:5,tocIndex:19},{value:"string[] | number[] | SegmentedItemType[]",paraId:5,tocIndex:19},{value:"[]",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"orientation",paraId:5,tocIndex:19},{value:"排列方向",paraId:5,tocIndex:19},{value:"horizontal",paraId:5,tocIndex:19},{value:" | ",paraId:5,tocIndex:19},{value:"vertical",paraId:5,tocIndex:19},{value:"horizontal",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"size",paraId:5,tocIndex:19},{value:"控件尺寸",paraId:5,tocIndex:19},{value:"large",paraId:5,tocIndex:19},{value:" | ",paraId:5,tocIndex:19},{value:"medium",paraId:5,tocIndex:19},{value:" | ",paraId:5,tocIndex:19},{value:"small",paraId:5,tocIndex:19},{value:"medium",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"styles",paraId:5,tocIndex:19},{value:"用于自定义 Segmented 组件内部各语义化结构的行内 style，支持对象或函数",paraId:5,tocIndex:19},{value:"Record<",paraId:5,tocIndex:19},{value:"SemanticDOM",paraId:9,tocIndex:19},{value:" , CSSProperties> | (info: { props }) => Record<",paraId:5,tocIndex:19},{value:"SemanticDOM",paraId:10,tocIndex:19},{value:" , CSSProperties>",paraId:5,tocIndex:19},{value:"-",paraId:5,tocIndex:19},{value:"6.0.0",paraId:5,tocIndex:19},{value:"vertical",paraId:5,tocIndex:19},{value:"排列方向，与 ",paraId:5,tocIndex:19},{value:"orientation",paraId:5,tocIndex:19},{value:" 同时存在，以 ",paraId:5,tocIndex:19},{value:"orientation",paraId:5,tocIndex:19},{value:" 优先",paraId:5,tocIndex:19},{value:"boolean",paraId:5,tocIndex:19},{value:"false",paraId:5,tocIndex:19},{value:"5.21.0",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"value",paraId:5,tocIndex:19},{value:"当前选中的值",paraId:5,tocIndex:19},{value:"string | number",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"shape",paraId:5,tocIndex:19},{value:"形状",paraId:5,tocIndex:19},{value:"default",paraId:5,tocIndex:19},{value:" | ",paraId:5,tocIndex:19},{value:"round",paraId:5,tocIndex:19},{value:"default",paraId:5,tocIndex:19},{value:"5.24.0",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"name",paraId:5,tocIndex:19},{value:"Segmented 下所有 ",paraId:5,tocIndex:19},{value:'input[type="radio"]',paraId:5,tocIndex:19},{value:" 的 ",paraId:5,tocIndex:19},{value:"name",paraId:5,tocIndex:19},{value:" 属性。若未设置，则将回退到随机生成的名称",paraId:5,tocIndex:19},{value:"string",paraId:5,tocIndex:19},{value:"5.23.0",paraId:5,tocIndex:19},{value:"×",paraId:5,tocIndex:19},{value:"属性",paraId:11,tocIndex:20},{value:"描述",paraId:11,tocIndex:20},{value:"类型",paraId:11,tocIndex:20},{value:"默认值",paraId:11,tocIndex:20},{value:"版本",paraId:11,tocIndex:20},{value:"className",paraId:11,tocIndex:20},{value:"自定义类名",paraId:11,tocIndex:20},{value:"string",paraId:11,tocIndex:20},{value:"-",paraId:11,tocIndex:20},{value:"disabled",paraId:11,tocIndex:20},{value:"分段项的禁用状态",paraId:11,tocIndex:20},{value:"boolean",paraId:11,tocIndex:20},{value:"false",paraId:11,tocIndex:20},{value:"icon",paraId:11,tocIndex:20},{value:"分段项的显示图标",paraId:11,tocIndex:20},{value:"ReactNode",paraId:11,tocIndex:20},{value:"-",paraId:11,tocIndex:20},{value:"label",paraId:11,tocIndex:20},{value:"分段项的显示文本",paraId:11,tocIndex:20},{value:"ReactNode",paraId:11,tocIndex:20},{value:"-",paraId:11,tocIndex:20},{value:"tooltip",paraId:11,tocIndex:20},{value:"分段项的工具提示",paraId:11,tocIndex:20},{value:"string | ",paraId:11,tocIndex:20},{value:"TooltipProps",paraId:12,tocIndex:20},{value:"-",paraId:11,tocIndex:20},{value:"value",paraId:11,tocIndex:20},{value:"分段项的值",paraId:11,tocIndex:20},{value:"string | number",paraId:11,tocIndex:20},{value:"-",paraId:11,tocIndex:20}]])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])},48750,e=>{"use strict";var a=e.i(251062);e.s(["LinkOutlined",()=>a.default])},883376,e=>{"use strict";var a=e.i(513875);e.s(["QuestionCircleOutlined",()=>a.default])},686111,e=>{"use strict";var a=e.i(571246);e.s(["RightOutlined",()=>a.default])}]);