import React, { useRef } from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const RNDContext = createDndContext(HTML5Backend);
function DragAndDropHOC(props: any) {
  const manager = useRef(RNDContext);
  return (
    <DndProvider manager={manager.current.dragDropManager as any}>{props.children}</DndProvider>
  );
}

export default DragAndDropHOC;
