# Typography — 排版

## 功能概述

文本的基本格式。

## 应用场景

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

## 输入字段

### Typography.Text 属性

#### 必填

- 无必填属性。

#### 可选

- `code`: boolean，添加代码样式，默认 false。
- `copyable`: boolean | [copyable](#copyable)，是否可拷贝，为对象时可进行各种自定义，默认 false。
- `delete`: boolean，添加删除线样式，默认 false。
- `disabled`: boolean，禁用文本，默认 false。
- `editable`: boolean | [editable](#editable)，是否可编辑，为对象时可对编辑进行控制，默认 false。
- `ellipsis`: boolean | [Omit<ellipsis, 'expandable' | 'rows' | 'onExpand'>](#ellipsis)，自动溢出省略，为对象时不能设置省略行数、是否可展开、onExpand 展开事件。不同于 Typography.Paragraph，Text 组件自身不带 100% 宽度样式，因而默认情况下初次缩略后宽度便不再变化。如果需要自适应宽度，请手动配置宽度样式，默认 false。
- `keyboard`: boolean，添加键盘样式，默认 false，版本 4.3.0。
- `mark`: boolean，添加标记样式，默认 false。
- `onClick`: (event) => void，点击 Text 时的回调。
- `strong`: boolean，是否加粗，默认 false。
- `italic`: boolean，是否斜体，默认 false，版本 4.16.0。
- `type`: `secondary` | `success` | `warning` | `danger`，文本类型，版本 success: 4.6.0。
- `underline`: boolean，添加下划线样式，默认 false。

### Typography.Title 属性

#### 必填

- 无必填属性。

#### 可选

- `code`: boolean，添加代码样式，默认 false。
- `copyable`: boolean | [copyable](#copyable)，是否可拷贝，为对象时可进行各种自定义，默认 false。
- `delete`: boolean，添加删除线样式，默认 false。
- `disabled`: boolean，禁用文本，默认 false。
- `editable`: boolean | [editable](#editable)，是否可编辑，为对象时可对编辑进行控制，默认 false。
- `ellipsis`: boolean | [ellipsis](#ellipsis)，自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等，默认 false。
- `level`: number: 1, 2, 3, 4, 5，重要程度，相当于 `h1`、`h2`、`h3`、`h4`、`h5`，默认 1，版本 5: 4.6.0。
- `mark`: boolean，添加标记样式，默认 false。
- `onClick`: (event) => void，点击 Title 时的回调。
- `italic`: boolean，是否斜体，默认 false，版本 4.16.0。
- `type`: `secondary` | `success` | `warning` | `danger`，文本类型，版本 success: 4.6.0。
- `underline`: boolean，添加下划线样式，默认 false。

### Typography.Paragraph 属性

#### 必填

- 无必填属性。

#### 可选

- `code`: boolean，添加代码样式，默认 false。
- `copyable`: boolean | [copyable](#copyable)，是否可拷贝，为对象时可进行各种自定义，默认 false。
- `delete`: boolean，添加删除线样式，默认 false。
- `disabled`: boolean，禁用文本，默认 false。
- `editable`: boolean | [editable](#editable)，是否可编辑，为对象时可对编辑进行控制，默认 false。
- `ellipsis`: boolean | [ellipsis](#ellipsis)，自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等，默认 false。
- `mark`: boolean，添加标记样式，默认 false。
- `onClick`: (event) => void，点击 Paragraph 时的回调。
- `strong`: boolean，是否加粗，默认 false。
- `italic`: boolean，是否斜体，默认 false，版本 4.16.0。
- `type`: `secondary` | `success` | `warning` | `danger`，文本类型，版本 success: 4.6.0。
- `underline`: boolean，添加下划线样式，默认 false。

### copyable 属性

#### 必填

- 无必填属性。

#### 可选

- `format`: 'text/plain' | 'text/html'，剪切板数据的 Mime Type，版本 4.21.0。
- `icon`: \[ReactNode, ReactNode]，自定义拷贝图标：\[默认图标, 拷贝后的图标]，版本 4.6.0。
- `text`: string，拷贝到剪切板里的文本。
- `tooltips`: \[ReactNode, ReactNode]，自定义提示文案，为 false 时隐藏文案，默认 \[`复制`, `复制成功`]，版本 4.4.0。
- `onCopy`: function，拷贝成功的回调函数。
- `tabIndex`: number，自定义复制按钮的 tabIndex，默认 0，版本 5.17.0。

### editable 属性

#### 必填

- 无必填属性。

#### 可选

- `autoSize`: boolean | { minRows: number, maxRows: number }，自动 resize 文本域，版本 4.4.0。
- `editing`: boolean，控制是否是编辑中状态，默认 false。
- `icon`: ReactNode，自定义编辑图标，默认 <EditOutlined />，版本 4.6.0。
- `maxLength`: number，编辑中文本域最大长度，版本 4.4.0。
- `tooltip`: ReactNode，自定义提示文本，为 false 时关闭，默认 `编辑`，版本 4.6.0。
- `text`: string，显式地指定编辑文案，为空时将隐式地使用 children，版本 4.24.0。
- `onChange`: function(value: string)，文本域编辑时触发。
- `onCancel`: function，按 ESC 退出编辑状态时触发。
- `onStart`: function，进入编辑中状态时触发。
- `onEnd`: function，按 ENTER 结束编辑状态时触发，版本 4.14.0。
- `triggerType`: Array<`icon`|`text`>，编辑模式触发器类型，图标、文本或者两者都设置（不设置图标作为触发器时它会隐藏），默认 \[`icon`]。
- `enterIcon`: ReactNode，在编辑段中自定义“enter”图标（传递“null”将删除图标），默认 `<EnterOutlined />`，版本 4.17.0。
- `tabIndex`: number，自定义编辑按钮的 tabIndex，默认 0，版本 5.17.0。

### ellipsis 属性

#### 必填

- 无必填属性。

#### 可选

- `expandable`: boolean | 'collapsible'，是否可展开，版本 `collapsible`: 5.16.0。
- `rows`: number，最多显示的行数。
- `suffix`: string，自定义省略内容后缀。
- `symbol`: ReactNode | ((expanded: boolean) => ReactNode)，自定义展开描述文案，默认 `展开` `收起`。
- `tooltip`: ReactNode | [TooltipProps](/components/tooltip-cn/#api)，省略时，展示提示信息，版本 4.11.0。
- `defaultExpanded`: boolean，默认展开或收起，版本 5.16.0。
- `expanded`: boolean，展开或收起，版本 5.16.0。
- `onEllipsis`: function(ellipsis)，触发省略时的回调，版本 4.2.0。
- `onExpand`: function(event, { expanded: boolean })，点击展开或收起时的回调，版本 `info`: 5.16.0。

## 方法

无公开方法。

## 使用建议

标题使用 Title；正文段落使用 Paragraph；行内文本使用 Text；链接使用 Link。

## 示例代码

```tsx
import { Divider, Space, Typography } from 'antd';

const { Title, Text, Paragraph, Link } = Typography;

const App: React.FC = () => (
  <Space direction="vertical">
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>

    <Divider />

    <Text>Ant Design (default)</Text>
    <Text type="secondary">Ant Design (secondary)</Text>
    <Text type="success">Ant Design (success)</Text>
    <Text type="warning">Ant Design (warning)</Text>
    <Text type="danger">Ant Design (danger)</Text>
    <Text disabled>Ant Design (disabled)</Text>
    <Text mark>Ant Design (mark)</Text>
    <Text code>Ant Design (code)</Text>
    <Text keyboard>Ant Design (keyboard)</Text>
    <Text underline>Ant Design (underline)</Text>
    <Text delete>Ant Design (delete)</Text>
    <Text strong>Ant Design (strong)</Text>
    <Text italic>Ant Design (italic)</Text>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>

    <Divider />

    <Paragraph copyable>This is a copyable text.</Paragraph>
    <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace text when copy.</Paragraph>

    <Paragraph editable>This is an editable text.</Paragraph>

    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
      Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
      a design language for background applications, is refined by Ant UED Team.
    </Paragraph>

    <Paragraph ellipsis={{ rows: 1, tooltip: 'Full text here' }}>
      Ant Design, a design language for background applications.
    </Paragraph>
  </Space>
);
```

## 返回结果

渲染排版组件，用于展示格式化的文本内容。
