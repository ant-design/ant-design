## Checkbox.Group

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，复选框组合容器，包含布局、间距和排列等组合样式
- item（`semantic-mark-item`）: 选项元素，单个 Checkbox 的包裹容器，包含选中、禁用等选项样式
- itemIcon（`semantic-mark-itemIcon`）: 选项勾选框元素，包含尺寸、背景、边框、圆角和选中状态等图标样式
- itemLabel（`semantic-mark-itemLabel`）: 选项文本元素，包含内边距、文字颜色和对齐方式等文本样式

### 使用案例

```tsx
<Checkbox.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemLabel: "semantic-mark-itemLabel"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-checkbox-group semantic-mark-root css-var-test-id ant-checkbox-css-var" role="group">
        <label class="ant-checkbox-wrapper ant-checkbox-wrapper-checked ant-checkbox-group-item semantic-mark-item css-var-test-id ant-checkbox-css-var">
          <span class="ant-checkbox semantic-mark-itemIcon ant-wave-target ant-checkbox-checked">
            <input checked="" class="ant-checkbox-input" type="checkbox" value="Apple">
          </span>
          <span class="ant-checkbox-label semantic-mark-itemLabel">
            Apple
          </span>
        </label>
        <label class="ant-checkbox-wrapper ant-checkbox-group-item semantic-mark-item css-var-test-id ant-checkbox-css-var">
          <span class="ant-checkbox semantic-mark-itemIcon ant-wave-target">
            <input class="ant-checkbox-input" type="checkbox" value="Pear">
          </span>
          <span class="ant-checkbox-label semantic-mark-itemLabel">
            Pear
          </span>
        </label>
      </div>
```
