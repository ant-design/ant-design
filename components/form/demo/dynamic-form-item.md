## zh-CN

动态增加、减少表单项。`add` 方法参数可用于设置初始值。

## en-US

Add or remove form items dynamically. `add` function support config initial value.

```css
.dynamic-delete-button {
  position: relative;
  top: 4px;
  margin: 0 8px;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
```

<style>
  [data-theme="dark"] .dynamic-delete-button {
    color: rgba(255,255,255,.45);
  }
  [data-theme="dark"] .dynamic-delete-button:hover {
    color: rgba(255,255,255,.65);
  }
</style>
