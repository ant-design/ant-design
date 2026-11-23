(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,(()=>{"use strict";return[93447,e=>{var t,o=e.i(391398),i=e.i(191788),r=e.i(309999),n=e.i(651476),a=e.i(183504),l=e.i(316489),s=e.i(975278),c=e.i(747319),d=e.i(827830),u=e.i(16175),g=e.i(116432),p=e.i(979021),h=e.i(996791),m=e.i(906491),f=e.i(56206),b=e.i(582225);let C=(0,d.o)(({cssVar:e,token:t,css:o})=>{let{antCls:i,iconCls:r}=t;return{iconItem:o`
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-inline-start: 0 !important;
      margin-inline-end: 0 !important;
      padding-inline-start: 0 !important;
      padding-inline-end: 0 !important;
      position: relative;
      width: 100%;
      height: 100px;
      overflow: hidden;
      color: #555;
      text-align: center;
      list-style: none;
      background-color: inherit;
      border-radius: ${e.borderRadiusSM};
      cursor: pointer;
      transition: all ${e.motionDurationSlow} ease-in-out;
      ${t.iconCls} {
        margin: ${e.marginXS} 0;
        font-size: 36px;
        transition: transform ${e.motionDurationSlow} ease-in-out;
        will-change: transform;
      }
      &:hover {
        color: ${e.colorWhite};
        background-color: ${e.colorPrimary};
        ${r} {
          transform: scale(1.3);
        }
        ${i}-badge {
          color: ${e.colorWhite};
        }
      }
      &.TwoTone:hover {
        background-color: #8ecafe;
      }
      &.copied:hover {
        color: rgba(255, 255, 255, 0.2);
      }
      &::after {
        content: 'Copied!';
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        line-height: 100px;
        color: ${e.colorTextLightSolid};
        text-align: center;
        background-color: ${e.colorPrimary};
        opacity: 0;
        transition: all ${e.motionDurationSlow} cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }
      &.copied::after {
        opacity: 1;
      }
    `,newIconVersion:o`
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      z-index: 1;
      padding: 0 ${e.paddingXXS};
      color: ${e.colorWhite};
      font-size: ${e.fontSizeSM};
      line-height: ${e.lineHeightSM};
      background-color: ${e.colorSuccess};
      border-start-end-radius: ${e.borderRadiusSM};
      border-end-start-radius: ${e.borderRadiusSM};
    `,anticonCls:o`
      display: block;
      font-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      white-space: nowrap;
      text-align: center;
      transform: scale(0.8);
      ${i}-badge {
        transition: color ${e.motionDurationSlow} ease-in-out;
      }
    `}}),y={cn:{errMessage:"复制名称失败，请重试"},en:{errMessage:"Copy icon name failed, please try again."}};var S=e=>{let{message:t}=h.f.useApp(),{name:r,isNew:a,newIconVersion:l,justCopied:s,theme:c,onCopied:d}=e,[u]=(0,b.default)(y),{styles:g}=C(),p=r.match(/(Outlined|Filled|TwoTone)$/)?.[0]??c;return(0,o.jsxs)("li",{className:(0,f.clsx)(p,g.iconItem,{copied:s===r}),onClick:()=>(async e=>{await (0,m.f)(e)?d(r,e):t.error(u.errMessage)})(`<${r} />`),style:{cursor:"pointer"},children:[a&&(0,o.jsx)("span",{className:g.newIconVersion,children:l}),i.default.createElement(n[r]),(0,o.jsx)("span",{className:g.anticonCls,children:r})]})};let x=(0,d.l)(({css:e,cssVar:t})=>({anticonsList:e`
    margin: ${t.margin} 0;
    overflow: hidden;
    direction: ltr;
    list-style: none;
    display: grid;
    grid-gap: ${t.margin};
    grid-template-columns: repeat(6, minmax(0, 1fr));
    padding: 0;
  `,copiedCode:e`
    padding: 0 ${t.paddingXXS};
    font-size: ${t.fontSizeSM};
    background-color: ${t.colorBgLayout};
    border-radius: ${t.borderRadiusXS};
  `}));var v=e=>{let{message:t}=h.f.useApp(),{icons:r,title:n,newIcons:a,newIconVersion:l,theme:s}=e,c=(0,g.f)(),[d,u]=i.useState(null),p=i.useRef(null),m=i.useCallback((e,i)=>{t.success((0,o.jsxs)("span",{children:[(0,o.jsx)("code",{className:x.copiedCode,children:i})," copied 🎉"]})),u(e),p.current=setTimeout(()=>{u(null)},2e3)},[t,x.copiedCode]);return i.useEffect(()=>()=>{p.current&&clearTimeout(p.current)},[]),(0,o.jsxs)("div",{children:[(0,o.jsx)("h3",{children:c.formatMessage({id:`app.docs.components.icon.category.${n}`})}),(0,o.jsx)("ul",{className:x.anticonsList,children:r.map(e=>(0,o.jsx)(S,{name:e,theme:s,isNew:a.includes(e),newIconVersion:l,justCopied:d,onCopied:m},e))})]})},w=e.i(108054);let k=Object.keys(w).map(e=>e.replace(/(Outlined|Filled|TwoTone)$/,"")).filter((e,t,o)=>(`${e}Outlined`in w||`${e}Filled`in w||`${e}TwoTone`in w)&&o.indexOf(e)===t),T=["StepBackward","StepForward","FastBackward","FastForward","Shrink","ArrowsAlt","Down","Up","Left","Right","CaretUp","CaretDown","CaretLeft","CaretRight","UpCircle","DownCircle","LeftCircle","RightCircle","DoubleRight","DoubleLeft","VerticalLeft","VerticalRight","VerticalAlignTop","VerticalAlignMiddle","VerticalAlignBottom","Forward","Backward","Rollback","Enter","Retweet","Swap","SwapLeft","SwapRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","PlayCircle","UpSquare","DownSquare","LeftSquare","RightSquare","Login","Logout","MenuFold","MenuUnfold","BorderBottom","BorderHorizontal","BorderInner","BorderOuter","BorderLeft","BorderRight","BorderTop","BorderVerticle","PicCenter","PicLeft","PicRight","RadiusBottomleft","RadiusBottomright","RadiusUpleft","RadiusUpright","Fullscreen","FullscreenExit"],A=["Question","QuestionCircle","Plus","PlusCircle","Pause","PauseCircle","Minus","MinusCircle","PlusSquare","MinusSquare","Info","InfoCircle","Exclamation","ExclamationCircle","Close","CloseCircle","CloseSquare","Check","CheckCircle","CheckSquare","ClockCircle","Warning","IssuesClose","Stop"],M=["Edit","Form","Copy","Scissor","Delete","Snippets","Diff","Highlight","AlignCenter","AlignLeft","AlignRight","BgColors","Bold","Italic","Underline","Strikethrough","Redo","Undo","ZoomIn","ZoomOut","FontColors","FontSize","LineHeight","Dash","SmallDash","SortAscending","SortDescending","Drag","OrderedList","UnorderedList","RadiusSetting","ColumnWidth","ColumnHeight"],D=["AreaChart","PieChart","BarChart","DotChart","LineChart","RadarChart","HeatMap","Fall","Rise","Stock","BoxPlot","Fund","Sliders"],F=["Android","Apple","Windows","Ie","IeCircle","IeSquare","Chrome","Github","Aliwangwang","Dingding","WeiboSquare","WeiboCircle","TaobaoCircle","Html5","Weibo","Twitter","TwitterCircle","TwitterSquare","Wechat","WhatsApp","Youtube","AlipayCircle","Taobao","TaobaoSquare","Dingtalk","DingtalkCircle","DingtalkSquare","Skype","Qq","QqCircle","QqSquare","MediumWorkmark","Gitlab","Medium","MediumCircle","MediumSquare","Linkedin","GooglePlus","GooglePlusCircle","GooglePlusSquare","Dropbox","DropboxCircle","DropboxSquare","Facebook","Codepen","CodepenSquare","CodeSandbox","CodeSandboxSquare","CodeSandboxCircle","Amazon","AmazonCircle","AmazonSquare","Google","GoogleCircle","GoogleSquare","CodepenCircle","Alipay","AlipaySquare","AntDesign","AntCloud","Aliyun","Zhihu","ZhihuCircle","ZhihuSquare","Slack","SlackCircle","SlackSquare","Behance","BehanceCircle","BehanceSquare","Dribbble","DribbbleCircle","DribbbleSquare","Instagram","Yuque","Alibaba","Yahoo","Reddit","RedditCircle","RedditSquare","Sketch","SketchCircle","SketchSquare","WechatWork","OpenAI","Anthropic","Claude","Gemini","Mistral","DeepSeek","Qwen","Perplexity","HuggingFace","Ollama","Replicate","ElevenLabs","Telegram","Mastodon","Threads","Snapchat","Discord","X","Bilibili","Pinterest","TikTok","Spotify","Twitch","Linux","Java","JavaScript","Python","Ruby","DotNet","Kubernetes","Docker","Baidu","HarmonyOS"],$=[...T,...A,...M,...D,...F],j={direction:T,suggestion:A,editor:M,data:D,logo:F,other:k.filter(e=>!$.includes(e))},q=["check","done","todo","tick","complete","finish","task","ok","success","confirm","approve","agree","validation","√","✔","✓","勾","对","正确","right"],R=["monetization","marketing","currency","money","payment","finance","cash","bank","transaction","balance","expense","income","budget","investment","savings","profit","cost","wealth","economy","wallet","exchange"],B=["...","。。。","…","more","更多","dots","ellipsis","expand","collapse","menu","dropdown","options","settings","et cetera","etc","loader","loading","progress","pending","throbber","spinner","operator","code","spread","rest","further","extra","overflow"];var L={contributors:["ant-design"],tags:[...R,"ledger"],category:"other"},O={contributors:["ant-design"],tags:[...R],category:"logo"},I={contributors:["ant-design"],tags:q,category:"suggestion"},P={contributors:["ant-design"],tags:[...B,"feedback","discussion","reply","opinion","note"],category:"other"},z={contributors:["ant-design"],tags:[...R],category:"other"},E={contributors:["ant-design"],tags:[...B],category:"editor"},V={contributors:["ant-design"],tags:[...B],category:"other"},W={contributors:["ant-design"],tags:R,category:"other"},H={contributors:["ant-design"],tags:[...B],category:"other"},U={contributors:["ant-design"],tags:[...q],category:"suggestion"},G={contributors:["ant-design"],tags:[...B,"vertical"],category:"other"},N={contributors:["ant-design"],tags:R,category:"other"},Q={contributors:["ant-design"],tags:[...R,"safety","protection","security","shield"],category:"other"},X={contributors:["ant-design"],tags:[...q,"protection","security","shield","safety","privacy"],category:"other"},Z={contributors:["ant-design"],tags:[...q,"time","clock","calendar"],category:"other"},K={contributors:["ant-design"],tags:[...R],category:"other"};let Y=e=>({contributors:["ant-design"],tags:e,category:"logo"}),J={AccountBook:L,Alipay:O,AlipayCircle:O,Bank:{contributors:["ant-design"],tags:R,category:"other"},CarryOut:{contributors:["ant-design"],tags:q,category:"other"},Check:I,CheckCircle:I,CheckSquare:I,ClockSquare:{contributors:["ant-design"],tags:["time","watch","alarm"],category:"suggestion"},Comment:P,Copy:{contributors:["ant-design"],tags:["复制","clone","duplicate"],category:"editor"},CreditCard:z,Dash:E,SmallDash:E,Dollar:{contributors:["ant-design"],tags:R,category:"other"},Ellipsis:V,Euro:W,EuroCircle:W,Holder:H,IssuesClose:U,More:G,PayCircle:{contributors:["ant-design"],tags:R,category:"other"},PoundCircle:N,Pound:N,PropertySafety:Q,RedEnvelope:{contributors:["ant-design"],tags:R,category:"other"},Robot:{contributors:["ant-design"],tags:["ai"],category:"other"},Safety:X,Schedule:Z,Transaction:K,Telegram:Y(["telegram","social","message"]),Mastodon:Y(["mastodon","social"]),Threads:Y(["threads","social"]),Snapchat:Y(["snapchat","social"]),Anthropic:Y(["anthropic","ai","llm"]),Claude:Y(["claude","anthropic","ai","llm"]),Gemini:Y(["gemini","google","ai","llm"]),Mistral:Y(["mistral","ai","llm"]),DeepSeek:Y(["deepseek","deep seek","deep-seek","ai","llm"]),Qwen:Y(["qwen","tongyi","ai","llm"]),Perplexity:Y(["perplexity","ai","llm","search"]),HuggingFace:Y(["huggingface","hugging face","hugging-face","ai","llm"]),Ollama:Y(["ollama","ai","llm"]),Replicate:Y(["replicate","ai","llm"]),ElevenLabs:Y(["elevenlabs","eleven labs","eleven-labs","ai","voice"])},_=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"Filled Icon"}),(0,o.jsx)("path",{d:"M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"})]}),ee=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"Outlined Icon"}),(0,o.jsx)("path",{d:"M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z m-12 800H172c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v680c0 6.6-5.4 12-12 12z"})]}),et=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"TwoTone Icon"}),(0,o.jsx)("path",{d:"M16 512c0 273.932 222.066 496 496 496s496-222.068 496-496S785.932 16 512 16 16 238.066 16 512z m496 368V144c203.41 0 368 164.622 368 368 0 203.41-164.622 368-368 368z"})]});var eo=((t={}).All="All",t.Filled="Filled",t.Outlined="Outlined",t.TwoTone="TwoTone",t);let ei=["Outlined","Filled","TwoTone"],er=(0,d.l)(({css:e,cssVar:t})=>({iconSearchAffix:e`
    display: flex;
    transition: all ${t.motionDurationSlow};
    justify-content: space-between;
  `})),en=["AnthropicFilled","ClaudeFilled","GeminiFilled","MistralFilled","DeepSeekFilled","QwenFilled","PerplexityFilled","HuggingFaceFilled","OllamaFilled","ReplicateFilled","ElevenLabsFilled","TelegramFilled","MastodonFilled","ThreadsFilled","SnapchatFilled"],ea=new Map(en.map((e,t)=>[e,t])),el={searchKey:"",theme:"All"};e.s(["ThemeType",0,eo,"default",0,()=>{let e=(0,g.f)(),t=(0,d.i)(),h=(0,u.f)(),[m,f]=(0,i.useState)(el),b=(0,i.useDeferredValue)(m,el),C=(0,i.useMemo)(()=>(0,p.default)(()=>{let e=document.querySelector("#list-of-icons");e?.scrollIntoView({behavior:h?"instant":"smooth"})},300),[h]);(0,i.useEffect)(()=>()=>{C.cancel()},[C]);let y=(0,i.useCallback)(e=>{f(t=>({...t,theme:e}))},[]),S=(0,i.useMemo)(()=>{var e,t,i,r;let a,{searchKey:s="",theme:c}=b,d=s?.trim();d&&(d=d.replace(/^<([a-z]*)\s\/>$/gi,(e,t)=>t).replace(/(Filled|Outlined|TwoTone)$/,"").toLowerCase());let u=(e=d,t=J,e?Object.keys(t).reduce((o,i)=>{let r=t[i],n=r.category;return r.tags.some(t=>t.toLowerCase().includes(e))&&(o[n]?o[n].icons.push(i):o[n]={category:n,icons:[i]}),o},{}):{}),g=Object.values((i=Object.keys(j).reduce((e,t)=>{let o=j[t];if(d){let e=d;o=o.filter(t=>t.toLowerCase().includes(e))}let i=["CopyrightCircle","DollarCircle"];return o=o.filter(e=>!i.includes(e)),e[t]={category:t,icons:o},e},{}),r=u,a={...i},Object.keys(r).forEach(e=>{a[e]?a[e].icons=Array.from(new Set([...a[e].icons,...r[e].icons])):a[e]=r[e]}),a)).map(e=>{let t=e.icons.flatMap(e=>{var t,o;return t=e,"All"===(o=c)?ei.map(e=>t+e).filter(e=>n[e]):n[t+o]?[t+o]:[]});return e.icons="logo"===e.category?function(e){let t=e.findIndex(e=>ea.has(e));if(-1===t)return e;let o=e.filter(e=>ea.has(e)).sort((e,t)=>ea.get(e)-ea.get(t)),i=e.filter(e=>!ea.has(e));return[...i.slice(0,t),...o,...i.slice(t)]}(t):t,e}).filter(({icons:e})=>!!e.length).map(({category:e,icons:t})=>(0,o.jsx)(v,{title:e,theme:c,icons:t,newIcons:en,newIconVersion:"6.5.0"},e));return g.length?g:(0,o.jsx)(l.f,{style:{margin:"2em 0"}})},[b]),[x,w]=(0,i.useState)(!1),{borderRadius:T,colorBgContainer:A,anchorTop:M}=t,D=i.default.useMemo(()=>[{value:"All",icon:(0,o.jsx)(n.AppstoreOutlined,{}),label:e.formatMessage({id:"app.docs.components.icon.all"})},{value:"Outlined",icon:(0,o.jsx)(r.f,{component:ee}),label:e.formatMessage({id:"app.docs.components.icon.outlined"})},{value:"Filled",icon:(0,o.jsx)(r.f,{component:_}),label:e.formatMessage({id:"app.docs.components.icon.filled"})},{value:"TwoTone",icon:(0,o.jsx)(r.f,{component:et}),label:e.formatMessage({id:"app.docs.components.icon.two-tone"})}],[e]);return(0,o.jsxs)("div",{className:"markdown",children:[(0,o.jsx)(a.f,{offsetTop:M,onChange:w,children:(0,o.jsxs)("div",{className:er.iconSearchAffix,style:x?{boxShadow:"rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px",padding:8,margin:-8,borderRadius:T,backgroundColor:A}:{},children:[(0,o.jsx)(c.f,{size:"large",value:m.theme,options:D,onChange:y}),(0,o.jsx)(s.f.Search,{placeholder:e.formatMessage({id:"app.docs.components.icon.search.placeholder"},{total:k.length}),style:{flex:1,marginInlineStart:16},allowClear:!0,autoFocus:!0,size:"large",variant:"filled",value:m.searchKey,onChange:e=>{let t=e.target.value;f(e=>({...e,searchKey:t})),C()}})]})}),S]})}],93447)},183504,e=>{var t=e.i(599761);e.s(["f",()=>t.f])},316489,e=>{var t=e.i(776875);e.s(["f",()=>t.f])},975278,e=>{var t=e.i(897826);e.s(["f",()=>t.f])},747319,e=>{var t=e.i(107162);e.s(["f",()=>t.f])}]})(),647843,(e,t,o)=>{var i=e.r(995217),r=/^\s+/;t.exports=function(e){return e?e.slice(0,i(e)+1).replace(r,""):e}},995217,(e,t,o)=>{var i=/\s/;t.exports=function(e){for(var t=e.length;t--&&i.test(e.charAt(t)););return t}},979021,(e,t,o)=>{var i=e.r(903275),r=e.r(702063),n=e.r(292921),a=Math.max,l=Math.min;t.exports=function(e,t,o){var s,c,d,u,g,p,h=0,m=!1,f=!1,b=!0;if("function"!=typeof e)throw TypeError("Expected a function");function C(t){var o=s,i=c;return s=c=void 0,h=t,u=e.apply(i,o)}function y(e){var o=e-p,i=e-h;return void 0===p||o>=t||o<0||f&&i>=d}function S(){var e,o,i,n=r();if(y(n))return x(n);g=setTimeout(S,(e=n-p,o=n-h,i=t-e,f?l(i,d-o):i))}function x(e){return(g=void 0,b&&s)?C(e):(s=c=void 0,u)}function v(){var e,o=r(),i=y(o);if(s=arguments,c=this,p=o,i){if(void 0===g)return h=e=p,g=setTimeout(S,t),m?C(e):u;if(f)return clearTimeout(g),g=setTimeout(S,t),C(p)}return void 0===g&&(g=setTimeout(S,t)),u}return t=n(t)||0,i(o)&&(m=!!o.leading,d=(f="maxWait"in o)?a(n(o.maxWait)||0,t):d,b="trailing"in o?!!o.trailing:b),v.cancel=function(){void 0!==g&&clearTimeout(g),h=0,s=p=c=g=void 0},v.flush=function(){return void 0===g?u:x(r())},v}},903275,(e,t,o)=>{t.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},849057,(e,t,o)=>{var i=e.r(912904),r=e.r(432836);t.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==i(e)}},702063,(e,t,o)=>{var i=e.r(247663);t.exports=function(){return i.Date.now()}},292921,(e,t,o)=>{var i=e.r(647843),r=e.r(903275),n=e.r(849057),a=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,s=/^0o[0-7]+$/i,c=parseInt;t.exports=function(e){if("number"==typeof e)return e;if(n(e))return 0/0;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=i(e);var o=l.test(e);return o||s.test(e)?c(e.slice(2),o?2:8):a.test(e)?0/0:+e}}]);