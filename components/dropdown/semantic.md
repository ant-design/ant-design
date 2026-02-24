## Dropdown

### Semantic Parts

- root（`semantic-mark-root`）: Root element of dropdown, sets positioning, z-index and container styles
- itemTitle（`semantic-mark-itemTitle`）: Title content area of dropdown option, sets layout and text styles
- item（`semantic-mark-item`）: Individual dropdown option element, sets interaction states and background styles
- itemContent（`semantic-mark-itemContent`）: Main content area of dropdown option, sets content layout and link styles
- itemIcon（`semantic-mark-itemIcon`）: Icon area of dropdown option, sets icon size and spacing styles

### Usage Example

```tsx
<Dropdown
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    itemTitle: "semantic-mark-itemTitle",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemIcon: "semantic-mark-itemIcon"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="height: 120px; position: absolute; top: 50px;">
        <a class="ant-dropdown-trigger ant-dropdown-open">
          <div class="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
            <div class="ant-space-item">
              Hover me
            </div>
            <div class="ant-space-item">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
        <div class="ant-dropdown ant-slide-up-appear ant-slide-up-appear-prepare ant-slide-up css-var-test-id ant-dropdown-css-var semantic-mark-root ant-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1; width: 200px;">
          <ul class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light css-var-test-id ant-dropdown-css-var css-var-test-id ant-dropdown-menu-css-var" data-menu-list="true" role="menu" tabindex="0">
            <li class="ant-dropdown-menu-item-group" role="presentation">
              <div class="ant-dropdown-menu-item-group-title semantic-mark-itemTitle" role="presentation" title="Group title">
                Group title
              </div>
              <ul class="ant-dropdown-menu-item-group-list" role="group">
                <li class="ant-dropdown-menu-item semantic-mark-item" data-menu-id="rc-menu-uuid-1-1" role="menuitem" tabindex="-1">
                  <span aria-label="save" class="anticon anticon-save ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                    <svg aria-hidden="true" data-icon="save" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"></path>
                    </svg>
                  </span>
                  <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                    1st menu item
                  </span>
                </li>
                <li class="ant-dropdown-menu-item semantic-mark-item" data-menu-id="rc-menu-uuid-1-2" role="menuitem" tabindex="-1">
                  <span aria-label="edit" class="anticon anticon-edit ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                    <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                    </svg>
                  </span>
                  <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                    2nd menu item
                  </span>
                </li>
              </ul>
            </li>
            <li class="ant-dropdown-menu-submenu ant-dropdown-menu-submenu-vertical ant-dropdown-menu-submenu-open" role="none">
              <div aria-controls="rc-menu-uuid-SubMenu-popup" aria-expanded="true" aria-haspopup="true" class="ant-dropdown-menu-submenu-title" data-menu-id="rc-menu-uuid-SubMenu" role="menuitem" tabindex="-1">
                <span class="ant-dropdown-menu-title-content">
                  SubMenu
                </span>
                <span class="ant-dropdown-menu-submenu-expand-icon ant-dropdown-menu-submenu-arrow">
                  <span aria-label="right" class="anticon anticon-right ant-dropdown-menu-submenu-arrow-icon" role="img">
                    <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </li>
            <li class="ant-dropdown-menu-item-divider" role="separator">
            </li><li class="ant-dropdown-menu-item semantic-mark-item ant-dropdown-menu-item-danger" data-menu-id="rc-menu-uuid-4" role="menuitem" tabindex="-1">
              <span aria-label="delete" class="anticon anticon-delete ant-dropdown-menu-item-icon semantic-mark-itemIcon" role="img">
                <svg aria-hidden="true" data-icon="delete" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                </svg>
              </span>
              <span class="ant-dropdown-menu-title-content semantic-mark-itemContent">
                Delete
              </span>
            </li>
          </ul>
          <div aria-hidden="true" style="display: none;">
        </div>
      </div>
    </div>
```
