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
        <li class="ant-pagination-prev semantic-mark-item ant-pagination-disabled">
          <button aria-disabled="true" aria-label="Previous Page" class="ant-pagination-item-link" disabled="" role="button" tabindex="-1" type="button">
            <span aria-label="left" class="anticon anticon-left" role="img">
              <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
              </svg>
            </span>
          </button>
        </li>
        <li class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active semantic-mark-item" title="1">
          <a aria-current="page" aria-label="Page 1" rel="nofollow" role="button" tabindex="0">
            1
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-2 semantic-mark-item" title="2">
          <a aria-label="Page 2" rel="nofollow" role="button" tabindex="0">
            2
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-3 semantic-mark-item" title="3">
          <a aria-label="Page 3" rel="nofollow" role="button" tabindex="0">
            3
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-4 semantic-mark-item" title="4">
          <a aria-label="Page 4" rel="nofollow" role="button" tabindex="0">
            4
          </a>
        </li>
        <li class="ant-pagination-item ant-pagination-item-5 semantic-mark-item" title="5">
          <a aria-label="Page 5" rel="nofollow" role="button" tabindex="0">
            5
          </a>
        </li>
        <li class="ant-pagination-next semantic-mark-item">
          <button aria-label="Next Page" class="ant-pagination-item-link" role="button" tabindex="0" type="button">
            <span aria-label="right" class="anticon anticon-right" role="img">
              <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
              </svg>
            </span>
          </button>
        </li>
      </ul>
```
