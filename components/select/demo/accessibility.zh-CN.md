## zh-CN

Select 组件支持标准的 ARIA 属性，以确保屏幕阅读器用户和键盘导航的可访问性。

### 可访问性属性

- `aria-label`: 直接提供可访问的名称
- `aria-labelledby`: 引用外部标签元素的 ID
- `aria-describedby`: 引用描述或帮助文本
- `aria-required`: 表示该字段是必填的
- `aria-invalid`: 表示验证错误

### 表单集成

在 `Form.Item` 中使用时，aria 属性会自动管理:

- 当 `required` 属性为 true 时会添加 `aria-required`
- 验证失败时会添加 `aria-invalid`
- `aria-describedby` 会链接到帮助文本和错误消息

### 最佳实践

1. 始终使用 `aria-label` 或 `aria-labelledby` 提供标签
2. 使用 `aria-describedby` 提供帮助文本或额外说明
3. 让 `Form.Item` 自动管理 `aria-required` 和 `aria-invalid`
4. 使用屏幕阅读器测试以确保正确的朗读
