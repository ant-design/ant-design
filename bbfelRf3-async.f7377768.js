(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["bbfelRf3"],{bbfelRf3:function(e,t,l){l.d(t,"__esModule",{value:!0}),l.d(t,"default",{enumerable:!0,get:function(){return S;}});var s=l("d3__vuQ2"),a=l("hSu6qSb4"),n=l("8Z0rk4BW"),i=a._(l("WyIMPUJp")),r=l("4i_r4BgY"),o=l("qdGieaVz"),d=l("ODWitzHB"),c=s._(l("YAqr4JrW")),u=s._(l("Byq4qat9")),p=s._(l("QNVD7cvc")),x=s._(l("I1Rkhqyq")),g=s._(l("cUqL3oAL")),h=l("sFW1y6Vp");let{_InternalPanelDoNotUseOrYouWillBeFired:f}=o.Modal,{_InternalPanelDoNotUseOrYouWillBeFired:y}=o.DatePicker,{_InternalPanelDoNotUseOrYouWillBeFired:m}=o.Tour,{_InternalPanelDoNotUseOrYouWillBeFired:j}=o.FloatButton,b={cn:{yesterday:"\u6628\u5929",lastWeek:"\u4E0A\u5468",lastMonth:"\u4E0A\u6708",lastYear:"\u53BB\u5E74",new:"\u65B0\u589E",update:"\u66F4\u65B0",sampleContent:"Ant Design 5.0 \u4F7F\u7528 CSS-in-JS \u6280\u672F\u4EE5\u63D0\u4F9B\u52A8\u6001\u4E0E\u6DF7\u5408\u4E3B\u9898\u7684\u80FD\u529B\u3002\u4E0E\u6B64\u540C\u65F6\uFF0C\u6211\u4EEC\u4F7F\u7528\u7EC4\u4EF6\u7EA7\u522B\u7684 CSS-in-JS \u89E3\u51B3\u65B9\u6848\uFF0C\u8BA9\u4F60\u7684\u5E94\u7528\u83B7\u5F97\u66F4\u597D\u7684\u6027\u80FD\u3002",inProgress:"\u8FDB\u884C\u4E2D",success:"\u6210\u529F",taskFailed:"\u4EFB\u52A1\u5931\u8D25",tour:"\u6F2B\u6E38\u5BFC\u89C8\u5E2E\u52A9\u7528\u6237\u5BF9\u65B0\u52A0\u7684\u529F\u80FD\u8FDB\u884C\u5FEB\u901F\u4E86\u89E3"},en:{yesterday:"Yesterday",lastWeek:"Last Week",lastMonth:"Last Month",lastYear:"Last Year",new:"New",update:"Update",sampleContent:"Ant Design 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.",inProgress:"In Progress",success:"Success",taskFailed:"Task Failed",tour:"A quick guide for new come user about how to use app."}},v=()=>{let e=(0,p.default)();return(0,d.createStyles)(({token:t})=>{let{carousel:l}=(0,h.getCarouselStyle)();return{card:(0,d.css)`
        border-radius: ${t.borderRadius}px;
        border: 1px solid ${e?t.colorBorder:"transparent"};
        background: ${e?t.colorBgContainer:"#f5f8ff"};
        padding: ${t.paddingXL}px;
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
        margin-top: ${t.paddingLG}px;
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      `,carousel:l};})();},C=({title:e,node:t,type:l,index:s})=>{let[a]=(0,x.default)(b),r="new"===l?a.new:a.update,{styles:d}=v(),{isMobile:u}=(0,i.useContext)(g.default);return(0,n.jsxs)("div",{className:(0,c.default)(d.card,u&&d.mobileCard),children:[(0,n.jsx)("div",{className:d.cardCircle,style:{right:-(s%2*20)-20,bottom:-(s%3*40)-20}}),(0,n.jsxs)(o.Flex,{align:"center",gap:"small",children:[(0,n.jsx)(o.Typography.Title,{level:4,style:{fontWeight:"normal",margin:0},children:e}),(0,n.jsx)(o.Tag,{color:"new"===l?"processing":"warning",children:r})]}),(0,n.jsx)("div",{className:d.nodeWrap,children:t})]});};var S=()=>{let e=(0,d.useTheme)(),{styles:t}=v(),[l]=(0,x.default)(b),{isMobile:s}=(0,i.useContext)(g.default),a=i.default.useMemo(()=>[{title:"Modal",type:"update",node:(0,n.jsx)(f,{title:"Ant Design 5.0",width:300,children:l.sampleContent})},{title:"DatePicker",type:"update",node:(0,n.jsx)(y,{value:(0,u.default)("2022-11-18 14:00:00"),showToday:!1,presets:s?[]:[{label:l.yesterday,value:(0,u.default)().add(-1,"d")},{label:l.lastWeek,value:(0,u.default)().add(-7,"d")},{label:l.lastMonth,value:(0,u.default)().add(-1,"month")},{label:l.lastYear,value:(0,u.default)().add(-1,"year")}]})},{title:"Progress",type:"update",node:(0,n.jsxs)(o.Flex,{gap:"small",vertical:!0,children:[(0,n.jsxs)(o.Flex,{gap:"small",align:"center",children:[(0,n.jsx)(o.Progress,{type:"circle",trailColor:"#e6f4ff",percent:60,size:14}),l.inProgress]}),(0,n.jsxs)(o.Flex,{gap:"small",align:"center",children:[(0,n.jsx)(o.Progress,{type:"circle",percent:100,size:14}),l.success]}),(0,n.jsxs)(o.Flex,{gap:"small",align:"center",children:[(0,n.jsx)(o.Progress,{type:"circle",status:"exception",percent:88,size:14}),l.taskFailed]})]})},{title:"Tour",type:"new",node:(0,n.jsx)(m,{title:"Ant Design 5.0",description:l.tour,style:{width:s?"auto":350},current:3,total:9})},{title:"FloatButton",type:"new",node:(0,n.jsxs)(o.Flex,{align:"center",gap:"large",children:[(0,n.jsx)(j,{shape:"square",items:[{icon:(0,n.jsx)(r.QuestionCircleOutlined,{})},{icon:(0,n.jsx)(r.CustomerServiceOutlined,{})},{icon:(0,n.jsx)(r.SyncOutlined,{})}]}),(0,n.jsx)(j,{backTop:!0}),(0,n.jsx)(j,{items:[{icon:(0,n.jsx)(r.QuestionCircleOutlined,{})},{icon:(0,n.jsx)(r.CustomerServiceOutlined,{})},{icon:(0,n.jsx)(r.SyncOutlined,{})}]})]})},{title:"Alert",type:"update",node:(0,n.jsx)(o.Alert,{style:{width:400},message:"Ant Design 5.0",description:l.sampleContent,closable:!0})}],[s]);return s?(0,n.jsx)("div",{style:{margin:"0 16px"},children:(0,n.jsx)(o.Carousel,{className:t.carousel,children:a.map(({title:e,node:t,type:l},s)=>(0,n.jsx)(C,{title:e,node:t,type:l,index:s},s))})}):(0,n.jsx)("div",{style:{width:"100%",overflow:"hidden",display:"flex",justifyContent:"center"},children:(0,n.jsx)("div",{style:{display:"flex",alignItems:"stretch",columnGap:e.paddingLG},children:a.map(({title:e,node:t,type:l},s)=>(0,n.jsx)(C,{title:e,node:t,type:l,index:s},s))})});};}}]);
//# sourceMappingURL=bbfelRf3-async.f7377768.js.map