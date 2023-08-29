## zh-CN

渲染在当前 dom 里。自定义容器，查看 `getContainer`。

> 注意：在 v5 中 `style` 与 `className` 迁移至 Drawer 面板上与 Modal 保持一致，原 `style` 与 `className` 替换为 `rootStyle` 与 `rootClassName`。

> 如 [#41951](https://github.com/ant-design/ant-design/issues/41951#issuecomment-1521099152) 所述，如果 `getContainer` 以 callback 的形式返回了自定义容器，需要手动设置 `rootStyle` 为 `{ position: 'absolute' }`，否则会导致 `Drawer` 组件的表现不如预期。

## en-US

Render in current dom. custom container, check `getContainer`.

> Note: `style` and `className` props are moved to Drawer panel in v5 which is aligned with Modal component. Original `style` and `className` props are replaced by `rootStyle` and `rootClassName`.

> As noted in [#41951](https://github.com/ant-design/ant-design/issues/41951#issuecomment-1521099152), if `getContainer` returns a custom container as a callback. The `rootStyle` needs to be set manually to `{ position: 'absolute' }`, otherwise the `Drawer` component will not behave as expected.
