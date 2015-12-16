# 安装

- category: 2
- order: 2

---

## 使用 npm 安装

**我们推荐使用 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

可以通过 npm 直接安装到项目中，使用 `import` 或 `require` 进行引用。

稳定版 <span class="versions" id="stable-version"></span>：

[![npm package](http://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd --save
```

安装最新的开发版本 <span class="versions" id="latest-version"></span>：

[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd@beta --save
```

> **历史版本**：https://github.com/ant-design/ant-design/releases


## 开发工具

我们提供了 React 前端应用开发的 [脚手架工具](https://github.com/ant-design/antd-init)，可以安装到全局直接使用。

```bash
$ npm install antd-init -g
```

在空目录运行 `antd-init` 可以初始化一个 antd 的前端应用。

> 更多 [使用方式](https://github.com/ant-tool/xtool/)。

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

if (antdVersion.stable) {
  $('#stable-version').html(antdVersion.stable);
} else {
  $('#stable-version').html('暂无');
}
</script>
