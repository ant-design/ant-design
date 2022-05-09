# V5 breaking change 记录

- Dropdown
  - 魔改包裹元素样式移除，请使用 Space 组件
  - DropdownButton 的 prefixCls 改为 `dropdown`
- Upload List 结构变化
- Notification
  - 静态方法不在允许在 `open` 中动态设置 `prefixCls` `maxCount` `top` `bottom` `getContainer`，Notification 静态方法现在将只有一个实例。如果需要不同配置，请使用 `useNotification`。
  - close 改名为 destroy 和 message 保持一致