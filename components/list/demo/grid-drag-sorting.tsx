import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { GetProps } from 'antd';
import { Card, List } from 'antd';
import { CSSProperties, FC, useState } from 'react';

const SortableListItem: FC<Readonly<GetProps<typeof List.Item>> & { itemKey: string }> = (
  props,
) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.itemKey,
  });

  const style: CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <List.Item {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const App: FC = () => {
  const [data, setData] = useState([
    {
      key: '1',
      title: 'Title 1',
    },
    {
      key: '2',
      title: 'Title 2',
    },
    {
      key: '3',
      title: 'Title 3',
    },
    {
      key: '4',
      title: 'Title 4',
    },
    {
      key: '5',
      title: 'Title 5',
    },
    {
      key: '6',
      title: 'Title 6',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={data.map((item) => item.key)}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <Card title={item.title}>Card content</Card>
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
