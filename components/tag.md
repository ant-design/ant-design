---
category: Components
group: Data Display
title: Tag
description: Used for marking and categorization.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_SBsSrKLg00AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JPNAQYrVkYkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## Examples

### Basic

Usage of basic Tag, and it could be closable and customize close button by set `closeIcon` property, will display default close button when `closeIcon` is setting to `true`. Closable Tag supports `onClose` events.

```tsx
import React from 'react';
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';

const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
};

const App: React.FC = () => (
  <Flex gap="small" align="center" wrap>
    <Tag>Tag 1</Tag>
    <Tag>
      <a
        href="https://github.com/ant-design/ant-design/issues/1862"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link
      </a>
    </Tag>
    <Tag closeIcon onClose={preventDefault}>
      Prevent Default
    </Tag>
    <Tag closeIcon={<CloseCircleOutlined />} onClose={console.log}>
      Tag 2
    </Tag>
    <Tag
      closable={{
        closeIcon: <DeleteOutlined />,
        'aria-label': 'Close Button',
      }}
      onClose={console.log}
    >
      Tag 3
    </Tag>
  </Flex>
);

export default App;
```

### Colorful Tag

We preset a series of colorful tag styles for use in different situations. You can also set it to a hex color string for custom color.

```tsx
import React from 'react';
import { Divider, Flex, Tag } from 'antd';

const variants = ['filled', 'solid', 'outlined'] as const;
const presets = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];
const customs = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const App: React.FC = () => (
  <>
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Presets ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {presets.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Custom ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {customs.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
  </>
);

export default App;
```

### Add & Remove Dynamically

Generating a set of Tags by array, you can add and remove dynamically.

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Flex, Input, Tag, theme, Tooltip } from 'antd';

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

const App: React.FC = () => {
  const { token } = theme.useToken();
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
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
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
    if (inputValue && !tags.includes(inputValue)) {
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
    setEditInputValue('');
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <Flex gap="small" align="center" wrap>
      {tags.map<React.ReactNode>((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              style={tagInputStyle}
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
            key={tag}
            closable={index !== 0}
            style={{ userSelect: 'none' }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
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
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </Flex>
  );
};

export default App;
```

### Checkable

`CheckableTag` works like Checkbox, click it to toggle checked state. `CheckableTagGroup` provides function that is similar to `CheckboxGroup` or `RadioGroup`.

> `CheckableTag` is absolute controlled component and has no uncontrolled mode.

```tsx
import React, { useState } from 'react';
import { Form, Tag } from 'antd';

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [singleSelected, setSingleSelected] = useState<string | null>('Books');
  const [multipleSelected, setMultipleSelected] = useState<string[]>(['Movies', 'Music']);

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="Checkable">
        <Tag.CheckableTag checked={checked} onChange={setChecked}>
          Yes
        </Tag.CheckableTag>
      </Form.Item>
      <Form.Item label="Single">
        <Tag.CheckableTagGroup
          options={tagsData}
          value={singleSelected}
          onChange={setSingleSelected}
        />
      </Form.Item>
      <Form.Item label="Multiple">
        <Tag.CheckableTagGroup
          multiple
          options={tagsData}
          value={multipleSelected}
          onChange={setMultipleSelected}
        />
      </Form.Item>
    </Form>
  );
};

export default App;
```

### Animate

Animating the Tag by using [rc-tween-one](https://github.com/react-component/tween-one).

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

const tagGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 8,
};

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
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
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <>
      <TweenOneGroup
        appear={false}
        style={tagGroupStyle}
        enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
        onEnd={(e) => {
          if (e.type === 'appear' || e.type === 'enter') {
            (e.target as any).style = 'display: inline-block';
          }
        }}
      >
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        ))}
      </TweenOneGroup>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default App;
```

### Icon

You can add a custom icon to the tag via the `icon` prop. Note that the `icon` prop for CheckableTag is only supported in version `>=5.27.0`.

If you need to control the icon position, please use the `<XXXIcon />` component directly in `children` instead of the `icon` prop.

```tsx
import React from 'react';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

const App: React.FC = () => {
  const [checked, setChecked] = React.useState<Array<boolean>>([true, false, false, false]);

  const handleChange = (index: number, value: boolean) => {
    const newChecked = [...checked];
    newChecked[index] = value;
    setChecked(newChecked);
  };

  return (
    <>
      <Divider titlePlacement="start">Tag with icon</Divider>
      <Flex gap="small" wrap align="center">
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
        <Tag icon={<FacebookOutlined />} color="#3b5999">
          Facebook
        </Tag>
        <Tag icon={<LinkedinOutlined />} color="#55acee">
          LinkedIn
        </Tag>
      </Flex>
      <Divider titlePlacement="start">CheckableTag with icon</Divider>
      <Flex gap="small" wrap align="center">
        <Tag.CheckableTag
          icon={<TwitterOutlined />}
          checked={checked[0]}
          onChange={(checked) => handleChange(0, checked)}
        >
          Twitter
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<YoutubeOutlined />}
          checked={checked[1]}
          onChange={(checked) => handleChange(1, checked)}
        >
          Youtube
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<FacebookOutlined />}
          checked={checked[2]}
          onChange={(checked) => handleChange(2, checked)}
        >
          Facebook
        </Tag.CheckableTag>
        <Tag.CheckableTag
          icon={<LinkedinOutlined />}
          checked={checked[3]}
          onChange={(checked) => handleChange(3, checked)}
        >
          LinkedIn
        </Tag.CheckableTag>
      </Flex>
    </>
  );
};

export default App;
```

### Status Tag

We preset five different colors, you can set color property such as `success`,`processing`,`error`,`default` and `warning` to indicate specific status.

```tsx
import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

const variants = ['filled', 'solid', 'outlined'] as const;
const presets = [
  { status: 'success', icon: <CheckCircleOutlined /> },
  { status: 'processing', icon: <SyncOutlined spin /> },
  { status: 'warning', icon: <ExclamationCircleOutlined /> },
  { status: 'error', icon: <CloseCircleOutlined /> },
  { status: 'default', icon: <ClockCircleOutlined /> },
];

const App: React.FC = () => (
  <>
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Status ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {presets.map(({ status, icon }) => (
            <Tag key={status} color={status} icon={icon} variant={variant}>
              {status}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
  </>
);

export default App;
```


### Draggable Tag

Draggable tags using [dnd kit](https://dndkit.com).

```tsx
import React, { useState } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { Flex, Tag } from 'antd';

interface Item {
  id: number;
  text: string;
}

interface DraggableTagProps {
  tag: Item;
}

const commonStyle: React.CSSProperties = {
  cursor: 'move',
  transition: 'unset', // Prevent element from shaking after drag
};

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { tag } = props;
  const { listeners, transform, transition, isDragging, setNodeRef } = useSortable({ id: tag.id });

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
    { id: 1, text: 'Tag 1' },
    { id: 2, text: 'Tag 2' },
    { id: 3, text: 'Tag 3' },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
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
        <Flex gap="small" align="center" wrap>
          {items.map<React.ReactNode>((item) => (
            <DraggableTag tag={item} key={item.id} />
          ))}
        </Flex>
      </SortableContext>
    </DndContext>
  );
};

export default App;
```



### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Tag by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Flex, Space, Tag } from 'antd';
import type { GetProps, TagProps } from 'antd';
import { createStaticStyles } from 'antd-style';

type CheckableTagGroupProps = GetProps<typeof Tag.CheckableTagGroup>;

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 2px 6px;
    border-radius: 4px;
  `,
}));

const styles: TagProps['styles'] = {
  root: {
    backgroundColor: '#e6f7ff',
  },
  icon: {
    color: '#52c41a',
  },
  content: {
    color: '#262626',
  },
};

const stylesFn: TagProps['styles'] = (info) => {
  if (info.props.variant === 'filled') {
    return {
      root: {
        backgroundColor: '#F5EFFF',
      },
      icon: {
        color: '#8F87F1',
      },
      content: {
        color: '#8F87F1',
      },
    } satisfies TagProps['styles'];
  }
};

const groupStyles: CheckableTagGroupProps['styles'] = {
  root: {
    gap: 12,
    padding: '8px 12px',
    backgroundColor: 'rgba(82, 196, 26, 0.08)',
    borderRadius: 8,
  },
  item: {
    backgroundColor: 'rgba(82, 196, 26, 0.1)',
    borderColor: 'rgba(82, 196, 26, 0.3)',
    color: '#52c41a',
  },
};

const groupStylesFn: CheckableTagGroupProps['styles'] = (info) => {
  const { multiple } = info.props;
  if (multiple) {
    return {
      root: {
        gap: 16,
        padding: '8px 12px',
        backgroundColor: 'rgba(143, 135, 241, 0.08)',
        borderRadius: 8,
      },
      item: {
        backgroundColor: 'rgba(143, 135, 241, 0.1)',
        borderColor: 'rgba(143, 135, 241, 0.3)',
        color: '#8F87F1',
        fontWeight: 500,
      },
    } satisfies CheckableTagGroupProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Space size="large" vertical>
      <Flex gap="middle">
        <Tag classNames={classNames} styles={styles} icon={<CheckCircleOutlined />}>
          Object
        </Tag>
        <Tag
          variant="filled"
          classNames={classNames}
          styles={stylesFn}
          icon={<CloseCircleOutlined />}
        >
          Function
        </Tag>
      </Flex>
      <Flex vertical gap="middle">
        <Tag.CheckableTagGroup
          classNames={classNames}
          styles={groupStyles}
          options={['React', 'Vue', 'Angular']}
        />
        <Tag.CheckableTagGroup
          classNames={classNames}
          styles={groupStylesFn}
          options={['meet-student', 'thinkasany']}
          multiple
        />
      </Flex>
    </Space>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

### Tag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closeIcon | Custom close icon. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | false | 4.4.0 |
| color | Color of the Tag | string | - |  |
| disabled | Whether the tag is disabled | boolean | false | 6.0.0 |
| href | The address to jump when clicking, when this property is specified, the `tag` component will be rendered as an `<a>` tag | string | - | 6.0.0 |
| icon | Set the icon of tag | ReactNode | - |  |
| onClose | Callback executed when tag is closed (can be prevented by `e.preventDefault()`) | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | Same as target attribute of a, works when href is specified | string | - | 6.0.0 |
| variant | Variant of the tag | `'filled' \| 'solid' \| 'outlined'` | `'filled'` | 6.0.0 |

### Tag.CheckableTag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Checked status of Tag | boolean | false |  |
| icon | Set the icon of tag | ReactNode | - | 5.27.0 |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - |  |

### Tag.CheckableTagGroup

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-group), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-group), string> | - |  |
| defaultValue | Initial value | `string \| number \| Array<string \| number> \| null` | - |  |
| disabled | Disable check/uncheck | `boolean` | - |  |
| multiple | Multiple select mode | `boolean` | - |  |
| options | Option list | `Array<{ label: ReactNode; value: string \| number } \| string \| number>` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-group), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-group), CSSProperties> | - |  |
| value | Value of checked tag(s) | `string \| number \| Array<string \| number> \| null` | - |  |
| onChange | Callback when Tag is checked/unchecked | `(value: string \| number \| Array<string \| number> \| null) => void` | - |  |

## Semantic DOM

### Tag

https://ant.design/components/tag/semantic.md

### Tag.CheckableTagGroup {#semantic-group}

https://ant.design/components/tag/semantic_group.md

## Design Token



## Component Token (Tag)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| defaultBg | Default background color | string | #f5f5f5 |
| defaultColor | Default text color | string | rgba(0,0,0,0.88) |
| solidTextColor | Default text color for solid tag. | string | #fff |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgSolid | Solid background color, currently only used for the default solid button background color. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorBorderDisabled | Control the border color of the element in the disabled state. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryActive | Dark active state under the main color gradient. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightSM | Line height of small text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


