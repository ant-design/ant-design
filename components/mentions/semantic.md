## Mentions

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set inline flex layout, relative positioning, padding and border styles
- textarea（`semantic-mark-textarea`）: Textarea element, set font, line height, text input and background styles
- popup（`semantic-mark-popup`）: Popup element, set absolute positioning, z-index, background color, border radius, shadow and dropdown options styles
- suffix（`semantic-mark-suffix`）: Suffix element with layout and styling for suffix content like clear button, etc.

### Usage Example

```tsx
<Mentions
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    popup: "semantic-mark-popup",
    suffix: "semantic-mark-suffix"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; height: 200px; overflow: hidden;">
        <span class="ant-mentions-affix-wrapper ant-mentions-outlined ant-mentions css-var-test-id ant-mentions-css-var semantic-mark-root ant-mentions-has-suffix">
          <textarea class="rc-textarea semantic-mark-textarea" rows="1">            Hi, @
          </textarea>
          <div class="ant-mentions-measure">
            Hi, 
            <span>
              @
            </span>
            <div class="ant-mentions-dropdown semantic-mark-popup css-var-test-id ant-mentions-css-var ant-mentions-dropdown-placement-bottomRight" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
              <ul class="ant-mentions-dropdown-menu ant-mentions-dropdown-menu-root ant-mentions-dropdown-menu-vertical" data-menu-list="true" role="menu" tabindex="0">
                <li class="ant-mentions-dropdown-menu-item ant-mentions-dropdown-menu-item-active" data-menu-id="rc-menu-uuid-afc163-test-id" role="menuitem" tabindex="-1">
                  afc163
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-zombieJ-test-id" role="menuitem" tabindex="-1">
                  zombieJ
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-thinkasany-test-id" role="menuitem" tabindex="-1">
                  thinkasany
                </li>
                <li class="ant-mentions-dropdown-menu-item" data-menu-id="rc-menu-uuid-meet-student-test-id" role="menuitem" tabindex="-1">
                  meet-student
                </li>
              </ul>
              <div aria-hidden="true" style="display: none;">
            </div>
          </div>
          <span class="ant-mentions-suffix semantic-mark-suffix">
            <button class="ant-mentions-clear-icon" tabindex="-1" type="button">
              <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                </svg>
              </span>
            </button>
          </span>
        
      </div>
    </span></div>
```
