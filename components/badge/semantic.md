## Badge

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-block display, and fit-content width for basic layout
- indicator（`semantic-mark-indicator`）: Indicator element with positioning, z-index, dimensions, colors, fonts, text alignment, background, border-radius, box-shadow, and transition animations for complete badge styling

### Usage Example

```tsx
<Badge
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-badge semantic-mark-root css-var-test-id">
        <span class="ant-avatar ant-avatar-lg ant-avatar-square css-var-test-id ant-avatar-css-var">
          <span class="ant-avatar-string" style="-webkit-transform: scale(1); transform: scale(1);">
        </span>
        <sup class="ant-scroll-number semantic-mark-indicator ant-badge-count" data-show="true" title="5">
          <bdi>
            <span class="ant-scroll-number-only" style="transition: none;">
              <span class="ant-scroll-number-only-unit current">
                5
              </span>
            </span>
          </bdi>
        </sup>
      </span>
    </span>
```
