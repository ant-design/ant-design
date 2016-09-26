---
category:
  zh-CN: 设计基础
  en-US: Design Fundamental
order: 0
title:
  zh-CN: 字体
  en-US: Font
---

跨平台的字体设定，力求在各个操作系统下都有最佳展示效果。

---

## 字体家族

- 中文字体族：

   <img src="https://os.alipayobjects.com/rmsportal/OKbesWXtRMCNGmO.png" width="100%">

- 英文文字体族：

   <img src="https://t.alipayobjects.com/images/T1bcXhXfNeXXXXXXXX.png" width="100%">

字体家族 css 代码如下：

```css
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
```

## 字体使用规范

<div class="ant-row">
  <div class="ant-col ant-col-12">
    <div class="font-type">
      <div class="font-title">主标题</div>
      <h1>
        <span>我是标题</span>
        <span>加粗</span>
        <span>#666</span>
        <span>16px</span>
      </h1>
    </div>
    <div class="font-type">
      <div class="font-title">次级标题</div>
      <h2>
        <span>我是标题</span>
        <span>加粗</span>
        <span>#666</span>
        <span>14px</span>
      </h2>
    </div>
    <div class="font-type">
      <div class="font-title">小标题</div>
      <h3>
        <span>我是标题</span>
        <span>加粗</span>
        <span>#666</span>
        <span>12px</span>
      </h3>
    </div>
    <div class="font-type text">
      <div class="font-title">正文</div>
      <p class="font-text">
        <span>我是正文</span>
        <span>#666</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type help-text">
      <div class="font-title">辅助文字</div>
      <p class="font-text">
        <span>我是辅助文字</span>
        <span>#999</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type disabled-text">
      <div class="font-title">失效文字</div>
      <p class="font-text">
        <span>我是失效文字</span>
        <span>#ccc</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type link-text">
      <div class="font-title">链接文字</div>
      <p class="font-text">
        <a href="#">
          <span>我是链接文字</span>
          <span>#2db7f5</span>
          <span>12px</span>
        </a>
      </p>
    </div>
  </div>
  <div class="ant-col ant-col-12">
    <div class="font-type">
      <div class="font-title">Main Head</div>
      <h1>
        <span>I am example text</span>
        <span>bold</span>
        <span>#666</span>
        <span>16px</span>
      </h1>
    </div>
    <div class="font-type">
      <div class="font-title">Sub Head</div>
      <h2>
        <span>I am example text</span>
        <span>bold</span>
        <span>#666</span>
        <span>14px</span>
      </h2>
    </div>
    <div class="font-type">
      <div class="font-title">Small Head</div>
      <h3>
        <span>I am example text</span>
        <span>bold</span>
        <span>#666</span>
        <span>12px</span>
      </h3>
    </div>
    <div class="font-type text">
      <div class="font-title">Text</div>
      <p class="font-text">
        <span>I am example text</span>
        <span>#666</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type help-text">
      <div class="font-title">Help Text</div>
      <p class="font-text">
        <span>I am example text</span>
        <span>#999</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type disabled-text">
      <div class="font-title">Disabled Text</div>
      <p class="font-text">
        <span>I am example text</span>
        <span>#ccc</span>
        <span>12px</span>
      </p>
    </div>
    <div class="font-type link-text">
      <div class="font-title">Link Text</div>
      <p class="font-text">
        <a href="#">
          <span>I am example text</span>
          <span>#2db7f5</span>
          <span>12px</span>
        </a>
      </p>
    </div>
  </div>
</div>

<style>
.font-type {
  margin: 20px 0;
  overflow: hidden;
  font-size: 12px;
}
.font-type h1,
.font-type h2,
.font-type h3,
.font-type p {
  margin: 0;
  color: #666;
}
.font-type > * {
  display: inline-block;
}
.font-title {
  font-size: 14px;
  width: 100px;
}
.font-type h1,
.font-type h2,
.font-type h3,
.font-type .font-text {
  width: 300px;
}
.font-type h1 span,
.font-type h2 span,
.font-type h3 span,
.font-type .font-text span {
  margin-right: 0.6em;
}
.font-type h1 {
  font-size: 16px;
}
.font-type h2 {
  font-size: 14px;
}
.font-type h3 {
  font-size: 12px;
}
.disabled-text .font-text {
  color: #ccc;
}
.help-text .font-text {
  color: #999;
}
</style>
