import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent, DraggableAttributes } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, GetProps, List } from 'antd';
import { createContext, CSSProperties, FC, useContext, useMemo, useState } from 'react';

interface SortableListItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableListItemContext = createContext<SortableListItemContextProps>({});

const DragHandle: FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    />
  );
};

const SortableListItem: FC<Readonly<GetProps<typeof List.Item>> & { itemKey: string }> = (
  props,
) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.itemKey });

  const style: CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<SortableListItemContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <SortableListItemContext.Provider value={contextValue}>
      <List.Item {...props} ref={setNodeRef} style={style} />
    </SortableListItemContext.Provider>
  );
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

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) return;
    if (active.id !== over.id) {
      setData((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active.id);
        const overIndex = prevState.findIndex((i) => i.key === over.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={data.map((i) => i.key)}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <SortableListItem key={item.key} itemKey={item.key}>
              <Card
                title={
                  <>
                    <DragHandle /> {item.title}
                  </>
                }
              >
                Card content
              </Card>
            </SortableListItem>
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;
