(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,93447,e=>{"use strict";var t,o=e.i(391398),i=e.i(191788),r=e.i(309999),n=e.i(651476),a=e.i(183504),l=e.i(316489),s=e.i(975278),c=e.i(747319),d=e.i(827830),u=e.i(116432),g=e.i(979021),p=e.i(996791),h=e.i(906491),m=e.i(56206),f=e.i(582225);let b=(0,d.createStyles)(({cssVar:e,token:t,css:o})=>{let{antCls:i,iconCls:r}=t;return{iconItem:o`
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
    `}}),C={cn:{errMessage:"复制名称失败，请重试"},en:{errMessage:"Copy icon name failed, please try again."}};var y=e=>{let{message:t}=p.f.useApp(),{name:r,isNew:a,newIconVersion:l,justCopied:s,theme:c,onCopied:d}=e,[u]=(0,f.default)(C),{styles:g}=b(),y=async e=>{await (0,h.f)(e)?d(r,e):t.error(u.errMessage)},S=r.match(/(Outlined|Filled|TwoTone)$/)?.[0]??c;return(0,o.jsxs)("li",{className:(0,m.clsx)(S,g.iconItem,{copied:s===r}),onClick:()=>y(`<${r} />`),style:{cursor:"pointer"},children:[a&&(0,o.jsx)("span",{className:g.newIconVersion,children:l}),i.default.createElement(n[r]),(0,o.jsx)("span",{className:g.anticonCls,children:r})]})};let S=(0,d.createStaticStyles)(({css:e,cssVar:t})=>({anticonsList:e`
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
  `}));var x=e=>{let{message:t}=p.f.useApp(),{icons:r,title:n,newIcons:a,newIconVersion:l,theme:s}=e,c=(0,u.f)(),[d,g]=i.useState(null),h=i.useRef(null),m=i.useCallback((e,i)=>{t.success((0,o.jsxs)("span",{children:[(0,o.jsx)("code",{className:S.copiedCode,children:i})," copied 🎉"]})),g(e),h.current=setTimeout(()=>{g(null)},2e3)},[t,S.copiedCode]);return i.useEffect(()=>()=>{h.current&&clearTimeout(h.current)},[]),(0,o.jsxs)("div",{children:[(0,o.jsx)("h3",{children:c.formatMessage({id:`app.docs.components.icon.category.${n}`})}),(0,o.jsx)("ul",{className:S.anticonsList,children:r.map(e=>(0,o.jsx)(y,{name:e,theme:s,isNew:a.includes(e),newIconVersion:l,justCopied:d,onCopied:m},e))})]})},v=e.i(108054);let w=Object.keys(v).map(e=>e.replace(/(Outlined|Filled|TwoTone)$/,"")).filter((e,t,o)=>(`${e}Outlined`in v||`${e}Filled`in v||`${e}TwoTone`in v)&&o.indexOf(e)===t),k=["StepBackward","StepForward","FastBackward","FastForward","Shrink","ArrowsAlt","Down","Up","Left","Right","CaretUp","CaretDown","CaretLeft","CaretRight","UpCircle","DownCircle","LeftCircle","RightCircle","DoubleRight","DoubleLeft","VerticalLeft","VerticalRight","VerticalAlignTop","VerticalAlignMiddle","VerticalAlignBottom","Forward","Backward","Rollback","Enter","Retweet","Swap","SwapLeft","SwapRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","PlayCircle","UpSquare","DownSquare","LeftSquare","RightSquare","Login","Logout","MenuFold","MenuUnfold","BorderBottom","BorderHorizontal","BorderInner","BorderOuter","BorderLeft","BorderRight","BorderTop","BorderVerticle","PicCenter","PicLeft","PicRight","RadiusBottomleft","RadiusBottomright","RadiusUpleft","RadiusUpright","Fullscreen","FullscreenExit"],T=["Question","QuestionCircle","Plus","PlusCircle","Pause","PauseCircle","Minus","MinusCircle","PlusSquare","MinusSquare","Info","InfoCircle","Exclamation","ExclamationCircle","Close","CloseCircle","CloseSquare","Check","CheckCircle","CheckSquare","ClockCircle","Warning","IssuesClose","Stop"],A=["Edit","Form","Copy","Scissor","Delete","Snippets","Diff","Highlight","AlignCenter","AlignLeft","AlignRight","BgColors","Bold","Italic","Underline","Strikethrough","Redo","Undo","ZoomIn","ZoomOut","FontColors","FontSize","LineHeight","Dash","SmallDash","SortAscending","SortDescending","Drag","OrderedList","UnorderedList","RadiusSetting","ColumnWidth","ColumnHeight"],M=["AreaChart","PieChart","BarChart","DotChart","LineChart","RadarChart","HeatMap","Fall","Rise","Stock","BoxPlot","Fund","Sliders"],F=["Android","Apple","Windows","Ie","IeCircle","IeSquare","Chrome","Github","Aliwangwang","Dingding","WeiboSquare","WeiboCircle","TaobaoCircle","Html5","Weibo","Twitter","TwitterCircle","TwitterSquare","Wechat","WhatsApp","Youtube","AlipayCircle","Taobao","TaobaoSquare","Dingtalk","DingtalkCircle","DingtalkSquare","Skype","Qq","QqCircle","QqSquare","MediumWorkmark","Gitlab","Medium","MediumCircle","MediumSquare","Linkedin","GooglePlus","GooglePlusCircle","GooglePlusSquare","Dropbox","DropboxCircle","DropboxSquare","Facebook","Codepen","CodepenSquare","CodeSandbox","CodeSandboxSquare","CodeSandboxCircle","Amazon","AmazonCircle","AmazonSquare","Google","GoogleCircle","GoogleSquare","CodepenCircle","Alipay","AlipaySquare","AntDesign","AntCloud","Aliyun","Zhihu","ZhihuCircle","ZhihuSquare","Slack","SlackCircle","SlackSquare","Behance","BehanceCircle","BehanceSquare","Dribbble","DribbbleCircle","DribbbleSquare","Instagram","Yuque","Alibaba","Yahoo","Reddit","RedditCircle","RedditSquare","Sketch","SketchCircle","SketchSquare","WechatWork","OpenAI","Anthropic","Claude","Gemini","Mistral","DeepSeek","Qwen","Perplexity","HuggingFace","Ollama","Replicate","ElevenLabs","Telegram","Mastodon","Threads","Snapchat","Discord","X","Bilibili","Pinterest","TikTok","Spotify","Twitch","Linux","Java","JavaScript","Python","Ruby","DotNet","Kubernetes","Docker","Baidu","HarmonyOS"],D=[...k,...T,...A,...M,...F],$={direction:k,suggestion:T,editor:A,data:M,logo:F,other:w.filter(e=>!D.includes(e))},j=["check","done","todo","tick","complete","finish","task","ok","success","confirm","approve","agree","validation","√","✔","✓","勾","对","正确","right"],q=["monetization","marketing","currency","money","payment","finance","cash","bank","transaction","balance","expense","income","budget","investment","savings","profit","cost","wealth","economy","wallet","exchange"],R=["...","。。。","…","more","更多","dots","ellipsis","expand","collapse","menu","dropdown","options","settings","et cetera","etc","loader","loading","progress","pending","throbber","spinner","operator","code","spread","rest","further","extra","overflow"];var B={contributors:["ant-design"],tags:[...q,"ledger"],category:"other"},L={contributors:["ant-design"],tags:[...q],category:"logo"},I={contributors:["ant-design"],tags:j,category:"suggestion"},O={contributors:["ant-design"],tags:[...R,"feedback","discussion","reply","opinion","note"],category:"other"},P={contributors:["ant-design"],tags:[...q],category:"other"},z={contributors:["ant-design"],tags:[...R],category:"editor"},E={contributors:["ant-design"],tags:q,category:"other"},W={contributors:["ant-design"],tags:[...j],category:"suggestion"},H={contributors:["ant-design"],tags:q,category:"other"},V={contributors:["ant-design"],tags:[...q,"safety","protection","security","shield"],category:"other"},U={contributors:["ant-design"],tags:[...j,"protection","security","shield","safety","privacy"],category:"other"},G={contributors:["ant-design"],tags:[...j,"time","clock","calendar"],category:"other"},N={contributors:["ant-design"],tags:[...q],category:"other"};let Q=e=>({contributors:["ant-design"],tags:e,category:"logo"}),X={AccountBook:B,Alipay:L,AlipayCircle:L,Bank:{contributors:["ant-design"],tags:q,category:"other"},CarryOut:{contributors:["ant-design"],tags:j,category:"other"},Check:I,CheckCircle:I,CheckSquare:I,ClockSquare:{contributors:["ant-design"],tags:["time","watch","alarm"],category:"suggestion"},Comment:O,Copy:{contributors:["ant-design"],tags:["复制","clone","duplicate"],category:"editor"},CreditCard:P,Dash:z,SmallDash:z,Dollar:{contributors:["ant-design"],tags:q,category:"other"},Ellipsis:{contributors:["ant-design"],tags:[...R],category:"other"},Euro:E,EuroCircle:E,Holder:{contributors:["ant-design"],tags:[...R],category:"other"},IssuesClose:W,More:{contributors:["ant-design"],tags:[...R,"vertical"],category:"other"},PayCircle:{contributors:["ant-design"],tags:q,category:"other"},PoundCircle:H,Pound:H,PropertySafety:V,RedEnvelope:{contributors:["ant-design"],tags:q,category:"other"},Robot:{contributors:["ant-design"],tags:["ai"],category:"other"},Safety:U,Schedule:G,Transaction:N,Telegram:Q(["telegram","social","message"]),Mastodon:Q(["mastodon","social"]),Threads:Q(["threads","social"]),Snapchat:Q(["snapchat","social"]),Anthropic:Q(["anthropic","ai","llm"]),Claude:Q(["claude","anthropic","ai","llm"]),Gemini:Q(["gemini","google","ai","llm"]),Mistral:Q(["mistral","ai","llm"]),DeepSeek:Q(["deepseek","deep seek","deep-seek","ai","llm"]),Qwen:Q(["qwen","tongyi","ai","llm"]),Perplexity:Q(["perplexity","ai","llm","search"]),HuggingFace:Q(["huggingface","hugging face","hugging-face","ai","llm"]),Ollama:Q(["ollama","ai","llm"]),Replicate:Q(["replicate","ai","llm"]),ElevenLabs:Q(["elevenlabs","eleven labs","eleven-labs","ai","voice"])},Z=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"Filled Icon"}),(0,o.jsx)("path",{d:"M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"})]}),K=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"Outlined Icon"}),(0,o.jsx)("path",{d:"M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z m-12 800H172c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v680c0 6.6-5.4 12-12 12z"})]}),Y=e=>(0,o.jsxs)("svg",{...e,viewBox:"0 0 1024 1024",children:[(0,o.jsx)("title",{children:"TwoTone Icon"}),(0,o.jsx)("path",{d:"M16 512c0 273.932 222.066 496 496 496s496-222.068 496-496S785.932 16 512 16 16 238.066 16 512z m496 368V144c203.41 0 368 164.622 368 368 0 203.41-164.622 368-368 368z"})]});var J=((t={}).All="All",t.Filled="Filled",t.Outlined="Outlined",t.TwoTone="TwoTone",t);let _=["Outlined","Filled","TwoTone"],ee=(0,d.createStaticStyles)(({css:e,cssVar:t})=>({iconSearchAffix:e`
    display: flex;
    transition: all ${t.motionDurationSlow};
    justify-content: space-between;
  `})),et=["AnthropicFilled","ClaudeFilled","GeminiFilled","MistralFilled","DeepSeekFilled","QwenFilled","PerplexityFilled","HuggingFaceFilled","OllamaFilled","ReplicateFilled","ElevenLabsFilled","TelegramFilled","MastodonFilled","ThreadsFilled","SnapchatFilled"],eo=new Map(et.map((e,t)=>[e,t]));e.s(["ThemeType",()=>J,"default",0,()=>{let e=(0,u.f)(),[t,p]=(0,i.useState)({searchKey:"",theme:"All"}),h=(0,d.useTheme)(),m=(0,g.default)(e=>{p(t=>({...t,searchKey:e.target.value})),document.getElementById("list-of-icons")?.scrollIntoView({behavior:"smooth"})},300),f=(0,i.useCallback)(e=>{p(t=>({...t,theme:e}))},[]),b=(0,i.useMemo)(()=>{var e,i,r,a;let s,{searchKey:c="",theme:d}=t,u=c?.trim();u&&(u=u.replace(/^<([a-z]*)\s\/>$/gi,(e,t)=>t).replace(/(Filled|Outlined|TwoTone)$/,"").toLowerCase());let g=(e=u,i=X,e?Object.keys(i).reduce((t,o)=>{let r=i[o],n=r.category;return r.tags.some(t=>t.toLowerCase().includes(e))&&(t[n]?t[n].icons.push(o):t[n]={category:n,icons:[o]}),t},{}):{}),p=Object.values((r=Object.keys($).reduce((e,t)=>{let o=$[t];if(u){let e=u;o=o.filter(t=>t.toLowerCase().includes(e))}let i=["CopyrightCircle","DollarCircle"];return o=o.filter(e=>!i.includes(e)),e[t]={category:t,icons:o},e},{}),a=g,s={...r},Object.keys(a).forEach(e=>{s[e]?s[e].icons=Array.from(new Set([...s[e].icons,...a[e].icons])):s[e]=a[e]}),s)).map(e=>{let t=e.icons.flatMap(e=>{var t,o;return t=e,"All"===(o=d)?_.map(e=>t+e).filter(e=>n[e]):n[t+o]?[t+o]:[]});return e.icons="logo"===e.category?function(e){let t=e.findIndex(e=>eo.has(e));if(-1===t)return e;let o=e.filter(e=>eo.has(e)).sort((e,t)=>eo.get(e)-eo.get(t)),i=e.filter(e=>!eo.has(e));return[...i.slice(0,t),...o,...i.slice(t)]}(t):t,e}).filter(({icons:e})=>!!e.length).map(({category:e,icons:t})=>(0,o.jsx)(x,{title:e,theme:d,icons:t,newIcons:et,newIconVersion:"6.5.0"},e));return p.length?p:(0,o.jsx)(l.f,{style:{margin:"2em 0"}})},[t]),[C,y]=(0,i.useState)(!1),{borderRadius:S,colorBgContainer:v,anchorTop:k}=h,T=i.default.useMemo(()=>[{value:"All",icon:(0,o.jsx)(n.AppstoreOutlined,{}),label:e.formatMessage({id:"app.docs.components.icon.all"})},{value:"Outlined",icon:(0,o.jsx)(r.f,{component:K}),label:e.formatMessage({id:"app.docs.components.icon.outlined"})},{value:"Filled",icon:(0,o.jsx)(r.f,{component:Z}),label:e.formatMessage({id:"app.docs.components.icon.filled"})},{value:"TwoTone",icon:(0,o.jsx)(r.f,{component:Y}),label:e.formatMessage({id:"app.docs.components.icon.two-tone"})}],[e]);return(0,o.jsxs)("div",{className:"markdown",children:[(0,o.jsx)(a.f,{offsetTop:k,onChange:y,children:(0,o.jsxs)("div",{className:ee.iconSearchAffix,style:C?{boxShadow:"rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px",padding:8,margin:-8,borderRadius:S,backgroundColor:v}:{},children:[(0,o.jsx)(c.f,{size:"large",value:t.theme,options:T,onChange:f}),(0,o.jsx)(s.f.Search,{placeholder:e.formatMessage({id:"app.docs.components.icon.search.placeholder"},{total:w.length}),style:{flex:1,marginInlineStart:16},allowClear:!0,autoFocus:!0,size:"large",variant:"filled",onChange:m})]})}),b]})}],93447)},183504,e=>{"use strict";var t=e.i(599761);e.s(["f",()=>t.f])},316489,e=>{"use strict";var t=e.i(776875);e.s(["f",()=>t.f])},975278,e=>{"use strict";var t=e.i(897826);e.s(["f",()=>t.f])},747319,e=>{"use strict";var t=e.i(107162);e.s(["f",()=>t.f])},903275,(e,t,o)=>{t.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},849057,(e,t,o)=>{var i=e.r(912904),r=e.r(432836);t.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==i(e)}},702063,(e,t,o)=>{var i=e.r(247663);t.exports=function(){return i.Date.now()}},995217,(e,t,o)=>{var i=/\s/;t.exports=function(e){for(var t=e.length;t--&&i.test(e.charAt(t)););return t}},647843,(e,t,o)=>{var i=e.r(995217),r=/^\s+/;t.exports=function(e){return e?e.slice(0,i(e)+1).replace(r,""):e}},292921,(e,t,o)=>{var i=e.r(647843),r=e.r(903275),n=e.r(849057),a=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,s=/^0o[0-7]+$/i,c=parseInt;t.exports=function(e){if("number"==typeof e)return e;if(n(e))return 0/0;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=i(e);var o=l.test(e);return o||s.test(e)?c(e.slice(2),o?2:8):a.test(e)?0/0:+e}},979021,(e,t,o)=>{var i=e.r(903275),r=e.r(702063),n=e.r(292921),a=Math.max,l=Math.min;t.exports=function(e,t,o){var s,c,d,u,g,p,h=0,m=!1,f=!1,b=!0;if("function"!=typeof e)throw TypeError("Expected a function");function C(t){var o=s,i=c;return s=c=void 0,h=t,u=e.apply(i,o)}function y(e){var o=e-p,i=e-h;return void 0===p||o>=t||o<0||f&&i>=d}function S(){var e,o,i,n=r();if(y(n))return x(n);g=setTimeout(S,(e=n-p,o=n-h,i=t-e,f?l(i,d-o):i))}function x(e){return(g=void 0,b&&s)?C(e):(s=c=void 0,u)}function v(){var e,o=r(),i=y(o);if(s=arguments,c=this,p=o,i){if(void 0===g)return h=e=p,g=setTimeout(S,t),m?C(e):u;if(f)return clearTimeout(g),g=setTimeout(S,t),C(p)}return void 0===g&&(g=setTimeout(S,t)),u}return t=n(t)||0,i(o)&&(m=!!o.leading,d=(f="maxWait"in o)?a(n(o.maxWait)||0,t):d,b="trailing"in o?!!o.trailing:b),v.cancel=function(){void 0!==g&&clearTimeout(g),h=0,s=p=c=g=void 0},v.flush=function(){return void 0===g?u:x(r())},v}}]);