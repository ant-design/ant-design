## zh-CN

你可以通过 `icon` 属性为标签添加自定义图标。注意，CheckableTag 的 `icon` 属性在 `>=5.27.0` 版本支持。

若需要控制图标的位置，请在 `children` 中直接使用 `<XXXIcon />` 组件，而非通过 `icon` 属性实现。

`icon` 也支持第三方图标库的裸 `<svg>` 元素，建议将其尺寸设置为 `em`，以便在任意字号下都能与文字对齐。

## en-US

You can add a custom icon to the tag via the `icon` prop. Note that the `icon` prop for CheckableTag is only supported in version `>=5.27.0`.

If you need to control the icon position, please use the `<XXXIcon />` component directly in `children` instead of the `icon` prop.

`icon` also accepts a bare `<svg>` element from a third-party icon library. Sizing it in `em` keeps it aligned with the label at any font size.
