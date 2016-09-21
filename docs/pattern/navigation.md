---
order: 1
title:
  zh-CN: 导航
  en-US: Navigation
---

在广义上，任何告知用户他在哪里，他能去什么地方以及如何到达那里的方式，都可以称之为导航。而我们将中后台常见的导航方式进行提炼和封装，帮助设计者快速构建清晰和流畅的系统。当设计者使用导航或者自定义一些导航结构时，请注意：

1. 尽可能提供标示、上下文线索以及网站地图，避免用户迷路；
2. 保持导航样式和行为一致或者减少导航数量，降低用户学习成本；
3. 尽可能减少页面间的跳转（eg：一个常见任务需要多个页面跳转时，请减少至一至两次），让用户移动距离保持简短。

---

## 常见导航

<Table style="font-size:12px;float:right;width:600px;margin-left:60px;margin-bottom:100px;">
  <tr>
    <th></th>
    <th>侧栏导航</th>
    <th>顶部导航</th>
  </tr>
  <tr>
    <th>优点</th>
    <td>导航的层级扩展性强；水平空间利用率高，可展示更多内容；导航可以固定，使得用户在操作和浏览时可以快速定位和切换当前位置，非常高效。</td>
    <td>人的浏览习惯是自上而下的，便于浏览和点击；通常将内容放在固定尺寸（例如：1208px）内，整个页面排版稳定，不受用户终端显示器影响。</td>
  </tr>
  <tr>
    <th>缺点</th>
    <td>内容区域一般放置在栅格上，所以排版受用户终端显示器影响大。</td>
    <td>目前显示器多为宽屏，顶部导航对垂直空间占用率大，而对水平空间利用率低；由于中英文都是横向书写，顶部导航会限制导航类目的数量和长度。</td>
  </tr>
  <tr>
    <th>总结</th>
    <td>适用在操作性强、中后台管理性质的应用。</td>
    <td>一般适用在浏览性强、门户性质的网站，以及一些比较前台化的应用。</td>
  </tr>
</Table>

我们将常见的导航模式分为：侧栏导航和顶部导航，两者各有优缺点，设计者可以根据各自的业务需求进行选择。

前端实现代码可以参考 [常用布局](/docs/spec/layout#docs-spec-layout-demo-top)。

## 侧栏导航

---

<img class="preview-img no-padding" align="right" alt="结构示例" src="https://os.alipayobjects.com/rmsportal/hutiGZWQYmIspjw.png">

导航的结构由以下几部分组成。

1. 产品 Logo 和名称
2. 业务类目
3. 登陆工具
4. 面包屑（可选）

#### 关于面包屑

> 1. 尽可能不使用面包屑，尤其是当前页面的导航能清晰的告诉用户他在哪里时。
> 2. 面包屑可以分为这几类：
>    - 路径型：是一个动态显示用户到达页面经过的途径。
>    - 位置型：位置型是固定的，显示了页面在网站结构中的位置。
>    - 属性型：属性型给出当前页面的分类信息。

<br>

<img class="preview-img no-padding" align="right" alt="一级类目" src="https://os.alipayobjects.com/rmsportal/IeuIHdFfKCIABHV.png">

<img class="preview-img no-padding" align="right" alt="二级类目" src="https://os.alipayobjects.com/rmsportal/kAbbeJekohMtubV.png">

<img class="preview-img no-padding" align="right" alt="三级类目及以上" src="https://os.alipayobjects.com/rmsportal/qaOifucSTWooBTL.png">

我们定义了不同类目层级所对应的导航样式。


## 顶部导航

---

<img class="preview-img no-padding" align="right" alt="结构示例" src="https://os.alipayobjects.com/rmsportal/MVccMQxgCeYfwjS.png">

导航的结构由以下几部分组成。

1. 产品 Logo 和名称
2. 业务类目
3. 登陆工具
4. 面包屑（可选）

<br>

<img class="preview-img no-padding" align="right" alt="一级类目" src="https://os.alipayobjects.com/rmsportal/KvEsIDOYzknbsPT.png">

<img class="preview-img no-padding" align="right" alt="二级类目" src="https://os.alipayobjects.com/rmsportal/xXaCRVPIfmjDyIL.png">

<img class="preview-img no-padding" align="right" alt="三级类目及以上" src="https://os.alipayobjects.com/rmsportal/ollkHeFUFQElelm.png">

不同类目层级。
