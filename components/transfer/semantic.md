## Transfer

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, transfer container base styles and layout control
- section（`semantic-mark-section`）: Section element with flex layout, width, height, min height, border, border radius and other single-side transfer container styles
- header（`semantic-mark-header`）: Header element with flex layout, alignment, height, padding, color, background color, bottom border, border radius and other header area styles
- title（`semantic-mark-title`）: Title element with text ellipsis, flex ratio, text alignment, auto left margin and other title text layout and styles
- body（`semantic-mark-body`）: Body element with list main area container styles and layout control
- list（`semantic-mark-list`）: List element with list content styles, layout and scroll control
- item（`semantic-mark-item`）: List item element with relative positioning, padding, border, hover state, selected state, disabled state and other list item interaction styles
- itemIcon（`semantic-mark-itemIcon`）: List item icon element with checkbox and other icon styles and interaction states
- itemContent（`semantic-mark-itemContent`）: List item content element with text ellipsis, padding and other list item text content display styles
- footer（`semantic-mark-footer`）: Footer element with bottom operation area styles and layout
- actions（`semantic-mark-actions`）: Actions element with transfer button group styles, layout and interaction states

### Usage Example

```tsx
<Transfer
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemContent: "semantic-mark-itemContent",
    footer: "semantic-mark-footer",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-transfer css-var-test-id semantic-mark-root">
        <div class="ant-transfer-section semantic-mark-section ant-transfer-section-with-footer" style="height: 250px; width: 200px;">
          <div class="ant-transfer-list-header semantic-mark-header">
            <label class="ant-checkbox-wrapper ant-transfer-list-checkbox css-var-test-id ant-checkbox-css-var">
              <span class="ant-checkbox ant-wave-target">
                <input class="ant-checkbox-input" type="checkbox">
              </span>
            </label>
            <span aria-label="down" class="anticon anticon-down ant-dropdown-trigger" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
            <span class="ant-transfer-list-header-selected">
              18 items
            </span>
            <span class="ant-transfer-list-header-title semantic-mark-title">
              Source
            </span>
          </div>
          <div class="ant-transfer-list-body ant-transfer-list-body-with-search semantic-mark-body">
            <div class="ant-transfer-list-body-search-wrapper">
              <span class="ant-input-affix-wrapper ant-input-outlined ant-transfer-list-search css-var-test-id ant-input-css-var">
                <span class="ant-input-prefix">
                  <span aria-label="search" class="anticon anticon-search" role="img">
                    <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                    </svg>
                  </span>
                </span>
                <input class="ant-input" placeholder="Search here" type="text" value="">
                <span class="ant-input-suffix">
                  <button class="ant-input-clear-icon ant-input-clear-icon-hidden" tabindex="-1" type="button">
                    <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                      <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                      </svg>
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <ul class="ant-transfer-list-content semantic-mark-list">
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 1">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 1
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 2">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 2
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 3">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 3
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 5">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 5
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 6">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 6
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 7">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 7
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 8">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 8
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 9">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 9
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 11">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 11
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 12">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 12
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 13">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 13
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 14">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 14
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 15">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 15
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 16">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 16
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 17">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 17
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 18">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 18
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 19">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 19
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 20">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 20
                </span>
              </li>
            </ul>
          </div>
          <div class="ant-transfer-list-footer semantic-mark-footer">
            <div style="padding: 8px;">
              Custom Footer
            </div>
          </div>
        </div>
        <div class="ant-transfer-actions semantic-mark-actions">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-btn-icon-only" disabled="" type="button">
            <span class="ant-btn-icon">
              <span aria-label="right" class="anticon anticon-right" role="img">
                <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                </svg>
              </span>
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-btn-icon-only" disabled="" type="button">
            <span class="ant-btn-icon">
              <span aria-label="left" class="anticon anticon-left" role="img">
                <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                </svg>
              </span>
            </span>
          </button>
        </div>
        <div class="ant-transfer-section semantic-mark-section ant-transfer-section-with-footer" style="height: 250px; width: 200px;">
          <div class="ant-transfer-list-header semantic-mark-header">
            <label class="ant-checkbox-wrapper ant-transfer-list-checkbox css-var-test-id ant-checkbox-css-var">
              <span class="ant-checkbox ant-wave-target">
                <input class="ant-checkbox-input" type="checkbox">
              </span>
            </label>
            <span aria-label="down" class="anticon anticon-down ant-dropdown-trigger" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
            <span class="ant-transfer-list-header-selected">
              2 items
            </span>
            <span class="ant-transfer-list-header-title semantic-mark-title">
              Target
            </span>
          </div>
          <div class="ant-transfer-list-body ant-transfer-list-body-with-search semantic-mark-body">
            <div class="ant-transfer-list-body-search-wrapper">
              <span class="ant-input-affix-wrapper ant-input-outlined ant-transfer-list-search css-var-test-id ant-input-css-var">
                <span class="ant-input-prefix">
                  <span aria-label="search" class="anticon anticon-search" role="img">
                    <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                    </svg>
                  </span>
                </span>
                <input class="ant-input" placeholder="Search here" type="text" value="">
                <span class="ant-input-suffix">
                  <button class="ant-input-clear-icon ant-input-clear-icon-hidden" tabindex="-1" type="button">
                    <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                      <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                      </svg>
                    </span>
                  </button>
                </span>
              </span>
            </div>
            <ul class="ant-transfer-list-content semantic-mark-list">
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 4">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 4
                </span>
              </li>
              <li class="ant-transfer-list-content-item semantic-mark-item" title="content 10">
                <label class="ant-checkbox-wrapper ant-transfer-list-checkbox semantic-mark-itemIcon css-var-test-id ant-checkbox-css-var">
                  <span class="ant-checkbox ant-wave-target">
                    <input class="ant-checkbox-input" type="checkbox">
                  </span>
                </label>
                <span class="ant-transfer-list-content-item-text semantic-mark-itemContent">
                  content 10
                </span>
              </li>
            </ul>
          </div>
          <div class="ant-transfer-list-footer semantic-mark-footer">
            <div style="padding: 8px;">
              Custom Footer
            </div>
          </div>
        </div>
      </div>
```
