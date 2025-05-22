(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["a3aa6524"],{"1b87ba52":function(e,l,a){"use strict";a.d(l,"__esModule",{value:!0}),a.d(l,"default",{enumerable:!0,get:function(){return n;}});var t=a("f19d2b93"),i=a("a9d1a279"),n=e=>{let{item:{username:l,url:a}={}}=e;return(null==l?void 0:l.includes("github-actions"))?null:(0,t.jsx)(i.Tooltip,{title:l,children:(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:`https://github.com/${l}`,target:"_blank",rel:"noopener noreferrer",children:(0,t.jsx)(i.Avatar,{size:"small",src:a,alt:l,children:l})})})});};},a3aa6524:function(e,l,a){"use strict";a.d(l,"__esModule",{value:!0}),a.d(l,"default",{enumerable:!0,get:function(){return b;}});var t=a("777fffbe"),i=a("f19d2b93"),n=t._(a("5b220c3d")),r=t._(a("868f756d")),s=a("3835a2b7"),d=t._(a("600aabe0")),o=a("9c86e52a"),u=t._(a("714a8bde")),f=t._(a("1b87ba52"));let c=(0,s.createStyles)(({token:e,css:l})=>({listMobile:l`
    margin: 1em 0 !important;
  `,title:l`
    font-size: ${e.fontSizeSM}px;
    opacity: 0.5;
    margin-bottom: ${e.marginXS}px;
  `,list:l`
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
  `}));var b=({filename:e})=>{let{formatMessage:l}=(0,o.useIntl)(),{styles:a}=c(),{isMobile:t}=n.default.use(u.default);return e?(0,i.jsxs)("div",{className:(0,d.default)({[a.listMobile]:t}),children:[(0,i.jsx)("div",{className:a.title,children:l({id:"app.content.contributors"})}),(0,i.jsx)(r.default,{cache:!0,repo:"ant-design",owner:"ant-design",fileName:e,className:a.list,renderItem:(e,l)=>(0,i.jsx)(f.default,{item:e,loading:l},null==e?void 0:e.url)})]}):null;};}}]);