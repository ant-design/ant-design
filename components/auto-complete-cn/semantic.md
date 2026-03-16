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
