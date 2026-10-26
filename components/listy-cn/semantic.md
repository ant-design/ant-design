## Listy

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，即滚动容器，设置字体与相对定位
- item（`semantic-mark-item`）: 条目元素，设置内间距、分割线与悬浮背景
- groupHeader（`semantic-mark-groupHeader`）: 分组标题元素，设置吸顶定位与背景色

### 使用案例

```tsx
<Listy
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    groupHeader: "semantic-mark-groupHeader"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-listy semantic-mark-root css-var-test-id ant-listy-css-var" style="overflow-anchor: none; width: 100%;">
        <div class="ant-listy-group-section" data-key="group:Design">
          <div class="ant-listy-group-header semantic-mark-groupHeader">
            Design
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:0">
            Olivia
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:1">
            Liam
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:2">
            Emma
          </div>
        </div>
        <div class="ant-listy-group-section" data-key="group:Engineering">
          <div class="ant-listy-group-header semantic-mark-groupHeader">
            Engineering
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:3">
            Noah
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:4">
            Ava
          </div>
          <div class="ant-listy-item semantic-mark-item" data-key="item:5">
            Ethan
          </div>
        </div>
      </div>
```
