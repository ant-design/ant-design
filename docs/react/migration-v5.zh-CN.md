---
order: 8
title: 从 v4 到 v5
---

本文档将帮助你从 antd `4.x` 版本升级到 antd `5.x` 版本，如果你是 `3.x` 或者更老的版本，请先参考之前的[升级文档](https://4x.ant.design/docs/react/migration-v4-cn)升级到 4.x。

## 升级准备

1. 请先升级到 4.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。

## 5.0 有哪些不兼容的变化

### 设计规范调整

- 基础圆角调整，由统一的 `2px` 改为四级圆角，分别为 `2px` `4px` `6px` `8px`，分别应用于不同场景，比如默认尺寸的 Button 的圆角调整为了 `6px`。
- 主色调整，由 <ColorChunk color="#1890ff" /></ColorChunk> 改为 <ColorChunk color="#1677ff" /></ColorChunk>。
- 整体阴影调整，由原本的三级阴影调整为两级，分别用于常驻页面的组件（如 Card）和交互反馈（如 Dropdown）。
- 部分组件内间距调整。
- 整体去线框化。

### 技术调整

- 弃用 less，采用 CSS-in-JS，更好地支持动态主题。底层使用 [@ant-design/cssinjs](https://github.com/ant-design/cssinjs) 作为解决方案。
  - 所有 less 文件全部移除，less 变量不再支持透出。
  - 产物中不再包含 css 文件。由于 CSS-in-JS 支持按需引入，原本的 `antd/dist/antd.css` 也已经移除，如果需要重置一些基本样式请引入 `antd/dist/reset.css`。
  - 如果需要组件重置样式，又不想引入 `antd/dist/reset.css` 从而导致污染全局样式的话，可以尝试在应用最外层使用[App 组件](/components/app-cn)，解决原生元素没有 antd 规范样式的问题。
- 移除 css variables 以及在此之上构筑的动态主题方案。
- LocaleProvider 在 4.x 中已经废弃（使用 `<ConfigProvider locale />` 替代），我们在 5.x 里彻底移除了相关目录 `antd/es/locale-provider`、`antd/lib/locale-provider`。
- 内置的时间库使用 Dayjs 替代 Moment.js，具体请查看 [使用自定义日期库](/docs/react/use-custom-date-library-cn/)。
- 不再支持 `babel-plugin-import`，CSS-in-JS 本身具有按需加载的能力，不再需要插件支持。

### 兼容性调整

- 不再支持 IE 浏览器。

#### 组件 API 调整

- 组件弹框的 classname API 统一为 `popupClassName`，`dropdownClassName` 等类似 API 都会被替换。

  - AutoComplete 组件
  - Cascader 组件
  - Select 组件
  - TreeSelect 组件
  - TimePicker 组件
  - DatePicker 组件
  - Mentions 组件

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

- 组件弹框的受控可见 API 统一为 `open`，`visible` 等类似 API 都会被替换。

  - Drawer 组件 `visible` 变为 `open`。
  - Modal 组件 `visible` 变为 `open`。
  - Dropdown 组件 `visible` 变为 `open`。
  - Tooltip 组件 `visible` 变为 `open`。
  - Tag 组件 `visible` 已移除。
  - Slider 组件 `tooltip` 相关 API 收敛到 `tooltip` 属性中。
  - Table 组件 `filterDropdownVisible` 变为 `filterDropdownOpen`。

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

- `getPopupContainer`: 所有的 `getPopupContainer` 都需要保证返回的是唯一的 div。React 18 concurrent 下会反复调用该方法。
- Upload List dom 结构变化。[#34528](https://github.com/ant-design/ant-design/pull/34528)
- Notification
  - 静态方法不再允许在 `open` 中动态设置 `prefixCls` `maxCount` `top` `bottom` `getContainer`，Notification 静态方法现在将只有一个实例。如果需要不同配置，请使用 `useNotification`。
  - `close` 改名为 `destroy`，和 message 保持一致。
- Drawer `style` 和 `className` 迁移至 Drawer 弹层区域上，原属性替换为 `rootClassName` 和 `rootStyle`。
- 4.x 中已经废弃的 `message.warn` 现在被彻底移除，请使用 `message.warning` 代替。

#### 组件重构与移除

- 移除 `locale-provider` 目录。`LocaleProvider` 在 v4 中已移除，请使用 `ConfigProvider` 替代。
- 移除 Comment 组件，移至 `@ant-design/compatible` 中维护。
- 移除 PageHeader 组件，移至 `@ant-design/pro-components` 中维护。

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

- BackTop 组件在 `5.0.0` 中废弃，移至 FloatButton 悬浮按钮中。如需使用，可以从 FloatButton 中引入。

  ```diff
  - import { BackTop } from 'antd';
  + import { FloatButton } from 'antd';

    const App: React.FC = () => (
      <>
  -     <BackTop />
  +     <FloatButton.BackTop />
      </>
    );

    export default App;
  ```

## 开始升级

通过 git 保存你的代码，然后按照上述文档进行依赖安装：

```bash
npm install --save antd@5.x
```

如果你需要使用 v4 废弃组件如 `Comment`、`PageHeader`，请安装 `@ant-design/compatible` 与 `@ant-design/pro-layout` 做兼容：

```bash
npm install --save @ant-design/compatible@v5-compatible-v4
npm install --save @ant-design/pro-layout
```

你可以手动对照上面的列表逐条检查代码进行修改，另外，我们也提供了一个 codemod cli 工具 [@ant-design/codemod-v5](https://github.com/ant-design/codemod-v5) 以帮助你快速升级到 v5 版本。

在运行 codemod cli 前，请先提交你的本地代码修改。

```shell
# 使用 npx 直接运行
npx -p @ant-design/codemod-v5 antd5-codemod src

# 或者使用 pnpm 直接运行
pnpm --package=@ant-design/codemod-v5 dlx antd5-codemod src
```

<video autoplay="" loop="" style="width: 100%; max-height: 600px; object-fit: contain;">
  <source src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/file/A*Sjy5ToW6ow0AAAAAAAAAAAAADrJ8AQ" type="video/webm">
  <source src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/file/A*hTDYQJ2HFTYAAAAAAAAAAAAADrJ8AQ" type="video/mp4">
</video>

> 注意 codemod 不能涵盖所有场景，建议还是要按不兼容的变化逐条排查。

### less 迁移

如果你使用到了 antd 的 less 变量，通过兼容包将 v5 变量转译成 v4 版本，并通过 less-loader 注入：

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

同时移除对 antd less 文件的直接引用：

```diff
// Your less file
--  @import (reference) '~antd/es/style/themes/index';
or
--  @import '~antd/es/style/some-other-less-file-ref';
```

### 移除 babel-plugin-import

从 package.json 中移除 `babel-plugin-import`，并从 `.babelrc` 移除该插件：

```diff
"plugins": [
- ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
]
```

Umi 用户可以在配置文件中关闭：

```diff
// config/config.ts or .umirc
export default {
  antd: {
-   import: true,
+   import: false,
  },
};
```

### 替换 Day.js 语言包

将 moment.js 的 locale 替换为 day.js 的 locale 引入：

```diff
-   import moment from 'moment';
+   import dayjs from 'dayjs';
-   import 'moment/locale/zh-cn';
+   import 'dayjs/locale/zh-cn';

-   moment.locale('zh-cn');
+   dayjs.locale('zh-cn');
```

如果你暂时不想替换 day.js，也可以使用 `@ant-design/moment-webpack-plugin` 插件将 day.js 替换回 moment.js：

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

### 旧版浏览器兼容

Ant Design v5 使用 `:where` css selector 降低 CSS-in-JS hash 值优先级，如果你需要支持旧版本浏览器（如 IE 11、360 浏览器 等等）。可以通过 `@ant-design/cssinjs` 的 `StyleProvider` 去除降权操作。详情请参阅 [兼容性调整](/docs/react/customize-theme-cn#兼容性调整)。

## 遇到问题

如果您在升级过程中遇到了问题，请到 [GitHub issues](https://new-issue.ant.design/) 进行反馈。我们会尽快响应和相应改进这篇文档。
