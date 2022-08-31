---
order: 8
title: V4 to V5
---

This document will help you upgrade from antd `4.x` version to antd `5.x` version. If you are using `3.x` or older version, please refer to the previous [upgrade document](/docs/react/migration-v4) to 4.x.

## Upgrade preparation

1. Please upgrade to the latest version of 4.x first, and remove / modify related APIs according to the console warning message.

## Incompatible changes in v5

### Design specification

- Basic rounded corner adjustment, changed from `2px` to four layers of radius, which are `2px` `4px` `6px` and `8px`. For example, radius of default Button is modified from `2px` to `6px`.
- Primary color adjustment, changed from <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1890ff; vertical-align: text-bottom;" /> `#1890ff` to <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #1677ff; vertical-align: text-bottom;" /> `#1677ff`.
- Global shadow optimization, adjusted from three layers of shadows to two layers, which are used in common components (Card .e.g) and popup components (Dropdown .e.g).
- Overall reduction in wireframe usage.

### Technology adjustment

- Remove less, adopt CSS-in-JS, for better support of dynamic themes. The bottom layer uses [@ant-design/cssinjs](https://github.com/ant-design/cssinjs) as a solution.
  - All less files are removed, and less variables are no longer exported.
  - Css files are no longer included in package. Since CSS-in-JS supports importing on demand, the original `antd/dist/antd.css` has also been abandoned. If you need to reset some basic styles, please import `antd/dist/reset.css`.
- Remove css variables and dynamic theme built on top of them.
- Remove `lib`, only provide `dist` and `es` in package.
- `babel-plugin-import` is no longer supported. CSS-in-JS itself has the ability to import on demand, and plugin support is no longer required. Umi users can remove related configurations.

```diff
// config/config.ts
export default {
  antd: {
-   import: true,
  },
};
```

### Compatibility

- DO NOT support IE browser anymore.

#### Component API adjustment

- The classname API of the component popup box is unified to `popupClassName`, and `dropdownClassName` and other similar APIs will be replaced.
  - AutoComplete
  - Cascader
  - Select
  - TreeSelect
  - TimePicker
  - DatePicker

```diff
  import { Select } from 'antd';

  const App: React.FC = () => (
    <Select
-     dropdownClassName="my-select-popup"
+     popupClassName="my-select-popup"
    />
  );

  export default App;
```

- The controlled visible API of the component popup is unified to `open`, and `visible` and other similar APIs will be replaced.
  - Drawer `visible` changed to `open`.
  - Modal `visible` changed to `open`.
  - Dropdown `visible` changed to `open`.
  - Tooltip `visible` changed to `open`.
  - Tag `visible` is removed.
  - Slider `tooltip` related API converged to `tooltip` property.
  - Table `filterDropdownVisible` changed to `filterDropdownOpen`.

```diff
  import { Modal, Tag, Table, Slider } from 'antd';

  const App: React.FC = () => {
    const [visible, setVisible] = useState(true);

    return (
      <>
-       <Modal visible={visible}>content</Modal>
+       <Modal open={visible}>content</Modal>

-       <Tag visible={visible}>tag</Tag>
+       {visible && <Tag>tag</Tag>}

        <Table
          data={[]}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
-             filterDropdownVisible: visible,
+             filterDropdownOpen: visible,
            }
          ]}
        />

-       <Slider tooltipVisible={visible} />
+       <Slider tooltip={{ open: visible }} />
      </>
    );
  }

  export default App;
```

- `getPopupContainer`: All `getPopupContainer` are guaranteed to return a unique div. This method will be called repeatedly under React 18 concurrent mode.
- Dropdown
  - The style of the wrapper element has been removed, please use the Space component.
  - `prefixCls` of Dropdown.Button changed to `dropdown`.
- Upload List structure changes.
- Notification
  - Static methods are no longer allowed to dynamically set `prefixCls` `maxCount` `top` `bottom` `getContainer` in `open`, Notification static methods will now have only one instance. If you need a different configuration, use `useNotification`.
  - `close` was renamed to `destroy` to be consistent with message.
- Drawer
  - `style` & `className` are migrated to Drawer Panel, the original properties are replaced by `rootClassName` and `rootStyle`.

#### Component refactoring and removal

- PageHeader and Comment components are removed in ant-design and moved to [pro-components](https://github.com/ant-design/pro-components) for maintenance. If you still need to use them, you can [import them from the compatible package](/docs/react/migration-v5#Import-the-obsolete-PageHeader-and-Comment-components-via-@ant-design/compatible-package).

```diff
- import { PageHeader, Comment, Input, Button } from 'antd';
+ import { PageHeader, Comment } from '@ant-design/compatible';
+ import '@ant-design/compatible/assets/index.css';
+ import { Input, Button } from 'antd';

  const App: React.FC = () => (
    <div>
      <PageHeader />
      <Comment />
    </div>
  );

  export default App;
```

## Start upgrading

#### Migrate with codemod

```bash
# Run directly through npx
npx -p @ant-design/codemod-v5 antd5-codemod src

# Or global installation
# Use npm
npm i -g @ant-design/codemod-v5
# Use yarn
yarn global add @ant-design/codemod-v5

# Execute
antd5-codemod src
```

> Note that codemod cannot cover all scenarios, and it is recommended to check for incompatible changes one by one.

At the same time, you can also use the codemod tool to apply a single change for a certain change. The following is a description of all the migration scripts:

##### popup-visible-to-open

Change prop of components with popup from `visible` to `open`。

```bash
antd5-codemod popup-visible-to-open <path>
```

##### popup-classname-to-popupClassName

Change `className` of popup in components to `popupClassName`。

```bash
antd5-codemod popup-classname-to-popupClassName <path>
```

#### Install compatible package

Install `@ant-design/compatible` with `v5-compatible-v4` tag:

```bash
npm install --save @ant-design/compatible@v5-compatible-v4
```

## Encounter problems

If you encounter problems during the upgrade, please go to [GitHub issues](http://new-issue.ant.design/) for feedback. We will respond and improve this document as soon as possible.
