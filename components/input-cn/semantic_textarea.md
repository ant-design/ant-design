## Input.Textarea

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置文本域包装器的样式、边框、圆角、过渡动画和状态控制
- textarea（`semantic-mark-textarea`）: 文本域元素，设置字体、行高、内边距、颜色、背景、边框、文本输入和多行文本展示样式
- count（`semantic-mark-count`）: 文字计数元素，设置字符计数显示的位置、字体、颜色和数值统计样式

### 使用案例

```tsx
<Input.Textarea
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-textarea-affix-wrapper ant-input-textarea-show-count ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root" data-count="17 / 100">
        <textarea class="ant-input semantic-mark-textarea" rows="3">          Hello, Ant Design
        </textarea>
        <span class="ant-input-suffix">
          <span class="ant-input-data-count semantic-mark-count">
            17 / 100
          </span>
        </span>
      </span>
```
