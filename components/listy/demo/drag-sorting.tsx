import React, { useState } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Flex, Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 20 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const SortableItem: React.FC<Readonly<Item>> = (props) => {
  const { id, content } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 1 } : {}),
  };

  return (
    <Flex ref={setNodeRef} style={style} align="center" gap="small">
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{ cursor: 'move' }}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
      />
      {content}
    </Flex>
  );
};

const Demo: React.FC = () => {
  const [data, setData] = useState<Item[]>(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    setData((prev) => {
      const activeIndex = prev.findIndex((item) => item.id === active.id);
      const overIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <DndContext
      id="listy-drag-sorting"
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <Listy<Item>
          items={data}
          height={400}
          rowKey="id"
          itemRender={(item) => <SortableItem {...item} />}
        />
      </SortableContext>
    </DndContext>
  );
};

export default Demo;
