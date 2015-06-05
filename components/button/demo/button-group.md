# Groups Button

- order: 7

按钮组合， 将一些列的 `.ant-btn` 放入 `.ant-btn-group` 的容器中

按钮尺寸： 只要给 `.ant-btn-group` 加上 `.ant-btn-group-*` 类，即可设置不同的尺寸，目前支持大中小三种尺寸。

---

````html
<div>
    <p> 基本组合 </p>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-primary">确 定</button>
      <button class="ant-btn ant-btn-primary">取 消</button>
    </div>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-default">左</button>
      <button class="ant-btn ant-btn-default">中</button>
      <button class="ant-btn ant-btn-default">右</button>
    </div>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-primary">左</button>
      <button class="ant-btn ant-btn-ghost">中</button>
      <button class="ant-btn ant-btn-ghost">中</button>
      <button class="ant-btn ant-btn-default">右</button>
    </div>
    <p> 带图标按钮组合 </p>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-primary">
      <span class="anticon anticon-caret-left"></span>
      <span>前 进</span>
      </button>
      <button class="ant-btn ant-btn-primary">
      <span>后 退</span>
      <span class="anticon anticon-caret-right"></span>
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
    <p>多个组合</p>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-ghost">1</button>
      <button class="ant-btn ant-btn-ghost">2</button>
      <button class="ant-btn ant-btn-ghost">3</button>
      <button class="ant-btn ant-btn-ghost">4</button>
      <button class="ant-btn ant-btn-ghost">
      <span>前进</span>
      <span class="anticon anticon-caret-right"></span>
      </button>
    </div>
    <p>尺寸</p>
    <div class="ant-btn-group ant-btn-group-lg">
      <button class="ant-btn ant-btn-ghost">大</button>
      <button class="ant-btn ant-btn-ghost">大</button>
      <button class="ant-btn ant-btn-ghost">大</button>
    </div>
    <div class="ant-btn-group">
      <button class="ant-btn ant-btn-ghost">正常</button>
      <button class="ant-btn ant-btn-ghost">正常</button>
      <button class="ant-btn ant-btn-ghost">正常</button>
    </div>
    <div class="ant-btn-group ant-btn-group-sm">
      <button class="ant-btn ant-btn-ghost">小</button>
      <button class="ant-btn ant-btn-ghost">小</button>
      <button class="ant-btn ant-btn-ghost">小</button>
    </div>
</div>
````