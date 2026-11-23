## Radio.Group

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，单选组合容器，包含排列方向、间距、按钮风格等组合布局样式
- item（`semantic-mark-item`）: 选项元素，单个 Radio 的包裹容器，包含选中、禁用、块级排列等选项样式
- itemIcon（`semantic-mark-itemIcon`）: 选项选中框元素，包含圆角、边框、过渡动画、悬停与焦点等交互样式
- itemLabel（`semantic-mark-itemLabel`）: 选项文本元素，包含内边距、文字颜色、禁用状态、对齐方式等文本样式

### 使用案例

```tsx
<Radio.Group
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
<div class="ant-radio-group ant-radio-group-outline semantic-mark-root css-var-test-id ant-radio-css-var" role="radiogroup">
        <label class="ant-radio-wrapper ant-radio-wrapper-checked semantic-mark-item css-var-test-id ant-radio-css-var">
          <span class="ant-radio semantic-mark-itemIcon ant-wave-target ant-radio-checked">
            <input checked="" class="ant-radio-input" name="test-id" type="radio" value="apple">
          </span>
          <span class="ant-radio-label semantic-mark-itemLabel">
            Apple
          </span>
        </label>
        <label class="ant-radio-wrapper semantic-mark-item css-var-test-id ant-radio-css-var">
          <span class="ant-radio semantic-mark-itemIcon ant-wave-target">
            <input class="ant-radio-input" name="test-id" type="radio" value="pear">
          </span>
          <span class="ant-radio-label semantic-mark-itemLabel">
            Pear
          </span>
        </label>
      </div>
```
