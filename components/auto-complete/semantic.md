## AutoComplete

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles
- prefix（`semantic-mark-prefix`）: Prefix element with layout and styling for prefix content
- input（`semantic-mark-input`）: Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles
- content（`semantic-mark-content`）: Multiple selection container with layout, spacing, and wrapping styles for selected items
- clear（`semantic-mark-clear`）: Clear button element with layout, styling and interactive effects for clear button
- placeholder（`semantic-mark-placeholder`）: Placeholder element with font styles and colors for placeholder text
- popup.root（`semantic-mark-popup-root`）: Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles
- popup.list（`semantic-mark-popup-list`）: Popup list element with option list layout, scrolling, max-height and other list container styles
- popup.listItem（`semantic-mark-popup-listItem`）: Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles

### Usage Example

```tsx
<AutoComplete
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    content: "semantic-mark-content",
    clear: "semantic-mark-clear",
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
        <div class="ant-select ant-select-outlined ant-select-auto-complete semantic-mark-root css-var-test-id ant-select-css-var ant-select-single ant-select-open ant-select-show-search" style="width: 200px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-placeholder semantic-mark-placeholder" style="visibility: visible;">
              Please select
            </div>
            <input aria-activedescendant="test-id_list_-1" aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" type="text" value="">
          </div>
        </div>
        <div class="ant-select-dropdown ant-slide-up-appear ant-slide-up-appear-prepare ant-slide-up semantic-mark-popup-root css-var-test-id ant-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div id="test-id_list" role="listbox" style="height: 0px; width: 0px; overflow: hidden;">
              <div aria-label="aojunhao123" aria-selected="false" id="test-id_list_0" role="option">
                aojunhao123
              </div>
            </div>
            <div class="rc-virtual-list semantic-mark-popup-list" style="position: relative;">
              <div class="rc-virtual-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                <div>
                  <div class="rc-virtual-list-holder-inner" style="display: flex; flex-direction: column;">
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="aojunhao123">
                      <div class="ant-select-item-option-content">
                        aojunhao123
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="thinkasany">
                      <div class="ant-select-item-option-content">
                        thinkasany
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem" title="meet-student">
                      <div class="ant-select-item-option-content">
                        meet-student
                      </div>
                      <span aria-hidden="true" class="ant-select-item-option-state" style="user-select: none;" unselectable="on">
                    </span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
```
