(globalThis.utooChunk_antd||(globalThis.utooChunk_antd=[])).push(["object"==typeof document?document.currentScript:void 0,636723,e=>{"use strict";var t=e.i(391398),n=e.i(191788),a=e.i(59295),r=e.i(706277),o=e.i(146341),i=e.i(952169);let s=(0,e.i(827830).createStyles)(e=>{let{css:t,prefixCls:n}=e;return{root:t`
      margin: 0;
      &.${n}-tabs-editable {
        .${n}-tabs-nav {
          .${n}-tabs-tab {
            /* set transition to none when type="editable-card" */
            transition: none;
          }
        }
      }
    `}}),l=e=>{let{className:t,...a}=e,{attributes:i,listeners:s,setNodeRef:l,transform:d,transition:c}=(0,r.useSortable)({id:a["data-node-key"]}),b={...a.style,transform:o.CSS.Translate.toString(d),transition:c,cursor:"move"};return n.default.cloneElement(a.children,{ref:l,style:b,...i,...s})};e.s(["default",0,()=>{let{styles:e}=s(),[o,d]=(0,n.useState)([{key:"1",label:"Tab 1",children:"Content of Tab Pane 1"},{key:"2",label:"Tab 2",children:"Content of Tab Pane 2"},{key:"3",label:"Tab 3",children:"Content of Tab Pane 3"}]),c=(0,a.useSensor)(a.PointerSensor,{activationConstraint:{distance:10}}),b=({active:e,over:t})=>{e.id!==t?.id&&d(n=>{let a=n.findIndex(t=>t.key===e.id),o=n.findIndex(e=>e.key===t?.id);return(0,r.arrayMove)(n,a,o)})};return(0,t.jsx)(i.Tabs,{items:o,rootClassName:e.root,renderTabBar:(e,i)=>(0,t.jsx)(a.DndContext,{sensors:[c],onDragEnd:b,collisionDetection:a.closestCenter,children:(0,t.jsx)(r.SortableContext,{items:o.map(e=>e.key),strategy:r.horizontalListSortingStrategy,children:(0,t.jsx)(i,{...e,children:e=>(0,n.createElement)(l,{...e.props,key:e.key},e)})})})})}])}]);