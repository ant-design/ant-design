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
  `}));e.s(["default",0,e=>{let{styles:l,theme:i}=r(),{value:d,children:s,enablePopover:c}=e,u=a.useMemo(()=>new o.FastColor(d).toHexString(),[d]),p=(0,t.jsxs)("span",{className:l.codeSpan,children:[(0,t.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,t.jsx)(n.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:i.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(48750),n=e.i(883376),r=e.i(686111),l=e.i(606552),i=e.i(504909),d=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),v=e.i(632086),m=e.i(417546);let h=(e,t)=>{let a=e.toLowerCase().includes("color"),o=t.toLowerCase().includes("color");return a&&!o?-1:!a&&o?1:e<t?-1:1},f=(0,p.getDesignToken)(),g={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),y=e=>{let{defaultOpen:p=!0,tokens:y,title:b,helpText:j,helpLink:T,component:$,comment:C}=e,[,S]=(0,x.default)(g),z=(0,u.useTheme)(),w=(0,v.useColumns)(),[M,D]=(0,a.useState)(p),{styles:O}=k(),L=(0,a.useMemo)(()=>{let e=$?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[$,C]);if(!y.length)return null;let N=y.sort($?void 0:h).map(e=>{let t=$?m.tokenMeta.components[$].find(t=>t.token===e):m.tokenMeta.global[e];return t?{name:e,desc:"cn"===S?t.desc:t.descEn,type:t.type,value:$?m.tokenData[$]?.component[e]:f[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:O.tableTitle,onClick:()=>D(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:O.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(i.Flex,{className:O.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(d.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(c.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(o.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:O.help,children:[(0,t.jsx)(n.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,t.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(s.Table,{size:"middle",columns:w,bordered:!0,dataSource:N,style:{marginBottom:z.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=a.default.memo(({component:e})=>{let[o]=(0,x.default)(g),n=(0,a.useMemo)(()=>{let{componentComment:e,globalComment:t}=o;return{componentComment:e,globalComment:t}},[o]),r=(0,a.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:a=[]}=m.tokenData[e]||{};a.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[m.tokenMeta.components[e]?.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:o.componentToken,helpText:o.help,helpLink:o.customizeTokenLink,tokens:m.tokenMeta.components[e].map(e=>e.token),component:e,comment:n}),r.length>0&&(0,t.jsx)(y,{defaultOpen:!0,title:o.globalToken,helpText:o.help,helpLink:o.customizeComponentTokenLink,tokens:r,comment:n})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(91595),n=e.i(771229),r=e.i(707065),l=e.i(183668),i=e.i(788296),d=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var v=()=>(0,t.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=a.default.use(p.default),[m,h]=(0,u.default)(!1),f=a.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:a}=t,{debug:o}=a;return o&&!I?e:e.concat({...t,previewerProps:{...a,expand:m,debug:!1,originDebug:o}})},[]),[m,e,I]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(i.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${m?"collapse":"expand"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.CodeOutlined,{}),onClick:()=>{h(!m)},className:m?"icon-enabled":""})}),(0,t.jsx)(i.Tooltip,{title:(0,t.jsx)(c.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,t.jsx)(s.DumiDemoGrid,{items:f,demoRender:e=>(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(v,{}),children:(0,t.jsx)(d.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(504595),n=e.i(827830),r=e.i(964473),l=e.i(987058),i=e.i(464745),d=e.i(210336);function s(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,r.default)((0,r.default)({},i.default),a.token),n=null!=(e=a.algorithm)?e:l.default,s=Array.isArray(n)?n.reduce(function(e,t){return t(o,e)},void 0):n(o),c=(0,r.default)((0,r.default)((0,r.default)({},s),a.components),{},{override:null!=(t=a.token)?t:{}});return(0,d.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),v=e.i(973322),m=e.i(38415),h=e=>{let{controls:[o,n,r,l],width:i=180,height:d=i}=e,{token:s}=m.theme.useToken(),c=(e,t)=>"x"===t?e*i:d-e*d,u=i/5,p=(0,a.useId)();return(0,t.jsxs)("svg",{width:i,height:d,viewBox:`0 0 ${i} ${d}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:s.colorBorderSecondary,strokeWidth:s.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${d}
          C ${c(o,"x")} ${c(n,"y")},
            ${c(r,"x")} ${c(l,"y")},
            ${i} 0
        `,fill:"none",stroke:s.colorPrimary,strokeWidth:2*s.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${d}
          L ${c(o,"x")} ${c(n,"y")}
          L ${c(r,"x")} ${c(l,"y")}
          L ${i} 0
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(o,"x"),cy:c(n,"y"),r:"5",fill:s["red-6"]}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(l,"y"),r:"5",fill:s["green-6"]})]})};let f=/^cubic-bezier\((.*)\)$/,g={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:o}=e,[n]=(0,c.default)(g),r=(0,a.useMemo)(()=>{let e=f.exec(o.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[o]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(h,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:o}),(0,t.jsx)(I.Tooltip,{title:n.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(v.default,{})})})]})]}):null},y=e.i(758035),b=e.i(417546);let j=s(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,n.createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,c.default)(T),{styles:a}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,o)=>(0,t.jsx)("span",{className:a.codeSpan,children:o.type})},{title:e.value,key:"value",render:(e,a)=>"string"==typeof a.value&&(a.value.startsWith("#")||a.value.startsWith("rgb"))?(0,t.jsx)(y.default,{value:a.value,enablePopover:!0,children:a.value}):"string"==typeof a.value&&a.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:a.value}):"string"!=typeof a.value?JSON.stringify(a.value):a.value}]}e.s(["default",0,({type:e})=>{let[,n]=(0,c.default)(T),r=C(),l=a.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===n?t.desc:t.descEn,type:t.type,value:j[e]})),[e,n]);return(0,t.jsx)(o.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var t=e.i(418031),a=e.i(353250);let o=t.default,n=a.default;e.s(["tokenData",0,n,"tokenMeta",0,o])},342806,e=>{"use strict";e.s(["texts",0,[{value:"Divide sections of an article.",paraId:0,tocIndex:0},{value:"Divide inline text and links such as the operation column of table.",paraId:0,tocIndex:0},{value:"Common props ref：",paraId:1,tocIndex:11},{value:"Common props",paraId:2,tocIndex:11},{value:"Property",paraId:3,tocIndex:11},{value:"Description",paraId:3,tocIndex:11},{value:"Type",paraId:3,tocIndex:11},{value:"Default",paraId:3,tocIndex:11},{value:"Version",paraId:3,tocIndex:11},{value:"Global Config",paraId:4,tocIndex:11},{value:"children",paraId:3,tocIndex:11},{value:"The wrapped title",paraId:3,tocIndex:11},{value:"ReactNode",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"classNames",paraId:3,tocIndex:11},{value:"Customize class for each semantic structure inside the component. Supports object or function.",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:5,tocIndex:11},{value:", string> | (info: { props })=> Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:6,tocIndex:11},{value:", string>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"dashed",paraId:3,tocIndex:11},{value:"Whether line is dashed",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"orientation",paraId:3,tocIndex:11},{value:"Whether line is horizontal or vertical",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"orientationMargin",paraId:3,tocIndex:11},{value:"The margin-left/right between the title and its closest border, while the ",paraId:3,tocIndex:11},{value:"titlePlacement",paraId:3,tocIndex:11},{value:" should not be ",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:", If a numeric value of type ",paraId:3,tocIndex:11},{value:"string",paraId:3,tocIndex:11},{value:" is provided without a unit, it is assumed to be in pixels (px) by default.",paraId:3,tocIndex:11},{value:"string | number",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"plain",paraId:3,tocIndex:11},{value:"Divider text show as plain style",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"4.2.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"styles",paraId:3,tocIndex:11},{value:"Customize inline style for each semantic structure inside the component. Supports object or function.",paraId:3,tocIndex:11},{value:"Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:7,tocIndex:11},{value:", CSSProperties> | (info: { props })=> Record<",paraId:3,tocIndex:11},{value:"SemanticDOM",paraId:8,tocIndex:11},{value:", CSSProperties>",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"6.0.0",paraId:3,tocIndex:11},{value:"size",paraId:3,tocIndex:11},{value:"The size of divider. Only valid for horizontal layout",paraId:3,tocIndex:11},{value:"small",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"medium",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"large",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"5.25.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"titlePlacement",paraId:3,tocIndex:11},{value:"The position of title inside divider",paraId:3,tocIndex:11},{value:"start",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"end",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:"center",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"type",paraId:3,tocIndex:11},{value:"The direction type of divider",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"horizontal",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"variant",paraId:3,tocIndex:11},{value:"Whether line is dashed, dotted or solid",paraId:3,tocIndex:11},{value:"dashed",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"dotted",paraId:3,tocIndex:11},{value:" | ",paraId:3,tocIndex:11},{value:"solid",paraId:3,tocIndex:11},{value:"solid",paraId:3,tocIndex:11},{value:"5.20.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"vertical",paraId:3,tocIndex:11},{value:"Orientation, Simultaneously configure with ",paraId:3,tocIndex:11},{value:"orientation",paraId:3,tocIndex:11},{value:" and prioritize ",paraId:3,tocIndex:11},{value:"orientation",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);