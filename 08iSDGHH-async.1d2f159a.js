(("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd=("undefined"!=typeof globalThis?globalThis:self).makoChunk_antd||[]).push([["08iSDGHH"],{"08iSDGHH":function(e,t,i){i.d(t,"__esModule",{value:!0}),i.d(t,"default",{enumerable:!0,get:function(){return g;}});var r=i("d3__vuQ2"),l=i("8Z0rk4BW"),a=i("WyIMPUJp"),n=r._(i("FDsYADCO")),d=i("ODWitzHB"),o=i("nIblKo9C");n.default.registerNode("behavior-start-node",{draw:(e,t)=>{let i=n.default.Util.getTextSize(e.label,16)[0],r=[i+40,48],l=t.addShape("rect",{name:"start-node",attrs:{width:r[0],height:r[1],y:-r[1]/2,radius:8,fill:"#fff"}});return t.addShape("text",{attrs:{text:`${e.label}`,fill:"rgba(0, 0, 0, 0.88)",fontSize:16,fontWeight:500,x:20,textBaseline:"middle"},name:"start-node-text"}),l;},getAnchorPoints:()=>[[0,.5],[1,.5]]}),n.default.registerNode("behavior-sub-node",{draw:(e,t)=>{let i=n.default.Util.getTextSize(e.label,14)[0],r=[i+32+(e.targetType?12:0)+(e.link?20:0),40],l=t.addShape("rect",{name:"sub-node",attrs:{width:r[0],height:r[1],y:-r[1]/2,radius:8,fill:"#fff",cursor:"pointer"}});if(t.addShape("text",{attrs:{text:`${e.label}`,x:e.targetType?28:16,fill:"rgba(0, 0, 0, 0.88)",fontSize:14,textBaseline:"middle",cursor:"pointer"},name:"sub-node-text"}),e.targetType&&t.addShape("rect",{name:"sub-node-type",attrs:{width:8,height:8,radius:4,y:-4,x:12,fill:"mvp"===e.targetType?"#1677ff":"#A0A0A0",cursor:"pointer"}}),e.children){let{length:i}=e.children;t.addShape("rect",{name:"sub-node-children-length",attrs:{width:20,height:20,radius:10,y:-10,x:r[0]-4,fill:"#404040",cursor:"pointer"}}),t.addShape("text",{name:"sub-node-children-length-text",attrs:{text:`${i}`,x:r[0]+6-n.default.Util.getTextSize(`${i}`,12)[0]/2,textBaseline:"middle",fill:"#fff",fontSize:12,cursor:"pointer"}});}return e.link&&t.addShape("dom",{attrs:{width:16,height:16,x:r[0]-12-16,y:-8,cursor:"pointer",html:`
            <div style="width: 16px; height: 16px;">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="\u{9875}\u{9762}-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="DatePicker" transform="translate(-890.000000, -441.000000)" fill-rule="nonzero">
                          <g id="\u{7F16}\u{7EC4}-30" transform="translate(288.000000, 354.000000)">
                              <g id="\u{7F16}\u{7EC4}-7\u{5907}\u{4EFD}-7" transform="translate(522.000000, 79.000000)">
                                  <g id="right-circle-outlinedd" transform="translate(80.000000, 8.000000)">
                                      <rect id="\u{77E9}\u{5F62}" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect>
                                      <path d="M10.4171875,7.8984375 L6.5734375,5.1171875 C6.490625,5.0578125 6.375,5.115625 6.375,5.21875 L6.375,5.9515625 C6.375,6.1109375 6.4515625,6.2625 6.58125,6.35625 L8.853125,8 L6.58125,9.64375 C6.4515625,9.7375 6.375,9.8875 6.375,10.0484375 L6.375,10.78125 C6.375,10.8828125 6.490625,10.9421875 6.5734375,10.8828125 L10.4171875,8.1015625 C10.4859375,8.0515625 10.4859375,7.9484375 10.4171875,7.8984375 Z" id="\u{8DEF}\u{5F84}" fill="#BFBFBF"></path>
                                      <path d="M8,1 C4.134375,1 1,4.134375 1,8 C1,11.865625 4.134375,15 8,15 C11.865625,15 15,11.865625 15,8 C15,4.134375 11.865625,1 8,1 Z M8,13.8125 C4.790625,13.8125 2.1875,11.209375 2.1875,8 C2.1875,4.790625 4.790625,2.1875 8,2.1875 C11.209375,2.1875 13.8125,4.790625 13.8125,8 C13.8125,11.209375 11.209375,13.8125 8,13.8125 Z" id="\u{5F62}\u{72B6}" fill="#BFBFBF"></path>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
              </svg>
            </div>
          `},name:"sub-node-link"}),l;},getAnchorPoints:()=>[[0,.5],[1,.5]],options:{stateStyles:{hover:{stroke:"#1677ff","sub-node-link":{html:`
            <div style="width: 16px; height: 16px;">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="\u{9875}\u{9762}-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="DatePicker" transform="translate(-890.000000, -441.000000)" fill-rule="nonzero">
                          <g id="\u{7F16}\u{7EC4}-30" transform="translate(288.000000, 354.000000)">
                              <g id="\u{7F16}\u{7EC4}-7\u{5907}\u{4EFD}-7" transform="translate(522.000000, 79.000000)">
                                  <g id="right-circle-outlinedd" transform="translate(80.000000, 8.000000)">
                                      <rect id="\u{77E9}\u{5F62}" fill="#000000" opacity="0" x="0" y="0" width="16" height="16"></rect>
                                      <path d="M10.4171875,7.8984375 L6.5734375,5.1171875 C6.490625,5.0578125 6.375,5.115625 6.375,5.21875 L6.375,5.9515625 C6.375,6.1109375 6.4515625,6.2625 6.58125,6.35625 L8.853125,8 L6.58125,9.64375 C6.4515625,9.7375 6.375,9.8875 6.375,10.0484375 L6.375,10.78125 C6.375,10.8828125 6.490625,10.9421875 6.5734375,10.8828125 L10.4171875,8.1015625 C10.4859375,8.0515625 10.4859375,7.9484375 10.4171875,7.8984375 Z" id="\u{8DEF}\u{5F84}" fill="#1677ff"></path>
                                      <path d="M8,1 C4.134375,1 1,4.134375 1,8 C1,11.865625 4.134375,15 8,15 C11.865625,15 15,11.865625 15,8 C15,4.134375 11.865625,1 8,1 Z M8,13.8125 C4.790625,13.8125 2.1875,11.209375 2.1875,8 C2.1875,4.790625 4.790625,2.1875 8,2.1875 C11.209375,2.1875 13.8125,4.790625 13.8125,8 C13.8125,11.209375 11.209375,13.8125 8,13.8125 Z" id="\u{5F62}\u{72B6}" fill="#1677ff"></path>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
              </svg>
            </div>
          `}}}}},"rect");let s=e=>{let t=(e,i=0)=>{let r={...e};switch(i){case 0:r.type="behavior-start-node";break;case 1:r.type="behavior-sub-node",r.collapsed=!0;break;default:r.type="behavior-sub-node";}return e.children&&(r.children=e.children.map(e=>t(e,i+1))),r;};return t(e);},h=(0,d.createStyles)(({token:e})=>({container:(0,d.css)`
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: ${e.borderRadiusLG}px;
    overflow: hidden;
    position: relative;
  `,title:(0,d.css)`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: ${e.fontSizeLG}px;
  `,tips:(0,d.css)`
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 20px;
  `,mvp:(0,d.css)`
    margin-inline-end: ${e.marginMD}px;
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS}px;
      background-color: #1677ff;
      border-radius: 50%;
      content: '';
    }
  `,extension:(0,d.css)`
    display: flex;
    align-items: center;
    &::before {
      display: block;
      width: 8px;
      height: 8px;
      margin-inline-end: ${e.marginXS}px;
      background-color: #a0a0a0;
      border-radius: 50%;
      content: '';
    }
  `}));var g=({data:e})=>{let t=(0,a.useRef)(null),{styles:i}=h(),r=(0,o.useRouteMeta)();return(0,a.useEffect)(()=>{let i=new n.default.TreeGraph({container:t.current,width:t.current.scrollWidth,height:t.current.scrollHeight,renderer:"svg",modes:{default:["collapse-expand","drag-canvas"]},defaultEdge:{type:"cubic-horizontal",style:{lineWidth:1,stroke:"#BFBFBF"}},layout:{type:"mindmap",direction:"LR",getHeight:()=>48,getWidth:e=>n.default.Util.getTextSize(e.label,16)[0]+40,getVGap:()=>10,getHGap:()=>60,getSide:e=>e.data.direction}});i.on("node:mouseenter",e=>{i.setItemState(e.item,"hover",!0);}),i.on("node:mouseleave",e=>{i.setItemState(e.item,"hover",!1);}),i.on("node:click",e=>{let{link:t}=e.item.getModel();t&&(window.location.hash=t);}),i.data(s(e)),i.render(),i.fitCenter();},[]),(0,l.jsxs)("div",{ref:t,className:i.container,children:[(0,l.jsx)("div",{className:i.title,children:`${r.frontmatter.title} \u{884C}\u{4E3A}\u{6A21}\u{5F0F}\u{5730}\u{56FE}`}),(0,l.jsxs)("div",{className:i.tips,children:[(0,l.jsx)("div",{className:i.mvp,children:"MVP \u884C\u4E3A\u76EE\u7684"}),(0,l.jsx)("div",{className:i.extension,children:"\u62D3\u5C55\u884C\u4E3A\u76EE\u7684"})]})]});};}}]);
//# sourceMappingURL=08iSDGHH-async.1d2f159a.js.map