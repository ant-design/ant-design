(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,294319,e=>{"use strict";var t=e.i(391398);e.i(191788);var r=e.i(789795),a=e.i(122381);let i=(0,e.i(827830).createStyles)(e=>{let{css:t,prefixCls:r,cssVar:a}=e;return{card:t`
      width: 360px;
      .${r}-border-beam {
        opacity: 0;
        transition: opacity ${a.motionDurationMid};
        &::before {
          animation-play-state: paused;
        }
      }
      &:hover {
        .${r}-border-beam {
          opacity: 1;
          &::before {
            animation-play-state: running;
          }
        }
      }
    `}});e.s(["default",0,()=>{let{styles:e}=i();return(0,t.jsx)(r.BorderBeam,{children:(0,t.jsx)(a.Card,{className:e.card,title:"Hover over the card",children:"The border beam appears when the pointer moves over this card."})})}])},789795,e=>{"use strict";var t=e.i(983492);e.s(["BorderBeam",()=>t.default])},122381,e=>{"use strict";var t=e.i(620775);e.s(["Card",()=>t.default])}]);