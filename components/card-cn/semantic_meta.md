## Card.Meta

### Semantic Parts

- root（`semantic-mark-root`）: 设置元信息根元素
- section（`semantic-mark-section`）: 设置元信息内容元素
- avatar（`semantic-mark-avatar`）: 设置元信息图标
- title（`semantic-mark-title`）: 设置元信息标题
- description（`semantic-mark-description`）: 设置元信息描述

### 使用案例

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
