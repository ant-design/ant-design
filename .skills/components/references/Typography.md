# Typography — 排版

## 功能概述

文本的基本格式。提供 Title, Text, Paragraph, Link 四个子组件。

## 子组件

### Typography.Title（标题）

- `level`: number，标题级别（1-5），默认 `1`。
- `copyable`: boolean | CopyConfig，可复制配置。
- `editable`: boolean | EditConfig，可编辑配置。
- `ellipsis`: boolean | EllipsisConfig，省略配置。
- `mark`: boolean，添加标记样式。
- `underline`: boolean，添加下划线样式。
- `delete`: boolean，添加删除线样式。
- `disabled`: boolean，禁用状态。
- `type`: string，类型，可选 `secondary` | `success` | `warning` | `danger`。
- `code`: boolean，代码样式。
- `italic`: boolean，斜体。
- `keyboard`: boolean，键盘样式。

### Typography.Text（文本）

同 Title，额外：

- `strong`: boolean，加粗。

### Typography.Paragraph（段落）

同 Text。

### Typography.Link（链接）

同 Text，额外：

- `href`: string，链接地址。
- `target`: string，链接目标。

### CopyConfig 结构

```tsx
interface CopyConfig {
  text?: string; // 复制的文本
  onCopy?: (event, info) => void; // 复制回调
  icon?: [ReactNode, ReactNode]; // 复制图标
  tooltips?: [ReactNode, ReactNode]; // 提示文案
  format?: 'text/plain' | 'text/html'; // 复制格式（5.22.0+）
}
```

### EllipsisConfig 结构

```tsx
interface EllipsisConfig {
  rows?: number; // 显示行数
  expandable?: boolean | 'collapsible'; // 可展开
  suffix?: string; // 后缀
  symbol?: ReactNode; // 展开描述
  tooltip?: ReactNode | TooltipProps; // 省略时的提示
  onExpand?: (event, info) => void; // 展开回调
  onEllipsis?: (ellipsis) => void; // 省略状态变化回调
}
```

### EditConfig 结构

```tsx
interface EditConfig {
  text?: string; // 编辑区域内容
  editing?: boolean; // 是否编辑中（受控）
  icon?: ReactNode; // 编辑图标
  tooltip?: ReactNode; // 提示
  maxLength?: number; // 最大长度
  autoSize?: boolean | { minRows; maxRows }; // 自动调整
  enterIcon?: ReactNode; // 确认图标
  triggerType?: ('icon' | 'text')[]; // 触发方式
  onChange?: (value) => void; // 文本变化回调
  onCancel?: () => void; // 取消回调
  onStart?: () => void; // 开始编辑回调
  onEnd?: () => void; // 结束编辑回调
}
```

## 使用建议

标题使用 Title；正文段落使用 Paragraph；行内文本使用 Text；链接使用 Link。

## 示例代码

```tsx
import { Divider, Space, Typography } from 'antd';

const { Title, Text, Paragraph, Link } = Typography;

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 标题 */}
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>

    <Divider />

    {/* 文本样式 */}
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

    {/* 可复制 */}
    <Paragraph copyable>This is a copyable text.</Paragraph>
    <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace text when copy.</Paragraph>

    {/* 可编辑 */}
    <Paragraph editable>This is an editable text.</Paragraph>

    {/* 省略 */}
    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
      Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
      a design language for background applications, is refined by Ant UED Team.
    </Paragraph>

    {/* 省略带提示 */}
    <Paragraph ellipsis={{ rows: 1, tooltip: 'Full text here' }}>
      Ant Design, a design language for background applications.
    </Paragraph>
  </Space>
);
```

## 返回结果

渲染排版组件，用于展示格式化的文本内容。
