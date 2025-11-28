---
group:
  title: Migration
  order: 2
order: 0
title: From v5 to v6
---

This document will help you upgrade antd from version `5.x` to `6.x`. This release is primarily a technical upgrade, most component APIs remain compatible, you will need to ensure your environment meets the new requirements before upgrading.

## Before you upgrade

1. First upgrade to the latest v5 release and address any deprecation warnings shown in the console.
2. Make sure your project runs on React 18 or above — v6 no longer supports React 17 or earlier.
3. v6 only supports modern browsers and uses CSS variables by default, so IE is not supported.

Install:

```bash
npm install --save antd@6
# or
yarn add antd@6
# or
pnpm add antd@6
```

## What incompatible changes are in v6

### React version support

- `antd@6` requires React >= 18 and no longer supports React 17 or earlier.
- You no longer need the `@ant-design/v5-patch-for-react-19` package to support React 19; you can remove it if present.

```diff
- import '@ant-design/v5-patch-for-react-19';
```

### @ant-design/icons version upgrade

- `antd@6` requires `@ant-design/icons` version >= 6.0.0.
- ⚠️ **Important**: `@ant-design/icons@6` is not compatible with `antd@5`. Make sure to upgrade both packages together.
- If your project explicitly depends on `@ant-design/icons`, you need to upgrade it to v6 as well.

```bash
npm install --save @ant-design/icons@6
# or
yarn add @ant-design/icons@6
# or
pnpm add @ant-design/icons@6
```

If you encounter build errors during the upgrade, please verify that your `@ant-design/icons` version matches your `antd` version.

### DOM adjustments

- v6 upgrades and optimizes the DOM structure of many components to improve maintainability and consistency.
- For most projects that rely on standard antd styling this should have no effect.
- ⚠️ If your project contains custom styles that target internal DOM nodes of components (for example, relying on specific selectors or hierarchy), you may need to inspect and adjust those styles after upgrading.

### Overlay components (Modal, Drawer, etc.)

- v6 introduces the `mask` overlay option and supports a blur effect.
- The blur is enabled by default. To disable blur:

```tsx
import { ConfigProvider, Drawer, Modal } from 'antd';

export default () => (
  <ConfigProvider
    modal={{
      mask: {
        blur: false,
      },
    }}
    drawer={{
      mask: {
        blur: false,
      },
    }}
  >
    <Modal />
    <Drawer />
  </ConfigProvider>
);
```

### Tag margin adjustment

v6 removes the trailing default margin from the `Tag` component (previously a horizontal list of Tags left an extra `margin-inline-end` on the last one). If your layout or custom styles relied on that implicit spacing, reintroduce it via `ConfigProvider` `tag.styles`:

```tsx
import { ConfigProvider, Tag } from 'antd';

export default () => (
  <ConfigProvider
    tag={{
      styles: {
        root: {
          marginInlineEnd: 8,
        },
      },
    }}
  >
    <Tag>Tag A</Tag>
    <Tag>Tag B</Tag>
    <Tag>Tag C</Tag>
  </ConfigProvider>
);
```

If you only need the old spacing in specific areas, prefer local container overrides instead of global configuration to avoid unintended impact elsewhere.

### Form `onFinish` no longer includes all data from Form.List

In v5, Form.List was treated as a single Field, causing `onFinish` to include all data within the Form.List structure, even for items without a registered Form.Item. In v6, Form.List no longer includes data from unregistered child items. Therefore, you no longer need to use `getFieldsValue({ strict: true })` to filter out unregistered fields.

```diff
    const onFinish = (values) => {
--    const realValues = getFieldsValue({ strict: true });
++    const realValues = values;

      // ...
    }

    <Form onFinish={onFinish} />
```

### Browser support changes

- CSS variables are enabled by default and only modern browsers are supported.
- IE is no longer supported. Some older domestic browsers may have compatibility issues — please verify target browsers before shipping your app.

## Upgrade checklist

To ensure your app works correctly after upgrading to v6, please go through the following checklist:

- React version: confirm your app uses React >= 18 and has removed `@ant-design/v5-patch-for-react-19`.
- @ant-design/icons version: confirm `@ant-design/icons` has been upgraded to >= 6.0.0 to match `antd@6`.
- Browser compatibility: confirm your target user browsers are modern and support CSS variables.
- Custom styles: if you have CSS that targets component internal DOM nodes, verify they still work under v6 and adjust if necessary.
- Overlay mask configuration: decide whether Modal, Drawer, etc. need the mask blur disabled; leave defaults if not needed.
- Build configuration: ensure your build completes without errors and CSS variables / CSS-in-JS work correctly.
- Console warnings: run the app and resolve any legacy API warnings shown in the console.

## Need help?

If you run into problems while upgrading, please open an issue at https://new-issue.ant.design/. We'll respond as soon as possible and improve the documentation.
