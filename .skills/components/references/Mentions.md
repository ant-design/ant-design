# Mentions — 提及

## 功能概述

提及组件。用于在输入框中提及用户。

## 输入字段

### 可选

- `options`: { value, label, disabled }[]，数据源。
- `value`: string，输入框值（受控）。
- `defaultValue`: string，默认值。
- `prefix`: string | string[]，触发前缀，默认 `@`。
- `split`: string，选项分隔符，默认空格。
- `placeholder`: string，占位符。
- `allowClear`: boolean，允许清除。
- `disabled`: boolean，禁用。
- `readOnly`: boolean，只读。
- `status`: string，状态，可选 `error` | `warning`。
- `variant`: string，形态变体，可选 `outlined` | `borderless` | `filled`，默认 `outlined`。
- `autoSize`: boolean | { minRows, maxRows }，自动调整高度。
- `placement`: string，弹出位置，可选 `top` | `bottom`，默认 `bottom`。
- `filterOption`: false | (input, option) => boolean，筛选选项。
- `validateSearch`: (text, props) => boolean，自定义触发搜索校验。
- `notFoundContent`: ReactNode，无匹配时显示。
- `popupClassName`: string，下拉类名。
- `getPopupContainer`: (node) => HTMLElement，下拉容器。
- `onSelect`: (option, prefix) => void，选中选项回调。
- `onChange`: (value) => void，值变化回调。
- `onSearch`: (value, prefix) => void，搜索回调。
- `onFocus`: () => void，聚焦回调。
- `onBlur`: () => void，失焦回调。

### Mentions.getMentions 方法

解析提及内容：

```tsx
Mentions.getMentions(value: string, config?: { prefix, split })
// 返回 { prefix, value }[]
```

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
      {/* 基础用法 */}
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@afc163"
        options={options}
      />

      {/* 自动高度 */}
      <Mentions autoSize style={{ width: '100%' }} options={options} />

      {/* 异步加载 */}
      <Mentions
        style={{ width: '100%' }}
        placeholder="input @ to mention people"
        options={options}
        onSearch={(text) => {
          console.log('trigger search:', text);
        }}
      />

      {/* 自定义前缀 */}
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

      {/* 无效或禁用选项 */}
      <Mentions
        style={{ width: '100%' }}
        options={[
          { value: 'afc163', label: 'afc163' },
          { value: 'zombieJ', label: 'zombieJ', disabled: true },
          { value: 'yesmeck', label: 'yesmeck' },
        ]}
      />

      {/* 配合 Form 使用 */}
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
