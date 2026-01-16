# Mentions — 提及

## 功能概述

用于在输入中提及某人或某事。

## 应用场景

- 用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## 输入字段

### Mentions 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，可以点击清除图标删除内容，默认 false，版本 5.13.0。
- `autoSize`: boolean | object，自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: string，默认值。
- `filterOption`: false | (input: string, option: OptionProps) => boolean，自定义过滤逻辑。
- `getPopupContainer`: () => HTMLElement，指定建议框挂载的 HTML 节点。
- `notFoundContent`: ReactNode，当下拉列表为空时显示的内容，默认 `Not Found`。
- `placement`: `top` | `bottom`，弹出层展示位置，默认 `bottom`。
- `prefix`: string | string\[]，设置触发关键字，默认 `@`。
- `split`: string，设置选中项前后分隔符，默认 ` `。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `validateSearch`: (text: string, props: MentionsProps) => void，自定义触发验证逻辑。
- `value`: string，设置值。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onBlur`: () => void，失去焦点时触发。
- `onChange`: (text: string) => void，值改变时触发。
- `onClear`: () => void，按下清除按钮的回调，版本 5.20.0。
- `onFocus`: () => void，获得焦点时触发。
- `onResize`: function({ width, height })，resize 回调。
- `onSearch`: (text: string, prefix: string) => void，搜索时触发。
- `onSelect`: (option: OptionProps, prefix: string) => void，选择选项时触发。
- `onPopupScroll`: (event: Event) => void，滚动时触发，版本 5.23.0。
- `options`: [Options](#option)，选项配置，默认 []，版本 5.1.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

### Option 属性

#### 必填

- 无必填属性。

#### 可选

- `value`: string，选择时填充的值。
- `label`: React.ReactNode，选项的标题。
- `key`: string，选项的 key 值。
- `disabled`: boolean，是否可选。
- `className`: string，css 类名。
- `style`: React.CSSProperties，选项样式。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

## 使用建议

评论中提及用户使用；配合 prefix 设置不同触发符；使用 autoSize 适应多行内容。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Form, Mentions, Space } from 'antd';
import type { MentionsProps } from 'antd';

const { getMentions } = Mentions;

const App: React.FC = () => {
  const [value, setValue] = useState('');

  const options: MentionsProps['options'] = [
    { value: 'afc163', label: 'afc163' },
    { value: 'zombieJ', label: 'zombieJ' },
    { value: 'yesmeck', label: 'yesmeck' },
  ];

  const onChange = (value: string) => {
    setValue(value);
  };

  const onSelect = (option: MentionsProps['options'][number]) => {
    console.log('select', option);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@afc163"
        options={options}
      />

      <Mentions autoSize style={{ width: '100%' }} options={options} />

      <Mentions
        style={{ width: '100%' }}
        placeholder="input @ to mention people"
        options={options}
        onSearch={(text) => {
          console.log('trigger search:', text);
        }}
      />

      <Mentions
        style={{ width: '100%' }}
        prefix={['@', '#']}
        placeholder="input @ to mention people, # to mention tag"
        options={[
          { value: 'afc163', label: '@afc163' },
          { value: 'zombieJ', label: '@zombieJ' },
          { value: 'antd', label: '#antd' },
          { value: 'react', label: '#react' },
        ]}
      />

      <Mentions
        style={{ width: '100%' }}
        options={[
          { value: 'afc163', label: 'afc163' },
          { value: 'zombieJ', label: 'zombieJ', disabled: true },
          { value: 'yesmeck', label: 'yesmeck' },
        ]}
      />

      <Form
        onFinish={(values) => {
          console.log('Submit:', values);
          console.log('Mentions:', getMentions(values.comment));
        }}
      >
        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please input your comment!' }]}
        >
          <Mentions rows={3} placeholder="You can use @ to mention" options={options} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
```

## 返回结果

渲染一个提及输入框组件。
