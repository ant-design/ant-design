---
group: 设计模式 - 探索
type: 全局规则
order: 1
title: 导航
---

导航用来展示当前产品中，用户在哪儿，可以去哪儿。

## 设计目标

让用户明确知晓当前所处产品中的位置，并方便快捷地带用户到他想去的地方。

---

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*7BUOQYDiEr0AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>可循性</h4>
      <p>用户可定位到他们想要的信息。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NfLHQJfGmUQAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>高效</h4>
      <p>1. 多接入点：对同一目的地提供多个链接；</p>
      <p>2. 捷径：提供访问内容的捷径，如相关链接；</p>
      <p>3. 逃生舱：点击 logo 回到首页重新启动信息搜寻。</p>
    </div>
  </div>
</div>

---

## 设计建议

### 信息架构

• 设计时应尽量保持浅平宽的信息架构层级；

• 从用户的使用路径考虑导航，而非仅基于层级结构；

• 常见的组织方式有：

1. 按主题，例如产品提供的服务或内容分类，好处是直接呈现站点的内容范围；

2. 按受众群体，例如管理员、运营、操作员；

3. 按任务，例如了解合作模式、联系合作专员、签约流程、合作联调、业务运营、客户服务。

### 导航路径

完善的导航应该允许用户沿多种路径移动：

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Q9WMS64xs2gAAAAAAAAAAABkARQnAQ">
</div>

**A-平移**：同层级跳转

**B-下钻**：进入低层级的内容

**C-返回**：返向浏览历史或高层级内容

**D-联想导航**：根据相关性导航至内容

---

## 类型

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MU2BQpS51mMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

正确理解和使用导航组件对产品全局体验至关重要。

我们将导航划分为以下 5 种类型：

1.全局导航

2.返回类导航

3.页内导航

4.下钻类导航

5.联想类导航

### 全局导航

全局导航体现网站的核心组织结构。

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PgY8S6Mx3x8AAAAAAAAAAABkARQnAQ">
</div>

#### 侧边导航

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fNW0Rak8sL8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

- 很多菜单时使用，建议菜单多于 6 项时使用；

- 可以承载多个层级，但建议 1-3 个层级；

- 企业级产品推荐使用侧栏导航，其可见性更好易于扫读，各菜单重要性受菜单排列顺序影响较小。

#### 顶部导航

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MmmnTKl0hO8AAAAAAAAAAABkARQnAQ">
</ImagePreview>

- 各菜单权重常常与排列顺序呈正相关，即排列顺序影响用户使用频次；

- 建议 2~7 项内容使用；

- 建议 1-2 个层级；超出 2 个层级时，建议采用弹出式导航。

#### 弹出式导航

<ImagePreview>
<img class="preview-img no-padding good" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8lgCQb8copwAAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_k8wR4PoOSsAAAAAAAAAAABkARQnAQ" alt="错误示范">
</ImagePreview>

用于拓展导航承载层级，适用于大型网站。

站点地图式导航可以让用户对整个网站的可用功能一目了然。

1. 不要让用户延着狭窄的悬停路径获取导航菜单；

2. 不要让用户逐层打开每层菜单去查找，低效又困难；

> 此建议仅针对导航类菜单，不适用于操作类菜单。

#### 实用工具

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UXcoSYBXgOMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

通常放在网站的右上角，是一种习惯用法，用户习惯在这个位置找到这些内容。

内容通常包括：

• 全局搜索

• 通知中心

• 网站帮助

• 客服信息、购物车

• 收藏夹

• 登录工具

• 语言切换

<ImagePreview>
<img class="preview-img no-padding bad" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DgCoRI0aFLcAAAAAAAAAAABkARQnAQ" alt="错误示范">
</ImagePreview>

**不要将页面内的操作放到实用工具中。**

### 子站点导航

企业级产品常采用层级+数据库混合结构的信息架构，这种信息架构通常层级较深，为了实现用户感知层面的浅平宽，将较深几个层级组织为一个子站点，降低单个站点层级数量，减轻用户认知负担。

另一种子站点场景是，面对一些任务复杂，需要较大的工作空间，以子站点的方式沉浸式处理任务。最常见的是编辑器。子站点模式下，对全站导航功能需求低，通常只需提供一个返回上级或回到首页的出口。

> 此处的数据库是一种信息架构形式，各页面内容独立，但都遵循一致的形式/格式。

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jYG0T7S-SjsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

#### 沉浸式导航

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vABzS5JNgocAAAAAAAAAAABkARQnAQ">
</ImagePreview>

用于处理较为复杂或需要较大工作空间的任务。

#### 多级站点导航

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mXw5TIVLL-sAAAAAAAAAAABkARQnAQ">
</ImagePreview>

- 菜单数量较多的子站点使用；

- 子站点设计上，应明显区别于全站导航，使得进入子站点需要成较大的过渡波动，提示用户进入了新的空间。

### 页内导航

信息架构中较低层级的内容导航可以使用页内导航，如果页面需要分享给他人，需在 url 添加定位标记。

#### 页头

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Ah4HQ6gPheQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

页头位于页内容上方，主要作用是申明页面主题、页内信息导航、页面级内容操作。

#### Tree 树型控件

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PJ2fTKBEZIoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

页面内多层次的结构展示。

#### 锚点

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*d6eDQZy-6gkAAAAAAAAAAABkARQnAQ">
</ImagePreview>

在各个页面分区之间跳转，当平铺呈现的内容过长时使用。

#### 回到顶部

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-QkOT5KrcDwAAAAAAAAAAABkARQnAQ">
</ImagePreview>

快速回到页面顶部。

#### 走马灯

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gVZZQIz6yw4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

循环播放一系列内容。

### 下钻类导航

点击进入信息架构下层内容，默认站内跳转，站外新开标签页，典型场景为列表下钻至详情。

### 返回类导航

#### 面包屑

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QcmiTLXUH1oAAAAAAAAAAABkARQnAQ">
</ImagePreview>

反映当前页面在网站结构中的位置，在少于三个层级时无需展示，此时的全局导航能直接呈现位置。用户可通过面包屑返回上级页面。

#### 返回按钮

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*z1XdRrwsqgQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**一般标题会和面包屑一起出现，有面包屑时标题默认不推荐使用返回按钮。**

页头中的返回按钮相当于一个短面包屑，用于返回上一层级页面。适用于子站点场景，该场景隐藏了全站导航，用户需要通过返回按钮回到上级页面。

### 联想类导航

#### 步骤条

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jhNXQL5oRaMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

按照预先定义的顺序引导用户一步一步前后移动。

在一系列页面的每一页上都展示步骤条，并标记当前页面在这条线性路径上的位置。

适用于：

• 用户访问路径是线性的；

• 步骤条将复杂的任务分解为易于处理的小任务，减少用户出错，更快完成任务。

#### 上一篇下一篇

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*5Es3S4HJvrEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

协助我们移动到其他关系紧密的网页。

---

## 如何验证设计结果

验证导航系统的设计好坏可对其进行压力测试：像跳伞一样跳进网站里，验证导航系统的极限。

1）忽略首页，随机直达网站某一页面；

2）看用户是否能知道当前位置以及与网站其他部分的关系。在哪个网站的哪个部分？上层网页是什么？

3）是否知道这个网页会带你到哪里去？链接文字是否能说明去向?

---

## 扩展阅读

### 外部参考文章

- [阿里云-控制台导内容区导航系统](https://xconsole.aliyun-inc.com/spec/hxzewz)
- [Material Design Navigation](https://material.io/design/navigation/understanding-navigation.html#)
- [Predix Navigation](https://www.predix-ui.com/#/design/foundation/navigation)
- [Windows-UWP 应用的导航设计基础知识](https://docs.microsoft.com/zh-cn/windows/uwp/design/basics/navigation-basics)
- [When You Should Use a Breadcrumb Navigation?](https://uxmovement.com/navigation/when-you-should-use-a-breadcrumb-navigation/)
- 书籍：《web 信息架构》— 导航系统
- 书籍：《web 导航设计》
