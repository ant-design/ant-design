(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["ec324310"],{"0d35acd6":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        .preview-image-boxes {
          display: flex;
          float: right;
          clear: both;
          width: 496px;
          margin: 0 0 70px 64px;

          &-with-carousel {
            width: 420px;

            .preview-image-box img {
              padding: 0;
            }
          }

          .ant-row-rtl & {
            float: left;
            margin: 0 64px 70px 0;
          }
        }

        .preview-image-boxes + .preview-image-boxes {
          margin-top: -35px;
        }

        .preview-image-box {
          float: left;
          width: 100%;
        }

        .preview-image-box + .preview-image-box {
          margin-inline-start: ${e.marginLG}px;

          .ant-row-rtl & {
            margin-inline-end: ${e.marginLG}px;
            margin-inline-start: 0;
          }
        }

        .preview-image-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
          padding: ${e.padding}px;
          text-align: center;
          background: #f2f4f5;
          box-sizing: border-box;
        }

        .preview-image-wrapper.video {
          display: block;
          padding: 0;
          background: 0;
        }

        .preview-image-wrapper video {
          display: block;
          width: 100%;

          + svg {
            position: absolute;
            top: 0;
            inset-inline-start: 0;
          }
        }

        .preview-image-wrapper.good::after {
          position: absolute;
          bottom: 0;
          inset-inline-start: 0;
          display: block;
          width: 100%;
          height: 3px;
          background: ${e.colorPrimary};
          content: '';
        }

        .preview-image-wrapper.bad::after {
          position: absolute;
          bottom: 0;
          inset-inline-start: 0;
          display: block;
          width: 100%;
          height: 3px;
          background: ${e.colorError};
          content: '';
        }

        .preview-image-title {
          margin-top: ${e.marginMD}px;
          color: ${e.colorText};
          font-size: ${e.fontSizeSM}px;
        }

        .preview-image-description {
          margin-top: 2px;
          color: ${e.colorTextSecondary};
          font-size: ${e.fontSizeSM}px;
          line-height: 1.5;
        }

        .preview-image-description hr {
          margin: 2px 0;
          background: none;
          border: 0;
        }

        .preview-image-box img {
          box-sizing: border-box;
          max-width: 100%;
          padding: ${e.paddingSM}px;
          background: ${e.colorBgContainer};
          border-radius: ${e.borderRadius}px;
          cursor: pointer;
          transition: all ${e.motionDurationSlow};

          &.no-padding {
            padding: 0;
            background: none;
          }
        }

        .preview-image-boxes.preview-image-boxes-with-carousel img {
          padding: 0;
          box-shadow:
            0 1px 0 0 #ddd,
            0 3px 0 0 ${e.colorBgContainer},
            0 4px 0 0 #ddd,
            0 6px 0 0 ${e.colorBgContainer},
            0 7px 0 0 #ddd;
        }

        .preview-image-box img:hover {
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
        }

        .transition-video-player,
        .motion-video-min {
          float: right;
          width: 600px;
          padding: 0 0 70px 20px;

          .preview-image-wrapper {
            padding: 0;
          }

          .ant-row-rtl & {
            float: left;
          }
        }

        .motion-video-min {
          width: 390px;
        }

        .motion-principle-wrapper {
          width: 100%;
          max-width: 900px;
          margin: ${e.marginXXL}px 0 ${e.marginLG}px;
        }

        .principle-wrapper {
          width: 100%;

          .principle {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            min-height: 180px;
            margin-inline-end: 12.5%;
            margin-bottom: ${e.marginLG}px;
            padding: ${e.paddingLG}px;
            font-size: 24px;
            text-align: center;
            border: 1px solid #e8e8e8;
            border-radius: ${e.borderRadiusSM}px;

            &:last-child {
              margin-inline-end: 0;
            }

            h4 {
              margin: ${e.margin}px 0 ${e.marginXS}px;
            }

            p {
              font-size: ${e.fontSizeSM}px;
              line-height: 24px;
            }
          }
        }
      `});};},"1b87ba52":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return a;}});var i=n("f19d2b93"),o=n("a9d1a279"),a=e=>{let{item:{username:t,url:n}={}}=e;return t?(0,i.jsx)(o.Tooltip,{title:t,children:(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:`https://github.com/${t}`,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)(o.Avatar,{size:"small",src:n,alt:t,children:t})})})}):null;};},"1f46114b":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*1GSgSYDD_aIAAAAAQsAAAAgAegCCAQ/AlibabaSans-Light.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*2zEUQqnPNesAAAAAQtAAAAgAegCCAQ/AlibabaSans-Regular.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Medium.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Bold.woff2')
            format('woff2');
        }
        @font-face {
          font-family: 'AlibabaSans';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('//mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*E_cxRbMlZqUAAAAAQuAAAAgAegCCAQ/AlibabaSans-Heavy.woff2')
            format('woff2');
        }

        html {
          direction: initial;
          &.rtl {
            direction: rtl;
          }
        }

        body {
          overflow-x: hidden;
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          font-family: ${e.fontFamily};
          line-height: ${e.lineHeight};
          background: ${e.colorBgContainer};
          transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      `});};},"25c612ac":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return b;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("47413d36"),l=n("e22febe0"),d=n("3835a2b7"),s=i._(n("8a36253d")),c=n("9c86e52a"),p=i._(n("4589ed41")),u=i._(n("23546486")),g=i._(n("91a66390")),m=i._(n("714a8bde")),f=i._(n("80a8572e"));let h={cn:{owner:"\u8682\u8681\u96C6\u56E2\u548C Ant Design \u5F00\u6E90\u793E\u533A"},en:{owner:"Ant Group and Ant Design Community"}},x=(0,d.createStyles)(({token:e,css:t},n)=>{let i=new r.FastColor((0,s.default)("#f0f3fa","#fff")).onBackground(e.colorBgContainer).toHexString();return{holder:t`
      background: ${i};
    `,footer:t`
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
        margin-bottom: ${n?60:0}px;
        :last-child {
          margin-bottom: ${n?20:0}px;
        }
      }
      .rc-footer-item-icon {
        top: -1.5px;
      }
      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${e.marginXXL}px;
      }
      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${e.fontSize}px;
        }
      }
    `};});var b=()=>{let e=(0,g.default)(),[t,n]=(0,u.default)(h),{isMobile:i}=a.default.use(m.default),{styles:r}=x(i),{getLink:d}=e,s=a.default.useMemo(()=>{let e="cn"===n,t={title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.resources"}),items:[{title:"Ant Design X",url:e?"https://ant-design-x.antgroup.com":"https://x.ant.design",openExternal:!0},{title:"Ant Design Charts",url:e?"https://ant-design-charts.antgroup.com":"https://charts.ant.design",openExternal:!0},{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Pro Components",url:e?"https://pro-components.antdigital.dev":"https://procomponents.ant.design",openExternal:!0},{title:"Ant Design Mobile",url:e?"https://ant-design-mobile.antgroup.com/zh":"https://mobile.ant.design",openExternal:!0},{title:"Ant Design Mini",url:e?"https://ant-design-mini.antgroup.com/":"https://mini.ant.design",openExternal:!0},{title:"Ant Design Web3",url:e?"https://web3.antdigital.dev":"https://web3.ant.design",openExternal:!0},{title:"Ant Design Landing",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.landing"}),url:"https://landing.ant.design",openExternal:!0},{title:"Scaffolds",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.scaffolds"}),url:"https://scaffold.ant.design",openExternal:!0},{title:"Umi",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.umi"}),url:"https://umijs.org",openExternal:!0},{title:"dumi",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.dumi"}),url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.qiankun"}),url:"https://qiankun.umijs.org",openExternal:!0},{title:"Ant Motion",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.motion"}),url:"https://motion.ant.design",openExternal:!0},{title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.chinamirror"}),url:"https://ant-design.antgroup.com"}]},i={title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.community"}),items:[{icon:(0,o.jsx)(l.AntDesignOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.awesome"}),url:"https://github.com/websemantics/awesome-ant-design",openExternal:!0},{icon:(0,o.jsx)(l.MediumOutlined,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,o.jsx)(l.XOutlined,{}),title:"X",url:"http://x.com/antdesignui",openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.yuque.repo"}),url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,o.jsx)(l.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.zhihu"}),url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,o.jsx)(l.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.zhihu.xtech"}),url:"https://www.zhihu.com/column/c_1543658574504751104",openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",width:16,height:16,alt:"seeconf logo"}),title:"SEE Conf",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.seeconf"}),url:"https://seeconf.antfin.com/",openExternal:!0}]};return e&&i.items.push({icon:(0,o.jsx)(l.UsergroupAddOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.work_with_us"}),url:d("/docs/resources",{cn:"\u52A0\u5165\u6211\u4EEC",en:"JoinUs"}),LinkComponent:c.Link}),[t,i,{title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.help"}),items:[{icon:(0,o.jsx)(l.GithubOutlined,{}),title:"GitHub",url:"https://github.com/ant-design/ant-design",openExternal:!0},{icon:(0,o.jsx)(l.HistoryOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.change-log"}),url:d("/changelog"),LinkComponent:c.Link},{icon:(0,o.jsx)(l.QuestionCircleOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.faq"}),url:d("/docs/react/faq"),LinkComponent:c.Link},{icon:(0,o.jsx)(l.BugOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.bug-report"}),url:"https://new-issue.ant.design/",openExternal:!0},{icon:(0,o.jsx)(l.IssuesCloseOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.issues"}),url:"https://github.com/ant-design/ant-design/issues",openExternal:!0},{icon:(0,o.jsx)(l.MessageOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.discussions"}),url:"https://github.com/ant-design/ant-design/discussions",openExternal:!0},{icon:(0,o.jsx)(l.QuestionCircleOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.stackoverflow"}),url:"http://stackoverflow.com/questions/tagged/antd",openExternal:!0},{icon:(0,o.jsx)(l.QuestionCircleOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.segmentfault"}),url:"https://segmentfault.com/t/antd",openExternal:!0}]},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:22,height:22,alt:"Ant XTech logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.more-product"}),items:[{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.yuque"}),url:"https://yuque.com",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.yuque.slogan"}),openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",width:16,height:16,alt:"AntV logo"}),title:"AntV",url:"https://antv.antgroup.com",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.antv.slogan"}),openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://www.eggjs.org/logo.svg",alt:"Egg logo",width:16,height:16}),title:"Egg",url:"https://eggjs.org",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.egg.slogan"}),openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",width:16,height:16,alt:"Kitchen logo"}),title:"Kitchen",description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.kitchen"}),url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*3ittT5OEo2gAAAAAAAAAAAAADvGmAQ/original",width:16,height:16,alt:"Galacean logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.galacean"}),description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.galacean.slogan"}),url:"https://galacean.antgroup.com/",openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://mdn.alipayobjects.com/huamei_4qpv3u/afts/img/iH6wQKX4WCYAAAAAAAAAAAAAeocTAQFr/original",width:16,height:16,alt:"WeaveFox logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.weavefox"}),description:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.weavefox.slogan"}),url:"https://weavefox.cn/",openExternal:!0},{icon:(0,o.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:16,height:16,alt:"xtech logo"}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.xtech"}),url:"https://xtech.antfin.com/",openExternal:!0},{icon:(0,o.jsx)(l.BgColorsOutlined,{}),title:(0,o.jsx)(c.FormattedMessage,{id:"app.footer.theme"}),url:d("/theme-editor"),LinkComponent:c.Link}]}];},[d,n]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(p.default,{columns:s,className:r.footer,bottom:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{style:{opacity:"0.4"},children:["Made with ",(0,o.jsx)("span",{style:{color:"#fff"},children:"\u2764"})," by"]}),(0,o.jsx)("div",{children:t.owner})]})}),(0,o.jsx)(f.default,{})]});};},"3e969a12":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return f;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("5b220c3d"),r=n("a9d1a279"),l=n("3835a2b7"),d=i._(n("600aabe0")),s=n("9c86e52a"),c=i._(n("0a03b273")),p=i._(n("91a66390"));let u=e=>e&&/^\d+\.\d+\.\d+$/.test(e)||(null==e?void 0:e.toUpperCase())==="NEW"?"success":(null==e?void 0:e.toUpperCase())==="UPDATED"?"processing":(null==e?void 0:e.toUpperCase())==="DEPRECATED"?"red":"success",g=(0,l.createStyles)(({css:e,token:t})=>({link:e`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,tag:e`
    margin-inline-end: 0;
  `,subtitle:e`
    font-weight: normal;
    font-size: ${t.fontSizeSM}px;
    opacity: 0.8;
  `})),m=e=>{let{styles:t}=g(),{before:n,after:i,link:a,title:l,subtitle:s,search:p,tag:m,className:f}=e;return n||i?(0,o.jsxs)(c.default,{to:`${a}${p}`,className:f,children:[n,l,s&&(0,o.jsx)("span",{className:t.subtitle,children:s}),i]}):(0,o.jsxs)(c.default,{to:`${a}${p}`,className:(0,d.default)(f,{[t.link]:m}),children:[(0,o.jsxs)(r.Flex,{justify:"flex-start",align:"center",gap:"small",children:[(0,o.jsx)("span",{children:l}),s&&(0,o.jsx)("span",{className:t.subtitle,children:s})]}),m&&(0,o.jsx)(r.Tag,{bordered:!1,className:(0,d.default)(t.tag),color:u(m),children:m.replace(/VERSION/i,r.version)})]});};var f=(e={})=>{let t=(0,s.useFullSidebarData)(),{pathname:n,search:i}=(0,p.default)(),r=(0,s.useSidebarData)(),{before:l,after:d}=e;return[(0,a.useMemo)(()=>{var e,a;let s=[...r??[]];if(n.startsWith("/docs/spec")){let e=s.splice(0,1);s.push(...e);}if(n.startsWith("/docs/react")){let n=null===(e=Object.entries(t).find(([e])=>e.startsWith("/changelog")))||void 0===e?void 0:e[1];n&&s.splice(1,0,n[0]);}if(n.startsWith("/changelog")){let e=null===(a=Object.entries(t).find(([e])=>e.startsWith("/docs/react")))||void 0===a?void 0:a[1];e&&(s.unshift(e[0]),s.push(...e.slice(1)));}return(null==s?void 0:s.reduce((e,t)=>{if(null==t?void 0:t.title){var a,r;if(n.startsWith("/docs/spec")){let n=t.children.reduce((e,t)=>{var n;let i=(null===(n=t.frontmatter)||void 0===n?void 0:n.type)??"default";return e[i]||(e[i]=[]),e[i].push(t),e;},{}),r=[];r.push(...(null===(a=n.default)||void 0===a?void 0:a.map(e=>({label:(0,o.jsxs)(c.default,{to:`${e.link}${i}`,children:[l,null==e?void 0:e.title,d]}),key:e.link.replace(/(-cn$)/g,"")})))??[]),Object.entries(n).forEach(([e,t])=>{"default"!==e&&r.push({type:"group",label:e,key:e,children:null==t?void 0:t.map(e=>({label:(0,o.jsxs)(c.default,{to:`${e.link}${i}`,children:[l,null==e?void 0:e.title,d]}),key:e.link.replace(/(-cn$)/g,"")}))});}),e.push({label:null==t?void 0:t.title,key:null==t?void 0:t.title,children:r});}else e.push({type:"group",label:null==t?void 0:t.title,key:null==t?void 0:t.title,children:null===(r=t.children)||void 0===r?void 0:r.map(e=>{var t,n;return{label:(0,o.jsx)(m,{before:l,after:d,link:e.link,title:null==e?void 0:e.title,subtitle:null===(t=e.frontmatter)||void 0===t?void 0:t.subtitle,search:i,tag:null===(n=e.frontmatter)||void 0===n?void 0:n.tag}),key:e.link.replace(/(-cn$)/g,"")};})});}else{let n=t.children||[];n.every(e=>{var t;return null==e?void 0:null===(t=e.frontmatter)||void 0===t?void 0:t.date;})&&n.sort((e,t)=>{var n,i;return(null===(n=e.frontmatter)||void 0===n?void 0:n.date)>(null===(i=t.frontmatter)||void 0===i?void 0:i.date)?-1:1;}),e.push(...n.map(e=>{var t;return{label:(0,o.jsx)(m,{before:l,after:d,link:e.link,title:null==e?void 0:e.title,search:i,tag:null===(t=e.frontmatter)||void 0===t?void 0:t.tag}),key:e.link.replace(/(-cn$)/g,"")};}));}return e;},[]))??[];},[r,n,t,i,l,d]),n];};},"43a20bcd":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("a9d1a279"),r=n("3835a2b7"),l=i._(n("600aabe0")),d=i._(n("59b9e411"));let s="1.2em",c=(0,r.createStyles)(({token:e,css:t})=>{let{colorText:n,controlHeight:i,colorBgContainer:o,motionDurationMid:a}=e;return{btn:t`
      width: ${i}px;
      .btn-inner {
        transition: all ${a};
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
      border: 1px solid ${n};
      color: ${n};
    `,label1Style:t`
      inset-inline-start: -5%;
      top: 0;
      z-index: 1;
      background-color: ${n};
      color: ${o};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,label2Style:t`
      inset-inline-end: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `};});var p=e=>{let{label1:t,label2:n,tooltip1:i,tooltip2:r,value:s,pure:p,onClick:u,...g}=e,{styles:{btn:m,innerDiv:f,labelStyle:h,label1Style:x,label2Style:b}}=c(),w=(0,o.jsx)(a.Button,{type:"text",onClick:u,className:m,...(0,d.default)(g,["className"]),children:(0,o.jsxs)("div",{className:"btn-inner",children:[p&&(1===s?t:n),!p&&(0,o.jsxs)("div",{className:f,children:[(0,o.jsx)("span",{className:(0,l.default)(h,1===s?x:b),children:t}),(0,o.jsx)("span",{className:(0,l.default)(h,1===s?b:x),children:n})]})]})},"lang-button");return i||r?(0,o.jsx)(a.Tooltip,{title:1===s?i:r,children:w}):w;};},"494cb795":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("e22febe0"),d=n("3835a2b7"),s=i._(n("600aabe0")),c=i._(n("3e969a12")),p=i._(n("714a8bde"));let u=(0,d.createStyles)(({token:e,css:t})=>{let{colorSplit:n,iconCls:i,fontSizeIcon:o}=e;return{prevNextNav:t`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: ${e.fontSize}px;
      border-top: 1px solid ${n};
      display: flex;
    `,pageNav:t`
      flex: 1;
      height: 72px;
      line-height: 72px;
      text-decoration: none;

      ${i} {
        color: #999;
        font-size: ${o}px;
        transition: all ${e.motionDurationSlow};
      }

      .chinese {
        margin-inline-start: ${e.marginXXS}px;
      }
    `,prevNav:t`
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
    `,nextNav:t`
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
    `};}),g=e=>Array.isArray(e)?e.reduce((e,t)=>t?"children"in t&&t.children?e.concat(g(t.children)??[]):e.concat(t):e,[]):null;var m=({rtl:e})=>{let{styles:t}=u(),n={className:"footer-nav-icon-before"},i={className:"footer-nav-icon-after"},o=e?(0,a.jsx)(l.RightOutlined,{...n}):(0,a.jsx)(l.LeftOutlined,{...n}),d=e?(0,a.jsx)(l.LeftOutlined,{...i}):(0,a.jsx)(l.RightOutlined,{...i}),[m,f]=(0,c.default)({before:o,after:d}),{isMobile:h}=r.default.use(p.default),[x,b]=(0,r.useMemo)(()=>{let e=g(m);if(!e)return[null,null];let t=-1;return e.forEach((e,n)=>{e&&e.key===f&&(t=n);}),[e[t-1],e[t+1]];},[m,f]);return h?null:(0,a.jsxs)("section",{className:t.prevNextNav,children:[x&&r.default.cloneElement(x.label,{className:(0,s.default)(t.pageNav,t.prevNav,x.className)}),b&&r.default.cloneElement(b.label,{className:(0,s.default)(t.pageNav,t.nextNav,b.className)})]});};},"4b6975d6":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return f;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("a9d1a279"),l=n("3835a2b7"),d=n("9c86e52a"),s=i._(n("a7fa2147")),c=i._(n("b550a850")),p=i._(n("25c612ac")),u=n("40d543ed"),g=i._(n("a249a395"));let m=(0,l.createStyles)(({token:e,css:t},n)=>({resourcePage:t`
      footer {
        margin-top: 176px;
        .rc-footer-container {
          max-width: ${1208}px;
          margin: 0 auto;
          padding-inline-end: 0;
          padding-inline-start: 0;
        }
      }
    `,resourceContent:t`
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
          ${e.antCls}-col {
            padding-top: ${e.padding}px !important;
            padding-bottom: ${e.padding}px !important;
          }
        }
      }
    `,banner:t`
      padding: 0 ${40}px;
      overflow: hidden;
      ${n?"":"background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');"}
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
        font-size: ${e.fontSizeLG}px;
        line-height: 24px;
      }

      @media only screen and (max-width: 767.99px) {
        & {
          margin: 0 -${24}px;
          padding: 0 ${24}px;
        }
      }
    `}));var f=({children:e})=>{var t;let n=a.default.use(u.DarkContext),{styles:i}=m(n),l=(0,d.useRouteMeta)(),f=(0,o.jsxs)(r.Layout,{children:[(0,o.jsx)(s.default,{}),(0,o.jsxs)("div",{id:"resources-page",className:i.resourcePage,children:[(0,o.jsx)(g.default,{}),(0,o.jsxs)("div",{className:i.banner,children:[(0,o.jsxs)(r.Typography.Title,{style:{fontSize:30},children:[null===(t=l.frontmatter)||void 0===t?void 0:t.title,(0,o.jsx)(c.default,{title:(0,o.jsx)(d.FormattedMessage,{id:"app.content.edit-page"}),filename:l.frontmatter.filename})]}),(0,o.jsx)("section",{children:l.frontmatter.description})]}),(0,o.jsx)("div",{className:i.resourceContent,children:e}),(0,o.jsx)(p.default,{})]})]});return n?f:(0,o.jsx)(r.ConfigProvider,{theme:{token:{colorBgLayout:"#fff"}},children:f});};},"530fedd5":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
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
      `});};},61595633:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("9c86e52a"),r=i._(n("25c612ac")),l=e=>{let{children:t,title:n,desc:i}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(a.Helmet,{children:[(0,o.jsx)("title",{children:n}),(0,o.jsx)("meta",{property:"og:title",content:n}),i&&(0,o.jsx)("meta",{name:"description",content:i})]}),(0,o.jsx)("div",{style:{minHeight:"100vh"},children:t}),(0,o.jsx)(r.default,{})]});};},"6ee40046":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7");let r={1:"#fff",2:"#fafafa",3:"#f5f5f5",4:"#f0f0f0",5:"#d9d9d9",6:"#bfbfbf",7:"#8c8c8c",8:"#595959",9:"#434343",10:"#262626",11:"#1f1f1f",12:"#141414",13:"#000"};var l=()=>{let e=(0,a.useTheme)(),t=(n,i=1)=>i<=10?`
.palette-${n}-${i} {
  background: ${e[`${n}-${i}`]};
}
${t(n,i+1)}
    `:"",n=(e=1)=>e<=13?`
.palette-gray-${e} {
  background: ${r[e]};
}
${n(e+1)}
    `:"";return(0,i.jsx)(o.Global,{styles:(0,o.css)`
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
      `});};},"734ac3ec":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          > a[aria-hidden]:first-child {
            float: left;
            width: 20px;
            padding-inline-end: ${e.paddingXXS}px;
            font-size: 0;
            line-height: inherit;
            text-align: right;
            padding-inline-end: ${e.paddingXXS}px;
            margin-inline-start: -${e.marginLG}px;

            [data-direction='rtl'] & {
              float: right;
            }

            &:hover {
              border: 0;
            }

            > .icon-link::before {
              font-size: ${e.fontSizeXL}px;
              content: '#';
              color: ${e.colorTextSecondary};
              font-family: ${e.codeFamily};
            }
          }

          &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
            visibility: hidden;
          }
        }
      `});};},75801792:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{default:function(){return p;},useStyle:function(){return c;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("a9d1a279"),l=n("3835a2b7"),d=i._(n("600aabe0")),s=n("9c86e52a");let c=(0,l.createStyles)(({token:e,css:t})=>{let{antCls:n}=e;return{anchorToc:t`
      scrollbar-width: thin;
      scrollbar-gutter: stable;
      ${n}-anchor {
        ${n}-anchor-link-title {
          font-size: ${e.fontSizeSM}px;
        }
      }
    `,tocWrapper:t`
      position: fixed;
      top: ${e.headerHeight+e.contentMarginTop-4}px;
      inset-inline-end: 0;
      width: 148px;
      padding: 0;
      border-radius: ${e.borderRadius}px;
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
        max-height: calc(100vh - ${e.headerHeight+e.contentMarginTop+24}px) !important;
        margin: auto;
        overflow: auto;
        padding: ${e.paddingXXS}px;
        backdrop-filter: blur(8px);
      }

      @media only screen and (max-width: ${e.screenLG}px) {
        display: none;
      }
    `,articleWrapper:t`
      padding-inline: 48px 164px;
      padding-block: 0 32px;

      @media only screen and (max-width: ${e.screenLG}px) {
        & {
          padding: 0 ${2*e.paddingLG}px;
        }
      }
    `};});var p=({showDebug:e,debugDemos:t=[]})=>{let{styles:n}=c(),i=(0,l.useTheme)(),p=(0,s.useRouteMeta)(),u=(0,s.useTabMeta)(),g=a.default.useMemo(()=>((null==u?void 0:u.toc)||p.toc).reduce((e,t)=>{if(2===t.depth)e.push({...t});else if(3===t.depth){let n=e[e.length-1];n&&(n.children=n.children||[],n.children.push({...t}));}return e;},[]),[null==u?void 0:u.toc,p.toc]);return p.frontmatter.toc?(0,o.jsx)("section",{className:n.tocWrapper,children:(0,o.jsx)(r.Anchor,{affix:!1,className:n.anchorToc,targetOffset:i.anchorTop,showInkInFixed:!0,items:g.map(n=>{var i;return{href:`#${n.id}`,title:n.title,key:n.id,children:null===(i=n.children)||void 0===i?void 0:i.filter(n=>e||!t.includes(n.id)).map(e=>({key:e.id,href:`#${e.id}`,title:(0,o.jsx)("span",{className:(0,d.default)({"toc-debug":t.includes(e.id)}),children:null==e?void 0:e.title})}))};})})}):null;};},"80a8572e":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return g;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("3835a2b7"),d=n("d45d433f"),s=i._(n("23546486"));let c="ant-where-checker",p={cn:{whereNotSupport:`\u{4F60}\u{7684}\u{6D4F}\u{89C8}\u{5668}\u{4E0D}\u{652F}\u{6301}\u{73B0}\u{4EE3} CSS Selector\u{FF0C}\u{8BF7}\u{4F7F}\u{7528}\u{73B0}\u{4EE3}\u{6D4F}\u{89C8}\u{5668}\u{FF08}\u{5982} Chrome\u{3001}Firefox \u{7B49}\u{7B49}\u{FF09}\u{67E5}\u{770B}\u{5B98}\u{7F51}\u{3002}\u{5982}\u{679C}\u{9700}\u{8981}\u{5BF9}\u{65E7}\u{7248}\u{6D4F}\u{89C8}\u{5668}\u{8FDB}\u{884C}\u{6837}\u{5F0F}\u{652F}\u{6301}\u{FF0C}\u{6B22}\u{8FCE}\u{67E5}\u{9605}\u{914D}\u{7F6E}\u{6587}\u{6863}\u{FF1A}`,whereDocTitle:"\u517C\u5BB9\u6027\u8C03\u6574\uFF08\u8BF7\u4F7F\u7528\u73B0\u4EE3\u6D4F\u89C8\u5668\u8BBF\u95EE\uFF09",whereDocUrl:"/docs/react/customize-theme-cn#\u517C\u5BB9\u6027\u8C03\u6574"},en:{whereNotSupport:"Your browser not support modern CSS Selector. Please use modern browser to view (e.g. Chrome, Firefox, etc). If you want to compatible style with legacy browser, please refer to the configuration document:",whereDocTitle:"Compatible adjustment (Please use modern browser to visit)",whereDocUrl:"/docs/react/customize-theme#compatible-adjustment"}},u=(0,l.createStyles)(({css:e,token:t})=>({container:e`
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
    padding: ${t.paddingXS}px ${t.paddingSM}px;
    border-radius: ${t.borderRadiusLG}px;
    z-index: 9999999999;
    line-height: 22px;
    width: 520px;
    a {
      color: ${t.colorPrimary};
      text-decoration-line: none;
    }
  `}));var g=()=>{let[e]=(0,s.default)(p),[t,n]=r.useState(!0);r.useEffect(()=>{let e=document.createElement("p");e.className=c,e.style.position="fixed",e.style.pointerEvents="none",e.style.visibility="hidden",e.style.width="0",document.body.appendChild(e),(0,d.updateCSS)(`
:where(.${c}) {
  content: "__CHECK__";
}
    `,c);let{content:t}=getComputedStyle(e);n(String(t).includes("CHECK")),document.body.removeChild(e),(0,d.removeCSS)(c);},[]);let{styles:i}=u();return t?null:(0,a.jsx)("div",{className:i.container,children:(0,a.jsxs)("div",{className:i.alertBox,children:[e.whereNotSupport," ",(0,a.jsx)("a",{href:e.whereDocUrl,children:e.whereDocTitle})]})});};},"80ae577b":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return g;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("a9d1a279"),l=n("3835a2b7"),d=n("9c86e52a"),s=i._(n("8aeb4d59")),c=i._(n("3e969a12")),p=i._(n("714a8bde"));let u=(0,l.createStyles)(({token:e,css:t})=>{let{antCls:n,fontFamily:i,colorSplit:o,marginXXL:a,paddingXXS:r}=e;return{asideContainer:t`
      min-height: 100%;
      padding-bottom: ${a}px !important;
      font-family: Avenir, ${i}, sans-serif;
      padding: 0 ${r}px;

      &${n}-menu-inline {
        ${n}-menu-submenu-title h4,
        > ${n}-menu-item,
        ${n}-menu-item a {
          overflow: hidden;
          font-size: ${e.fontSize}px;
          text-overflow: ellipsis;
        }

        > ${n}-menu-item-group > ${n}-menu-item-group-title {
          margin-top: ${e.margin}px;
          margin-bottom: ${e.margin}px;
          font-size: ${e.fontSize}px;

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${o};
            content: '';
          }
        }

        > ${n}-menu-item,
          > ${n}-menu-submenu
          > ${n}-menu-submenu-title,
          > ${n}-menu-item-group
          > ${n}-menu-item-group-title,
          > ${n}-menu-item-group
          > ${n}-menu-item-group-list
          > ${n}-menu-item,
          &${n}-menu-inline
          > ${n}-menu-item-group
          > ${n}-menu-item-group-list
          > ${n}-menu-item {
          padding-inline: 36px 12px !important;
        }

        // Nest Category > Type > Article
        &${n}-menu-inline {
          ${n}-menu-item-group-title {
            margin-inline-start: ${e.marginXXS}px;
            padding-inline-start: 60px;

            ${n}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${e.padding}px;
            }
          }

          ${n}-menu-item-group-list > ${n}-menu-item {
            padding-inline-start: 80px !important;

            ${n}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${e.padding}px !important;
            }
          }
        }

        ${n}-menu-item-group:first-child {
          ${n}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }
    `,mainMenu:t`
      z-index: 1;
      position: sticky;
      top: ${e.headerHeight+e.contentMarginTop}px;
      width: 100%;
      max-height: calc(100vh - ${e.headerHeight+e.contentMarginTop}px);
      overflow: hidden;
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      &:hover {
        overflow-y: auto;
      }
    `};});var g=()=>{let e=(0,d.useSidebarData)(),{isMobile:t,theme:n}=a.default.use(p.default),{styles:i}=u(),[g,m]=(0,c.default)(),f=n.includes("dark"),{colorBgContainer:h}=(0,l.useTheme)(),x=(0,o.jsx)(r.ConfigProvider,{theme:{components:{Menu:{itemBg:h,darkItemBg:h}}},children:(0,o.jsx)(r.Menu,{items:g,inlineIndent:30,className:i.asideContainer,mode:"inline",theme:f?"dark":"light",selectedKeys:[m],defaultOpenKeys:null==e?void 0:e.map(({title:e})=>e).filter(Boolean)})});return t?(0,o.jsx)(s.default,{children:x},"Mobile-menu"):(0,o.jsx)(r.Col,{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24,className:i.mainMenu,children:x});};},"9ef535e4":function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return i.default;}});var i=n("777fffbe")._(n("04e63e65"));},a138adac:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("3835a2b7"),r=i._(n("a7fa2147")),l=i._(n("d0dc4122")),d=i._(n("80ae577b")),s=n("9c86e52a");let c=(0,a.createStyles)(({css:e,token:t})=>({main:e`
    display: flex;
    margin-top: ${t.contentMarginTop}px;
  `}));var p=({children:e})=>{let[t]=(0,s.useSearchParams)(),n="false"===t.get("layout"),{styles:i}=c();return(0,o.jsxs)("main",{className:i.main,children:[(0,o.jsx)(r.default,{}),!n&&(0,o.jsx)(d.default,{}),(0,o.jsx)(l.default,{children:e})]});};},a2249523:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=n("3835a2b7"),l=n("9c86e52a"),d=i._(n("0a03b273")),s=o._(n("e67f7d0e"));let c=(0,r.createStyles)(({token:e,css:t})=>{let{headerHeight:n,colorTextHeading:i,mobileMaxWidth:o}=e;return{logo:t`
      height: ${n}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${i};
      font-weight: bold;
      font-size: 18px;
      line-height: ${n}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      column-gap: ${e.marginSM}px;

      &:hover {
        color: ${i};
      }

      img {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
      }

      @media only screen and (max-width: ${o}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,title:t`
      line-height: 32px;
    `};});var p=({isZhCN:e})=>{let{search:t}=(0,l.useLocation)(),{styles:n}=c();return(0,a.jsx)("h1",{children:(0,a.jsxs)(d.default,{to:s.getLocalizedPathname("/",e,t),className:n.logo,children:[(0,a.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",draggable:!1,alt:"logo"}),(0,a.jsx)("span",{className:n.title,children:"Ant Design"})]})});};},a249a395:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("a9d1a279"),d=n("3835a2b7"),s=i._(n("600aabe0")),c=i._(n("f93c65a6")),p=i._(n("ca111321"));let u=["scroll","resize"],g=(0,d.createStyles)(({token:e,css:t})=>{let{boxShadowSecondary:n,antCls:i}=e;return{affixTabs:t`
      position: fixed;
      top: 0;
      inset-inline-end: 0;
      inset-inline-start: 0;
      z-index: 1001;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${n};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition:
        opacity ${e.motionDurationSlow},
        transform ${e.motionDurationSlow};

      ${i}-tabs {
        max-width: 1208px;
        margin: 0 auto;

        ${i}-tabs-nav {
          margin: 0;

          &::before {
            border-bottom-color: transparent;
          }

          ${i}-tabs-tab {
            padding: 21px 0;
          }
        }
      }
    `,affixTabsFixed:t`
      transform: translate3d(0, 0, 0);
      opacity: 1;
    `,span:t`
      text-transform: capitalize;
    `};});var m=()=>{let e=r.useRef(null),t=r.useRef([]),[n,i]=r.useState(!1),[o,d]=r.useState(void 0),{styles:{affixTabs:m,affixTabsFixed:f,span:h}}=g();function x(t){let n=document.getElementById(t);if(n){let t=n.offsetTop-e.current.offsetHeight-32;(0,p.default)(t);}}r.useEffect(()=>{let e=document.querySelectorAll("h2[id]");t.current=Array.from(e).map(({id:e})=>e),i(!0);},[]),r.useEffect(()=>{let e=decodeURIComponent((location.hash||"").slice(1));e&&x(e);},[n]);let b=r.useMemo(()=>(0,c.default)(function(){let{scrollY:n}=window,i=e.current.offsetHeight;for(let e=t.current.length-1;e>=0;e-=1){let o=t.current[e];if(document.getElementById(o).offsetTop-i-32<=n){d(o);return;}}d(void 0);}),[]);return r.useEffect(()=>(u.forEach(e=>window.addEventListener(e,b)),b(),()=>{u.forEach(e=>window.removeEventListener(e,b));}),[b]),(0,a.jsx)("div",{className:(0,s.default)(m,o&&f),ref:e,children:(0,a.jsx)(l.Tabs,{activeKey:o,centered:!0,size:"large",onChange:x,items:t.current.map(e=>({key:e,label:(0,a.jsx)("span",{className:h,children:e.replace(/-/g," ")})}))})});};},a2a5b19a:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return m;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("e22febe0"),r=n("a9d1a279"),l=n("3835a2b7"),d=i._(n("600aabe0")),s=i._(n("23546486")),c=i._(n("c5c83154"));let p="https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b",u=(0,l.createStyles)(({token:e,css:t})=>({card:t`
    width: 100%;
    margin: ${2*e.marginMD}px 0;
    transition: all ${e.motionDurationMid};
    background-color: ${e.colorFillQuaternary};
  `,bigTitle:t`
    color: #121212;
    font-size: ${e.fontSizeLG}px;
    margin-bottom: ${e.marginLG}px;
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
      margin-inline-end: ${e.marginLG}px;
      border-radius: ${e.borderRadiusLG}px;
    }
  `,title:t`
    color: #444;
    font-size: ${e.fontSizeLG}px;
    font-weight: ${e.fontWeightStrong};
    user-select: none;
  `,subTitle:t`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #646464;
    font-size: ${e.fontSize}px;
    font-weight: 400;
    margin-top: ${e.marginXS}px;
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
    margin: 0 ${e.marginXS}px;
    font-size: ${e.fontSizeSM}px;
  `,zlBtn:t`
    padding: 0;
    color: #646464;
  `,discussLogo:t`
    width: 16px;
    height: 16px;
    font-size: 16px;
  `})),g={cn:{bigTitle:"\u6587\u7AE0\u88AB\u4EE5\u4E0B\u4E13\u680F\u6536\u5F55\uFF1A",zhiHu:"\u4E00\u4E2A UI \u8BBE\u8BA1\u4F53\u7CFB",yuQue:"Ant Design \u5B98\u65B9\u4E13\u680F",junjin:"Ant Design \u5F00\u6E90\u4E13\u680F",buttonText:"\u6211\u6709\u60F3\u6CD5\uFF0C\u53BB\u53C2\u4E0E\u8BA8\u8BBA"},en:{bigTitle:"Articles are included in the column:",zhiHu:"A UI design system",yuQue:"Ant Design official column",junjin:"Ant Design Open Source Column",buttonText:"Go to discuss"}};var m=({zhihuLink:e,yuqueLink:t,juejinLink:n})=>{let[i]=(0,s.default)(g),{styles:{card:l,bigTitle:m,cardBody:f,leftCard:h,title:x,subTitle:b,logo:w,arrowIcon:v,zlBtn:$,discussLogo:y}}=u();return e||t||n?(0,o.jsxs)(r.Card,{className:l,variant:"borderless",children:[(0,o.jsx)("h3",{className:m,children:i.bigTitle}),e&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.Divider,{}),(0,o.jsxs)("div",{className:f,children:[(0,o.jsxs)("div",{className:h,children:[(0,o.jsx)("img",{draggable:!1,src:p,alt:"antd"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:x,children:"Ant Design"}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)(a.ZhihuOutlined,{className:(0,d.default)(w,"zhihu-logo")}),(0,o.jsx)(a.RightOutlined,{className:v}),(0,o.jsx)(r.Button,{target:"_blank",href:"https://www.zhihu.com/column/c_1564262000561106944",className:$,type:"link",children:i.zhiHu})]})]})]}),(0,o.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,o.jsx)(a.ZhihuOutlined,{className:y}),target:"_blank",href:e,children:i.buttonText})]})]}),t&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.Divider,{}),(0,o.jsxs)("div",{className:f,children:[(0,o.jsxs)("div",{className:h,children:[(0,o.jsx)("img",{draggable:!1,src:p,alt:"antd"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:x,children:"Ant Design"}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)(a.YuqueOutlined,{className:(0,d.default)(w,"yuque-logo")}),(0,o.jsx)(a.RightOutlined,{className:v}),(0,o.jsx)(r.Button,{target:"_blank",href:"https://www.yuque.com/ant-design/ant-design",className:$,type:"link",children:i.yuQue})]})]})]}),(0,o.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,o.jsx)(a.YuqueOutlined,{className:y}),target:"_blank",href:t,children:i.buttonText})]})]}),n&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.Divider,{}),(0,o.jsxs)("div",{className:f,children:[(0,o.jsxs)("div",{className:h,children:[(0,o.jsx)("img",{draggable:!1,src:p,alt:"antd"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:x,children:"Ant Design"}),(0,o.jsxs)("div",{className:b,children:[(0,o.jsx)(c.default,{className:(0,d.default)(w,"juejin-logo")}),(0,o.jsx)(a.RightOutlined,{className:v}),(0,o.jsx)(r.Button,{target:"_blank",href:"https://juejin.cn/column/7247354308258054200",className:$,type:"link",children:i.junjin})]})]})]}),(0,o.jsx)(r.Button,{ghost:!0,type:"primary",icon:(0,o.jsx)(c.default,{className:y}),target:"_blank",href:n,children:i.buttonText})]})]})]}):null;};},a3aa6524:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return h;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=i._(n("868f756d")),d=n("3835a2b7"),s=i._(n("600aabe0")),c=n("9c86e52a"),p=i._(n("714a8bde")),u=i._(n("1b87ba52"));let g=(0,d.createStyles)(({token:e,css:t})=>({listMobile:t`
    margin: 1em 0 !important;
  `,title:t`
    font-size: ${e.fontSizeSM}px;
    opacity: 0.5;
    margin-bottom: ${e.marginXS}px;
  `,list:t`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${e.motionDurationSlow};
      margin-inline-end: -${e.marginXS}px;
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `})),m=["github-actions","copilot","renovate","dependabot"],f=({filename:e})=>{let{formatMessage:t}=(0,c.useIntl)(),{styles:n}=g(),{isMobile:i}=r.default.use(p.default);return e?(0,a.jsxs)("div",{className:(0,s.default)({[n.listMobile]:i}),children:[(0,a.jsx)("div",{className:n.title,children:t({id:"app.content.contributors"})}),(0,a.jsx)(l.default,{cache:!0,repo:"ant-design",owner:"ant-design",fileName:e,className:n.list,filter:e=>{var t;return!m.includes((null==e?void 0:null===(t=e.username)||void 0===t?void 0:t.toLowerCase())??"");},renderItem:(e,t)=>(0,a.jsx)(u.default,{item:e,loading:t},null==e?void 0:e.url)})]}):null;};var h=e=>(0,a.jsx)(r.Suspense,{fallback:null,children:(0,a.jsx)(f,{...e})});},a56683cc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("6ee40046")),r=n("bea88868"),l=i._(n("530fedd5")),d=()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.Reset,{}),(0,o.jsx)(r.Common,{}),(0,o.jsx)(r.Markdown,{}),(0,o.jsx)(r.Highlight,{}),(0,o.jsx)(r.Demo,{}),(0,o.jsx)(r.Responsive,{}),(0,o.jsx)(r.NProgress,{}),(0,o.jsx)(r.PreviewImage,{}),(0,o.jsx)(l.default,{}),(0,o.jsx)(a.default,{}),(0,o.jsx)(r.HeadingAnchor,{}),(0,o.jsx)(r.SearchBar,{})]});},a7fa2147:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("9c86e52a"),l=()=>{let e=(0,r.useRouteMeta)(),[t,n]=a.default.useMemo(()=>{let t;if(e.frontmatter.subtitle||e.frontmatter.title){var n;t=`${e.frontmatter.subtitle||""} ${(null===(n=e.frontmatter)||void 0===n?void 0:n.title)||""} - Ant Design`;}else t="404 Not Found - Ant Design";return[t,e.frontmatter.description||""];},[e]);return(0,o.jsxs)(r.Helmet,{children:[(0,o.jsx)("title",{children:t}),(0,o.jsx)("meta",{property:"og:title",content:t}),n&&(0,o.jsx)("meta",{name:"description",content:n})]});};},ad4b2adc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return $;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=i._(n("600aabe0")),l=i._(n("072ab8a9"));n("2a5e301e");var d=o._(n("5b220c3d")),s=n("a9d1a279"),c=i._(n("e15e14cb")),p=n("9c86e52a"),u=i._(n("23546486")),g=i._(n("91a66390")),m=i._(n("a56683cc")),f=i._(n("eb388ffc")),h=i._(n("714a8bde")),x=i._(n("61595633")),b=i._(n("4b6975d6")),w=i._(n("a138adac"));let v={cn:{title:"Ant Design - \u4E00\u5957\u4F01\u4E1A\u7EA7 UI \u8BBE\u8BA1\u8BED\u8A00\u548C React \u7EC4\u4EF6\u5E93",description:"\u57FA\u4E8E Ant Design \u8BBE\u8BA1\u4F53\u7CFB\u7684 React UI \u7EC4\u4EF6\u5E93\uFF0C\u7528\u4E8E\u7814\u53D1\u4F01\u4E1A\u7EA7\u4E2D\u540E\u53F0\u4EA7\u54C1\u3002"},en:{title:"Ant Design - The world's second most popular React UI framework",description:"An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises"}};var $=()=>{let e=(0,p.useOutlet)(),{pathname:t,search:n,hash:i}=(0,g.default)(),[o,$]=(0,u.default)(v),y=(0,d.useRef)(null),{direction:j}=d.default.use(h.default),{loading:k}=(0,p.useSiteData)(),{token:S}=s.theme.useToken(),[_]=(0,p.useSearchParams)(),M="false"===_.get("layout");(0,d.useLayoutEffect)(()=>{"cn"===$?l.default.locale("zh-cn"):l.default.locale("en");},[$]),(0,d.useEffect)(()=>{let e=document.getElementById("nprogress-style");return y.current=setTimeout(()=>{null==e||e.remove();},0),()=>clearTimeout(y.current);},[]),(0,d.useEffect)(()=>{let e=i.replace("#","");if(e){var t;null===(t=document.getElementById(decodeURIComponent(e)))||void 0===t||t.scrollIntoView();}},[k,i]),(0,d.useEffect)(()=>{void 0!==window.ga&&window.ga("send","pageview",t+n);},[t,n]);let z=d.default.useMemo(()=>["","/"].includes(t)||["/index"].some(e=>t.startsWith(e))?(0,a.jsx)(x.default,{title:o.title,desc:o.description,children:e}):t.startsWith("/docs/resource")?(0,a.jsx)(b.default,{children:e}):t.startsWith("/theme-editor")?e:(0,a.jsx)(w.default,{children:e}),[t,e,o.title,o.description]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(p.Helmet,{encodeSpecialCharacters:!1,children:[(0,a.jsx)("html",{lang:"cn"===$?"zh-CN":$,"data-direction":j,className:(0,r.default)({rtl:"rtl"===j})}),(0,a.jsx)("link",{sizes:"144x144",href:"https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"}),(0,a.jsx)("meta",{property:"og:description",content:o.description}),(0,a.jsx)("meta",{property:"og:type",content:"website"}),(0,a.jsx)("meta",{property:"og:image",content:"https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"})]}),(0,a.jsxs)(s.ConfigProvider,{direction:j,locale:"cn"===$?c.default:void 0,theme:{token:{fontFamily:`AlibabaSans, ${S.fontFamily}`}},children:[(0,a.jsx)(m.default,{}),!M&&(0,a.jsx)(f.default,{}),z]})]});};},b06e8b1e:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=n("f19d2b93"),o=n("47413d36"),a=n("1fe0ede3"),r=n("3835a2b7"),l=()=>{let e=(0,r.useTheme)(),{antCls:t}=e,n=e.colorPrimary;return(0,i.jsx)(a.Global,{styles:(0,a.css)`
        .markdown {
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          line-height: 2;
        }

        .highlight {
          line-height: 1.5;
        }

        .markdown img {
          max-width: calc(100% - 32px);
          max-height: 100%;
        }

        .markdown > a > img,
        .markdown > img {
          display: block;
          margin: 0 auto;
        }

        .markdown p > img,
        .markdown li > img {
          margin: 34px auto;
          box-shadow: 0 8px 20px rgba(143, 168, 191, 0.35);
          display: block;
        }

        .markdown p > img.markdown-inline-image {
          margin: 0;
          box-shadow: none;
        }

        .markdown h1 {
          margin-top: ${e.marginXS}px;
          margin-bottom: ${e.marginMD}px;
          color: ${e.colorTextHeading};
          font-weight: 500;
          font-size: 30px;
          font-family: Avenir, ${e.fontFamily}, sans-serif;
          line-height: 38px;

          .subtitle {
            margin-inline-start: ${e.marginSM}px;
          }
        }

        .markdown h2 {
          font-size: 24px;
          line-height: 32px;
        }

        .markdown h2,
        .markdown h3,
        .markdown h4,
        .markdown h5,
        .markdown h6 {
          clear: both;
          margin: 1.6em 0 0.6em;
          color: ${e.colorTextHeading};
          font-weight: 500;
          font-family: Avenir, ${e.fontFamily}, sans-serif;
        }

        .markdown h3 {
          font-size: 18px;
        }

        .markdown h4 {
          font-size: ${e.fontSizeLG}px;
        }

        .markdown h5 {
          font-size: ${e.fontSize}px;
        }

        .markdown h6 {
          font-size: ${e.fontSizeSM}px;
        }

        .markdown hr {
          clear: both;
          height: 1px;
          margin: ${e.marginLG}px 0;
          background: ${e.colorSplit};
          border: 0;
        }

        .markdown p,
        .markdown pre {
          margin: 1em 0;

          ${t}-row-rtl & {
            direction: rtl;
            text-align: right;
          }
        }

        .markdown ul > li,
        .markdown ol > li {
          padding-inline-start: ${e.paddingXXS}px;
          margin-inline-start: ${e.marginMD}px;
          > p {
            margin: 0.2em 0;
          }
          &:empty {
            display: none;
          }
        }

        .markdown ul > li {
          list-style-type: circle;
        }

        .markdown ol > li {
          list-style-type: decimal;
        }

        .markdown code {
          margin: 0 1px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          background: ${e.siteMarkdownCodeBg};
          border: 1px solid ${e.colorSplit};
          border-radius: ${e.borderRadiusSM}px;
        }

        .markdown pre {
          font-family: ${e.codeFamily};
          background: ${e.siteMarkdownCodeBg};
          border-radius: ${e.borderRadius}px;
        }

        .markdown pre code {
          margin: 0;
          padding: 0;
          overflow: auto;
          color: ${e.colorText};
          font-size: ${Math.max(e.fontSize-1,12)}px;
          direction: ltr;
          text-align: left;
          background-color: ${e.colorBgLayout};
          border: none;
        }

        .markdown strong,
        .markdown b {
          font-weight: 500;
        }

        .markdown .dumi-default-source-code {
          margin: 1em 0;
          background-color: ${e.siteMarkdownCodeBg};
          border-radius: ${e.borderRadius}px;
          > pre.prism-code {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
            padding: ${e.paddingSM}px ${e.paddingMD}px;
            font-size: ${e.fontSize}px;
            line-height: 2;
          }
        }

        [data-prefers-color='dark'] {
          .markdown .dumi-default-source-code {
            background-color: ${e.siteMarkdownCodeBgDark};
          }
        }

        .pic-plus {
          & > * {
            display: inline-block !important;
            vertical-align: middle;
          }
          span {
            margin: 0 ${e.marginMD}px;
            color: #aaa;
            font-size: 30px;
            user-select: none;
          }
        }

        .markdown table td > a:not(:last-child) {
          margin-inline-end: 0 !important;

          &::after {
            position: relative !important;
          }
        }

        .markdown blockquote {
          margin: 1em 0;
          padding-inline-start: 0.8em;
          color: ${e.colorTextSecondary};
          font-size: 90%;
          border-inline-start: 4px solid ${e.colorSplit};

          .rtl & {
            padding-inline-end: 0.8em;
            padding-inline-start: 0;
            border-inline-end: 4px solid ${e.colorSplit};
            border-inline-start: none;
          }
        }

        .markdown blockquote p {
          margin: 0;
        }

        .markdown .anchor {
          margin-inline-start: ${e.marginXS}px;
          opacity: 0;
          transition: opacity ${e.motionDurationSlow};

          .rtl & {
            margin-inline-end: ${e.marginXS}px;
            margin-inline-start: 0;
          }
        }

        .markdown .waiting {
          color: #ccc;
          cursor: not-allowed;
        }

        .markdown a.edit-button {
          display: inline-block;
          margin-inline-start: ${e.marginXS}px;
          text-decoration: none;

          .rtl & {
            margin-inline-end: ${e.marginXS}px;
            margin-inline-start: 0;
            transform: rotateY(180deg);
          }

          ${t}icon {
            display: block;
            color: ${e.colorTextSecondary};
            font-size: ${e.fontSizeLG}px;
            transition: all ${e.motionDurationSlow};

            &:hover {
              color: ${e.colorText};
            }
          }
        }

        .markdown h1:hover .anchor,
        .markdown h2:hover .anchor,
        .markdown h3:hover .anchor,
        .markdown h4:hover .anchor,
        .markdown h5:hover .anchor,
        .markdown h6:hover .anchor {
          display: inline-block;
          opacity: 1;
        }

        .markdown > br,
        .markdown > p > br {
          clear: both;
        }

        .markdown .dumi-default-table {
          &-content {
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
          table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            direction: ltr;
            empty-cells: show;
            border: 1px solid ${e.colorSplit};
            border-collapse: collapse;
            border-spacing: 0;

            th,
            td {
              padding: ${e.paddingSM}px ${e.paddingLG}px;
              text-align: left;
              border: 1px solid ${e.colorSplit};

              &:first-child {
                border-inline-start: 1px solid ${e.colorSplit};
              }

              &:last-child {
                border-inline-end: 1px solid ${e.colorSplit};
              }

              img {
                max-width: unset;
              }
            }

            th {
              color: #5c6b77;
              font-weight: 500;
              white-space: nowrap;
              background: rgba(0, 0, 0, 0.02);
              border-width: 1px 1px 2px;
            }

            tbody tr {
              transition: all ${e.motionDurationSlow};

              &:hover {
                background: rgba(60, 90, 100, 0.04);
              }
            }
          }

          table.component-api-table {
            margin: 0;
            overflow-x: auto;
            overflow-y: hidden;
            font-size: ${Math.max(e.fontSize-1,12)}px;
            font-family: ${e.codeFamily};
            line-height: ${e.lineHeight};
            border: 1px solid ${e.colorSplit};
            border-width: 0 1px;

            th {
              border-width: 1px 0 2px;
            }

            td {
              border-width: 1px 0;
              &:first-child {
                width: 18%;
                min-width: 58px;
                color: ${e.colorText};
                font-weight: ${e.fontWeightStrong};
                white-space: nowrap;
              }

              &:nth-child(2) {
                min-width: 160px;
              }

              &:nth-child(3) {
                width: 22%;
                color: ${e.magenta7};
                font-size: ${Math.max(e.fontSize-1,12)}px;
              }

              &:nth-child(4) {
                width: 15%;
                font-size: ${Math.max(e.fontSize-1,12)}px;
              }

              &:nth-child(5) {
                width: 8%;
                font-size: ${Math.max(e.fontSize-1,12)}px;
              }

              &:nth-last-child(3):first-child {
                width: 38%;
              }

              &:nth-last-child(3):first-child ~ td:nth-last-child(2) {
                width: 70%;
              }
            }
          }

          /*
              Api 表中某些属性用 del 标记，表示已废弃（但仍期望给开发者一个过渡期)用 css 标记出来。仅此而已。
              有更多看法？移步讨论区: https://github.com/ant-design/ant-design/discussions/51298
            */
          tr:has(td:first-child > del) {
            color: ${e.colorWarning} !important;
            background-color: ${e.colorWarningBg} !important;
            display: var(--antd-site-api-deprecated-display, none);

            del {
              color: ${e.colorWarning};
            }

            &:hover del {
              text-decoration: none;
            }
          }
        }

        .grid-demo,
        [id^='grid-demo-'] {
          ${t}-row > div,
            .code-box-demo ${t}-row > div {
            min-height: 30px;
            margin-top: ${e.marginXS}px;
            margin-bottom: ${e.marginXS}px;
            color: #fff;
            text-align: center;
            border-radius: 0;
          }

          .code-box-demo ${t}-row > div:not(.gutter-row) {
            padding: ${e.padding}px 0;
            background: ${n};

            &:nth-child(2n + 1) {
              background: ${new o.FastColor(n).setA(.75).toHexString()};
            }
          }

          ${t}-row .demo-col,
            .code-box-demo ${t}-row .demo-col {
            margin-top: 0;
            margin-bottom: 0;
            padding: 30px 0;
            color: ${e.colorWhite};
            font-size: 18px;
            text-align: center;
            border: none;
          }

          ${t}-row .demo-col-1 {
            background: ${new o.FastColor(n).setA(.75).toHexString()};
          }

          ${t}-row .demo-col-2,
            .code-box-demo ${t}-row .demo-col-2 {
            background: ${new o.FastColor(n).setA(.75).toHexString()};
          }

          ${t}-row .demo-col-3,
            .code-box-demo ${t}-row .demo-col-3 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          ${t}-row .demo-col-4,
            .code-box-demo ${t}-row .demo-col-4 {
            background: ${new o.FastColor(n).setA(.6).toHexString()};
          }

          ${t}-row .demo-col-5,
            .code-box-demo ${t}-row .demo-col-5 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          .code-box-demo .height-100 {
            height: 100px;
            line-height: 100px;
          }

          .code-box-demo .height-50 {
            height: 50px;
            line-height: 50px;
          }

          .code-box-demo .height-120 {
            height: 120px;
            line-height: 120px;
          }

          .code-box-demo .height-80 {
            height: 80px;
            line-height: 80px;
          }
        }

        [id='grid-demo-playground'],
        [id='grid-demo-gutter'] {
          > .code-box-demo ${t}-row > div {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `});};},b315eb4f:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)(),{antCls:t,iconCls:n}=e;return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        .code-boxes-col-1-1 {
          width: 100%;
        }

        .code-boxes-col-2-1 {
          display: inline-block;
          vertical-align: top;
        }

        .code-box {
          position: relative;
          display: inline-block;
          width: calc(100% - ${2*e.lineWidth}px);
          margin: 0 0 ${e.margin}px;
          background-color: ${e.colorBgContainer};
          border: 1px solid ${e.colorSplit};
          border-radius: ${e.borderRadiusLG}px;
          transition: all ${e.motionDurationMid};

          &.code-box-simplify {
            border-radius: 0;
            margin-bottom: 0;

            .code-box-demo {
              padding: 0;
              border-bottom: 0;
            }
          }

          .code-box-title {
            &,
            a {
              color: ${e.colorText} !important;
              background: ${e.colorBgContainer};
            }
          }

          .code-box-demo {
            background-color: ${e.colorBgContainer};
            border-radius: ${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0;
            > .demo {
              overflow: auto;
            }
          }

          .markdown {
            pre {
              margin: 0.5em 0;
              padding: 6px 12px;
            }

            pre code {
              margin: 0;
              background: #f5f5f5;
            }
          }

          &:target {
            border: 1px solid ${e.colorPrimary};
          }

          &-title {
            position: absolute;
            top: -14px;
            padding: 1px 8px;
            color: #777;
            background: ${e.colorBgContainer};
            border-radius: ${e.borderRadius}px ${e.borderRadius}px 0 0;
            transition: background-color 0.4s;
            margin-inline-start: ${e.margin}px;

            a,
            a:hover {
              color: ${e.colorText};
              font-weight: 500;
              font-size: ${e.fontSize}px;
            }
          }

          &-description {
            padding: 18px 24px 12px;
          }

          a.edit-button {
            position: absolute;
            top: 7px;
            inset-inline-end: -16px;
            font-size: ${e.fontSizeSM}px;
            text-decoration: none;
            background: inherit;
            transform: scale(0.9);
            padding-inline-end: ${e.paddingXXS}px;

            ${n} {
              color: ${e.colorTextSecondary};
              transition: all ${e.motionDurationSlow};

              &:hover {
                color: ${e.colorText};
              }
            }

            ${t}-row${t}-row-rtl & {
              inset-inline-end: auto;
              inset-inline-start: -22px;
            }
          }

          &-demo {
            padding: 42px 24px 50px;
            color: ${e.colorText};
            border-bottom: 1px solid ${e.colorSplit};
          }

          iframe {
            width: 100%;
            border: 0;
          }

          &-meta {
            &.markdown {
              position: relative;
              width: 100%;
              font-size: ${e.fontSize}px;
              border-radius: 0 0 ${e.borderRadius}px ${e.borderRadius}px;
              transition: background-color 0.4s;
            }

            blockquote {
              line-height: 1.5;
            }

            h4,
            section& p {
              margin: 0;
            }

            > p {
              width: 100%;
              margin: 0.5em 0;
              font-size: ${e.fontSizeSM}px;
              word-break: break-word;
              padding-inline-end: 25px;
            }
          }

          &.expand &-meta {
            border-bottom: 1px dashed ${e.colorSplit};
            border-radius: 0;
          }

          .code-expand-icon {
            position: relative;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }

          .highlight-wrapper {
            display: none;
            border-radius: 0 0 ${e.borderRadius}px ${e.borderRadius}px;

            &-expand {
              display: block;
            }
          }

          .highlight {
            position: relative;

            pre {
              margin: 0;
              padding: 0;
              background: ${e.colorBgContainer};
            }

            &:not(:first-child) {
              border-top: 1px dashed ${e.colorSplit};
            }
          }

          &-actions {
            display: flex;
            justify-content: center;
            padding: ${e.paddingSM}px 0;
            border-top: 1px dashed ${e.colorSplit};
            opacity: 0.7;
            transition: opacity ${e.motionDurationSlow};

            &:hover {
              opacity: 1;
            }
          }

          &-actions &-code-action {
            position: relative;
            display: flex;
            align-items: center;
            width: 16px;
            height: 16px;
            color: ${e.colorTextSecondary};
            cursor: pointer;
            transition: all 0.24s;

            &:hover {
              color: ${e.colorText};
            }

            ${n} {
              display: block;
            }
          }

          &-code-copy {
            width: 14px;
            height: 14px;
            font-size: ${e.fontSize}px;
            text-align: center;
            background: ${e.colorBgContainer};
            cursor: pointer;
            transition: transform 0.24s;

            &${n}-check {
              color: ${e.green6} !important;
              font-weight: bold;
            }
          }

          &-codepen {
            width: 14px;
            height: 14px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
          }

           &-codeblock {
            width: 16px;
            height: 16px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
            max-width: 100% !important;
          }

          &-codesandbox {
            width: 16px;
            height: 16px;
            overflow: hidden;
            border: 0;
            cursor: pointer;

            &:hover {
              opacity: 1;
            }
          }

          .highlight-wrapper:hover &-code-copy,
          .highlight-wrapper:hover &-codepen,
          .highlight-wrapper:hover &-codesandbox,
          .highlight-wrapper:hover &-riddle {
            opacity: 1;
          }

          pre {
            width: auto;
            margin: 0;

            code {
              background: ${e.colorBgContainer};
              border: none;
              box-shadow: unset;
              padding: ${e.paddingSM}px ${e.padding}px;
              font-size: ${e.fontSize}px;
            }
          }

          &-debug {
            border-color: ${e.purple3};
          }

          &-debug &-title a {
            color: ${e.purple6};
          }
        }

        .demo-wrapper {
          position: relative;
        }

        .all-code-box-controls {
          position: absolute;
          top: -32px;
          inset-inline-end: 0;
          display: flex;
          align-items: center;
          column-gap: ${e.marginXS}px;
        }

        ${t}-btn {
          &.icon-enabled {
            background-color: ${e.colorFillSecondary};
            opacity: 1;
            ${n} {
              color: ${e.colorTextBase};
              font-weight: bold;
            }
          }
        }

        ${t}-row-rtl {
          #tooltip-demo-placement,
          #popover-demo-placement,
          #popconfirm-demo-placement {
            .code-box-demo {
              direction: ltr;
            }
          }
        }
      `});};},ba722e26:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return f;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=n("e22febe0"),l=n("a9d1a279"),d=n("3835a2b7"),s=n("9c86e52a"),c=i._(n("23546486")),p=i._(n("0a03b273")),u=o._(n("e67f7d0e"));let g={cn:{design:"\u8BBE\u8BA1",development:"\u7814\u53D1",components:"\u7EC4\u4EF6",resources:"\u8D44\u6E90",blog:"\u535A\u5BA2"},en:{design:"Design",development:"Development",components:"Components",resources:"Resources",blog:"Blog"}},m=(0,d.createStyles)(({token:e})=>{let{antCls:t,iconCls:n,fontFamily:i,fontSize:o,headerHeight:a,colorPrimary:r}=e;return{nav:(0,d.css)`
      height: 100%;
      font-size: ${o}px;
      font-family: Avenir, ${i}, sans-serif;
      border: 0 !important;

      &${t}-menu-horizontal {
        border-bottom: none;

        & > ${t}-menu-item, & > ${t}-menu-submenu {
          min-width: ${64}px;
          height: ${a}px;
          padding-inline-end: ${e.paddingSM}px;
          padding-inline-start: ${e.paddingSM}px;
          line-height: ${a}px;
        }

        & ${t}-menu-submenu-title ${n} {
          margin: 0;
        }

        & > ${t}-menu-item-selected {
          a {
            color: ${r};
          }
        }
      }

      & > ${t}-menu-item, & > ${t}-menu-submenu {
        text-align: center;
      }
    `};});var f=e=>{var t,n;let{isZhCN:i,isMobile:o,responsive:d,directionText:f,onLangChange:h,onDirectionChange:x}=e,{pathname:b,search:w}=(0,s.useLocation)(),[v]=(0,c.default)(g),$=(null===(n=(0,s.useFullSidebarData)()["/docs/blog"])||void 0===n?void 0:null===(t=n[0])||void 0===t?void 0:t.children)||[],{styles:y}=m(),j=b.split("/").filter(Boolean).slice(0,-1).join("/")||"home";b.startsWith("/changelog")?j="docs/react":b.startsWith("/docs/resources")&&(j="docs/resources");let k=[],S=[{label:(0,a.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer",children:"GitHub"}),key:"github"},{label:(0,a.jsx)(s.FormattedMessage,{id:"app.header.lang"}),onClick:h,key:"switch-lang"},{label:f,onClick:x,key:"switch-direction"}];o?k=S:"crowded"===d&&(k=[{label:(0,a.jsx)(r.MenuOutlined,{}),key:"additional",children:[...S]}]);let _=[{label:(0,a.jsx)(p.default,{to:u.getLocalizedPathname("/docs/spec/introduce",i,w),children:v.design}),key:"docs/spec"},{label:(0,a.jsx)(p.default,{to:u.getLocalizedPathname("/docs/react/introduce",i,w),children:v.development}),key:"docs/react"},{label:(0,a.jsx)(p.default,{to:u.getLocalizedPathname("/components/overview/",i,w),children:v.components}),key:"components"},$.length?{label:(0,a.jsx)(p.default,{to:u.getLocalizedPathname($.sort((e,t)=>{var n,i;return(null===(n=e.frontmatter)||void 0===n?void 0:n.date)>(null===(i=t.frontmatter)||void 0===i?void 0:i.date)?-1:1;})[0].link,i,w),children:v.blog}),key:"docs/blog"}:null,{label:(0,a.jsx)(p.default,{to:u.getLocalizedPathname("/docs/resources",i,w),children:v.resources}),key:"docs/resources"},i?{key:"mirror",label:(0,a.jsx)("a",{href:"https://ant-design.antgroup.com",target:"_blank",rel:"noreferrer",children:"\u56FD\u5185\u955C\u50CF"})}:null,...k??[]].filter(Boolean);return(0,a.jsx)(l.Menu,{mode:o?"inline":"horizontal",selectedKeys:[j],className:y.nav,disabledOverflow:!0,items:_});};},bdcf9616:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        /**
* prism.js default theme for JavaScript, CSS and HTML
* Based on dabblet (http://dabblet.com)
* @author Lea Verou
*/

        pre code {
          display: block;
          padding: ${e.padding}px ${e.paddingXL}px;
          color: ${e.colorText};
          font-size: ${e.fontSize}px;
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          line-height: 2;
          white-space: pre;
          background: white;
          border: 1px solid #e9e9e9;
          border-radius: ${e.borderRadius}px;
        }

        code[class*='language-'],
        pre[class*='language-'] {
          color: ${e.colorText};
          font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          line-height: ${e.lineHeightLG};
          direction: ltr;
          white-space: pre;
          text-align: left;
          word-wrap: normal;
          word-break: normal;
          word-spacing: normal;
          tab-size: 4;
          hyphens: none;
          background: none;
        }

        code[class*='css'] {
          direction: ltr;
        }

        pre[class*='language-'] ::selection,
        code[class*='language-'] ::selection {
          text-shadow: none;
          background: #b3d4fc;
        }

        @media print {
          code[class*='language-'],
          pre[class*='language-'] {
            text-shadow: none;
          }
        }

        /* Code blocks */
        pre[class*='language-'] {
          margin: ${e.margin}px 0;
          padding: ${e.paddingSM}px ${e.paddingMD}px;
          overflow: auto;
        }

        :not(pre) > code[class*='language-'],
        pre[class*='language-'] {
          background: ${e.colorBgLayout};
        }

        /* Inline code */
        :not(pre) > code[class*='language-'] {
          padding: 0.1em;
          white-space: normal;
          border-radius: 0.3em;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: slategray;
        }

        .token.punctuation {
          color: #999;
        }

        .namespace {
          opacity: 0.7;
        }

        .markdown {
          .token.property,
          .token.tag,
          .token.boolean,
          .token.number,
          .token.constant,
          .token.symbol,
          .token.deleted {
            color: #f81d22;
          }

          .token.selector,
          .token.attr-name,
          .token.string,
          .token.char,
          .token.builtin,
          .token.inserted {
            color: #0b8235;
          }

          .token.operator,
          .token.entity,
          .token.url,
          .language-css .token.string,
          .style .token.string {
            color: #0b8235;
          }

          .token.atrule,
          .token.attr-value,
          .token.keyword {
            color: #008dff;
          }

          .token.function {
            color: #f81d22;
          }

          .token.regex,
          .token.important,
          .token.variable {
            color: #e90;
          }

          .token.important,
          .token.bold {
            font-weight: bold;
          }

          .token.italic {
            font-style: italic;
          }

          .token.entity {
            cursor: help;
          }
        }
      `});};},bea88868:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{Common:function(){return o.default;},Demo:function(){return a.default;},HeadingAnchor:function(){return r.default;},Highlight:function(){return l.default;},Markdown:function(){return d.default;},NProgress:function(){return s.default;},PreviewImage:function(){return c.default;},Reset:function(){return p.default;},Responsive:function(){return u.default;},SearchBar:function(){return g.default;}});var i=n("777fffbe"),o=i._(n("e7fbb058")),a=i._(n("b315eb4f")),r=i._(n("734ac3ec")),l=i._(n("bdcf9616")),d=i._(n("b06e8b1e")),s=i._(n("d7966917")),c=i._(n("0d35acd6")),p=i._(n("1f46114b")),u=i._(n("eec6195f")),g=i._(n("d243811f"));},c5c83154:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return o;}});var i=n("f19d2b93"),o=e=>(0,i.jsxs)("svg",{width:"36",height:"28",viewBox:"0 0 36 28",fill:"currentColor",...e,children:[(0,i.jsx)("title",{children:"Juejin logo"}),(0,i.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z",fill:"currentColor"})]});},d0dc4122:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return j;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("a9d1a279"),d=i._(n("600aabe0")),s=n("9c86e52a"),c=i._(n("098b7512")),p=i._(n("91a66390")),u=i._(n("7e70d2c5")),g=i._(n("b550a850")),m=i._(n("494cb795")),f=i._(n("ba953c8b")),h=i._(n("25c612ac")),x=i._(n("714a8bde")),b=i._(n("a2a5b19a")),w=i._(n("a3aa6524")),v=o._(n("75801792")),$=i._(n("e814ec24"));let y=({num:e=6})=>Array.from({length:e}).map((e,t)=>(0,a.jsx)(l.Skeleton.Avatar,{size:"small",active:!0,style:{marginInlineStart:0===t?0:-8}},t));var j=({children:e})=>{var t,n,i;let o=(0,s.useRouteMeta)(),{pathname:j,hash:k}=(0,p.default)(),{direction:S}=r.default.use(x.default),{styles:_}=(0,v.useStyle)(),[M,z]=(0,c.default)(!1),[A,C]=(0,r.useState)("tsx"),L=(0,r.useMemo)(()=>{var e;return(null===(e=o.toc)||void 0===e?void 0:e.filter(e=>e._debug_demo).map(e=>e.id))||[];},[o]),T=L.includes(k.slice(1));(0,r.useLayoutEffect)(()=>{z(T);},[T]);let N=(0,r.useMemo)(()=>({showDebug:M,setShowDebug:z,codeType:A,setCodeType:C}),[M,A]),E="rtl"===S;return(0,a.jsx)(f.default,{value:N,children:(0,a.jsxs)(l.Col,{xxl:20,xl:19,lg:18,md:18,sm:24,xs:24,children:[(0,a.jsx)(v.default,{showDebug:M,debugDemos:L}),(0,a.jsxs)("article",{className:(0,d.default)(_.articleWrapper,{rtl:E}),children:[(null===(t=o.frontmatter)||void 0===t?void 0:t.title)?(0,a.jsx)(l.Flex,{justify:"space-between",children:(0,a.jsx)(l.Typography.Title,{style:{fontSize:32,position:"relative"},children:(0,a.jsxs)(l.Space,{children:[(0,a.jsx)("span",{children:null===(n=o.frontmatter)||void 0===n?void 0:n.title}),(0,a.jsx)("span",{children:null===(i=o.frontmatter)||void 0===i?void 0:i.subtitle}),!j.startsWith("/components/overview")&&(0,a.jsx)(g.default,{title:(0,a.jsx)(s.FormattedMessage,{id:"app.content.edit-page"}),filename:o.frontmatter.filename})]})})}):null,(0,a.jsx)($.default,{}),!o.frontmatter.__autoDescription&&o.frontmatter.description,"Components"===o.frontmatter.category&&"false"!==String(o.frontmatter.showImport)&&(0,a.jsx)(u.default,{source:!0,component:o.frontmatter.title,filename:o.frontmatter.filename,version:o.frontmatter.tag,designUrl:o.frontmatter.designUrl,searchTitleKeywords:[o.frontmatter.title,o.frontmatter.subtitle].filter(Boolean),repo:"ant-design/ant-design"}),(0,a.jsxs)("div",{style:{minHeight:"calc(100vh - 64px)"},children:[e,(0,a.jsx)(l.FloatButton.BackTop,{})]}),(0,a.jsx)(b.default,{zhihuLink:o.frontmatter.zhihu_url,yuqueLink:o.frontmatter.yuque_url,juejinLink:o.frontmatter.juejin_url}),(0,a.jsx)("div",{style:{marginTop:120},children:(0,a.jsx)(r.Suspense,{fallback:(0,a.jsx)(y,{}),children:(0,a.jsx)(w.default,{filename:o.frontmatter.filename})})})]}),(0,a.jsx)(m.default,{rtl:E}),(0,a.jsx)(h.default,{})]})});};},d243811f:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return l;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7");let r="dumi-default-";var l=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        html {
          .${r}search-bar {
            &-input {
              color: ${e.colorText};
              background: ${e.colorBgContainer};
              &:focus {
                background: ${e.colorBgContainer};
              }
              &::placeholder {
                color: ${e.colorTextPlaceholder} !important;
              }
            }
          }
          .${r}search-popover {
            background-color: ${e.colorBgElevated} !important;
            &::before {
              border-bottom-color: ${e.colorBgElevated} !important;
            }
          }
          .${r}search-result {
            dl {
              dt {
                background-color: ${e.controlItemBgActive} !important;
              }
              dd {
                a {
                  &:hover {
                    background-color: ${e.controlItemBgHover};
                    h4,
                    p {
                      color: ${e.colorText} !important;
                    }
                    svg {
                      fill: ${e.colorText} !important;
                    }
                  }
                }
              }
            }
          }
        }
      `});};},d7966917:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        #nprogress {
          .bar {
            background: ${e.colorPrimary};
          }

          .peg {
            box-shadow:
              0 0 10px ${e.colorPrimary},
              0 0 5px ${e.colorPrimary};
          }

          .spinner-icon {
            border-top-color: ${e.colorPrimary};
            border-inline-start-color: ${e.colorPrimary};
          }
        }
      `});};},e7fbb058:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return s;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=n("1fe0ede3"),l=n("3835a2b7"),d=n("d45d433f"),s=()=>{let{anchorTop:e}=(0,l.useTheme)();return a.default.useInsertionEffect(()=>{(0,d.updateCSS)("@layer global, antd;","site-global",{prepend:!0});},[]),(0,o.jsx)(r.Global,{styles:(0,r.css)`
        @layer global {
          body,
          div,
          dl,
          dt,
          dd,
          ul,
          ol,
          li,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          pre,
          code,
          form,
          fieldset,
          legend,
          input,
          textarea,
          p,
          blockquote,
          th,
          td,
          hr,
          button,
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            margin: 0;
            padding: 0;
          }

          ul,
          ol {
            list-style: none;
          }

          img {
            vertical-align: middle;
            border-style: none;
          }

          [id] {
            scroll-margin-top: ${e}px;
          }

          [data-prefers-color='dark'] {
            color-scheme: dark;
          }

          [data-prefers-color='light'] {
            color-scheme: light;
          }
        }
      `});};},e814ec24:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=n("777fffbe"),o=n("f19d2b93"),a=n("5b220c3d"),r=n("e22febe0"),l=n("a9d1a279"),d=i._(n("072ab8a9")),s=n("9c86e52a");let c=({name:e,avatar:t})=>{let[n,i]=(0,a.useState)(!0),[r,d]=(0,a.useState)(!1);return((0,a.useLayoutEffect)(()=>{let e=new Image;e.src=t,e.onload=()=>i(!1),e.onerror=()=>d(!0);},[t]),r)?null:n?(0,o.jsx)(l.Skeleton.Avatar,{size:"small",active:!0}):(0,o.jsx)(l.Avatar,{size:"small",src:t,alt:e,children:e});};var p=()=>{let e=(0,s.useRouteMeta)(),{author:t}=e.frontmatter,n=(0,a.useMemo)(()=>t?"string"==typeof t?t.split(",").map(e=>({name:e,avatar:`https://github.com/${e}.png`})):Array.isArray(t)?t:[]:[],[t]);return e.frontmatter.date||e.frontmatter.author?(0,o.jsx)(l.Typography.Paragraph,{children:(0,o.jsxs)(l.Flex,{gap:"small",children:[e.frontmatter.date&&(0,o.jsxs)("span",{style:{opacity:.65},children:[(0,o.jsx)(r.CalendarOutlined,{})," ",(0,d.default)(e.frontmatter.date).format("YYYY-MM-DD")]}),n.map(e=>(0,o.jsx)("a",{href:`https://github.com/${e.name}`,target:"_blank",rel:"noopener noreferrer",children:(0,o.jsxs)(l.Flex,{gap:4,children:[(0,o.jsx)(c,{name:e.name,avatar:e.avatar}),(0,o.jsxs)("span",{style:{opacity:.65},children:["@",e.name]})]})},e.name))]})}):null;};},eb388ffc:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ANT_LOCAL_TYPE_KEY:function(){return S;},default:function(){return M;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("e22febe0"),d=n("a9d1a279"),s=n("3835a2b7"),c=i._(n("600aabe0")),p=i._(n("072ab8a9")),u=n("9c86e52a"),g=i._(n("1c94f9dc")),m=i._(n("23546486")),f=i._(n("ab6def4f")),h=n("b055b5cb"),x=i._(n("7a33de8c")),b=i._(n("efe86da3")),w=n("f0cc8246"),v=o._(n("e67f7d0e")),$=i._(n("714a8bde")),y=i._(n("a2249523")),j=i._(n("ba722e26")),k=i._(n("43a20bcd"));let S="ANT_LOCAL_TYPE_KEY",_=(0,s.createStyles)(({token:e,css:t})=>{let n="#ced4d9";return{header:t`
      position: sticky;
      top: 0;
      z-index: 1000;
      max-width: 100%;
      background: ${e.colorBgContainer};
      box-shadow: ${e.boxShadowTertiary};
      backdrop-filter: blur(8px);

      @media only screen and (max-width: ${e.mobileMaxWidth}px) {
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
          fill: ${n};
        }

        > input {
          height: 22px;
          border: 0;
          max-width: calc(100vw - 768px);

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${n};
          }
        }

        .dumi-default-search-shortcut {
          color: ${n};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: ${e.borderRadiusSM}px;
          position: static;
          top: unset;
          transform: unset;
        }

        .dumi-default-search-popover {
          inset-inline-start: ${e.paddingSM}px;
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
    `,menuRow:t`
      display: flex;
      align-items: center;
      margin: 0;
      column-gap: ${e.paddingSM}px;
      padding-inline-end: ${e.padding}px;

      > * {
        flex: none;
        margin: 0;
      }

      .ant-btn {
        font-family: sans-serif;
      }
    `,dataDirectionIcon:t`
      width: 20px;
    `,popoverMenu:{width:300,[`${e.antCls}-popover-inner-content`]:{padding:0}},banner:t`
      width: 100%;
      text-align: center;
      word-break: keep-all;
      user-select: none;
    `,link:t`
      margin-inline-start: 10px;
      @media only screen and (max-width: ${e.mobileMaxWidth}px) {
        margin-inline-start: 0;
      }
    `,versionSelect:t`
      min-width: 90px;
      .rc-virtual-list {
        .rc-virtual-list-holder {
          scrollbar-width: thin;
          scrollbar-gutter: stable;
        }
      }
    `};});var M=()=>{let[,e]=(0,m.default)(),{pkg:t}=(0,u.useSiteData)(),n=(0,v.getThemeConfig)(),[i,o]=(0,r.useState)({menuVisible:!1,windowWidth:1400,searching:!1}),{direction:s,isMobile:M,bannerVisible:z,updateSiteConfig:A}=r.default.use($.default),C=(0,r.useRef)(null),L=(0,u.useLocation)(),{pathname:T,search:N}=L,{styles:E}=_(),[,D]=(0,f.default)(w.ANT_DESIGN_NOT_SHOW_BANNER,{defaultValue:void 0}),[,B]=(0,f.default)(S,{defaultValue:void 0}),R=(0,r.useCallback)(()=>{o(e=>({...e,menuVisible:!1}));},[]),F=(0,r.useCallback)(()=>{o(e=>({...e,windowWidth:window.innerWidth}));},[]),X=(0,r.useCallback)(e=>{o(t=>({...t,menuVisible:e}));},[]),G=()=>{A({direction:"rtl"!==s?"rtl":"ltr"});};(0,r.useEffect)(()=>{R();},[R,L]),(0,r.useEffect)(()=>(F(),window.addEventListener("resize",F),()=>{window.removeEventListener("resize",F),C.current&&clearTimeout(C.current);}),[F]);let H=(0,r.useCallback)(e=>{let t=window.location.href,n=window.location.pathname;if(/overview/.test(n)&&/0?[1-39][0-3]?x/.test(e)){window.location.href=t.replace(window.location.origin,e).replace(/\/components\/overview/,`/docs${/0(9|10)x/.test(e)?"":"/react"}/introduce`).replace(/\/$/,"");return;}let i=new URL(t.replace(window.location.origin,e));i.host.includes("antgroup")?(i.pathname=`${i.pathname.replace(/\/$/,"")}/`,window.location.href=i.toString()):window.location.href=i.href.replace(/\/$/,"");},[]),I=(0,r.useCallback)(()=>{let e=`${window.location.protocol}//`,t=window.location.href.slice(e.length);B(v.isZhCN(T)?"en-US":"zh-CN"),window.location.href=e+t.replace(window.location.pathname,v.getLocalizedPathname(T,!v.isZhCN(T),N).pathname);},[T,N]),O=(0,r.useMemo)(()=>"rtl"!==s?"RTL":"LTR",[s]),P=(0,r.useMemo)(()=>"rtl"===s?{direction:"ltr",textAlign:"end"}:{},[s]),{menuVisible:W,windowWidth:q,searching:U}=i,V={[t.version]:t.version,...null==n?void 0:n.docVersions},Q=Object.keys(V).map(e=>({value:V[e],label:e})),Z=["","index","index-cn"].includes(T),Y="cn"===e,K="rtl"===s,J=(0,h.getBannerData)(),ee=(null==J?void 0:J.title)||"",et=(null==J?void 0:J.href)||"",en=null;q<1120?en="crowded":q<1200&&(en="narrow");let ei=(0,c.default)(E.header,"clearfix",{"home-header":Z}),eo={isZhCN:Y,isRTL:K},ea=(0,a.jsx)(j.default,{...eo,responsive:en,isMobile:M,directionText:O,onLangChange:I,onDirectionChange:G},"nav"),er=[ea,(0,a.jsx)(d.Select,{size:"small",variant:"filled",className:E.versionSelect,defaultValue:t.version,onChange:H,styles:{popup:{root:P}},popupMatchSelectWidth:!1,getPopupContainer:e=>e.parentNode,options:Q},"version"),(0,a.jsx)(k.default,{onClick:I,value:v.isZhCN(T)?1:2,label1:"\u4E2D",label2:"En",tooltip1:"\u4E2D\u6587 / English",tooltip2:"English / \u4E2D\u6587"},"lang"),(0,a.jsx)(k.default,{onClick:G,value:"rtl"===s?2:1,label1:(0,a.jsx)(b.default,{className:E.dataDirectionIcon,direction:"ltr"}),tooltip1:"LTR",label2:(0,a.jsx)(b.default,{className:E.dataDirectionIcon,direction:"rtl"}),tooltip2:"RTL",pure:!0,"aria-label":"RTL Switch Button"},"direction"),(0,a.jsx)(x.default,{},"theme"),(0,a.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noreferrer",children:(0,a.jsx)(d.Tooltip,{title:"GitHub",destroyOnHidden:!0,children:(0,a.jsx)(d.Button,{type:"text",icon:(0,a.jsx)(l.GithubOutlined,{}),style:{fontSize:16}})})},"github")];q<1120?er=U?[]:[ea]:q<1200&&(er=U?[]:er);let el=Z?[{flex:"none"},{flex:"auto"}]:[{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24},{xxl:20,xl:19,lg:18,md:18,sm:0,xs:0}];return(0,a.jsxs)("header",{className:ei,children:[M&&(0,a.jsx)(d.Popover,{classNames:{root:E.popoverMenu},placement:"bottomRight",content:er,trigger:"click",open:W,arrow:{pointAtCenter:!0},onOpenChange:X,children:(0,a.jsx)(l.MenuOutlined,{className:"nav-phone-icon"})}),Y&&z&&ee&&et&&(0,a.jsx)(d.ConfigProvider,{theme:{token:{colorInfoBg:"linear-gradient(90deg, #84fab0, #8fd3f4)",colorTextBase:"#000"}},children:(0,a.jsx)(d.Alert,{className:E.banner,message:ee&&et?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{children:ee}),(0,a.jsx)("a",{className:E.link,href:et,target:"_blank",rel:"noreferrer",onClick:()=>{var e,t;null===(e=(t=window).gtag)||void 0===e||e.call(t,"event","\u70B9\u51FB",{event_category:"top_banner",event_label:et});},children:"\u524D\u5F80\u4E86\u89E3"})]}):null,type:"info",banner:!0,closable:!0,showIcon:!1,onClose:()=>{A({bannerVisible:!1}),D((0,p.default)().toISOString());}})}),(0,a.jsxs)(d.Row,{style:{flexFlow:"nowrap",height:64},children:[(0,a.jsx)(d.Col,{...el[0],children:(0,a.jsx)(y.default,{...eo,location:L})}),(0,a.jsx)(d.Col,{...el[1],children:(0,a.jsxs)("div",{className:E.menuRow,children:[(0,a.jsx)(g.default,{}),!M&&er]})})]})]});};},eec6195f:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=n("f19d2b93"),o=n("1fe0ede3"),a=n("3835a2b7"),r=()=>{let e=(0,a.useTheme)();return(0,i.jsx)(o.Global,{styles:(0,o.css)`
        .nav-phone-icon {
          position: absolute;
          bottom: 17px;
          inset-inline-end: 30px;
          z-index: 1;
          display: none;
          width: 16px;
          height: 22px;
          cursor: pointer;
        }

        @media only screen and (max-width: ${e.screenLG}px) {
          .code-boxes-col-2-1,
          .code-boxes-col-1-1 {
            float: none;
            width: 100%;
            max-width: unset;
          }
        }

        @media only screen and (max-width: 767.99px) {
          .preview-image-boxes {
            float: none;
            width: 100%;
            margin: 0 !important;
          }

          .preview-image-box {
            width: 100%;
            margin: 10px 0;
            padding: 0;
          }

          .image-wrapper {
            display: none;
          }

          div.version {
            display: block;
            margin: 29px auto 16px;
          }

          .toc {
            display: none;
          }

          .nav-phone-icon {
            display: block;
          }

          .main {
            height: calc(100% - 86px);
          }

          .aside-container {
            float: none;
            width: auto;
            padding-bottom: 30px;
            border-inline-end: 0;
          }

          .ant-row-rtl {
            margin-inline-end: 0;
            margin-inline-start: 0;
            padding-inline-end: ${e.padding}px;
            padding-inline-start: ${e.padding}px;

            > .markdown > * {
              width: 100% !important;
            }
          }

          .main-wrapper {
            width: 100%;
            margin: 0;
            border-radius: 0;
          }

          .prev-next-nav {
            width: calc(100% - 32px);
            margin-inline-start: ${e.margin}px;
            .ant-row-rtl & {
              margin-inline-end: ${e.margin}px;
              margin-inline-start: 64px;
            }
          }

          .drawer {
            .ant-menu-inline .ant-menu-item::after,
            .ant-menu-vertical .ant-menu-item::after {
              inset-inline-end: auto;
              inset-inline-start: 0;
            }
          }

          /** home 区块 **/
          .home-page-wrapper {
            .page {
              h2 {
                margin: 80px auto 64px;
              }
            }

            .parallax-bg {
              display: none;
            }
          }

          .banner {
            display: block;
            height: 632px;

            &-bg-wrapper {
              display: none;
            }

            .img-wrapper,
            .text-wrapper {
              display: inline-block;
              width: 100%;
              min-width: unset;
              max-width: unset;
              margin: auto;
              text-align: center;
            }

            .img-wrapper {
              position: initial;
              margin-top: ${e.marginMD}px;
              text-align: center;

              svg {
                width: 100%;
                max-width: 260px;
                height: auto;
                margin: 0 auto;
              }
            }

            .text-wrapper {
              min-height: 200px;
              margin-top: ${e.marginXL}px;
              padding: 0;

              h1 {
                display: none;
              }

              p {
                color: #314659;
                font-size: ${e.fontSize}px;
                line-height: 28px;
              }

              .banner-btns {
                display: block;
                min-width: 100%;
                white-space: nowrap;
                text-align: center;

                .banner-btn {
                  padding: 0 ${e.paddingMD}px;
                  font-size: ${e.fontSize}px;
                }
              }

              .banner-promote {
                min-width: 100%;
                margin-top: ${e.marginXL}px;

                .ant-divider {
                  display: none;
                }

                a {
                  font-size: ${e.fontSize}px;
                  white-space: nowrap;

                  img {
                    width: 20px;
                  }
                }
              }
            }
          }

          .page1 {
            min-height: 1300px;

            .ant-row {
              margin: 24px auto 64px;
              > div {
                margin-bottom: 48px;
              }
            }
          }

          .page2 {
            min-height: 840px;
            background: ${e.colorBgContainer};

            &-content {
              box-shadow: none;
            }

            &-components {
              display: none;
            }

            &-product {
              min-height: auto;
              padding: 0 ${e.padding}px;

              .product-block {
                margin-bottom: 34px;
                padding-bottom: 35px;
                border-bottom: 1px solid ${e.colorSplit};

                &:last-child {
                  margin-bottom: ${e.marginXL}px;
                  border-bottom: none;

                  .block-text-wrapper {
                    height: auto;
                  }
                }

                .block-image-wrapper {
                  height: 88px;

                  img {
                    height: 100%;
                  }
                }

                .block-text-wrapper {
                  padding-bottom: 0;
                  border-bottom: none;

                  h4 {
                    margin-bottom: ${e.marginXXS}px;
                    font-size: 18px;
                    line-height: 24px;
                  }

                  p {
                    margin-bottom: ${e.marginXS}px;
                    font-size: ${e.fontSizeSM}px;
                    line-height: 20px;
                  }

                  a {
                    line-height: 20px;
                  }

                  .components-button-wrapper {
                    margin-top: ${e.margin}px;
                    font-size: ${e.fontSizeSM}px;

                    a {
                      display: block;
                    }
                  }

                  a.more-mobile-react,
                  a.more-mobile-angular {
                    margin-top: 0;
                    color: ${e.colorLink};
                  }

                  a.more-mobile-react:hover,
                  a.more-mobile-angular:hover {
                    color: #40a9ff;
                  }
                }
              }
            }
          }

          .page3 {
            min-height: 688px;
            background-image: url('https://gw.alipayobjects.com/zos/rmsportal/qICoJIqqQRMeRGhPHBBS.svg');
            background-repeat: no-repeat;
            background-size: cover;
            .ant-row {
              margin: 0 ${e.marginXS}px;
            }

            .page3-block {
              margin-bottom: ${e.marginXL}px;
              padding: ${e.paddingLG}px;
              background: ${e.colorBgContainer};
              border-radius: ${e.borderRadiusSM}px;
              box-shadow: 0 8px 16px rgba(174, 185, 193, 0.3);

              &:nth-child(2) {
                .page3-img-wrapper img {
                  display: block;
                  width: 70%;
                  margin: auto;
                }
              }

              p {
                font-size: ${e.fontSizeSM}px;
              }

              .page3-img-wrapper {
                width: 20%;

                img {
                  width: 100%;
                }
              }

              .page3-text-wrapper {
                width: 80%;
                max-width: initial;
                margin: 0;
                padding-inline-start: ${e.padding}px;
              }
            }
          }
        }
      `});};},efe86da3:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.d(t,"default",{enumerable:!0,get:function(){return d;}});var i=n("777fffbe"),o=n("f19d2b93"),a=i._(n("5b220c3d")),r=i._(n("e22febe0"));let l=({direction:e})=>(0,o.jsxs)("svg",{viewBox:"0 0 20 20",width:"20",height:"20",fill:"currentColor",style:{transform:`scaleX(${"ltr"===e?"1":"-1"})`},children:[(0,o.jsx)("title",{children:"Direction Icon"}),(0,o.jsx)("path",{d:"m14.6961816 11.6470802.0841184.0726198 2 2c.2662727.2662727.2904793.682876.0726198.9764816l-.0726198.0841184-2 2c-.2929.2929-.7677.2929-1.0606 0-.2662727-.2662727-.2904793-.682876-.0726198-.9764816l.0726198-.0841184.7196-.7197h-10.6893c-.41421 0-.75-.3358-.75-.75 0-.3796833.28215688-.6934889.64823019-.7431531l.10176981-.0068469h10.6893l-.7196-.7197c-.2929-.2929-.2929-.7677 0-1.0606.2662727-.2662727.682876-.2904793.9764816-.0726198zm-8.1961616-8.6470802c.30667 0 .58246.18671.69635.47146l3.00003 7.50004c.1538.3845-.0333.821-.41784.9749-.38459.1538-.82107-.0333-.9749-.4179l-.81142-2.0285h-2.98445l-.81142 2.0285c-.15383.3846-.59031.5717-.9749.4179-.38458-.1539-.57165-.5904-.41781-.9749l3-7.50004c.1139-.28475.38968-.47146.69636-.47146zm8.1961616 1.14705264.0841184.07261736 2 2c.2662727.26626364.2904793.68293223.0726198.97654222l-.0726198.08411778-2 2c-.2929.29289-.7677.29289-1.0606 0-.2662727-.26626364-.2904793-.68293223-.0726198-.97654222l.0726198-.08411778.7196-.7196675h-3.6893c-.4142 0-.75-.3357925-.75-.7500025 0-.3796925.2821653-.69348832.6482323-.74315087l.1017677-.00684663h3.6893l-.7196-.7196725c-.2929-.29289-.2929-.76777 0-1.06066.2662727-.26626364.682876-.29046942.9764816-.07261736zm-8.1961616 1.62238736-.89223 2.23056h1.78445z"})]});var d=a.default.forwardRef((e,t)=>(0,o.jsx)(r.default,{ref:t,component:()=>(0,o.jsx)(l,{direction:e.direction}),...e}));},f0cc8246:function(e,t,n){"use strict";n.d(t,"__esModule",{value:!0}),n.e(t,{ANT_DESIGN_NOT_SHOW_BANNER:function(){return v;},default:function(){return j;}});var i=n("777fffbe"),o=n("852bbaa9"),a=n("f19d2b93"),r=o._(n("5b220c3d")),l=n("92a444f6"),d=n("2190d124"),s=n("c5e2d900"),c=n("a9d1a279"),p=i._(n("072ab8a9")),u=n("9c86e52a"),g=n("40d543ed"),m=i._(n("098b7512")),f=i._(n("ab6def4f")),h=n("b055b5cb"),x=n("7a33de8c"),b=i._(n("44bde013")),w=i._(n("714a8bde"));n("e0db49d0");let v="ANT_DESIGN_NOT_SHOW_BANNER";if("undefined"!=typeof window){let e=location.hash.slice(1);e.startsWith("components-")&&!document.querySelector(`#${e}`)&&(location.hash=`#${e.replace(/^components-/,"")}`);}let $=(e=[],t)=>e.map(e=>"auto"===e&&"dark"===t||"dark"===e?c.theme.darkAlgorithm:"compact"===e?c.theme.compactAlgorithm:null).filter(Boolean),y=()=>"undefined"==typeof window?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var j=()=>{let e=(0,u.useOutlet)(),[t,n]=(0,u.useSearchParams)(),[{theme:i=[],direction:o,isMobile:j,bannerVisible:k=!1},S]=(0,m.default)({isMobile:!1,direction:"ltr",theme:[],bannerVisible:!1}),[_]=(0,f.default)(x.ANT_DESIGN_SITE_THEME,{defaultValue:void 0}),[M]=(0,f.default)(v,{defaultValue:void 0}),z=e=>{let t=e.filter(e=>!["light","dark","auto"].includes(e)),n=e.find(e=>"light"===e||"dark"===e);return n?[...t,n]:["light","dark","auto"].includes(_)?[...t,_]:[...t,"auto"];},[A,C]=r.default.useState(()=>y()),L=(0,h.getBannerData)(),T="false"!==t.get("cssVar"),N=(0,r.useCallback)(e=>{S(t=>({...t,...e}));let i=t.toString(),o=t;Object.entries(e).forEach(([e,t])=>{if("direction"===e&&("rtl"===t?o.set("direction","rtl"):o.delete("direction")),"theme"===e){let e=Array.isArray(t)?t:[t],n=e.filter(e=>!["light","dark","auto"].includes(e)),i=e.find(e=>"light"===e||"dark"===e);i?o=(0,u.createSearchParams)({...o,theme:[...n,i]}):o.delete("theme");}}),o.toString()!==i&&n(o);},[t,n]),E=(0,r.useCallback)(()=>{N({isMobile:window.innerWidth<768});},[N]);(0,r.useEffect)(()=>{let e=i.find(e=>"light"===e||"dark"===e),t=document.querySelector("html");i.includes("auto")&&A?null==t||t.setAttribute("data-prefers-color",A):e&&(null==t||t.setAttribute("data-prefers-color",e));},[A,i]),(0,r.useEffect)(()=>{if("undefined"==typeof window)return;let e=window.matchMedia("(prefers-color-scheme: dark)"),t=e=>{C(e.matches?"dark":"light");};return e.addEventListener("change",t),()=>{e.removeEventListener("change",t);};},[]),(0,r.useEffect)(()=>{let e=z(t.getAll("theme")),n=t.get("direction"),i=M&&(0,p.default)().diff((0,p.default)(M),"day")>=1;S({theme:e,direction:"rtl"===n?"rtl":"ltr",bannerVisible:"undefined"!=typeof window&&window.location.pathname.includes("-cn")&&!!L&&(!M||!!i)}),E();let o=window[Symbol.for("antd.mirror-notify")];return"function"==typeof o&&o(),window.addEventListener("resize",E),()=>{window.removeEventListener("resize",E);};},[t,E]);let D=r.default.useMemo(()=>({direction:o,updateSiteConfig:N,theme:i,isMobile:j,bannerVisible:k}),[j,o,N,i,k]),B=r.default.useMemo(()=>({algorithm:$(i,A),token:{motion:!i.includes("motion-off")},cssVar:T,hashed:!T}),[i,T,A]),R=r.default.useMemo(()=>(0,l.createCache)(),[]);return(0,u.useServerInsertedHTML)(()=>{let e=(0,l.extractStyle)(R,{plain:!0,types:"style"});return(0,a.jsx)("style",{"data-type":"antd-cssinjs",dangerouslySetInnerHTML:{__html:e}});}),(0,u.useServerInsertedHTML)(()=>{let e=(0,l.extractStyle)(R,{plain:!0,types:["cssVar","token"]});return(0,a.jsx)("style",{"data-type":"antd-css-var","data-rc-order":"prepend","data-rc-priority":"-9999",dangerouslySetInnerHTML:{__html:e}});}),(0,u.useServerInsertedHTML)(()=>(0,a.jsx)("style",{"data-sandpack":"true",id:"sandpack",dangerouslySetInnerHTML:{__html:(0,s.getSandpackCssText)()}})),(0,a.jsx)(g.DarkContext,{value:i.includes("dark")||i.includes("auto")&&"dark"===A,children:(0,a.jsx)(l.StyleProvider,{cache:R,linters:[l.legacyNotSelectorLinter,l.parentSelectorLinter,l.NaNLinter],children:(0,a.jsx)(w.default,{value:D,children:(0,a.jsx)(b.default,{theme:B,children:(0,a.jsx)(d.HappyProvider,{disabled:!i.includes("happy-work"),children:(0,a.jsx)(c.App,{children:e})})})})})});};}}]);