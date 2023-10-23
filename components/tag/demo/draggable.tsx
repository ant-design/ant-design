import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import type { FC } from 'react';
import React, { useState } from 'react';
import { Tag } from 'antd';

type Item = {
  id: number;
  text: string;
};

type DraggableTagProps = {
  tag: Item;
};

const DraggableTag: FC<DraggableTagProps> = (props) => {
  const { tag } = props;
  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tag.id });

  const commonStyle = {
    cursor: 'move',
    transition: 'unset', // Prevent element from shaking after drag
  };

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;

  return (
    <Tag style={style} ref={setNodeRef} {...listeners}>
      {tag.text}
    </Tag>
  );
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      text: 'Tag 1',
    },
    {
      id: 2,
      text: 'Tag 2',
    },
    {
      id: 3,
      text: 'Tag 3',
    },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <DraggableTag tag={item} key={item.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default App;
