## zh-CN

使用 `itemRender` ，我们可以集成 react-dnd 来实现对上传列表拖拽排序。

## en-US

By using `itemRender`, we can integrate upload with react-dnd to implement drag sorting of uploadList.

```css
#components-upload-demo-drag-sorting .ant-upload-draggable-list-item {
  border-top: 2px dashed rgba(0, 0, 0, 0);
  border-bottom: 2px dashed rgba(0, 0, 0, 0);
}
#components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-downward {
  border-bottom-color: #1890ff;
}
#components-upload-demo-drag-sorting .ant-upload-draggable-list-item.drop-over-upward {
  border-top-color: #1890ff;
}
```
