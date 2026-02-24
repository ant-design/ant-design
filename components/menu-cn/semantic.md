## Menu

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含菜单容器的基础样式和布局
- item（`semantic-mark-item`）: 条目元素，包含相对定位、块级显示、外边距、空白符处理、光标样式、过渡动画等菜单项的基础交互样式
- itemContent（`semantic-mark-itemContent`）: 条目内容元素，包含菜单项内容的布局和排版样式
- itemIcon（`semantic-mark-itemIcon`）: 图标元素，包含最小宽度、字体大小、过渡动画、图标重置样式，以及与文本的间距控制
- itemTitle（`semantic-mark-itemTitle`）: 菜单标题元素(horizontal 模式不生效)，包含标题文字的样式和布局
- list（`semantic-mark-list`）: 菜单列表元素(horizontal 模式不生效)，包含菜单列表的布局和容器样式
- popup（`semantic-mark-popup`）: 弹出菜单(inline 模式不生效)，包含弹出层的定位、层级、背景等样式
- subMenu.itemTitle（`semantic-mark-subMenu-itemTitle`）: 子菜单标题元素，包含子菜单标题的样式和交互效果
- subMenu.list（`semantic-mark-subMenu-list`）: 子菜单列表元素，包含子菜单列表的布局和容器样式
- subMenu.item（`semantic-mark-subMenu-item`）: 子菜单单项元素，包含子菜单项的样式和交互效果
- subMenu.itemIcon（`semantic-mark-subMenu-itemIcon`）: 子菜单条目图标元素，包含子菜单图标的尺寸和样式
- subMenu.itemContent（`semantic-mark-subMenu-itemContent`）: 子菜单条目内容元素，包含子菜单内容的布局和排版

### 使用案例

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
