## Descriptions

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含描述列表容器的基础样式、重置样式、边框样式、布局方向等整体样式
- header（`semantic-mark-header`）: 头部元素，包含flex布局、对齐方式、下边距等头部区域的布局和样式控制
- title（`semantic-mark-title`）: 标题元素，包含文本省略、flex占比、颜色、字体权重、字体大小、行高等标题文字样式
- extra（`semantic-mark-extra`）: 额外内容元素，包含左边距、颜色、字体大小等额外操作区域的样式
- label（`semantic-mark-label`）: 标签元素，包含颜色、字体权重、字体大小、行高、文本对齐、冒号样式等标签文字的样式
- content（`semantic-mark-content`）: 内容元素，包含表格单元格布局、颜色、字体大小、行高、文字换行等内容展示样式

### 使用案例

```tsx
<Descriptions
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    extra: "semantic-mark-extra",
    label: "semantic-mark-label",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%; height: 100%;">
        <button aria-checked="false" class="ant-switch css-var-test-id" role="switch" type="button">
          <div class="ant-switch-handle">
          <span class="ant-switch-inner">
            <span class="ant-switch-inner-checked">
            <span class="ant-switch-inner-unchecked">
          </span>
        </span></span></div></button>
        Toggle Border
        <div class="ant-divider css-var-test-id ant-divider-horizontal ant-divider-rail" role="separator">
        <div class="ant-descriptions semantic-mark-root css-var-test-id">
          <div class="ant-descriptions-header semantic-mark-header">
            <div class="ant-descriptions-title semantic-mark-title">
              User Info
            </div>
            <div class="ant-descriptions-extra semantic-mark-extra">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
                <span>
                  Edit
                </span>
              </button>
            </div>
          </div>
          <div class="ant-descriptions-view">
            <table>
              <tbody>
                <tr class="ant-descriptions-row">
                  <td class="ant-descriptions-item" colspan="1">
                    <div class="ant-descriptions-item-container">
                      <span class="ant-descriptions-item-label semantic-mark-label">
                        Telephone
                      </span>
                      <span class="ant-descriptions-item-content semantic-mark-content">
                        1810000000
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
```
