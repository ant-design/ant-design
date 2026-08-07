(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,536013,e=>{"use strict";var t=e.i(391398),i=e.i(191788),a=e.i(770042),o=e.i(632311),l=e.i(686111),s=e.i(426474),s=s,d=e.i(28318),d=d,n=e.i(328962),n=n,r=e.i(72998),r=r,c=e.i(635421),u=e.i(621237),u=u,p=e.i(241859),f=e.i(997643);let g=(0,e.i(827830).createStyles)(e=>{let{css:t,iconPrefixCls:i,cssVar:a}=e;return{wrapper:t`
      padding: 0 ${a.paddingLG};
      color: ${a.colorWhite};
      font-size: ${a.fontSizeXL};
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 100px;
      .${i} {
        padding: ${a.paddingSM};
        cursor: pointer;
        &:hover {
          opacity: 0.3;
        }
        &[disabled] {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }
    `}}),h=["https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg","https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"];e.s(["default",0,()=>{let{styles:e}=g(),[j,m]=i.default.useState(0),b=()=>{let e=h[j],t=e.slice(e.lastIndexOf(".")),i=Date.now()+t;fetch(e).then(e=>e.blob()).then(e=>{let t=URL.createObjectURL(new Blob([e])),a=document.createElement("a");a.href=t,a.download=i,document.body.appendChild(a),a.click(),URL.revokeObjectURL(t),a.remove()})};return(0,t.jsx)(p.Image.PreviewGroup,{preview:{actionsRender:(i,{transform:{scale:p},actions:{onActive:g,onFlipY:m,onFlipX:k,onRotateLeft:v,onRotateRight:x,onZoomOut:w,onZoomIn:C,onReset:O}})=>(0,t.jsxs)(f.Space,{size:12,className:e.wrapper,children:[(0,t.jsx)(o.LeftOutlined,{disabled:0===j,onClick:()=>g?.(-1)}),(0,t.jsx)(l.RightOutlined,{disabled:j===h.length-1,onClick:()=>g?.(1)}),(0,t.jsx)(a.DownloadOutlined,{onClick:b}),(0,t.jsx)(n.default,{rotate:90,onClick:m}),(0,t.jsx)(n.default,{onClick:k}),(0,t.jsx)(s.default,{onClick:v}),(0,t.jsx)(d.default,{onClick:x}),(0,t.jsx)(u.default,{disabled:1===p,onClick:w}),(0,t.jsx)(c.ZoomInOutlined,{disabled:50===p,onClick:C}),(0,t.jsx)(r.default,{onClick:O})]}),onChange:e=>{m(e)}},children:h.map((e,i)=>(0,t.jsx)(p.Image,{alt:`image-${i}`,src:e,width:200},e))})}],536013)},241859,e=>{"use strict";var t=e.i(541030);e.s(["Image",()=>t.default])},997643,e=>{"use strict";var t=e.i(640440);e.s(["Space",()=>t.default])},770042,e=>{"use strict";var t=e.i(198968);e.s(["DownloadOutlined",()=>t.default])},632311,e=>{"use strict";var t=e.i(203686);e.s(["LeftOutlined",()=>t.default])},686111,e=>{"use strict";var t=e.i(571246);e.s(["RightOutlined",()=>t.default])},635421,e=>{"use strict";var t=e.i(40867);e.s(["ZoomInOutlined",()=>t.default])}]);