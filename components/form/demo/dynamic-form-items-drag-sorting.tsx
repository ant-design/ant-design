import React, { useContext, useMemo } from 'react';
import { HolderOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { DragEndEvent, DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Form, Input, Space } from 'antd';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: DraggableSyntheticListeners;
  attributes?: DraggableAttributes;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(RowContext);
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

interface SortableItemProps {
  id: number;
  children?: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

const App: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 1 } }));

  return (
    <Form
      name="dynamic_form_draggable_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="users">
        {(fields, { add, remove, move }) => {
          const onDragEnd = ({ active, over }: DragEndEvent) => {
            if (over && active.id !== over.id) {
              const activeIndex = fields.findIndex((field) => field.key === active.id);
              const overIndex = fields.findIndex((field) => field.key === over.id);
              if (activeIndex !== -1 && overIndex !== -1) {
                move(activeIndex, overIndex);
              }
            }
          };

          return (
            <DndContext
              sensors={sensors}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.key)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map(({ key, name, ...restField }) => (
                  <SortableItem key={key} id={key}>
                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <DragHandle />
                      <Form.Item
                        {...restField}
                        name={[name, 'first']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'last']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  </SortableItem>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </SortableContext>
            </DndContext>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
