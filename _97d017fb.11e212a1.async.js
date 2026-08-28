(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,758035,e=>{"use strict";var t=e.i(391398),i=e.i(191788),r=e.i(218589),n=e.i(831036);let o=(0,e.i(827830).createStyles)(({css:e,cssVar:t,token:i})=>({codeSpan:e`
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
  `}));e.s(["default",0,e=>{let{styles:l,theme:a}=o(),{value:s,children:d,enablePopover:c}=e,u=i.useMemo(()=>new r.FastColor(s).toHexString(),[s]),p=(0,t.jsxs)("span",{className:l.codeSpan,children:[(0,t.jsx)("span",{className:l.dot,style:{backgroundColor:u}}),d??u]});return c&&(p=(0,t.jsx)(n.Popover,{destroyOnHidden:!0,placement:"left",content:(0,t.jsx)("div",{hidden:!0}),styles:{container:{backgroundColor:u,width:120,height:120,borderRadius:a.borderRadiusLG},root:{"--ant-tooltip-arrow-background-color":u}},children:p})),p}])},632086,750298,e=>{"use strict";var t=e.i(391398),i=e.i(191788),r=e.i(504595),n=e.i(827830),o=e.i(964473),l=e.i(987058),a=e.i(464745),s=e.i(210336);function d(){var e,t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=(0,o.default)((0,o.default)({},a.default),i.token),n=null!=(e=i.algorithm)?e:l.default,d=Array.isArray(n)?n.reduce(function(e,t){return t(r,e)},void 0):n(r),c=(0,o.default)((0,o.default)((0,o.default)({},d),i.components),{},{override:null!=(t=i.token)?t:{}});return(0,s.default)(c)}e.s(["getDesignToken",0,d],750298);var c=e.i(582225),u=e.i(183668),p=e.i(504909),h=e.i(788296),x=e.i(974398),y=e.i(973322),m=e.i(38415),f=e=>{let{controls:[r,n,o,l],width:a=180,height:s=a}=e,{token:d}=m.theme.useToken(),c=(e,t)=>"x"===t?e*a:s-e*s,u=a/5,p=(0,i.useId)();return(0,t.jsxs)("svg",{width:a,height:s,viewBox:`0 0 ${a} ${s}`,children:[(0,t.jsx)("title",{children:"Cubic Bezier Visualizer"}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:d.colorBgContainer}),(0,t.jsx)("pattern",{id:p,width:u,height:u,patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:`
          M 0 0 H ${u}
          M 0 0 V ${u}
          M ${u} 0 V ${u}
          M 0 ${u} H ${u}
        `,stroke:d.colorBorderSecondary,strokeWidth:d.controlOutlineWidth,shapeRendering:"crispEdges"})}),(0,t.jsx)("rect",{width:"100%",height:"100%",fill:`url(#${p})`}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          C ${c(r,"x")} ${c(n,"y")},
            ${c(o,"x")} ${c(l,"y")},
            ${a} 0
        `,fill:"none",stroke:d.colorPrimary,strokeWidth:2*d.controlOutlineWidth}),(0,t.jsx)("path",{d:`
          M 0 ${s}
          L ${c(r,"x")} ${c(n,"y")}
          L ${c(o,"x")} ${c(l,"y")}
          L ${a} 0
        `,fill:"none",stroke:d.colorPrimaryActive,strokeDasharray:"4 2",strokeWidth:d.controlOutlineWidth}),(0,t.jsx)("circle",{cx:c(r,"x"),cy:c(n,"y"),r:"5",fill:d["red-6"]}),(0,t.jsx)("circle",{cx:c(o,"x"),cy:c(l,"y"),r:"5",fill:d["green-6"]})]})};let g=/^cubic-bezier\((.*)\)$/,b={cn:{open:"在 cubic-bezier.com 中打开"},en:{open:"Open in cubic-bezier.com"}};var v=e=>{let{value:r}=e,[n]=(0,c.default)(b),o=(0,i.useMemo)(()=>{let e=g.exec(r.toLowerCase().trim());return e?e[1].split(",").map(e=>Number.parseFloat(e.trim())):null},[r]);return o?(0,t.jsxs)(p.Flex,{vertical:!0,gap:"small",children:[(0,t.jsx)(f,{controls:o}),(0,t.jsxs)(p.Flex,{align:"center",children:[(0,t.jsx)(x.Typography.Text,{children:r}),(0,t.jsx)(h.Tooltip,{title:n.open,children:(0,t.jsx)(u.Button,{type:"link",href:`https://cubic-bezier.com/#${o.join(",")}`,target:"_blank",icon:(0,t.jsx)(y.default,{})})})]})]}):null},k=e.i(758035),$=e.i(417546);let j=d(),S={cn:{token:"Token 名称",description:"描述",type:"类型",value:"默认值"},en:{token:"Token Name",description:"Description",type:"Type",value:"Default Value"}},w=(0,n.createStyles)(({css:e,cssVar:t,token:i})=>({codeSpan:e`
    margin: 0 1px;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${i.siteMarkdownCodeBg};
    border: ${t.lineWidth} ${t.lineType} ${t.colorSplit};
    border-radius: ${t.borderRadiusSM};
    font-family: monospace;
  `}));function M(){let[e]=(0,c.default)(S),{styles:i}=w();return[{title:e.token,key:"name",dataIndex:"name"},{title:e.description,key:"desc",dataIndex:"desc"},{title:e.type,key:"type",dataIndex:"type",render:(e,r)=>(0,t.jsx)("span",{className:i.codeSpan,children:r.type})},{title:e.value,key:"value",render:(e,i)=>"string"==typeof i.value&&(i.value.startsWith("#")||i.value.startsWith("rgb"))?(0,t.jsx)(k.default,{value:i.value,enablePopover:!0,children:i.value}):"string"==typeof i.value&&i.value.toLowerCase().trim().startsWith("cubic-bezier")?(0,t.jsx)(v,{value:i.value}):"string"!=typeof i.value?JSON.stringify(i.value):i.value}]}e.s(["default",0,({type:e})=>{let[,n]=(0,c.default)(S),o=M(),l=i.useMemo(()=>Object.entries($.tokenMeta.global).filter(([,t])=>t.source===e).map(([e,t])=>({name:e,desc:"cn"===n?t.desc:t.descEn,type:t.type,value:j[e]})),[e,n]);return(0,t.jsx)(r.Table,{bordered:!0,rowKey:e=>e.name,dataSource:l,columns:o,pagination:!1})},"useColumns",0,M],632086)},417546,e=>{"use strict";var t=e.i(418031),i=e.i(353250);let r=t.default,n=i.default;e.s(["tokenData",0,n,"tokenMeta",0,r])},504595,e=>{"use strict";var t=e.i(833663);e.s(["Table",()=>t.default])}]);