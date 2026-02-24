## Empty

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets text alignment, font and line height styles
- image（`semantic-mark-image`）: Image element, sets height, opacity, margin and image styles
- description（`semantic-mark-description`）: Description element, sets text color styles
- footer（`semantic-mark-footer`）: Footer element, sets top margin and action button styles

### Usage Example

```tsx
<Empty
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    image: "semantic-mark-image",
    description: "semantic-mark-description",
    footer: "semantic-mark-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-empty ant-empty-normal semantic-mark-root">
        <div class="ant-empty-image semantic-mark-image" style="height: 60px;">
          <svg height="41" viewBox="0 0 64 41" width="64" xmlns="http://www.w3.org/2000/svg">
            <title>
              No data
            </title>
            <g fill="none" fill-rule="evenodd" transform="translate(0 1)">
              <ellipse cx="32" cy="33" fill="#f5f5f5" rx="32" ry="7"></ellipse>
              <g fill-rule="nonzero" stroke="#d9d9d9">
                <path d="M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z"></path>
                <path d="M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3" fill="#fafafa"></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="ant-empty-description semantic-mark-description">
          <span class="ant-typography css-var-test-id">
            Customize 
            <a href="#API">
              Description
            </a>
          </span>
        </div>
        <div class="ant-empty-footer semantic-mark-footer">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
            <span>
              Create Now
            </span>
          </button>
        </div>
      </div>
```
