---
group: 设计模式 - 探索
type: 模板文档
order: 2
title: 工作台
---

工作台常被作为应用的主页，是一个为用户提供便利的交通枢纽。工作台提供常用信息入口，以中心辐射的方式导航至应用的各功能模块；呈现用户当前需要关注的信息，缩短获取关键信息的路径；同时允许用户在工作台直接操作一些高频任务。

---

## 设计目标

用户侧：提供处理和查看信息的捷径，并为用户提供必要的帮助；<br/> 产品侧：与用户更好地沟通，适当宣传产品的新动向等运营内容。

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aFiGRbIvuH4AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>可寻性</h4>
      <p>用户是否能定位到他们想要的信息。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lTUuSKmd8WsAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>降低记忆负载</h4>
      <p>理解用户再次访问的核心目标，为可能的目的地提供最短导航路径。</p>
    </div>
  </div>
</div>

## 如何设计

#### 模板 - 工作台

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8s67TL62WEoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

- 为用户再次访问缩短导航路径；
- 为用户提供常用导航入口。

**涉及哪些功能**

使用帮助；核心数据；快捷入口；待办清单；关注；运营模块。

**设计建议**

- 展示与日常工作相关模块，将总模块数量控制在 5-9 个；
- 尽量在首屏呈现最常使用的内容；
- 提供基于角色的差异化视图。

#### 模板 - 新手引导

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*LQBmQauTEAsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

- 当新用户到达平台，尚未开始任何工作时，缩短新用户学习时长；
- 部分模块无内容时，请参见「空状态」指引。

**涉及哪些功能**

使用帮助；空状态引导

**设计建议**

- 向用户介绍平台用途，并引导用户开始工作；
- 如果需要用户管理复杂的对象，提供 Demo 预览入口；

### 设计建议

#### 选择合适的导航方式

这类页面一般会提供两类导航形式。<br/>

① 用户知道他想要使用的功能，需要利用导航获取。例如：

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*xlYoTIf8NpwAAAAAAAAAAABkARQnAQ">
</div>

② 发现类导航，用户须完成某任务，但不知道使用哪个功能来完成。例如：

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*9nKdRJBAu8sAAAAAAAAAAABkARQnAQ">
</div>

#### 按照使用频次布置内容

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1tfiR5-xKUQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

用户在日常工作中最常使用的内容，按照使用频次将内容布置以下各区域。

#### 考虑异常状态

详见异常页

> 另，关于是否应该推荐用户个性化定制，这部分内容尚在探索中。
