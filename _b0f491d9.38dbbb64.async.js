(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,564062,e=>{"use strict";var t=e.i(191788);e.s(["default",0,(...e)=>{let[i,n]=(0,t.useState)(...e);return[i,(...e)=>{(0,t.startTransition)(()=>{n(...e)})}]}])},758035,e=>{"use strict";var t=e.i(391398),i=e.i(191788),n=e.i(218589),l=e.i(831036);let a=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:i})=>({codeSpan:e`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${i.siteMarkdownCodeBg};
    border-radius: ${t.borderRadius};
    font-family: monospace;
  `,dot:e`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: ${t.marginXXS};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
  `}));e.s(["default",0,e=>{let{styles:s,theme:r}=a(),{value:o,children:c,enablePopover:d}=e,u=i.useMemo(()=>new n.FastColor(o).toHexString(),[o]),h=(0,t.jsxs)("span",{className:s.codeSpan,children:[(0,t.jsx)("span",{className:s.dot,style:{backgroundColor:u}}),c??u]});return d&&(h=(0,t.jsx)(l.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:r.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:h})),h}])},742754,e=>{"use strict";var t=e.i(391398),i=e.i(191788),n=e.i(48750),l=e.i(883376),a=e.i(686111),s=e.i(606552),r=e.i(504909),o=e.i(831036),c=e.i(504595),d=e.i(974398),u=e.i(827830),h=e.i(750298),m=e.i(470318);e.i(56925);var p=e.i(582225),x=e.i(632086),g=e.i(417546);let f=(e,t)=>{let i=e.toLowerCase().includes("color"),n=t.toLowerCase().includes("color");return i&&!n?-1:!i&&n?1:e<t?-1:1},j=(0,h.getDesignToken)(),y={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值",componentToken:"组件 Token",globalToken:"全局 Token",componentComment:"这里是你的组件 token",globalComment:"这里是你的全局 token",help:"如何定制？",customizeTokenLink:"/docs/react/customize-theme-cn#修改主题变量",customizeComponentTokenLink:"/docs/react/customize-theme-cn#修改组件变量"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value",componentToken:"Component Token",globalToken:"Global Token",componentComment:"here are your component tokens",globalComment:"here are your global tokens",help:"How to use?",customizeTokenLink:"/docs/react/customize-theme#customize-design-token",customizeComponentTokenLink:"docs/react/customize-theme#customize-component-token"}},k=(0,u.createStyles)(({cssVar:e})=>({tableTitle:u.css`
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
  `})),v=e=>{let{defaultOpen:h=!0,tokens:v,title:b,helpText:C,helpLink:S,component:w,comment:T}=e,[,$]=(0,p.default)(y),M=(0,u.useTheme)(),z=(0,x.useColumns)(),[B,_]=(0,i.useState)(h),{styles:W}=k(),L=(0,i.useMemo)(()=>{let e=w?`<ConfigProvider
  theme={{
    components: {
      ${w}: {
        /* ${T?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`:`<ConfigProvider
  theme={{
    token: {
      /* ${T?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;return m.default.highlight(e,m.default.languages.jsx||m.default.languages.javascript,"jsx")},[w,T]);if(!v.length)return null;let N=v.sort(w?void 0:f).map(e=>{let t=w?g.tokenMeta.components[w].find(t=>t.token===e):g.tokenMeta.global[e];return t?{name:e,desc:"cn"===$?t.desc:t.descEn,type:t.type,value:w?g.tokenData[w]?.component[e]:j[e]}:null}).filter(e=>null!=e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:W.tableTitle,onClick:()=>_(e=>!e),children:[(0,t.jsx)(a.RightOutlined,{className:W.arrowIcon,rotate:90*!!B}),(0,t.jsxs)(r.Flex,{className:W.tokenTitle,gap:"small",justify:"flex-start",align:"center",children:[b,(0,t.jsx)(o.Popover,{title:null,destroyOnHidden:!0,styles:{root:{width:400}},content:(0,t.jsxs)(d.Typography,{children:[(0,t.jsx)("pre",{dir:"ltr",style:{fontSize:12},children:(0,t.jsx)("code",{dir:"ltr",dangerouslySetInnerHTML:{__html:L}})}),(0,t.jsxs)("a",{href:S,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)(n.LinkOutlined,{style:{marginInlineEnd:4}}),C]})]}),children:(0,t.jsxs)("span",{className:W.help,children:[(0,t.jsx)(l.QuestionCircleOutlined,{style:{marginInlineEnd:4}}),C]})})]})]}),B&&(0,t.jsx)(s.ConfigProvider,{theme:{token:{borderRadius:0}},children:(0,t.jsx)(c.Table,{size:"middle",columns:z,bordered:!0,dataSource:N,style:{marginBottom:M.margin},pagination:!1,rowKey:e=>e.name})})]})};var b=i.default.memo(({component:e})=>{let[n]=(0,p.default)(y),l=(0,i.useMemo)(()=>{let{componentComment:e,globalComment:t}=n;return{componentComment:e,globalComment:t}},[n]),a=(0,i.useMemo)(()=>{let t=new Set;return e.split(",").forEach(e=>{let{global:i=[]}=g.tokenData[e]||{};i.forEach(e=>{t.add(e)})}),Array.from(t)},[e]);return(0,t.jsxs)(t.Fragment,{children:[g.tokenMeta.components[e]?.length>0&&(0,t.jsx)(v,{defaultOpen:!0,title:n.componentToken,helpText:n.help,helpLink:n.customizeTokenLink,tokens:g.tokenMeta.components[e].map(e=>e.token),component:e,comment:l}),a.length>0&&(0,t.jsx)(v,{defaultOpen:!0,title:n.globalToken,helpText:n.help,helpLink:n.customizeComponentTokenLink,tokens:a,comment:l})]})});e.s(["default",0,b])},720637,e=>{"use strict";var t=e.i(391398),i=e.i(191788),n=e.i(91595),l=e.i(771229),a=e.i(707065),s=e.i(183668),r=e.i(788296),o=e.i(624057),c=e.i(797091),d=e.i(927298),u=e.i(564062),h=e.i(926602),m=e.i(741214);let p=(0,e.i(827830).createStaticStyles)(({css:e,cssVar:t})=>({skeletonWrapper:e`
    width: 100% !important;
    height: 250px;
    margin-bottom: ${t.margin};
    border-radius: ${t.borderRadiusLG};
  `}));var x=()=>(0,t.jsx)(m.Skeleton.Node,{active:!0,className:p.skeletonWrapper,style:{width:"100%",height:"100%"},children:" "});e.s(["default",0,({items:e})=>{let{showDebug:m,setShowDebug:p}=i.default.use(h.default),[g,f]=(0,u.default)(!1),j=i.default.useMemo(()=>e.reduce((e,t)=>{let{previewerProps:i}=t,{debug:n}=i;return n&&!m?e:e.concat({...t,previewerProps:{...i,expand:g,debug:!1,originDebug:n}})},[]),[g,e,m]);return(0,t.jsxs)("div",{className:"demo-wrapper",children:[(0,t.jsx)(a.Global,{styles:a.css`
          :root {
            --antd-site-api-deprecated-display: ${m?"table-row":"none"};
          }
        `}),(0,t.jsxs)("span",{className:"all-code-box-controls",children:[(0,t.jsx)(r.Tooltip,{title:(0,t.jsx)(d.FormattedMessage,{id:`app.component.examples.${g?"collapse":"expand"}`}),children:(0,t.jsx)(s.Button,{type:"text",size:"small",icon:(0,t.jsx)(l.CodeOutlined,{}),onClick:()=>{f(!g)},className:g?"icon-enabled":""})}),(0,t.jsx)(r.Tooltip,{title:(0,t.jsx)(d.FormattedMessage,{id:`app.component.examples.${m?"hide":"visible"}`}),children:(0,t.jsx)(s.Button,{type:"text",size:"small",icon:(0,t.jsx)(n.BugOutlined,{}),onClick:()=>{p?.(!m)},className:m?"icon-enabled":""})})]}),(0,t.jsx)(c.DumiDemoGrid,{items:j,demoRender:e=>(0,t.jsx)(i.Suspense,{fallback:(0,t.jsx)(x,{}),children:(0,t.jsx)(o.DumiDemo,{...e})},e.demo.id)})]})}],720637)},939120,e=>{e.v(t=>Promise.all(["_98cc0b7e.5271c028.async.js","_0ed5a5a9.2c3b8321.async.js","_fd679d9d.95a6f7a2.async.js","node_modules__ant-design_icons_es_index_a710919c.77bb68b4.async.js","node_modules__ant-design_c2f0ef7f.7d3a1436.async.js","node_modules__ant-design_icons-svg_lib_asn_b9047e18.c31f3e93.async.js"].map(t=>e.l(t))).then(()=>t(93447)))},34131,e=>{"use strict";var t=e.i(391398),i=e.i(191788),n=e.i(741214),l=e.i(827830);let a=i.default.lazy(()=>e.A(939120)),s=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({searchWrapper:e`
    display: flex;
    gap: ${t.padding};
    > *:first-child {
      flex: 0 0 328px;
    }
    > *:last-child {
      flex: 1;
    }
  `,fallbackWrapper:e`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > * {
      flex: 0 0 15%;
      margin: ${t.marginXXS} 0;
    }
  `,skeletonWrapper:e`
    text-align: center;

    > * {
      width: 100% !important;
    }
  `})),r=()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:s.searchWrapper,children:[(0,t.jsx)(n.Skeleton.Button,{active:!0,style:{width:"100%",height:40}}),(0,t.jsx)(n.Skeleton.Input,{active:!0,style:{width:"100%",height:40}})]}),(0,t.jsx)(n.Skeleton.Button,{active:!0,style:{margin:"28px 0 10px",width:100}}),(0,t.jsx)("div",{className:s.fallbackWrapper,children:Array.from({length:24}).map((e,i)=>(0,t.jsx)("div",{className:s.skeletonWrapper,children:(0,t.jsx)(n.Skeleton.Node,{active:!0,style:{height:110,width:"100%"},children:" "})},i))})]});e.s(["default",0,()=>(0,t.jsx)(i.Suspense,{fallback:(0,t.jsx)(r,{}),children:(0,t.jsx)(a,{})})])},455955,e=>{"use strict";var t=e.i(391398);e.i(191788);var i=e.i(606552),n=e.i(952169),l=e.i(580372),a=e.i(827830),s=e.i(56206);let r=(0,a.createStaticStyles)(({css:e})=>({iconWrap:e`
    display: inline-flex;
    align-items: center;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  `}));var o=e=>{let{className:i,style:n}=e;return(0,t.jsx)("span",{className:(0,s.clsx)(r.iconWrap,i),style:n,children:(0,t.jsxs)("svg",{id:"Bun",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 80 70",width:"1em",height:"1em",children:[(0,t.jsx)("title",{children:"Bun Logo"}),(0,t.jsx)("path",{id:"Shadow",d:"M71.09,20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46,26.46,0,0,1,75.5,35.7c0,16.57-16.82,30.05-37.5,30.05-11.58,0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55,65.3,30.14,69.75,42,69.75c20.68,0,37.5-13.48,37.5-30C79.5,32.69,76.46,26,71.09,20.74Z"}),(0,t.jsxs)("g",{id:"Body",children:[(0,t.jsx)("path",{id:"Background",d:"M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z",style:{fill:"#fbf0df"}}),(0,t.jsx)("path",{id:"Bottom_Shadow","data-name":"Bottom Shadow",d:"M73,35.7a21.67,21.67,0,0,0-.8-5.78c-2.73,33.3-43.35,34.9-59.32,24.94A40,40,0,0,0,38,63.24C57.3,63.24,73,50.89,73,35.7Z",style:{fill:"#f6dece"}}),(0,t.jsx)("path",{id:"Light_Shine","data-name":"Light Shine",d:"M24.53,11.17C29,8.49,34.94,3.46,40.78,3.45A9.29,9.29,0,0,0,38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7c0,.4,0,.8,0,1.19C9.06,15.48,20.07,13.85,24.53,11.17Z",style:{fill:"#fffefc"}}),(0,t.jsx)("path",{id:"Top",d:"M35.12,5.53A16.41,16.41,0,0,1,29.49,18c-.28.25-.06.73.3.59,3.37-1.31,7.92-5.23,6-13.14C35.71,5,35.12,5.12,35.12,5.53Zm2.27,0A16.24,16.24,0,0,1,39,19c-.12.35.31.65.55.36C41.74,16.56,43.65,11,37.93,5,37.64,4.74,37.19,5.14,37.39,5.49Zm2.76-.17A16.42,16.42,0,0,1,47,17.12a.33.33,0,0,0,.65.11c.92-3.49.4-9.44-7.17-12.53C40.08,4.54,39.82,5.08,40.15,5.32ZM21.69,15.76a16.94,16.94,0,0,0,10.47-9c.18-.36.75-.22.66.18-1.73,8-7.52,9.67-11.12,9.45C21.32,16.4,21.33,15.87,21.69,15.76Z",style:{fill:"#ccbea7",fillRule:"evenodd"}}),(0,t.jsx)("path",{id:"Outline",d:"M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"})]}),(0,t.jsxs)("g",{id:"Mouth",children:[(0,t.jsx)("g",{id:"Background-2","data-name":"Background",children:(0,t.jsx)("path",{d:"M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z",style:{fill:"#b71422"}})}),(0,t.jsxs)("g",{id:"Tongue",children:[(0,t.jsx)("path",{id:"Background-3","data-name":"Background",d:"M34,47.79a6.91,6.91,0,0,0,4.12,1.9,6.91,6.91,0,0,0,4.11-1.9,10.63,10.63,0,0,0,1-1.07,6.83,6.83,0,0,0-4.9-2.31,6.15,6.15,0,0,0-5,2.78C33.56,47.4,33.76,47.6,34,47.79Z",style:{fill:"#ff6164"}}),(0,t.jsx)("path",{id:"Outline-2","data-name":"Outline",d:"M34.16,47a5.36,5.36,0,0,1,4.19-2.08,6,6,0,0,1,4,1.69c.23-.25.45-.51.66-.77a7,7,0,0,0-4.71-1.93,6.36,6.36,0,0,0-4.89,2.36A9.53,9.53,0,0,0,34.16,47Z"})]}),(0,t.jsx)("path",{id:"Outline-3","data-name":"Outline",d:"M38.09,50.19a7.42,7.42,0,0,1-4.45-2,9.52,9.52,0,0,1-3.11-5.05,1.2,1.2,0,0,1,.26-1,1.41,1.41,0,0,1,1.13-.51H44.26a1.44,1.44,0,0,1,1.13.51,1.19,1.19,0,0,1,.25,1h0a9.52,9.52,0,0,1-3.11,5.05A7.42,7.42,0,0,1,38.09,50.19Zm-6.17-7.4c-.16,0-.2.07-.21.09a8.29,8.29,0,0,0,2.73,4.37A6.23,6.23,0,0,0,38.09,49a6.28,6.28,0,0,0,3.65-1.73,8.3,8.3,0,0,0,2.72-4.37.21.21,0,0,0-.2-.09Z"})]}),(0,t.jsxs)("g",{id:"Face",children:[(0,t.jsx)("ellipse",{id:"Right_Blush","data-name":"Right Blush",cx:"53.22",cy:"40.18",rx:"5.85",ry:"3.44",style:{fill:"#febbd0"}}),(0,t.jsx)("ellipse",{id:"Left_Bluch","data-name":"Left Bluch",cx:"22.95",cy:"40.18",rx:"5.85",ry:"3.44",style:{fill:"#febbd0"}}),(0,t.jsx)("path",{id:"Eyes",d:"M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z",style:{fillRule:"evenodd"}}),(0,t.jsx)("path",{id:"Iris",d:"M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z",style:{fill:"#fff",fillRule:"evenodd"}})]})]})})};let c=(0,a.createStaticStyles)(({css:e})=>({iconWrap:e`
    display: inline-flex;
    align-items: center;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  `}));var d=e=>{let{className:i,style:n}=e;return(0,t.jsx)("span",{className:(0,s.clsx)(c.iconWrap,i),style:n,children:(0,t.jsxs)("svg",{fill:"#E53E3E",focusable:"false",height:"1em",stroke:"#E53E3E",strokeWidth:"0",viewBox:"0 0 16 16",width:"1em",children:[(0,t.jsx)("title",{children:"npm icon"}),(0,t.jsx)("path",{d:"M0 0v16h16v-16h-16zM13 13h-2v-8h-3v8h-5v-10h10v10z"})]})})};let u=(0,a.createStaticStyles)(({css:e})=>({iconWrap:e`
    display: inline-flex;
    align-items: center;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  `}));var h=e=>{let{className:i,style:n}=e;return(0,t.jsx)("span",{className:(0,s.clsx)(u.iconWrap,i),style:n,children:(0,t.jsxs)("svg",{"aria-hidden":"true",fill:"#F69220",focusable:"false",height:"1em",role:"img",stroke:"#F69220",strokeWidth:"0",viewBox:"0 0 24 24",width:"1em",children:[(0,t.jsx)("title",{children:"pnpm icon"}),(0,t.jsx)("path",{d:"M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"})]})})};let m=(0,a.createStaticStyles)(({css:e})=>({iconWrap:e`
    display: inline-flex;
    align-items: center;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  `}));var p=e=>{let{className:i,style:n}=e;return(0,t.jsx)("span",{className:(0,s.clsx)(m.iconWrap,i),style:n,children:(0,t.jsxs)("svg",{"aria-hidden":"true",fill:"#2C8EBB",focusable:"false",height:"1em",stroke:"#2C8EBB",strokeWidth:"0",viewBox:"0 0 496 512",width:"1em",children:[(0,t.jsx)("title",{children:"yarn icon"}),(0,t.jsx)("path",{d:"M393.9 345.2c-39 9.3-48.4 32.1-104 47.4 0 0-2.7 4-10.4 5.8-13.4 3.3-63.9 6-68.5 6.1-12.4.1-19.9-3.2-22-8.2-6.4-15.3 9.2-22 9.2-22-8.1-5-9-9.9-9.8-8.1-2.4 5.8-3.6 20.1-10.1 26.5-8.8 8.9-25.5 5.9-35.3.8-10.8-5.7.8-19.2.8-19.2s-5.8 3.4-10.5-3.6c-6-9.3-17.1-37.3 11.5-62-1.3-10.1-4.6-53.7 40.6-85.6 0 0-20.6-22.8-12.9-43.3 5-13.4 7-13.3 8.6-13.9 5.7-2.2 11.3-4.6 15.4-9.1 20.6-22.2 46.8-18 46.8-18s12.4-37.8 23.9-30.4c3.5 2.3 16.3 30.6 16.3 30.6s13.6-7.9 15.1-5c8.2 16 9.2 46.5 5.6 65.1-6.1 30.6-21.4 47.1-27.6 57.5-1.4 2.4 16.5 10 27.8 41.3 10.4 28.6 1.1 52.7 2.8 55.3.8 1.4 13.7.8 36.4-13.2 12.8-7.9 28.1-16.9 45.4-17 16.7-.5 17.6 19.2 4.9 22.2zM496 256c0 136.9-111.1 248-248 248S0 392.9 0 256 111.1 8 248 8s248 111.1 248 248zm-79.3 75.2c-1.7-13.6-13.2-23-28-22.8-22 .3-40.5 11.7-52.8 19.2-4.8 3-8.9 5.2-12.4 6.8 3.1-44.5-22.5-73.1-28.7-79.4 7.8-11.3 18.4-27.8 23.4-53.2 4.3-21.7 3-55.5-6.9-74.5-1.6-3.1-7.4-11.2-21-7.4-9.7-20-13-22.1-15.6-23.8-1.1-.7-23.6-16.4-41.4 28-12.2.9-31.3 5.3-47.5 22.8-2 2.2-5.9 3.8-10.1 5.4h.1c-8.4 3-12.3 9.9-16.9 22.3-6.5 17.4.2 34.6 6.8 45.7-17.8 15.9-37 39.8-35.7 82.5-34 36-11.8 73-5.6 79.6-1.6 11.1 3.7 19.4 12 23.8 12.6 6.7 30.3 9.6 43.9 2.8 4.9 5.2 13.8 10.1 30 10.1 6.8 0 58-2.9 72.6-6.5 6.8-1.6 11.5-4.5 14.6-7.1 9.8-3.1 36.8-12.3 62.2-28.7 18-11.7 24.2-14.2 37.6-17.4 12.9-3.2 21-15.1 19.4-28.2z"})]})})};e.s(["default",0,e=>{let{npm:a,yarn:s,pnpm:r,bun:c}=e,u=[{key:"npm",label:"npm",children:a?(0,t.jsx)(l.default,{lang:"bash",children:a}):null,icon:(0,t.jsx)(d,{})},{key:"yarn",label:"yarn",children:s?(0,t.jsx)(l.default,{lang:"bash",children:s}):null,icon:(0,t.jsx)(p,{})},{key:"pnpm",label:"pnpm",children:r?(0,t.jsx)(l.default,{lang:"bash",children:r}):null,icon:(0,t.jsx)(h,{})},{key:"bun",label:"Bun",children:c?(0,t.jsx)(l.default,{lang:"bash",children:c}):null,icon:(0,t.jsx)(o,{})}].filter(e=>e.children);return(0,t.jsx)(i.ConfigProvider,{theme:{components:{Tabs:{horizontalMargin:"0"}}},children:(0,t.jsx)(n.Tabs,{className:"markdown",size:"small",defaultActiveKey:"npm",items:u})})}],455955)},632086,750298,e=>{"use strict";var t=e.i(391398),i=e.i(191788),n=e.i(504595),l=e.i(827830),a=e.i(964473),s=e.i(987058),r=e.i(464745),o=e.i(210336);function c(){var e,t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,a.default)((0,a.default)({},r.default),i.token),l=null!=(e=i.algorithm)?e:s.default,c=Array.isArray(l)?l.reduce(function(e,t){return t(n,e)},void 0):l(n),d=(0,a.default)((0,a.default)((0,a.default)({},c),i.components),{},{override:null!=(t=i.token)?t:{}});return(0,o.default)(d)}e.s(["getDesignToken",0,c],750298);var d=e.i(582225),u=e.i(183668),h=e.i(504909),m=e.i(788296),p=e.i(974398),x=e.i(973322),g=e.i(38415),f=e=>{let{controls:[n,l,a,s],width:r=180,height:o=r}=e,{token:c}=g.theme.useToken(),d=(e,t)=>"x"===t?e*r:o-e*o,u=r/5,h=(0,i.useId)();return(0,t.jsxs)("svg",{width:r,height:o,viewBox:`0 0 ${r} ${o}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:c.colorBgContainer}),(0,t.jsx)("pattern",{id:h,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:c.colorBorderSecondary,strokeWidth:c.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${h})`}),(0,t.jsx)("path",{d:`
          M 0 ${o}
          C ${d(n,"x")} ${d(l,"y")},
            ${d(a,"x")} ${d(s,"y")},
            ${r} 0
        `,fill:"none",stroke:c.colorPrimary,strokeWidth:2*c.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${o}
          L ${d(n,"x")} ${d(l,"y")}
          L ${d(a,"x")} ${d(s,"y")}
          L ${r} 0
        `,fill:"none",stroke:c.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:c.controlOutlineWidth}),(0,t.jsx)("circle",{cx:d(n,"x"),cy:d(l,"y"),r:"5",fill:c["red-6"]}),(0,t.jsx)("circle",{cx:d(a,"x"),cy:d(s,"y"),r:"5",fill:c["green-6"]})]})};let j=/^cubic-bezier\((.*)\)$/,y={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var k=e=>{let{value:n}=e,[l]=(0,d.default)(y),a=(0,i.useMemo)(()=>{let e=j.exec(n.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[n]);return a?(0,t.jsxs)(h.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(f,{controls:a}),(0,t.jsxs)(h.Flex,{align:"center",children:[(0,t.jsx)(p.Typography.Text,{children:n}),(0,t.jsx)(m.Tooltip,{title:l.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${a.join(",")}`,target:"_blank",icon:(0,t.jsx)(x.default,{})})})]})]}):null},v=e.i(758035),b=e.i(417546);let C=c(),S={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},w=(0,l.createStyles)(({css:e,cssVar:t,token:i})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${i.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function T(){let[e]=(0,d.default)(S),{styles:i}=w();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,n)=>(0,t.jsx)("span",{className:i.codeSpan,children:n.type})},{title:e.value,key:"value",render:(e,i)=>"string"==typeof i.value&&(i.value.startsWith("#")||i.value.startsWith("rgb"))?(0,t.jsx)(v.default,{value:i.value,enablePopover:!0,children:i.value}):"string"==typeof i.value&&i.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(k,{value:i.value}):"string"!=typeof i.value?JSON.stringify(i.value):i.value}]}e.s(["default",0,({type:e})=>{let[,l]=(0,d.default)(S),a=T(),s=i.useMemo(()=>Object.entries(b.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===l?t.desc:t.descEn,type:t.type,value:C[e]})),[e,l]);return(0,t.jsx)(n.Table,{bordered:!0,rowKey:e=>e.name,dataSource:s,columns:a,pagination:!1})},"useColumns",0,T],632086)},417546,e=>{"use strict";var t=e.i(418031),i=e.i(353250);let n=t.default,l=i.default;e.s(["tokenData",0,l,"tokenMeta",0,n])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])},48750,e=>{"use strict";var t=e.i(251062);e.s(["LinkOutlined",()=>t.default])},883376,e=>{"use strict";var t=e.i(513875);e.s(["QuestionCircleOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])}]);