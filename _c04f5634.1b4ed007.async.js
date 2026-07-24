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
  `}));e.s(["default",0,e=>{let{styles:l,theme:d}=r(),{value:i,children:c,enablePopover:s}=e,u=a.useMemo(()=>new o.FastColor(i).toHexString(),[i]),p=(0,t.jsxs)("span",{className:l.codeSpan,children:[(0,t.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),c??u]});return s&&(p=(0,t.jsx)(n.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:d.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(48750),n=e.i(883376),r=e.i(686111),l=e.i(606552),d=e.i(504909),i=e.i(831036),c=e.i(504595),s=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),m=e.i(632086),v=e.i(417546);let h=(e,t)=>{let a=e.toLowerCase().includes("color"),o=t.toLowerCase().includes("color");return a&&!o?-1:!a&&o?1:e<t?-1:1},f=(0,p.getDesignToken)(),g={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),b=e=>{let{defaultOpen:p=!0,tokens:b,title:y,helpText:j,helpLink:w,component:T,comment:C}=e,[,S]=(0,x.default)(g),$=(0,u.useTheme)(),z=(0,m.useColumns)(),[M,D]=(0,a.useState)(p),{styles:L}=k(),N=(0,a.useMemo)(()=>{let e=T?`<ConfigProvider
  theme={{
    components: {
      ${T}: {
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[T,C]);if(!b.length)return null;let O=b.sort(T?void 0:h).map(e=>{let t=T?v.tokenMeta.components[T].find(t=>t.token===e):v.tokenMeta.global[e];return t?{name:e,desc:"cn"===S?t.desc:t.descEn,type:t.type,value:T?v.tokenData[T]?.component[e]:f[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:L.tableTitle,onClick:()=>D(e=>!e),children:[(0,t.jsx)(r.RightOutlined,{className:L.arrowIcon,rotate:90*!!M}),(0,t.jsxs)(d.Flex,{className:L.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[y,(0,t.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(s.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:N}})}),(0,t.jsxs)("a",{href:w,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(o.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,t.jsxs)("span",{className:L.help,children:[(0,t.jsx)(n.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,t.jsx)(l.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(c.Table,{size:"middle",columns:z,bordered:!0,dataSource:O,style:{marginBottom:$.margin},pagination:!1,rowKey:e=>e.name})})]})};var y=a.default.memo(({component:e})=>{let[o]=(0,x.default)(g),n=(0,a.useMemo)(()=>{let{componentComment:e,globalComment:t}=o;return{componentComment:e,globalComment:t}},[o]),r=(0,a.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:a=[]}=v.tokenData[e]||{};a.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[v.tokenMeta.components[e]?.length>0&&(0,t.jsx)(b,{defaultOpen:!0,title:o.componentToken,helpText:o.help,helpLink:o.customizeTokenLink,tokens:v.tokenMeta.components[e].map(e=>e.token),component:e,comment:n}),r.length>0&&(0,t.jsx)(b,{defaultOpen:!0,title:o.globalToken,helpText:o.help,helpLink:o.customizeComponentTokenLink,tokens:r,comment:n})]})});e.s(["default",0,y])},720637,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(91595),n=e.i(771229),r=e.i(707065),l=e.i(183668),d=e.i(788296),i=e.i(624057),c=e.i(797091),s=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var m=()=>(0,t.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=a.default.use(p.default),[v,h]=(0,u.default)(!1),f=a.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:a}=t,{debug:o}=a;return o&&!I?e:e.concat({...t,previewerProps:{...a,expand:v,debug:!1,originDebug:o}})},[]),[v,e,I]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(r.Global,{styles:r.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(d.Tooltip,{title:(0,t.jsx)(s.FormattedMessage,{id:`app.component.examples.${v?"collapse":"expand"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.CodeOutlined,{}),onClick:()=>{h(!v)},className:v?"icon-enabled":""})}),(0,t.jsx)(d.Tooltip,{title:(0,t.jsx)(s.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,t.jsx)(l.Button,{type:"text",size:"small",icon:(0,t.jsx)(o.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,t.jsx)(c.DumiDemoGrid,{items:f,demoRender:e=>(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(m,{}),children:(0,t.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var t=e.i(391398),a=e.i(191788),o=e.i(504595),n=e.i(827830),r=e.i(964473),l=e.i(987058),d=e.i(464745),i=e.i(210336);function c(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,r.default)((0,r.default)({},d.default),a.token),n=null!=(e=a.algorithm)?e:l.default,c=Array.isArray(n)?n.reduce(function(e,t){return t(o,e)},void 0):n(o),s=(0,r.default)((0,r.default)((0,r.default)({},c),a.components),{},{override:null!=(t=a.token)?t:{}});return(0,i.default)(s)}e.s(["getDesignToken",0,c],750298);var s=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),m=e.i(973322),v=e.i(38415),h=e=>{let{controls:[o,n,r,l],width:d=180,height:i=d}=e,{token:c}=v.theme.useToken(),s=(e,t)=>"x"===t?e*d:i-e*i,u=d/5,p=(0,a.useId)();return(0,t.jsxs)("svg",{width:d,height:i,viewBox:`0 0 ${d} ${i}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:c.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:c.colorBorderSecondary,strokeWidth:c.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${i}
          C ${s(o,"x")} ${s(n,"y")},
            ${s(r,"x")} ${s(l,"y")},
            ${d} 0
        `,fill:"none",stroke:c.colorPrimary,strokeWidth:2*c.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${i}
          L ${s(o,"x")} ${s(n,"y")}
          L ${s(r,"x")} ${s(l,"y")}
          L ${d} 0
        `,fill:"none",stroke:c.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:c.controlOutlineWidth}),(0,t.jsx)("circle",{cx:s(o,"x"),cy:s(n,"y"),r:"5",fill:c["red-6"]}),(0,t.jsx)("circle",{cx:s(r,"x"),cy:s(l,"y"),r:"5",fill:c["green-6"]})]})};let f=/^cubic-bezier\((.*)\)$/,g={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:o}=e,[n]=(0,s.default)(g),r=(0,a.useMemo)(()=>{let e=f.exec(o.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[o]);return r?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(h,{controls:r}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:o}),(0,t.jsx)(I.Tooltip,{title:n.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${r.join(",")}`,target:"_blank",icon:(0,t.jsx)(m.default,{})})})]})]}):null},b=e.i(758035),y=e.i(417546);let j=c(),w={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},T=(0,n.createStyles)(({css:e,cssVar:t,token:a})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${a.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,s.default)(w),{styles:a}=T();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,o)=>(0,t.jsx)("span",{className:a.codeSpan,children:o.type})},{title:e.value,key:"value",render:(e,a)=>"string"==typeof a.value&&(a.value.startsWith("#")||a.value.startsWith("rgb"))?(0,t.jsx)(b.default,{value:a.value,enablePopover:!0,children:a.value}):"string"==typeof a.value&&a.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:a.value}):"string"!=typeof a.value?JSON.stringify(a.value):a.value}]}e.s(["default",0,({type:e})=>{let[,n]=(0,s.default)(w),r=C(),l=a.useMemo(()=>Object.entries(y.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===n?t.desc:t.descEn,type:t.type,value:j[e]})),[e,n]);return(0,t.jsx)(o.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:r,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var t=e.i(418031),a=e.i(353250);let o=t.default,n=a.default;e.s(["tokenData",0,n,"tokenMeta",0,o])},181952,e=>{"use strict";e.s(["texts",0,[{value:"If you need to represent the switching between two states or on-off state.",paraId:0,tocIndex:0},{value:"The difference between ",paraId:0,tocIndex:0},{value:"Switch",paraId:0,tocIndex:0},{value:" and ",paraId:0,tocIndex:0},{value:"Checkbox",paraId:0,tocIndex:0},{value:" is that ",paraId:0,tocIndex:0},{value:"Switch",paraId:0,tocIndex:0},{value:" will trigger a state change directly when you toggle it, while ",paraId:0,tocIndex:0},{value:"Checkbox",paraId:0,tocIndex:0},{value:" is generally used for state marking, which should work in conjunction with submit operation.",paraId:0,tocIndex:0},{value:"Common props ref：",paraId:1,tocIndex:9},{value:"Common props",paraId:2,tocIndex:9},{value:"Property",paraId:3,tocIndex:9},{value:"Description",paraId:3,tocIndex:9},{value:"Type",paraId:3,tocIndex:9},{value:"Default",paraId:3,tocIndex:9},{value:"Version",paraId:3,tocIndex:9},{value:"Global Config",paraId:4,tocIndex:9},{value:"checked",paraId:3,tocIndex:9},{value:"Determine whether the Switch is checked",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"checkedChildren",paraId:3,tocIndex:9},{value:"The content to be shown when the state is checked",paraId:3,tocIndex:9},{value:"ReactNode",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"classNames",paraId:3,tocIndex:9},{value:"Customize class for each semantic structure inside the component. Supports object or function.",paraId:3,tocIndex:9},{value:"Record<",paraId:3,tocIndex:9},{value:"SemanticDOM",paraId:5,tocIndex:9},{value:", string> | (info: { props })=> Record<",paraId:3,tocIndex:9},{value:"SemanticDOM",paraId:6,tocIndex:9},{value:", string>",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"6.0.0",paraId:3,tocIndex:9},{value:"defaultChecked",paraId:3,tocIndex:9},{value:"Whether to set the initial state",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"defaultValue",paraId:3,tocIndex:9},{value:"Alias for ",paraId:3,tocIndex:9},{value:"defaultChecked",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"5.12.0",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"disabled",paraId:3,tocIndex:9},{value:"Disable switch",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"loading",paraId:3,tocIndex:9},{value:"Loading state of switch",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"size",paraId:3,tocIndex:9},{value:"The size of the Switch, options: ",paraId:3,tocIndex:9},{value:"medium",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"small",paraId:3,tocIndex:9},{value:"'medium'",paraId:3,tocIndex:9},{value:" | ",paraId:3,tocIndex:9},{value:"'small'",paraId:3,tocIndex:9},{value:"medium",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"styles",paraId:3,tocIndex:9},{value:"Customize inline style for each semantic structure inside the component. Supports object or function.",paraId:3,tocIndex:9},{value:"Record<",paraId:3,tocIndex:9},{value:"SemanticDOM",paraId:7,tocIndex:9},{value:", CSSProperties> | (info: { props })=> Record<",paraId:3,tocIndex:9},{value:"SemanticDOM",paraId:8,tocIndex:9},{value:", CSSProperties>",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"6.0.0",paraId:3,tocIndex:9},{value:"unCheckedChildren",paraId:3,tocIndex:9},{value:"The content to be shown when the state is unchecked",paraId:3,tocIndex:9},{value:"ReactNode",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"value",paraId:3,tocIndex:9},{value:"Alias for ",paraId:3,tocIndex:9},{value:"checked",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"5.12.0",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"onChange",paraId:3,tocIndex:9},{value:"Trigger when the checked state is changing",paraId:3,tocIndex:9},{value:"function(checked: boolean, event: Event)",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"onClick",paraId:3,tocIndex:9},{value:"Trigger when clicked",paraId:3,tocIndex:9},{value:"function(checked: boolean, event: Event)",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"Name",paraId:9,tocIndex:10},{value:"Description",paraId:9,tocIndex:10},{value:"blur()",paraId:9,tocIndex:10},{value:"Remove focus",paraId:9,tocIndex:10},{value:"focus()",paraId:9,tocIndex:10},{value:"Get focus",paraId:9,tocIndex:10},{value:"Form.Item default bind value to ",paraId:10,tocIndex:14},{value:"value",paraId:10,tocIndex:14},{value:" property, but Switch value property is ",paraId:10,tocIndex:14},{value:"checked",paraId:10,tocIndex:14},{value:". You can use ",paraId:10,tocIndex:14},{value:"valuePropName",paraId:10,tocIndex:14},{value:" to change bind property.",paraId:10,tocIndex:14},{value:'<Form.Item name="fieldA" valuePropName="checked">\n  <Switch />\n</Form.Item>\n',paraId:11,tocIndex:14}]])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);