## AutoComplete

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含相对定位、行内 flex 布局、光标样式、过渡动画、边框等选择器容器的基础样式
- prefix（`semantic-mark-prefix`）: 前缀元素，包含前缀内容的布局和样式
- input（`semantic-mark-input`）: 输入框元素，包含搜索输入框的样式、光标控制、字体继承等搜索相关样式，去除了边框样式
- content（`semantic-mark-content`）: 多选容器，包含已选项的布局、间距、换行相关样式
- clear（`semantic-mark-clear`）: 清除按钮元素，包含清除按钮的布局、样式和交互效果
- placeholder（`semantic-mark-placeholder`）: 占位符元素，包含占位符文本的字体样式和颜色
- popup.root（`semantic-mark-popup-root`）: 弹出菜单元素，包含弹出层的定位、层级、背景、边框、阴影等弹出容器样式
- popup.list（`semantic-mark-popup-list`）: 弹出菜单列表元素，包含选项列表的布局、滚动、最大高度等列表容器样式
- popup.listItem（`semantic-mark-popup-listItem`）: 弹出菜单条目元素，包含选项项的内边距、悬浮效果、选中状态、禁用状态等选项交互样式

### 使用案例

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
        <div class="ant-select ant-select-outlined ant-select-auto-complete semantic-mark-root css-var-test-id ant-select-css-var ant-select-single ant-select-allow-clear ant-select-open ant-select-show-search" style="width: 200px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content ant-select-content-has-value ant-select-content-has-search-value semantic-mark-content" title="aojunhao123">
            aojunhao123
            <input aria-activedescendant="test-id_list_0" aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="new-password" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" type="text" value="aojunhao123">
          </div>
          <button aria-label="Clear" class="ant-select-clear semantic-mark-clear" style="opacity: 1;" type="button">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </button>
        </div>
        <div class="ant-select-dropdown ant-slide-up-appear ant-slide-up-appear-prepare ant-slide-up semantic-mark-popup-root css-var-test-id ant-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div id="test-id_list" role="listbox" style="height: 0px; width: 0px; overflow: hidden;">
              <div aria-label="aojunhao123" aria-selected="true" id="test-id_list_0" role="option">
                aojunhao123
              </div>
              <div aria-label="thinkasany" aria-selected="false" id="test-id_list_1" role="option">
                thinkasany
              </div>
            </div>
            <div class="ant-select-dropdown-list semantic-mark-popup-list" style="position: relative;">
              <div class="ant-select-dropdown-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                <div>
                  <div class="ant-select-dropdown-list-holder-inner" style="display: flex; flex-direction: column;">
                    <div aria-disabled="false" class="ant-select-item ant-select-item-option semantic-mark-popup-listItem ant-select-item-option-active" title="aojunhao123">
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
