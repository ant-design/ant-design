(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,340928,e=>{"use strict";var t=e.i(391398),a=e.i(191788),i=e.i(38415),r=e.i(827830),n=e.i(582225),s=e.i(467312),o=e.i(558222),l=e.i(566826),c=e.i(151304),d=e.i(125308),p=e.i(876591),u=e.i(624618),m=e.i(504909),g=e.i(741214),x=e.i(974398),h=e.i(56206),f=e.i(358144);let b=(0,r.o)(({cssVar:e,css:t,cx:a})=>{let{carousel:i}=(0,f.b)(),r=t`
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    align-items: stretch;
    text-decoration: none;
    background: ${e.colorBgContainer};
    background: color-mix(in srgb, ${e.colorBgContainer} 30%, transparent);
    backdrop-filter: blur(8px);
    border: ${e.lineWidth} solid ${e.colorBorderSecondary};
    border-radius: ${e.borderRadiusLG};
    transition: all ${e.motionDurationSlow};
    padding-block: ${e.paddingMD};
    padding-inline: ${e.paddingLG};
    box-sizing: border-box;
    position: relative;

    &:before {
      content: '';
      inset: calc(${e.lineWidth} * -1);
      position: absolute;

      background: radial-gradient(
        circle 150px at var(--mouse-x, 0) var(--mouse-y, 0),
        ${e.colorPrimaryBorderHover},
        ${e.colorBorderSecondary}
      );
      opacity: 0;
      transition: all ${e.motionDurationSlow} ease;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      mask-composite: subtract;
      -webkit-mask-composite: xor;
      padding: 1px;
      border-radius: inherit;
    }

    &:hover {
      backdrop-filter: blur(0px);
      background: color-mix(in srgb, ${e.colorBgContainer} 90%, transparent);

      &:before {
        opacity: 1;
      }
    }
  `;return{itemBase:r,ribbon:t`
      & > .${a(r)} {
        height: 100%;
      }
    `,sliderItem:t`
      margin: 0 ${e.margin};
      text-align: start;
    `,container:t`
      display: flex;
      width: 100%;
      max-width: 100%;
      margin-inline: auto;
      box-sizing: border-box;
      column-gap: calc(${e.paddingMD} * 2);
      align-items: stretch;
      text-align: start;
      min-height: 178px;
      > * {
        width: calc((100% - calc(${e.marginXXL} * 2)) / 3);
      }
    `,carousel:i,bannerBg:t`
      height: ${e.fontSize};
    `}}),j=e=>{let{extra:i,index:r,icons:n,className:s}=e,o=a.default.useRef(null),{styles:l}=b(),[d,u]=a.default.useState([0,0]),[f,j]=a.default.useState([0,0]);if(a.default.useEffect(()=>{let[e,t]=d,[a,i]=f;if(.5>Math.abs(e-a)&&.5>Math.abs(t-i))return;let r=(0,c.raf)(()=>{j(a=>{let[i,r]=a;return[i+(e-i)*.1,r+(t-r)*.1]})});return()=>c.raf.cancel(r)},[d,f]),!i)return(0,t.jsx)(g.f,{},r);let y=n?.find(e=>e.name===i.source),v=(0,t.jsxs)("a",{ref:o,href:i.href,target:"_blank",className:(0,h.clsx)(l.itemBase,s),style:{"--mouse-x":`${f[0]}px`,"--mouse-y":`${f[1]}px`},rel:"noopener noreferrer",onMouseMove:e=>{if(!o.current)return;let t=o.current.getBoundingClientRect();u([e.clientX-t.left,e.clientY-t.top])},children:[(0,t.jsx)(x.f.Title,{level:5,children:i?.title}),(0,t.jsx)(x.f.Paragraph,{type:"secondary",style:{flex:"auto"},children:i.description}),(0,t.jsxs)(m.f,{justify:"space-between",align:"center",children:[(0,t.jsx)(x.f.Text,{children:i.date}),y?.href&&(0,t.jsx)("img",{src:y.href,draggable:!1,className:l.bannerBg,alt:"banner"})]})]},i?.title);return 0===r?(0,t.jsx)(p.f.Ribbon,{text:"HOT",color:"red",rootClassName:l.ribbon,children:v}):v},y=()=>{let{isMobile:e}=a.default.use(o.f),{styles:i}=b(),r=Array.from({length:3});return e?(0,t.jsx)(u.f,{className:i.carousel,children:r.map((e,a)=>(0,t.jsx)("div",{className:i.itemBase,children:(0,t.jsx)(g.f,{active:!0,style:{padding:"0 24px"}})},`mobile-${a}`))}):(0,t.jsx)("div",{className:i.container,children:r.map((e,a)=>(0,t.jsx)("div",{className:i.itemBase,children:(0,t.jsx)(g.f,{active:!0})},`desktop-${a}`))})};var v=()=>{let{styles:e}=b(),[,i]=(0,n.default)(),{isMobile:r}=a.default.use(o.f),{data:s,error:l,isLoading:c}=(0,f.A)();if(c)return(0,t.jsx)(y,{});if(l)return(0,t.jsx)(d.f,{showIcon:!0,type:"error",title:l.message,description:void 0});let p=s?.extras?.[i],m=p&&p.length?p.slice(0,3):Array.from({length:3});return r?(0,t.jsx)(u.f,{className:e.carousel,children:m.map((a,i)=>(0,t.jsx)("div",{children:(0,t.jsx)(j,{extra:a,index:i,icons:s?.icons,className:e.sliderItem})},`mobile-${i}`))}):(0,t.jsx)("div",{className:e.container,children:m.map((e,a)=>(0,t.jsx)(j,{extra:e,index:a,icons:s?.icons},`desktop-${a}`))})};let k=(0,r.l)(({css:e})=>({siteMask:e`
    z-index: 1;
    position: relative;
  `}));var w=e=>{let{children:a,className:i,style:r,onMouseMove:n,onMouseEnter:s,onMouseLeave:o}=e;return(0,t.jsx)("div",{style:r,className:(0,h.clsx)(i,k.siteMask),onMouseMove:n,onMouseEnter:s,onMouseLeave:o,children:a})};let S=(0,r.l)(({css:e,cssVar:t})=>({box:e`
    position: relative;
    transition: all ${t.motionDurationSlow};
    background-size: cover;
    background-position: 50% 0%;
    background-repeat: no-repeat;
  `,container:e`
    position: absolute;
    inset: 0;
    overflow: hidden;
  `,typographyWrapper:e`
    text-align: center;
  `,marginStyle:e`
    max-width: 1208px;
    margin-inline: auto;
    box-sizing: border-box;
    padding-inline: ${t.marginXXL};
  `,withoutChildren:e`
    min-height: 300px;
    border-radius: ${t.borderRadiusLG};
    background-color: '#e9e9e9';
  `}));var N=e=>{let{id:i,title:n,titleColor:s,description:l,children:c,decoration:d,background:p,collapse:u,extra:m}=e,g=(0,r.i)(),{isMobile:f}=a.use(o.f);return(0,t.jsxs)("div",{style:p?.startsWith("https")||p?.startsWith("linear-gradient")?{backgroundImage:p?.startsWith("linear-gradient")?p:`url(${p})`}:{backgroundColor:p},className:S.box,children:[(0,t.jsx)("div",{className:S.container,children:d}),(0,t.jsxs)(w,{style:{paddingBlock:g.marginFarSM},children:[(0,t.jsxs)("div",{className:S.typographyWrapper,children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:g.paddingXS},children:[(0,t.jsx)(x.f.Title,{id:i,level:1,style:{fontWeight:900,color:s,margin:0,fontSize:f?g.fontSizeHeading2:g.fontSizeHeading1},children:n}),m]}),(0,t.jsx)(x.f.Paragraph,{style:{color:s,marginBottom:f?g.marginXXL:g.marginFarXS,marginTop:g.marginSM},children:l})]}),(0,t.jsx)("div",{className:(0,h.clsx)({[S.marginStyle]:!u}),children:c?(0,t.jsx)("div",{children:c}):(0,t.jsx)("div",{className:S.withoutChildren})})]})]})},C=e.i(64247),$=e.i(183668),B=e.i(171745),D=e=>(0,t.jsx)(B.f,{component:$.f,...e}),T=e.i(729946),z=e.i(831036),A=e.i(711412),I=e.i(475685);let R=(0,r.o)(({cssVar:e,css:t})=>({wrap:t`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-top: 20px;
    border-top: ${e.lineWidth} ${e.lineType} ${e.colorBorderSecondary};
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `,label:t`
    font-size: 11px;
    color: ${e.colorTextQuaternary};
    margin-inline-end: 16px;
    white-space: nowrap;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  `,sponsorItem:t`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 8px;
    text-decoration: none;
    color: ${e.colorTextSecondary};
    transition: background-color ${e.motionDurationFast};

    &:hover {
      background: ${e.colorFillSecondary};
    }
  `,sponsorLogo:t`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: contain;
    background: ${e.colorBgContainer};
    border: ${e.lineWidth} ${e.lineType} ${e.colorBorderSecondary};
  `,sponsorName:t`
    font-size: 13px;
    font-weight: 500;
    color: ${e.colorTextSecondary};
  `,divider:t`
    width: 1px;
    height: 16px;
    background: ${e.colorBorderSecondary};
    margin: 0 4px;
  `}));var F=()=>{let{styles:e}=R(),[,i]=(0,n.default)(),{isMobile:r}=a.default.use(o.f);return(0,t.jsxs)("div",{className:e.wrap,children:[!r&&(0,t.jsx)("span",{className:e.label,children:"Sponsors"}),I.I.map((n,s)=>(0,t.jsxs)(a.default.Fragment,{children:[s>0&&(0,t.jsx)("div",{className:e.divider}),(0,t.jsx)(z.f,{content:(0,t.jsx)(A.f,{sponsor:n,lang:i}),trigger:["hover","focus"],placement:"top",arrow:{pointAtCenter:!0},destroyOnHidden:!0,children:(0,t.jsxs)("a",{href:(0,I.n)(n.url,i),target:"_blank",rel:"noopener noreferrer",className:e.sponsorItem,children:[(0,t.jsx)("img",{src:n.logo,alt:n.name,className:e.sponsorLogo}),!r&&(0,t.jsx)("span",{className:e.sponsorName,children:n.name})]})})]},n.name))]})};let P=({size:e,left:i,top:r,color:n,offsetXMultiple:s=1,offsetYMultiple:o=1,defaultOpacity:d=.1})=>{let[p,u]=(0,a.useState)([0,0]),[m,g]=(0,a.useState)(d),[x,h]=(0,a.useState)(1),f=a.default.use(l.f),b=(0,c.useEvent)(()=>{u([(Math.random()-.5)*400*s,(Math.random()-.5)*400*o]),g(f?.1+.2*Math.random():.1+.05*Math.random()),h(1+ +Math.random())});return(0,a.useEffect)(()=>{b()},[]),(0,a.useEffect)(()=>{let e=setTimeout(b,2e3*Math.random()+3e3);return()=>clearTimeout(e)},[p]),(0,t.jsx)("div",{"aria-hidden":"true","data-desc":"luminous-bubble",style:{opacity:m,width:e,height:e,borderRadius:"50%",background:n,filter:"blur(100px)",left:i,top:r,transform:`translate(-50%, -50%) translate(${p[0]}px, ${p[1]}px) scale(${x})`,transition:"all 5s ease-in-out",position:"absolute"}})},L=(0,r.o)(({css:e,cssVar:t})=>({container:e`
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: ${t.colorBgContainer};
  `}));function M({className:e}){let{styles:a,cx:i}=L();return(0,t.jsxs)("div",{className:i(a.container,e),children:[(0,t.jsx)(P,{size:300,color:"#ee35f1",left:"0vw",top:"0vh",offsetXMultiple:2,defaultOpacity:.2}),(0,t.jsx)(P,{size:300,color:"#5939dc",left:"30vw",top:"80vh",defaultOpacity:.1}),(0,t.jsx)(P,{size:300,color:"#00D6FF",left:"100vw",top:"50vh",offsetYMultiple:2,defaultOpacity:.2})]})}let W={cn:{slogan:"AI 友好的「设计系统」，让美与智能并进，让工作充满「灵感」与「快乐」。",start:"开始使用",designLanguage:"设计语言"},en:{slogan:"AI friendly design system that combines beauty and intelligence, making work full of inspiration and joy.",start:"Getting Started",designLanguage:"Design Language"}},E=(0,r.o)(({cssVar:e,css:t,cx:a})=>{let i=`0 0 4px ${e.colorBgContainer}`,r=a(t`
    position: absolute;
    inset-inline-end: -60px;
    top: -24px;
    transition: all 1s cubic-bezier(0.03, 0.98, 0.52, 0.99);
  `);return{holder:t`
      height: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      perspective: 800px;
      /* fix safari bug by removing blur style */
      transform: translateZ(1000px);
      row-gap: ${e.marginXL};

      &:hover {
        .${r} {
          transform: scale(0.96);
        }
      }
    `,typography:t`
      text-align: center;
      position: relative;
      z-index: 1;
      padding-inline: ${e.paddingXL};
      text-shadow: ${Array.from({length:5},()=>i).join(", ")};
      h1 {
        font-weight: 900 !important;
        font-size: calc(${e.fontSizeHeading1} * 2) !important;
        line-height: ${e.lineHeightHeading1} !important;
      }

      p {
        font-size: calc(${e.fontSizeLG} * 1.5) !important;
        font-weight: 400 !important;
        margin-bottom: 0;
        color: ${e.colorTextTertiary} !important;
      }
    `,block:r,child:t`
      position: relative;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      z-index: 1;
    `,btnWrap:t`
      margin-bottom: ${e.marginXL};
    `}});var G=e=>{let{children:i}=e,[r]=(0,n.default)(W),{styles:s}=E((0,a.use)(o.f)),{pathname:l,search:c}=(0,C._)(),d=T.z(l);return(0,t.jsx)(w,{children:(0,t.jsxs)("div",{className:s.holder,children:[(0,t.jsx)(a.Suspense,{fallback:null,children:(0,t.jsx)(M,{})}),(0,t.jsxs)(x.f,{className:s.typography,children:[(0,t.jsx)("h1",{children:"Ant Design"}),(0,t.jsx)("p",{children:r.slogan})]}),(0,t.jsxs)(m.f,{gap:"middle",className:s.btnWrap,children:[(0,t.jsx)(D,{size:"large",type:"primary",to:T.V("/components/overview/",d,c),children:r.start}),(0,t.jsx)(D,{size:"large",to:T.V("/docs/spec/introduce/",d,c),children:r.designLanguage})]}),(0,t.jsx)("div",{className:s.child,children:i}),(0,t.jsx)(F,{})]})})},O=e.i(256047),H=e.i(802240),X=e.i(996791),_=e.i(606552),V=e.i(747319),Y=e.i(788296),q=e.i(906491),K=e.i(846205),Q=e.i(207113),U=e.i(65590),U=U,J=e.i(954942),Z=e.i(854049),ee=e.i(978317),ee=ee,et=e.i(977892),ea=e.i(622726),ei=e.i(739561),er=e.i(930634),en=e.i(720836),es=e.i(528147),eo=e.i(789795),el=e.i(122381),ec=e.i(373271),ed=e.i(820244),ep=e.i(439363),eu=e.i(360945),em=e.i(747985),eg=e.i(975278),ex=e.i(222424),eh=e.i(265934),ef=e.i(112914),eb=e.i(58795),ej=e.i(469323),ey=e.i(606365),ev=e.i(376752),ek=e.i(183056),ew=e.i(997643),eS=e.i(158095),eN=e.i(294997),eC=e.i(706439),e$=e.i(290265),eB=e.i(287874);let{Title:eD,Text:eT}=x.f,{_InternalPanelDoNotUseOrYouWillBeFired:ez}=ef.f,{_InternalPanelDoNotUseOrYouWillBeFired:eA}=eh.f,{_InternalPanelDoNotUseOrYouWillBeFired:eI}=ex.f,eR=(0,r.o)(({css:e,token:t})=>({container:e({backgroundColor:"transparent",padding:0,border:"none",boxShadow:"none",width:"100%"}),layoutRow:e({display:"flex",gap:12,alignItems:"flex-start",justifyContent:"center",margin:"0 auto"}),colLeft:e({flex:1,display:"flex",flexDirection:"column",gap:t.paddingLG,"@media (max-width: 768px)":{display:"none"}}),colCenter:e({flex:1,display:"flex",flexDirection:"column",gap:t.paddingLG}),colRight:e({width:320,display:"flex",flexDirection:"column",gap:t.paddingLG,"@media (max-width: 1200px)":{display:"none"}}),mainCard:e({justifyContent:"center",padding:32,borderRadius:16,backgroundSize:"cover",backgroundPosition:"center"}),avatarGroup:e({marginBlockEnd:16}),selectInput:e({flex:"0 0 300px"}),colorPickerFixed:e({flex:"none"}),datePickerGrow:e({flex:1}),controlsRow:e({marginBlockStart:16,paddingInline:4}),stepsWrapper:e({marginBlockStart:16}),progressWrapper:e({marginBlockStart:8}),flexRow12:e({padding:0,display:"flex",gap:12}),blockCardQr:e({flex:"0 0 auto"}),blockCardQrBody:e({padding:6}),blockCardExtraPad:e({justifyContent:"center",marginBlockEnd:8}),blockCardExtraPadBody:e({padding:6}),flexCol1:e({flex:1}),rateStyle:e({marginBlockEnd:20}),popconfirmFull:e({width:"100%",margin:0}),blockCardSegmentedBody:e({padding:8}),avatarSection:e({textAlign:"center",position:"relative"}),avatarExtra:e({backgroundColor:"#fff",color:"#666"}),otpWrapper:e({marginBlock:16}),dangerBtn:e({".ant-btn":{background:"#fff2f0",border:"none"}}),profileInfo:e({flex:1}),profileTitle:e({margin:0}),profileHandle:e({fontSize:13}),profileDesc:e({marginBlock:8,fontSize:14}),profileStats:e({fontSize:13}),signupCard:e({textAlign:"center"}),signupCardBody:e({padding:"32px 24px"}),signupAvatar:e({marginBlockEnd:16}),signupText:e({display:"block",marginBlockEnd:24,fontSize:14}),signupBtn:e({marginBlockEnd:16}),signupDivider:e({color:t.colorTextSecondary,fontSize:12})})),eF=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"orange",label:"Orange"},{value:"watermelon",label:"Watermelon"}],eP=Array.from({length:5}).map((e,t)=>({key:`opt${t}`,label:`Option ${t}`})),eL=[{label:"Apple",value:"Apple"},{label:"Pear",value:"Pear"}],eM=[{label:"Apple",value:"Apple"},{label:"Pear",value:"Pear"}],eW=[{status:"success",text:"Success"},{status:"error",text:"Error"},{status:"default",text:"Default"},{status:"processing",text:"Processing"},{status:"warning",text:"Warning"}],eE=[{icon:(0,t.jsx)(er.f,{}),color:"#55acee",content:"Twitter"},{icon:(0,t.jsx)(en.f,{}),color:"#cd201f",content:"Youtube"},{icon:(0,t.jsx)(Z.f,{}),color:"#3b5999",content:"Facebook"}],eG=[{type:"primary",children:"Primary button"},{danger:!0,children:"Danger button"},{type:"dashed",variant:"outlined",shape:"round",children:"Outlined button"},{danger:!0,shape:"round",children:"Round button"}],eO=[{title:"Finished"},{title:"In Process"},{title:"Waiting"}],eH=["ant-design-bot","github-actions","github-actions[bot]","copilot","renovate","renovate[bot]","dependabot","dependabot[bot]","gemini-code-assist[bot]","dependabot-preview","dependabot-preview[bot]","depfu[bot]"],eX=["https://avatars.githubusercontent.com/u/507615?v=4","https://avatars.githubusercontent.com/u/5378891?v=4","https://avatars.githubusercontent.com/u/49217418?v=4","https://avatars.githubusercontent.com/u/117748716?v=4","https://avatars.githubusercontent.com/u/59312002?v=4","https://avatars.githubusercontent.com/u/82765353?v=4"],e_=async(...e)=>{let t=await fetch(...e);if(!t.ok)throw Error(`Failed to fetch contributors: ${t.status}`);return await t.json()},eV={dedupingInterval:432e5,revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3};var eY=e=>{let{config:i,className:r,containerClassName:n,inherit:s=!1,isDark:o=!1,isDarkTheme:l=!1}=e,{styles:c}=eR(),{data:d,error:u,isLoading:x}=(0,eB.f)(["https://api.github.com/repos/ant-design/ant-design/contributors?per_page=100"],e_,eV),f=(0,a.useMemo)(()=>u?eX.map(e=>({src:e,name:"Ant Design contributor"})):!x&&Array.isArray(d)&&d?.length?d.filter(e=>{let{login:t,type:a}=e,i=t.toLowerCase();return"Bot"!==a&&!eH.some(e=>i.includes(e))}).sort(()=>Math.random()-.5).slice(0,6).map(e=>({src:e.avatar_url,name:e.login})):[],[d,u,x]),{theme:b,...j}=i||{},y=(0,a.useMemo)(()=>({...b,inherit:s}),[b,s]),v=(0,a.useMemo)(()=>l?"lab(14% 0 0)":o&&!l?"#f5f5f5":"transparent",[o,l]);return(0,t.jsx)(_.f,{...j,theme:y,children:(0,t.jsx)("div",{className:(0,h.clsx)(n,c.container),children:(0,t.jsx)(X.f,{style:{width:"100%"},children:(0,t.jsx)(eo.f,{lineWidth:2,children:(0,t.jsx)(el.f,{styles:{root:{backgroundColor:v,backdropFilter:"blur(12px)",boxShadow:"0 4px 12px rgba(0,0,0,.08), 0 12px 32px rgba(0,0,0,.08)"},body:{padding:0}},className:(0,h.clsx)(r,c.mainCard),children:(0,t.jsxs)("div",{className:c.layoutRow,children:[(0,t.jsxs)("div",{className:c.colLeft,children:[(0,t.jsx)("div",{children:(0,t.jsxs)(m.f,{vertical:!0,gap:"middle",children:[(0,t.jsxs)(m.f,{gap:"middle",children:[(0,t.jsx)(eg.f,{placeholder:"hi@example.com"}),(0,t.jsx)(ek.f,{placeholder:"Select one",className:c.selectInput,mode:"multiple",maxTagCount:"responsive",defaultValue:["apple","banana"],options:eF})]}),(0,t.jsxs)(m.f,{gap:"middle",children:[(0,t.jsx)(ed.f,{showText:!0,defaultValue:"#1677ff",className:c.colorPickerFixed}),(0,t.jsxs)(ew.f.Compact,{children:[(0,t.jsx)($.f,{children:"Dropdown"}),(0,t.jsx)(em.f,{menu:{items:eP},children:(0,t.jsx)($.f,{icon:(0,t.jsx)(J.f,{})})})]}),(0,t.jsx)(ep.f,{className:c.datePickerGrow,placeholder:"Select Date"})]}),(0,t.jsxs)(m.f,{align:"center",justify:"space-between",className:c.controlsRow,children:[(0,t.jsx)(ec.f.Group,{options:eL,defaultValue:["Apple"]}),(0,t.jsx)(ey.f.Group,{block:!0,options:eM,defaultValue:"Apple"}),(0,t.jsx)(eC.f,{defaultChecked:!0}),(0,t.jsx)(eb.f,{type:"circle",percent:25,size:20,showInfo:!1})]}),(0,t.jsx)("div",{className:c.stepsWrapper,children:(0,t.jsx)(eN.f,{current:1,status:"error",items:eO})})]})}),(0,t.jsx)("div",{className:c.progressWrapper,children:(0,t.jsxs)(m.f,{gap:"middle",vertical:!0,children:[(0,t.jsx)(eb.f,{percent:50,status:"active"}),(0,t.jsx)(eb.f,{percent:70,status:"exception"})]})}),(0,t.jsx)("div",{children:(0,t.jsx)(m.f,{justify:"space-between",align:"center",gap:"small",children:eW.map((e,a)=>(0,t.jsx)(p.f,{...e},`item-${a}`))})}),(0,t.jsxs)("div",{className:c.flexRow12,children:[(0,t.jsx)(el.f,{variant:"borderless",className:c.blockCardQr,classNames:{body:c.blockCardQrBody},children:(0,t.jsx)(ej.f,{errorLevel:"H",value:"https://ant.design/",icon:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"})}),(0,t.jsxs)("div",{className:c.flexCol1,children:[(0,t.jsxs)(m.f,{justify:"space-around",children:[(0,t.jsx)(eS.f,{indicator:(0,t.jsx)(et.f,{spin:!0}),size:"middle"}),(0,t.jsx)(eS.f,{size:"middle"}),(0,t.jsx)(ev.f,{size:"middle",value:3,className:c.rateStyle})]}),(0,t.jsx)(el.f,{variant:"borderless",className:c.blockCardExtraPad,classNames:{body:c.blockCardExtraPadBody},children:(0,t.jsx)(m.f,{gap:"small",align:"center",children:eE.map(e=>{let{content:a,...i}=e;return(0,t.jsx)(e$.f,{...i,children:a},`item-${a}`)})})}),(0,t.jsx)(ez,{title:"Are you OK?",placement:"topRight",className:c.popconfirmFull})]})]}),(0,t.jsxs)(el.f,{variant:"borderless",classNames:{body:c.blockCardSegmentedBody},children:[(0,t.jsx)(V.f,{block:!0,options:["1D","7D","1M","1Y","All"]}),(0,t.jsx)(V.f,{styles:{root:{marginBlockStart:8}},block:!0,options:[{label:"Chats",value:"Chats",icon:(0,t.jsx)(ei.f,{})},{label:"Emails",value:"Emails",icon:(0,t.jsx)(ea.f,{})}]})]})]}),(0,t.jsxs)("div",{className:c.colCenter,children:[(0,t.jsxs)("div",{className:c.avatarSection,children:[(0,t.jsxs)(es.f.Group,{className:c.avatarGroup,children:[x&&!u?Array.from({length:6},(e,a)=>(0,t.jsx)(g.f.Avatar,{active:!0,size:46},`skeleton-${a}`)):f.map(({src:e,name:a})=>(0,t.jsx)(es.f,{size:46,src:e,draggable:!1,alt:`Contributor: ${a}`,"aria-label":`Contributor: ${a}`},e)),(0,t.jsx)(es.f,{size:46,draggable:!1,className:c.avatarExtra,children:"+5"})]}),(0,t.jsx)(eD,{level:5,children:"Verify account"}),(0,t.jsx)(eT,{type:"secondary",children:"We've sent a code to a****@gmail.com"}),(0,t.jsx)("div",{className:c.otpWrapper,children:(0,t.jsx)(eg.f.OTP,{size:"large",length:6,defaultValue:"4320",variant:"filled"})}),(0,t.jsxs)(eT,{type:"secondary",children:["Didn't receive a code? ",(0,t.jsx)("a",{children:"Resend"})]})]}),(0,t.jsxs)(m.f,{gap:"large",vertical:!0,children:[(0,t.jsx)(m.f,{gap:"middle",justify:"center",children:eG.slice(0,2).map((e,a)=>{let{children:i,...r}=e;return(0,t.jsx)($.f,{...r,children:i},`item-${a}`)})}),(0,t.jsx)(m.f,{gap:"middle",justify:"center",children:eG.slice(-2).map((e,a)=>{let{children:i,...r}=e;return(0,t.jsx)($.f,{...r,children:i},`item-${a}`)})})]}),(0,t.jsx)(el.f,{variant:"borderless",children:(0,t.jsxs)(m.f,{align:"flex-start",gap:"middle",children:[(0,t.jsx)(es.f,{shape:"square",size:60,src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",draggable:!1}),(0,t.jsxs)("div",{className:c.profileInfo,children:[(0,t.jsx)(eD,{level:5,className:c.profileTitle,children:"Ant Design"}),(0,t.jsx)(eT,{type:"secondary",className:c.profileHandle,children:"@ant-design"}),(0,t.jsx)("p",{className:c.profileDesc,children:"Building the future of UI for web & mobile."})]})]})}),(0,t.jsx)(eA,{styles:{root:{width:"100%"}},title:"Ant Design",description:"An enterprise-class design system for building modern, intelligent, and delightful user experiences.",type:"success"})]}),(0,t.jsxs)("div",{className:c.colRight,children:[(0,t.jsxs)(el.f,{variant:"borderless",className:c.signupCard,classNames:{body:c.signupCardBody},children:[(0,t.jsx)(es.f,{size:50,src:"https://github.com/ant-design.png?size=50",className:c.signupAvatar,draggable:!1}),(0,t.jsx)(eD,{level:4,children:"Create an account"}),(0,t.jsx)(eT,{type:"secondary",className:c.signupText,children:"Start your free 7-day trial. No credit card required."}),(0,t.jsx)($.f,{type:"primary",block:!0,size:"large",className:c.signupBtn,children:"Get Started"}),(0,t.jsx)(eu.f,{className:c.signupDivider,children:"OR"}),(0,t.jsxs)(m.f,{vertical:!0,gap:"small",children:[(0,t.jsx)($.f,{block:!0,size:"large",icon:(0,t.jsx)(ee.f,{}),children:"Continue with Google"}),(0,t.jsx)($.f,{block:!0,size:"large",icon:(0,t.jsx)(U.f,{}),children:"Continue with Apple"})]})]}),(0,t.jsx)(eI,{title:"Ant Design",children:(0,t.jsx)("div",{children:"Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability."})})]})]})})})})})})},eq=e.i(239090),eK=e.i(726344);let eQ=a.lazy(()=>e.A(599708).then(e=>({default:e.ThemeDashboard}))),eU={cn:{themeTitle:"定制主题，随心所欲",themeDesc:"开放样式算法与语义化结构，让你与 AI 一起轻松定制主题",aiGenerate:"AI 主题生成",aiGenerateDesc:"用一句话描述你想要的风格",copyTheme:"复制主题代码",copySuccess:"已复制",exploreThemes:"探索主题",editTheme:"主题编辑",contribution:"贡献"},en:{themeTitle:"Flexible theme customization",themeDesc:"Open style algorithms and semantic structures make it easy for you and AI to customize themes",aiGenerate:"AI Theme Generator",aiGenerateDesc:"Describe your desired style",copyTheme:"Copy theme code",copySuccess:"Copied",exploreThemes:"Explore Themes",editTheme:"Theme Editor",contribution:"Contribution"}},eJ=(0,r.o)(({css:e,cssVar:t})=>({container:e({width:"100%",flexDirection:"column",alignItems:"center"}),wrapper:e({width:"100%",maxWidth:1320,flexDirection:"column",alignItems:"stretch"}),componentsBlockContainer:e({display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}),componentsBlock:e({width:"100%",maxWidth:1320,margin:"0 auto"}),dashboardBlock:e({width:"100%",maxWidth:1320,minHeight:600,margin:"0 auto"}),previewTabs:e({padding:3,borderRadius:100,background:t.colorFillQuaternary,".ant-segmented-group":{gap:2},".ant-segmented-thumb":{borderRadius:100,background:t.colorBgElevated,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"},"@media (max-width: 768px)":{width:"60%"}}),tabsDark:e({backgroundColor:"rgba(255, 255, 255, 0.14)",backdropFilter:"blur(18px)",boxShadow:"inset 0 0 0 1px rgba(255, 255, 255, 0.16)",".ant-segmented-thumb":{backgroundColor:"rgba(255, 255, 255, 0.96)",boxShadow:"0 8px 18px rgba(0,0,0,0.24)"}}),tabsItem:e({minWidth:112,borderRadius:100,color:t.colorTextTertiary,"&.ant-segmented-item-selected":{color:t.colorText},"@media (max-width: 768px)":{flex:1,minWidth:0,paddingInline:12,fontSize:16}}),tabsItemDark:e({color:"rgba(255, 255, 255, 0.78)","&:not(.ant-segmented-item-selected):not(.ant-segmented-item-disabled):hover":{color:"#fff",background:"rgba(255, 255, 255, 0.08)"},"&.ant-segmented-item-selected":{color:t.colorText}}),previewTabsLabel:e({minHeight:30,lineHeight:"30px"}),themeBlock:e({height:20,width:20,fontSize:20,borderRadius:"100%",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.15)",backgroundPosition:"center",backgroundRepeat:"no-repeat",outline:`2px solid ${t.colorBgLayout}`,backgroundColor:t.colorBgLayout,transition:["background-color","transform","opacity"].map(e=>`${e} ${t.motionDurationFast}`).join(", "),"&:hover, &:focus-within":{outline:`2px solid ${t.colorPrimaryBorder}`,transform:"scale(1.1)"},"> img":{fontSize:0,display:"block",width:"100%",height:"100%",borderRadius:"100%"}}),active:e({outline:`2px solid ${t.colorPrimaryBorder}`}),switch:e({alignItems:"center",gap:16,"@media (max-width: 1200px)":{justifyContent:"center",flexDirection:"column"}}),buttonBlock:e({height:28,width:28,borderRadius:"50%",fontSize:15,color:t.colorPrimaryBorder,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer","&:hover":{backgroundColor:t.colorBgLayout},"@media (max-width: 1200px)":{display:"none"}})})),eZ=[{label:"Components",value:"components"},{label:"Dashboard",value:"dashboard"}],e0=e=>e.key??e.name,e1=e=>{let{onOpenPromptDrawer:i}=e,{pathname:r,search:s}=(0,C._)(),o=T.z(r),[c]=(0,n.default)(eU),{styles:d}=eJ(),p=a.use(l.f),{message:u}=X.f.useApp(),g=(0,eq.U)(),[x,f]=a.useState("light"),[b,j]=a.useState("components"),y=a.useRef(null),v=a.useRef(new Set);a.useEffect(()=>{f(p?"dark":"light")},[p]);let k=a.useRef(null),w=g.find(e=>e0(e)===x)??g[0],S=e=>{!e||e===w.bgImg||v.current.has(e)||(v.current.add(e),new Image().src=e)},$=async e=>{e.stopPropagation();let t=(0,eK.S)({themeConfig:w?.props?.theme,copyCode:w?.copyCode});await (0,q.f)(t)&&(y.current&&clearTimeout(y.current),u.success(c.copySuccess))};a.useEffect(()=>()=>{y.current&&clearTimeout(y.current)},[]);let B=T.V("/theme-editor-cn",o,s),D=w?.bgImg?w.bgImg:"linear-gradient(180deg, #ffffff 0%, #F5F8FF 100%)",z=!!w?.bgImgDark;return(0,t.jsx)(N,{title:c.themeTitle,description:c.themeDesc,collapse:!0,titleColor:z?"#fff":void 0,background:D,children:(0,t.jsx)(m.f,{className:d.container,children:(0,t.jsxs)(m.f,{className:d.wrapper,gap:16,children:[(0,t.jsxs)(m.f,{className:d.switch,justify:"space-between",children:[(0,t.jsx)(V.f,{classNames:{label:(0,h.clsx)(d.previewTabsLabel),root:(0,h.clsx)(d.previewTabs,{[d.tabsDark]:z}),item:(0,h.clsx)(d.tabsItem,{[d.tabsItemDark]:z})},options:eZ,value:b,onChange:j}),(0,t.jsxs)(m.f,{align:"center",gap:12,ref:k,onKeyDown:e=>{let t;if(!(e.target instanceof HTMLElement)||!e.target.hasAttribute("data-theme-key"))return;let a=g.map(e0),i=a.indexOf(x);if(-1===i)return;if("ArrowRight"===e.key)e.preventDefault(),t=(i+1)%a.length;else{if("ArrowLeft"!==e.key)return;e.preventDefault(),t=(i-1+a.length)%a.length}let r=a[t];f(r);let n=k.current?.querySelector(`[data-theme-key="${r}"]`);n?.focus()},children:[g.map(e=>{let{name:a,icon:i}=e,r=e0(e),n=x===r;return(0,t.jsx)(Y.f,{placement:"top",title:a,children:(0,t.jsx)("div",{role:"tab",className:(0,h.clsx)(d.themeBlock,{[d.active]:n}),tabIndex:n?0:-1,"aria-selected":n,"data-theme-key":r,onClick:()=>f(r),onPointerEnter:()=>S(e.bgImg),onFocus:()=>S(e.bgImg),children:"string"==typeof i?(0,t.jsx)("img",{src:i,alt:a,title:a,draggable:!1,loading:"lazy"}):(0,t.jsx)(i,{})})},`item-${r}`)}),(0,t.jsx)(Y.f,{placement:"top",title:c.copyTheme,children:(0,t.jsx)("div",{className:d.buttonBlock,onClick:$,children:(0,t.jsx)(H.f,{})})}),(0,t.jsx)(Y.f,{placement:"top",title:c.editTheme,children:(0,t.jsx)(K.f,{to:B,target:"_blank",rel:"noreferrer",title:"editTheme",children:(0,t.jsx)("div",{className:d.buttonBlock,children:(0,t.jsx)(O.f,{})})})}),(0,t.jsx)(Y.f,{placement:"top",title:c.aiGenerate,children:(0,t.jsx)("div",{className:d.buttonBlock,onClick:i,children:(0,t.jsx)(Q.f,{})})})]})]}),"components"===b?(0,t.jsx)(eY,{isDark:p,isDarkTheme:z,config:w?.props,className:d.componentsBlock,containerClassName:d.componentsBlockContainer},x):(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:d.dashboardBlock,"aria-busy":"true"}),children:(0,t.jsx)(eQ,{className:d.dashboardBlock,config:w?.props,activeTheme:w,style:{borderRadius:16}},x)})]})})})};var e2=e=>{let r=a.useMemo(()=>({algorithm:i.f.defaultAlgorithm}),[]);return(0,t.jsx)(_.f,{theme:r,children:(0,t.jsx)(X.f,{children:(0,t.jsx)(e1,{...e})})})};let e5=a.default.lazy(()=>e.A(827219)),e6=a.default.lazy(()=>e.A(288570)),e4=(0,r.l)(({css:e})=>({image:e`
    position: absolute;
    inset-inline-start: 0;
    top: -50px;
    height: 160px;
  `})),e3={cn:{assetsTitle:"组件丰富，选用自如",assetsDesc:"大量实用组件满足你的需求，灵活定制与拓展",designTitle:"设计语言与研发框架",designDesc:"配套生态，让你快速搭建网站应用"},en:{assetsTitle:"Rich components",assetsDesc:"Practical components to meet your needs, flexible customization and expansion",designTitle:"Design and framework",designDesc:"Supporting ecology, allowing you to quickly build website applications"}};e.s(["default",0,()=>{let[e]=(0,n.default)(e3),{token:r}=i.f.useToken(),c=a.default.use(l.f),[d,p]=(0,a.useState)(!1),u=a.default.use(o.f);return(0,t.jsxs)("section",{children:[(0,t.jsx)(G,{children:(0,t.jsx)(v,{})}),(0,t.jsx)(e2,{onOpenPromptDrawer:()=>p(!0)}),(0,t.jsx)(s.f,{open:d,onClose:()=>p(!1),onThemeChange:e=>{u?.updateSiteConfig&&u.updateSiteConfig({dynamicTheme:e})}}),(0,t.jsx)(N,{background:r.colorBgElevated,collapse:!0,title:e.assetsTitle,description:e.assetsDesc,id:"design",children:(0,t.jsx)(a.Suspense,{fallback:null,children:(0,t.jsx)(e5,{})})}),(0,t.jsx)(N,{title:e.designTitle,description:e.designDesc,background:c?"#393F4A":"#F5F8FF",decoration:(0,t.jsx)("img",{draggable:!1,className:e4.image,src:"https://gw.alipayobjects.com/zos/bmw-prod/ba37a413-28e6-4be4-b1c5-01be1a0ebb1c.svg",alt:"bg"}),children:(0,t.jsx)(a.Suspense,{fallback:null,children:(0,t.jsx)(e6,{})})})]})}],340928)}]);