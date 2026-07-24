(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,434408,e=>{"use strict";var t=e.i(391398),a=e.i(191788),l=e.i(54899),r=e.i(38415),i=e.i(827830),n=e.i(56206),d=e.i(494834);let s=(0,i.createStyles)(({cssVar:e,css:t})=>{let{controlHeight:a,marginXXS:l,controlHeightSM:r,colorTextLightSolid:i,fontSizeSM:n,paddingXS:d,marginXS:s,paddingXXS:o}=e;return{itemContent:t`
      overflow: visible;
    `,cell:t`
      min-height: ${a};
    `,list:t`
      display: flex;
      flex-direction: column;
      gap: ${l};
      margin-top: ${l};
    `,bar:t`
      display: block;
      height: calc(${r} - ${l});
      overflow: hidden;
      color: ${i};
      font-size: ${n};
      white-space: nowrap;
      text-overflow: ellipsis;
    `,barStart:t`
      margin-inline-end: calc(-1 * (${d} + ${s} / 2));
      padding-inline-start: calc(${o} + ${o});
      border-start-start-radius: ${999}px;
      border-end-start-radius: ${999}px;
    `,barMiddle:t`
      margin-inline: calc(-1 * (${d} + ${s} / 2));
    `,barEnd:t`
      margin-inline-start: calc(-1 * (${d} + ${s} / 2));
      border-start-end-radius: ${999}px;
      border-end-end-radius: ${999}px;
    `,barSingle:t`
      padding-inline-start: calc(${o} + ${o});
      border-radius: ${999}px;
    `}});e.s(["default",0,()=>{let{token:e}=r.theme.useToken(),{styles:i}=s(),o=a.default.useMemo(()=>[{key:"release",title:"Release window",start:(0,d.default)("2026-01-08"),end:(0,d.default)("2026-01-10"),color:e.colorPrimary},{key:"design-review",title:"Design review",start:(0,d.default)("2026-01-14"),end:(0,d.default)("2026-01-14"),color:e.colorSuccess},{key:"maintenance",title:"Maintenance",start:(0,d.default)("2026-01-21"),end:(0,d.default)("2026-01-24"),color:e.colorWarning},{key:"bug-fix",title:"Bug fix",start:(0,d.default)("2026-01-30"),end:(0,d.default)("2026-01-31"),color:e.colorError}],[e]),c=a.default.useCallback((e,a)=>{if("date"!==a.type)return null;let l=o.filter(t=>!e.isBefore(t.start,"day")&&!e.isAfter(t.end,"day"));return(0,t.jsx)("div",{className:i.cell,children:(0,t.jsx)("div",{className:i.list,children:l.map(a=>{let l,r,d=(l=e.isSame(a.start,"day"),r=e.isSame(a.end,"day"),l&&r?"single":l?"start":r?"end":"middle"),s={start:i.barStart,middle:i.barMiddle,end:i.barEnd,single:i.barSingle}[d];return(0,t.jsx)("span",{className:(0,n.clsx)(i.bar,s),style:{backgroundColor:a.color},children:"start"===d||"single"===d?a.title:null},a.key)})})})},[o,i]);return(0,t.jsx)(l.Calendar,{classNames:{itemContent:i.itemContent},defaultValue:(0,d.default)("2026-01-01"),cellRender:c})}])},54899,e=>{"use strict";var t=e.i(745970);e.s(["Calendar",()=>t.default])}]);