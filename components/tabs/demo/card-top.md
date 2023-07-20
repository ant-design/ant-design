## zh-CN

用于容器顶部，需要一点额外的样式覆盖。

## en-US

Should be used at the top of container, needs to override styles.

```css
.custom-tabs .ant-tabs-content {
  padding: 16px;
  background: #fff;
}

.custom-tabs .ant-tabs-nav {
  margin: 0;
}

.custom-tabs .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

.custom-tabs .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}

.custom-tabs .ant-tabs-nav::before {
  display: none;
}
```
