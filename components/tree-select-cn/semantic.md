## TreeSelect

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置树选择器的基础样式、边框、圆角容器样式
- prefix（`semantic-mark-prefix`）: 前缀元素，设置前缀内容的布局和样式
- input（`semantic-mark-input`）: 输入框元素，设置文本输入、搜索、选择值显示等输入框的核心交互样式
- suffix（`semantic-mark-suffix`）: 后缀元素，设置后缀内容、清除按钮、下拉箭头等后缀区域的样式
- content（`semantic-mark-content`）: 多选容器，包含已选项的布局、间距、换行相关样式
- item（`semantic-mark-item`）: 多选项元素，包含边框、背景、内边距、外边距样式
- itemContent（`semantic-mark-itemContent`）: 多选项内容区域，包含文字的省略样式
- itemRemove（`semantic-mark-itemRemove`）: 多选项移除按钮，包含字体相关样式
- placeholder（`semantic-mark-placeholder`）: 占位符元素，包含占位符文本的字体样式和颜色
- popup.root（`semantic-mark-popup-root`）: 弹出菜单元素，设置下拉树形选择面板的定位、层级、背景、边框、阴影等弹层样式
- popup.item（`semantic-mark-popup-item`）: 弹出菜单条目元素，设置树节点选项的样式、悬停态、选中态等交互状态
- popup.itemTitle（`semantic-mark-popup-itemTitle`）: 弹出菜单标题元素，设置树节点标题文字的显示样式

### 使用案例

```tsx
<TreeSelect
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    prefix: "semantic-mark-prefix",
    input: "semantic-mark-input",
    suffix: "semantic-mark-suffix",
    content: "semantic-mark-content",
    item: "semantic-mark-item",
    itemContent: "semantic-mark-itemContent",
    itemRemove: "semantic-mark-itemRemove",
    placeholder: "semantic-mark-placeholder",
    popup.root: "semantic-mark-popup-root",
    popup.item: "semantic-mark-popup-item",
    popup.itemTitle: "semantic-mark-popup-itemTitle"
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
        <div class="ant-select ant-tree-select ant-select-outlined semantic-mark-root css-var-test-id ant-select-css-var ant-tree-select-css-var ant-select-multiple ant-select-allow-clear ant-select-show-arrow ant-select-open ant-select-show-search" style="width: 300px;">
          <div class="ant-select-prefix semantic-mark-prefix">
            prefix
          </div>
          <div class="ant-select-content semantic-mark-content">
            <div class="ant-select-content-item" style="opacity: 1;">
              <span class="ant-select-selection-item semantic-mark-item" title="aojunhao123">
                <span class="ant-select-selection-item-content semantic-mark-itemContent">
                  aojunhao123
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
              <input aria-autocomplete="list" aria-controls="test-id_list" aria-expanded="true" aria-haspopup="listbox" aria-owns="test-id_list" autocomplete="off" class="ant-select-input semantic-mark-input" id="test-id" role="combobox" style="--select-input-width: 0;" type="search" value="">
            </div>
          </div>
          <div class="ant-select-suffix semantic-mark-suffix">
            <span aria-label="search" class="anticon anticon-search" role="img">
              <svg aria-hidden="true" data-icon="search" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </span>
          </div>
          <div class="ant-select-clear">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="ant-select-dropdown ant-tree-select-dropdown semantic-mark-root semantic-mark-popup-root css-var-test-id ant-select-css-var ant-tree-select-css-var ant-select-dropdown-placement-bottomLeft" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div>
            <div>
              <span aria-live="assertive" style="width: 0px; height: 0px; display: flex; overflow: hidden; opacity: 0; border: 0px; padding: 0px; margin: 0px;">
                contributors
              </span>
              <div class="ant-select-tree">
                <div aria-hidden="true" class="ant-select-tree-treenode" style="position: absolute; pointer-events: none; visibility: hidden; height: 0px; overflow: hidden; border: 0px; padding: 0px;">
                  <div class="ant-select-tree-indent">
                    <div class="ant-select-tree-indent-unit">
                  </div>
                </div>
                <div aria-activedescendant="test-id-contributors" class="ant-select-tree-list" role="tree" style="position: relative;">
                  <div class="ant-select-tree-list-holder" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
                    <div>
                      <div class="ant-select-tree-list-holder-inner" style="display: flex; flex-direction: column;">
                        <div aria-disabled="false" aria-expanded="true" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-open ant-select-tree-treenode-active ant-select-tree-treenode-leaf-last" draggable="false" id="test-id-contributors" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                          <span class="ant-select-tree-switcher ant-select-tree-switcher_open">
                            <span aria-label="caret-down" class="anticon anticon-caret-down ant-select-tree-switcher-icon" role="img">
                              <svg aria-hidden="true" data-icon="caret-down" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                              </svg>
                            </span>
                          </span>
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-open" title="contributors">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              contributors
                            </span>
                          </span>
                        </span></div>
                        <div aria-disabled="false" aria-selected="true" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-selected ant-select-tree-treenode-leaf" draggable="false" id="test-id-aojunhao123" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal ant-select-tree-node-selected" title="aojunhao123">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              aojunhao123
                            </span>
                          </span>
                        </span></span></div>
                        <div aria-disabled="false" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-leaf" draggable="false" id="test-id-thinkasany" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal" title="thinkasany">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              thinkasany
                            </span>
                          </span>
                        </span></span></div>
                        <div aria-disabled="false" aria-selected="false" class="ant-select-tree-treenode semantic-mark-popup-item ant-select-tree-treenode-switcher-close ant-select-tree-treenode-leaf-last ant-select-tree-treenode-leaf" draggable="false" id="test-id-meet-student" role="treeitem">
                          <span aria-hidden="true" class="ant-select-tree-indent">
                            <span class="ant-select-tree-indent-unit ant-select-tree-indent-unit-start ant-select-tree-indent-unit-end">
                          </span>
                          <span class="ant-select-tree-switcher ant-select-tree-switcher-noop">
                          <span class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal" title="meet-student">
                            <span class="ant-select-tree-title semantic-mark-popup-itemTitle">
                              meet-student
                            </span>
                          </span>
                        </span></span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```
