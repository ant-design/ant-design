import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Tag, Input, Typography } from 'antd';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';

const { Text } = Typography;

type Item = {
  id: number;
  text: string;
};

type DraggableTagProps = {
  tag: Item;
  getEditedItem: (editedItem: Item) => void;
  getDeletedItemId: (delItemId: Item['id']) => void;
};

const tagInputStyle = {
  width: 78,
};

const DraggableTag: FC<DraggableTagProps> = (props) => {
  const { tag, getEditedItem, getDeletedItemId } = props;
  const { listeners, setNodeRef, transform, transition } = useSortable({ id: tag.id });
  const [editInputId, setEditInputId] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [editInputVisible, setEditInputVisible] = useState(false);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (editInputVisible) {
      editInputRef.current?.focus();
    }
  }, [editInputVisible]);

  const commonStyle = {
    cursor: 'move',
    transition: 'unset', // 防止拖拽完毕之后元素抖动
  };

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : commonStyle;

  const isLongTag = tag.text.length > 20;

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    if (editInputValue && editInputValue !== tag.text) {
      getEditedItem({
        id: editInputId,
        text: editInputValue,
      });
    }
    setEditInputId(-1);
    setEditInputVisible(false);
  };

  return editInputVisible ? (
    <Input
      size="small"
      key={tag.id}
      ref={editInputRef}
      style={{
        ...tagInputStyle,
        marginRight: '8px',
      }}
      value={editInputValue}
      onBlur={handleEditInputConfirm}
      onChange={handleEditInputChange}
      onPressEnter={handleEditInputConfirm}
    />
  ) : (
    <Tag
      closable
      style={style}
      ref={setNodeRef}
      onClose={() => getDeletedItemId(tag.id)}
      {...listeners}
    >
      <span
        onDoubleClick={() => {
          setEditInputId(tag.id);
          setEditInputVisible(true);
          setEditInputValue(tag.text);
        }}
      >
        <Text
          style={isLongTag ? { width: 45 } : undefined}
          ellipsis={isLongTag ? { tooltip: tag.text } : false}
        >
          {tag.text}
        </Text>
      </span>
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
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  // 为了解决点击事件被覆盖的问题, 从而在useSensor中传递了一些配置
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
  );

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // 不指定collisionDetection的时候需要做容错的处理
    if (!over) return;

    if (active.id !== over.id) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleGetNextId = (data: Item[]): number =>
    data.reduce((acc: number, cur: Item) => Math.max(acc, cur.id), 0) + 1;

  const handleGetNewItem = (data: Item[], value: string): Item => ({
    id: handleGetNextId(data),
    text: value,
  });

  const handleInputConfirm = () => {
    if (inputValue && items.every((item) => item.text !== inputValue)) {
      setItems([...items, handleGetNewItem(items, inputValue)]);
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSetItems = (editedItem: Item) => {
    setItems(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (items) => items.map((item) => (item.id === editedItem.id ? editedItem : item)),
    );
  };

  const handleDelItem = (delItemId: Item['id']) => {
    setItems(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (items) => items.filter((item) => item.id !== delItemId),
    );
  };

  // 这里的collisionDetection如果不指定的话默认会使用rectIntersection
  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((item) => (
            <DraggableTag
              tag={item}
              key={item.id}
              getEditedItem={handleSetItems}
              getDeletedItemId={handleDelItem}
            />
          ))}
        </SortableContext>
      </DndContext>
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          ref={inputRef}
          value={inputValue}
          style={tagInputStyle}
          onBlur={handleInputConfirm}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default App;
