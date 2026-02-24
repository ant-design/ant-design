(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["abb8dde3"],{abb8dde3:function(e,a,s){"use strict";s.d(a,"__esModule",{value:!0}),s.d(a,"default",{enumerable:!0,get:function(){return f;}});var i=s("777fffbe"),t=s("852bbaa9"),n=s("f19d2b93"),r=i._(s("5b220c3d")),l=s("a9d1a279"),o=s("3835a2b7"),d=s("9c86e52a"),c=i._(s("23546486")),g=i._(s("0a03b273")),b=i._(s("714a8bde")),p=t._(s("e67f7d0e")),u=s("40d543ed");let m=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg",key:"mobile",url:"https://mobile.ant.design/",imgScale:1.5,scaleOrigin:"15px"},{img:"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",key:"antv",url:"https://antv.vision/"},{img:"https://gw.alipayobjects.com/zos/bmw-prod/af1ea898-bf02-45d1-9f30-8ca851c70a5b.svg",key:"kitchen",url:"https://kitchen.alipay.com/"}],h={cn:{values:"\u8BBE\u8BA1\u4EF7\u503C\u89C2",valuesDesc:"\u786E\u5B9A\u6027\u3001\u610F\u4E49\u611F\u3001\u751F\u957F\u6027\u3001\u81EA\u7136",guide:"\u8BBE\u8BA1\u6307\u5F15",guideDesc:"\u5168\u5C40\u6837\u5F0F\u3001\u8BBE\u8BA1\u6A21\u5F0F",lib:"\u7EC4\u4EF6\u5E93",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Ant Design \u79FB\u52A8\u7AEF UI \u7EC4\u4EF6\u5E93",antv:"AntV",antvDesc:"\u5168\u65B0\u4E00\u4EE3\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848",kitchen:"Kitchen",kitchenDesc:"\u4E00\u6B3E\u4E3A\u8BBE\u8BA1\u8005\u63D0\u5347\u5DE5\u4F5C\u6548\u7387\u7684 Sketch \u5DE5\u5177\u96C6"},en:{values:"Design values",valuesDesc:"Certainty, Meaningfulness, Growth, Naturalness",guide:"Design guide",guideDesc:"Global style and design pattern",lib:"Components Libraries",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Mobile UI component library",antv:"AntV",antvDesc:"New generation of data visualization solutions",kitchen:"Kitchen",kitchenDesc:"Sketch Tool set for designers"}},y=(0,o.createStyles)(({cssVar:e,css:a},s)=>({card:a`
      padding: ${e.paddingSM};
      border-radius: calc(${e.borderRadius} * 2);
      background: ${s?"rgba(0, 0, 0, 0.45)":e.colorBgElevated};
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px rgba(0, 0, 0, 0.02);

      img {
        width: 100%;
        vertical-align: top;
        border-radius: ${e.borderRadius};
      }
    `,cardMini:a`
      display: block;
      border-radius: calc(${e.borderRadius} * 2);
      padding: ${e.paddingMD} ${e.paddingLG};
      background: ${s?"rgba(0, 0, 0, 0.25)":"rgba(0, 0, 0, 0.02)"};
      border: 1px solid ${s?"rgba(255, 255, 255, 0.45)":"rgba(0, 0, 0, 0.06)"};

      img {
        height: 48px;
      }
    `}));var f=()=>{let[e]=(0,c.default)(h),a=(0,o.useTheme)(),{isMobile:s}=r.default.use(b.default),{styles:i}=y(r.default.use(u.DarkContext)),{pathname:t,search:f}=(0,d.useLocation)(),v=p.isZhCN(t),x=s?24:8,D=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/36a89a46-4224-46e2-b838-00817f5eb364.svg",key:"values",path:p.getLocalizedPathname("/docs/spec/values/",v,f)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/8379430b-e328-428e-8a67-666d1dd47f7d.svg",key:"guide",path:p.getLocalizedPathname("/docs/spec/colors/",v,f)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg",key:"lib",path:p.getLocalizedPathname("/docs/react/introduce/",v,f)}];return(0,n.jsxs)(l.Row,{gutter:[a.marginXL,a.marginXL],children:[D.map(({img:s,key:t,path:r},o)=>{let d=e[t],c=e[`${t}Desc`];return(0,n.jsx)(l.Col,{span:x,children:(0,n.jsx)(g.default,{to:r,children:(0,n.jsxs)("div",{className:i.card,children:[(0,n.jsx)("img",{draggable:!1,alt:d,src:s}),(0,n.jsx)(l.Typography.Title,{level:4,style:{marginTop:a.margin,marginBottom:a.marginXS},children:d}),(0,n.jsx)(l.Typography.Paragraph,{type:"secondary",style:{margin:0},children:c})]})})},o);}),m.map(({img:s,key:t,url:r,imgScale:o=1,scaleOrigin:d},c)=>{let g=e[t],b=e[`${t}Desc`];return(0,n.jsx)(l.Col,{span:x,children:(0,n.jsxs)("a",{className:i.cardMini,target:"_blank",href:r,rel:"noreferrer",children:[(0,n.jsx)("img",{draggable:!1,alt:g,src:s,style:{transform:`scale(${o})`,transformOrigin:d}}),(0,n.jsx)(l.Typography.Title,{level:4,style:{marginTop:a.margin,marginBottom:a.marginXS},children:g}),(0,n.jsx)(l.Typography.Paragraph,{type:"secondary",style:{margin:0},children:b})]})},c);})]});};}}]);