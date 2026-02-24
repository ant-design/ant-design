## Menu

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic menu container styles and layout
- item（`semantic-mark-item`）: Item element with relative positioning, block display, margins, whitespace handling, cursor styles, transitions and other basic interactive styles for menu items
- itemContent（`semantic-mark-itemContent`）: Item content element with layout and typography styles for menu item content
- itemIcon（`semantic-mark-itemIcon`）: Icon element with min-width, font-size, transitions, icon reset styles, and spacing control with text
- itemTitle（`semantic-mark-itemTitle`）: Item title element (no effect in horizontal mode) with title text styles and layout
- list（`semantic-mark-list`）: Menu list element (no effect in horizontal mode) with menu list layout and container styles
- popup（`semantic-mark-popup`）: Popup menu element (no effect in inline mode) with popup layer positioning, z-index, background and other styles
- subMenu.itemTitle（`semantic-mark-subMenu-itemTitle`）: Submenu title element with submenu title styles and interactive effects
- subMenu.list（`semantic-mark-subMenu-list`）: Submenu list element with submenu list layout and container styles
- subMenu.item（`semantic-mark-subMenu-item`）: Submenu item element with submenu item styles and interactive effects
- subMenu.itemIcon（`semantic-mark-subMenu-itemIcon`）: Submenu item icon element with submenu icon size and styles
- subMenu.itemContent（`semantic-mark-subMenu-itemContent`）: Submenu item content element with submenu content layout and typography

### Usage Example

```tsx
<Menu
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemIcon: "semantic-mark-itemIcon",
    itemTitle: "semantic-mark-itemTitle",
    list: "semantic-mark-list",
    popup: "semantic-mark-popup",
    subMenu.itemTitle: "semantic-mark-subMenu-itemTitle",
    subMenu.list: "semantic-mark-subMenu-list",
    subMenu.item: "semantic-mark-subMenu-item",
    subMenu.itemIcon: "semantic-mark-subMenu-itemIcon",
    subMenu.itemContent: "semantic-mark-subMenu-itemContent"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical">
        <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
          <div class="ant-segmented-group">
            <label class="ant-segmented-item">
              <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="horizontal">
                horizontal
              </div>
            </label>
            <label class="ant-segmented-item">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="vertical">
                vertical
              </div>
            </label>
            <label class="ant-segmented-item ant-segmented-item-selected">
              <input class="ant-segmented-item-input" name="test-id" type="radio">
              <div class="ant-segmented-item-label" title="inline">
                inline
              </div>
            </label>
          </div>
        </div>
        <div style="height: 360px;">
          <ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light css-var-test-id ant-menu-css-var semantic-mark-root" data-menu-list="true" item="[object Object],[object Object],[object Object]" role="menu" style="width: 230px;" tabindex="0">
            <li class="ant-menu-item ant-menu-item-selected semantic-mark-item" data-menu-id="rc-menu-uuid-mail" role="menuitem" style="padding-left: 24px;" tabindex="-1">
              <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-itemIcon" role="img">
                <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                </svg>
              </span>
              <span class="ant-menu-title-content semantic-mark-itemContent">
                Navigation One
              </span>
            </li>
            <li class="ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-open" role="none">
              <div aria-controls="rc-menu-uuid-SubMenu-popup" aria-expanded="true" aria-haspopup="true" class="ant-menu-submenu-title" data-menu-id="rc-menu-uuid-SubMenu" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-itemIcon" role="img">
                  <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                  </svg>
                </span>
                <span class="ant-menu-title-content">
                  Navigation One
                </span>
                <i class="ant-menu-submenu-arrow">
              </i></div><i class="ant-menu-submenu-arrow">
              <ul class="ant-menu ant-menu-sub ant-menu-inline" data-menu-list="true" id="rc-menu-uuid-SubMenu-popup" role="menu">
                <li class="ant-menu-item-group" role="presentation">
                  <div class="ant-menu-item-group-title semantic-mark-subMenu-itemTitle" role="presentation" title="Item 1">
                    Item 1
                  </div>
                  <ul class="ant-menu-item-group-list semantic-mark-subMenu-list" role="group">
                    <li class="ant-menu-item semantic-mark-subMenu-item" data-menu-id="rc-menu-uuid-1" role="menuitem" style="padding-left: 48px;" tabindex="-1">
                      <span aria-label="mail" class="anticon anticon-mail ant-menu-item-icon semantic-mark-subMenu-itemIcon" role="img">
                        <svg aria-hidden="true" data-icon="mail" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                        </svg>
                      </span>
                      <span class="ant-menu-title-content semantic-mark-subMenu-itemContent">
                        Option 1
                      </span>
                    </li>
                    <li class="ant-menu-item semantic-mark-subMenu-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-2" role="menuitem" style="padding-left: 48px;" tabindex="-1">
                      <span class="ant-menu-title-content semantic-mark-subMenu-itemContent">
                        Option 2
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </i></li><i class="ant-menu-submenu-arrow">
            <li class="ant-menu-item-group" role="presentation">
              <div class="ant-menu-item-group-title semantic-mark-itemTitle" role="presentation" title="Group">
                Group
              </div>
              <ul class="ant-menu-item-group-list semantic-mark-list" role="group">
                <li class="ant-menu-item semantic-mark-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-13" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                  <span class="ant-menu-title-content semantic-mark-itemContent">
                    Option 13
                  </span>
                </li>
                <li class="ant-menu-item semantic-mark-item ant-menu-item-only-child" data-menu-id="rc-menu-uuid-14" role="menuitem" style="padding-left: 24px;" tabindex="-1">
                  <span class="ant-menu-title-content semantic-mark-itemContent">
                    Option 14
                  </span>
                </li>
              </ul>
            </li>
          </i></ul><i class="ant-menu-submenu-arrow">
          <div aria-hidden="true" style="display: none;">
        </div>
      </i></div><i class="ant-menu-submenu-arrow">
    </i></div>
```
