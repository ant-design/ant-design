# 按钮组合

- order: 6

将一系列的 `.ant-btn` 放入 `.ant-btn-group` 的容器中。

按钮组合尺寸

只要给 `.ant-btn-group` 加上 `.ant-btn-group-*` 类，即可设置不同的尺寸，目前支持大中小三种尺寸。

---

````jsx
var Icon = antd.Icon;

React.render(
<div className="nico-insert-code">
  <h4>基本组合</h4>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-primary">确 定</button>
    <button className="ant-btn ant-btn-primary">取 消</button>
  </div>
  <div className="ant-btn-group">
    <button className="ant-btn">左</button>
    <button className="ant-btn">中</button>
    <button className="ant-btn">右</button>
  </div>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-primary">左</button>
    <button className="ant-btn ant-btn-ghost">中</button>
    <button className="ant-btn ant-btn-ghost">中</button>
    <button className="ant-btn">右</button>
  </div>
  <h4>带图标按钮组合 </h4>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-primary">
    <Icon type="left" />
    <span>后 退</span>
    </button>
    <button className="ant-btn ant-btn-primary">
    <span>前 进</span>
    <Icon type="right" />
    </button>
  </div>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-primary">
    <Icon type="cloud" />
    </button>
    <button className="ant-btn ant-btn-primary">
    <Icon type="cloud-download" />
    </button>
  </div>
  <h4>多个组合</h4>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-ghost">1</button>
    <button className="ant-btn ant-btn-ghost">2</button>
    <button className="ant-btn ant-btn-ghost">3</button>
    <button className="ant-btn ant-btn-ghost">4</button>
    <button className="ant-btn ant-btn-ghost">
    <span>前 进</span>
    <Icon type="right" />
    </button>
  </div>
  <h4>尺寸</h4>
  <div className="ant-btn-group ant-btn-group-lg">
    <button className="ant-btn ant-btn-ghost">大</button>
    <button className="ant-btn ant-btn-ghost">大</button>
    <button className="ant-btn ant-btn-ghost">大</button>
  </div>
  <div className="ant-btn-group">
    <button className="ant-btn ant-btn-ghost">默 认</button>
    <button className="ant-btn ant-btn-ghost">默 认</button>
    <button className="ant-btn ant-btn-ghost">默 认</button>
  </div>
  <div className="ant-btn-group ant-btn-group-sm">
    <button className="ant-btn ant-btn-ghost">小</button>
    <button className="ant-btn ant-btn-ghost">小</button>
    <button className="ant-btn ant-btn-ghost">小</button>
  </div>
</div>
, document.getElementById('components-button-demo-button-group'));
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
.nico-insert-code .ant-btn-group {
  margin-right: 5px;
}
</style>
