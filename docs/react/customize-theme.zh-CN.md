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

定义 `theme` 属性时，需要配合使用（[antd-init](https://github.com/ant-design/antd-init) 或 [dva-cli](https://github.com/dvajs/dva-cli)。如果你使用的是其他脚手架，可以参考 [atool-build 中 less-loader 的 webpack 相关配置 ](https://github.com/ant-tool/atool-build/blob/a4b3e3eec4ffc09b0e2352d7f9d279c4c28fdb99/src/getWebpackCommonConfig.js#L131-L138)，利用 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 配置来覆盖原来的样式变量。

注意：

- 样式必须加载 less 格式。
  - 如果你在使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的 `style` 配置来引入样式，需要将配置值从 `'css'` 改为 `true`，这样会引入 less 文件。
  - 如果你是通过 `'antd/dist/antd.css'` 引入样式的，改为 `antd/dist/antd.less`。
- `dva-cli@0.7.0+` 的 `theme` 属性需要写在 [.roadhogrc](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31) 文件里。
- 如果要覆盖 `@icon-url` 变量，内容需要包括引号 `"@icon-url": "'your-icon-font-path'"`（[修正示例](https://github.com/visvadw/dvajs-user-dashboard/pull/2)）。

#### 单独 webpack 中配置 theme

1.  [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的 `style` 配置来引入样式，需要将配置值从 `'css'` 改为 `true`，这样会引入 less 文件

2. `package.json` 中配置 `theme` 字段，直接配置为对象：

   ```js
   "theme": {
     "primary-color": "#1DA57A",
   },
   ```

   或者配置为[一个 js 文件](https://github.com/ant-design/antd-init/blob/master/examples/customize-antd-theme/theme.js)：

   ```js
   "theme": "./theme.js",
   ```

   > 关于`primary-color`  还是 `@primary-color` 写法，两种都支持

3. `webpack.dev.config.js` 中读取 `theme` 的配置信息：

   ```
   const fs = require('fs')
   const pkgPath = path.resolve(__dirname, './package.json')
   const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
   let theme = {}
   if (pkg.theme && typeof pkg.theme === 'string') {
     let cfgPath = pkg.theme
     if (cfgPath.charAt(0) === '.') {
       cfgPath = path.resolve(__dirname, cfgPath)
     }
     const getThemeConfig = require(cfgPath)
     theme = getThemeConfig()
   } else if (pkg.theme && typeof pkg.theme === 'object') {
     theme = pkg.theme
   }
   ```

   根据配置文件的格式，上面的theme已经是个对象了，下面webpack，loader中可以直接使用

4.  `webpack.dev.config.json` 中关于less 处理的相关 loader 写法：

   ```
   module: {
     rules: [
       {  // 处理自己的less 文件，如果没用less组件可以删除掉
         test: /\.less$/, 
         exclude: path.resolve(__dirname, 'node_modules'),  
         use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: [
             { loader: 'css-loader' },
             {
               loader: 'less-loader',
             },
           ],
         }),
       },
       {
         test: /.less$/,
         include: path.resolve(__dirname, 'node_modules/antd'),  // 处理antd 组件的 less 必须有
         use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: [
             {
               loader: 'css-loader',
             },
             {
               loader: 'less-loader',
               options: {
                 sourceMap: true,
                 modules: false,
                 modifyVars: theme,
               },
             },
           ],
         }),
       },
     ],
   }
   ```

   以上使用的是 `webpack v 3.0` 的写法，可以根据不同版本调整 loader的写法

### 2) less

用 less 文件进行变量覆盖。

建立一个单独的 `less` 文件如下，再引入这个文件。

   ```css
   @import "~antd/dist/antd.less";   // 引入官方提供的 less 样式入口文件
   @import "your-theme-file.less";   // 用于覆盖上面定义的变量
   ```

注意：这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 `babel-plugin-import` 的 `style` 属性一起使用。

## 社区教程

- [How to Customize Ant Design with React & Webpack… the Missing Guide](https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f)
