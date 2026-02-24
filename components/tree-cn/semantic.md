## Tree

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置树形控件的基础样式、布局和容器控制
- item（`semantic-mark-item`）: 条目元素，设置树节点的基础样式、拖拽状态、角色属性、缩进、切换器、内容包装器等节点结构
- itemTitle（`semantic-mark-itemTitle`）: 标题元素，设置树节点标题文字的显示样式和文本内容
- itemIcon（`semantic-mark-itemIcon`）: 图标元素，设置树节点图标的样式、尺寸和状态显示

### 使用案例

```tsx
<Tree
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemTitle: "semantic-mark-itemTitle",
    itemIcon: "semantic-mark-itemIcon"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tree css-var-test-id semantic-mark-root">
        <div aria-hidden="true" class="ant-tree-treenode" style="position: absolute; pointer-events: none; visibility: hidden; height: 0px; overflow: hidden; border: 0px; padding: 0px;">
          <div class="ant-tree-indent">
            <div class="ant-tree-indent-unit">
          </div>
        </div>
        <div class="ant-tree-list" role="tree" style="position: relative;" tabindex="0">
          <div class="ant-tree-list-holder">
            <div>
              <div class="ant-tree-list-holder-inner" style="display: flex; flex-direction: column;">
                <div aria-disabled="false" aria-expanded="true" aria-selected="false" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-open ant-tree-treenode-leaf-last" draggable="false" id="test-id-0-0" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                  <span class="ant-tree-switcher ant-tree-switcher_open">
                    <span aria-label="down" class="anticon anticon-down ant-tree-switcher-icon" role="img">
                      <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                      </svg>
                    </span>
                  </span>
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open" title="parent 1">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="smile" class="anticon anticon-smile" role="img">
                        <svg aria-hidden="true" data-icon="smile" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      parent 1
                    </span>
                  </span>
                </span></div>
                <div aria-disabled="false" aria-selected="true" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-close ant-tree-treenode-selected ant-tree-treenode-leaf" draggable="false" id="test-id-0-0-0" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                    <span class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end">
                  </span>
                  <span class="ant-tree-switcher ant-tree-switcher-noop">
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal ant-tree-node-selected" title="leaf">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="meh" class="anticon anticon-meh" role="img">
                        <svg aria-hidden="true" data-icon="meh" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 565H360c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      leaf
                    </span>
                  </span>
                </span></span></div>
                <div aria-disabled="false" aria-selected="false" class="ant-tree-treenode semantic-mark-item ant-tree-treenode-switcher-close ant-tree-treenode-leaf-last ant-tree-treenode-leaf" draggable="false" id="test-id-0-0-1" role="treeitem">
                  <span aria-hidden="true" class="ant-tree-indent">
                    <span class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end">
                  </span>
                  <span class="ant-tree-switcher ant-tree-switcher-noop">
                  <span class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal" title="leaf">
                    <span class="semantic-mark-itemIcon ant-tree-iconEle ant-tree-icon__customize">
                      <span aria-label="frown" class="anticon anticon-frown" role="img">
                        <svg aria-hidden="true" data-icon="frown" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM512 533c-85.5 0-155.6 67.3-160 151.6a8 8 0 008 8.4h48.1c4.2 0 7.8-3.2 8.1-7.4C420 636.1 461.5 597 512 597s92.1 39.1 95.8 88.6c.3 4.2 3.9 7.4 8.1 7.4H664a8 8 0 008-8.4C667.6 600.3 597.5 533 512 533z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="ant-tree-title semantic-mark-itemTitle">
                      leaf
                    </span>
                  </span>
                </span></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```
