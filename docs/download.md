# 下载

- category: 入门
- order: 2

---

## 直接下载

- **开发版** <span class="versions" id="latest-version">1.0.2</span>

  <ul id="latest-links">
    <li>
      <a href="http://ant.design/dist/antd.js">antd.js</a>
    </li>
    <li>
      <a href="http://ant.design/dist/antd.css">antd.css</a>
    </li>
  </ul>

- **稳定版** <span class="versions" id="stable-version">1.0.0</span>

  <ul id="stable-links">
    <li>
      <a href="http://ant.design/dist/antd.js">antd.js</a>
    </li>
    <li>
      <a href="http://ant.design/dist/antd.js">antd.css</a>
    </li>
  </ul>

- **历史版本**：https://github.com/ant-design/ant-design/releases

## npm

可以通过 npm 直接安装到本地，使用 `require` 或 `import` 进行引用。

```bash
$ npm install antd --save
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
  $('#stable-links a').each(function(i, item) {
    $(item).attr('href', $(item).attr('href').replace('dist/antd', 'dist/antd-' + antdVersion.stable));
  });
} else {
  $('#stable-version').html('暂无');
  $('#stable-links').hide();
}
</script>
