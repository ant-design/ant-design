## Card.Meta

### Semantic Parts

- root（`semantic-mark-root`）: set `root` of Card.Meta
- section（`semantic-mark-section`）: set `section` of Card.Meta
- avatar（`semantic-mark-avatar`）: set `avatar` of Card.Meta
- title（`semantic-mark-title`）: set `title` of Card.Meta
- description（`semantic-mark-description`）: set `description` of Card.Meta

### Usage Example

```tsx
<Card.Meta
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    avatar: "semantic-mark-avatar",
    title: "semantic-mark-title",
    description: "semantic-mark-description"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-card ant-card-bordered css-var-test-id" style="width: 300px;">
          <div class="ant-card-body">
            <div class="ant-card-meta semantic-mark-root">
              <div class="ant-card-meta-avatar semantic-mark-avatar">
                <span class="ant-avatar ant-avatar-circle ant-avatar-image css-var-test-id ant-avatar-css-var">
                  <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8">
                </span>
              </div>
              <div class="ant-card-meta-section semantic-mark-section">
                <div class="ant-card-meta-title semantic-mark-title">
                  Card Meta title
                </div>
                <div class="ant-card-meta-description semantic-mark-description">
                  This is the description
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```
