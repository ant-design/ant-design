import React, { useState } from 'react';
import { Tag } from 'antd';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { FC } from 'react';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';

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
    transition: 'unset', // 防止拖拽完毕之后元素抖动
  };

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // 处理拖拽中的元素不跟手的问题
      }
    : commonStyle;

  return (
    <Tag style={style} ref={setNodeRef} {...listeners}>
      {tag.text}
    </Tag>
  );
};

const App = () => {
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
