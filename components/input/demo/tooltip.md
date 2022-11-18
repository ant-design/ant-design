## zh-CN

结合 [Tooltip](/components/tooltip) 组件，实现一个数值输入框，方便内容超长时的全量展现。

## en-US

You can use the Input in conjunction with [Tooltip](/components/tooltip) component to create a Numeric Input, which can provide a good experience for extra-long content display.

```css
/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}
```
