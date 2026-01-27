# Layout Component

**Purpose**: Handling the overall layout of a page. Provides Header, Sider, Content, and Footer components for building page structures.

## When to Use

- Build page layouts with header, sidebar, content, and footer
- Create top navigation layouts
- Create side navigation layouts
- Need responsive layout structures

## Basic Usage

```typescript
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

<Layout>
  <Header>Header</Header>
  <Layout>
    <Sider>Sider</Sider>
    <Content>Content</Content>
  </Layout>
  <Footer>Footer</Footer>
</Layout>
```

## Component Structure

- **`Layout`**: The layout wrapper, can nest Header, Sider, Content, Footer, or Layout itself
- **`Header`**: Top layout with default style
- **`Sider`**: Sidebar with default style and basic functions
- **`Content`**: Content layout with default style
- **`Footer`**: Bottom layout with default style

## Common Props

### Layout Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `hasSider` | Whether has sider | boolean | false |

### Sider Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `collapsed` | Whether to collapse | boolean | false |
| `collapsedWidth` | Width when collapsed | number | 80 |
| `defaultCollapsed` | Default collapsed state | boolean | false |
| `reverseArrow` | Reverse arrow direction | boolean | false |
| `trigger` | Custom trigger | ReactNode | - |
| `width` | Width of sidebar | number \| string | 200 |
| `theme` | Theme | `'light'` \| `'dark'` | `'light'` |
| `onCollapse` | Collapse callback | (collapsed, type) => void | - |

## Examples

### Basic Layout

```typescript
<Layout>
  <Header style={{ background: '#fff', padding: 0 }}>Header</Header>
  <Layout>
    <Sider width={200} theme="light">Sider</Sider>
    <Content style={{ padding: '24px', minHeight: 280 }}>Content</Content>
  </Layout>
</Layout>
```

### Top Navigation

```typescript
<Layout>
  <Header>Top Navigation</Header>
  <Content>Main Content</Content>
  <Footer>Footer</Footer>
</Layout>
```

### Collapsible Sider

```typescript
const [collapsed, setCollapsed] = useState(false);

<Layout>
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
  >
    Sidebar
  </Sider>
  <Layout>
    <Content>Content</Content>
  </Layout>
</Layout>
```

### Fixed Header

```typescript
<Layout style={{ minHeight: '100vh' }}>
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    Fixed Header
  </Header>
  <Layout style={{ marginTop: 64 }}>
    <Content>Content</Content>
  </Layout>
</Layout>
```

## Best Practices

1. **Use Layout wrapper** - Always wrap layout components in Layout
2. **Proper nesting** - Header, Sider, Content, Footer must be inside Layout
3. **Responsive design** - Use responsive breakpoints for mobile layouts
4. **Fixed elements** - Use fixed positioning for headers/siders when needed
5. **Theme consistency** - Use consistent theme (light/dark) across layout
6. **Accessible navigation** - Ensure keyboard navigation works for collapsible siders
