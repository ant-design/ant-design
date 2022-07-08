---
order: 2
title:
  zh-CN: 动态添加和删除
  en-US: Add & Remove Dynamically
---

## zh-CN

用数组生成一组标签，可以动态添加和删除。

## en-US

Generating a set of Tags by array, you can add and remove dynamically.

```tsx
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['Unremovable', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
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
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
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
```

```css
.site-tag-plus {
  background: #fff;
  border-style: dashed;
}
.edit-tag {
  user-select: none;
}
.tag-input {
  width: 78px;
  margin-right: 8px;
  vertical-align: top;
}
```

<style>
  [data-theme="dark"] .site-tag-plus {
    background: transparent;
    border-style: dashed;
  }
</style>
