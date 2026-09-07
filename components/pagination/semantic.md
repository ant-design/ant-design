## Pagination

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set flex layout, alignment, flex wrap and list styles
- item（`semantic-mark-item`）: Item element, set size, padding, border, background color, hover state and active state styles

### Usage Example

```tsx
<Pagination
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<ul class="ant-pagination semantic-mark-root css-var-test-id">
        <li aria-disabled="true" class="ant-pagination-prev semantic-mark-item ant-pagination-disabled" title="Previous Page">
          <button class="ant-pagination-item-link" disabled="" tabindex="-1" type="button">
            <span aria-label="left" class="anticon anticon-left" role="img">
              <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </span>
          </button>
        </li>
        <li class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active semantic-mark-item" tabindex="0" title="1">
          <a rel="nofollow">
            1
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-2 semantic-mark-item" tabindex="0" title="2">
          <a rel="nofollow">
            2
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-3 semantic-mark-item" tabindex="0" title="3">
          <a rel="nofollow">
            3
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-4 semantic-mark-item" tabindex="0" title="4">
          <a rel="nofollow">
            4
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-5 semantic-mark-item" tabindex="0" title="5">
          <a rel="nofollow">
            5
          </a>
        </li>
        <li aria-disabled="false" class="ant-pagination-next semantic-mark-item" tabindex="0" title="Next Page">
          <button class="ant-pagination-item-link" tabindex="-1" type="button">
            <span aria-label="right" class="anticon anticon-right" role="img">
              <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
              </svg>
            </span>
          </button>
        </li>
      </ul>
```
