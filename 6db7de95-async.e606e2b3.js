(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["6db7de95"],{"6db7de95":function(e,t,a){"use strict";a.d(t,"__esModule",{value:!0}),a.d(t,"default",{enumerable:!0,get:function(){return k;}});var l=a("777fffbe"),s=a("f19d2b93"),n=l._(a("5b220c3d")),i=a("e22febe0"),r=a("a9d1a279"),d=a("3835a2b7"),o=a("c84cdf47"),c=l._(a("072ab8a9")),u=l._(a("23546486")),p=l._(a("714a8bde")),h=a("40d543ed"),y=a("b055b5cb");let{_InternalPanelDoNotUseOrYouWillBeFired:f}=r.DatePicker,{_InternalPanelDoNotUseOrYouWillBeFired:x}=r.Tour,{_InternalPanelDoNotUseOrYouWillBeFired:g}=r.FloatButton,m={cn:{yesterday:"\u6628\u5929",lastWeek:"\u4E0A\u5468",lastMonth:"\u4E0A\u6708",lastYear:"\u53BB\u5E74",new:"\u65B0\u589E",update:"\u66F4\u65B0",sampleContent:"Ant Design \u4F7F\u7528 CSS-in-JS \u6280\u672F\u4EE5\u63D0\u4F9B\u52A8\u6001\u4E0E\u6DF7\u5408\u4E3B\u9898\u7684\u80FD\u529B\u3002\u4E0E\u6B64\u540C\u65F6\uFF0C\u6211\u4EEC\u4F7F\u7528\u7EC4\u4EF6\u7EA7\u522B\u7684 CSS-in-JS \u89E3\u51B3\u65B9\u6848\uFF0C\u8BA9\u4F60\u7684\u5E94\u7528\u83B7\u5F97\u66F4\u597D\u7684\u6027\u80FD\u3002",inProgress:"\u8FDB\u884C\u4E2D",success:"\u6210\u529F",taskFailed:"\u4EFB\u52A1\u5931\u8D25",tour:"\u6F2B\u6E38\u5BFC\u89C8\u5E2E\u52A9\u7528\u6237\u5BF9\u65B0\u52A0\u7684\u529F\u80FD\u8FDB\u884C\u5FEB\u901F\u4E86\u89E3"},en:{yesterday:"Yesterday",lastWeek:"Last Week",lastMonth:"Last Month",lastYear:"Last Year",new:"New",update:"Update",sampleContent:"Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.",inProgress:"In Progress",success:"Success",taskFailed:"Task Failed",tour:"A quick guide for new come user about how to use app."}},b=(0,d.createStyles)(({cssVar:e},t)=>{let{carousel:a}=(0,y.getCarouselStyle)();return{card:(0,d.css)`
      border-radius: ${e.borderRadius};
      border: 1px solid ${t?e.colorBorder:"transparent"};
      background-color: ${t?e.colorBgContainer:"#f5f8ff"};
      padding: ${e.paddingXL};
      flex: none;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      > * {
        flex: none;
      }
    `,cardCircle:(0,d.css)`
      position: absolute;
      width: 120px;
      height: 120px;
      background: #1677ff;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.1;
    `,mobileCard:(0,d.css)`
      height: 395px;
    `,nodeWrap:(0,d.css)`
      margin-top: ${e.paddingLG};
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `,carousel:a,componentsList:(0,d.css)`
      width: 100%;
      overflow: hidden;
    `,mobileComponentsList:(0,d.css)`
      margin: 0 ${e.margin};
    `};}),j=({title:e,node:t,type:a,index:l})=>{let[i]=(0,u.default)(m),d="new"===a?i.new:i.update,c=n.default.use(h.DarkContext),{isMobile:y}=n.default.use(p.default),{styles:f}=b(c);return(0,s.jsxs)("div",{className:(0,o.clsx)(f.card,y&&f.mobileCard),children:[(0,s.jsx)("div",{className:f.cardCircle,style:{insetInlineEnd:-(l%2*20)-20,bottom:-(l%3*40)-20}}),(0,s.jsxs)(r.Flex,{align:"center",gap:"small",children:[(0,s.jsx)(r.Typography.Title,{level:4,style:{fontWeight:"normal",margin:0},children:e}),(0,s.jsx)(r.Tag,{color:"new"===a?"processing":"warning",children:d})]}),(0,s.jsx)("div",{className:f.nodeWrap,children:t})]});};var k=()=>{let{styles:e}=b(),[t]=(0,u.default)(m),{isMobile:a}=n.default.use(p.default),l=n.default.use(h.DarkContext),d=n.default.useMemo(()=>[{title:"DatePicker",type:"update",node:(0,s.jsx)(f,{value:(0,c.default)("2025-11-22 00:00:00"),showToday:!1,presets:a?[]:[{label:t.yesterday,value:(0,c.default)().add(-1,"d")},{label:t.lastWeek,value:(0,c.default)().add(-7,"d")},{label:t.lastMonth,value:(0,c.default)().add(-1,"month")},{label:t.lastYear,value:(0,c.default)().add(-1,"year")}]})},{title:"Tour",type:"update",node:(0,s.jsx)(x,{title:"Ant Design",description:t.tour,style:{width:a?"auto":350},current:3,total:9})},{title:"FloatButton",type:"update",node:(0,s.jsxs)(r.Flex,{align:"center",gap:"large",children:[(0,s.jsx)(g,{shape:"square",items:[{icon:(0,s.jsx)(i.QuestionCircleOutlined,{})},{icon:(0,s.jsx)(i.CustomerServiceOutlined,{})},{icon:(0,s.jsx)(i.SyncOutlined,{})}]}),(0,s.jsx)(g,{backTop:!0}),(0,s.jsx)(g,{items:[{icon:(0,s.jsx)(i.QuestionCircleOutlined,{})},{icon:(0,s.jsx)(i.CustomerServiceOutlined,{})},{icon:(0,s.jsx)(i.SyncOutlined,{})}]})]})},{title:"Splitter",type:"new",node:(0,s.jsxs)(r.Splitter,{orientation:"vertical",style:{height:320,width:200,background:l?"#1f1f1f":"#ffffff",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"},children:[(0,s.jsx)(r.Splitter.Panel,{defaultSize:"40%",min:"20%",max:"70%",children:(0,s.jsx)(r.Flex,{justify:"center",align:"center",style:{height:"100%"},children:(0,s.jsx)(r.Typography.Title,{type:"secondary",level:5,style:{whiteSpace:"nowrap"},children:"First"})})}),(0,s.jsx)(r.Splitter.Panel,{children:(0,s.jsx)(r.Flex,{justify:"center",align:"center",style:{height:"100%"},children:(0,s.jsx)(r.Typography.Title,{type:"secondary",level:5,style:{whiteSpace:"nowrap"},children:"Second"})})})]})},{title:"Masonry",type:"new",node:(0,s.jsx)(r.Masonry,{columns:2,gutter:8,style:{width:300,height:320},items:[{key:"1",data:80},{key:"2",data:60},{key:"3",data:40},{key:"4",data:120},{key:"5",data:90},{key:"6",data:40},{key:"7",data:60},{key:"8",data:70},{key:"9",data:120}],itemRender:({data:e,index:t})=>(0,s.jsx)(r.Card,{size:"small",style:{height:e},children:t+1})})}],[l,a,t.inProgress,t.lastMonth,t.lastWeek,t.lastYear,t.sampleContent,t.success,t.taskFailed,t.tour,t.yesterday]);return a?(0,s.jsx)("div",{className:e.mobileComponentsList,children:(0,s.jsx)(r.Carousel,{className:e.carousel,children:d.map(({title:e,node:t,type:a},l)=>(0,s.jsx)(j,{title:e,node:t,type:a,index:l},`mobile-item-${l}`))})}):(0,s.jsx)(r.Flex,{justify:"center",className:e.componentsList,children:(0,s.jsx)(r.Flex,{align:"stretch",gap:"large",children:d.map(({title:e,node:t,type:a},l)=>(0,s.jsx)(j,{title:e,node:t,type:a,index:l},`desktop-item-${l}`))})});};}}]);