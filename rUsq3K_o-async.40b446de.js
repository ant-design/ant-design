(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["rUsq3K_o"],{"0NxBInvu":function(e,t,o){var n=o("hSu6qSb4")._;o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return M;}});var i=o("d3__vuQ2"),r=o("hSu6qSb4"),a=o("8Z0rk4BW"),l=r._(o("WyIMPUJp")),d=o("qdGieaVz"),s=o("ODWitzHB"),p=i._(o("YAqr4JrW")),c=o("nIblKo9C"),u=i._(o("CYt1EsX6")),m=i._(o("kaZjkN4S")),g=i._(o("fnDSxSF-")),h=i._(o("upU8ix9N")),x=i._(o("cUqL3oAL")),f=i._(o("tPJF1xam"));let b=l.default.lazy(()=>Promise.all([o.ensure("vendors_1"),o.ensure("o6plJHHP")]).then(o.dr(n,"o6plJHHP"))),w=l.default.lazy(()=>Promise.all([o.ensure("oqWxmmsd")]).then(o.dr(n,"oqWxmmsd"))),$=l.default.lazy(()=>Promise.all([o.ensure("dYAXkmQV")]).then(o.dr(n,"dYAXkmQV"))),v=l.default.lazy(()=>Promise.all([o.ensure("6BTsJGCz")]).then(o.dr(n,"6BTsJGCz"))),k=l.default.lazy(()=>Promise.all([o.ensure("common"),o.ensure("vendors_2"),o.ensure("JcYSrKdm")]).then(o.dr(n,"JcYSrKdm"))),y=l.default.lazy(()=>Promise.all([o.ensure("common"),o.ensure("SUy3lWa7")]).then(o.dr(n,"SUy3lWa7"))),j=l.default.lazy(()=>Promise.all([o.ensure("vendors_1"),o.ensure("HpEnRGcv")]).then(o.dr(n,"HpEnRGcv"))),S=l.default.lazy(()=>Promise.all([o.ensure("tVCoUMmw")]).then(o.dr(n,"tVCoUMmw"))),_=(0,s.createStyles)(({token:e,css:t})=>({articleWrapper:t`
    padding: 0 170px 32px 64px;
    &.rtl {
      padding: 0 64px 144px 170px;
    }
    @media only screen and (max-width: ${e.screenLG}px) {
      &,
      &.rtl {
        padding: 0 ${2*e.paddingLG}px;
      }
    }
  `}));var M=({children:e})=>{var t,o,n;let i=(0,c.useRouteMeta)(),{pathname:r,hash:s}=(0,m.default)(),{direction:M}=(0,l.useContext)(x.default),{styles:z}=_(),[B,C]=(0,u.default)(!1),[D,L]=(0,l.useState)("tsx"),W=(0,l.useMemo)(()=>{var e;return(null===(e=i.toc)||void 0===e?void 0:e.filter(e=>e._debug_demo).map(e=>e.id))||[];},[i]),T=W.includes(s.slice(1));(0,l.useLayoutEffect)(()=>{C(T);},[]);let A=(0,l.useMemo)(()=>({showDebug:B,setShowDebug:C,codeType:D,setCodeType:L}),[B,D,W]),H="rtl"===M;return(0,a.jsx)(h.default.Provider,{value:A,children:(0,a.jsxs)(d.Col,{xxl:20,xl:19,lg:18,md:18,sm:24,xs:24,children:[(0,a.jsx)(f.default,{fallback:null,children:(0,a.jsx)($,{showDebug:B,debugDemos:W})}),(0,a.jsxs)("article",{className:(0,p.default)(z.articleWrapper,{rtl:H}),children:[(null===(t=i.frontmatter)||void 0===t?void 0:t.title)?(0,a.jsxs)(d.Flex,{justify:"space-between",children:[(0,a.jsx)(d.Typography.Title,{style:{fontSize:32,position:"relative"},children:(0,a.jsxs)(d.Space,{children:[(0,a.jsx)("span",{children:null===(o=i.frontmatter)||void 0===o?void 0:o.title}),(0,a.jsx)("span",{children:null===(n=i.frontmatter)||void 0===n?void 0:n.subtitle}),!r.startsWith("/components/overview")&&(0,a.jsx)(f.default,{fallback:null,children:(0,a.jsx)(S,{title:(0,a.jsx)(c.FormattedMessage,{id:"app.content.edit-page"}),filename:i.frontmatter.filename})})]})}),r.startsWith("/components/")&&(0,a.jsx)(f.default,{fallback:null,children:(0,a.jsx)(j,{pathname:r})})]}):null,(0,a.jsx)(f.default,{fallback:null,children:(0,a.jsx)(v,{})}),!i.frontmatter.__autoDescription&&i.frontmatter.description,"Components"===i.frontmatter.category&&"false"!==String(i.frontmatter.showImport)&&(0,a.jsx)(g.default,{source:!0,component:i.frontmatter.title,filename:i.frontmatter.filename,version:i.frontmatter.tag}),(0,a.jsx)("div",{style:{minHeight:"calc(100vh - 64px)",width:"calc(100% - 10px)"},children:e}),(0,a.jsx)(f.default,{children:(0,a.jsx)(w,{zhihuLink:i.frontmatter.zhihu_url,yuqueLink:i.frontmatter.yuque_url,juejinLink:i.frontmatter.juejin_url})}),(0,a.jsx)(f.default,{fallback:(0,a.jsx)("div",{style:{height:50,marginTop:120}}),children:(0,a.jsx)(b,{filename:i.frontmatter.filename})})]}),(0,a.jsx)(f.default,{fallback:null,children:(0,a.jsx)(y,{rtl:H})}),(0,a.jsx)(k,{})]})});};},"0kOBH6i1":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB");let a="dumi-default-";var l=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
        html {
          .${a}search-bar {
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
          .${a}search-popover {
            background-color: ${e.colorBgElevated} !important;
            &::before {
              border-bottom-color: ${e.colorBgElevated} !important;
            }
          }
          .${a}search-result {
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
      `});};},"15ZpF8rZ":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
            border-left-color: ${e.colorPrimary};
          }
        }
      `});};},"5_uwWLtb":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return s;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=n._(o("WyIMPUJp")),a=o("H-Dt48wQ"),l=o("ODWitzHB"),d=o("1F1DPxvR"),s=()=>{let{anchorTop:e}=(0,l.useTheme)();return r.default.useInsertionEffect(()=>{(0,d.updateCSS)("@layer global, antd;","site-global",{prepend:!0});},[]),(0,i.jsx)(a.Global,{styles:(0,a.css)`
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
      `});};},"6ziP_ADh":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return j;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=o("WyIMPUJp"),l=o("4i_r4BgY"),d=o("qdGieaVz"),s=o("ODWitzHB"),p=n._(o("YAqr4JrW")),c=n._(o("Byq4qat9")),u=o("nIblKo9C"),m=n._(o("HJT53KKB")),g=n._(o("I1Rkhqyq")),h=n._(o("N1b2Ijt6")),x=o("8MyCRh9o"),f=i._(o("av4YWks-")),b=n._(o("cUqL3oAL")),w=n._(o("oiSVIx2a")),$=n._(o("unIuJkWb")),v=n._(o("Q6ILzXSp"));let k={cn:{message:"\u8BED\u96C0\u5F81\u6587 \xb7 \u8BF4\u8BF4\u4F60\u548C\u5F00\u6E90\u7684\u6545\u4E8B\uFF0C\u8D62\u53D6 Ant Design \u7CBE\u7F8E\u5468\u8FB9 \u{1F381}",shortMessage:"\u8BED\u96C0\u5F81\u6587 \xb7 \u8BF4\u8BF4\u4F60\u548C\u5F00\u6E90\u7684\u6545\u4E8B\uFF0C\u8D62\u53D6 Ant Design \u7CBE\u7F8E\u5468\u8FB9 \u{1F381}",more:"\u524D\u5F80\u4E86\u89E3",link:"https://www.yuque.com/opensource2023"},en:{message:"",shortMessage:"",more:"",link:""}},y=(0,s.createStyles)(({token:e,css:t})=>{let o="#ced4d9";return{header:t`
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
          fill: ${o};
        }

        > input {
          height: 22px;
          border: 0;
          max-width: calc(100vw - 768px);

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${o};
          }
        }

        .dumi-default-search-shortcut {
          color: ${o};
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
          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
          & > section {
            scrollbar-width: thin;
            scrollbar-color: unset;
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
          scrollbar-color: unset;
        }
      }
    `};});var j=()=>{let[e,t]=(0,g.default)(k),{pkg:o}=(0,u.useSiteData)(),n=(0,f.getThemeConfig)(),[i,s]=(0,a.useState)({menuVisible:!1,windowWidth:1400,searching:!1}),{direction:j,isMobile:S,bannerVisible:_,updateSiteConfig:M}=(0,a.useContext)(b.default),z=(0,a.useRef)(null),B=(0,u.useLocation)(),{pathname:C,search:D}=B,{styles:L}=y(),W=(0,a.useCallback)(()=>{s(e=>({...e,menuVisible:!1}));},[]),T=(0,a.useCallback)(()=>{s(e=>({...e,windowWidth:window.innerWidth}));},[]),A=(0,a.useCallback)(e=>{s(t=>({...t,menuVisible:e}));},[]),H=()=>{M({direction:"rtl"!==j?"rtl":"ltr"});};(0,a.useEffect)(()=>{W();},[B]),(0,a.useEffect)(()=>(T(),window.addEventListener("resize",T),()=>{window.removeEventListener("resize",T),z.current&&clearTimeout(z.current);}),[]);let I=(0,a.useCallback)(e=>{let t=window.location.href,o=window.location.pathname;if(/overview/.test(o)&&/0?[1-39][0-3]?x/.test(e)){window.location.href=t.replace(window.location.origin,e).replace(/\/components\/overview/,`/docs${/0(9|10)x/.test(e)?"":"/react"}/introduce`).replace(/\/$/,"");return;}let n=new URL(t.replace(window.location.origin,e));n.host.includes("antgroup")?(n.pathname=`${n.pathname.replace(/\/$/,"")}/`,window.location.href=n.toString()):window.location.href=n.href.replace(/\/$/,"");},[]),E=(0,a.useCallback)(()=>{let e=`${window.location.protocol}//`,t=window.location.href.slice(e.length);f.isLocalStorageNameSupported()&&localStorage.setItem("locale",f.isZhCN(C)?"en-US":"zh-CN"),window.location.href=e+t.replace(window.location.pathname,f.getLocalizedPathname(C,!f.isZhCN(C),D).pathname);},[B]),R=(0,a.useMemo)(()=>"rtl"!==j?"RTL":"LTR",[j]),q=(0,a.useMemo)(()=>"rtl"===j?{direction:"ltr",textAlign:"right"}:{},[j]),{menuVisible:P,windowWidth:N,searching:G}=i,X={[o.version]:o.version,...null==n?void 0:n.docVersions},F=Object.keys(X).map(e=>({value:X[e],label:e})),O=["","index","index-cn"].includes(C),Z="cn"===t,Q="rtl"===j,U=null;N<1120?U="crowded":N<1200&&(U="narrow");let V=(0,p.default)(L.header,"clearfix",{"home-header":O}),J={isZhCN:Z,isRTL:Q},Y=(0,r.jsx)($.default,{...J,responsive:U,isMobile:S,directionText:R,onLangChange:E,onDirectionChange:H},"nav"),K=[Y,(0,r.jsx)(d.Select,{size:"small",className:L.versionSelect,defaultValue:o.version,onChange:I,dropdownStyle:q,popupMatchSelectWidth:!1,getPopupContainer:e=>e.parentNode,options:F},"version"),(0,r.jsx)(v.default,{onClick:E,value:f.isZhCN(C)?1:2,label1:"\u4E2D",label2:"En",tooltip1:"\u4E2D\u6587 / English",tooltip2:"English / \u4E2D\u6587"},"lang"),(0,r.jsx)(v.default,{onClick:H,value:"rtl"===j?2:1,label1:(0,r.jsx)(h.default,{className:L.dataDirectionIcon,direction:"ltr"}),tooltip1:"LTR",label2:(0,r.jsx)(h.default,{className:L.dataDirectionIcon,direction:"rtl"}),tooltip2:"RTL",pure:!0,"aria-label":"RTL Switch Button"},"direction"),(0,r.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noreferrer",children:(0,r.jsx)(v.default,{value:1,label1:(0,r.jsx)(l.GithubOutlined,{}),tooltip1:"Github",label2:null,pure:!0})},"github")];N<1120?K=G?[]:[Y]:N<1200&&(K=G?[]:K);let ee=O?[{flex:"none"},{flex:"auto"}]:[{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24},{xxl:20,xl:19,lg:18,md:18,sm:0,xs:0}];return(0,r.jsxs)("header",{className:V,children:[S&&(0,r.jsx)(d.Popover,{overlayClassName:L.popoverMenu,placement:"bottomRight",content:K,trigger:"click",open:P,arrow:{pointAtCenter:!0},onOpenChange:A,children:(0,r.jsx)(l.MenuOutlined,{className:"nav-phone-icon"})}),Z&&_&&(0,r.jsx)(d.ConfigProvider,{theme:{token:{colorInfoBg:"linear-gradient(90deg, #84fab0, #8fd3f4)",colorTextBase:"#000"}},children:(0,r.jsx)(d.Alert,{className:L.banner,message:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{children:S?e.shortMessage:e.message}),(0,r.jsx)("a",{className:L.link,href:e.link,target:"_blank",rel:"noreferrer",onClick:()=>{var t,o;null===(t=(o=window).gtag)||void 0===t||t.call(o,"event","\u70B9\u51FB",{event_category:"top_banner",event_label:e.link});},children:e.more})]}),type:"info",banner:!0,closable:!0,showIcon:!1,onClose:()=>{M({bannerVisible:!1}),f.isLocalStorageNameSupported()&&localStorage.setItem(x.ANT_DESIGN_NOT_SHOW_BANNER,(0,c.default)().toISOString());}})}),(0,r.jsxs)(d.Row,{style:{flexFlow:"nowrap",height:64},children:[(0,r.jsx)(d.Col,{...ee[0],children:(0,r.jsx)(w.default,{...J,location:B})}),(0,r.jsx)(d.Col,{...ee[1],children:(0,r.jsxs)("div",{className:L.menuRow,children:[(0,r.jsx)(m.default,{}),!S&&K]})})]})]});};},"7sYZX0yY":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
        .nav-phone-icon {
          position: absolute;
          bottom: 17px;
          right: 30px;
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
            border-right: 0;
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
              right: auto;
              left: 0;
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
      `});};},"8MyCRh9o":function(e,t,o){var n=o("hSu6qSb4")._;o.d(t,"__esModule",{value:!0}),o.e(t,{ANT_DESIGN_NOT_SHOW_BANNER:function(){return w;},default:function(){return v;}});var i=o("d3__vuQ2"),r=o("hSu6qSb4"),a=o("8Z0rk4BW"),l=r._(o("WyIMPUJp")),d=o("kqRE9qs0"),s=o("IZDRJG-w"),p=o("xeLZALd6"),c=o("qdGieaVz"),u=o("nIblKo9C"),m=o("QNVD7cvc"),g=i._(o("CYt1EsX6")),h=i._(o("kaZjkN4S")),x=i._(o("RL3gE8Om")),f=i._(o("cUqL3oAL"));let b=l.default.lazy(()=>Promise.all([o.ensure("vendors_1"),o.ensure("ejPejFoj")]).then(o.dr(n,"ejPejFoj"))),w="ANT_DESIGN_NOT_SHOW_BANNER",$=(e=[])=>e.map(e=>"dark"===e?c.theme.darkAlgorithm:"compact"===e?c.theme.compactAlgorithm:null).filter(Boolean);var v=()=>{let e=(0,u.useOutlet)(),{pathname:t}=(0,h.default)(),[o,n]=(0,u.useSearchParams)(),[{theme:i=[],direction:r,isMobile:w,bannerVisible:v=!1},k]=(0,g.default)({isMobile:!1,direction:"ltr",theme:[],bannerVisible:!1}),y=(0,l.useCallback)(e=>{k(t=>({...t,...e}));let t=o.toString(),i=o;Object.entries(e).forEach(([e,t])=>{if("direction"===e&&("rtl"===t?i.set("direction","rtl"):i.delete("direction")),"theme"===e){var o;i=(0,u.createSearchParams)({...i,theme:t.filter(e=>"light"!==e)}),null===(o=document.querySelector("html"))||void 0===o||o.setAttribute("data-prefers-color",t.includes("dark")?"dark":"light");}}),i.toString()!==t&&n(i);},[o,n]),j=()=>{y({isMobile:window.innerWidth<768});};(0,l.useEffect)(()=>{let e=o.getAll("theme"),t=o.get("direction");return k({theme:e,direction:"rtl"===t?"rtl":"ltr"}),document.documentElement.setAttribute("data-prefers-color",e.includes("dark")?"dark":"light"),j(),window.addEventListener("resize",j),()=>{window.removeEventListener("resize",j);};},[]);let S=l.default.useMemo(()=>({direction:r,updateSiteConfig:y,theme:i,isMobile:w,bannerVisible:v}),[w,r,y,i,v]),_=l.default.useMemo(()=>({algorithm:$(i),token:{motion:!i.includes("motion-off")},cssVar:!0,hashed:!1}),[i]),[M]=l.default.useState(()=>(0,d.createCache)());(0,u.useServerInsertedHTML)(()=>{let e=(0,d.extractStyle)(M,{plain:!0,types:"style"});return(0,a.jsx)("style",{"data-type":"antd-cssinjs",dangerouslySetInnerHTML:{__html:e}});}),(0,u.useServerInsertedHTML)(()=>{let e=(0,d.extractStyle)(M,{plain:!0,types:["cssVar","token"]});return(0,a.jsx)("style",{"data-type":"antd-css-var","data-rc-order":"prepend","data-rc-priority":"-9999",dangerouslySetInnerHTML:{__html:e}});}),(0,u.useServerInsertedHTML)(()=>(0,a.jsx)("style",{"data-sandpack":"true",id:"sandpack",dangerouslySetInnerHTML:{__html:(0,p.getSandpackCssText)()}}));let z=t.startsWith("/~demos"),B=e;return z||(B=(0,a.jsxs)(c.App,{children:[e,(0,a.jsx)(l.Suspense,{children:(0,a.jsx)(b,{value:i,onChange:e=>y({theme:e})})})]})),(0,a.jsx)(m.DarkContext.Provider,{value:i.includes("dark"),children:(0,a.jsx)(d.StyleProvider,{cache:M,linters:[d.legacyNotSelectorLinter,d.parentSelectorLinter,d.NaNLinter],children:(0,a.jsx)(f.default.Provider,{value:S,children:(0,a.jsx)(x.default,{theme:_,children:(0,a.jsx)(s.HappyProvider,{disabled:!i.includes("happy-work"),children:B})})})})});};},DTWs1hFv:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
            left: 0;
          }
        }

        .preview-image-wrapper.good::after {
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 3px;
          background: ${e.colorPrimary};
          content: '';
        }

        .preview-image-wrapper.bad::after {
          position: absolute;
          bottom: 0;
          left: 0;
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
      `});};},H0YRS2Ra:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
        @font-face {
          font-weight: normal;
          font-family: AlibabaPuHuiTi;
          src:
            url('//at.alicdn.com/t/webfont_6e11e43nfj.woff2') format('woff2'),
            url('//at.alicdn.com/t/webfont_6e11e43nfj.woff') format('woff'),
            /* chrome、firefox */ url('//at.alicdn.com/t/webfont_6e11e43nfj.ttf') format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
          font-display: swap;
        }

        @font-face {
          font-weight: bold;
          font-family: AlibabaPuHuiTi;
          src:
            url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
            url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
            /* chrome、firefox */ url('//at.alicdn.com/t/webfont_exesdog9toj.ttf')
              format('truetype'); /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
          font-display: swap;
        }

        // 组件丰富，选用自如定制主题随心所欲设计语言与研发框架1234567890 QWERTYUIOPLKJHGFDSAZXCVBNM,.mnbvcxzasdfghjklpoiuytrewq
        /* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
        @font-face {
          font-weight: 900;
          font-family: 'AliPuHui';
          src:
            url('//at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2')
              format('woff2'),
            url('//at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff') format('woff');
          font-display: swap;
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
      `});};},JcYSrKdm:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return w;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=i._(o("WyIMPUJp")),l=o("4i_r4BgY"),d=o("u9xpdPll"),s=o("ODWitzHB"),p=n._(o("ijYlPanX")),c=o("nIblKo9C"),u=n._(o("RYntQbtC")),m=n._(o("I1Rkhqyq")),g=n._(o("kaZjkN4S")),h=n._(o("cUqL3oAL")),x=n._(o("gKhXLipt"));let f={cn:{owner:"\u8682\u8681\u96C6\u56E2\u548C Ant Design \u5F00\u6E90\u793E\u533A"},en:{owner:"Ant Group and Ant Design Community"}},b=()=>{let{isMobile:e}=(0,a.useContext)(h.default);return(0,s.createStyles)(({token:t,css:o})=>{let n=new d.TinyColor((0,p.default)("#f0f3fa","#fff")).onBackground(t.colorBgContainer).toHexString();return{holder:o`
        background: ${n};
      `,footer:o`
        background: ${n};
        color: ${t.colorTextSecondary};
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

        * {
          box-sizing: border-box;
        }

        h2,
        a {
          color: ${t.colorText};
        }

        .rc-footer-column {
          margin-bottom: ${e?60:0}px;
          :last-child {
            margin-bottom: ${e?20:0}px;
          }
        }

        .rc-footer-item-icon {
          top: -1.5px;
        }

        .rc-footer-container {
          max-width: 1208px;
          margin-inline: auto;
          padding-inline: ${t.marginXXL}px;
        }

        .rc-footer-bottom {
          box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
          .rc-footer-bottom-container {
            font-size: ${t.fontSize}px;
          }
        }
      `};})();};var w=()=>{let e=(0,g.default)(),[t,o]=(0,m.default)(f),{styles:n}=b(),{getLink:i}=e,d=a.default.useMemo(()=>{let e="cn"===o,t={title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.resources"}),items:[{title:"Ant Design Charts",url:e?"https://ant-design-charts.antgroup.com":"https://charts.ant.design",openExternal:!0},{title:"Ant Design Pro",url:"https://pro.ant.design",openExternal:!0},{title:"Ant Design Pro Components",url:"https://procomponents.ant.design",openExternal:!0},{title:"Ant Design Mobile",url:e?"https://ant-design-mobile.antgroup.com/zh":"https://mobile.ant.design",openExternal:!0},{title:"Ant Design Mini",url:e?"https://ant-design-mini.antgroup.com/":"https://mini.ant.design",openExternal:!0},{title:"Ant Design Landing",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.landing"}),url:"https://landing.ant.design",openExternal:!0},{title:"Scaffolds",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.scaffolds"}),url:"https://scaffold.ant.design",openExternal:!0},{title:"Umi",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.umi"}),url:"https://umijs.org",openExternal:!0},{title:"dumi",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.dumi"}),url:"https://d.umijs.org",openExternal:!0},{title:"qiankun",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.qiankun"}),url:"https://qiankun.umijs.org",openExternal:!0},{title:"ahooks",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.hooks"}),url:"https://github.com/alibaba/hooks",openExternal:!0},{title:"Ant Motion",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.motion"}),url:"https://motion.ant.design",openExternal:!0},{title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.chinamirror"}),url:"https://ant-design.antgroup.com"}]},n={title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.community"}),items:[{icon:(0,r.jsx)(l.AntDesignOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.awesome"}),url:"https://github.com/websemantics/awesome-ant-design",openExternal:!0},{icon:(0,r.jsx)(l.MediumOutlined,{}),title:"Medium",url:"http://medium.com/ant-design/",openExternal:!0},{icon:(0,r.jsx)(l.TwitterOutlined,{style:{color:"#1DA1F2"}}),title:"Twitter",url:"http://twitter.com/antdesignui",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.yuque.repo"}),url:"https://yuque.com/ant-design/ant-design",openExternal:!0},{icon:(0,r.jsx)(l.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.zhihu"}),url:"https://www.zhihu.com/column/c_1564262000561106944",openExternal:!0},{icon:(0,r.jsx)(l.ZhihuOutlined,{style:{color:"#056de8"}}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.zhihu.xtech"}),url:"https://www.zhihu.com/column/c_1543658574504751104",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",width:16,height:16,alt:"seeconf logo"}),title:"SEE Conf",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.seeconf"}),url:"https://seeconf.antfin.com/",openExternal:!0}]};e&&n.items.push({icon:(0,r.jsx)(l.UsergroupAddOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.work_with_us"}),url:i("/docs/resources",{cn:"\u52A0\u5165\u6211\u4EEC",en:"JoinUs"}),LinkComponent:c.Link});let a={title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.help"}),items:[{icon:(0,r.jsx)(l.GithubOutlined,{}),title:"GitHub",url:"https://github.com/ant-design/ant-design",openExternal:!0},{icon:(0,r.jsx)(l.HistoryOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.change-log"}),url:i("/changelog"),LinkComponent:c.Link},{icon:(0,r.jsx)(l.QuestionCircleOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.faq"}),url:i("/docs/react/faq"),LinkComponent:c.Link},{icon:(0,r.jsx)(l.BugOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.bug-report"}),url:"https://new-issue.ant.design/",openExternal:!0},{icon:(0,r.jsx)(l.IssuesCloseOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.issues"}),url:"https://github.com/ant-design/ant-design/issues",openExternal:!0},{icon:(0,r.jsx)(l.MessageOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.discussions"}),url:"https://github.com/ant-design/ant-design/discussions",openExternal:!0},{icon:(0,r.jsx)(l.QuestionCircleOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.stackoverflow"}),url:"http://stackoverflow.com/questions/tagged/antd",openExternal:!0},{icon:(0,r.jsx)(l.QuestionCircleOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.segmentfault"}),url:"https://segmentfault.com/t/antd",openExternal:!0}]},d={icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:22,height:22,alt:"Ant XTech logo"}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.more-product"}),items:[{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",width:16,height:16,alt:"yuque logo"}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.yuque"}),url:"https://yuque.com",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.yuque.slogan"}),openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png",width:16,height:16,alt:"AntV logo"}),title:"AntV",url:"https://antv.antgroup.com",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.antv.slogan"}),openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://www.eggjs.org/logo.svg",alt:"Egg logo",width:16,height:16}),title:"Egg",url:"https://eggjs.org",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.egg.slogan"}),openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico",width:16,height:16,alt:"Kitchen logo"}),title:"Kitchen",description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.kitchen"}),url:"https://kitchen.alipay.com",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*3ittT5OEo2gAAAAAAAAAAAAADvGmAQ/original",width:16,height:16,alt:"Galacean logo"}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.galacean"}),description:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.galacean.slogan"}),url:"https://galacean.antgroup.com/",openExternal:!0},{icon:(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg",width:16,height:16,alt:"xtech logo"}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.xtech"}),url:"https://xtech.antfin.com/",openExternal:!0},{icon:(0,r.jsx)(l.BgColorsOutlined,{}),title:(0,r.jsx)(c.FormattedMessage,{id:"app.footer.theme"}),url:i("/theme-editor"),LinkComponent:c.Link}]};return[t,n,a,d];},[o,e.search]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.default,{columns:d,className:n.footer,bottom:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{opacity:"0.4"},children:["Made with ",(0,r.jsx)("span",{style:{color:"#fff"},children:"\u2764"})," by"]}),(0,r.jsx)("div",{children:t.owner})]})}),(0,r.jsx)(x.default,{})]});};},N1b2Ijt6:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=n._(o("4i_r4BgY"));let a=({direction:e})=>(0,i.jsxs)("svg",{viewBox:"0 0 20 20",width:"20",height:"20",fill:"currentColor",style:{transform:`scaleX(${"ltr"===e?"1":"-1"})`},children:[(0,i.jsx)("title",{children:"Direction Icon"}),(0,i.jsx)("path",{d:"m14.6961816 11.6470802.0841184.0726198 2 2c.2662727.2662727.2904793.682876.0726198.9764816l-.0726198.0841184-2 2c-.2929.2929-.7677.2929-1.0606 0-.2662727-.2662727-.2904793-.682876-.0726198-.9764816l.0726198-.0841184.7196-.7197h-10.6893c-.41421 0-.75-.3358-.75-.75 0-.3796833.28215688-.6934889.64823019-.7431531l.10176981-.0068469h10.6893l-.7196-.7197c-.2929-.2929-.2929-.7677 0-1.0606.2662727-.2662727.682876-.2904793.9764816-.0726198zm-8.1961616-8.6470802c.30667 0 .58246.18671.69635.47146l3.00003 7.50004c.1538.3845-.0333.821-.41784.9749-.38459.1538-.82107-.0333-.9749-.4179l-.81142-2.0285h-2.98445l-.81142 2.0285c-.15383.3846-.59031.5717-.9749.4179-.38458-.1539-.57165-.5904-.41781-.9749l3-7.50004c.1139-.28475.38968-.47146.69636-.47146zm8.1961616 1.14705264.0841184.07261736 2 2c.2662727.26626364.2904793.68293223.0726198.97654222l-.0726198.08411778-2 2c-.2929.29289-.7677.29289-1.0606 0-.2662727-.26626364-.2904793-.68293223-.0726198-.97654222l.0726198-.08411778.7196-.7196675h-3.6893c-.4142 0-.75-.3357925-.75-.7500025 0-.3796925.2821653-.69348832.6482323-.74315087l.1017677-.00684663h3.6893l-.7196-.7196725c-.2929-.29289-.2929-.76777 0-1.06066.2662727-.26626364.682876-.29046942.9764816-.07261736zm-8.1961616 1.62238736-.89223 2.23056h1.78445z"})]});var l=e=>(0,i.jsx)(r.default,{...e,component:()=>(0,i.jsx)(a,{direction:e.direction})});},Q6ILzXSp:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return p;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=o("qdGieaVz"),a=o("ODWitzHB"),l=n._(o("YAqr4JrW"));let d="1.2em",s=(0,a.createStyles)(({token:e,css:t})=>{let{colorText:o,colorBorder:n,colorBgContainer:i,colorBgTextHover:r,borderRadius:a,controlHeight:l,motionDurationMid:s}=e;return{btn:t`
      color: ${o};
      border-color: ${n};
      padding: 0 !important;
      width: ${l}px;
      height: ${l}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: ${a}px;
      transition: all ${s};
      cursor: pointer;
      .btn-inner {
        transition: all ${s};
      }
      &:hover {
        background: ${r};
      }
      img {
        width: ${d};
        height: ${d};
      }
      .anticon {
        font-size: ${d};
      }
    `,innerDiv:t`
      position: relative;
      width: ${d};
      height: ${d};
    `,labelStyle:t`
      position: absolute;
      font-size: ${d};
      line-height: 1;
      border: 1px solid ${o};
      color: ${o};
    `,label1Style:t`
      left: -5%;
      top: 0;
      z-index: 1;
      background-color: ${o};
      color: ${i};
      transform: scale(0.7);
      transform-origin: 0 0;
    `,label2Style:t`
      right: -5%;
      bottom: 0;
      z-index: 0;
      transform: scale(0.5);
      transform-origin: 100% 100%;
    `};});var p=e=>{let{label1:t,label2:o,tooltip1:n,tooltip2:a,value:d,pure:p,onClick:c}=e,{styles:{btn:u,innerDiv:m,labelStyle:g,label1Style:h,label2Style:x}}=s(),f=(0,i.jsx)("button",{type:"button",onClick:c,className:u,"aria-label":e["aria-label"],children:(0,i.jsxs)("div",{className:"btn-inner",children:[p&&(1===d?t:o),!p&&(0,i.jsxs)("div",{className:m,children:[(0,i.jsx)("span",{className:(0,l.default)(g,1===d?h:x),children:t}),(0,i.jsx)("span",{className:(0,l.default)(g,1===d?x:h),children:o})]})]})},"lang-button");return n||a?(0,i.jsx)(r.Tooltip,{title:1===d?n:a,children:f}):f;};},S2l11r7y:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return g;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=o("qdGieaVz"),a=o("ODWitzHB"),l=o("nIblKo9C"),d=n._(o("QNVD7cvc")),s=n._(o("p_ohR-tO")),p=n._(o("tVCoUMmw")),c=n._(o("JcYSrKdm")),u=n._(o("okmjlU7w"));let m=()=>{let e=(0,d.default)();return(0,a.createStyles)(t=>{let{token:o,css:n}=t,{antCls:i}=o;return{resourcePage:n`
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
            ${i}-col {
              padding-top: ${o.padding}px !important;
              padding-bottom: ${o.padding}px !important;
            }
          }
        }
      `,banner:n`
        padding: 0 ${40}px;
        overflow: hidden;
        ${e?"":"background: url('https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y_r7RogIG1wAAAAAAAAAAABkARQnAQ');"}
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
          font-size: ${o.fontSizeLG}px;
          line-height: 24px;
        }

        @media only screen and (max-width: 767.99px) {
          & {
            margin: 0 -${24}px;
            padding: 0 ${24}px;
          }
        }
      `};})();};var g=({children:e})=>{var t;let{styles:o}=m(),n=(0,l.useRouteMeta)(),a=(0,d.default)(),g=(0,i.jsxs)(r.Layout,{children:[(0,i.jsx)(s.default,{}),(0,i.jsxs)("div",{id:"resources-page",className:o.resourcePage,children:[(0,i.jsx)(u.default,{}),(0,i.jsxs)("div",{className:o.banner,children:[(0,i.jsxs)(r.Typography.Title,{style:{fontSize:30},children:[null===(t=n.frontmatter)||void 0===t?void 0:t.title,(0,i.jsx)(p.default,{title:(0,i.jsx)(l.FormattedMessage,{id:"app.content.edit-page"}),filename:n.frontmatter.filename})]}),(0,i.jsx)("section",{children:n.frontmatter.description})]}),(0,i.jsx)("div",{className:o.resourceContent,children:e}),(0,i.jsx)(c.default,{})]})]});return a?g:(0,i.jsx)(r.ConfigProvider,{theme:{token:{colorBgLayout:"#fff"}},children:g});};},Uw_t1QPs:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
      `});};},YVlWMxuH:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=o("nIblKo9C"),a=n._(o("JcYSrKdm")),l=e=>{let{children:t,title:o,desc:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(r.Helmet,{children:[(0,i.jsx)("title",{children:o}),(0,i.jsx)("meta",{property:"og:title",content:o}),n&&(0,i.jsx)("meta",{name:"description",content:n})]}),(0,i.jsx)("div",{style:{minHeight:"100vh"},children:t}),(0,i.jsx)(a.default,{})]});};},buQARuMc:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB");let a={1:"#fff",2:"#fafafa",3:"#f5f5f5",4:"#f0f0f0",5:"#d9d9d9",6:"#bfbfbf",7:"#8c8c8c",8:"#595959",9:"#434343",10:"#262626",11:"#1f1f1f",12:"#141414",13:"#000"};var l=()=>{let e=(0,r.useTheme)(),t=(o,n=1)=>n<=10?`
.palette-${o}-${n} {
  background: ${e[`${o}-${n}`]};
}
${t(o,n+1)}
    `:"",o=(e=1)=>e<=13?`
.palette-gray-${e} {
  background: ${a[e]};
}
${o(e+1)}
    `:"";return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
          ${o()}

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
            left: 3px;
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
            left: 0;
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
              left: 0;
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
      `});};},c0rD7Irr:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
            }
          }

          &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
            visibility: hidden;
          }
        }
      `});};},gK5Xe5Zk:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return m;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=o("WyIMPUJp"),a=o("qdGieaVz"),l=o("ODWitzHB"),d=o("nIblKo9C"),s=n._(o("iutNWXrF")),p=n._(o("PpaaEiiy")),c=n._(o("cUqL3oAL"));let u=(0,l.createStyles)(({token:e,css:t})=>{let{antCls:o,fontFamily:n,colorSplit:i}=e;return{asideContainer:t`
      min-height: 100%;
      padding-bottom: 48px;
      font-family: Avenir, ${n}, sans-serif;

      &${o}-menu-inline {
        ${o}-menu-submenu-title h4,
        > ${o}-menu-item,
        ${o}-menu-item a {
          overflow: hidden;
          font-size: ${e.fontSize}px;
          text-overflow: ellipsis;
        }

        > ${o}-menu-item-group > ${o}-menu-item-group-title {
          margin-top: ${e.margin}px;
          margin-bottom: ${e.margin}px;
          font-size: ${e.fontSize}px;

          &::after {
            position: relative;
            top: 12px;
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: ${i};
            content: '';
          }
        }

        > ${o}-menu-item,
          > ${o}-menu-submenu
          > ${o}-menu-submenu-title,
          > ${o}-menu-item-group
          > ${o}-menu-item-group-title,
          > ${o}-menu-item-group
          > ${o}-menu-item-group-list
          > ${o}-menu-item,
          &${o}-menu-inline
          > ${o}-menu-item-group
          > ${o}-menu-item-group-list
          > ${o}-menu-item {
          padding-inline-start: 40px !important;

          ${o}-row-rtl & {
            padding-inline-end: 40px !important;
            padding-inline-start: ${e.padding}px !important;
          }
        }

        // Nest Category > Type > Article
        &${o}-menu-inline {
          ${o}-menu-item-group-title {
            margin-inline-start: ${e.marginXXS}px;
            padding-inline-start: 60px;

            ${o}-row-rtl & {
              padding-inline-end: 60px;
              padding-inline-start: ${e.padding}px;
            }
          }

          ${o}-menu-item-group-list > ${o}-menu-item {
            padding-inline-start: 80px !important;

            ${o}-row-rtl & {
              padding-inline-end: 80px !important;
              padding-inline-start: ${e.padding}px !important;
            }
          }
        }

        ${o}-menu-item-group:first-child {
          ${o}-menu-item-group-title {
            margin-top: 0;
          }
        }
      }

      a[disabled] {
        color: #ccc;
      }
    `,mainMenu:t`
      z-index: 1;

      .main-menu-inner {
        position: sticky;
        top: ${e.headerHeight+e.contentMarginTop}px;
        width: 100%;
        height: 100%;
        max-height: calc(100vh - ${e.headerHeight+e.contentMarginTop}px);
        overflow: hidden;
        scrollbar-width: thin;
        scrollbar-color: unset;
      }

      &:hover .main-menu-inner {
        overflow-y: auto;
      }
    `};});var m=()=>{let e=(0,d.useSidebarData)(),{isMobile:t,theme:o}=(0,r.useContext)(c.default),{styles:n}=u(),[m,g]=(0,p.default)(),h=o.includes("dark"),{colorBgContainer:x}=(0,l.useTheme)(),f=(0,i.jsx)(a.ConfigProvider,{theme:{components:{Menu:{itemBg:x,darkItemBg:x}}},children:(0,i.jsx)(a.Menu,{items:m,inlineIndent:30,className:n.asideContainer,mode:"inline",theme:h?"dark":"light",selectedKeys:[g],defaultOpenKeys:null==e?void 0:e.map(({title:e})=>e).filter(Boolean)})});return t?(0,i.jsx)(s.default,{children:f},"Mobile-menu"):(0,i.jsx)(a.Col,{xxl:4,xl:5,lg:6,md:6,sm:24,xs:24,className:n.mainMenu,children:(0,i.jsx)("section",{className:"main-menu-inner",children:f})});};},kDKb4TzZ:function(e,t,o){o.d(t,"__esModule",{value:!0});},nvU15Dwn:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return n.default;}});var n=o("d3__vuQ2")._(o("BOY-ZQiG"));},"oTitrI-q":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return p;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=o("ODWitzHB"),a=n._(o("p_ohR-tO")),l=n._(o("0NxBInvu")),d=n._(o("gK5Xe5Zk"));let s=(0,r.createStyles)(({css:e,token:t})=>({main:e`
    display: flex;
    margin-top: ${t.contentMarginTop}px;
  `}));var p=({children:e})=>{let{styles:t}=s();return(0,i.jsxs)("main",{className:t.main,children:[(0,i.jsx)(a.default,{}),(0,i.jsx)(d.default,{}),(0,i.jsx)(l.default,{children:e})]});};},oiSVIx2a:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return c;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=o("ODWitzHB"),l=o("nIblKo9C"),d=n._(o("CgOyc9oG")),s=i._(o("av4YWks-"));let p=(0,a.createStyles)(({token:e,css:t})=>{let{headerHeight:o,colorTextHeading:n,fontFamily:i,mobileMaxWidth:r}=e;return{logo:t`
      height: ${o}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${n};
      font-weight: bold;
      font-size: 18px;
      font-family: AlibabaPuHuiTi, ${i}, sans-serif;
      line-height: ${o}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: ${n};
      }

      img {
        height: 32px;
        vertical-align: middle;
        margin-inline-end: ${e.marginSM}px;
      }

      @media only screen and (max-width: ${r}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,title:t`
      line-height: 32px;
    `};});var c=({isZhCN:e})=>{let{search:t}=(0,l.useLocation)(),{styles:o}=p();return(0,r.jsx)("h1",{children:(0,r.jsxs)(d.default,{to:s.getLocalizedPathname("/",e,t),className:o.logo,children:[(0,r.jsx)("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",height:32,width:32,alt:"logo"}),(0,r.jsx)("span",{className:o.title,children:"Ant Design"})]})});};},okmjlU7w:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return g;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=i._(o("WyIMPUJp")),l=o("qdGieaVz"),d=o("ODWitzHB"),s=n._(o("YAqr4JrW")),p=n._(o("-Txlpp_m")),c=n._(o("yhETISly"));let u=["scroll","resize"],m=(0,d.createStyles)(({token:e,css:t})=>{let{boxShadowSecondary:o,antCls:n}=e;return{affixTabs:t`
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1001;
      padding: 0 40px;
      background: #fff;
      box-shadow: ${o};
      transform: translate3d(0, -100%, 0);
      opacity: 0;
      transition:
        opacity ${e.motionDurationSlow},
        transform ${e.motionDurationSlow};

      ${n}-tabs {
        max-width: 1208px;
        margin: 0 auto;

        ${n}-tabs-nav {
          margin: 0;

          &::before {
            border-bottom-color: transparent;
          }

          ${n}-tabs-tab {
            padding: 21px 0;
          }
        }
      }
    `,affixTabsFixed:t`
      transform: translate3d(0, 0, 0);
      opacity: 1;
    `,span:t`
      text-transform: capitalize;
    `};});var g=()=>{let e=a.useRef(null),t=a.useRef([]),[o,n]=a.useState(!1),[i,d]=a.useState(void 0),{styles:{affixTabs:g,affixTabsFixed:h,span:x}}=m();function f(t){let o=document.getElementById(t);if(o){let t=o.offsetTop-e.current.offsetHeight-32;(0,c.default)(t);}}a.useEffect(()=>{let e=document.querySelectorAll("h2[id]");t.current=Array.from(e).map(({id:e})=>e),n(!0);},[]),a.useEffect(()=>{let e=decodeURIComponent((location.hash||"").slice(1));e&&f(e);},[o]);let b=a.useMemo(()=>(0,p.default)(function(){let{scrollY:o}=window,n=e.current.offsetHeight;for(let e=t.current.length-1;e>=0;e-=1){let i=t.current[e],r=document.getElementById(i),a=r.offsetTop-n-32;if(a<=o){d(i);return;}}d(void 0);}),[]);return a.useEffect(()=>(u.forEach(e=>window.addEventListener(e,b)),b(),()=>{u.forEach(e=>window.removeEventListener(e,b));}),[]),(0,r.jsx)("div",{className:(0,s.default)(g,i&&h),ref:e,children:(0,r.jsx)(l.Tabs,{activeKey:i,centered:!0,size:"large",onChange:f,items:t.current.map(e=>({key:e,label:(0,r.jsx)("span",{className:x,children:e.replace(/-/g," ")})}))})});};},pWaDzEMJ:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return d;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=n._(o("buQARuMc")),a=o("vqiIaB3-"),l=n._(o("Uw_t1QPs")),d=()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.Reset,{}),(0,i.jsx)(a.Common,{}),(0,i.jsx)(a.Markdown,{}),(0,i.jsx)(a.Highlight,{}),(0,i.jsx)(a.Demo,{}),(0,i.jsx)(a.Responsive,{}),(0,i.jsx)(a.NProgress,{}),(0,i.jsx)(a.PreviewImage,{}),(0,i.jsx)(l.default,{}),(0,i.jsx)(r.default,{}),(0,i.jsx)(a.HeadingAnchor,{}),(0,i.jsx)(a.SearchBar,{})]});},"p_ohR-tO":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("d3__vuQ2"),i=o("8Z0rk4BW"),r=n._(o("WyIMPUJp")),a=o("nIblKo9C"),l=()=>{let e=(0,a.useRouteMeta)(),[t,o]=r.default.useMemo(()=>{let t;if(e.frontmatter.subtitle||e.frontmatter.title){var o;t=`${e.frontmatter.subtitle||""} ${(null===(o=e.frontmatter)||void 0===o?void 0:o.title)||""} - Ant Design`;}else t="404 Not Found - Ant Design";let n=e.frontmatter.description||"";return[t,n];},[e]);return(0,i.jsxs)(a.Helmet,{children:[(0,i.jsx)("title",{children:t}),(0,i.jsx)("meta",{property:"og:title",content:t}),o&&(0,i.jsx)("meta",{name:"description",content:o})]});};},rUsq3K_o:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return v;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=n._(o("YAqr4JrW")),l=n._(o("Byq4qat9"));o("Kl4wHrVZ");var d=i._(o("WyIMPUJp")),s=n._(o("Ydg_2-cW")),p=n._(o("4V4Uy4B6")),c=o("nIblKo9C"),u=n._(o("I1Rkhqyq")),m=n._(o("kaZjkN4S")),g=n._(o("pWaDzEMJ")),h=n._(o("6ziP_ADh")),x=n._(o("cUqL3oAL"));o("kDKb4TzZ");var f=n._(o("YVlWMxuH")),b=n._(o("S2l11r7y")),w=n._(o("oTitrI-q"));let $={cn:{title:"Ant Design - \u4E00\u5957\u4F01\u4E1A\u7EA7 UI \u8BBE\u8BA1\u8BED\u8A00\u548C React \u7EC4\u4EF6\u5E93",description:"\u57FA\u4E8E Ant Design \u8BBE\u8BA1\u4F53\u7CFB\u7684 React UI \u7EC4\u4EF6\u5E93\uFF0C\u7528\u4E8E\u7814\u53D1\u4F01\u4E1A\u7EA7\u4E2D\u540E\u53F0\u4EA7\u54C1\u3002"},en:{title:"Ant Design - The world's second most popular React UI framework",description:"An enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises"}};var v=()=>{let e=(0,c.useOutlet)(),t=(0,m.default)(),{pathname:o,search:n,hash:i}=t,[v,k]=(0,u.default)($),y=(0,d.useRef)(null),{direction:j}=(0,d.useContext)(x.default),{loading:S}=(0,c.useSiteData)();(0,d.useLayoutEffect)(()=>{"cn"===k?l.default.locale("zh-cn"):l.default.locale("en");},[]),(0,d.useEffect)(()=>{let e=document.getElementById("nprogress-style");e&&(y.current=setTimeout(()=>{var t;null===(t=e.parentNode)||void 0===t||t.removeChild(e);},0));},[]),(0,d.useEffect)(()=>{let e=i.replace("#","");if(e){var t;null===(t=document.getElementById(decodeURIComponent(e)))||void 0===t||t.scrollIntoView();}},[S,i]),(0,d.useEffect)(()=>{void 0!==window.ga&&window.ga("send","pageview",o+n);},[t]);let _=d.default.useMemo(()=>["","/"].some(e=>e===o)||["/index"].some(e=>o.startsWith(e))?(0,r.jsx)(f.default,{title:v.title,desc:v.description,children:e}):o.startsWith("/docs/resource")?(0,r.jsx)(b.default,{children:e}):o.startsWith("/theme-editor")?e:(0,r.jsx)(w.default,{children:e}),[o,e]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.Helmet,{encodeSpecialCharacters:!1,children:[(0,r.jsx)("html",{lang:"cn"===k?"zh-CN":k,"data-direction":j,className:(0,a.default)({rtl:"rtl"===j})}),(0,r.jsx)("link",{sizes:"144x144",href:"https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png"}),(0,r.jsx)("meta",{property:"og:description",content:v.description}),(0,r.jsx)("meta",{property:"og:type",content:"website"}),(0,r.jsx)("meta",{property:"og:image",content:"https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"})]}),(0,r.jsxs)(s.default,{direction:j,locale:"cn"===k?p.default:void 0,children:[(0,r.jsx)(g.default,{}),(0,r.jsx)(h.default,{}),_]})]});};},sG6LHlzA:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("8Z0rk4BW"),i=o("u9xpdPll"),r=o("H-Dt48wQ"),a=o("ODWitzHB"),l=()=>{let e=(0,a.useTheme)(),{antCls:t}=e,o=e.colorPrimary;return(0,n.jsx)(r.Global,{styles:(0,r.css)`
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

        .markdown p > img {
          margin: 34px auto;
          box-shadow: 0 8px 20px rgba(143, 168, 191, 0.35);
          max-width: 1024px;
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

        .markdown ul > li {
          margin-inline-start: ${e.marginMD}px;
          padding-inline-start: ${e.paddingXXS}px;
          list-style-type: circle;

          .rtl & {
            margin-inline-end: ${e.marginMD}px;
            margin-inline-start: 0;
            padding-inline-end: ${e.paddingXXS}px;
            padding-inline-start: 0;
          }

          &:empty {
            display: none;
          }
        }

        .markdown ol > li {
          margin-inline-start: ${e.marginMD}px;
          padding-inline-start: ${e.paddingXXS}px;
          list-style-type: decimal;

          ${t}-row-rtl & {
            margin-inline-end: ${e.marginMD}px;
            margin-inline-start: 0;
            padding-inline-end: ${e.paddingXXS}px;
            padding-inline-start: 0;
          }
        }

        .markdown ul > li > p,
        .markdown ol > li > p {
          margin: 0.2em 0;
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
            padding: ${e.paddingSM}px ${e.paddingMD}px;
            font-size: ${e.fontSize}px;
            line-height: 2;
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
          border-left: 4px solid ${e.colorSplit};

          .rtl & {
            padding-inline-end: 0.8em;
            padding-inline-start: 0;
            border-right: 4px solid ${e.colorSplit};
            border-left: none;
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
                border-left: 1px solid ${e.colorSplit};
              }

              &:last-child {
                border-right: 1px solid ${e.colorSplit};
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
        }

        .grid-demo,
        [id^='components-grid-demo-'] {
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
            background: ${o};

            &:nth-child(2n + 1) {
              background: ${new i.TinyColor(o).setAlpha(.75).toHex8String()};
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
            background: ${new i.TinyColor(o).setAlpha(.75).toHexString()};
          }

          ${t}-row .demo-col-2,
            .code-box-demo ${t}-row .demo-col-2 {
            background: ${new i.TinyColor(o).setAlpha(.75).toHexString()};
          }

          ${t}-row .demo-col-3,
            .code-box-demo ${t}-row .demo-col-3 {
            color: #999;
            background: rgba(255, 255, 255, 0.2);
          }

          ${t}-row .demo-col-4,
            .code-box-demo ${t}-row .demo-col-4 {
            background: ${new i.TinyColor(o).setAlpha(.6).toHexString()};
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

        [id='components-grid-demo-playground'],
        [id='components-grid-demo-gutter'] {
          > .code-box-demo ${t}-row > div {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `});};},sxXrTwi7:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)(),{antCls:t,iconCls:o}=e;return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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

          &-expand-trigger {
            position: relative;
            color: #3b4357;
            font-size: ${e.fontSizeXL}px;
            cursor: pointer;
            opacity: 0.75;
            transition: all ${e.motionDurationSlow};
            &:hover {
              opacity: 1;
            }
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
            right: -16px;
            font-size: ${e.fontSizeSM}px;
            text-decoration: none;
            background: inherit;
            transform: scale(0.9);
            padding-inline-end: ${e.paddingXXS}px;

            ${o} {
              color: ${e.colorTextSecondary};
              transition: all ${e.motionDurationSlow};

              &:hover {
                color: ${e.colorText};
              }
            }

            ${t}-row${t}-row-rtl & {
              right: auto;
              left: -22px;
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

          .code-expand-icon-show,
          .code-expand-icon-hide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-shadow: none;
            transition: all 0.4s;
            user-select: none;

            ${t}-row-rtl & {
              right: 0;
              left: auto;
            }
          }

          .code-expand-icon-show {
            opacity: 0.55;
            pointer-events: auto;

            &:hover {
              opacity: 1;
            }
          }

          .code-expand-icon${t}-tooltip-open .code-expand-icon-show {
            opacity: 1;
          }

          .code-expand-icon-hide {
            opacity: 0;
            pointer-events: none;
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

            ${o} {
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

            &${o}-check {
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

          &-riddle {
            width: 14px;
            height: 14px;
            overflow: hidden;
            border: 0;
            cursor: pointer;
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
          column-gap: ${e.marginSM}px;
        }

        ${t}-row-rtl {
          #components-tooltip-demo-placement,
          #components-popover-demo-placement,
          #components-popconfirm-demo-placement {
            .code-box-demo {
              direction: ltr;
            }
          }
        }
      `});};},tPJF1xam:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return l;}});var n=o("8Z0rk4BW"),i=o("WyIMPUJp"),r=o("qdGieaVz"),a=o("VpWsiYhP"),l=({children:e,fallback:t=(0,n.jsx)(r.Skeleton.Input,{active:!0,size:"small"}),delay:o=200})=>(0,n.jsx)(a.InView,{triggerOnce:!0,delay:o,children:({inView:o,ref:r})=>(0,n.jsx)("div",{ref:r,children:(0,n.jsx)(i.Suspense,{fallback:t,children:o?e:(0,n.jsx)("span",{})})})});},tVCoUMmw:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return d;}});var n=o("8Z0rk4BW"),i=o("4i_r4BgY"),r=o("qdGieaVz"),a=o("ODWitzHB");let l=(0,a.createStyles)(({token:e,css:t})=>{let{colorIcon:o,colorText:n,iconCls:i}=e;return{editButton:t`
      a& {
        position: relative;
        top: -2px;
        display: inline-block;
        text-decoration: none;
        vertical-align: middle;
        margin-inline-start: ${e.marginXS}px;
        ${i} {
          display: block;
          color: ${o};
          font-size: ${e.fontSizeLG}px;
          transition: all ${e.motionDurationSlow};
          &:hover {
            color: ${n};
          }
        }
      }
    `};});var d=({title:e,filename:t})=>{let{styles:o}=l();return(0,n.jsx)(r.Tooltip,{title:e,children:(0,n.jsx)("a",{className:o.editButton,href:`https://github.com/ant-design/ant-design/edit/master/${t}`,target:"_blank",rel:"noopener noreferrer",children:(0,n.jsx)(i.EditOutlined,{})})});};},unIuJkWb:function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return h;}});var n=o("d3__vuQ2"),i=o("hSu6qSb4"),r=o("8Z0rk4BW"),a=o("4i_r4BgY"),l=o("qdGieaVz"),d=o("ODWitzHB"),s=o("nIblKo9C"),p=n._(o("I1Rkhqyq")),c=n._(o("CgOyc9oG")),u=i._(o("av4YWks-"));let m={cn:{design:"\u8BBE\u8BA1",development:"\u7814\u53D1",components:"\u7EC4\u4EF6",resources:"\u8D44\u6E90",blog:"\u535A\u5BA2"},en:{design:"Design",development:"Development",components:"Components",resources:"Resources",blog:"Blog"}},g=(0,d.createStyles)(({token:e})=>{let{antCls:t,iconCls:o,fontFamily:n,fontSize:i,headerHeight:r,colorPrimary:a}=e;return{nav:(0,d.css)`
      height: 100%;
      font-size: ${i}px;
      font-family: Avenir, ${n}, sans-serif;
      border: 0 !important;

      &${t}-menu-horizontal {
        border-bottom: none;

        & > ${t}-menu-item, & > ${t}-menu-submenu {
          min-width: ${64}px;
          height: ${r}px;
          padding-inline-end: ${e.paddingSM}px;
          padding-inline-start: ${e.paddingSM}px;
          line-height: ${r}px;
        }

        & ${t}-menu-submenu-title ${o} {
          margin: 0;
        }

        & > ${t}-menu-item-selected {
          a {
            color: ${a};
          }
        }
      }

      & > ${t}-menu-item, & > ${t}-menu-submenu {
        text-align: center;
      }
    `};});var h=e=>{var t,o;let{isZhCN:n,isMobile:i,responsive:d,directionText:h,onLangChange:x,onDirectionChange:f}=e,{pathname:b,search:w}=(0,s.useLocation)(),[$]=(0,p.default)(m),v=(0,s.useFullSidebarData)(),k=(null===(o=v["/docs/blog"])||void 0===o?void 0:null===(t=o[0])||void 0===t?void 0:t.children)||[],{styles:y}=g(),j=b.split("/").filter(Boolean).slice(0,-1).join("/"),S=j||"home";b.startsWith("/changelog")?S="docs/react":b.startsWith("/docs/resources")&&(S="docs/resources");let _=[],M=[{label:(0,r.jsx)("a",{href:"https://github.com/ant-design/ant-design",target:"_blank",rel:"noopener noreferrer",children:"GitHub"}),key:"github"},{label:(0,r.jsx)(s.FormattedMessage,{id:"app.header.lang"}),onClick:x,key:"switch-lang"},{label:h,onClick:f,key:"switch-direction"}];i?_=M:"crowded"===d&&(_=[{label:(0,r.jsx)(a.MenuOutlined,{}),key:"additional",children:[...M]}]);let z=[{label:(0,r.jsx)(c.default,{to:u.getLocalizedPathname("/docs/spec/introduce",n,w),children:$.design}),key:"docs/spec"},{label:(0,r.jsx)(c.default,{to:u.getLocalizedPathname("/docs/react/introduce",n,w),children:$.development}),key:"docs/react"},{label:(0,r.jsx)(c.default,{to:u.getLocalizedPathname("/components/overview/",n,w),children:$.components}),key:"components"},k.length?{label:(0,r.jsx)(c.default,{to:u.getLocalizedPathname(k.sort((e,t)=>{var o,n;return(null===(o=e.frontmatter)||void 0===o?void 0:o.date)>(null===(n=t.frontmatter)||void 0===n?void 0:n.date)?-1:1;})[0].link,n,w),children:$.blog}),key:"docs/blog"}:null,{label:(0,r.jsx)(c.default,{to:u.getLocalizedPathname("/docs/resources",n,w),children:$.resources}),key:"docs/resources"},n?{key:"mirror",label:(0,r.jsx)("a",{href:"https://ant-design.antgroup.com",target:"_blank",rel:"noreferrer",children:"\u56FD\u5185\u955C\u50CF"})}:null,..._??[]].filter(Boolean);return(0,r.jsx)(l.Menu,{mode:i?"inline":"horizontal",selectedKeys:[S],className:y.nav,disabledOverflow:!0,items:z});};},"vc-WFjjw":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.d(t,"default",{enumerable:!0,get:function(){return a;}});var n=o("8Z0rk4BW"),i=o("H-Dt48wQ"),r=o("ODWitzHB"),a=()=>{let e=(0,r.useTheme)();return(0,n.jsx)(i.Global,{styles:(0,i.css)`
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
      `});};},"vqiIaB3-":function(e,t,o){o.d(t,"__esModule",{value:!0}),o.e(t,{Common:function(){return a.default;},Demo:function(){return s.default;},HeadingAnchor:function(){return i.default;},Highlight:function(){return d.default;},Markdown:function(){return l.default;},NProgress:function(){return c.default;},PreviewImage:function(){return u.default;},Reset:function(){return r.default;},Responsive:function(){return p.default;},SearchBar:function(){return m.default;}});var n=o("d3__vuQ2"),i=n._(o("c0rD7Irr")),r=n._(o("H0YRS2Ra")),a=n._(o("5_uwWLtb")),l=n._(o("sG6LHlzA")),d=n._(o("vc-WFjjw")),s=n._(o("sxXrTwi7")),p=n._(o("7sYZX0yY")),c=n._(o("15ZpF8rZ")),u=n._(o("DTWs1hFv")),m=n._(o("0kOBH6i1"));}}]);
//# sourceMappingURL=rUsq3K_o-async.40b446de.js.map