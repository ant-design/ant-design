# Typography Component

**Purpose**: Basic text writing, including headings, body text, lists, and more. Provides consistent typography styling across the application.

## When to Use

- Display titles or paragraph contents in articles, blogs, or notes
- Need copyable, editable, or ellipsis text
- Create consistent text hierarchy
- Format code, links, and other text elements

## Basic Usage

```typescript
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

<Title>Heading Title</Title>
<Paragraph>This is a paragraph.</Paragraph>
<Text>Inline text</Text>
<Link href="https://ant.design">Link</Link>
```

## Component Variants

### Title

```typescript
import { Typography } from 'antd';
const { Title } = Typography;

<Title level={1}>H1 Title</Title>
<Title level={2}>H2 Title</Title>
<Title level={3}>H3 Title</Title>
<Title level={4}>H4 Title</Title>
<Title level={5}>H5 Title</Title>
```

### Paragraph

```typescript
const { Paragraph } = Typography;

<Paragraph>This is a paragraph with multiple lines of text.</Paragraph>
```

### Text

```typescript
const { Text } = Typography;

<Text>Regular text</Text>
<Text strong>Bold text</Text>
<Text italic>Italic text</Text>
<Text underline>Underlined text</Text>
<Text delete>Deleted text</Text>
<Text mark>Marked text</Text>
<Text code>Code text</Text>
<Text keyboard>Keyboard text</Text>
```

### Link

```typescript
const { Link } = Typography;

<Link href="https://ant.design">Link</Link>
<Link href="https://ant.design" target="_blank">External Link</Link>
```

## Common Props

### Typography.Text Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `code` | Code style | boolean | false |
| `copyable` | Whether to be copyable | boolean \| object | false |
| `delete` | Deleted line style | boolean | false |
| `disabled` | Disabled content | boolean | false |
| `editable` | If editable | boolean \| object | false |
| `ellipsis` | Display ellipsis when overflow | boolean \| object | false |
| `keyboard` | Keyboard style | boolean | false |
| `mark` | Marked style | boolean | false |
| `strong` | Bold style | boolean | false |
| `italic` | Italic style | boolean | false |
| `type` | Content type | `'secondary'` \| `'success'` \| `'warning'` \| `'danger'` | - |
| `underline` | Underlined style | boolean | false |

### Typography.Title Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `level` | Heading level (1-5) | 1 \| 2 \| 3 \| 4 \| 5 | 1 |
| `code` | Code style | boolean | false |
| `copyable` | Whether to be copyable | boolean \| object | false |
| `editable` | If editable | boolean \| object | false |
| `ellipsis` | Display ellipsis | boolean \| object | false |
| `mark` | Marked style | boolean | false |
| `type` | Content type | `'secondary'` \| `'success'` \| `'warning'` \| `'danger'` | - |

### Typography.Paragraph Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `code` | Code style | boolean | false |
| `copyable` | Whether to be copyable | boolean \| object | false |
| `editable` | If editable | boolean \| object | false |
| `ellipsis` | Display ellipsis | boolean \| object | false |
| `strong` | Bold style | boolean | false |
| `type` | Content type | `'secondary'` \| `'success'` \| `'warning'` \| `'danger'` | - |

## Examples

### Copyable Text

```typescript
<Text copyable>Copy this text</Text>

<Text copyable={{ text: 'Custom text to copy' }}>
  Click to copy custom text
</Text>
```

### Editable Text

```typescript
<Paragraph editable={{ onChange: setContent }}>
  {content}
</Paragraph>

<Title editable={{ onChange: setTitle }}>
  {title}
</Title>
```

### Ellipsis

```typescript
<Paragraph ellipsis>
  Very long text that will be truncated with ellipsis...
</Paragraph>

<Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
  Very long text that will be truncated to 3 rows...
</Paragraph>
```

### Text Types

```typescript
<Text type="secondary">Secondary text</Text>
<Text type="success">Success text</Text>
<Text type="warning">Warning text</Text>
<Text type="danger">Danger text</Text>
```

### Combined Styles

```typescript
<Text strong mark>Important marked text</Text>
<Text code strong>const example = 'code';</Text>
<Text delete type="secondary">Deleted secondary text</Text>
```

## Best Practices

1. **Use appropriate heading levels** - Maintain proper heading hierarchy (h1 → h2 → h3)
2. **Use Paragraph for body text** - Use Paragraph component for multi-line content
3. **Use Text for inline elements** - Use Text for inline formatting and styling
4. **Ellipsis for long content** - Use ellipsis to truncate long text gracefully
5. **Copyable for important data** - Make important data copyable (IDs, codes, etc.)
6. **Editable for user content** - Use editable for user-generated content
7. **Consistent typography** - Use Typography components instead of raw HTML tags
8. **Accessible headings** - Use proper heading levels for screen readers

## Common Patterns

### Article Content

```typescript
<Typography>
  <Title level={1}>Article Title</Title>
  <Paragraph>
    Introduction paragraph with important information.
  </Paragraph>
  <Title level={2}>Section Title</Title>
  <Paragraph>
    Section content with detailed information.
  </Paragraph>
</Typography>
```

### Code Display

```typescript
<Paragraph>
  Use <Text code>code</Text> for inline code snippets.
</Paragraph>

<Paragraph>
  <pre>
    <Text code copyable>
      {codeBlock}
    </Text>
  </pre>
</Paragraph>
```

### User Information

```typescript
<Text copyable={{ text: userId }}>
  User ID: {userId}
</Text>

<Text editable={{ onChange: handleNameChange }}>
  {userName}
</Text>
```

## Accessibility

- Headings use proper semantic HTML (h1-h5)
- Copyable elements are keyboard accessible
- Editable elements have proper ARIA labels
- Text types maintain sufficient color contrast
