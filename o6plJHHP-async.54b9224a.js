(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["o6plJHHP"],{G4e6Upqg:function(e,t,l){l.d(t,"__esModule",{value:!0}),l.d(t,"default",{enumerable:!0,get:function(){return r;}});var i=l("8Z0rk4BW"),n=l("qdGieaVz");let a=({num:e=3})=>(0,i.jsx)("li",{children:Array.from({length:e}).map((e,t)=>(0,i.jsx)(n.Skeleton.Avatar,{size:"small",active:!0,style:{marginInlineStart:0===t?0:-8}},t))});var r=e=>{let{item:{username:t,url:l}={},loading:r}=e;return r?(0,i.jsx)(a,{}):(null==t?void 0:t.includes("github-actions"))?null:(0,i.jsx)(n.Tooltip,{title:t,children:(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:`https://github.com/${t}`,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)(n.Avatar,{size:"small",src:l,alt:t,children:t})})})});};},o6plJHHP:function(e,t,l){l.d(t,"__esModule",{value:!0}),l.d(t,"default",{enumerable:!0,get:function(){return p;}});var i=l("d3__vuQ2"),n=l("8Z0rk4BW"),a=l("WyIMPUJp"),r=i._(l("ho91be5B")),o=l("ODWitzHB"),s=i._(l("YAqr4JrW")),d=l("nIblKo9C"),u=i._(l("cUqL3oAL")),c=i._(l("G4e6Upqg"));let m=(0,o.createStyles)(({token:e,css:t})=>({contributorsList:t`
    margin-top: 120px !important;
  `,listMobile:t`
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
  `}));var p=({filename:e})=>{let{formatMessage:t}=(0,d.useIntl)(),{styles:l}=m(),{isMobile:i}=(0,a.useContext)(u.default);return e?(0,n.jsxs)("div",{className:(0,s.default)(l.contributorsList,{[l.listMobile]:i}),children:[(0,n.jsx)("div",{className:l.title,children:t({id:"app.content.contributors"})}),(0,n.jsx)(r.default,{cache:!0,repo:"ant-design",owner:"ant-design",fileName:e,className:l.list,renderItem:(e,t)=>(0,n.jsx)(c.default,{item:e,loading:t},null==e?void 0:e.url)})]}):null;};}}]);
//# sourceMappingURL=o6plJHHP-async.54b9224a.js.map