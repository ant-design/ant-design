## zh-CN

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)。

如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。

如果需要垂直间距，可以写成数组形式 `[水平间距, 垂直间距]` `[16, { xs: 8, sm: 16, md: 24, lg: 32 }]`。

> 数组形式垂直间距在 `3.24.0` 之后支持。

## en-US

You can use the `gutter` property of `Row` as grid spacing, we recommend set it to `(16 + 8n) px` (`n` stands for natural number).

You can set it to a object like `{ xs: 8, sm: 16, md: 24, lg: 32 }` for responsive design.

You can use an array to set vertical spacing, `[horizontal, vertical]` `[16, { xs: 8, sm: 16, md: 24, lg: 32 }]`.

> vertical gutter was supported after `3.24.0`.

```css
.gutter-box {
  padding: 8px 0;
  background: #00a0e9;
}
```
