(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["702afa58"],{"4963a8ca":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{COLOR_IMAGES:function(){return i;},DEFAULT_COLOR:function(){return r;},PINK_COLOR:function(){return l;},PRESET_COLORS:function(){return s;},getAvatarURL:function(){return c;},getClosetColor:function(){return n;}});var o=a("6bff97df");let r="#1677FF",l="#ED4192",i=[{color:r,url:null,webp:null},{color:"#5A54F9",url:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*H8nRT7_q0EwAAAAAAAAAAAAADrJ8AQ/original",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*H8nRT7_q0EwAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:"#9E339F",url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*FMluR4vJhaQAAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*CMCMTKV51tIAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:l,url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DGZXS4YOGp0AAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*s5OdR6wZZIkAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:"#E0282E",url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*w6xcR7MriwEAAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HE_4Qp_XfQQAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:"#F4801A",url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VWFOTbEyU9wAAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xTG2QbottAQAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:"#F2BD27",url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1yydQLzw5nYAAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hbPfSbF-xPIAAAAAAAAAAAAADrJ8AQ/fmt.webp"},{color:"#00B96B",url:"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*XpGeRoZKGycAAAAAAAAAAAAAARQnAQ",webp:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*iM6CQ496P3oAAAAAAAAAAAAADrJ8AQ/fmt.webp"}],s=i.map(({color:e})=>e);function n(e){if(!e)return null;let t=(0,o.generateColor)(e).toRgb(),a=i.map(({color:e})=>{let a=(0,o.generateColor)(e).toRgb();return{color:e,dist:Math.sqrt((a.r-t.r)**2+(a.g-t.g)**2+(a.b-t.b)**2)};}).sort((e,t)=>e.dist-t.dist)[0];return a.dist<=33?a.color:null;}function c(e){var t;let a=n(e);return a?(null===(t=i.find(e=>e.color===a))||void 0===t?void 0:t.url)||"https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*CLp0Qqc11AkAAAAAAAAAAAAAARQnAQ":null;}},"5cf5a5ca":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return A;}});var o=a("f19d2b93"),r=a("5b220c3d"),l=a("a9d1a279"),i=a("3835a2b7"),s=a("b055b5cb");let n=(0,i.createStyles)(()=>{let{carousel:e}=(0,s.getCarouselStyle)();return{carousel:e,container:(0,i.css)`
      position: relative;
    `,title:(0,i.css)`
      position: absolute;
      top: 15%;
      z-index: 1;
      width: 100%;
      text-align: center;
    `,img:(0,i.css)`
      width: 100%;
    `};}),c=[{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KsMrRZaciFcAAAAAAAAAAAAADrJ8AQ/original",titleColor:"rgba(0,0,0,.88)"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3FkqR6XRNgoAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cSX_RbD3k9wAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*MldsRZeax6EAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xCAmSL0xlZ8AAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*vCfCSbiI_VIAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xCAmSL0xlZ8AAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BeDBTY9UnXIAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"},{imageSrc:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Q63XTbk8YaMAAAAAAAAAAAAADrJ8AQ/original",titleColor:"#fff"}];var A=e=>{let{styles:t}=n(),{id:a,title:s,description:A}=e,m=(0,i.useTheme)(),[d,u]=(0,r.useState)(0);return(0,o.jsxs)("div",{className:t.container,children:[(0,o.jsxs)("div",{className:t.title,children:[(0,o.jsx)(l.Typography.Title,{id:a,level:1,style:{fontWeight:900,color:c[d].titleColor,fontSize:m.fontSizeHeading2},children:s}),(0,o.jsx)(l.Typography.Paragraph,{style:{marginBottom:m.marginXXL,color:c[d].titleColor},children:A})]}),(0,o.jsx)(l.Carousel,{className:t.carousel,afterChange:u,children:c.map((e,a)=>(0,o.jsx)("div",{children:(0,o.jsx)("img",{draggable:!1,src:e.imageSrc,className:t.img,alt:"carousel"})},a))})]});};},"702afa58":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return $;}});var o=a("777fffbe"),r=a("852bbaa9"),l=a("f19d2b93"),i=r._(a("5b220c3d")),s=a("32dfb157"),n=a("47413d36"),c=a("e22febe0"),A=a("a9d1a279"),m=a("3835a2b7"),d=a("6bff97df"),u=a("c84cdf47"),g=a("9c86e52a"),h=o._(a("23546486")),p=o._(a("7483ba91")),b=o._(a("714a8bde")),f=a("e67f7d0e"),x=o._(a("9f73cc0c")),y=a("b055b5cb"),j=a("40d543ed"),v=o._(a("7e0d71f5")),C=o._(a("9f364c89")),w=a("4963a8ca"),k=o._(a("5cf5a5ca")),_=o._(a("8af9804b")),D=o._(a("994291a1"));let{Header:T,Content:S,Sider:F}=A.Layout,R=()=>(A.theme.useToken(),null),L={cn:{themeTitle:"\u5B9A\u5236\u4E3B\u9898\uFF0C\u968F\u5FC3\u6240\u6B32",themeDesc:"Ant Design \u5F00\u653E\u66F4\u591A\u6837\u5F0F\u7B97\u6CD5\uFF0C\u8BA9\u4F60\u5B9A\u5236\u4E3B\u9898\u66F4\u7B80\u5355",customizeTheme:"\u5B9A\u5236\u4E3B\u9898",myTheme:"\u6211\u7684\u4E3B\u9898",titlePrimaryColor:"\u4E3B\u8272",titleBorderRadius:"\u5706\u89D2",titleCompact:"\u5BBD\u677E\u5EA6",default:"\u9ED8\u8BA4",compact:"\u7D27\u51D1",titleTheme:"\u4E3B\u9898",light:"\u4EAE\u8272",dark:"\u6697\u9ED1",toDef:"\u6DF1\u5EA6\u5B9A\u5236",toUse:"\u53BB\u4F7F\u7528"},en:{themeTitle:"Flexible theme customization",themeDesc:"Ant Design enable extendable algorithm, make custom theme easier",customizeTheme:"Customize Theme",myTheme:"My Theme",titlePrimaryColor:"Primary Color",titleBorderRadius:"Border Radius",titleCompact:"Compact",titleTheme:"Theme",default:"Default",compact:"Compact",light:"Light",dark:"Dark",toDef:"More",toUse:"Apply"}},Q=(0,m.createStyles)(({cssVar:e,css:t,cx:a})=>{let{carousel:o}=(0,y.getCarouselStyle)(),r=t`
    overflow: hidden;
    background: rgba(240, 242, 245, 0.25);
    backdrop-filter: blur(50px);
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    transition: all ${e.motionDurationSlow};
  `;return{demo:r,otherDemo:t`
      &.${a(r)} {
        backdrop-filter: blur(10px);
        background: rgba(247, 247, 247, 0.5);
      }
    `,darkDemo:t`
      &.${a(r)} {
        background: #000;
      }
    `,larkDemo:t`
      &.${a(r)} {
        // background: #f7f7f7;
        background: rgba(240, 242, 245, 0.65);
      }
    `,comicDemo:t`
      &.${a(r)} {
        // background: #ffe4e6;
        background: rgba(240, 242, 245, 0.65);
      }
    `,menu:t`
      margin-inline-start: auto;
    `,header:t`
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${e.colorSplit};
      padding-inline: ${e.paddingLG} !important;
      height: calc(${e.controlHeightLG} * 1.2);
      line-height: calc(${e.controlHeightLG} * 1.2);
    `,headerDark:t`
      border-bottom-color: rgba(255, 255, 255, 0.1);
    `,avatar:t`
      width: ${e.controlHeight};
      height: ${e.controlHeight};
      border-radius: 100%;
      background: rgba(240, 240, 240, 0.75);
      background-size: cover;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    `,avatarDark:t`
      background: rgba(200, 200, 200, 0.3);
    `,logo:t`
      display: flex;
      align-items: center;
      column-gap: ${e.padding};

      h1 {
        font-weight: 400;
        font-size: ${e.fontSizeLG};
        line-height: 1.5;
      }
    `,logoImg:t`
      width: 30px;
      height: 30px;
      overflow: hidden;

      img {
        width: 30px;
        height: 30px;
        vertical-align: top;
      }
    `,transBg:t`
      background: transparent !important;
    `,form:t`
      width: 100%;
      margin: 0 auto;
    `,pos:t`
      position: absolute;
    `,leftTopImagePos:t`
      inset-inline-start: 0;
      top: -100px;
      height: 500px;
    `,rightBottomPos:t`
      inset-inline-end: 0;
      bottom: -100px;
      height: 287px;
    `,leftTopImage:t`
      inset-inline-start: 50%;
      transform: translate3d(-900px, 0, 0);
      top: -100px;
      height: 500px;
    `,rightBottomImage:t`
      inset-inline-end: 50%;
      transform: translate3d(750px, 0, 0);
      bottom: -100px;
      height: 287px;
    `,motion:t`
      transition: all ${e.motionDurationSlow};
    `,op1:t`
      opacity: 1;
    `,op0:t`
      opacity: 0;
    `,carousel:o};}),O=[{key:"Design Values",label:"Design Values"},{key:"Global Styles",label:"Global Styles"},{key:"Themes",label:"Themes"},{key:"DesignPatterns",label:"Design Patterns"}],P=[{key:"Design",label:"Design",icon:(0,l.jsx)(c.FolderOutlined,{}),children:O},{key:"Development",label:"Development",icon:(0,l.jsx)(c.FolderOutlined,{})}],M={themeType:"default",colorPrimary:"#1677FF",borderRadius:6,compact:"default"},B={default:{},dark:{borderRadius:2},lark:{colorPrimary:"#00B96B",borderRadius:4},comic:{colorPrimary:w.PINK_COLOR,borderRadius:16},v4:{...s.defaultTheme.token}},E=e=>e/255;var $=()=>{let{styles:e}=Q(),[t,a]=(0,h.default)(L),o="cn"===a,{search:r}=(0,g.useLocation)(),[m,y]=i.useState(M),$=(e,t)=>{i.startTransition(()=>{y({...B[t.themeType],...t});});},{compact:I,themeType:N,colorPrimary:z,...H}=m,J="dark"!==N,[G]=A.Form.useForm(),{isMobile:U}=i.use(b.default),K=i.useMemo(()=>"string"==typeof z?z:z.toHexString(),[z]),V=i.useMemo(()=>{let e=[J?A.theme.defaultAlgorithm:A.theme.darkAlgorithm];return"compact"===I&&e.push(A.theme.compactAlgorithm),"v4"===N&&e.push(s.defaultAlgorithm),e;},[J,I,N]);i.useEffect(()=>{let e={...M,themeType:N,...B[N]};y(e),G.setFieldsValue(e);},[G,N]);let X=i.use(j.DarkContext);i.useEffect(()=>{$({},{...m,themeType:X?"dark":"default"});},[X]);let q=(0,w.getClosetColor)(K),[Z,W]=i.useMemo(()=>{let e=A.theme.defaultAlgorithm({...A.theme.defaultConfig.token,colorPrimary:K});return["dark"===N?"#393F4A":q===w.DEFAULT_COLOR?"#F5F8FF":e.colorPrimaryHover,e.colorPrimaryBgHover];},[N,q,K]),Y=i.useMemo(()=>{let e=(0,d.generateColor)(K).toHsb();return e.b=Math.min(e.b,.7),(0,d.generateColor)(e).toHexString();},[K]),ee=i.useMemo(()=>({token:{...H,colorPrimary:K},algorithm:V,components:{Layout:J?{headerBg:"transparent",bodyBg:"transparent"}:{},Menu:J?{itemBg:"transparent",subMenuItemBg:"transparent",activeBarBorderWidth:0}:{},..."v4"===N?s.defaultTheme.components:{}}}),[H,K,V,J,N]),et=(0,l.jsxs)(A.ConfigProvider,{theme:ee,children:[(0,l.jsx)(R,{}),(0,l.jsx)("div",{className:(0,u.clsx)(e.demo,{[e.otherDemo]:J&&q!==w.DEFAULT_COLOR&&e.otherDemo,[e.darkDemo]:!J}),style:{borderRadius:m.borderRadius},children:(0,l.jsxs)(A.Layout,{className:e.transBg,children:[(0,l.jsxs)(T,{className:(0,u.clsx)(e.header,e.transBg,!J&&e.headerDark),children:[(0,l.jsxs)("div",{className:e.logo,children:[(0,l.jsx)("div",{className:e.logoImg,children:(0,l.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",style:{filter:q===w.DEFAULT_COLOR?void 0:function(e){let{r:t,g:a,b:o}=new n.FastColor(e).toRgb(),r=100*E(t),l=1e4*Math.max(E(t),E(a),E(o)),i=(180*Math.atan2(Math.sqrt(3)*(E(a)-E(o)),2*E(t)-E(a)-E(o))/Math.PI+360)%360;return`invert(${r}%) sepia(100%) saturate(${l}%) hue-rotate(${i}deg)`;}(Y)},alt:"antd logo"})}),(0,l.jsx)("h1",{children:"Ant Design"})]}),(0,l.jsxs)(A.Flex,{className:e.menu,gap:"middle",children:[(0,l.jsx)(c.BellOutlined,{}),(0,l.jsx)(c.QuestionCircleOutlined,{}),(0,l.jsx)("div",{className:(0,u.clsx)(e.avatar,{[e.avatarDark]:"dark"===N}),style:{backgroundColor:W,backgroundImage:`url(${(0,w.getAvatarURL)(q)})`}})]})]}),(0,l.jsxs)(A.Layout,{className:e.transBg,hasSider:!0,children:[(0,l.jsx)(F,{className:(0,u.clsx)(e.transBg),width:200,children:(0,l.jsx)(A.Menu,{mode:"inline",className:(0,u.clsx)(e.transBg),selectedKeys:["Themes"],openKeys:["Design"],style:{height:"100%",borderInlineEnd:0},items:P,expandIcon:!1})}),(0,l.jsxs)(A.Layout,{className:e.transBg,style:{padding:"0 24px 24px"},children:[(0,l.jsx)(A.Breadcrumb,{style:{margin:"16px 0"},items:[{title:(0,l.jsx)(c.HomeOutlined,{})},{title:"Design",menu:{items:O}},{title:"Themes"}]}),(0,l.jsxs)(S,{children:[(0,l.jsx)(A.Typography.Title,{level:2,children:t.customizeTheme}),(0,l.jsx)(A.Card,{title:t.myTheme,extra:(0,l.jsxs)(A.Flex,{gap:"small",children:[(0,l.jsx)(p.default,{to:(0,f.getLocalizedPathname)("/theme-editor",o,r),children:t.toDef}),(0,l.jsx)(p.default,{type:"primary",to:(0,f.getLocalizedPathname)("/docs/react/customize-theme",o,r),children:t.toUse})]}),children:(0,l.jsxs)(A.Form,{form:G,initialValues:m,onValuesChange:$,labelCol:{span:3},wrapperCol:{span:21},className:e.form,children:[(0,l.jsx)(A.Form.Item,{label:t.titleTheme,name:"themeType",children:(0,l.jsx)(D.default,{})}),(0,l.jsx)(A.Form.Item,{label:t.titlePrimaryColor,name:"colorPrimary",children:(0,l.jsx)(C.default,{})}),(0,l.jsx)(A.Form.Item,{label:t.titleBorderRadius,name:"borderRadius",children:(0,l.jsx)(_.default,{})}),(0,l.jsx)(A.Form.Item,{label:t.titleCompact,name:"compact",htmlFor:"compact_default",children:(0,l.jsx)(A.Radio.Group,{options:[{label:t.default,value:"default",id:"compact_default"},{label:t.compact,value:"compact"}]})})]})})]})]})]})]})})]});return U?(0,l.jsx)(k.default,{title:t.themeTitle,description:t.themeDesc,id:"flexible"}):(0,l.jsx)(x.default,{title:t.themeTitle,titleColor:function(e,t){if(!t)return"#FFF";let a=(0,d.generateColor)(e);switch((0,w.getClosetColor)(e)){case w.DEFAULT_COLOR:case w.PINK_COLOR:case"#F2BD27":return;case"#5A54F9":case"#E0282E":return"#FFF";default:return a.toHsb().b<.7?"#FFF":void 0;}}(K,J),description:t.themeDesc,id:"flexible",background:Z,decoration:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:(0,u.clsx)(e.motion,J&&q===w.DEFAULT_COLOR?e.op1:e.op0),children:[(0,l.jsx)("img",{draggable:!1,className:(0,u.clsx)(e.pos,e.leftTopImage),src:"https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg",alt:"image-left-top"}),(0,l.jsx)("img",{draggable:!1,className:(0,u.clsx)(e.pos,e.rightBottomImage),src:"https://gw.alipayobjects.com/zos/bmw-prod/84ad805a-74cb-4916-b7ba-9cdc2bdec23a.svg",alt:"image-right-bottom"})]}),(0,l.jsxs)("div",{className:(0,u.clsx)(e.motion,J&&q?e.op0:e.op1),children:[(0,l.jsx)("img",{draggable:!1,className:(0,u.clsx)(e.pos,e.leftTopImagePos),src:"https://gw.alipayobjects.com/zos/bmw-prod/a213184a-f212-4afb-beec-1e8b36bb4b8a.svg",alt:"image-left-top"}),(0,l.jsx)("img",{draggable:!1,className:(0,u.clsx)(e.pos,e.rightBottomPos),src:"https://gw.alipayobjects.com/zos/bmw-prod/bb74a2fb-bff1-4d0d-8c2d-2ade0cd9bb0d.svg",alt:"image-right-bottom"})]}),(0,l.jsx)(v.default,{isLight:J,colorPrimary:K})]}),children:et});};},"7e0d71f5":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return u;}});var o=a("852bbaa9"),r=a("f19d2b93"),l=o._(a("5b220c3d")),i=a("075f6a63"),s=a("3835a2b7"),n=a("c84cdf47"),c=a("4963a8ca");let A=(0,s.createStyles)(({cssVar:e})=>({image:(0,s.css)`
    transition: all ${e.motionDurationSlow};
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: right top;
  `})),m=()=>({opacity:1}),d=()=>({opacity:0});var u=({colorPrimary:e,isLight:t})=>{let a=(0,l.useMemo)(()=>(0,c.getClosetColor)(e),[e]),{styles:o}=A(),[s,u]=(0,l.useState)([]);return l.default.useLayoutEffect(()=>{u([a]);},[a]),(0,r.jsx)(i.CSSMotionList,{keys:s,motionName:"transition",onEnterStart:d,onAppearStart:d,onEnterActive:m,onAppearActive:m,onLeaveStart:m,onLeaveActive:d,motionDeadline:500,children:({key:e,className:a,style:l})=>{let i=(0,n.clsx)(o.image,a),s=c.COLOR_IMAGES.find(t=>t.color===e);if(!s||!s.url)return null;let{opacity:A}=l||{};return(0,r.jsxs)("picture",{children:[(0,r.jsx)("source",{srcSet:s.webp,type:"image/webp"}),(0,r.jsx)("source",{srcSet:s.url,type:"image/jpeg"}),(0,r.jsx)("img",{draggable:!1,className:i,style:{...l,opacity:t?A:0},src:s.url,alt:"bg"})]});}});};},"8af9804b":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return l;}});var o=a("f19d2b93"),r=a("a9d1a279"),l=({id:e,value:t,onChange:a})=>(0,o.jsxs)(r.Flex,{gap:"large",children:[(0,o.jsx)(r.InputNumber,{value:t,onChange:a,style:{width:120},min:0,formatter:e=>`${e}px`,parser:e=>null==e?void 0:e.replace("px",""),id:e}),(0,o.jsx)(r.Slider,{tooltip:{open:!1},style:{width:128},min:0,value:t,max:20,onChange:a})]});},"994291a1":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.e(t,{THEMES:function(){return c;},default:function(){return d;}});var o=a("777fffbe"),r=a("f19d2b93"),l=a("a9d1a279"),i=a("3835a2b7"),s=a("c84cdf47"),n=o._(a("23546486"));let c={default:"https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg",dark:"https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg",lark:"https://gw.alipayobjects.com/zos/bmw-prod/3e899b2b-4eb4-4771-a7fc-14c7ff078aed.svg",comic:"https://gw.alipayobjects.com/zos/bmw-prod/ed9b04e8-9b8d-4945-8f8a-c8fc025e846f.svg",v4:"https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bOiWT4-34jkAAAAAAAAAAAAADrJ8AQ/original"},A={cn:{default:"\u9ED8\u8BA4",dark:"\u6697\u9ED1",lark:"\u77E5\u8BC6\u534F\u4F5C",comic:"\u6843\u82B1\u7F18",v4:"V4 \u4E3B\u9898"},en:{default:"Default",dark:"Dark",lark:"Document",comic:"Blossom",v4:"V4 Theme"}},m=(0,i.createStyles)(({cssVar:e,css:t})=>({themeCard:t`
    border-radius: ${e.borderRadius};
    cursor: pointer;
    transition: all ${e.motionDurationSlow};
    overflow: hidden;
    display: inline-block;

    & > input[type='radio'] {
      width: 0;
      height: 0;
      opacity: 0;
      position: absolute;
    }

    img {
      vertical-align: top;
      box-shadow:
        0 3px 6px -4px rgba(0, 0, 0, 0.12),
        0 6px 16px 0 rgba(0, 0, 0, 0.08),
        0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }

    &:focus-within,
    &:hover {
      transform: scale(1.04);
    }
  `,themeCardActive:t`
    box-shadow:
      0 0 0 1px ${e.colorBgContainer},
      0 0 0 calc(${e.controlOutlineWidth} * 2 + 1px) ${e.colorPrimary};
    &,
    &:hover:not(:focus-within) {
      transform: scale(1);
    }
  `}));var d=e=>{let{value:t,id:a,onChange:o}=e,{styles:i}=m(),[d]=(0,n.default)(A);return(0,r.jsx)(l.Flex,{gap:"large",wrap:!0,children:Object.keys(c).map((e,n)=>(0,r.jsxs)(l.Flex,{vertical:!0,gap:"small",justify:"center",align:"center",children:[(0,r.jsxs)("label",{onClick:()=>null==o?void 0:o(e),className:(0,s.clsx)(i.themeCard,{[i.themeCardActive]:t===e}),children:[(0,r.jsx)("input",{type:"radio",name:"theme",id:0===n?a:void 0}),(0,r.jsx)("img",{draggable:!1,src:c[e],alt:e})]}),(0,r.jsx)("span",{children:d[e]})]},e))});};},"9f364c89":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return u;}});var o=a("852bbaa9"),r=a("f19d2b93"),l=o._(a("5b220c3d")),i=a("a9d1a279"),s=a("3835a2b7"),n=a("6bff97df"),c=a("c84cdf47"),A=a("4963a8ca");let m=(0,s.createStyles)(({cssVar:e,css:t})=>({color:t`
    width: calc(${e.controlHeightLG} / 2);
    height: calc(${e.controlHeightLG} / 2);
    border-radius: 100%;
    cursor: pointer;
    transition: all ${e.motionDurationFast};
    display: inline-block;

    & > input[type='radio'] {
      width: 0;
      height: 0;
      opacity: 0;
    }

    &:focus-within {
      // need ？
    }
  `,colorActive:t`
    box-shadow:
      0 0 0 1px ${e.colorBgContainer},
      0 0 0 calc(${e.controlOutlineWidth} * 2 + 1) ${e.colorPrimary};
  `})),d=e=>{let{value:t,children:a,onChange:o}=e,[s,n]=(0,l.useState)(t);return(0,l.useEffect)(()=>{let e=setTimeout(()=>{null==o||o(s);},200);return()=>clearTimeout(e);},[s]),(0,l.useEffect)(()=>{n(t);},[t]),(0,r.jsx)(i.ColorPicker,{value:s,onChange:n,presets:[{label:"PresetColors",key:"PresetColors",colors:A.PRESET_COLORS}],children:a});};var u=({value:e,onChange:t,id:a})=>{let{styles:o}=m(),s=l.default.useMemo(()=>{let t=(0,n.generateColor)(e||"").toRgbString(),a=A.PRESET_COLORS.map(e=>{let a=(0,n.generateColor)(e).toRgbString();return{color:e,active:a===t,picker:!1};}),o=a.some(e=>e.active);return[...a,{color:"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",picker:!0,active:!o}];},[e]);return(0,r.jsxs)(i.Flex,{gap:"large",align:"center",wrap:!0,children:[(0,r.jsx)(i.Input,{value:"string"==typeof e?e:null==e?void 0:e.toHexString(),onChange:e=>null==t?void 0:t(e.target.value),style:{width:120},id:a}),(0,r.jsx)(i.Flex,{gap:"middle",children:s.map(({color:a,active:l,picker:i})=>{let s=(0,r.jsx)("label",{className:(0,c.clsx)(o.color,{[o.colorActive]:l}),style:{background:a},onClick:()=>{i||null==t||t(a);},children:(0,r.jsx)("input",{type:"radio",name:i?"picker":"color","aria-label":a,tabIndex:i?-1:0,onClick:e=>e.stopPropagation()})},a);return i?(0,r.jsx)(d,{value:e||"",onChange:t,children:s},`colorpicker-${e}`):s;})})]});};}}]);