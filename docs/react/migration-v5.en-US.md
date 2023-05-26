---
order: 8
title: V4 to V5
---

This document will help you upgrade from antd `4.x` version to antd `5.x` version. If you are using `3.x` or older version, please refer to the previous [upgrade document](https://4x.ant.design/docs/react/migration-v4) to 4.x.

## Upgrade preparation

1. Please upgrade to the latest version of 4.x first, and remove / modify related APIs according to the console warning message.

## Incompatible changes in v5

### Design specification

- Basic rounded corner adjustment, changed from `2px` to four layers of radius, which are `2px` `4px` `6px` and `8px`. For example, radius of default Button is modified from `2px` to `6px`.
- Primary color adjustment, changed from <ColorChunk color="#1890ff" /></ColorChunk> to <ColorChunk color="#1677ff" /></ColorChunk>.
- Global shadow optimization, adjusted from three layers of shadows to two layers, which are used in common components (Card .e.g) and popup components (Dropdown .e.g).
- Overall reduction in wireframe usage.

### Technology adjustment

- Remove less, adopt CSS-in-JS, for better support of dynamic themes. The bottom layer uses [@ant-design/cssinjs](https://github.com/ant-design/cssinjs) as a solution.
  - All less files are removed, and less variables are no longer exported.
  - Css files are no longer included in package. Since CSS-in-JS supports importing on demand, the original `antd/dist/antd.css` has also been abandoned. If you need to reset some basic styles, please import `antd/dist/reset.css`.
  - If you need to reset the style of the component, but you don't want to introduce `antd/dist/reset.css` to pollute the global style, You can try using the [App](/components/app) in the outermost layer to solve the problem that native elements do not have antd specification style.
- Remove css variables and dynamic theme built on top of them.
- LocaleProvider has been deprecated in 4.x (use `<ConfigProvider locale />` instead), we removed the related folder `antd/es/locale-provider` and `antd/lib/locale-provider` in 5.x.
- Replace built-in Moment.js with Dayjs. For more: [Use custom date library](/docs/react/use-custom-date-library/).
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
  - Mentions

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
- Upload List structure changes. [#34528](https://github.com/ant-design/ant-design/pull/34528)
- Notification
  - Static methods are no longer allowed to dynamically set `prefixCls` `maxCount` `top` `bottom` `getContainer` in `open`, Notification static methods will now have only one instance. If you need a different configuration, use `useNotification`.
  - `close` was renamed to `destroy` to be consistent with message.
- Drawer `style` & `className` are migrated to Drawer panel node, the original properties are replaced by `rootClassName` and `rootStyle`.
- The deprecated `message.warn` in 4.x is now completely removed, please use `message.warning` instead.

#### Component refactoring and removal

- Remove `locale-provider` Directory. `LocaleProvider` was removed in v4, please use `ConfigProvider` instead.
- Move Comment component into `@ant-design/compatible`.
- Move PageHeader component into `@ant-design/pro-components`.

  ```diff
  - import { PageHeader, Comment } from 'antd';
  + import { Comment } from '@ant-design/compatible';
  + import { PageHeader } from '@ant-design/pro-layout';

    const App: React.FC = () => (
      <>
        <PageHeader />
        <Comment />
      </>
    );

    export default App;
  ```

- BackTop is deprecated in `5.0.0`, and is merged into FloatButton.

  ```diff
  - import { BackTop } from 'antd';
  + import { FloatButton } from 'antd';

    const App: React.FC = () => (
      <div>
  -     <BackTop />
  +     <FloatButton.BackTop />
      </div>
    );

    export default App;
  ```

## Start upgrading

Use git to save your code and install latest version:

```bash
npm install --save antd@5.x
```

If you want to use v4 deprecated component like `Comment` or `PageHeader`. You can install `@ant-design/compatible` and `@ant-design/pro-layout` for compatible:

```bash
npm install --save @ant-design/compatible@v5-compatible-v4
npm install --save @ant-design/pro-layout
```

You can manually check the code one by one against the above list for modification. In addition, we also provide a codemod cli tool [@ant-design/codemod-v5](https://github.com/ant-design/codemod-v5) To help you quickly upgrade to v5.

Before running codemod cli, please submit your local code changes.

```shell
# Run directly through npx
npx -p @ant-design/codemod-v5 antd5-codemod src

# Or run directly through pnpm
pnpm --package=@ant-design/codemod-v5 dlx antd5-codemod src
```

<video autoplay="" loop="" style="width: 100%; max-height: 600px; object-fit: contain;">
  <source src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/file/A*Sjy5ToW6ow0AAAAAAAAAAAAADrJ8AQ" type="video/webm">
  <source src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/file/A*hTDYQJ2HFTYAAAAAAAAAAAAADrJ8AQ" type="video/mp4">
</video>

> Note that codemod cannot cover all scenarios, and it is recommended to check for incompatible changes one by one.

### less migration

If you using antd less variables, you can use compatible package to covert it into v4 less variables and use less-loader to inject them:

```js
const { theme } = require('antd/lib');
const { convertLegacyToken } = require('@ant-design/compatible/lib');

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

// Webpack Config
module.exports = {
  // ... other config
  loader: 'less-loader',
  options: {
    lessOptions: {
      modifyVars: v4Token,
    },
  },
};
```

And then remove antd less reference in your less file:

```diff
// Your less file
--  @import (reference) '~antd/es/style/themes/index';
or
--  @import '~antd/es/style/some-other-less-file-ref';
```

### Remove babel-plugin-import

Remove `babel-plugin-import` from package.json and modify `.babelrc`:

```diff
"plugins": [
- ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
]
```

Umi user can disable by config：

```diff
// config/config.ts or .umirc
export default {
  antd: {
-   import: true,
+   import: false,
  },
};
```

### Replace Day.js locale

Replace moment.js locale with day.js locale:

```diff
-   import moment from 'moment';
+   import dayjs from 'dayjs';
-   import 'moment/locale/zh-cn';
+   import 'dayjs/locale/zh-cn';

-   moment.locale('zh-cn');
+   dayjs.locale('zh-cn');
```

If you do not want to replace with day.js, you can use `@ant-design/moment-webpack-plugin` to keep moment.js:

```bash
npm install --save-dev @ant-design/moment-webpack-plugin
```

```javascript
// webpack-config.js
import AntdMomentWebpackPlugin from '@ant-design/moment-webpack-plugin';

module.exports = {
  // ...
  plugins: [new AntdMomentWebpackPlugin()],
};
```

### Legacy browser support

Ant Design v5 using `:where` css selector to reduce CSS-in-JS hash priority. You can use `@ant-design/cssinjs` `StyleProvider` to cancel this function. Please ref [Compatible adjustment](/docs/react/customize-theme#compatible-adjustment).

## Encounter problems

If you encounter problems during the upgrade, please go to [GitHub issues](https://new-issue.ant.design/) for feedback. We will respond and improve this document as soon as possible.
