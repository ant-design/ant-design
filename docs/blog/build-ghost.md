---
title: A build ghost
date: 2023-12-20
author: zombieJ
juejin_url: https://juejin.cn/post/7322352551088341019
---

In the maintenance of antd-mobile, We meet an annoying ghost. It rarely appears when building locally, but it almost always appears in the github workflow. After a lot of tossing, We finally found its trace.

### CI Failed...again

For antd-mobile's CI, there is a task to check the build artifacts, which will prompt the file size changes. But in recent months, this task often fails to build, as shown in the following figure:

![CI failed](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XSAESJ3_HWgAAAAAAAAAAAAADrJ8AQ/original)

Check the log, we will get the error message of CSS file:

![Unknown word](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*2ybATYq9l2oAAAAAAAAAAAAADrJ8AQ/original)

It seems that the error occurred when building 2x style (antd-mobile will generate 2x style for high-definition screen):

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

The `style.css` of `build2xCSS` comes from the artifact of `buildStyle`, so it can be determined that there is a problem in the `buildStyle` task. After checking the corresponding file `/lib/bundle/style.css`, we found the following content:

![Break Lines](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5NqFR6_nkhwAAAAAAAAAAAAADrJ8AQ/original)

The first line of `style.css` is the compressed style, and then the incomplete uncompressed style. Compared with the successful artifact, it will be found that the style after the second line is unexpected:

![Success Style](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xnDRT5SDVvMAAAAAAAAAAAAADrJ8AQ/original)

Check the uncompressed content, we will find that these contents already exist in the previous compressed content:

![Duplicated Content](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wShGRJ16U1AAAAAAAAAAAAAADrJ8AQ/original)

It is speculated that the uncompressed content was generated first during the build, and then the compressed operation was performed. But there is an asynchronous problem, the second task started to execute before the first task was completed, resulting in the duplication of content. What's even more bizarre is that if it is an asynchronous problem, the error file content generated on CI is surprisingly consistent. No matter how many times it is built, as long as it fails, it must be the same content.

### Concurrent problem

Check the `gulpfile.js` file, we found that `buildStyle` uses vite to build. Considering that it may be a problem with the build version, so we upgraded vite from `3.x` to `5.x`, but the problem still exists. So check the relevant configuration:

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

Though closing the `logLevel: 'silent'` configuration, we can see more log content after rebuilding:

![Bundle Result](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*efjVR4DG_ysAAAAAAAAAAAAADrJ8AQ/original)

We are close. When building, antd-mobile will create three copies of `es`, `cjs`, and `umd` through `lib.formats`. And each `format` will generate a `style.css` file. If it is just to overwrite the file, it should only waste extra build resources, and the compressed `style.css` will always be overwritten, and there should be no problem of simultaneous overwriting. Let's check the part that calls vite to build:

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

That's it. `Promise.all` is used to build concurrently, and vite's build is asynchronous. This causes a competition problem for `style.css`. The rollup called by vite will clean up the files and then perform write operations. Since the compressed style needs to be uglified, it is always slower than the uncompressed version. When rollup has finished cleaning and starts writing files, although the first part of the uncompressed version is deleted due to cleaning, the subsequent content is still written, while the compressed version starts writing from the beginning. When both are written, an error will occur and the content will be consistent under each CI build. The fix is also very simple, just change it to sequential execution:

```tsx
for (const config of configs) {
  await vite.build(config);
}
```

(Of course, subsequent optimizations are also needed for the script. Skip the unnecessary `style.css` generation)

### That's all

With the performance changes of github CI, the ghost that was originally difficult to encounter has become stable and reproducible, which is quite interesting. This also gives us the opportunity to locate the problem.
