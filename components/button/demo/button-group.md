# 按钮组合

- order: 6

将一系列的 `.ant-btn` 放入 `.ant-btn-group` 的容器中。

按钮组合尺寸

只要给 `.ant-btn-group` 加上 `.ant-btn-group-*` 类，即可设置不同的尺寸，目前支持大中小三种尺寸。

---

````html
<h4>基本组合</h4>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-primary">确 定</button>
  <button class="ant-btn ant-btn-primary">取 消</button>
</div>
<div class="ant-btn-group">
  <button class="ant-btn">左</button>
  <button class="ant-btn">中</button>
  <button class="ant-btn">右</button>
</div>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-primary">左</button>
  <button class="ant-btn ant-btn-ghost">中</button>
  <button class="ant-btn ant-btn-ghost">中</button>
  <button class="ant-btn">右</button>
</div>
<h4>带图标按钮组合 </h4>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-primary">
  <span class="anticon anticon-left"></span>
  <span>后 退</span>
  </button>
  <button class="ant-btn ant-btn-primary">
  <span>前 进</span>
  <span class="anticon anticon-right"></span>
  </button>
</div>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-primary">
  <span class="anticon anticon-cloud"></span>
  </button>
  <button class="ant-btn ant-btn-primary">
  <span class="anticon anticon-cloud-download"></span>
  </button>
</div>
<h4>多个组合</h4>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-ghost">1</button>
  <button class="ant-btn ant-btn-ghost">2</button>
  <button class="ant-btn ant-btn-ghost">3</button>
  <button class="ant-btn ant-btn-ghost">4</button>
  <button class="ant-btn ant-btn-ghost">
  <span>前 进</span>
  <span class="anticon anticon-right"></span>
  </button>
</div>
<h4>尺寸</h4>
<div class="ant-btn-group ant-btn-group-lg">
  <button class="ant-btn ant-btn-ghost">大</button>
  <button class="ant-btn ant-btn-ghost">大</button>
  <button class="ant-btn ant-btn-ghost">大</button>
</div>
<div class="ant-btn-group">
  <button class="ant-btn ant-btn-ghost">默 认</button>
  <button class="ant-btn ant-btn-ghost">默 认</button>
  <button class="ant-btn ant-btn-ghost">默 认</button>
</div>
<div class="ant-btn-group ant-btn-group-sm">
  <button class="ant-btn ant-btn-ghost">小</button>
  <button class="ant-btn ant-btn-ghost">小</button>
  <button class="ant-btn ant-btn-ghost">小</button>
</div>
````

<style>
.nico-insert-code h4 {
  margin: 8px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: normal;
}
.nico-insert-code h4:first-child {
  margin-top: 0;
}
.nico-insert-code .ant-btn {
  margin-bottom: 8px;
}
</style>
