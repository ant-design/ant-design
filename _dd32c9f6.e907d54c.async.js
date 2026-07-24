(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var a=e.i(191788);e.s(["default",0,(...e)=>{let[t,o]=(0,a.useState)(...e);return[t,(...e)=>{(0,a.startTransition)(()=>{o(...e)})}]}])},758035,e=>{"use strict";var a=e.i(391398),t=e.i(191788),o=e.i(218589),n=e.i(831036);let d=(0,e.i(827830).createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:r,theme:l}=d(),{value:i,children:c,enablePopover:s}=e,u=t.useMemo(()=>new o.FastColor(i).toHexString(),[i]),p=(0,a.jsxs)("span",{className:r.codeSpan,children:[(0,a.jsx)("span",{className:r.dot,style:{backgroundColor:u}}),c??u]});return s&&(p=(0,a.jsx)(n.Popover,{destroyOnHidden:!0,placement:"left",content:(0,a.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:l.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},742754,e=>{"use strict";var a=e.i(391398),t=e.i(191788),o=e.i(48750),n=e.i(883376),d=e.i(686111),r=e.i(606552),l=e.i(504909),i=e.i(831036),c=e.i(504595),s=e.i(974398),u=e.i(827830),p=e.i(750298),I=e.i(470318);e.i(56925);var x=e.i(582225),v=e.i(632086),m=e.i(417546);let h=(e,a)=>{let t=e.toLowerCase().includes("color"),o=a.toLowerCase().includes("color");return t&&!o?-1:!t&&o?1:e<a?-1:1},g=(0,p.getDesignToken)(),f={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here is your component tokens",globalComment:"here is your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),b=e=>{let{defaultOpen:p=!0,tokens:b,title:y,helpText:j,helpLink:T,component:$,comment:C}=e,[,S]=(0,x.default)(f),w=(0,u.useTheme)(),z=(0,v.useColumns)(),[M,L]=(0,t.useState)(p),{styles:D}=k(),N=(0,t.useMemo)(()=>{let e=$?`<ConfigProvider
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
</ConfigProvider>`;return I.default.highlight(e,I.default.languages.jsx||I.default.languages.javascript,"jsx")},[$,C]);if(!b.length)return null;let O=b.sort($?void 0:h).map(e=>{let a=$?m.tokenMeta.components[$].find(a=>a.token===e):m.tokenMeta.global[e];return a?{name:e,desc:"cn"===S?a.desc:a.descEn,type:a.type,value:$?m.tokenData[$]?.component[e]:g[e]}:null}).filter(e=>null!=e);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:D.tableTitle,onClick:()=>L(e=>!e),children:[(0,a.jsx)(d.RightOutlined,{className:D.arrowIcon,rotate:90*!!M}),(0,a.jsxs)(l.Flex,{className:D.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[y,(0,a.jsx)(i.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,a.jsxs)(s.Typography,{children:[(0,a.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,a.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:N}})}),(0,a.jsxs)("a",{href:T,target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(o.LinkOutlined,{style:{marginInlineEnd:4}}),j]})]}),children:(0,a.jsxs)("span",{className:D.help,children:[(0,a.jsx)(n.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),j]})})]})]}),M&&(0,a.jsx)(r.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,a.jsx)(c.Table,{size:"middle",columns:z,bordered:!0,dataSource:O,style:{marginBottom:w.margin},pagination:!1,rowKey:e=>e.name})})]})};var y=t.default.memo(({component:e})=>{let[o]=(0,x.default)(f),n=(0,t.useMemo)(()=>{let{componentComment:e,globalComment:a}=o;return{componentComment:e,globalComment:a}},[o]),d=(0,t.useMemo)(()=>{let a=new Set;return e.split(",").forEach(e=>{let{global:t=[]}=m.tokenData[e]||{};t.forEach(e=>{a.add(e)})}),Array.from(a)},[e]);return(0,a.jsxs)(a.Fragment,{children:[m.tokenMeta.components[e]?.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:o.componentToken,helpText:o.help,helpLink:o.customizeTokenLink,tokens:m.tokenMeta.components[e].map(e=>e.token),component:e,comment:n}),d.length>0&&(0,a.jsx)(b,{defaultOpen:!0,title:o.globalToken,helpText:o.help,helpLink:o.customizeComponentTokenLink,tokens:d,comment:n})]})});e.s(["default",0,y])},720637,e=>{"use strict";var a=e.i(391398),t=e.i(191788),o=e.i(91595),n=e.i(771229),d=e.i(707065),r=e.i(183668),l=e.i(788296),i=e.i(624057),c=e.i(797091),s=e.i(927298),u=e.i(564062),p=e.i(926602),I=e.i(741214);let x=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:a})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${a.margin};
    border-radius: ${a.borderRadiusLG};
  `}));var v=()=>(0,a.jsx)(I.Skeleton.Node,{active:!0,className:x.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:I,setShowDebug:x}=t.default.use(p.default),[m,h]=(0,u.default)(!1),g=t.default.useMemo(()=>e.reduce((e,a)=>{let{previewerProps:t}=a,{debug:o}=t;return o&&!I?e:e.concat({...a,previewerProps:{...t,expand:m,debug:!1,originDebug:o}})},[]),[m,e,I]);return(0,a.jsxs)("div",{className:"demo-wrapper",children:[(0,a.jsx)(d.Global,{styles:d.css`
          :root {
            --antd-site-api-deprecated-display: ${I?"table-row":"none"};
          }
        `}),(0,a.jsxs)("span",{className:"all-code-box-controls",children:[(0,a.jsx)(l.Tooltip,{title:(0,a.jsx)(s.FormattedMessage,{id:`app.component.examples.${m?"collapse":"expand"}`}),children:(0,a.jsx)(r.Button,{type:"text",size:"small",icon:(0,a.jsx)(n.CodeOutlined,{}),onClick:()=>{h(!m)},className:m?"icon-enabled":""})}),(0,a.jsx)(l.Tooltip,{title:(0,a.jsx)(s.FormattedMessage,{id:`app.component.examples.${I?"hide":"visible"}`}),children:(0,a.jsx)(r.Button,{type:"text",size:"small",icon:(0,a.jsx)(o.BugOutlined,{}),onClick:()=>{x?.(!I)},className:I?"icon-enabled":""})})]}),(0,a.jsx)(c.DumiDemoGrid,{items:g,demoRender:e=>(0,a.jsx)(t.Suspense,{fallback:(0,a.jsx)(v,{}),children:(0,a.jsx)(i.DumiDemo,{...e})},e.demo.id)})]})}],720637)},632086,750298,e=>{"use strict";var a=e.i(391398),t=e.i(191788),o=e.i(504595),n=e.i(827830),d=e.i(964473),r=e.i(987058),l=e.i(464745),i=e.i(210336);function c(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=(0,d.default)((0,d.default)({},l.default),t.token),n=null!=(e=t.algorithm)?e:r.default,c=Array.isArray(n)?n.reduce(function(e,a){return a(o,e)},void 0):n(o),s=(0,d.default)((0,d.default)((0,d.default)({},c),t.components),{},{override:null!=(a=t.token)?a:{}});return(0,i.default)(s)}e.s(["getDesignToken",0,c],750298);var s=e.i(582225),u=e.i(183668),p=e.i(504909),I=e.i(788296),x=e.i(974398),v=e.i(973322),m=e.i(38415),h=e=>{let{controls:[o,n,d,r],width:l=180,height:i=l}=e,{token:c}=m.theme.useToken(),s=(e,a)=>"x"===a?e*l:i-e*i,u=l/5,p=(0,t.useId)();return(0,a.jsxs)("svg",{width:l,height:i,viewBox:`0 0 ${l} ${i}`,children:[(0,a.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:c.colorBgContainer}),(0,a.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,a.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:c.colorBorderSecondary,strokeWidth:c.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,a.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          C ${s(o,"x")} ${s(n,"y")},
            ${s(d,"x")} ${s(r,"y")},
            ${l} 0
        `,fill:"none",stroke:c.colorPrimary,strokeWidth:2*c.controlOutlineWidth}),(0,a.jsx)("path",{d:`
          M 0 ${i}
          L ${s(o,"x")} ${s(n,"y")}
          L ${s(d,"x")} ${s(r,"y")}
          L ${l} 0
        `,fill:"none",stroke:c.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:c.controlOutlineWidth}),(0,a.jsx)("circle",{cx:s(o,"x"),cy:s(n,"y"),r:"5",fill:c["red-6"]}),(0,a.jsx)("circle",{cx:s(d,"x"),cy:s(r,"y"),r:"5",fill:c["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,f={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:o}=e,[n]=(0,s.default)(f),d=(0,t.useMemo)(()=>{let e=g.exec(o.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[o]);return d?(0,a.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,a.jsx)(h,{controls:d}),(0,a.jsxs)(p.Flex,{align:"center",children:[(0,a.jsx)(x.Typography.Text,{children:o}),(0,a.jsx)(I.Tooltip,{title:n.open,children:(0,a.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${d.join(",")}`,target:"_blank",icon:(0,a.jsx)(v.default,{})})})]})]}):null},b=e.i(758035),y=e.i(417546);let j=c(),T={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},$=(0,n.createStyles)(({css:e,cssVar:a,token:t})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${t.siteMarkdownCodeBg};
    border: ${a.lineWidth} ${a.lineType} ${a.colorSplit};
    border-radius: ${a.borderRadiusSM};
    font-family: monospace;
  `}));function C(){let[e]=(0,s.default)(T),{styles:t}=$();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,o)=>(0,a.jsx)("span",{className:t.codeSpan,children:o.type})},{title:e.value,key:"value",render:(e,t)=>"string"==typeof t.value&&(t.value.startsWith("#")||t.value.startsWith("rgb"))?(0,a.jsx)(b.default,{value:t.value,enablePopover:!0,children:t.value}):"string"==typeof t.value&&t.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,a.jsx)(k,{value:t.value}):"string"!=typeof t.value?JSON.stringify(t.value):t.value}]}e.s(["default",0,({type:e})=>{let[,n]=(0,s.default)(T),d=C(),r=t.useMemo(()=>Object.entries(y.tokenMeta.global).filter(([,a])=>a.source===e).map(([e,a])=>({name:e,desc:"cn"===n?a.desc:a.descEn,type:a.type,value:j[e]})),[e,n]);return(0,a.jsx)(o.Table,{bordered:!0,rowKey:e=>e.name,dataSource:r,columns:d,pagination:!1})},"useColumns",0,C],632086)},417546,e=>{"use strict";var a=e.i(418031),t=e.i(353250);let o=a.default,n=t.default;e.s(["tokenData",0,n,"tokenMeta",0,o])},920399,e=>{"use strict";e.s(["texts",0,[{value:"当有一组平级的内容。",paraId:0,tocIndex:0},{value:"当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。",paraId:0,tocIndex:0},{value:"常用于一组图片或卡片轮播。",paraId:0,tocIndex:0},{value:"通用属性参考：",paraId:1,tocIndex:9},{value:"通用属性",paraId:2,tocIndex:9},{value:"参数",paraId:3,tocIndex:9},{value:"说明",paraId:3,tocIndex:9},{value:"类型",paraId:3,tocIndex:9},{value:"默认值",paraId:3,tocIndex:9},{value:"版本",paraId:3,tocIndex:9},{value:"全局配置",paraId:4,tocIndex:9},{value:"arrows",paraId:3,tocIndex:9},{value:"是否显示箭头",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"5.17.0",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"autoplay",paraId:3,tocIndex:9},{value:"是否自动切换，如果为 object 可以指定 ",paraId:3,tocIndex:9},{value:"dotDuration",paraId:3,tocIndex:9},{value:" 来展示指示点进度条",paraId:3,tocIndex:9},{value:"boolean | { dotDuration?: boolean }",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"dotDuration: 5.24.0",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"autoplaySpeed",paraId:3,tocIndex:9},{value:"自动切换的间隔（毫秒）",paraId:3,tocIndex:9},{value:"number",paraId:3,tocIndex:9},{value:"3000",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"adaptiveHeight",paraId:3,tocIndex:9},{value:"高度自适应",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"dotPlacement",paraId:3,tocIndex:9},{value:"面板指示点位置，可选 ",paraId:3,tocIndex:9},{value:"top",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"bottom",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"start",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"end",paraId:3,tocIndex:9},{value:"string",paraId:3,tocIndex:9},{value:"bottom",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"dotPosition",paraId:3,tocIndex:9},{value:"面板指示点位置，可选 ",paraId:3,tocIndex:9},{value:"top",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"bottom",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"left",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"right",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"start",paraId:3,tocIndex:9},{value:" ",paraId:3,tocIndex:9},{value:"end",paraId:3,tocIndex:9},{value:"，请使用 ",paraId:3,tocIndex:9},{value:"dotPlacement",paraId:3,tocIndex:9},{value:" 替换",paraId:3,tocIndex:9},{value:"string",paraId:3,tocIndex:9},{value:"bottom",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"dots",paraId:3,tocIndex:9},{value:"是否显示面板指示点，如果为 ",paraId:3,tocIndex:9},{value:"object",paraId:3,tocIndex:9},{value:" 则可以指定 ",paraId:3,tocIndex:9},{value:"dotsClass",paraId:3,tocIndex:9},{value:"boolean | { className?: string }",paraId:3,tocIndex:9},{value:"true",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"draggable",paraId:3,tocIndex:9},{value:"是否启用拖拽切换",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"fade",paraId:3,tocIndex:9},{value:"使用渐变切换动效",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"infinite",paraId:3,tocIndex:9},{value:"是否无限循环切换（实现方式是复制两份 children 元素，如果子元素有副作用则可能会引发 bug）",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"true",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"speed",paraId:3,tocIndex:9},{value:"切换动效的时间（毫秒）",paraId:3,tocIndex:9},{value:"number",paraId:3,tocIndex:9},{value:"500",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"easing",paraId:3,tocIndex:9},{value:"动画效果",paraId:3,tocIndex:9},{value:"string",paraId:3,tocIndex:9},{value:"linear",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"effect",paraId:3,tocIndex:9},{value:"动画效果函数",paraId:3,tocIndex:9},{value:"scrollx",paraId:3,tocIndex:9},{value:" | ",paraId:3,tocIndex:9},{value:"fade",paraId:3,tocIndex:9},{value:"scrollx",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"afterChange",paraId:3,tocIndex:9},{value:"切换面板的回调",paraId:3,tocIndex:9},{value:"(current: number) => void",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"beforeChange",paraId:3,tocIndex:9},{value:"切换面板的回调",paraId:3,tocIndex:9},{value:"(current: number, next: number) => void",paraId:3,tocIndex:9},{value:"-",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"waitForAnimate",paraId:3,tocIndex:9},{value:"是否等待切换动画",paraId:3,tocIndex:9},{value:"boolean",paraId:3,tocIndex:9},{value:"false",paraId:3,tocIndex:9},{value:"×",paraId:3,tocIndex:9},{value:"更多 API 可参考：",paraId:5,tocIndex:9},{value:"https://react-slick.neostack.com/docs/api",paraId:5,tocIndex:9},{value:"名称",paraId:6,tocIndex:10},{value:"描述",paraId:6,tocIndex:10},{value:"goTo(slideNumber, dontAnimate)",paraId:6,tocIndex:10},{value:"切换到指定面板, dontAnimate = true 时，不使用动画",paraId:6,tocIndex:10},{value:"next()",paraId:6,tocIndex:10},{value:"切换到下一面板",paraId:6,tocIndex:10},{value:"prev()",paraId:6,tocIndex:10},{value:"切换到上一面板",paraId:6,tocIndex:10},{value:"可参考 ",paraId:7,tocIndex:13},{value:"#12479",paraId:7,tocIndex:13},{value:"。",paraId:7,tocIndex:13}]])},504595,e=>{"use strict";var a=e.i(833663);e.s(["Table",()=>a.default])},48750,e=>{"use strict";var a=e.i(251062);e.s(["LinkOutlined",()=>a.default])},883376,e=>{"use strict";var a=e.i(513875);e.s(["QuestionCircleOutlined",()=>a.default])},686111,e=>{"use strict";var a=e.i(571246);e.s(["RightOutlined",()=>a.default])}]);