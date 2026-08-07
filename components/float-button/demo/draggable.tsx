import React from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FloatButton } from 'antd';

interface Position {
  x: number;
  y: number;
}

interface DraggableButtonProps {
  position: Position;
}

const DraggableButton: React.FC<DraggableButtonProps> = (props) => {
  const { position } = props;

  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-float-button',
  });

  const mergedTransform = CSS.Translate.toString({
    x: position.x + (transform?.x ?? 0),
    y: position.y + (transform?.y ?? 0),
    scaleX: transform?.scaleX ?? 1,
    scaleY: transform?.scaleY ?? 1,
  });

  return (
    <FloatButton
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: mergedTransform,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : undefined,
        touchAction: 'none',
      }}
    />
  );
};

const Demo: React.FC = () => {
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(sensor);

  const onDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    setPosition(({ x, y }) => ({ x: x + delta.x, y: y + delta.y }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd} id="float-button-draggable">
      <DraggableButton position={position} />
    </DndContext>
  );
};

export default Demo;
