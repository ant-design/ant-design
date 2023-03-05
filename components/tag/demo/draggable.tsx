import React, { useEffect, useRef, useState, useCallback } from 'react';
import update from 'immutability-helper';
import type { Identifier, XYCoord } from 'dnd-core';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Input, Tag, Tooltip } from 'antd';
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type Item = {
  id: number;
  text: string;
};

type DraggableTagProps = {
  tag: Item;
  index: number;
  setEditInputId: (inputId: number) => void;
  handleClose: (removedTagId: number) => void;
  setEditInputValue: (inputValue: string) => void;
  setEditInputVisible: (inputVisible: boolean) => void;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
};

enum ItemTypes {
  TAG = 'TAG',
}

type DragItem = {
  id: string;
  type: string;
  index: number;
};

const DraggableTag: React.FC<DraggableTagProps> = ({
  tag,
  index,
  handleClose,
  setEditInputId,
  setEditInputVisible,
  setEditInputValue,
  moveTag,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.TAG,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTag(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAG,
    item: () => ({ id: tag.id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const isLongTag = tag.text.length > 20;

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const tagElem = (
    <Tag
      closable
      ref={ref}
      key={tag.id}
      style={{ opacity }}
      className="edit-tag"
      data-handler-id={handlerId}
      onClose={() => handleClose(tag.id)}
    >
      <span
        onDoubleClick={(e) => {
          if (tag.id !== 0) {
            setEditInputId(tag.id);
            setEditInputVisible(true);
            setEditInputValue(tag.text);
            e.preventDefault();
          }
        }}
      >
        {isLongTag ? `${tag.text.slice(0, 20)}...` : tag.text}
      </span>
    </Tag>
  );
  return isLongTag ? (
    <Tooltip title={tag.text} key={tag.id}>
      {tagElem}
    </Tooltip>
  ) : (
    tagElem
  );
};

const App: React.FC = () => {
  const [tags, setTags] = useState<Item[]>([
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
  const [editInputId, setEditInputId] = useState(-1);
  const [editInputVisible, setEditInputVisible] = useState(false);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    if (editInputVisible) {
      editInputRef.current?.focus();
    }
  }, [editInputVisible]);

  const moveTag = useCallback((dragIndex: number, hoverIndex: number) => {
    setTags((prevTags: Item[]) =>
      update(prevTags, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTags[dragIndex] as Item],
        ],
      }),
    );
  }, []);

  const handleCheckIsRepeat = ({
    data,
    prop,
    value,
  }: { data: Item[]; prop: string; value: string }): boolean => {
    let isRepeat = false;

    for (let i = 0; i < data.length; i += 1) {
      if (data[i][prop] === value) {
        isRepeat = true;
        break;
      }
    }

    return isRepeat;
  };

  const handleGetNextId = (data: Item[]): number =>
    data.reduce((acc: number, cur: Item) => Math.max(acc, cur.id), 0) + 1;

  const handleGetNewItem = (data: Item[], value: string): Item => ({
    id: handleGetNextId(data),
    text: value,
  });

  const handleClose = (removedTagId: number) => {
    const newTags = tags.filter((tag) => tag.id !== removedTagId);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !handleCheckIsRepeat({ data: tags, prop: 'text', value: inputValue })) {
      setTags([...tags, handleGetNewItem(tags, inputValue)]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    const newItem = newTags.find((item) => item.id === editInputId) as Item;
    newItem.text = editInputValue;
    setTags(newTags);
    setEditInputId(-1);
    setInputValue('');
    setEditInputVisible(false);
  };

  const renderCard = useCallback(
    (tag: Item, index: number) => (
      <DraggableTag
        tag={tag}
        key={tag.id}
        index={index}
        moveTag={moveTag}
        handleClose={handleClose}
        setEditInputId={setEditInputId}
        setEditInputValue={setEditInputValue}
        setEditInputVisible={setEditInputVisible}
      />
    ),
    [],
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {tags.map((tag, idx) => {
          if (editInputId === tag.id) {
            return (
              <Input
                ref={editInputRef}
                key={tag.id}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          return renderCard(tag, idx);
        })}
      </DndProvider>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default App;
