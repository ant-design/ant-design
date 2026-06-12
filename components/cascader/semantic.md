## Cascader

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles
- prefix（`semantic-mark-prefix`）: Prefix element with layout and styling for prefix content
- suffix（`semantic-mark-suffix`）: Suffix element with layout and styling for suffix content like clear button, arrow icon, etc.
- input（`semantic-mark-input`）: Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- clear（`semantic-mark-clear`）: Clear button element with layout, styling and interactive effects for clear button
- item（`semantic-mark-item`）: Multiple selection item element with border, background, padding, and margin styles
- itemContent（`semantic-mark-itemContent`）: Multiple selection item content area with text ellipsis styles
- itemRemove（`semantic-mark-itemRemove`）: Multiple selection item remove button with font-related styles
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles
- popup.list（`semantic-mark-popup-list`）: Popup list element with option list layout, scrolling, max-height and other list container styles
- popup.listItem（`semantic-mark-popup-listItem`）: Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles

### Usage Example

```tsx
<Cascader
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    input: "semantic-mark-input",
    content: "semantic-mark-content",
    clear: "semantic-mark-clear",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemRemove: "semantic-mark-itemRemove",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.list: "semantic-mark-popup-list",
    popup.listItem: "semantic-mark-popup-listItem"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="position: absolute; margin-bottom: 80px;">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Single">
                Single
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="Multiple">
                Multiple
              </div>
            </label>
          </div>
        </div>
        <div class="ant-select ant-cascader ant-select-outlined semantic-mark-root ant-select-css-var ant-cascader-css-var css-var-test-id ant-select-multiple ant-select-allow-clear ant-select-show-arrow ant-select-open" style="width: 200px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-content-item" style="opacity: 1;">
              <span class="ant-select-selection-item semantic-mark-item" title="thinkasany">
                <span class="ant-select-selection-item-content semantic-mark-itemContent">
                  thinkasany
                </span>
                <span aria-hidden="true" class="ant-select-selection-item-remove semantic-mark-itemRemove" style="user-select: none;" unselectable="on">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </span>
              </span>
            </div>
            <div class="ant-select-content-item ant-select-content-item-suffix" style="opacity: 1;">
              <input aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" readonly="" role="combobox" style="--select-input-width: 0;" type="search" value="">
            </div>
          </div>
          <div class="ant-select-suffix semantic-mark-suffix">
            <span aria-label="down" class="anticon anticon-down" role="img">
              <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-select-clear semantic-mark-clear">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="ant-select-dropdown ant-cascader-dropdown ant-select-css-var semantic-mark-popup-root ant-cascader-css-var css-var-test-id ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; min-width: auto;">
          <div>
            <div class="ant-cascader-menus">
              <ul class="ant-cascader-menu semantic-mark-popup-list" role="menu">
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem ant-cascader-menu-item-expand ant-cascader-menu-item-active" data-path-key="contributors" role="menuitemcheckbox" title="contributors">
                  <span class="ant-cascader-checkbox ant-cascader-checkbox-indeterminate">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    contributors
                  </div>
                  <div class="ant-cascader-menu-item-expand-icon">
                    <span aria-label="right" class="anticon anticon-right" role="img">
                      <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                      </svg>
                    </span>
                  </div>
                </span></li>
              </ul>
              <ul class="ant-cascader-menu semantic-mark-popup-list" role="menu">
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem" data-path-key="contributors__RC_CASCADER_SPLIT__aojunhao123" role="menuitemcheckbox" title="aojunhao123">
                  <span class="ant-cascader-checkbox">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    aojunhao123
                  </div>
                </span></li>
                <li aria-checked="true" class="ant-cascader-menu-item semantic-mark-popup-listItem ant-cascader-menu-item-active" data-path-key="contributors__RC_CASCADER_SPLIT__thinkasany" role="menuitemcheckbox" title="thinkasany">
                  <span class="ant-cascader-checkbox ant-cascader-checkbox-checked">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    thinkasany
                  </div>
                </span></li>
                <li aria-checked="false" class="ant-cascader-menu-item semantic-mark-popup-listItem" data-path-key="contributors__RC_CASCADER_SPLIT__meet-student" role="menuitemcheckbox" title="meet-student">
                  <span class="ant-cascader-checkbox">
                    <span class="ant-cascader-checkbox-inner">
                  </span>
                  <div class="ant-cascader-menu-item-content">
                    meet-student
                  </div>
                </span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
```
