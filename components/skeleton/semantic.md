## Skeleton

### Semantic Parts

- root（`semantic-mark-root`）: Root element with table display, width, animation effects, border radius and other skeleton container basic styles
- header（`semantic-mark-header`）: Header element with table cell, padding, vertical alignment and other avatar placeholder area layout styles
- section（`semantic-mark-section`）: Section element with skeleton content area layout styles
- avatar（`semantic-mark-avatar`）: Avatar element with inline-block display, vertical alignment, background color, size, border radius and other avatar placeholder styles
- title（`semantic-mark-title`）: Title element with width, height, background color, border radius and other title placeholder styles
- paragraph（`semantic-mark-paragraph`）: Paragraph element with padding, list item styles, background color, border radius and other paragraph placeholder styles

### Usage Example

```tsx
<Skeleton
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    section: "semantic-mark-section",
    avatar: "semantic-mark-avatar",
    title: "semantic-mark-title",
    paragraph: "semantic-mark-paragraph"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-skeleton ant-skeleton-with-avatar semantic-mark-root css-var-test-id">
        <div class="semantic-mark-header ant-skeleton-header">
          <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle semantic-mark-avatar">
        </span></div>
        <div class="semantic-mark-section ant-skeleton-section">
          <h3 class="ant-skeleton-title semantic-mark-title" style="width: 50%;">
          <ul class="ant-skeleton-paragraph semantic-mark-paragraph">
            <li>
            </li><li>
            </li><li>
            </li><li>
          </li></ul>
        </h3></div>
      </div>
```
