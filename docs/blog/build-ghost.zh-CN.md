---
title: 一个构建的幽灵
date: 2023-12-20
author: zombieJ
juejin_url: https://juejin.cn/post/7322352551088341019
---

在 antd-mobile 的维护过程中，遇到了一个恼人的幽灵。它在本地构建时几乎不会出现，但是在 github 的 workflow 中，却几乎每次都会出现。在经过一番折腾后，终于找到了它的踪迹。

### CI 又挂了

在 antd-mobile 的 CI 中，有一个任务会对构建产物进行检查，会对文件大小变化进行提示。但是这个任务在最近几个月中，经常会出现构建失败的情况，如下图所示：

![CI failed](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XSAESJ3_HWgAAAAAAAAAAAAADrJ8AQ/original)

查看日志，会得到 CSS 文件报错的信息：

![Unknown word](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*2ybATYq9l2oAAAAAAAAAAAAADrJ8AQ/original)

从构建流程看，似乎是在 2x 构建时报错（antd-mobile 会额外打一份 2x 的样式以适配高清屏）：

```log
[09:44:16] Using gulpfile ~/work/ant-design-mobile/ant-design-mobile/gulpfile.js
[09:44:16] Starting 'default'...
[09:44:16] Starting 'clean'...
[09:44:17] Finished 'clean' after 286 ms
[09:44:17] Starting 'buildES'...
[09:44:26] Finished 'buildES' after 8.77 s
[09:44:26] Starting 'buildCJS'...
[09:44:27] Finished 'buildCJS' after 1.72 s
[09:44:27] Starting 'buildDeclaration'...
[09:44:27] Starting 'buildStyle'...
[09:44:28] Finished 'buildStyle' after 682 ms
[09:44:34] Finished 'buildDeclaration' after 6.5 s
[09:44:34] Starting 'copyAssets'...
[09:44:34] Finished 'copyAssets' after 2.37 ms
[09:44:34] Starting 'copyMetaFiles'...
[09:44:34] Finished 'copyMetaFiles' after 4.64 ms
[09:44:34] Starting 'generatePackageJSON'...
[09:44:34] Finished 'generatePackageJSON' after 2.72 ms
[09:44:34] Starting 'buildBundles'...
[09:44:45] Finished 'buildBundles' after 11 s
[09:44:45] Starting 'init2xFolder'...
[09:44:46] Finished 'init2xFolder' after 811 ms
[09:44:46] Starting 'build2xCSS'...
[09:44:46] 'build2xCSS' errored after 126 ms
[09:44:46] CssSyntaxError in plugin "gulp-postcss"
```

而 `build2xCSS` 的 `style.css` 来源于 `buildStyle` 的产物，所以可以确定是 `buildStyle` 任务中出现了问题。在查看对应的文件 `/lib/bundle/style.css` 后，发现了如下的内容：

![Break Lines](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5NqFR6_nkhwAAAAAAAAAAAAADrJ8AQ/original)

`style.css` 第一行为压缩的样式，而后是不完整的未压缩的样式。对比成功的产物会发现第二行往后的样式是非预期的内容：

![Success Style](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xnDRT5SDVvMAAAAAAAAAAAAADrJ8AQ/original)

而根据未压缩的内容进行查询，会发现这些内容在之前的压缩内容中已经存在了：

![Duplicated Content](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wShGRJ16U1AAAAAAAAAAAAAADrJ8AQ/original)

因而猜测可能是构建时，先生成了未压缩的内容，然后又进行了压缩操作。但是又存在异步问题，第二个任务在第一个未完成时就开始执行了，导致了内容的重复。更诡异的是，如果是异步问题，CI 上生成的错误文件内容却出奇的一致。无论构建多少次，只要是失败的就必定是相同的内容。

### 并发问题

在查看了 `gulpfile.js` 文件后，发现 `buildStyle` 使用的是 vite 构建。考虑到可能是构建版本的问题，所以将 vite 的版本从 `3.x` 升级到了 `5.x`，但是问题依旧存在。于是又看了一下相关配置：

```tsx
{
    root: process.cwd(),
    mode: env,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': `"${env}"` },
    build: {
      cssTarget: 'chrome61',
      lib: {
        formats,
        ...
      },
      rollupOptions: {
       output: {
          dir: './lib/bundle',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      minify: isProd ? 'esbuild' : false,
    },
  }
```

通过关闭 `logLevel: 'silent'` 配置后再次构建，我们可以看到更多的日志内容：

![Bundle Result](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*efjVR4DG_ysAAAAAAAAAAAAADrJ8AQ/original)

看来接近答案了，antd-mobile 在构建时会通过 `lib.formats` 创建 `es`、`cjs`、`umd` 三份副本。而每个 `format` 都会生成一次 `style.css` 文件。如果仅是不断覆盖文件，那应该只是额外的浪费了构建资源而已，最后总是会被压缩的 `style.css` 覆盖掉，不应该出现同时覆盖的问题。于是去看了一下调用 vite 构建的部分：

```tsx
async function buildBundles(cb) {
  const envs = ['development', 'production'];
  const configs = envs.map((env) =>
    getViteConfigForPackage({
      env,
      formats: ['es', 'cjs', 'umd'],
      external: ['react', 'react-dom'],
    }),
  );

  await Promise.all(configs.map((config) => vite.build(config)));
  cb && cb();
}
```

原来是使用了 `Promise.all` 来并发构建，而 vite 的构建是异步的。这使得 `style.css` 存在竞争问题。vite 调用的 rollup 会对文件进行清除，然后进行写操作。由于压缩样式需要进行 uglify，所以它总是慢于非压缩版本。当 rollup 都执行完清理操作开始写文件后，非压缩版本虽然前面一部分由于清理被删除但是后续内容仍然继续被写入，而压缩版本则从头开始写入。当两者都写入完毕后，就会出现错误并且内容却在每次 CI 构建下都一致的情况。修复也很简单，直接改成顺序执行即可：

```tsx
for (const config of configs) {
  await vite.build(config);
}
```

（当然，后续还需要对脚本进行优化。使其跳过非必要的 `style.css` 样式生成）

### 以上

随着 github CI 的性能变化，原本很难遇到的幽灵反而变得可以稳定重现，颇为有趣。从而也使得我们有机会可以定位到问题之所在。
