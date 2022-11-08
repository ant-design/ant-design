## zh-CN

集成 [react-resizable](https://github.com/STRML/react-resizable) 来实现可伸缩列。如果有排序需要，可以通过[额外标记](https://codesandbox.io/s/zrj8xvyzxx)阻止触发排序。

## en-US

Implement resizable column by integrate with [react-resizable](https://github.com/STRML/react-resizable). When sort needed, you can use [additional mark](https://codesandbox.io/s/zrj8xvyzxx) to prevent resize trigger sort.

```css
#components-table-demo-resizable-column .react-resizable {
  position: relative;
  background-clip: padding-box;
}

#components-table-demo-resizable-column .react-resizable-handle {
  position: absolute;
  right: -5px;
  bottom: 0;
  z-index: 1;
  width: 10px;
  height: 100%;
  cursor: col-resize;
}
```
