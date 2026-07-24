(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[n,a]=(0,t.useState)(...e);return[n,(...e)=>{(0,t.startTransition)(()=>{a(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),n=e.i(191788),a=e.i(218589),o=e.i(831036);let r=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:i,theme:l}=r(),{value:s,children:d,enablePopover:c}=e,u=n.useMemo(()=>new a.FastColor(s).toHexString(),[s]),p=(0,t.jsxs)("span",{className:i.codeSpan,children:[(0,t.jsx)("span",{className:i.dot,style:{backgroundColor:u}}),d??u]});return c&&(p=(0,t.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:l.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),n=e.i(191788),a=e.i(48750),o=e.i(883376),r=e.i(686111),i=e.i(606552),l=e.i(504909),s=e.i(831036),d=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),m=e.i(470318);e.i(56925);var x=e.i(582225),h=e.i(632086),v=e.i(417546);let I=(e,t)=>{let n=e.toLowerCase().includes("color"),a=t.toLowerCase().includes("color");return n&&!a?-1:!n&&a?1:e<t?-1:1},g=(0,p.getDesignToken)(),k={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},f=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:S,comment:$}=e,[,C]=(0,x.default)(k),M=(0,u.useTheme)(),z=(0,h.useColumns)(),[w,E]=(0,n.useState)(p),{styles:D}=f(),L=(0,n.useMemo)(()=>{let e=S?`<ConfigProvider
  theme={{
    components: {
      ${S}: {
        /* ${$?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`:`<ConfigProvider
  theme={{
    token: {
      /* ${$?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;return m.default.highlight(e,m.default.languages.jsx||m.default.languages.javascript,"jsx")},[S,$]);if(!y.length)return null;let N=y.sort(S?void 0:I).map(e=>{let t=S?v.tokenMeta.components[S].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===C?t.desc:t.descEn,type:t.type,value:S?v.tokenData[S]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:D.tableTitle,onClick:()=>E(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:D.arrowIcon,rotate:90*!!w}),(0,t.jsxs)(l.Flex,{className:D.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(s.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(a.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:D.help,children:[(0,t.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),w&&(0,t.jsx)(i.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(d.Table,{size:"middle",columns:z,bordered:!0,dataSource:N,style:{marginBottom:M.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=n.default.memo(({component:e})=>{let[a]=(0,x.default)(k),o=(0,n.useMemo)(()=>{let{componentComment:e,globalComment:t}=a;return{componentComment:e,globalComment:t}},[a]),r=(0,n.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:n=[]}=v.tokenData[e]||{};n.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:a.componentToken,helpText:a.help,helpLink:a.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),r.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:a.globalToken,helpText:a.help,helpLink:a.customizeComponentTokenLink,tokens:r,comment:o})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),n=e.i(191788),a=e.i(91595),o=e.i(771229),r=e.i(707065),i=e.i(183668),l=e.i(788296),s=e.i(624057),d=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),m=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var h=()=>(0,t.jsx)(m.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:m,setShowDebug:x}=n.default.use(p.default),[v,I]=(0,u.default)(!1),g=n.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:n}=t,{debug:a}=n;return a&&!m?e:e.concat({...t,previewerProps:{...n,expand:v,debug:!1,originDebug:a}})},[]),[v,e,m]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${m?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(i.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.CodeOutlined,{}),onClick:()=>{I(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(l.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${m?"hide":"visible"}`}),children:(0,t.jsx)(i.Button,{type:"text",size:"small",icon:(0,t.jsx)(a.BugOutlined,{}),onClick:()=>{x?.(!m)},className:m?"icon-enabled":""})})]}),(0,t.jsx)(d.DumiDemoGrid,{items:g,demoRender:e=>(0,t.jsx)(n.Suspense,{fallback:(0,t.jsx)(h,{}),children:(0,t.jsx)(s.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),n=e.i(191788),a=e.i(504595),o=e.i(827830),r=e.i(964473),i=e.i(987058),l=e.i(464745),s=e.i(210336);function d(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=(0,r.default)((0,r.default)({},l.default),n.token),o=null!=(e=n.algorithm)?e:i.default,d=Array.isArray(o)?o.reduce(function(e,t){return t(a,e)},void 0):o(a),c=(0,r.default)((0,r.default)((0,r.default)({},d),n.components),{},{override:null!=(t=n.token)?t:{}});return(0,s.default)(c)}e.s(["getDesignToken",0,d],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),m=e.i(788296),x=e.i(974398),h=e.i(973322),v=e.i(38415),I=e=>{let{controls:[a,o,r,i],width:l=180,height:s=l}=e,{token:d}=v.theme.useToken(),c=(e,t)=>"x"===t?e*l:s-e*s,u=l/5,p=(0,n.useId)();return(0,t.jsxs)("svg",{width:l,height:s,viewBox:`0 0 ${l} ${s}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:d.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:d.colorBorderSecondary,strokeWidth:d.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          C ${c(a,"x")} ${c(o,"y")},
            ${c(r,"x")} ${c(i,"y")},
            ${l} 0
        `,fill:"none",stroke:d.colorPrimary,strokeWidth:2*d.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          L ${c(a,"x")} ${c(o,"y")}
          L ${c(r,"x")} ${c(i,"y")}
          L ${l} 0
        `,fill:"none",stroke:d.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:d.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(a,"x"),cy:c(o,"y"),r:"5",fill:d["red-6"]}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(i,"y"),r:"5",fill:d["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,k={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var f=e=>{let{value:a}=e,[o]=(0,c.default)(k),r=(0,n.useMemo)(()=>{let e=g.exec(a.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[a]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(I,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:a}),(0,t.jsx)(m.Tooltip,{title:o.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(h.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=d(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},S=(0,o.createStyles)(({css:e,cssVar:t,token:n})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${n.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function $(){let[e]=(0,c.default)(T),{styles:n}=S();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,a)=>(0,t.jsx)("span",{className:n.codeSpan,children:a.type})},{title:e.value,key:"value",render:(e,n)=>"string"==typeof n.value&&(n.value.startsWith("#")||n.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:n.value,enablePopover:!0,children:n.value}):"string"==typeof n.value&&n.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(f,{value:n.value}):"string"!=typeof n.value?JSON.stringify(n.value):n.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)(T),r=$(),i=n.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===o?t.desc:t.descEn,type:t.type,value:j[e]})),[e,o]);return(0,t.jsx)(a.Table,{bordered:!0,rowKey:e=>e.name,dataSource:i,columns:r,pagination:!1})},"useColumns",0,$],632086)},417546,e=>{"use strict";var t=e.i(418031),n=e.i(353250);let a=t.default,o=n.default;e.s(["tokenData",0,o,"tokenMeta",0,a])},286836,e=>{"use strict";e.s(["texts",0,[{value:"当目前没有数据时，用于显式的用户提示。",paraId:0,tocIndex:0},{value:"初始化场景时的引导创建流程。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:8},{value:"通用属性",paraId:2,tocIndex:8},{value:"<Empty>\n  <Button>创建</Button>\n</Empty>\n",paraId:3,tocIndex:8},{value:"参数",paraId:4,tocIndex:8},{value:"说明",paraId:4,tocIndex:8},{value:"类型",paraId:4,tocIndex:8},{value:"默认值",paraId:4,tocIndex:8},{value:"版本",paraId:4,tocIndex:8},{value:"全局配置",paraId:5,tocIndex:8},{value:"classNames",paraId:4,tocIndex:8},{value:"用于自定义组件内部各语义化结构的 class，支持对象或函数",paraId:4,tocIndex:8},{value:"Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:6,tocIndex:8},{value:", string> | (info: { props })=> Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:7,tocIndex:8},{value:", string>",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"5.23.0",paraId:4,tocIndex:8},{value:"description",paraId:4,tocIndex:8},{value:"自定义描述内容",paraId:4,tocIndex:8},{value:"ReactNode",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"×",paraId:4,tocIndex:8},{value:"image",paraId:4,tocIndex:8},{value:"设置显示图片，为 string 时表示自定义图片地址。",paraId:4,tocIndex:8},{value:"ReactNode",paraId:4,tocIndex:8},{value:"Empty.PRESENTED_IMAGE_DEFAULT",paraId:4,tocIndex:8},{value:"5.27.0",paraId:4,tocIndex:8},{value:"imageStyle",paraId:4,tocIndex:8},{value:"图片样式，请使用 ",paraId:4,tocIndex:8},{value:"styles.image",paraId:4,tocIndex:8},{value:" 替代",paraId:4,tocIndex:8},{value:"CSSProperties",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"×",paraId:4,tocIndex:8},{value:"styles",paraId:4,tocIndex:8},{value:"用于自定义组件内部各语义化结构的行内 style，支持对象或函数",paraId:4,tocIndex:8},{value:"Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:8,tocIndex:8},{value:", CSSProperties> | (info: { props })=> Record<",paraId:4,tocIndex:8},{value:"SemanticDOM",paraId:9,tocIndex:8},{value:", CSSProperties>",paraId:4,tocIndex:8},{value:"-",paraId:4,tocIndex:8},{value:"5.23.0",paraId:4,tocIndex:8},{value:"Empty.PRESENTED_IMAGE_SIMPLE",paraId:10,tocIndex:9},{value:"Empty.PRESENTED_IMAGE_DEFAULT",paraId:11,tocIndex:9}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);