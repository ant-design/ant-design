---
order: 4
title: Customize theme
---

Ant Design allow to customize some basic design tokens for meeting the needs of UI diversity from bussiness and brand, including primary color, border radius, border and etc.

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less variables

We are using [Less](http://lesscss.org/) as development language of style. A series of less variables are defined for each design tokens which can be customized as your needs.

- [Default Variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

Please report issue if the variables is not enough for you.

## How to use it

We recommand [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) to override the default variables. There are two way to achieve it in practive.

You can run this [example](https://github.com/ant-design/antd-init/tree/master/examples/customize-antd-theme) for playground.

### 1) package.theme (recommanded)

Specify the `theme` field in 'package.json', which could be a object or file path.

```js
"theme": {
  "@primary-color": "#1DA57A",
},
```

or:

```js
"theme": "./theme.js",  // https://github.com/ant-design/antd-init/blob/master/examples/customize-antd-theme/theme.js
```

This way is working only when using [atool-build](https://github.com/ant-tool/atool-build)(built in [antd-init](https://github.com/ant-design/antd-init) and [dva-cli](https://github.com/dvajs/dva-cli)). If you choose other boilerplates, you can write webpack config about [less-loader modifyVars](https://github.com/webpack/less-loader#less-options) like [atool-build ](https://github.com/ant-tool/atool-build/blob/a4b3e3eec4ffc09b0e2352d7f9d279c4c28fdb99/src/getWebpackCommonConfig.js#L131-L138) does.

Note: importing less style is necessary. Please specify `style` option of `babel-plugin-import` to be `true` or `less` if you are using it.

### 2) less

Override variables via less definition files.

Create a standalone less file like below, and import it in your project.

   ```css
   @import "~antd/dist/antd.less";   // import official less entry file
   @import "your-theme-file.less";   // override variables here
   ```

Note: this way will load style of all component regardless of your demand, which cause `style` option of `babel-plugin-import` not working.
