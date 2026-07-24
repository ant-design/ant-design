(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,521249,e=>{"use strict";var a=e.i(391398),i=e.i(191788),t=e.i(844678),s=e.i(69017),r=e.i(974398),n=e.i(827830),o=e.i(64247),l=e.i(582225),c=e.i(171745),g=e.i(558222),d=e.i(729946),p=e.i(566826);let b=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg",key:"mobile",url:"https://mobile.ant.design/",imgScale:1.5,scaleOrigin:"15px"},{img:"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",key:"antv",url:"https://antv.vision/"},{img:"https://gw.alipayobjects.com/zos/bmw-prod/af1ea898-bf02-45d1-9f30-8ca851c70a5b.svg",key:"kitchen",url:"https://kitchen.alipay.com/"}],m={cn:{values:"设计价值观",valuesDesc:"确定性、意义感、生长性、自然",guide:"设计指引",guideDesc:"全局样式、设计模式",lib:"组件库",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Ant Design 移动端 UI 组件库",antv:"AntV",antvDesc:"全新一代数据可视化解决方案",kitchen:"Kitchen",kitchenDesc:"一款为设计者提升工作效率的 Sketch 工具集"},en:{values:"Design values",valuesDesc:"Certainty, Meaningfulness, Growth, Naturalness",guide:"Design guide",guideDesc:"Global style and design pattern",lib:"Components Libraries",libDesc:"Ant Design of React / Angular / Vue",mobile:"Ant Design Mobile",mobileDesc:"Mobile UI component library",antv:"AntV",antvDesc:"New generation of data visualization solutions",kitchen:"Kitchen",kitchenDesc:"Sketch Tool set for designers"}},u=(0,n.createStyles)(({cssVar:e,css:a},i)=>({card:a`
      padding: ${e.paddingSM};
      border-radius: calc(${e.borderRadius} * 2);
      background: ${i?"rgba(0, 0, 0, 0.45)":e.colorBgElevated};
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
      background: ${i?"rgba(0, 0, 0, 0.25)":"rgba(0, 0, 0, 0.02)"};
      border: ${e.lineWidth} ${e.lineType}
        ${i?"rgba(255, 255, 255, 0.45)":"rgba(0, 0, 0, 0.06)"};
      img {
        height: 48px;
      }
    `}));e.s(["default",0,()=>{let[e]=(0,l.default)(m),h=(0,n.useTheme)(),{isMobile:y}=i.default.use(g.default),{styles:v}=u(i.default.use(p.DarkContext)),{pathname:D,search:f}=(0,o.useLocation)(),x=d.isZhCN(D),k=y?24:8,j=[{img:"https://gw.alipayobjects.com/zos/bmw-prod/36a89a46-4224-46e2-b838-00817f5eb364.svg",key:"values",path:d.getLocalizedPathname("/docs/spec/values/",x,f)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/8379430b-e328-428e-8a67-666d1dd47f7d.svg",key:"guide",path:d.getLocalizedPathname("/docs/spec/colors/",x,f)},{img:"https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg",key:"lib",path:d.getLocalizedPathname("/docs/react/introduce/",x,f)}];return(0,a.jsxs)(s.Row,{gutter:[h.marginXL,h.marginXL],children:[j.map(({img:i,key:s,path:n},o)=>{let l=e[s],g=e[`${s}Desc`];return(0,a.jsx)(t.Col,{span:k,children:(0,a.jsx)(c.default,{to:n,children:(0,a.jsxs)("div",{className:v.card,children:[(0,a.jsx)("img",{draggable:!1,alt:l,src:i}),(0,a.jsx)(r.Typography.Title,{level:4,style:{marginTop:h.margin,marginBottom:h.marginXS},children:l}),(0,a.jsx)(r.Typography.Paragraph,{type:"secondary",style:{margin:0},children:g})]})})},o)}),b.map(({img:i,key:s,url:n,imgScale:o=1,scaleOrigin:l},c)=>{let g=e[s],d=e[`${s}Desc`];return(0,a.jsx)(t.Col,{span:k,children:(0,a.jsxs)("a",{className:v.cardMini,target:"_blank",href:n,rel:"noopener noreferrer",children:[(0,a.jsx)("img",{draggable:!1,alt:g,src:i,style:{transform:`scale(${o})`,transformOrigin:l}}),(0,a.jsx)(r.Typography.Title,{level:4,style:{marginTop:h.margin,marginBottom:h.marginXS},children:g}),(0,a.jsx)(r.Typography.Paragraph,{type:"secondary",style:{margin:0},children:d})]})},c)})]})}])}]);