## Descriptions

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic styles, reset styles, border styles, layout direction and other overall styles for description list container
- header（`semantic-mark-header`）: Header element with flex layout, alignment, bottom margin and other layout and style controls for header area
- title（`semantic-mark-title`）: Title element with text ellipsis, flex ratio, color, font weight, font size, line height and other title text styles
- extra（`semantic-mark-extra`）: Extra content element with left margin, color, font size and other styles for additional operation area
- label（`semantic-mark-label`）: Label element with color, font weight, font size, line height, text align, colon styles and other label text styles
- content（`semantic-mark-content`）: Content element with table cell layout, color, font size, line height, word break and other content display styles

### Usage Example

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
