(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["ec324310"],{"034d788b":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return c;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("97c488ea")),r=a._(n("c96b0d01")),o=n("5b220c3d"),s=n("9c86e52a"),d=n("5dd4aaae"),c=function(){return(0,i.jsx)(s.DumiPage,{children:(0,i.jsx)(o.Suspense,{fallback:(0,i.jsx)(r.default,{}),children:(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"markdown",children:[(0,i.jsxs)("p",{align:"center",children:[d.texts[0].value,(0,i.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*_DMIQaxDuXsAAAAAgDAAAAgAegCCAQ/fmt.webp",alt:"Ant Design 6.0"})]}),(0,i.jsx)("p",{children:d.texts[1].value}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[2].value}),d.texts[3].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[4].value}),d.texts[5].value,(0,i.jsx)("code",{children:d.texts[6].value}),d.texts[7].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[8].value}),d.texts[9].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[10].value}),d.texts[11].value,(0,i.jsx)(l.default,{href:"https://5x.ant.design",sourceType:"a",children:d.texts[12].value}),d.texts[13].value]})]}),(0,i.jsxs)("p",{children:[d.texts[14].value,(0,i.jsx)("strong",{children:(0,i.jsx)(l.default,{href:"https://github.com/ant-design/x/issues/1358",sourceType:"a",children:d.texts[15].value})}),d.texts[16].value]})]})})})});};},"1b87ba52":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var a=n("f19d2b93"),i=n("a9d1a279"),l=e=>{let{item:{username:t,url:n}={}}=e;return t?(0,a.jsx)(i.Tooltip,{title:t,children:(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:`https://github.com/${t}`,target:"_blank",rel:"noopener noreferrer",children:(0,a.jsx)(i.Avatar,{size:"small",src:n,alt:t,children:t})})})}):null;};},"25c612ac":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return b;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("5b220c3d")),r=n("47413d36"),o=n("e22febe0"),s=n("3835a2b7"),d=a._(n("8a36253d")),c=n("9c86e52a"),u=a._(n("4589ed41")),p=a._(n("23546486")),f=a._(n("91a66390")),m=a._(n("714a8bde")),g=a._(n("80a8572e"));let h={cn:{owner:"\u8682\u8681\u96C6\u56E2\u548C Ant Design \u5F00\u6E90\u793E\u533A"},en:{owner:"Ant Group and Ant Design Community"}},x=(0,s.createStyles)(({cssVar:e,token:t,css:n},a)=>{let i=new r.FastColor((0,d.default)("#f0f3fa","#fff")).onBackground(t.colorBgContainer).toHexString();return{holder:n`
      background: ${i};
    `,footer:n`
      background: ${i};
      color: ${e.colorTextSecondary};
      box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

      * {
        box-sizing: border-box;
      }

      h2,
      a {
        color: ${e.colorText};
      }
      .rc-footer-column {
        margin-bottom: ${a?60:0}px;
        :last-child {
          margin-bottom: ${a?20:0}px;
        }
      }
      .rc-footer-item-icon {
        top: -1.5px;
      }
      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${e.marginXXL};
      }
      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${e.fontSize};
        }
      }
    `};});var b=()=>{let e=(0,f.default)(),[t,n]=(0,p.default)(h),{isMobile:a}=l.default.use(m.default),{styles:r}=x(a),{getLink:s}=e,d=l.default.useMemo(()=>{let e="cn"===n,t={title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.resources"}),items:[{title:"Ant Design X",url:e?"https://ant-design-x.antgroup.com":"https://x.ant.design",openExternal:!0},{title:"Ant Design Charts",url:e?"https://ant-design-charts.antgroup.com":"https://charts.ant.design",openExternal:!0},{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Pro Components",url:e?"https://pro-components.antdigital.dev":"https://procomponents.ant.design",openExternal:!0},{title:"Ant Design Mobile",url:e?"https://ant-design-mobile.antgroup.com/zh":"https://mobile.ant.design",openExternal:!0},{title:"Ant Design Mini",url:e?"https://ant-design-mini.antgroup.com/":"https://mini.ant.design",openExternal:!0},{title:"Ant Design Web3",url:e?"https://web3.antdigital.dev":"https://web3.ant.design",openExternal:!0},{title:"Ant Design Landing",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.landing"}),url:"https://landing.ant.design",openExternal:!0},{title:"Scaffolds",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.scaffolds"}),url:"https://scaffold.ant.design",openExternal:!0},{title:"Umi",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.umi"}),url:"https://umijs.org",openExternal:!0},{title:"dumi",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.dumi"}),url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.qiankun"}),url:"https://qiankun.umijs.org",openExternal:!0},{title:"Ant Motion",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.motion"}),url:"https://motion.ant.design",openExternal:!0},{title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.chinamirror"}),url:"https://ant-design.antgroup.com"}]},a={title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.community"}),items:[{icon:(0,i.jsx)(o.AntDesignOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.awesome"}),url:"https://github.com/websemantics/awesome-ant-design",openExternal:!0},{icon:(0,i.jsx)(o.MediumOutlined,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,i.jsx)(o.XOutlined,{}),title:"X",url:"http://x.com/antdesignui",openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.yuque.repo"}),url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,i.jsx)(o.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.zhihu"}),url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,i.jsx)(o.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.zhihu.xtech"}),url:"https://www.zhihu.com/column/c_1543658574504751104",openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",width:16,height:16,alt:"seeconf logo"}),title:"SEE Conf",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.seeconf"}),url:"https://seeconf.antfin.com/",openExternal:!0}]};return e&&a.items.push({icon:(0,i.jsx)(o.UsergroupAddOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.work_with_us"}),url:s("/docs/resources",{cn:"\u52A0\u5165\u6211\u4EEC",en:"JoinUs"}),LinkComponent:c.Link}),[t,a,{title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.help"}),items:[{icon:(0,i.jsx)(o.GithubOutlined,{}),title:"GitHub",url:"https://github.com/ant-design/ant-design",openExternal:!0},{icon:(0,i.jsx)(o.HistoryOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.change-log"}),url:s("/changelog"),LinkComponent:c.Link},{icon:(0,i.jsx)(o.QuestionCircleOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.faq"}),url:s("/docs/react/faq"),LinkComponent:c.Link},{icon:(0,i.jsx)(o.BugOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.bug-report"}),url:"https://new-issue.ant.design/",openExternal:!0},{icon:(0,i.jsx)(o.IssuesCloseOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.issues"}),url:"https://github.com/ant-design/ant-design/issues",openExternal:!0},{icon:(0,i.jsx)(o.MessageOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.discussions"}),url:"https://github.com/ant-design/ant-design/discussions",openExternal:!0},{icon:(0,i.jsx)(o.QuestionCircleOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.stackoverflow"}),url:"http://stackoverflow.com/questions/tagged/antd",openExternal:!0},{icon:(0,i.jsx)(o.QuestionCircleOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.segmentfault"}),url:"https://segmentfault.com/t/antd",openExternal:!0}]},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:22,height:22,alt:"Ant XTech logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.more-product"}),items:[{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.yuque"}),url:"https://yuque.com",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.yuque.slogan"}),openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",width:16,height:16,alt:"AntV logo"}),title:"AntV",url:"https://antv.antgroup.com",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.antv.slogan"}),openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://www.eggjs.org/logo.svg",alt:"Egg logo",width:16,height:16}),title:"Egg",url:"https://eggjs.org",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.egg.slogan"}),openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",width:16,height:16,alt:"Kitchen logo"}),title:"Kitchen",description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.kitchen"}),url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*3ittT5OEo2gAAAAAAAAAAAAADvGmAQ/original",width:16,height:16,alt:"Galacean logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.galacean"}),description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.galacean.slogan"}),url:"https://galacean.antgroup.com/",openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_4qpv3u/afts/img/iH6wQKX4WCYAAAAAAAAAAAAAeocTAQFr/original",width:16,height:16,alt:"WeaveFox logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.weavefox"}),description:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.weavefox.slogan"}),url:"https://weavefox.cn/",openExternal:!0},{icon:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:16,height:16,alt:"xtech logo"}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.xtech"}),url:"https://xtech.antfin.com/",openExternal:!0},{icon:(0,i.jsx)(o.BgColorsOutlined,{}),title:(0,i.jsx)(c.FormattedMessage,{id:"app.footer.theme"}),url:s("/theme-editor"),LinkComponent:c.Link}]}];},[s,n]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(u.default,{columns:d,className:r.footer,bottom:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{style:{opacity:"0.4"},children:["Made with ",(0,i.jsx)("span",{style:{color:"#fff"},children:"\u2764"})," by"]}),(0,i.jsx)("div",{children:t.owner})]})}),(0,i.jsx)(g.default,{})]});};},"345ed9ab":function(e,t,n){},"3a21ca9c":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return c;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("97c488ea")),r=a._(n("c96b0d01")),o=n("5b220c3d"),s=n("9c86e52a"),d=n("3dc5a419"),c=function(){return(0,i.jsx)(s.DumiPage,{children:(0,i.jsx)(o.Suspense,{fallback:(0,i.jsx)(r.default,{}),children:(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"markdown",children:[(0,i.jsxs)("p",{align:"center",children:[d.texts[0].value,(0,i.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*_DMIQaxDuXsAAAAAgDAAAAgAegCCAQ/fmt.webp",alt:"Ant Design 6.0"})]}),(0,i.jsx)("p",{children:d.texts[1].value}),(0,i.jsxs)("ul",{children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[2].value}),d.texts[3].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[4].value}),d.texts[5].value,(0,i.jsx)("code",{children:d.texts[6].value}),d.texts[7].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[8].value}),d.texts[9].value]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:d.texts[10].value}),d.texts[11].value,(0,i.jsx)(l.default,{href:"https://5x.ant.design",sourceType:"a",children:d.texts[12].value}),d.texts[13].value]})]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:(0,i.jsx)(l.default,{href:"https://github.com/ant-design/x/issues/1357",sourceType:"a",children:d.texts[14].value})}),d.texts[15].value]})]})})})});};},"3dc5a419":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"texts",{enumerable:!0,get:function(){return a;}}),n("345ed9ab");let a=[{value:"\n  ",paraId:0},{value:"After extensive refinement, v6 is officially released! This upgrade focuses on deep technical optimizations for better performance and developer experience:",paraId:1},{value:"Technical Upgrades",paraId:2},{value:": Minimum React 18 support; defaults to Pure CSS Variables mode, supporting zero-runtime styles and real-time theme switching.",paraId:2},{value:"Semantic Structure",paraId:2},{value:": All components now feature semantic DOM structure, enabling flexible customization via ",paraId:2},{value:"classNames",paraId:2},{value:".",paraId:2},{value:"New Features",paraId:2},{value:": Added Masonry component; Tooltip panning; InputNumber spinner mode; Resizable Drawer; default blur mask for overlays.",paraId:2},{value:"Smooth Migration",paraId:2},{value:": Direct upgrade from v5 without codemod tools. For v5 documentation, please visit ",paraId:2},{value:"5x.ant.design",paraId:2},{value:".",paraId:2},{value:"Ant Design X 2.0",paraId:3},{value:" for AI scenarios is also released simultaneously. Explore now!",paraId:3}];},"3e969a12":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return x;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("5b220c3d"),r=n("a9d1a279"),o=n("3835a2b7"),s=n("c84cdf47"),d=n("9c86e52a"),c=a._(n("0a03b273")),u=a._(n("23546486")),p=a._(n("91a66390"));let f={cn:{deprecated:"\u5E9F\u5F03",updated:"\u66F4\u65B0",new:"\u65B0\u589E"},en:{deprecated:"DEPRECATED",updated:"UPDATED",new:"NEW"}},m=e=>{switch(null==e?void 0:e.toUpperCase()){case"UPDATED":return"processing";case"DEPRECATED":return"red";default:return"success";}},g=(0,o.createStaticStyles)(({css:e,cssVar:t})=>({link:e`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,tag:e`
    margin-inline-end: 0;
  `,subtitle:e`
    font-weight: normal;
    font-size: ${t.fontSizeSM};
    opacity: 0.8;
    margin-inline-start: ${t.marginSM};
  `})),h=e=>{let{before:t,after:n,link:a,title:l,subtitle:o,search:d,tag:p,className:h}=e,[x]=(0,u.default)(f);if(!t&&!n){let e;return(0,i.jsxs)(c.default,{to:`${a}${d}`,className:(0,s.clsx)(h,{[g.link]:p}),children:[(0,i.jsxs)(r.Flex,{justify:"flex-start",align:"center",children:[(0,i.jsx)("span",{children:l}),o&&(0,i.jsx)("span",{className:g.subtitle,children:o})]}),p&&(0,i.jsx)(r.Tag,{variant:"filled",className:(0,s.clsx)(g.tag),color:m(p),children:x[(e=p.replace(/VERSION/i,r.version)).toLowerCase()]??e})]});}return(0,i.jsxs)(c.default,{to:`${a}${d}`,className:h,children:[t,l,o&&(0,i.jsx)("span",{className:g.subtitle,children:o}),n]});};var x=(e={})=>{let t=(0,d.useFullSidebarData)(),{pathname:n,search:a}=(0,p.default)(),r=(0,d.useSidebarData)(),{before:o,after:s}=e;return[(0,l.useMemo)(()=>{var e,l;let d=[...r??[]];if(n.startsWith("/docs/spec")){let e=d.splice(0,1);d.push(...e);}if(n.startsWith("/docs/react")){let n=null===(e=Object.entries(t).find(([e])=>e.startsWith("/changelog")))||void 0===e?void 0:e[1];n&&d.splice(1,0,n[0]);}if(n.startsWith("/changelog")){let e=null===(l=Object.entries(t).find(([e])=>e.startsWith("/docs/react")))||void 0===l?void 0:l[1];e&&(d.unshift(e[0]),d.push(...e.slice(1)));}return(null==d?void 0:d.reduce((e,t)=>{if(null==t?void 0:t.title){var l,r;if(n.startsWith("/docs/spec")){let n=t.children.reduce((e,t)=>{var n;let a=(null===(n=t.frontmatter)||void 0===n?void 0:n.type)??"default";return e[a]||(e[a]=[]),e[a].push(t),e;},{}),r=[];r.push(...(null===(l=n.default)||void 0===l?void 0:l.map(e=>({label:(0,i.jsxs)(c.default,{to:`${e.link}${a}`,children:[o,null==e?void 0:e.title,s]}),key:e.link.replace(/(-cn$)/g,"")})))??[]),Object.entries(n).forEach(([e,t])=>{"default"!==e&&r.push({type:"group",label:e,key:e,children:null==t?void 0:t.map(e=>({label:(0,i.jsxs)(c.default,{to:`${e.link}${a}`,children:[o,null==e?void 0:e.title,s]}),key:e.link.replace(/(-cn$)/g,"")}))});}),e.push({label:null==t?void 0:t.title,key:null==t?void 0:t.title,children:r});}else e.push({type:"group",label:null==t?void 0:t.title,key:null==t?void 0:t.title,children:null===(r=t.children)||void 0===r?void 0:r.map(e=>{var t,n;return{label:(0,i.jsx)(h,{before:o,after:s,link:e.link,title:null==e?void 0:e.title,subtitle:null===(t=e.frontmatter)||void 0===t?void 0:t.subtitle,search:a,tag:null===(n=e.frontmatter)||void 0===n?void 0:n.tag}),key:e.link.replace(/(-cn$)/g,"")};})});}else{let n=t.children||[];n.every(e=>{var t;return null==e?void 0:null===(t=e.frontmatter)||void 0===t?void 0:t.date;})&&n.sort((e,t)=>{var n,a;return(null===(n=e.frontmatter)||void 0===n?void 0:n.date)>(null===(a=t.frontmatter)||void 0===a?void 0:a.date)?-1:1;}),e.push(...n.map(e=>{var t;return{label:(0,i.jsx)(h,{before:o,after:s,link:e.link,title:null==e?void 0:e.title,search:a,tag:null===(t=e.frontmatter)||void 0===t?void 0:t.tag}),key:e.link.replace(/(-cn$)/g,"")};}));}return e;},[]))??[];},[r,n,t,a,o,s]),n];};},"43a20bcd":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return c;}});var a=n("f19d2b93"),i=n("646d3849"),l=n("a9d1a279"),r=n("3835a2b7"),o=n("c84cdf47");let s="1.2em",d=(0,r.createStaticStyles)(({cssVar:e,css:t})=>({btn:t`
      width: ${e.controlHeight};
      .btn-inner {
        transition: all ${e.motionDurationMid};
        display: flex;
      }
      img {
        width: ${s};
        height: ${s};
      }
    `,innerDiv:t`
      position: relative;
      width: ${s};
      height: ${s};
    `,labelStyle:t`
      position: absolute;
      font-size: ${s};
      line-height: 1;
      border: 1px solid ${e.colorText};
      color: ${e.colorText};
    `,label1Style:t`
      inset-inline-start: -5%;
      top: 0;
      z-index: 1;
      background-color: ${e.colorText};
      color: ${e.colorBgContainer};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,label2Style:t`
      inset-inline-end: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `}));var c=e=>{let{label1:t,label2:n,tooltip1:r,tooltip2:s,value:c,pure:u,onClick:p,...f}=e,{btn:m,innerDiv:g,labelStyle:h,label1Style:x,label2Style:b}=d,v=(0,a.jsx)(l.Button,{type:"text",onClick:p,className:m,...(0,i.omit)(f,["className"]),children:(0,a.jsxs)("div",{className:"btn-inner",children:[u&&(1===c?t:n),!u&&(0,a.jsxs)("div",{className:g,children:[(0,a.jsx)("span",{className:(0,o.clsx)(h,1===c?x:b),children:t}),(0,a.jsx)("span",{className:(0,o.clsx)(h,1===c?b:x),children:n})]})]})},"lang-button");return r||s?(0,a.jsx)(l.Tooltip,{title:1===c?r:s,children:v}):v;};},"494cb795":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("e22febe0"),s=n("3835a2b7"),d=n("c84cdf47"),c=a._(n("3e969a12")),u=a._(n("714a8bde"));let p=(0,s.createStyles)(({cssVar:e,token:t,css:n})=>{let{iconCls:a}=t,{colorSplit:i,fontSizeIcon:l}=e;return{prevNextNav:n`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: ${e.fontSize};
      border-top: 1px solid ${i};
      display: flex;
    `,pageNav:n`
      flex: 1;
      height: 72px;
      line-height: 72px;
      text-decoration: none;

      ${a} {
        color: #999;
        font-size: ${l};
        transition: all ${e.motionDurationSlow};
      }

      .chinese {
        margin-inline-start: ${e.marginXXS};
      }
    `,prevNav:n`
      text-align: start;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .footer-nav-icon-after {
        display: none;
      }

      .footer-nav-icon-before {
        position: relative;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-end ${e.motionDurationSlow};
        margin-inline-end: 1em;
        inset-inline-end: 0;
      }

      &:hover .footer-nav-icon-before {
        inset-inline-end: 0.2em;
      }
    `,nextNav:n`
      text-align: end;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .footer-nav-icon-before {
        display: none;
      }

      .footer-nav-icon-after {
        position: relative;
        margin-bottom: 1px;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-start ${e.motionDurationSlow};
        margin-inline-start: 1em;
        inset-inline-start: 0;
      }

      &:hover .footer-nav-icon-after {
        inset-inline-start: 0.2em;
      }
    `};}),f=e=>Array.isArray(e)?e.reduce((e,t)=>t?"children"in t&&t.children?e.concat(f(t.children)??[]):e.concat(t):e,[]):null;var m=({rtl:e})=>{let{styles:t}=p(),n={className:"footer-nav-icon-before"},a={className:"footer-nav-icon-after"},i=e?(0,l.jsx)(o.RightOutlined,{...n}):(0,l.jsx)(o.LeftOutlined,{...n}),s=e?(0,l.jsx)(o.LeftOutlined,{...a}):(0,l.jsx)(o.RightOutlined,{...a}),[m,g]=(0,c.default)({before:i,after:s}),{isMobile:h}=r.default.use(u.default),[x,b]=(0,r.useMemo)(()=>{let e=f(m);if(!e)return[null,null];let t=-1;return e.forEach((e,n)=>{e&&e.key===g&&(t=n);}),[e[t-1],e[t+1]];},[m,g]);return h?null:(0,l.jsxs)("section",{className:t.prevNextNav,children:[x&&r.default.cloneElement(x.label,{className:(0,d.clsx)(t.pageNav,t.prevNav,x.className)}),b&&r.default.cloneElement(b.label,{className:(0,d.clsx)(t.pageNav,t.nextNav,b.className)})]});};},"4b6975d6":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return g;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("5b220c3d")),r=n("a9d1a279"),o=n("3835a2b7"),s=n("9c86e52a"),d=a._(n("a7fa2147")),c=a._(n("b550a850")),u=a._(n("25c612ac")),p=n("40d543ed"),f=a._(n("a249a395"));let m=(0,o.createStyles)(({cssVar:e,token:t,css:n},a)=>({resourcePage:n`
      footer {
        margin-top: 176px;
        .rc-footer-container {
          max-width: ${1208}px;
          margin: 0 auto;
          padding-inline-end: 0;
          padding-inline-start: 0;
        }
      }
    `,resourceContent:n`
      padding: 0 ${40}px;
      max-width: ${1208}px;
      margin: 0 auto;
      box-sizing: content-box;
      min-height: 100vh;

      @media only screen and (max-width: 767.99px) {
        & {
          article {
            padding: 0 ${24}px;
          }
          ${t.antCls}-col {
            padding-top: ${e.padding} !important;
            padding-bottom: ${e.padding} !important;
          }
        }
      }
    `,banner:n`
      padding: 0 ${40}px;
      overflow: hidden;
      ${a?"":"background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');"}
      background-size: cover;

      h1 {
        box-sizing: content-box;
        max-width: ${1208}px;
        margin: 56px auto 16px;
      }

      section {
        max-width: ${1208}px;
        margin: 0 auto 56px;
        font-weight: 200;
        font-size: ${e.fontSizeLG};
        line-height: 24px;
      }

      @media only screen and (max-width: 767.99px) {
        & {
          margin: 0 -${24}px;
          padding: 0 ${24}px;
        }
      }
    `}));var g=({children:e})=>{var t;let n=l.default.use(p.DarkContext),{styles:a}=m(n),o=(0,s.useRouteMeta)(),g=(0,i.jsxs)(r.Layout,{children:[(0,i.jsx)(d.default,{}),(0,i.jsxs)("div",{id:"resources-page",className:a.resourcePage,children:[(0,i.jsx)(f.default,{}),(0,i.jsxs)("div",{className:a.banner,children:[(0,i.jsxs)(r.Typography.Title,{style:{fontSize:30},children:[null===(t=o.frontmatter)||void 0===t?void 0:t.title,(0,i.jsx)(c.default,{title:(0,i.jsx)(s.FormattedMessage,{id:"app.content.edit-page"}),filename:o.frontmatter.filename})]}),(0,i.jsx)("section",{children:o.frontmatter.description})]}),(0,i.jsx)("div",{className:a.resourceContent,children:e}),(0,i.jsx)(u.default,{})]})]});return n?g:(0,i.jsx)(r.ConfigProvider,{theme:{token:{colorBgLayout:"#fff"}},children:g});};},"530fedd5":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var a=n("f19d2b93"),i=n("1fe0ede3"),l=n("3835a2b7"),r=()=>{let e=(0,l.useTheme)();return(0,a.jsx)(i.Global,{styles:(0,i.css)`
        .design-inline-cards {
          display: flex;
          margin: 0 -${e.marginMD}px;
        }
        .design-inline-cards > * {
          flex: 10%;
          margin: 0 ${e.marginMD}px;
        }
        .design-inline-cards img {
          width: 100%;
          max-width: 100%;
        }
        .design-inline-cards h4 {
          margin-bottom: 0;
        }
      `});};},"5dd4aaae":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"texts",{enumerable:!0,get:function(){return a;}}),n("cc7bc1e9");let a=[{value:"\n  ",paraId:0},{value:"\u7ECF\u8FC7\u5927\u91CF\u6253\u78E8\uFF0Cv6 \u7248\u672C\u73B0\u5DF2\u6B63\u5F0F\u53D1\u5E03\uFF01\u672C\u6B21\u5347\u7EA7\u4E13\u6CE8\u4E8E\u6280\u672F\u6DF1\u5EA6\u4F18\u5316\uFF0C\u5E26\u6765\u66F4\u4F73\u7684\u6027\u80FD\u4E0E\u5F00\u53D1\u4F53\u9A8C\uFF1A",paraId:1},{value:"\u6280\u672F\u5347\u7EA7",paraId:2},{value:"\uFF1A\u6700\u4F4E\u652F\u6301 React 18\uFF0C\u79FB\u9664\u5386\u53F2\u5305\u88B1\uFF1B\u9ED8\u8BA4\u542F\u7528\u7EAF CSS \u53D8\u91CF\u6A21\u5F0F\uFF0C\u652F\u6301\u96F6\u8FD0\u884C\u65F6\u6837\u5F0F\u4E0E\u5B9E\u65F6\u4E3B\u9898\u5207\u6362\u3002",paraId:2},{value:"\u8BED\u4E49\u5316\u7ED3\u6784",paraId:2},{value:"\uFF1A\u5168\u91CF\u7EC4\u4EF6\u5B8C\u6210 DOM \u8BED\u4E49\u5316\u6539\u9020\uFF0C\u914D\u5408 ",paraId:2},{value:"classNames",paraId:2},{value:" \u5C5E\u6027\u5B9E\u73B0\u66F4\u7075\u6D3B\u7684\u6837\u5F0F\u5B9A\u5236\u3002",paraId:2},{value:"\u65B0\u7279\u6027",paraId:2},{value:"\uFF1A\u65B0\u589E Masonry \u7011\u5E03\u6D41\u7EC4\u4EF6\uFF1BTooltip \u652F\u6301\u5E73\u79FB\uFF1BInputNumber \u65B0\u589E\u6309\u94AE\u6A21\u5F0F\uFF1BDrawer \u652F\u6301\u62D6\u62FD\uFF1B\u5F39\u5C42\u9ED8\u8BA4\u5F00\u542F\u6A21\u7CCA\u80CC\u666F\u3002",paraId:2},{value:"\u5E73\u6ED1\u8FC1\u79FB",paraId:2},{value:"\uFF1Av5 \u9879\u76EE\u53EF\u76F4\u63A5\u5347\u7EA7\uFF0C\u65E0\u9700 codemod \u5DE5\u5177\u3002\u5982\u9700\u67E5\u770B v5 \u6587\u6863\uFF0C\u8BF7\u8BBF\u95EE ",paraId:2},{value:"5x.ant.design",paraId:2},{value:"\u3002",paraId:2},{value:"\u540C\u65F6\uFF0C\u9762\u5411 AI \u573A\u666F\u7684 ",paraId:3},{value:"Ant Design X 2.0",paraId:3},{value:" \u4E5F\u540C\u6B65\u53D1\u5E03\uFF0C\u6B22\u8FCE\u63A2\u7D22\uFF01",paraId:3}];},61595633:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("9c86e52a"),r=a._(n("25c612ac")),o=e=>{let{children:t,title:n,desc:a}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(l.Helmet,{children:[(0,i.jsx)("title",{children:n}),(0,i.jsx)("meta",{property:"og:title",content:n}),a&&(0,i.jsx)("meta",{name:"description",content:a})]}),(0,i.jsx)("div",{style:{minHeight:"100vh"},children:t}),(0,i.jsx)(r.default,{})]});};},"6ee40046":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var a=n("f19d2b93"),i=n("1fe0ede3"),l=n("3835a2b7");let r={1:"#fff",2:"#fafafa",3:"#f5f5f5",4:"#f0f0f0",5:"#d9d9d9",6:"#bfbfbf",7:"#8c8c8c",8:"#595959",9:"#434343",10:"#262626",11:"#1f1f1f",12:"#141414",13:"#000"};var o=()=>{let e=(0,l.useTheme)(),t=(n,a=1)=>a<=10?`
.palette-${n}-${a} {
  background: ${e[`${n}-${a}`]};
}
${t(n,a+1)}
    `:"",n=(e=1)=>e<=13?`
.palette-gray-${e} {
  background: ${r[e]};
}
${n(e+1)}
    `:"";return(0,a.jsx)(i.Global,{styles:(0,i.css)`
        .color-palettes {
          margin: 0 1%;

          &-dark {
            margin: 0;
            padding: 0 28px;
            background-color: #141414;

            .color-title {
              color: rgba(255, 255, 255, 0.85);
            }

            .color-description {
              color: rgba(255, 255, 255, 0.45);
            }

            .color-palette {
              margin: 45px 3.5% 45px 0;

              &:nth-of-type(3n) {
                margin-inline-end: 0;
              }

              .main-color-item {
                margin-inline-end: 0;

                &:hover {
                  margin-inline-end: -${e.paddingXS}px;
                }
              }
            }
          }
        }

        .color-palette {
          display: inline-block;
          width: 31%;
          margin: 45px 1%;

          &-pick {
            margin: 0 0 ${e.marginMD}px;
            font-size: ${e.fontSizeXL}px;
            text-align: center;
          }

          &-picker {
            margin: ${e.marginLG}px 0;

            &-value {
              position: relative;
              top: -3px;
              margin-inline-start: ${e.margin}px;
              font-size: ${e.fontSize}px;
              font-family: Consolas, sans-serif;
              .ant-row-rtl & {
                margin-inline-end: ${e.margin}px;
                margin-inline-start: 0;
              }
            }

            &-validation {
              position: relative;
              top: -3px;
              margin-inline-start: ${e.margin}px;
              color: ${e.colorError};
              font-size: ${e.fontSize}px;

              .ant-row-rtl & {
                margin-inline-end: ${e.margin}px;
                margin-inline-start: 0;
              }

              &-dark {
                margin-inline-start: 0;
              }
            }
          }
        }

        .main-color {
          ${t("blue")}
          ${t("purple")}
          ${t("cyan")}
          ${t("green")}
          ${t("magenta")}
          ${t("red")}
          ${t("volcano")}
          ${t("orange")}
          ${t("gold")}
          ${t("yellow")}
          ${t("lime")}
          ${t("geekblue")}
          ${n()}

  text-align: left;

          &-item {
            position: relative;
            height: 44px;
            margin-inline-end: ${e.marginXXS}px;
            padding: 0 ${e.paddingSM}px;
            font-size: ${e.fontSize}px;
            font-family: Consolas, sans-serif;
            line-height: 44px;
            cursor: pointer;
            transition: all ${e.motionDurationMid};

            &:first-child {
              border-radius: ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0 0;
            }

            &:last-child {
              border-radius: 0 0 ${e.borderRadiusSM}px ${e.borderRadiusSM}px;
            }

            &:hover {
              margin-inline-end: -${e.marginXS}px;
              border-radius: 0 ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0;
            }
          }

          &-item &-text {
            float: left;
            transition: all ${e.motionDurationSlow};
          }

          &-item &-value {
            position: relative;
            inset-inline-start: ${e.marginXXS}px;
            float: right;
            transform: scale(0.85);
            transform-origin: 100% 50%;
            opacity: 0;
            transition: all ${e.motionDurationSlow};
          }
        }

        .color-title {
          margin: 0 0 ${e.marginLG}px;
          color: #5c6b77;
          font-weight: 500;
          font-size: 22px;
          text-align: center;
          text-transform: capitalize;
        }

        .color-description {
          display: block;
          color: #777;
          font-weight: lighter;
          font-size: ${e.fontSize}px;
        }

        .main-color:hover {
          .main-color-value {
            inset-inline-start: 0;
            opacity: 0.7;
          }
        }

        .color-palette-horizontal {
          box-sizing: border-box;
          width: 100%;

          &-dark {
            height: 303px;
            padding: ${e.paddingXL}px ${e.paddingXL-4}px;
            background-color: #141414;

            .color-palette-picker {
              margin-bottom: 0;
            }

            .color-palette-pick {
              color: rgba(255, 255, 255, 0.65);
              text-align: left;

              &-hex {
                color: rgba(255, 255, 255, 0.65);
              }

              .ant-row-rtl & {
                direction: rtl;
                text-align: right;
              }
            }
          }

          .main-color {
            display: flex;

            &-item {
              position: relative;
              flex: 1;
              box-sizing: border-box;
              height: 86px;
              margin-inline-end: 0;
              padding: 37px 0 0;
              line-height: normal;
              text-align: center;
              border-radius: 0;

              .main-color-text {
                float: none;
              }

              &:hover {
                height: 96px;
                margin-top: -10px;
                border-radius: ${e.borderRadiusSM}px ${e.borderRadiusSM}px 0 0;
              }
            }

            &-value {
              position: absolute;
              bottom: 0;
              inset-inline-start: 0;
              width: 100%;
              text-align: center;
              transform-origin: unset;
            }

            &:hover {
              .main-color-item {
                padding-top: ${e.paddingXS}px;
              }

              .main-color-value {
                bottom: 8px;
                opacity: 0.7;
              }
            }
          }
        }
      `});};},75801792:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{default:function(){return u;},useStyle:function(){return c;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("5b220c3d")),r=n("a9d1a279"),o=n("3835a2b7"),s=n("c84cdf47"),d=n("9c86e52a");let c=(0,o.createStyles)(({cssVar:e,token:t,css:n})=>{let{antCls:a}=t;return{anchorToc:n`
      scrollbar-width: thin;
      scrollbar-gutter: stable;
      ${a}-anchor {
        ${a}-anchor-link-title {
          font-size: ${e.fontSizeSM};
        }
      }
    `,tocWrapper:n`
      position: fixed;
      top: calc(${t.headerHeight}px + ${e.marginXL} - 4px);
      inset-inline-end: 0;
      width: 148px;
      padding: 0;
      border-radius: ${e.borderRadius};
      box-sizing: border-box;
      margin-inline-end: calc(8px - 100vw + 100%);
      z-index: 10;
      .toc-debug {
        color: ${e.purple6};
        &:hover {
          color: ${e.purple5};
        }
      }
      > div {
        box-sizing: border-box;
        width: 100%;
        max-height: calc(100vh - ${t.headerHeight}px - ${e.marginXL} - 24px) !important;
        margin: auto;
        overflow: auto;
        padding: ${e.paddingXXS};
        backdrop-filter: blur(8px);
      }

      @media only screen and (max-width: ${e.screenLG}) {
        display: none;
      }
    `,articleWrapper:n`
      padding-inline: 48px 164px;
      padding-block: 0 32px;

      @media only screen and (max-width: ${e.screenLG}) {
        & {
          padding: 0 calc(${e.paddingLG} * 2);
        }
      }
    `};});var u=({showDebug:e,debugDemos:t=[]})=>{let{styles:n}=c(),a=(0,o.useTheme)(),u=(0,d.useRouteMeta)(),p=(0,d.useTabMeta)(),f=l.default.useMemo(()=>((null==p?void 0:p.toc)||u.toc).reduce((e,t)=>{if(2===t.depth)e.push({...t});else if(3===t.depth){let n=e[e.length-1];n&&(n.children=n.children||[],n.children.push({...t}));}return e;},[]),[null==p?void 0:p.toc,u.toc]);return u.frontmatter.toc?(0,i.jsx)("section",{className:n.tocWrapper,children:(0,i.jsx)(r.Anchor,{affix:!1,className:n.anchorToc,targetOffset:a.anchorTop,showInkInFixed:!0,items:f.map(n=>{var a;return{href:`#${n.id}`,title:n.title,key:n.id,children:null===(a=n.children)||void 0===a?void 0:a.filter(n=>e||!t.includes(n.id)).map(e=>({key:e.id,href:`#${e.id}`,title:(0,i.jsx)("span",{className:(0,s.clsx)({"toc-debug":t.includes(e.id)}),children:null==e?void 0:e.title})}))};})})}):null;};},"80a8572e":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return f;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("c2d41482"),s=n("3835a2b7"),d=a._(n("23546486"));let c="ant-where-checker",u={cn:{whereNotSupport:`\u{4F60}\u{7684}\u{6D4F}\u{89C8}\u{5668}\u{4E0D}\u{652F}\u{6301}\u{73B0}\u{4EE3} CSS Selector\u{FF0C}\u{8BF7}\u{4F7F}\u{7528}\u{73B0}\u{4EE3}\u{6D4F}\u{89C8}\u{5668}\u{FF08}\u{5982} Chrome\u{3001}Firefox \u{7B49}\u{7B49}\u{FF09}\u{67E5}\u{770B}\u{5B98}\u{7F51}\u{3002}\u{5982}\u{679C}\u{9700}\u{8981}\u{5BF9}\u{65E7}\u{7248}\u{6D4F}\u{89C8}\u{5668}\u{8FDB}\u{884C}\u{6837}\u{5F0F}\u{652F}\u{6301}\u{FF0C}\u{6B22}\u{8FCE}\u{67E5}\u{9605}\u{914D}\u{7F6E}\u{6587}\u{6863}\u{FF1A}`,whereDocTitle:"\u517C\u5BB9\u6027\u8C03\u6574\uFF08\u8BF7\u4F7F\u7528\u73B0\u4EE3\u6D4F\u89C8\u5668\u8BBF\u95EE\uFF09",whereDocUrl:"/docs/react/customize-theme-cn#\u517C\u5BB9\u6027\u8C03\u6574"},en:{whereNotSupport:"Your browser not support modern CSS Selector. Please use modern browser to view (e.g. Chrome, Firefox, etc). If you want to compatible style with legacy browser, please refer to the configuration document:",whereDocTitle:"Compatible adjustment (Please use modern browser to visit)",whereDocUrl:"/docs/react/customize-theme#compatible-adjustment"}},p=(0,s.createStaticStyles)(({css:e,cssVar:t})=>({container:e`
    position: fixed;
    inset-inline-start: 0;
    inset-inline-end: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999;
    background-color: ${t.colorTextSecondary};
    display: flex;
    justify-content: center;
    align-items: center;
  `,alertBox:e`
    border: 1px solid ${t.colorWarningBorder};
    background-color: ${t.colorWarningBg};
    color: ${t.colorTextHeading};
    padding: ${t.paddingXS} ${t.paddingSM};
    border-radius: ${t.borderRadiusLG};
    z-index: 9999999999;
    line-height: 22px;
    width: 520px;
    a {
      color: ${t.colorPrimary};
      text-decoration-line: none;
    }
  `}));var f=()=>{let[e]=(0,d.default)(u),[t,n]=r.useState(!0);return(r.useEffect(()=>{let e=document.createElement("p");e.className=c,e.style.position="fixed",e.style.pointerEvents="none",e.style.visibility="hidden",e.style.width="0",document.body.appendChild(e),(0,o.updateCSS)(`
:where(.${c}) {
  content: "__CHECK__";
}
    `,c);let{content:t}=getComputedStyle(e);n(String(t).includes("CHECK")),document.body.removeChild(e),(0,o.removeCSS)(c);},[]),t)?null:(0,l.jsx)("div",{className:p.container,children:(0,l.jsxs)("div",{className:p.alertBox,children:[e.whereNotSupport," ",(0,l.jsx)("a",{href:e.whereDocUrl,children:e.whereDocTitle})]})});};},"80ae577b":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=a._(n("2cdbec91")),s=n("a9d1a279"),d=n("3835a2b7"),c=n("9c86e52a"),u=a._(n("3e969a12")),p=a._(n("714a8bde"));let f=(0,d.createStyles)(({cssVar:e,token:t,css:n})=>({asideContainer:n`
      min-height: 100%;
      padding-top: 0;
      padding-bottom: ${e.marginXXL} !important;
      font-family: Avenir, ${e.fontFamily}, sans-serif;
      padding-inline: ${e.paddingXXS};

      &${t.antCls}-menu-inline {
        ${t.antCls}-menu-submenu-title h4,
        > ${t.antCls}-menu-item,
        ${t.antCls}-menu-item a {
          overflow: hidden;
          font-size: ${e.fontSize};
          text-overflow: ellipsis;
        }

        > ${t.antCls}-menu-item-group > ${t.antCls}-menu-item-group-title {
          margin-top: ${e.margin};
          margin-bottom: ${e.margin};
          font-size: ${e.fontSize};

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${e.colorSplit};
            content: '';
          }
        }

        > ${t.antCls}-menu-item,
          > ${t.antCls}-menu-submenu
          > ${t.antCls}-menu-submenu-title,
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-title,
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-list
          > ${t.antCls}-menu-item,
          &${t.antCls}-menu-inline
          > ${t.antCls}-menu-item-group
          > ${t.antCls}-menu-item-group-list
          > ${t.antCls}-menu-item {
          padding-inline: 36px 12px !important;
        }

        // Nest Category > Type > Article
        &${t.antCls}-menu-inline {
          ${t.antCls}-menu-item-group-title {
            margin-inline-start: ${e.marginXXS};
            padding-inline-start: 60px;

            ${t.antCls}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${e.padding};
            }
          }

          ${t.antCls}-menu-item-group-list > ${t.antCls}-menu-item {
            padding-inline-start: 80px !important;

            ${t.antCls}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${e.padding} !important;
            }
          }
        }

        ${t.antCls}-menu-item-group:first-child {
          ${t.antCls}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }
    `,mainMenu:n`
      z-index: 1;
      position: sticky;
      top: ${t.headerHeight}px;
      width: 100%;
      max-height: calc(100vh - ${t.headerHeight}px);
      overflow: hidden;
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      &:hover {
        overflow-y: auto;
      }
    `}));var m=()=>{let e=(0,c.useSidebarData)(),{isMobile:t,isDark:n}=r.default.use(p.default),{styles:a}=f(),[i,m]=(0,u.default)(),{colorBgContainer:g}=(0,d.useTheme)(),h=(null==e?void 0:e.map(({title:e})=>e).filter(Boolean))||[],[x,b]=r.default.useState(h);(0,r.useEffect)(()=>{x.join(",")!==h.join(",")&&b(h);},[h.join(",")]);let v=(0,l.jsx)(s.ConfigProvider,{theme:{components:{Menu:{itemBg:g,darkItemBg:g}}},children:(0,l.jsx)(s.Menu,{items:i,inlineIndent:30,className:a.asideContainer,mode:"inline",theme:n?"dark":"light",selectedKeys:[m],openKeys:x,onOpenChange:b})});return t?(0,l.jsx)(o.default,{children:v},"Mobile-menu"):(0,l.jsx)(s.Col,{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24,className:a.mainMenu,children:v});};},"8351a1df":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return c;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("3835a2b7"),r=a._(n("23546486")),o=a._(n("3a21ca9c"));let s={cn:a._(n("034d788b")).default,en:o.default},d=(0,l.createStaticStyles)(({css:e})=>({container:e`
    max-height: max(62vh, 500px);
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #eaeaea transparent;
    /* 图片铺满 */
    && img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  `}));var c=()=>{let[,e]=(0,r.default)(),t=Object.keys(s).includes(e)?e:"en",n=s[t];return(0,i.jsx)("div",{className:d.container,children:(0,i.jsx)(n,{})});};},"879acc0b":function(e,t,n){e.exports=[{version:"6.x",url:"https://ant.design",chineseMirrorUrl:"https://ant-design.antgroup.com"},{version:"5.x",url:"https://5x.ant.design",chineseMirrorUrl:"https://5x-ant-design.antgroup.com"},{version:"4.x",url:"https://4x.ant.design",chineseMirrorUrl:"https://4x-ant-design.antgroup.com"},{version:"3.x",url:"https://3x.ant.design"},{version:"2.x",url:"https://2x.ant.design"},{version:"1.x",url:"https://1x.ant.design"},{version:"0.12.x",url:"https://012x.ant.design"},{version:"0.11.x",url:"https://011x.ant.design"},{version:"0.10.x",url:"https://010x.ant.design"},{version:"0.9.x",url:"https://09x.ant.design"}];},"9ef535e4":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return a.default;}});var a=n("777fffbe")._(n("04e63e65"));},a138adac:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("3835a2b7"),r=n("9c86e52a"),o=a._(n("a7fa2147")),s=a._(n("d0dc4122")),d=a._(n("80ae577b"));let c=(0,l.createStaticStyles)(({css:e,cssVar:t})=>({main:e`
    display: flex;
    margin-top: ${t.marginXL};
  `}));var u=({children:e})=>{let[t]=(0,r.useSearchParams)(),n="false"===t.get("layout");return(0,i.jsxs)("main",{className:c.main,children:[(0,i.jsx)(o.default,{}),!n&&(0,i.jsx)(d.default,{}),(0,i.jsx)(s.default,{children:e})]});};},a2249523:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=n("3835a2b7"),o=n("9c86e52a"),s=a._(n("0a03b273")),d=i._(n("e67f7d0e"));let c=(0,r.createStyles)(({cssVar:e,token:t,css:n})=>{let{headerHeight:a,mobileMaxWidth:i}=t,{colorTextHeading:l}=e;return{logo:n`
      height: ${a}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${l};
      font-weight: bold;
      font-size: 18px;
      line-height: ${a}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      column-gap: ${e.marginSM};

      &:hover {
        color: ${l};
      }

      img {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
      }

      @media only screen and (max-width: ${i}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,title:n`
      line-height: 32px;
    `};});var u=({isZhCN:e})=>{let{search:t}=(0,o.useLocation)(),{styles:n}=c();return(0,l.jsx)("h1",{children:(0,l.jsxs)(s.default,{to:d.getLocalizedPathname("/",e,t),className:n.logo,children:[(0,l.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",draggable:!1,alt:"logo"}),(0,l.jsx)("span",{className:n.title,children:"Ant Design"})]})});};},a249a395:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("a9d1a279"),s=n("3835a2b7"),d=n("c84cdf47"),c=a._(n("f93c65a6")),u=a._(n("ca111321"));let p=["scroll","resize"],f=(0,s.createStyles)(({cssVar:e,token:t,css:n})=>{let{antCls:a}=t,{boxShadowSecondary:i}=e;return{affixTabs:n`
      position: fixed;
      top: 0;
      inset-inline-end: 0;
      inset-inline-start: 0;
      z-index: 1001;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${i};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition:
        opacity ${e.motionDurationSlow},
        transform ${e.motionDurationSlow};

      ${a}-tabs {
        max-width: 1208px;
        margin: 0 auto;

        ${a}-tabs-nav {
          margin: 0;

          &::before {
            border-bottom-color: transparent;
          }

          ${a}-tabs-tab {
            padding: 21px 0;
          }
        }
      }
    `,affixTabsFixed:n`
      transform: translate3d(0, 0, 0);
      opacity: 1;
    `,span:n`
      text-transform: capitalize;
    `};});var m=()=>{let e=r.useRef(null),t=r.useRef([]),[n,a]=r.useState(!1),[i,s]=r.useState(void 0),{styles:{affixTabs:m,affixTabsFixed:g,span:h}}=f();function x(t){let n=document.getElementById(t);if(n){let t=n.offsetTop-e.current.offsetHeight-32;(0,u.default)(t);}}r.useEffect(()=>{let e=document.querySelectorAll("h2[id]");t.current=Array.from(e).map(({id:e})=>e),a(!0);},[]),r.useEffect(()=>{let e=decodeURIComponent((location.hash||"").slice(1));e&&x(e);},[n]);let b=r.useMemo(()=>(0,c.default)(function(){let{scrollY:n}=window,a=e.current.offsetHeight;for(let e=t.current.length-1;e>=0;e-=1){let i=t.current[e];if(document.getElementById(i).offsetTop-a-32<=n){s(i);return;}}s(void 0);}),[]);return r.useEffect(()=>(p.forEach(e=>window.addEventListener(e,b)),b(),()=>{p.forEach(e=>window.removeEventListener(e,b));}),[b]),(0,l.jsx)("div",{className:(0,d.clsx)(m,i&&g),ref:e,children:(0,l.jsx)(o.Tabs,{activeKey:i,centered:!0,size:"large",onChange:x,items:t.current.map(e=>({key:e,label:(0,l.jsx)("span",{className:h,children:e.replace(/-/g," ")})}))})});};},a2a5b19a:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("e22febe0"),r=n("a9d1a279"),o=n("3835a2b7"),s=n("c84cdf47"),d=a._(n("23546486")),c=a._(n("c5c83154"));let u="https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b",p=(0,o.createStaticStyles)(({cssVar:e,css:t})=>({card:t`
    width: 100%;
    margin: calc(${e.marginMD} * 2) 0;
    transition: all ${e.motionDurationMid};
    background-color: ${e.colorFillQuaternary};
  `,bigTitle:t`
    color: #121212;
    font-size: ${e.fontSizeLG};
    margin-bottom: ${e.marginLG};
    font-weight: ${e.fontWeightStrong};
  `,cardBody:t`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,leftCard:t`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 200px;
      overflow: hidden;
      margin-inline-end: ${e.marginLG};
      border-radius: ${e.borderRadiusLG};
    }
  `,title:t`
    color: #444;
    font-size: ${e.fontSizeLG};
    font-weight: ${e.fontWeightStrong};
    user-select: none;
  `,subTitle:t`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #646464;
    font-size: ${e.fontSize};
    font-weight: 400;
    margin-top: ${e.marginXS};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,logo:t`
    width: 24px;
    height: 24px;
    font-size: 24px;
    &.zhihu-logo {
      color: #056de8;
    }
    &.yuque-logo {
      color: #00b96b;
    }
    &.juejin-logo {
      color: #1e80ff;
    }
  `,arrowIcon:t`
    color: #8a8f8d;
    margin: 0 ${e.marginXS};
    font-size: ${e.fontSizeSM};
  `,zlBtn:t`
    padding: 0;
    color: #646464;
  `,discussLogo:t`
    width: 16px;
    height: 16px;
    font-size: 16px;
  `})),f={cn:{bigTitle:"\u6587\u7AE0\u88AB\u4EE5\u4E0B\u4E13\u680F\u6536\u5F55\uFF1A",zhiHu:"\u4E00\u4E2A UI \u8BBE\u8BA1\u4F53\u7CFB",yuQue:"Ant Design \u5B98\u65B9\u4E13\u680F",junjin:"Ant Design \u5F00\u6E90\u4E13\u680F",buttonText:"\u6211\u6709\u60F3\u6CD5\uFF0C\u53BB\u53C2\u4E0E\u8BA8\u8BBA"},en:{bigTitle:"Articles are included in the column:",zhiHu:"A UI design system",yuQue:"Ant Design official column",junjin:"Ant Design Open Source Column",buttonText:"Go to discuss"}};var m=({zhihuLink:e,yuqueLink:t,juejinLink:n})=>{let[a]=(0,d.default)(f),{card:o,bigTitle:m,cardBody:g,leftCard:h,title:x,subTitle:b,logo:v,arrowIcon:j,zlBtn:w,discussLogo:y}=p;return e||t||n?(0,i.jsxs)(r.Card,{className:o,variant:"borderless",children:[(0,i.jsx)("h3",{className:m,children:a.bigTitle}),e&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Divider,{}),(0,i.jsxs)("div",{className:g,children:[(0,i.jsxs)("div",{className:h,children:[(0,i.jsx)("img",{draggable:!1,src:u,alt:"antd"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:x,children:"Ant Design"}),(0,i.jsxs)("div",{className:b,children:[(0,i.jsx)(l.ZhihuOutlined,{className:(0,s.clsx)(v,"zhihu-logo")}),(0,i.jsx)(l.RightOutlined,{className:j}),(0,i.jsx)(r.Button,{target:"_blank",href:"https://www.zhihu.com/column/c_1564262000561106944",className:w,type:"link",children:a.zhiHu})]})]})]}),(0,i.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,i.jsx)(l.ZhihuOutlined,{className:y}),target:"_blank",href:e,children:a.buttonText})]})]}),t&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Divider,{}),(0,i.jsxs)("div",{className:g,children:[(0,i.jsxs)("div",{className:h,children:[(0,i.jsx)("img",{draggable:!1,src:u,alt:"antd"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:x,children:"Ant Design"}),(0,i.jsxs)("div",{className:b,children:[(0,i.jsx)(l.YuqueOutlined,{className:(0,s.clsx)(v,"yuque-logo")}),(0,i.jsx)(l.RightOutlined,{className:j}),(0,i.jsx)(r.Button,{target:"_blank",href:"https://www.yuque.com/ant-design/ant-design",className:w,type:"link",children:a.yuQue})]})]})]}),(0,i.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,i.jsx)(l.YuqueOutlined,{className:y}),target:"_blank",href:t,children:a.buttonText})]})]}),n&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Divider,{}),(0,i.jsxs)("div",{className:g,children:[(0,i.jsxs)("div",{className:h,children:[(0,i.jsx)("img",{draggable:!1,src:u,alt:"antd"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:x,children:"Ant Design"}),(0,i.jsxs)("div",{className:b,children:[(0,i.jsx)(c.default,{className:(0,s.clsx)(v,"juejin-logo")}),(0,i.jsx)(l.RightOutlined,{className:j}),(0,i.jsx)(r.Button,{target:"_blank",href:"https://juejin.cn/column/7247354308258054200",className:w,type:"link",children:a.junjin})]})]})]}),(0,i.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,i.jsx)(c.default,{className:y}),target:"_blank",href:n,children:a.buttonText})]})]})]}):null;};},a3aa6524:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return h;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=a._(n("868f756d")),s=n("3835a2b7"),d=n("c84cdf47"),c=n("9c86e52a"),u=a._(n("714a8bde")),p=a._(n("1b87ba52"));let f=(0,s.createStaticStyles)(({cssVar:e,css:t})=>({listMobile:t`
    margin: 1em 0 !important;
  `,title:t`
    font-size: ${e.fontSizeSM};
    opacity: 0.5;
    margin-bottom: ${e.marginXS};
  `,list:t`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${e.motionDurationSlow};
      margin-inline-end: calc(-1 * ${e.marginXS});
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `})),m=["github-actions","copilot","renovate","dependabot","gemini-code-assist[bot]"],g=({filename:e})=>{let{formatMessage:t}=(0,c.useIntl)(),{isMobile:n}=r.default.use(u.default);return e?(0,l.jsxs)("div",{className:(0,d.clsx)({[f.listMobile]:n}),children:[(0,l.jsx)("div",{className:f.title,children:t({id:"app.content.contributors"})}),(0,l.jsx)(o.default,{cache:!0,repo:"ant-design",owner:"ant-design",fileName:e,className:f.list,filter:e=>{var t;return!m.includes((null==e?void 0:null===(t=e.username)||void 0===t?void 0:t.toLowerCase())??"");},renderItem:(e,t)=>(0,l.jsx)(p.default,{item:e,loading:t},null==e?void 0:e.url)})]}):null;};var h=e=>(0,l.jsx)(r.Suspense,{fallback:null,children:(0,l.jsx)(g,{...e})});},a56683cc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return s;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("6ee40046")),r=n("bea88868"),o=a._(n("530fedd5")),s=()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Reset,{}),(0,i.jsx)(r.Common,{}),(0,i.jsx)(r.Markdown,{}),(0,i.jsx)(r.Highlight,{}),(0,i.jsx)(r.Demo,{}),(0,i.jsx)(r.Responsive,{}),(0,i.jsx)(r.NProgress,{}),(0,i.jsx)(r.PreviewImage,{}),(0,i.jsx)(o.default,{}),(0,i.jsx)(l.default,{}),(0,i.jsx)(r.HeadingAnchor,{}),(0,i.jsx)(r.SearchBar,{})]});},a7fa2147:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("5b220c3d")),r=n("9c86e52a"),o=()=>{let e=(0,r.useRouteMeta)(),[t,n]=l.default.useMemo(()=>{let t;if(e.frontmatter.subtitle||e.frontmatter.title){var n;t=`${e.frontmatter.subtitle||""} ${(null===(n=e.frontmatter)||void 0===n?void 0:n.title)||""} - Ant Design`;}else t="404 Not Found - Ant Design";return[t,e.frontmatter.description||""];},[e]);return(0,i.jsxs)(r.Helmet,{children:[(0,i.jsx)("title",{children:t}),(0,i.jsx)("meta",{property:"og:title",content:t}),n&&(0,i.jsx)("meta",{name:"description",content:n})]});};},ad4b2adc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return y;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=n("c84cdf47"),o=a._(n("072ab8a9"));n("2a5e301e");var s=i._(n("5b220c3d")),d=n("a9d1a279"),c=a._(n("e15e14cb")),u=n("9c86e52a"),p=a._(n("23546486")),f=a._(n("91a66390")),m=a._(n("a56683cc")),g=a._(n("eb388ffc")),h=a._(n("714a8bde")),x=a._(n("61595633")),b=a._(n("4b6975d6")),v=a._(n("a138adac")),j=a._(n("b9222bbe"));let w={cn:{title:"Ant Design - \u4E00\u5957\u4F01\u4E1A\u7EA7 UI \u8BBE\u8BA1\u8BED\u8A00\u548C React \u7EC4\u4EF6\u5E93",description:"\u57FA\u4E8E Ant Design \u8BBE\u8BA1\u4F53\u7CFB\u7684 React UI \u7EC4\u4EF6\u5E93\uFF0C\u7528\u4E8E\u7814\u53D1\u4F01\u4E1A\u7EA7\u4E2D\u540E\u53F0\u4EA7\u54C1\u3002"},en:{title:"Ant Design - The world's second most popular React UI framework",description:"An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises"}};var y=()=>{let e=(0,u.useOutlet)(),{pathname:t,search:n,hash:a}=(0,f.default)(),[i,y]=(0,p.default)(w),$=(0,s.useRef)(null),{direction:_}=s.default.use(h.default),{loading:S}=(0,u.useSiteData)(),{token:k}=d.theme.useToken(),[M]=(0,u.useSearchParams)(),C="false"===M.get("layout");(0,s.useLayoutEffect)(()=>{"cn"===y?o.default.locale("zh-cn"):o.default.locale("en");},[y]),(0,s.useEffect)(()=>{let e=document.getElementById("nprogress-style");return $.current=setTimeout(()=>{null==e||e.remove();},0),()=>clearTimeout($.current);},[]),(0,s.useEffect)(()=>{let e=a.replace("#","");if(e){var t;null===(t=document.getElementById(decodeURIComponent(e)))||void 0===t||t.scrollIntoView();}},[S,a]),(0,s.useEffect)(()=>{void 0!==window.ga&&window.ga("send","pageview",t+n);},[t,n]);let A=s.default.useMemo(()=>["","/"].includes(t)||["/index"].some(e=>t.startsWith(e))?(0,l.jsx)(x.default,{title:i.title,desc:i.description,children:e}):t.startsWith("/docs/resource")?(0,l.jsx)(b.default,{children:e}):t.startsWith("/theme-editor")||t.startsWith("/theme-market")?e:(0,l.jsx)(v.default,{children:e}),[t,e,i.title,i.description]);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(u.Helmet,{encodeSpecialCharacters:!1,children:[(0,l.jsx)("html",{lang:"cn"===y?"zh-CN":y,"data-direction":_,className:(0,r.clsx)({rtl:"rtl"===_})}),(0,l.jsx)("link",{sizes:"144x144",href:"https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"}),(0,l.jsx)("meta",{property:"og:description",content:i.description}),(0,l.jsx)("meta",{property:"og:type",content:"website"}),(0,l.jsx)("meta",{property:"og:image",content:"https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"})]}),(0,l.jsxs)(d.ConfigProvider,{direction:_,locale:"cn"===y?c.default:void 0,theme:{token:{fontFamily:`AlibabaSans, ${k.fontFamily}`}},children:[(0,l.jsx)(m.default,{}),!C&&(0,l.jsx)(g.default,{}),(0,l.jsx)(j.default,{}),A]})]});};},b9222bbe:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return h;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=a._(n("5b220c3d")),o=n("a9d1a279"),s=n("9c86e52a"),d=a._(n("23546486")),c=i._(n("e67f7d0e")),u=a._(n("8351a1df"));let[p]=o.version.split("."),f=`antd${p}-version-upgrade-notify`,m=new Date("2026/02/01").getTime(),g={cn:{title:"Ant Design 6.0 \u73B0\u5DF2\u53D1\u5E03  \u{1F389}",releasePost:"\u53D1\u5E03\u516C\u544A \u{1F680}",fullChangelog:"\u5B8C\u6574\u66F4\u65B0\u65E5\u5FD7 \u{1F4DD}"},en:{title:"Ant Design 6.0 has been released  \u{1F389}",releasePost:"Release Post \u{1F680}",fullChangelog:"Full Changelog \u{1F4DD}"}};var h=()=>{let[e,t]=(0,d.default)(g),{pathname:n}=(0,s.useLocation)(),[a,i]=r.default.useState(!1),p="cn"===t||c.isZhCN(n);function h(){localStorage.setItem(f,Date.now().toString()),i(!1);}r.default.useEffect(()=>{let e=localStorage.getItem(f);if(!(Date.now()>m)&&!e){let e=setTimeout(()=>{i(!0);},1e3);return()=>{clearTimeout(e);};}},[]);let x=c.getLocalizedPathname("/changelog",p).pathname,b=`https://github.com/ant-design/ant-design/issues/${p?"55805":"55804"}`;return(0,l.jsx)(o.Modal,{title:e.title,open:a,width:"min(90vw, 800px)",centered:!0,onCancel:h,styles:{body:{padding:0}},footer:()=>(0,l.jsxs)(o.Flex,{align:"center",gap:"middle",justify:"flex-end",children:[(0,l.jsx)(o.Button,{href:x,onClick:h,children:e.fullChangelog}),(0,l.jsx)(o.Button,{color:"primary",variant:"solid",href:b,target:"_blank",onClick:h,children:e.releasePost})]}),children:(0,l.jsx)(u.default,{})});};},ba722e26:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return g;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=n("e22febe0"),o=n("a9d1a279"),s=n("3835a2b7"),d=n("9c86e52a"),c=a._(n("23546486")),u=a._(n("0a03b273")),p=i._(n("e67f7d0e"));let f={cn:{design:"\u8BBE\u8BA1",development:"\u7814\u53D1",components:"\u7EC4\u4EF6",resources:"\u8D44\u6E90",blog:"\u535A\u5BA2"},en:{design:"Design",development:"Development",components:"Components",resources:"Resources",blog:"Blog"}},m=(0,s.createStyles)(({cssVar:e,token:t,css:n})=>({nav:n`
      height: 100%;
      font-size: ${e.fontSize};
      font-family: Avenir, ${e.fontFamily}, sans-serif;
      border: 0 !important;

      &${t.antCls}-menu-horizontal {
        border-bottom: none;

        & > ${t.antCls}-menu-item, & > ${t.antCls}-menu-submenu {
          min-width: ${64}px;
          height: ${t.headerHeight}px;
          padding-inline-end: ${e.paddingSM};
          padding-inline-start: ${e.paddingSM};
          line-height: ${t.headerHeight}px;
        }

        & ${t.antCls}-menu-submenu-title ${t.iconCls} {
          margin: 0;
        }

        & > ${t.antCls}-menu-item-selected {
          a {
            color: ${e.colorPrimary};
          }
        }
      }

      & > ${t.antCls}-menu-item, & > ${t.antCls}-menu-submenu {
        text-align: center;
      }
    `}));var g=e=>{var t,n;let{isZhCN:a,isMobile:i,responsive:s,directionText:g,onLangChange:h,onDirectionChange:x}=e,{pathname:b,search:v}=(0,d.useLocation)(),[j]=(0,c.default)(f),w=(null===(n=(0,d.useFullSidebarData)()["/docs/blog"])||void 0===n?void 0:null===(t=n[0])||void 0===t?void 0:t.children)||[],{styles:y}=m(),$=b.split("/").filter(Boolean).slice(0,-1).join("/")||"home";b.startsWith("/changelog")?$="docs/react":b.startsWith("/docs/resources")&&($="docs/resources");let _=[],S=[{label:(0,l.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer",children:"GitHub"}),key:"github"},{label:(0,l.jsx)(d.FormattedMessage,{id:"app.header.lang"}),onClick:h,key:"switch-lang"},{label:g,onClick:x,key:"switch-direction"}];i?_=S:"crowded"===s&&(_=[{label:(0,l.jsx)(r.MenuOutlined,{}),key:"additional",children:[...S]}]);let k=[{label:(0,l.jsx)(u.default,{to:p.getLocalizedPathname("/docs/spec/introduce",a,v),children:j.design}),key:"docs/spec"},{label:(0,l.jsx)(u.default,{to:p.getLocalizedPathname("/docs/react/introduce",a,v),children:j.development}),key:"docs/react"},{label:(0,l.jsx)(u.default,{to:p.getLocalizedPathname("/components/overview/",a,v),children:j.components}),key:"components"},w.length?{label:(0,l.jsx)(u.default,{to:p.getLocalizedPathname(w.sort((e,t)=>{var n,a;return(null===(n=e.frontmatter)||void 0===n?void 0:n.date)>(null===(a=t.frontmatter)||void 0===a?void 0:a.date)?-1:1;})[0].link,a,v),children:j.blog}),key:"docs/blog"}:null,{label:(0,l.jsx)(u.default,{to:p.getLocalizedPathname("/docs/resources",a,v),children:j.resources}),key:"docs/resources"},a?{key:"mirror",label:(0,l.jsx)("a",{href:"https://ant-design.antgroup.com",target:"_blank",rel:"noreferrer",children:"\u56FD\u5185\u955C\u50CF"})}:null,..._??[]].filter(Boolean);return(0,l.jsx)(o.ConfigProvider,{theme:{token:{colorBgContainer:"transparent"}},children:(0,l.jsx)(o.Menu,{mode:i?"inline":"horizontal",selectedKeys:[$],className:y.nav,disabledOverflow:!0,items:k})});};},c5c83154:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return i;}});var a=n("f19d2b93"),i=e=>(0,a.jsxs)("svg",{width:"36",height:"28",viewBox:"0 0 36 28",fill:"currentColor",...e,children:[(0,a.jsx)("title",{children:"Juejin logo"}),(0,a.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z",fill:"currentColor"})]});},cc7bc1e9:function(e,t,n){},d0dc4122:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return $;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("a9d1a279"),s=n("c84cdf47"),d=n("9c86e52a"),c=a._(n("098b7512")),u=a._(n("91a66390")),p=a._(n("7e70d2c5")),f=a._(n("b550a850")),m=a._(n("494cb795")),g=a._(n("ba953c8b")),h=a._(n("25c612ac")),x=a._(n("714a8bde")),b=a._(n("a2a5b19a")),v=a._(n("a3aa6524")),j=i._(n("75801792")),w=a._(n("e814ec24"));let y=({num:e=6})=>Array.from({length:e}).map((e,t)=>(0,l.jsx)(o.Skeleton.Avatar,{size:"small",active:!0,style:{marginInlineStart:0===t?0:-8}},t));var $=({children:e,className:t})=>{var n,a,i;let $=(0,d.useRouteMeta)(),{pathname:_,hash:S}=(0,u.default)(),{direction:k}=r.default.use(x.default),{styles:M}=(0,j.useStyle)(),[C,A]=(0,c.default)(!1),[N,z]=(0,r.useState)("tsx"),D=(0,r.useMemo)(()=>{var e;return(null===(e=$.toc)||void 0===e?void 0:e.filter(e=>e._debug_demo).map(e=>e.id))||[];},[$]),E=D.includes(S.slice(1));(0,r.useLayoutEffect)(()=>{A(E);},[E]);let L=(0,r.useMemo)(()=>({showDebug:C,setShowDebug:A,codeType:N,setCodeType:z}),[C,N]),T="rtl"===k;return(0,l.jsx)(g.default,{value:L,children:(0,l.jsxs)(o.Col,{xxl:20,xl:19,lg:18,md:18,sm:24,xs:24,className:t,children:[(0,l.jsx)(j.default,{showDebug:C,debugDemos:D}),(0,l.jsxs)("article",{className:(0,s.clsx)(M.articleWrapper,{rtl:T}),children:[(null===(n=$.frontmatter)||void 0===n?void 0:n.title)?(0,l.jsx)(o.Flex,{justify:"space-between",children:(0,l.jsx)(o.Typography.Title,{style:{fontSize:32,position:"relative"},children:(0,l.jsxs)(o.Space,{children:[(0,l.jsx)("span",{children:null===(a=$.frontmatter)||void 0===a?void 0:a.title}),(0,l.jsx)("span",{children:null===(i=$.frontmatter)||void 0===i?void 0:i.subtitle}),!_.startsWith("/components/overview")&&(0,l.jsx)(f.default,{title:(0,l.jsx)(d.FormattedMessage,{id:"app.content.edit-page"}),filename:$.frontmatter.filename})]})})}):null,(0,l.jsx)(w.default,{}),!$.frontmatter.__autoDescription&&$.frontmatter.description,"Components"===$.frontmatter.category&&"false"!==String($.frontmatter.showImport)&&(0,l.jsx)(p.default,{source:!0,component:$.frontmatter.title,filename:$.frontmatter.filename,version:$.frontmatter.tag,designUrl:$.frontmatter.designUrl,searchTitleKeywords:[$.frontmatter.title,$.frontmatter.subtitle].filter(Boolean),repo:"ant-design/ant-design"}),(0,l.jsxs)("div",{style:{minHeight:"calc(100vh - 64px)"},children:[e,(0,l.jsx)(o.FloatButton.BackTop,{})]}),(0,l.jsx)(b.default,{zhihuLink:$.frontmatter.zhihu_url,yuqueLink:$.frontmatter.yuque_url,juejinLink:$.frontmatter.juejin_url}),(0,l.jsx)("div",{style:{marginTop:120},children:(0,l.jsx)(r.Suspense,{fallback:(0,l.jsx)(y,{}),children:(0,l.jsx)(v.default,{filename:$.frontmatter.filename})})})]}),(0,l.jsx)(m.default,{rtl:T}),(0,l.jsx)(h.default,{})]})});};},e814ec24:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return u;}});var a=n("777fffbe"),i=n("f19d2b93"),l=n("5b220c3d"),r=n("e22febe0"),o=n("a9d1a279"),s=a._(n("072ab8a9")),d=n("9c86e52a");let c=({name:e,avatar:t})=>{let[n,a]=(0,l.useState)(!0),[r,s]=(0,l.useState)(!1);return((0,l.useLayoutEffect)(()=>{let e=new Image;e.src=t,e.onload=()=>a(!1),e.onerror=()=>s(!0);},[t]),r)?null:n?(0,i.jsx)(o.Skeleton.Avatar,{size:"small",active:!0}):(0,i.jsx)(o.Avatar,{size:"small",src:t,alt:e,children:e});};var u=()=>{let e=(0,d.useRouteMeta)(),{author:t}=e.frontmatter,n=(0,l.useMemo)(()=>t?"string"==typeof t?t.split(",").map(e=>({name:e,avatar:`https://github.com/${e}.png`})):Array.isArray(t)?t:[]:[],[t]);return e.frontmatter.date||e.frontmatter.author?(0,i.jsx)(o.Typography.Paragraph,{children:(0,i.jsxs)(o.Flex,{gap:"small",children:[e.frontmatter.date&&(0,i.jsxs)("span",{style:{opacity:.65},children:[(0,i.jsx)(r.CalendarOutlined,{})," ",(0,s.default)(e.frontmatter.date).format("YYYY-MM-DD")]}),n.map(e=>(0,i.jsx)("a",{href:`https://github.com/${e.name}`,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsxs)(o.Flex,{gap:4,children:[(0,i.jsx)(c,{name:e.name,avatar:e.avatar}),(0,i.jsxs)("span",{style:{opacity:.65},children:["@",e.name]})]})},e.name))]})}):null;};},eb388ffc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ANT_LOCAL_TYPE_KEY:function(){return M;},default:function(){return N;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("e22febe0"),s=n("a9d1a279"),d=n("3835a2b7"),c=n("c84cdf47"),u=a._(n("072ab8a9")),p=n("9c86e52a"),f=a._(n("1c94f9dc")),m=a._(n("3e0baafa")),g=a._(n("879acc0b")),h=a._(n("23546486")),x=a._(n("ab6def4f")),b=n("b055b5cb"),v=a._(n("7a33de8c")),j=a._(n("efe86da3")),w=n("f0cc8246"),y=i._(n("e67f7d0e")),$=a._(n("714a8bde")),_=a._(n("a2249523")),S=a._(n("ba722e26")),k=a._(n("43a20bcd"));let M="ANT_LOCAL_TYPE_KEY",C=(0,d.createStyles)(({cssVar:e,token:t,css:n})=>{let a="#ced4d9";return{header:n`
      position: sticky;
      top: 0;
      z-index: 1000;
      max-width: 100%;
      background: ${e.colorBgContainer};
      box-shadow: ${e.boxShadowTertiary};
      backdrop-filter: blur(8px);

      @media only screen and (max-width: ${t.mobileMaxWidth}px) {
        text-align: center;
        border: none;
      }

      .dumi-default-search-bar {
        display: inline-flex;
        align-items: center;
        flex: auto;
        margin: 0;
        border-inline-start: 1px solid rgba(0, 0, 0, 0.06);

        > svg {
          width: 14px;
          fill: ${a};
        }

        > input {
          height: 22px;
          border: 0;
          max-width: calc(100vw - 768px);

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${a};
          }
        }

        .dumi-default-search-shortcut {
          color: ${a};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: ${e.borderRadiusSM};
          position: static;
          top: unset;
          transform: unset;
        }

        .dumi-default-search-popover {
          inset-inline-start: ${e.paddingSM};
          inset-inline-end: unset;
          z-index: 1;
          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
          & > section {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
        }
      }
    `,menuRow:n`
      display: flex;
      align-items: center;
      margin: 0;
      column-gap: ${e.paddingSM};
      padding-inline-end: ${e.padding};

      > * {
        flex: none;
        margin: 0;
      }

      .ant-btn {
        font-family: sans-serif;
      }
    `,dataDirectionIcon:n`
      width: 20px;
    `,popoverMenu:{width:300,[`${t.antCls}-popover-inner-content`]:{padding:0}},banner:n`
      width: 100%;
      text-align: center;
      word-break: keep-all;
      user-select: none;
    `,link:n`
      margin-inline-start: 10px;
      @media only screen and (max-width: ${t.mobileMaxWidth}px) {
        margin-inline-start: 0;
      }
    `,versionSelect:n`
      width: 112px;
      min-width: 112px; // 这个宽度需要和 Empty 状态的宽度保持一致
      .rc-virtual-list {
        .rc-virtual-list-holder {
          scrollbar-width: thin;
          scrollbar-gutter: stable;
        }
      }
    `};}),A=(...e)=>fetch(...e).then(e=>e.json());var N=()=>{let[,e]=(0,h.default)(),{pkg:t}=(0,p.useSiteData)(),n="undefined"!=typeof window&&void 0!==window.location&&window.location.hostname.includes(".antgroup.com"),{data:a=[],isLoading:i}=(0,m.default)("undefined"!=typeof window?`${window.location.origin}/versions.json`:null,A,{fallbackData:g.default,errorRetryCount:3}),d=(0,r.useMemo)(()=>i?[]:a.map(e=>{let a=e.version.startsWith(t.version[0])?t.version:e.version;return{value:n&&e.chineseMirrorUrl?e.chineseMirrorUrl:e.url,label:a};}),[a,i,t.version,n]),[N,z]=(0,r.useState)({menuVisible:!1,windowWidth:1400,searching:!1}),{direction:D,isMobile:E,bannerVisible:L,updateSiteConfig:T}=r.default.use($.default),I=(0,r.useRef)(null),F=(0,p.useLocation)(),{pathname:R,search:B}=F,{styles:O}=C(),[,H]=(0,x.default)(w.ANT_DESIGN_NOT_SHOW_BANNER,{defaultValue:void 0}),[,P]=(0,x.default)(M,{defaultValue:void 0}),X=(0,r.useCallback)(()=>{z(e=>({...e,menuVisible:!1}));},[]),W=(0,r.useCallback)(()=>{z(e=>({...e,windowWidth:window.innerWidth}));},[]),G=(0,r.useCallback)(e=>{z(t=>({...t,menuVisible:e}));},[]),U=()=>{T({direction:"rtl"!==D?"rtl":"ltr"});};(0,r.useEffect)(()=>{X();},[X,F]),(0,r.useEffect)(()=>(W(),window.addEventListener("resize",W),()=>{window.removeEventListener("resize",W),I.current&&clearTimeout(I.current);}),[W]);let q=(0,r.useCallback)(e=>{let t=window.location.href,n=window.location.pathname;if(/overview/.test(n)&&/0?[1-39][0-3]?x/.test(e)){window.location.href=t.replace(window.location.origin,e).replace(/\/components\/overview/,`/docs${/0(9|10)x/.test(e)?"":"/react"}/introduce`).replace(/\/$/,"");return;}let a=new URL(t.replace(window.location.origin,e));a.host.includes("antgroup")?(a.pathname=`${a.pathname.replace(/\/$/,"")}/`,window.location.href=a.toString()):window.location.href=a.href.replace(/\/$/,"");},[]),V=(0,r.useCallback)(()=>{let e=`${window.location.protocol}//`,t=window.location.href.slice(e.length);P(y.isZhCN(R)?"en-US":"zh-CN"),window.location.href=e+t.replace(window.location.pathname,y.getLocalizedPathname(R,!y.isZhCN(R),B).pathname);},[R,B]),Q=(0,r.useMemo)(()=>"rtl"!==D?"RTL":"LTR",[D]),Z=(0,r.useMemo)(()=>"rtl"===D?{direction:"ltr",textAlign:"end"}:{},[D]),{menuVisible:Y,windowWidth:K,searching:J}=N,ee=["","index","index-cn"].includes(R),et="cn"===e,en="rtl"===D,ea=(0,b.getBannerData)(),ei=(null==ea?void 0:ea.title)||"",el=(null==ea?void 0:ea.href)||"",er=null;K<1120?er="crowded":K<1200&&(er="narrow");let eo=(0,c.clsx)(O.header,"clearfix",{"home-header":ee}),es={isZhCN:et,isRTL:en},ed=(0,l.jsx)(S.default,{...es,responsive:er,isMobile:E,directionText:Q,onLangChange:V,onDirectionChange:U},"nav"),ec=[ed,(0,l.jsx)(s.Select,{size:"small",variant:"filled",loading:i,className:O.versionSelect,defaultValue:t.version,onChange:q,styles:{popup:{root:Z}},popupMatchSelectWidth:!1,getPopupContainer:e=>e.parentNode,options:d},"version"),(0,l.jsx)(k.default,{onClick:V,value:y.isZhCN(R)?1:2,label1:"\u4E2D",label2:"En",tooltip1:"\u4E2D\u6587 / English",tooltip2:"English / \u4E2D\u6587"},"lang"),(0,l.jsx)(k.default,{onClick:U,value:"rtl"===D?2:1,label1:(0,l.jsx)(j.default,{className:O.dataDirectionIcon,direction:"ltr"}),tooltip1:"LTR",label2:(0,l.jsx)(j.default,{className:O.dataDirectionIcon,direction:"rtl"}),tooltip2:"RTL",pure:!0,"aria-label":"RTL Switch Button"},"direction"),(0,l.jsx)(v.default,{},"theme"),(0,l.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noreferrer",children:(0,l.jsx)(s.Tooltip,{title:"GitHub",destroyOnHidden:!0,children:(0,l.jsx)(s.Button,{type:"text",icon:(0,l.jsx)(o.GithubOutlined,{}),style:{fontSize:16}})})},"github")];K<1120?ec=J?[]:[ed]:K<1200&&(ec=J?[]:ec);let eu=ee?[{flex:"none"},{flex:"auto"}]:[{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24},{xxl:20,xl:19,lg:18,md:18,sm:0,xs:0}];return(0,l.jsxs)("header",{className:eo,children:[E&&(0,l.jsx)(s.Popover,{classNames:{root:O.popoverMenu},placement:"bottomRight",content:ec,trigger:"click",open:Y,arrow:{pointAtCenter:!0},onOpenChange:G,children:(0,l.jsx)(o.MenuOutlined,{className:"nav-phone-icon"})}),et&&L&&ei&&el&&(0,l.jsx)(s.ConfigProvider,{theme:{token:{colorInfoBg:"linear-gradient(90deg, #84fab0, #8fd3f4)",colorTextBase:"#000"}},children:(0,l.jsx)(s.Alert,{className:O.banner,title:ei&&el?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{children:ei}),(0,l.jsx)("a",{className:O.link,href:el,target:"_blank",rel:"noreferrer",onClick:()=>{var e,t;null===(e=(t=window).gtag)||void 0===e||e.call(t,"event","\u70B9\u51FB",{event_category:"top_banner",event_label:el});},children:"\u524D\u5F80\u4E86\u89E3"})]}):null,type:"info",banner:!0,showIcon:!1,closable:{closeIcon:!0,onClose:()=>{T({bannerVisible:!1}),H((0,u.default)().toISOString());}}})}),(0,l.jsxs)(s.Row,{style:{flexFlow:"nowrap",height:64},children:[(0,l.jsx)(s.Col,{...eu[0],children:(0,l.jsx)(_.default,{...es,location:F})}),(0,l.jsx)(s.Col,{...eu[1],children:(0,l.jsxs)("div",{className:O.menuRow,children:[(0,l.jsx)(f.default,{}),!E&&ec]})})]})]});};},efe86da3:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var a=n("777fffbe"),i=n("f19d2b93"),l=a._(n("e22febe0"));let r=({direction:e})=>(0,i.jsxs)("svg",{viewBox:"0 0 20 20",width:"20",height:"20",fill:"currentColor",style:{transform:`scaleX(${"ltr"===e?"1":"-1"})`},children:[(0,i.jsx)("title",{children:"Direction Icon"}),(0,i.jsx)("path",{d:"m14.6961816 11.6470802.0841184.0726198 2 2c.2662727.2662727.2904793.682876.0726198.9764816l-.0726198.0841184-2 2c-.2929.2929-.7677.2929-1.0606 0-.2662727-.2662727-.2904793-.682876-.0726198-.9764816l.0726198-.0841184.7196-.7197h-10.6893c-.41421 0-.75-.3358-.75-.75 0-.3796833.28215688-.6934889.64823019-.7431531l.10176981-.0068469h10.6893l-.7196-.7197c-.2929-.2929-.2929-.7677 0-1.0606.2662727-.2662727.682876-.2904793.9764816-.0726198zm-8.1961616-8.6470802c.30667 0 .58246.18671.69635.47146l3.00003 7.50004c.1538.3845-.0333.821-.41784.9749-.38459.1538-.82107-.0333-.9749-.4179l-.81142-2.0285h-2.98445l-.81142 2.0285c-.15383.3846-.59031.5717-.9749.4179-.38458-.1539-.57165-.5904-.41781-.9749l3-7.50004c.1139-.28475.38968-.47146.69636-.47146zm8.1961616 1.14705264.0841184.07261736 2 2c.2662727.26626364.2904793.68293223.0726198.97654222l-.0726198.08411778-2 2c-.2929.29289-.7677.29289-1.0606 0-.2662727-.26626364-.2904793-.68293223-.0726198-.97654222l.0726198-.08411778.7196-.7196675h-3.6893c-.4142 0-.75-.3357925-.75-.7500025 0-.3796925.2821653-.69348832.6482323-.74315087l.1017677-.00684663h3.6893l-.7196-.7196725c-.2929-.29289-.2929-.76777 0-1.06066.2662727-.26626364.682876-.29046942.9764816-.07261736zm-8.1961616 1.62238736-.89223 2.23056h1.78445z"})]});var o=e=>{let{ref:t,direction:n,...a}=e;return(0,i.jsx)(l.default,{component:()=>(0,i.jsx)(r,{direction:n}),ref:t,...a});};},f0cc8246:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ANT_DESIGN_NOT_SHOW_BANNER:function(){return j;},default:function(){return _;}});var a=n("777fffbe"),i=n("852bbaa9"),l=n("f19d2b93"),r=i._(n("5b220c3d")),o=n("92a444f6"),s=n("2190d124"),d=n("c5e2d900"),c=n("a9d1a279"),u=a._(n("072ab8a9")),p=n("9c86e52a"),f=n("40d543ed"),m=a._(n("098b7512")),g=a._(n("ab6def4f")),h=n("b055b5cb"),x=n("7a33de8c"),b=a._(n("44bde013")),v=a._(n("714a8bde"));let j="ANT_DESIGN_NOT_SHOW_BANNER";if("undefined"!=typeof window){let e=location.hash.slice(1);e.startsWith("components-")&&!document.querySelector(`#${e}`)&&(location.hash=`#${e.replace(/^components-/,"")}`);}let w=(e=[],t)=>e.map(e=>"auto"===e&&"dark"===t||"dark"===e?c.theme.darkAlgorithm:"compact"===e?c.theme.compactAlgorithm:null).filter(Boolean),y=()=>"undefined"==typeof window?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",$=(e,t)=>e.includes("dark")||e.includes("auto")&&"dark"===t;var _=()=>{let e=(0,p.useOutlet)(),[t,n]=(0,p.useSearchParams)(),[{theme:a=[],direction:i,isMobile:_,bannerVisible:S=!1,dynamicTheme:k,isDark:M=!1},C]=(0,m.default)({isMobile:!1,direction:"ltr",theme:[],isDark:!1,bannerVisible:!1,dynamicTheme:void 0}),[A]=(0,g.default)(x.ANT_DESIGN_SITE_THEME,{defaultValue:void 0}),[N]=(0,g.default)(j,{defaultValue:void 0}),z=e=>{let t=e.filter(e=>!["light","dark","auto"].includes(e)),n=e.find(e=>"light"===e||"dark"===e);return n?[...t,n]:["light","dark","auto"].includes(A)?[...t,A]:[...t,"auto"];},[D,E]=r.default.useState(()=>y()),L=(0,h.getBannerData)(),T=(0,r.useCallback)(e=>{C(t=>({...t,...e}));let a=t.toString(),i=t;Object.entries(e).forEach(e=>{let[t,n]=e;if("direction"===t&&("rtl"===n?i.set("direction","rtl"):i.delete("direction")),"theme"===t){let e=Array.isArray(n)?n:[n],t=e.filter(e=>!["light","dark","auto"].includes(e)),a=e.find(e=>"light"===e||"dark"===e);a?i=(0,p.createSearchParams)({...i,theme:[...t,a]}):i.delete("theme");}}),i.toString()!==a&&n(i);},[t,n]),I=(0,r.useCallback)(()=>{T({isMobile:window.innerWidth<768});},[T]);(0,r.useEffect)(()=>{let e=a.find(e=>"light"===e||"dark"===e),t=document.querySelector("html");a.includes("auto")&&D?null==t||t.setAttribute("data-prefers-color",D):e&&(null==t||t.setAttribute("data-prefers-color",e)),C(e=>({...e,isDark:$(a,D)}));},[D,a]),(0,r.useEffect)(()=>{if("undefined"==typeof window)return;let e=window.matchMedia("(prefers-color-scheme: dark)"),t=e=>{E(e.matches?"dark":"light");};return e.addEventListener("change",t),()=>{e.removeEventListener("change",t);};},[]),(0,r.useEffect)(()=>{let e=z(t.getAll("theme")),n=t.get("direction"),a=$(e,D),i=N&&(0,u.default)().diff((0,u.default)(N),"day")>=1;C({theme:e,isDark:a,direction:"rtl"===n?"rtl":"ltr",bannerVisible:"undefined"!=typeof window&&window.location.pathname.includes("-cn")&&!!L&&(!N||!!i)}),I();let l=window[Symbol.for("antd.mirror-notify")];return"function"==typeof l&&l(),window.addEventListener("resize",I),()=>{window.removeEventListener("resize",I);};},[t,I]);let F=r.default.useMemo(()=>({direction:i,updateSiteConfig:T,theme:a,isDark:M,isMobile:_,bannerVisible:S,dynamicTheme:k}),[_,i,T,a,M,S,k]),[R,B]=r.default.useMemo(()=>{let{algorithm:e,token:t,...n}=k||{},i={};return Object.keys(n).forEach(e=>{i[e]={classNames:n[e]};}),[{algorithm:w(a,D),token:{motion:!a.includes("motion-off"),...t},zeroRuntime:!0},i];},[a,k,D]),O=r.default.useMemo(()=>(0,o.createCache)(),[]);return(0,p.useServerInsertedHTML)(()=>{let e=(0,o.extractStyle)(O,{plain:!0,types:"style"});return(0,l.jsx)("style",{"data-type":"antd-cssinjs",dangerouslySetInnerHTML:{__html:e}});}),(0,p.useServerInsertedHTML)(()=>{let e=(0,o.extractStyle)(O,{plain:!0,types:["cssVar","token"]});return(0,l.jsx)("style",{"data-type":"antd-css-var","data-rc-order":"prepend","data-rc-priority":"-9999",dangerouslySetInnerHTML:{__html:e}});}),(0,p.useServerInsertedHTML)(()=>(0,l.jsx)("style",{"data-sandpack":"true",id:"sandpack",dangerouslySetInnerHTML:{__html:(0,d.getSandpackCssText)()}})),(0,l.jsx)(f.DarkContext,{value:M,children:(0,l.jsx)(o.StyleProvider,{cache:O,layer:!0,linters:[o.legacyNotSelectorLinter,o.parentSelectorLinter,o.NaNLinter],children:(0,l.jsx)(v.default,{value:F,children:(0,l.jsx)(b.default,{theme:R,children:(0,l.jsx)(s.HappyProvider,{disabled:!a.includes("happy-work"),children:(0,l.jsx)(c.ConfigProvider,{...B,children:(0,l.jsx)(c.App,{children:e})})})})})})});};}}]);