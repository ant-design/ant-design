# 下载

- category: 入门
- order: 2

---

可以直接下载文件或使用 npm 进行安装。

## 直接下载

- **开发版** <span class="versions" id="latest-version"></span>

  <ul id="latest-links">
    <li>
      <a href="http://ant.design/dist/antd.js">antd.js</a>
    </li>
    <li>
      <a href="http://ant.design/dist/antd.css">antd.css</a>
    </li>
  </ul>

- **稳定版** <span class="versions" id="stable-version"></span>

  <a id="stable-link" href="" target="_blank">下载</a>

- **历史版本**：https://github.com/ant-design/ant-design/releases

## npm

**我们推荐使用 npm 的方式进行开发**，这样可以享受整个生态圈和工具链带来的诸多好处。

[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

可以通过 npm 直接安装到本地，使用 `require` 或 `import` 进行引用。

```bash
$ npm install antd --save
```

## 开发工具

Ant Design 提供了开发构建的命令行工具，可以安装到全局直接使用：

```bash
$ npm install antd-bin -g
```

或者安装到仓库下，使用 `package.json` 的 `scripts` 字段来配置命令：

```bash
$ npm install antd-bin --save-dev
```

```json
"scripts": {
  "dev": "antd server",
  "build": "antd build"
}
```

<style>
.versions {
  font-weight: bold;
  color: #C05B4D;
  font-family: Consolas;
  margin-left: 0.3em;
  background: #FFF1E7;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>

<script>
$('#latest-version').html(antdVersion.latest);
$('#latest-links a').each(function(i, item) {
  $(item).attr('href', $(item).attr('href').replace('dist/antd', 'dist/antd-' + antdVersion.latest));
});

if (antdVersion.stable) {
  $('#stable-version').html(antdVersion.stable);
  $('#stable-link').attr('href', 'https://github.com/ant-design/ant-design/releases/tag/' + antdVersion.stable);
} else {
  $('#stable-version').html('暂无');
  $('#stable-link').hide();
}
</script>
