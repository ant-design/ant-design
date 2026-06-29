---
name: antd-migration
description: Migrate between Ant Design major versions. Use when upgrading from antd v4 to v5 or addressing breaking changes in component APIs.
---

# Ant Design Migration Guide

Migrate Ant Design projects between major versions, primarily v4 to v5.

## When to Use

- Upgrading from antd v4 to v5
- Addressing deprecated component APIs
- Replacing removed components or features
- Converting from Less to CSS-in-JS styling

## Instructions

1. Review the migration guide at `https://ant.design/docs/react/migration-v5`
2. Key migration steps from v4 to v5:
   - Replace `less` theme customization with `ConfigProvider` theme tokens
   - Update removed components: `BackTop` → `FloatButton.BackTop`, `Comment` → use `@ant-design/compatible`
   - Replace `message.useMessage()`, `notification.useNotification()`, `modal.useModal()` hooks
   - Update deprecated props (check migration guide for full list)
3. Use the `@ant-design/codemod-v5` tool for automated migrations
4. For the complete breaking changes list, fetch `https://ant.design/llms-full.txt`

## Notes

- Ant Design v5 drops Less in favor of CSS-in-JS
- Class name prefixes changed; if you used `ant-` prefix class names, update to dynamic class names
- Some component APIs have changed; check the migration guide for each component
