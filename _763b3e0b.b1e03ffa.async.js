(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var a=e.i(191788);e.s(["default",0,(...e)=>{let[t,n]=(0,a.useState)(...e);return[t,(...e)=>{(0,a.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(218589),o=e.i(831036);let l=(0,e.i(827830).createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:r,theme:d}=l(),{value:i,children:s,enablePopover:c}=e,u=t.useMemo(()=>new n.FastColor(i).toHexString(),[i]),p=(0,a.jsxs)("span",{className:r.codeSpan,children:[(0,a.jsx)("span",{className:r.dot,style:{backgroundColor:u}}),s??u]});return c&&(p=(0,a.jsx)(o.Popover,{destroyOnHidden:!0,placement:"left",content:(0,a.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:d.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(48750),o=e.i(883376),l=e.i(686111),r=e.i(606552),d=e.i(504909),i=e.i(831036),s=e.i(504595),c=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),m=e.i(632086),v=e.i(417546);let h=(e,a)=>{let t=e.toLowerCase().includes("color"),n=a.toLowerCase().includes("color");return t&&!n?-1:!t&&n?1:e<a?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),b=e=>{let{defaultOpen:p=!0,tokens:b,title:y,helpText:j,helpLink:T,component:$,comment:C}=e,[,S]=(0,x.default)(f),w=(0,u.useTheme)(),z=(0,m.useColumns)(),[M,L]=(0,t.useState)(p),{styles:N}=k(),O=(0,t.useMemo)(()=>{let e=$?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[$,C]);if(!b.length)return null;let D=b.sort($?void 0:h).map(e=>{let a=$?v.tokenMeta.components[$].find(a=>a.token===e):v.tokenMeta.global[e];return a?{name:e,desc:"cn"===S?a.desc:a.descEn,type:a.type,value:$?v.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:N.tableTitle,onClick:()=>L(e=>!e),children:[(0,a.jsx)(l.RightOutlined,{className:N.arrowIcon,rotate:90*!!M}),(0,a.jsxs)(d.Flex,{className:N.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[y,(0,a.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,a.jsxs)(c.Typography,{children:[(0,a.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,a.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:O}})}),(0,a.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,a.jsxs)("span",{className:N.help,children:[(0,a.jsx)(o.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,a.jsx)(r.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,a.jsx)(s.Table,{size:"middle",columns:z,bordered:!0,dataSource:D,style:{marginBottom:w.margin},pagination:!1,rowKey:e=>e.name})})]})};var y=t.default.memo(({component:e})=>{let[n]=(0,x.default)(f),o=(0,t.useMemo)(()=>{let{componentComment:e,globalComment:a}=n;return{componentComment:e,globalComment:a}},[n]),l=(0,t.useMemo)(()=>{let a=new Set;return e.split(",").forEach(e=>{let{global:t=[]}=v.tokenData[e]||{};t.forEach(e=>{a.add(e)})}),Array.from(a)},[e]);return(0,a.jsxs)(a.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:o}),l.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:l,comment:o})]})});e.s(["default",0,y])},720637,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(91595),o=e.i(771229),l=e.i(707065),r=e.i(183668),d=e.i(788296),i=e.i(624057),s=e.i(797091),c=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:a})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${a.margin};
    border-radius: ${a.borderRadiusLG};
  `}));var m=()=>(0,a.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=t.default.use(p.default),[v,h]=(0,u.default)(!1),g=t.default.useMemo(()=>e.reduce((e,a)=>{let{previewerProps:t}=a,{debug:n}=t;return n&&!I?e:e.concat({...a,previewerProps:{...t,expand:v,debug:!1,originDebug:n}})},[]),[v,e,I]);return(0,a.jsxs)("div",{className:"demo-wrapper",children:[(0,a.jsx)(l.Global,{styles:l.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,a.jsxs)("span",{className:"all-code-box-controls",children:[(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,a.jsx)(r.Button,{type:"text",size:"small",icon:(0,a.jsx)(o.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,a.jsx)(d.Tooltip,{title:(0,a.jsx)(c.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,a.jsx)(r.Button,{type:"text",size:"small",icon:(0,a.jsx)(n.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,a.jsx)(s.DumiDemoGrid,{items:g,demoRender:e=>(0,a.jsx)(t.Suspense,{fallback:(0,a.jsx)(m,{}),children:(0,a.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var a=e.i(391398),t=e.i(191788),n=e.i(504595),o=e.i(827830),l=e.i(964473),r=e.i(987058),d=e.i(464745),i=e.i(210336);function s(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,l.default)((0,l.default)({},d.default),t.token),o=null!=(e=t.algorithm)?e:r.default,s=Array.isArray(o)?o.reduce(function(e,a){return a(n,e)},void 0):o(n),c=(0,l.default)((0,l.default)((0,l.default)({},s),t.components),{},{override:null!=(a=t.token)?a:{}});return(0,i.default)(c)}e.s(["getDesignToken",0,s],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),m=e.i(973322),v=e.i(38415),h=e=>{let{controls:[n,o,l,r],width:d=180,height:i=d}=e,{token:s}=v.theme.useToken(),c=(e,a)=>"x"===a?e*d:i-e*i,u=d/5,p=(0,t.useId)();return(0,a.jsxs)("svg",{width:d,height:i,viewBox:`0 0 ${d} ${i}`,children:[(0,a.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:s.colorBgContainer}),(0,a.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,a.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:s.colorBorderSecondary,strokeWidth:s.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          C ${c(n,"x")} ${c(o,"y")},
            ${c(l,"x")} ${c(r,"y")},
            ${d} 0
        `,fill:"none",stroke:s.colorPrimary,strokeWidth:2*s.controlOutlineWidth}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          L ${c(n,"x")} ${c(o,"y")}
          L ${c(l,"x")} ${c(r,"y")}
          L ${d} 0
        `,fill:"none",stroke:s.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:s.controlOutlineWidth}),(0,a.jsx)("circle",{cx:c(n,"x"),cy:c(o,"y"),r:"5",fill:s["red-6"]}),(0,a.jsx)("circle",{cx:c(l,"x"),cy:c(r,"y"),r:"5",fill:s["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[o]=(0,c.default)(f),l=(0,t.useMemo)(()=>{let e=g.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return l?(0,a.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,a.jsx)(h,{controls:l}),(0,a.jsxs)(p.Flex,{align:"center",children:[(0,a.jsx)(x.Typography.Text,{children:n}),(0,a.jsx)(I.Tooltip,{title:o.open,children:(0,a.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${l.join(",")}`,target:"_blank",icon:(0,a.jsx)(m.default,{})})})]})]}):null},b=e.i(758035),y=e.i(417546);let j=s(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,o.createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
    border-radius: ${a.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,c.default)(T),{styles:t}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,a.jsx)("span",{className:t.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,t)=>"string"==typeof t.value&&(t.value.startsWith("#")||t.value.startsWith("rgb"))?(0,a.jsx)(b.default,{value:t.value,enablePopover:!0,children:t.value}):"string"==typeof t.value&&t.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,a.jsx)(k,{value:t.value}):"string"!=typeof t.value?JSON.stringify(t.value):t.value}]}e.s(["default",0,({type:e})=>{let[,o]=(0,c.default)(T),l=C(),r=t.useMemo(()=>Object.entries(y.tokenMeta.global).filter(([,a])=>a.source===e).map(([e,a])=>({name:e,desc:"cn"===o?a.desc:a.descEn,type:a.type,value:j[e]})),[e,o]);return(0,a.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:r,columns:l,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var a=e.i(418031),t=e.i(353250);let n=a.default,o=t.default;e.s(["tokenData",0,o,"tokenMeta",0,n])},412007,e=>{"use strict";e.s(["texts",0,[{value:"对评价进行展示。",paraId:0,tocIndex:0},{value:"对事物进行快速的评级操作。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:11},{value:"通用属性",paraId:2,tocIndex:11},{value:"属性",paraId:3,tocIndex:11},{value:"说明",paraId:3,tocIndex:11},{value:"类型",paraId:3,tocIndex:11},{value:"默认值",paraId:3,tocIndex:11},{value:"版本",paraId:3,tocIndex:11},{value:"全局配置",paraId:4,tocIndex:11},{value:"allowClear",paraId:3,tocIndex:11},{value:"是否允许再次点击后清除",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"true",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"allowHalf",paraId:3,tocIndex:11},{value:"是否允许半选",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"character",paraId:3,tocIndex:11},{value:"自定义字符",paraId:3,tocIndex:11},{value:"ReactNode | (RateProps) => ReactNode",paraId:3,tocIndex:11},{value:"<StarFilled />",paraId:3,tocIndex:11},{value:"function(): 4.4.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"count",paraId:3,tocIndex:11},{value:"star 总数",paraId:3,tocIndex:11},{value:"number",paraId:3,tocIndex:11},{value:"5",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"defaultValue",paraId:3,tocIndex:11},{value:"默认值",paraId:3,tocIndex:11},{value:"number",paraId:3,tocIndex:11},{value:"0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"disabled",paraId:3,tocIndex:11},{value:"只读，无法进行交互",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"false",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"keyboard",paraId:3,tocIndex:11},{value:"支持使用键盘操作",paraId:3,tocIndex:11},{value:"boolean",paraId:3,tocIndex:11},{value:"true",paraId:3,tocIndex:11},{value:"5.18.0",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"size",paraId:3,tocIndex:11},{value:"星星尺寸",paraId:3,tocIndex:11},{value:"'small' | 'medium' | 'large'",paraId:3,tocIndex:11},{value:"'medium'",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"tooltips",paraId:3,tocIndex:11},{value:"自定义每项的提示信息",paraId:3,tocIndex:11},{value:"TooltipProps",paraId:5,tocIndex:11},{value:"[] | string[]",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"value",paraId:3,tocIndex:11},{value:"当前数，受控值",paraId:3,tocIndex:11},{value:"number",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"onBlur",paraId:3,tocIndex:11},{value:"失去焦点时的回调",paraId:3,tocIndex:11},{value:"function()",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"onChange",paraId:3,tocIndex:11},{value:"选择时的回调",paraId:3,tocIndex:11},{value:"function(value: number)",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"onFocus",paraId:3,tocIndex:11},{value:"获取焦点时的回调",paraId:3,tocIndex:11},{value:"function()",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"onHoverChange",paraId:3,tocIndex:11},{value:"鼠标经过时数值变化的回调",paraId:3,tocIndex:11},{value:"function(value: number)",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"onKeyDown",paraId:3,tocIndex:11},{value:"按键回调",paraId:3,tocIndex:11},{value:"function(event)",paraId:3,tocIndex:11},{value:"-",paraId:3,tocIndex:11},{value:"×",paraId:3,tocIndex:11},{value:"名称",paraId:6,tocIndex:12},{value:"描述",paraId:6,tocIndex:12},{value:"blur()",paraId:6,tocIndex:12},{value:"移除焦点",paraId:6,tocIndex:12},{value:"focus()",paraId:6,tocIndex:12},{value:"获取焦点",paraId:6,tocIndex:12}]])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])},48750,e=>{"use strict";var a=e.i(251062);e.s(["LinkOutlined",()=>a.default])},883376,e=>{"use strict";var a=e.i(513875);e.s(["QuestionCircleOutlined",()=>a.default])},686111,e=>{"use strict";var a=e.i(571246);e.s(["RightOutlined",()=>a.default])}]);