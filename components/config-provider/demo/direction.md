## zh-CN

这里列出了支持 `rtl` 方向的组件，您可以在演示中切换方向。

## en-US

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```css
.button-demo .ant-btn,
.button-demo .ant-btn-group {
  margin-right: 8px;
  margin-bottom: 12px;
}
.button-demo .ant-btn-group > .ant-btn,
.button-demo .ant-btn-group > span > .ant-btn {
  margin-right: 0;
  margin-left: 0;
}

.head-example {
  display: inline-block;
  width: 42px;
  height: 42px;
  vertical-align: middle;
  background: #eee;
  border-radius: 4px;
}

.ant-badge:not(.ant-badge-not-a-wrapper) {
  margin-right: 20px;
}
.ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
  margin-right: 0;
  margin-left: 20px;
}
```
