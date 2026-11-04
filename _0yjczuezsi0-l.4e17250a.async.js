(()=>{"use strict";(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,196033,e=>{var i=e.i(391398),a=e.i(191788),r=e.i(218589),t=e.i(163952),s=e.i(473657),l=e.i(516644),l=l,n=e.i(342458),o=e.i(412353),o=o,d=e.i(371807),f=e.i(770042),c=e.i(265992),h=e.i(34938),h=h,m=e.i(248612),m=m,x=e.i(175128),x=x,g=e.i(534825),p=e.i(883376),u=e.i(177579),b=e.i(231372),j=e.i(435864),j=j,v=e.i(996791),y=e.i(528147),$=e.i(612518),k=e.i(183668),w=e.i(122381),D=e.i(844678),T=e.i(606552),S=e.i(504909),N=e.i(975278),M=e.i(57170),C=e.i(329282),E=e.i(69017),A=e.i(747319),I=e.i(183056),P=e.i(997643),G=e.i(724296),H=e.i(504595),z=e.i(290265),K=e.i(38415),L=e.i(974398),V=e.i(827830),R=e.i(270719),Z=e.i(56206),O=e.i(239090);let{Header:U,Content:W,Sider:q}=M.f,F=(0,V.l)(({cssVar:e,css:i,cx:a})=>{let r=i`
    overflow: hidden;
    background: rgba(240, 242, 245, 0.25);
    backdrop-filter: blur(50px);
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    transition: all ${e.motionDurationSlow};
  `;return{demo:r,otherDemo:i`
      &.${a(r)} {
        backdrop-filter: blur(10px);
        background: rgba(247, 247, 247, 0.5);
      }
    `,darkDemo:i`
      &.${a(r)} {
        background: #000;
      }
    `,menu:i`
      margin-inline-start: auto;
    `,header:i`
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${e.colorSplit};
      padding-inline: ${e.paddingLG} !important;
      height: calc(${e.controlHeightLG} * 1.2);
      line-height: calc(${e.controlHeightLG} * 1.2);
    `,headerDark:i`
      border-bottom-color: rgba(255, 255, 255, 0.1);
    `,avatar:i`
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    `,avatarDark:i`
      background-color: rgba(200, 200, 200, 0.3);
    `,logo:i`
      display: flex;
      align-items: center;
      column-gap: ${e.padding};

      h1 {
        font-weight: 400;
        font-size: ${e.fontSizeLG};
        line-height: 1.5;
      }
    `,logoImg:i`
      width: 30px;
      height: 30px;
      overflow: hidden;

      img {
        width: 30px;
        height: 30px;
        vertical-align: top;
      }
    `,transBg:i`
      background: transparent !important;
    `,dashboardShell:i`
      width: 100%;
      min-height: 480px;
      overflow: hidden;
      transition: all ${e.motionDurationSlow};

      .ant-card {
        height: 100%;
      }

      .ant-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,dashboardToolbar:i`
      margin-block-end: ${e.marginMD};
    `,dashboardTabs:i`
      padding: 3px;
      border-radius: 999px;

      .ant-segmented-item {
        min-width: 96px;
        border-radius: 999px;
        font-weight: 600;
      }

      .ant-segmented-thumb {
        border-radius: 999px;
      }
    `,dashboardStatValue:i`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${e.marginSM};
    `,dashboardStatTrend:i`
      margin-inline-start: auto;
      border: 0;
      font-weight: 600;
    `,dashboardPanelTitle:i`
      margin: 0 !important;
    `,dashboardKpiGrid:i`
      margin-block-end: ${e.marginMD};
    `,dashboardTableCard:i`
      margin-block-start: ${e.marginMD};
    `,dashboardTableActions:i`
      margin-block: ${e.marginMD};
    `,dashboardEmployee:i`
      min-width: 0;
    `,dashboardEmployeeMeta:i`
      line-height: 1.3;
    `}}),_=[{key:"Design Values",label:"Design Values"},{key:"Global Styles",label:"Global Styles"},{key:"Themes",label:"Themes"},{key:"DesignPatterns",label:"Design Patterns"}],B=[{key:"Design",label:"Design",icon:(0,i.jsx)(x.f,{}),children:_},{key:"Development",label:"Development",icon:(0,i.jsx)(x.f,{})}],J=[{title:"Revenue",value:228441,prefix:"US$",trend:3.3,status:"success"},{title:"Expenses",value:25108,prefix:"US$",trend:3.3,status:"error"},{title:"Sales",value:458,prefix:"",trend:3.3,status:"success"},{title:"Profit",value:203133,prefix:"US$",trend:4.1,status:"success"}],Q=[{key:"1",id:"#4586936",avatar:"linear-gradient(135deg, #69c0ff, #9254de)",email:"alex@acme.com",member:"Alex Turner",role:"Product Manager",type:"Employee"},{key:"2",id:"#4586937",avatar:"linear-gradient(135deg, #ffadd2, #eb2f96)",email:"emma@acme.com",member:"Emma Davis",role:"Senior Designer",type:"Employee"},{key:"3",id:"#4586933",avatar:"linear-gradient(135deg, #b5f5ec, #1677ff)",email:"john@acme.com",member:"John Smith",role:"Chief Technology Officer",type:"Employee"},{key:"4",id:"#4586932",avatar:"linear-gradient(135deg, #d3f261, #5cdbd3)",email:"kate@acme.com",member:"Kate Moore",role:"Chief Executive Officer",type:"Employee"}],X=[{title:"Worker ID",dataIndex:"id",width:150,render:e=>(0,i.jsx)(L.f.Text,{strong:!0,children:e})},{title:"Member",dataIndex:"member",render:(e,a)=>(0,i.jsxs)(S.f,{align:"center",gap:"middle",className:F.dashboardEmployee,children:[(0,i.jsx)(y.f,{size:40,style:{background:a.avatar}}),(0,i.jsxs)("div",{className:F.dashboardEmployeeMeta,children:[(0,i.jsx)(L.f.Text,{strong:!0,children:a.member}),(0,i.jsx)("br",{}),(0,i.jsx)(L.f.Text,{type:"secondary",children:a.email})]})]})},{title:"Role",dataIndex:"role"},{title:"Worker Type",dataIndex:"type",width:160},{title:"Actions",key:"actions",width:148,align:"right",render:()=>(0,i.jsxs)(P.f,{size:"small",children:[(0,i.jsx)(k.f,{shape:"circle",icon:(0,i.jsx)(h.f,{})}),(0,i.jsx)(k.f,{shape:"circle",icon:(0,i.jsx)(c.f,{})}),(0,i.jsx)(k.f,{danger:!0,shape:"circle",icon:(0,i.jsx)(d.f,{})})]})}],Y=e=>{let{className:d,isDarkTheme:c,style:h,activeTheme:x}=e,{bgImgDark:y,icon:T="",name:V}=x||{},{token:Y}=K.f.useToken(),ee=O.Z,ei=c||y,ea=ei?"dark":"light",er=a.useMemo(()=>{let e=(0,R.L)(Y.colorPrimary).toHsb();return e.b=Math.min(e.b,.7),(0,R.L)(e).toHexString()},[Y.colorPrimary]);return(0,i.jsx)(v.f,{style:{width:"100%"},children:(0,i.jsx)("div",{className:(0,Z.clsx)(F.demo,d,{[F.otherDemo]:!ei&&ee!==O.Z&&F.otherDemo,[F.darkDemo]:ei}),style:h,children:(0,i.jsxs)(M.f,{children:[(0,i.jsxs)(U,{className:(0,Z.clsx)(F.header,ei&&F.headerDark),children:[(0,i.jsxs)("div",{className:F.logo,children:[(0,i.jsx)("div",{className:F.logoImg,children:(0,i.jsx)("img",{draggable:!1,src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",style:{filter:ee===O.Z?void 0:function(e){let{r:i,g:a,b:t}=new r.FastColor(e).toRgb(),s=1e4*Math.max(i/255,a/255,t/255),l=(180*Math.atan2(Math.sqrt(3)*(a/255-t/255),i/255*2-a/255-t/255)/Math.PI+360)%360;return`invert(${i/255*100}%) sepia(100%) saturate(${s}%) hue-rotate(${l}deg)`}(er)},alt:"antd logo"})}),(0,i.jsx)("h1",{children:"Ant Design"})]}),(0,i.jsxs)(S.f,{className:F.menu,gap:"middle",children:[(0,i.jsx)(l.f,{}),(0,i.jsx)(p.f,{}),"string"==typeof T?(0,i.jsx)("img",{className:F.avatar,src:T,alt:V,title:V,draggable:!1}):(0,i.jsx)(T,{className:F.avatar})]})]}),(0,i.jsxs)(M.f,{hasSider:!0,children:[(0,i.jsx)(q,{theme:ea,width:200,children:(0,i.jsx)(C.f,{mode:"inline",theme:ea,selectedKeys:["Themes"],openKeys:["Design"],style:{height:"100%",borderInlineEnd:0},items:B,expandIcon:!1})}),(0,i.jsxs)(M.f,{style:{padding:"0 24px 24px"},children:[(0,i.jsx)($.f,{style:{margin:"16px 0"},items:[{title:(0,i.jsx)(g.f,{})},{title:"Design",menu:{items:_}},{title:"Themes"}]}),(0,i.jsx)(W,{children:(0,i.jsxs)("div",{className:F.dashboardShell,children:[(0,i.jsxs)(S.f,{className:F.dashboardToolbar,justify:"space-between",align:"center",wrap:!0,gap:"middle",children:[(0,i.jsx)(A.f,{className:F.dashboardTabs,defaultValue:"Overview",options:["Overview","Sales","Expenses"]}),(0,i.jsxs)(P.f,{children:[(0,i.jsx)(k.f,{shape:"circle",icon:(0,i.jsx)(u.f,{})}),(0,i.jsx)(I.f,{value:"monthly",style:{width:144},options:[{value:"monthly",label:(0,i.jsxs)(P.f,{size:6,children:[(0,i.jsx)(n.f,{}),"Monthly"]})}]}),(0,i.jsx)(k.f,{type:"primary",icon:(0,i.jsx)(f.f,{}),children:"Download"})]})]}),(0,i.jsx)(E.f,{gutter:[16,16],className:F.dashboardKpiGrid,children:J.map(e=>(0,i.jsx)(D.f,{xs:24,sm:12,lg:6,children:(0,i.jsxs)(w.f,{children:[(0,i.jsx)(L.f.Text,{type:"secondary",children:e.title}),(0,i.jsxs)("div",{className:F.dashboardStatValue,children:[(0,i.jsx)(G.f,{value:e.value,formatter:i=>`${e.prefix??""}${Number(i).toLocaleString("en-US")}`}),(0,i.jsxs)(z.f,{className:F.dashboardStatTrend,color:e.status,icon:"success"===e.status?(0,i.jsx)(s.f,{}):(0,i.jsx)(t.f,{}),children:[e.trend,"%"]})]})]})},e.title))}),(0,i.jsxs)(w.f,{className:F.dashboardTableCard,title:(0,i.jsxs)(P.f,{children:[(0,i.jsx)(L.f.Title,{level:4,className:F.dashboardPanelTitle,children:"All Employees"}),(0,i.jsx)(z.f,{children:"32"})]}),extra:(0,i.jsx)(N.f,{prefix:(0,i.jsx)(b.f,{}),placeholder:"Search..."}),children:[(0,i.jsx)(S.f,{className:F.dashboardTableActions,justify:"space-between",align:"center",wrap:!0,gap:"middle",children:(0,i.jsxs)(P.f,{wrap:!0,children:[(0,i.jsx)(k.f,{icon:(0,i.jsx)(m.f,{}),children:"Filter"}),(0,i.jsx)(k.f,{icon:(0,i.jsx)(j.f,{}),children:"Sort"}),(0,i.jsx)(k.f,{icon:(0,i.jsx)(o.f,{}),children:"Columns"})]})}),(0,i.jsx)(H.f,{columns:X,dataSource:Q,pagination:!1,size:"middle",scroll:{x:900,y:220}})]})]})})]})]})]})})})},ee=e=>{let{className:r,config:t,style:s,activeTheme:l}=e,n=a.useMemo(()=>(function(e){if(!e)return{theme:{algorithm:K.f.defaultAlgorithm,inherit:!1}};let{theme:i,...a}=e;return{...a,theme:{...i,inherit:!1}}})(t),[t]),o=a.useMemo(()=>{let e=t?.theme?.algorithm;return(Array.isArray(e)?e:e?[e]:[]).includes(K.f.darkAlgorithm)},[t]);return(0,i.jsx)(T.f,{...n,children:(0,i.jsx)(Y,{className:r,activeTheme:l,isDarkTheme:o,style:s})})};e.s(["ThemeDashboard",0,ee,"default",0,ee],196033)},612518,e=>{var i=e.i(409855);e.s(["f",()=>i.f])},289473,9292,e=>{var i=e.i(457474).f;e.s(["f",0,i],289473);var a=e.i(898512).f;e.s(["f",0,a],9292)},844678,69017,e=>{var i=e.i(289473);e.s(["f",()=>i.f],844678);var a=e.i(9292);e.s(["f",()=>a.f],69017)},385558,e=>{let i=(0,e.i(191788).createContext)({});e.s(["f",0,i])},581105,e=>{e.i(495059);var i=e.i(391398),a=e.i(191788),r=e.i(151304),t=e.i(56206),s=e.i(33920),l=e.i(434937),n=e.i(114112),o=e.i(286287),d=e.i(385558),f=e.i(40972);function c(e){return"auto"===e?"1 1 auto":(0,s.H)(e)?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}let h=a.forwardRef((e,h)=>{let{getPrefixCls:m,direction:x}=a.useContext(n.ConfigContext),{gutter:g,wrap:p}=a.useContext(d.f),{prefixCls:u,span:b,order:j,offset:v,push:y,pull:$,className:k,children:w,flex:D,style:T,...S}=e,N=m("col",u),M=m(),[C,E]=(0,f.V)(N),[A]=(0,o.genCssVar)(M,"col"),I={},P={};l.Z.forEach(i=>{let a={},t=e[i];(0,s.H)(t)?a.span=t:(0,s.d)(t)&&(a=t||{}),delete S[i],P={...P,[`${N}-${i}-${a.span}`]:(0,r.isNonNullable)(a.span),[`${N}-${i}-order-${a.order}`]:a.order||0===a.order,[`${N}-${i}-offset-${a.offset}`]:a.offset||0===a.offset,[`${N}-${i}-push-${a.push}`]:a.push||0===a.push,[`${N}-${i}-pull-${a.pull}`]:a.pull||0===a.pull,[`${N}-rtl`]:"rtl"===x},(a.flex||0===a.flex)&&(P[`${N}-${i}-flex`]=!0,I[A(`${i}-flex`)]=c(a.flex))});let G=(0,t.clsx)(N,{[`${N}-${b}`]:void 0!==b,[`${N}-order-${j}`]:j,[`${N}-offset-${v}`]:v,[`${N}-push-${y}`]:y,[`${N}-pull-${$}`]:$},k,P,C,E),H={};return g?.[0]&&(H.paddingInline=(0,s.H)(g[0])?`${g[0]/2}px`:`calc(${g[0]} / 2)`),(D||0===D)&&(H.flex=c(D),!1!==p||H.minWidth||(H.minWidth=0)),(0,i.jsx)("div",{...S,style:{...H,...T,...I},className:G,ref:h,children:w})});e.s(["f",0,h])},457474,e=>{var i=e.i(581105);e.s(["f",()=>i.f])},14547,e=>{var i=e.i(33920),a=e.i(434937);e.s(["f",0,function(e,r){let t=[void 0,void 0],s=Array.isArray(e)?e:[e,void 0],l=r||{xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0,xxxl:!0};return s.forEach((e,r)=>{if((0,i.d)(e))for(let i=0;i<a.x.length;i++){let s=a.x[i];if(l[s]&&void 0!==e[s]){t[r]=e[s];break}}else t[r]=e}),t}])},623282,e=>{e.i(495059);var i=e.i(391398),a=e.i(191788),r=e.i(56206),t=e.i(33920),s=e.i(434937),l=e.i(114112),n=e.i(906229),o=e.i(14547),d=e.i(385558),f=e.i(40972);let c=(e,i)=>{if((0,t.Z)(e))return e;if((0,t.d)(e))for(let a=0;a<s.x.length;a++){let r=s.x[a];if(!i||!i[r])continue;let t=e[r];if(void 0!==t)return t}return""},h=a.forwardRef((e,s)=>{let{prefixCls:h,justify:m,align:x,className:g,style:p,children:u,gutter:b=0,wrap:j,...v}=e,{getPrefixCls:y,direction:$}=a.useContext(l.ConfigContext),k=(0,n.f)(!0,null),w=c(x,k),D=c(m,k),T=y("row",h),[S,N]=(0,f.S)(T),M=(0,o.f)(b,k),C=(0,r.clsx)(T,{[`${T}-no-wrap`]:!1===j,[`${T}-${D}`]:D,[`${T}-${w}`]:w,[`${T}-rtl`]:"rtl"===$},g,S,N),E={};M?.[0]&&(E.marginInline=(0,t.H)(M[0])?`${-(M[0]/2)}px`:`calc(${M[0]} / -2)`);let[A,I]=M;E.rowGap=I;let P=a.useMemo(()=>({gutter:[A,I],wrap:j}),[A,I,j]);return(0,i.jsx)(d.f.Provider,{value:P,children:(0,i.jsx)("div",{...v,className:C,style:{...E,...p},ref:s,children:u})})});e.s(["f",0,h])},898512,e=>{var i=e.i(623282);e.s(["f",()=>i.f])},57170,e=>{var i=e.i(149753);e.s(["f",()=>i.f])},329282,e=>{var i=e.i(95108);e.s(["f",()=>i.f])},724296,e=>{var i=e.i(891989);e.s(["f",()=>i.f])},504595,e=>{var i=e.i(833663);e.s(["f",()=>i.f])},163952,e=>{var i=e.i(549357);e.s(["f",()=>i.f])},473657,e=>{var i=e.i(654930);e.s(["f",()=>i.f])},342458,e=>{var i=e.i(65949);e.s(["f",()=>i.f])},371807,e=>{var i=e.i(193973);e.s(["f",()=>i.f])},770042,e=>{var i=e.i(198968);e.s(["f",()=>i.f])},534825,e=>{var i=e.i(962520);e.s(["f",()=>i.f])},883376,e=>{var i=e.i(513875);e.s(["f",()=>i.f])},177579,e=>{var i=e.i(545029);e.s(["f",()=>i.f])},231372,e=>{var i=e.i(690417);e.s(["f",()=>i.f])}])})();