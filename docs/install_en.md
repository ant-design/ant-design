## Using npm to install

**We recommend use npm to install**，Not only it makes development easier，also you can take advantage of the whole ecosystem.


If using npm to install, you could use `import` or `require`.

Stable version <span class="versions" id="stable-version"></span>：

[![npm package](http://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd --save
```

Beta version <span class="versions" id="latest-version"></span>：

[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd@beta --save
```

> **Past releases**：https://github.com/ant-design/ant-design/releases


## Development tool 

We provide React components [Scaffold tool](https://github.com/ant-design/antd-init).

```bash
$ npm install antd-init -g
```

Inside an empty folder run `antd-init` to init.

> [More tools](https://github.com/ant-tool/xtool/)。

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
  $('#stable-version').html('not available');
}
</script>
