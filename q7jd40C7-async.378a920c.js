(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["q7jd40C7"],{q7jd40C7:function(e,a,i){i.d(a,"__esModule",{value:!0}),i.d(a,"default",{enumerable:!0,get:function(){return v;}});var s=i("d3__vuQ2"),t=i("hSu6qSb4"),n=i("8Z0rk4BW"),r=i("WyIMPUJp"),l=i("qdGieaVz"),o=i("ODWitzHB"),c=i("nIblKo9C"),d=s._(i("QNVD7cvc")),g=s._(i("I1Rkhqyq")),p=s._(i("CgOyc9oG")),b=s._(i("cUqL3oAL")),u=t._(i("av4YWks-"));let h=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg",key:"mobile",url:"https://mobile.ant.design/",imgScale:1.5},{img:"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",key:"antv",url:"https://antv.vision/"},{img:"https://gw.alipayobjects.com/zos/bmw-prod/af1ea898-bf02-45d1-9f30-8ca851c70a5b.svg",key:"kitchen",url:"https://kitchen.alipay.com/"}],m={cn:{values:"\u8BBE\u8BA1\u4EF7\u503C\u89C2",valuesDesc:"\u786E\u5B9A\u6027\u3001\u610F\u4E49\u611F\u3001\u751F\u957F\u6027\u3001\u81EA\u7136",guide:"\u8BBE\u8BA1\u6307\u5F15",guideDesc:"\u5168\u5C40\u6837\u5F0F\u3001\u8BBE\u8BA1\u6A21\u5F0F",lib:"\u7EC4\u4EF6\u5E93",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Ant Design \u79FB\u52A8\u7AEF UI \u7EC4\u4EF6\u5E93",antv:"AntV",antvDesc:"\u5168\u65B0\u4E00\u4EE3\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",kitchen:"Kitchen",kitchenDesc:"\u4E00\u6B3E\u4E3A\u8BBE\u8BA1\u8005\u63D0\u5347\u5DE5\u4F5C\u6548\u7387\u7684 Sketch \u5DE5\u5177\u96C6"},en:{values:"Design values",valuesDesc:"Certainty, Meaningfulness, Growth, Naturalness",guide:"Design guide",guideDesc:"Global style and design pattern",lib:"Components Libraries",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Mobile UI component library",antv:"AntV",antvDesc:"New generation of data visualization solutions",kitchen:"Kitchen",kitchenDesc:"Sketch Tool set for designers"}},y=()=>{let e=(0,d.default)();return(0,o.createStyles)(({token:a,css:i})=>({card:i`
      padding: ${a.paddingSM}px;
      border-radius: ${2*a.borderRadius}px;
      background: ${e?"rgba(0, 0, 0, 0.45)":a.colorBgElevated};
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px rgba(0, 0, 0, 0.02);

      img {
        width: 100%;
        vertical-align: top;
        border-radius: ${a.borderRadius}px;
      }
    `,cardMini:i`
      display: block;
      border-radius: ${2*a.borderRadius}px;
      padding: ${a.paddingMD}px ${a.paddingLG}px;
      background: ${e?"rgba(0, 0, 0, 0.25)":"rgba(0, 0, 0, 0.02)"};
      border: 1px solid ${e?"rgba(255, 255, 255, 0.45)":"rgba(0, 0, 0, 0.06)"};

      img {
        height: 48px;
      }
    `}))();};var v=()=>{let[e]=(0,g.default)(m),a=(0,o.useTheme)(),{styles:i}=y(),{pathname:s,search:t}=(0,c.useLocation)(),d=u.isZhCN(s),{isMobile:v}=(0,r.useContext)(b.default),x=v?24:8,f=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/36a89a46-4224-46e2-b838-00817f5eb364.svg",key:"values",path:u.getLocalizedPathname("/docs/spec/values/",d,t)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/8379430b-e328-428e-8a67-666d1dd47f7d.svg",key:"guide",path:u.getLocalizedPathname("/docs/spec/colors/",d,t)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg",key:"lib",path:u.getLocalizedPathname("/docs/react/introduce/",d,t)}];return(0,n.jsxs)(l.Row,{gutter:[a.marginXL,a.marginXL],children:[f.map(({img:s,key:t,path:r},o)=>{let c=e[t],d=e[`${t}Desc`];return(0,n.jsx)(l.Col,{span:x,children:(0,n.jsx)(p.default,{to:r,children:(0,n.jsxs)("div",{className:i.card,children:[(0,n.jsx)("img",{alt:c,src:s}),(0,n.jsx)(l.Typography.Title,{level:4,style:{marginTop:a.margin,marginBottom:a.marginXS},children:c}),(0,n.jsx)(l.Typography.Paragraph,{type:"secondary",style:{margin:0},children:d})]})})},o);}),h.map(({img:s,key:t,url:r,imgScale:o=1},c)=>{let d=e[t],g=e[`${t}Desc`];return(0,n.jsx)(l.Col,{span:x,children:(0,n.jsxs)("a",{className:i.cardMini,target:"_blank",href:r,rel:"noreferrer",children:[(0,n.jsx)("img",{alt:d,src:s,style:{transform:`scale(${o})`}}),(0,n.jsx)(l.Typography.Title,{level:4,style:{marginTop:a.margin,marginBottom:a.marginXS},children:d}),(0,n.jsx)(l.Typography.Paragraph,{type:"secondary",style:{margin:0},children:g})]})},c);})]});};}}]);
//# sourceMappingURL=q7jd40C7-async.378a920c.js.map