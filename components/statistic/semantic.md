## Statistic

### Semantic Parts

- root（`semantic-mark-root`）: Root element with reset styles and overall container styles for statistic component
- header（`semantic-mark-header`）: Header element with bottom padding and title area layout styles
- title（`semantic-mark-title`）: Title element with text color, font size and other title text display styles
- content（`semantic-mark-content`）: Content element with text color, font size, font family and other numeric content display styles
- prefix（`semantic-mark-prefix`）: Prefix element with inline-block display, right margin and other prefix content layout styles
- suffix（`semantic-mark-suffix`）: Suffix element with inline-block display, left margin and other suffix content layout styles

### Usage Example

```tsx
<Statistic
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    content: "semantic-mark-content",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-statistic semantic-mark-root css-var-test-id">
          <div class="ant-statistic-header semantic-mark-header">
            <div class="ant-statistic-title semantic-mark-title">
              Active
            </div>
          </div>
          <div class="ant-statistic-content semantic-mark-content" style="color: rgb(63, 134, 0);">
            <span class="ant-statistic-content-prefix semantic-mark-prefix">
              <span aria-label="arrow-up" class="anticon anticon-arrow-up" role="img">
                <svg aria-hidden="true" data-icon="arrow-up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-statistic-content-value">
              <span class="ant-statistic-content-value-int">
                11
              </span>
              <span class="ant-statistic-content-value-decimal">
                .28
              </span>
            </span>
            <span class="ant-statistic-content-suffix semantic-mark-suffix">
              %
            </span>
          </div>
        </div>
      </div>
```
