(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["6db7de95"],{"6db7de95":function(e,t,s){"use strict";s.d(t,"__esModule",{value:!0}),s.d(t,"default",{enumerable:!0,get:function(){return k;}});var l=s("777fffbe"),a=s("f19d2b93"),n=l._(s("5b220c3d")),i=s("e22febe0"),r=s("a9d1a279"),o=s("3835a2b7"),d=s("c84cdf47"),c=l._(s("072ab8a9")),u=l._(s("23546486")),p=l._(s("714a8bde")),x=s("40d543ed"),g=s("b055b5cb");let{_InternalPanelDoNotUseOrYouWillBeFired:m}=r.Modal,{_InternalPanelDoNotUseOrYouWillBeFired:f}=r.DatePicker,{_InternalPanelDoNotUseOrYouWillBeFired:h}=r.Tour,{_InternalPanelDoNotUseOrYouWillBeFired:y}=r.FloatButton,b={cn:{yesterday:"\u6628\u5929",lastWeek:"\u4E0A\u5468",lastMonth:"\u4E0A\u6708",lastYear:"\u53BB\u5E74",new:"\u65B0\u589E",update:"\u66F4\u65B0",sampleContent:"Ant Design \u4F7F\u7528 CSS-in-JS \u6280\u672F\u4EE5\u63D0\u4F9B\u52A8\u6001\u4E0E\u6DF7\u5408\u4E3B\u9898\u7684\u80FD\u529B\u3002\u4E0E\u6B64\u540C\u65F6\uFF0C\u6211\u4EEC\u4F7F\u7528\u7EC4\u4EF6\u7EA7\u522B\u7684 CSS-in-JS \u89E3\u51B3\u65B9\u6848\uFF0C\u8BA9\u4F60\u7684\u5E94\u7528\u83B7\u5F97\u66F4\u597D\u7684\u6027\u80FD\u3002",inProgress:"\u8FDB\u884C\u4E2D",success:"\u6210\u529F",taskFailed:"\u4EFB\u52A1\u5931\u8D25",tour:"\u6F2B\u6E38\u5BFC\u89C8\u5E2E\u52A9\u7528\u6237\u5BF9\u65B0\u52A0\u7684\u529F\u80FD\u8FDB\u884C\u5FEB\u901F\u4E86\u89E3"},en:{yesterday:"Yesterday",lastWeek:"Last Week",lastMonth:"Last Month",lastYear:"Last Year",new:"New",update:"Update",sampleContent:"Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.",inProgress:"In Progress",success:"Success",taskFailed:"Task Failed",tour:"A quick guide for new come user about how to use app."}},j=(0,o.createStyles)(({cssVar:e},t)=>{let{carousel:s}=(0,g.getCarouselStyle)();return{card:(0,o.css)`
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
    `,cardCircle:(0,o.css)`
      position: absolute;
      width: 120px;
      height: 120px;
      background: #1677ff;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.1;
    `,mobileCard:(0,o.css)`
      height: 395px;
    `,nodeWrap:(0,o.css)`
      margin-top: ${e.paddingLG};
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `,carousel:s,componentsList:(0,o.css)`
      width: 100%;
      overflow: hidden;
    `,mobileComponentsList:(0,o.css)`
      margin: 0 ${e.margin};
    `};}),C=({title:e,node:t,type:s,index:l})=>{let[i]=(0,u.default)(b),o="new"===s?i.new:i.update,c=n.default.use(x.DarkContext),{isMobile:g}=n.default.use(p.default),{styles:m}=j(c);return(0,a.jsxs)("div",{className:(0,d.clsx)(m.card,g&&m.mobileCard),children:[(0,a.jsx)("div",{className:m.cardCircle,style:{insetInlineEnd:-(l%2*20)-20,bottom:-(l%3*40)-20}}),(0,a.jsxs)(r.Flex,{align:"center",gap:"small",children:[(0,a.jsx)(r.Typography.Title,{level:4,style:{fontWeight:"normal",margin:0},children:e}),(0,a.jsx)(r.Tag,{color:"new"===s?"processing":"warning",children:o})]}),(0,a.jsx)("div",{className:m.nodeWrap,children:t})]});};var k=()=>{let{styles:e}=j(),[t]=(0,u.default)(b),{isMobile:s}=n.default.use(p.default),l=n.default.useMemo(()=>[{title:"Modal",type:"update",node:(0,a.jsx)(m,{title:"Ant Design",width:300,children:t.sampleContent})},{title:"DatePicker",type:"update",node:(0,a.jsx)(f,{value:(0,c.default)("2022-11-18 14:00:00"),showToday:!1,presets:s?[]:[{label:t.yesterday,value:(0,c.default)().add(-1,"d")},{label:t.lastWeek,value:(0,c.default)().add(-7,"d")},{label:t.lastMonth,value:(0,c.default)().add(-1,"month")},{label:t.lastYear,value:(0,c.default)().add(-1,"year")}]})},{title:"Progress",type:"update",node:(0,a.jsxs)(r.Flex,{gap:"small",vertical:!0,children:[(0,a.jsxs)(r.Flex,{gap:"small",align:"center",children:[(0,a.jsx)(r.Progress,{type:"circle",railColor:"#e6f4ff",percent:60,size:14}),t.inProgress]}),(0,a.jsxs)(r.Flex,{gap:"small",align:"center",children:[(0,a.jsx)(r.Progress,{type:"circle",percent:100,size:14}),t.success]}),(0,a.jsxs)(r.Flex,{gap:"small",align:"center",children:[(0,a.jsx)(r.Progress,{type:"circle",status:"exception",percent:88,size:14}),t.taskFailed]})]})},{title:"Tour",type:"new",node:(0,a.jsx)(h,{title:"Ant Design",description:t.tour,style:{width:s?"auto":350},current:3,total:9})},{title:"FloatButton",type:"new",node:(0,a.jsxs)(r.Flex,{align:"center",gap:"large",children:[(0,a.jsx)(y,{shape:"square",items:[{icon:(0,a.jsx)(i.QuestionCircleOutlined,{})},{icon:(0,a.jsx)(i.CustomerServiceOutlined,{})},{icon:(0,a.jsx)(i.SyncOutlined,{})}]}),(0,a.jsx)(y,{backTop:!0}),(0,a.jsx)(y,{items:[{icon:(0,a.jsx)(i.QuestionCircleOutlined,{})},{icon:(0,a.jsx)(i.CustomerServiceOutlined,{})},{icon:(0,a.jsx)(i.SyncOutlined,{})}]})]})},{title:"Alert",type:"update",node:(0,a.jsx)(r.Alert,{style:{width:400},title:"Ant Design",description:t.sampleContent,closable:{closeIcon:!0,disabled:!0}})}],[s,t.inProgress,t.lastMonth,t.lastWeek,t.lastYear,t.sampleContent,t.success,t.taskFailed,t.tour,t.yesterday]);return s?(0,a.jsx)("div",{className:e.mobileComponentsList,children:(0,a.jsx)(r.Carousel,{className:e.carousel,children:l.map(({title:e,node:t,type:s},l)=>(0,a.jsx)(C,{title:e,node:t,type:s,index:l},`mobile-item-${l}`))})}):(0,a.jsx)(r.Flex,{justify:"center",className:e.componentsList,children:(0,a.jsx)(r.Flex,{align:"stretch",gap:"large",children:l.map(({title:e,node:t,type:s},l)=>(0,a.jsx)(C,{title:e,node:t,type:s,index:l},`desktop-item-${l}`))})});};}}]);