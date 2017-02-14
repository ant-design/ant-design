---
order: 5
title: 定制主题
---

Ant Design 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## 样式变量

antd 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

- [默认样式变量](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

如果以上变量不能满足你的定制需求，可以给我们提 issue。

## 定制方式

我们使用 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式来覆盖变量。
在具体工程实践中，有 `package.theme` 和 `less` 两种方案，选择一种即可。

可以在本地运行 [例子](https://github.com/ant-design/antd-init/tree/master/examples/customize-antd-theme) 查看定制效果。

### 1) theme 属性（推荐）

配置在 `package.json` 或 `.roadhogrc` 下的 `theme` 字段。theme 可以为配置为一个对象或文件路径。

```js
"theme": {
  "primary-color": "#1DA57A",
},
```

或者 [一个 js 文件](https://github.com/ant-design/antd-init/blob/master/examples/customize-antd-theme/theme.js)：

```js
"theme": "./theme.js",
```

定义 `theme` 属性时， 需要配合 [atool-build](https://github.com/ant-tool/atool-build) 使用（[antd-init](https://github.com/ant-design/antd-init) 和 [dva-cli](https://github.com/dvajs/dva-cli) 内建支持）。如果你使用的是其他脚手架，可以参考 [atool-build 中 less-loader 的 webpack 相关配置 ](https://github.com/ant-tool/atool-build/blob/a4b3e3eec4ffc09b0e2352d7f9d279c4c28fdb99/src/getWebpackCommonConfig.js#L131-L138)，利用 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 配置来覆盖原来的样式变量。

注意：

- 样式必须加载 less 格式。如果您使用了 `babel-plugin-import`，请将 style 属性配置为 `true`。
- `dva-cli@0.7.0+` 的 `theme` 属性需要写在 [.roadhogrc](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31) 文件里。
- 如果要覆盖 `@icon-url` 变量，内容需要包括引号 `"@icon-url": "'your-icon-font-path'"`（[修正示例](https://github.com/visvadw/dvajs-user-dashboard/pull/2)）。

### 2) less

用 less 文件进行变量覆盖。

建立一个单独的 `less` 文件如下，再引入这个文件。

   ```css
   @import "~antd/dist/antd.less";   // 引入官方提供的 less 样式入口文件
   @import "your-theme-file.less";   // 用于覆盖上面定义的变量
   ```

注意：这种方式会载入所有组件的样式，无法和按需加载插件 `babel-plugin-import` 的 `style` 属性一起使用。
