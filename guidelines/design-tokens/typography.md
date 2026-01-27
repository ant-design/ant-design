# Typography Design Tokens

Ant Design uses a systematic typography token system for consistent text styling across all components.

## Design Philosophy

- Typography tokens control font family, size, weight, line height, and letter spacing
- All text should use typography tokens, never hardcoded values
- Typography creates visual hierarchy through size and weight variations
- Default font size is 14px, with variations for different contexts

## Font Families

### Default Font Family

- **`fontFamily`**: Default font family for UI text
  - Value: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
  - Usage: All standard UI text including headings and body text
  - Prioritizes system fonts for better performance and native feel

### Code Font Family

- **`fontFamilyCode`**: Font family for code text
  - Value: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`
  - Usage: Code blocks, inline code, technical content
  - Used in: Typography `code`, `pre`, and `kbd` elements

## Font Sizes

### Base Font Size

- **`fontSize`**: Base font size (default: `14`)
  - This is the foundation for all other font sizes
  - Most UI elements use this size or variations of it

### Font Size Scale

Ant Design uses a systematic font size scale:

- **`fontSizeSM`**: Small font size (default: `12px`)
  - Use for: Secondary text, captions, small labels

- **`fontSize`**: Base font size (default: `14px`)
  - Use for: Body text, form inputs, buttons, most UI elements

- **`fontSizeLG`**: Large font size (default: `16px`)
  - Use for: Emphasized body text, important content

- **`fontSizeXL`**: Extra large font size (default: `20px`)
  - Use for: Section headings, large emphasis

- **`fontSizeHeading1`**: H1 heading size (default: `38px`)
  - Use for: Page titles, hero headings

- **`fontSizeHeading2`**: H2 heading size (default: `30px`)
  - Use for: Major section headings

- **`fontSizeHeading3`**: H3 heading size (default: `24px`)
  - Use for: Subsection headings

- **`fontSizeHeading4`**: H4 heading size (default: `20px`)
  - Use for: Minor section headings

- **`fontSizeHeading5`**: H5 heading size (default: `16px`)
  - Use for: Small headings

## Font Weights

- **`fontWeightStrong`**: Strong/bold weight (default: `600`)
  - Use for: Headings, emphasized text, important labels

- **Default weight**: `400` (normal)
  - Use for: Body text, most UI elements

## Line Heights

Line heights are calculated based on font sizes for optimal readability:

- **`lineHeight`**: Base line height (default: `1.5714285714285714`)
  - Calculated as: `fontSize * 1.5714285714285714`
  - Use for: Body text, most content

- **`lineHeightLG`**: Large line height (default: `1.5`)
  - Use for: Large text, headings

- **`lineHeightSM`**: Small line height (default: `1.6666666666666667`)
  - Use for: Small text, compact UI

- **`lineHeightHeading1`**: H1 line height (default: `1.2105263157894737`)
- **`lineHeightHeading2`**: H2 line height (default: `1.2666666666666666`)
- **`lineHeightHeading3`**: H3 line height (default: `1.3333333333333333`)
- **`lineHeightHeading4`**: H4 line height (default: `1.4`)
- **`lineHeightHeading5`**: H5 line height (default: `1.5`)

## Usage Examples

### Using Typography Tokens

```typescript
import { theme } from 'antd';

const { token } = theme.useToken();

// ✅ CORRECT - Using typography tokens
<div style={{
  fontFamily: token.fontFamily,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  fontWeight: 400,
}}>
  Body text
</div>

// ✅ CORRECT - Heading with tokens
<h1 style={{
  fontFamily: token.fontFamily,
  fontSize: token.fontSizeHeading1,
  lineHeight: token.lineHeightHeading1,
  fontWeight: token.fontWeightStrong,
}}>
  Page Title
</h1>

// ✅ CORRECT - Code text
<code style={{
  fontFamily: token.fontFamilyCode,
  fontSize: token.fontSizeSM,
}}>
  const example = 'code';
</code>
```

### Using Typography Component

The Typography component automatically uses tokens:

```typescript
import { Typography } from 'antd';

const { Title, Paragraph, Text, Code } = Typography;

// Automatically uses correct tokens
<Title level={1}>Heading 1</Title>
<Title level={2}>Heading 2</Title>
<Paragraph>Body text</Paragraph>
<Text type="secondary">Secondary text</Text>
<Code>code example</Code>
```

### Incorrect Usage

```typescript
// ❌ WRONG - Hardcoding font sizes
<div style={{ fontSize: '14px', fontFamily: 'Arial' }}>

// ❌ WRONG - Not using tokens
<h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>

// ❌ WRONG - Inconsistent sizing
<p style={{ fontSize: '13px' }}>  // Should use fontSizeSM (12px) or fontSize (14px)
```

## Typography Hierarchy

### For Headings

- Use `fontSizeHeading1` for page titles in large views
- Use `fontSizeHeading2` for major section headers
- Use `fontSizeHeading3` for subsection headers
- Use `fontSizeHeading4` for minor section headers
- Use `fontSizeHeading5` for small headings
- Always use `fontWeightStrong` for headings

### For Body Text

- Use `fontSize` (14px) as the default for most UI elements
- Use `fontSizeLG` (16px) for emphasized body text or multiline content
- Use `fontSizeSM` (12px) sparingly - only for compact UI like badges, metadata, or when space is extremely limited
- **IMPORTANT**: Avoid using font sizes smaller than 12px as they are hard to read

### For Code

- Use `fontFamilyCode` for all code-related content
- Use `fontSizeSM` or `fontSize` for code text
- Use Typography's `Code` component for inline code
- Use Typography's `Pre` component for code blocks

## Text Colors

Typography colors are defined in the color token system:

- **`colorText`**: Default text color
- **`colorTextSecondary`**: Secondary text color
- **`colorTextTertiary`**: Tertiary text color
- **`colorTextHeading`**: Heading text color
- **`colorTextDisabled`**: Disabled text color

See [colors.md](colors.md) for detailed color token information.

## Customizing Typography

### Global Theme Customization

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      fontSize: 16,                    // Change base font size
      fontFamily: 'Your Font, sans-serif', // Change font family
      fontWeightStrong: 700,            // Change bold weight
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

### Component-Level Customization

```typescript
<ConfigProvider
  theme={{
    components: {
      Typography: {
        fontSizeHeading1: 40,           // Override H1 size
        fontWeightStrong: 700,          // Override bold weight
      },
    },
  }}
>
  {/* Your app */}
</ConfigProvider>
```

## Best Practices

1. **Always use typography tokens** - Never hardcode font sizes, families, or line heights
2. **Maintain hierarchy** - Use appropriate heading sizes for content structure
3. **Avoid small text** - Don't use font sizes smaller than 12px
4. **Use Typography component** - Prefer Typography component over manual styling
5. **Respect line heights** - Use appropriate line heights for readability
6. **Consistent weights** - Use `fontWeightStrong` only for headings and emphasis
7. **Code font for code** - Always use `fontFamilyCode` for code content
