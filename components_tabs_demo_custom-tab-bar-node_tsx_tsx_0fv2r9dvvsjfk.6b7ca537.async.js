(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,636723,e=>{"use strict";var t=e.i(391398),n=e.i(191788),o=e.i(59295),a=e.i(706277),r=e.i(146341),i=e.i(952169);let s=(0,e.i(827830).o)(e=>{let{css:t,prefixCls:n}=e;return{root:t`
      margin: 0;
      &.${n}-tabs-editable {
        .${n}-tabs-nav {
          .${n}-tabs-tab {
            /* set transition to none when type="editable-card" */
            transition: none;
          }
        }
      }
    `}}),l=e=>{let{className:t,...o}=e,{attributes:i,listeners:s,setNodeRef:l,transform:d,transition:c}=(0,a.useSortable)({id:o["data-node-key"]}),b={...o.style,transform:r.CSS.Translate.toString(d),transition:c,cursor:"move"};return n.default.cloneElement(o.children,{ref:l,style:b,...i,...s})};e.s(["default",0,()=>{let{styles:e}=s(),[r,d]=(0,n.useState)([{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2"},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}]),c=(0,o.useSensor)(o.PointerSensor,{activationConstraint:{distance:10}}),b=({active:e,over:t})=>{e.id!==t?.id&&d(n=>{let o=n.findIndex(t=>t.key===e.id),r=n.findIndex(e=>e.key===t?.id);return(0,a.arrayMove)(n,o,r)})};return(0,t.jsx)(i.f,{items:r,rootClassName:e.root,renderTabBar:(e,i)=>(0,t.jsx)(o.DndContext,{sensors:[c],onDragEnd:b,collisionDetection:o.closestCenter,children:(0,t.jsx)(a.SortableContext,{items:r.map(e=>e.key),strategy:a.horizontalListSortingStrategy,children:(0,t.jsx)(i,{...e,children:e=>(0,n.createElement)(l,{...e.props,key:e.key},e)})})})})}])}]);