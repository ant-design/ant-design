---
category: 全局样式
order: 6
title: 阴影
---

阴影来源于现实生活的反映物体与物体之间距离的物理现象。在界面中，我们往往通过模拟元素的投影直截了当的来告诉用户，元素之间的高度距离与层次关系。

## 高度

阴影是由两个不同阶层的平面产生，且强度由两者之间的距离决定。所以物体的高度直接影响物体的阴影，对象离地面越远阴影越大，模糊值越高。我们将系统分为无、低、中、高四个 UI 层级，各自分布在不同的高度层级，阴影属性也有所不同。

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*o-OFQK5hJP0AAAAAAAAAAABkARQnAQ" alt="高度">
</div>

**第 0 层**：物体紧贴地面，投影与物体完全重叠，在界面中不对此层定义阴影值。如：输入框等；

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*li3zQbxRuOMAAAAAAAAAAABkARQnAQ" alt="高度">
</div>

**第 1 层**: 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片 hover 等；

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mXnoSI8MWuEAAAAAAAAAAABkARQnAQ" alt="高度">
</div>

**第 2 层**：物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，如：下拉面板等；

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yNOwR6Gqy4MAAAAAAAAAAABkARQnAQ" alt="高度">
</div>

**第 3 层**：物体位于高层级，该物体的运动和其他层级没有关联，如：对话框等。

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4pFoR4gWL2oAAAAAAAAAAABkARQnAQ" alt="高度">
</div>

## 光源

阴影的方向是由光源与物体的相对位置所决定的。假定光源所处高度不变，光源与物体的距离和物体与阴影的距离成正比。光源越远，则阴影距离物体越远。阴影的方向在界面里通常使用 `X, Y` 坐标轴来表示。

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*KgGmQ79c38oAAAAAAAAAAABkARQnAQ" alt="光源">
</div>

## 阴影值

综上可知。阴影由光照而产生。主要影响其值的是物体高度与光源位置：

1. 在不同高度上时，投射出的阴影颜色、模糊度、面积都有所区分。离地面越远的物体，产生的阴影颜色越淡、模糊度越高、面积越大；反之则颜色更深、模糊度越低、面积越小；

2. 而投影的方向主要由光源与物体的相对位置决定。

在 Ant Design 中不同的阴影方向使用在不同的地方：

- 阴影向下：主要应用于组件内部或组件本身，是比较常规场景的用法
- 阴影向上：主要应用于底部导航或工具栏等
- 阴影向左：主要应用于右边导航栏、抽屉组件或固定表格栏
- 阴影向右：主要应用于左边导航栏、抽屉组件或固定表格栏

阴影是模拟的真实世界的反馈，Ant Design 为了更符合真实阴影，在 4.0 中采用了三层阴影的表达方式，让阴影更柔和，更符合真实状态

<div>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1oijTJh2HEIAAAAAAAAAAABkARQnAQ" alt="阴影值">
</div>

### 常用阴影设计表

**第一层：**

<table>
  <thead>
    <tr>
      <th>阴影类型</th>
      <th>阴影颜色（rgba）</th>
      <th>方向（X, Y）</th>
      <th>模糊度（Blur）</th>
      <th>扩展值（Spread）</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">@shadow-1-up</td>
      <td>rgba(0, 0, 0, 0.16)</td>
      <td>0px, -1px</td>
      <td>2px</td>
      <td>-2px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>0px, -3px</td>
      <td>6px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.09)</td>
      <td>0px, -5px</td>
      <td>12px</td>
      <td>4px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-1-down</td>
      <td>rgba(0, 0, 0, 0.16)</td>
      <td>0px, 1px</td>
      <td>2px</td>
      <td>-2px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>0px, 3px</td>
      <td>6px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.09)</td>
      <td>0px, 5px</td>
      <td>12px</td>
      <td>4px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-1-left</td>
      <td>rgba(0, 0, 0, 0.16)</td>
      <td>-1px, 0px</td>
      <td>2px</td>
      <td>-2px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>-3px, 0px</td>
      <td>6px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.09)</td>
      <td>-5px, 0px</td>
      <td>12px</td>
      <td>4px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-1-right</td>
      <td>rgba(0, 0, 0, 0.16)</td>
      <td>1px, 0px</td>
      <td>2px</td>
      <td>-2px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>3px, 0px</td>
      <td>6px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.09)</td>
      <td>5px, 0px</td>
      <td>12px</td>
      <td>4px</td>
    </tr>
  </tbody>
</table>

**第二层：**

<table>
  <thead>
    <tr>
      <th>阴影类型</th>
      <th>阴影颜色（rgba）</th>
      <th>方向（X, Y）</th>
      <th>模糊度（Blur）</th>
      <th>扩展值（Spread）</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">@shadow-2-up</td>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>0px, -3px</td>
      <td>6px</td>
      <td>-4px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>0px, -6px</td>
      <td>16px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>0px, -9px</td>
      <td>28px</td>
      <td>8px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-2-down</td>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>0px, 3px</td>
      <td>6px</td>
      <td>-4px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>0px, 6px</td>
      <td>16px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>0px, 9px</td>
      <td>28px</td>
      <td>8px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-2-left</td>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>-3px, 0px</td>
      <td>6px</td>
      <td>-4px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>-6px, 0px</td>
      <td>16px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>-9px, 0px</td>
      <td>28px</td>
      <td>8px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-2-right</td>
      <td>rgba(0, 0, 0, 0.12)</td>
      <td>3px, 0px</td>
      <td>6px</td>
      <td>-4px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>6px, 0px</td>
      <td>16px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>9px, 0px</td>
      <td>28px</td>
      <td>8px</td>
    </tr>
  </tbody>
</table>

**第三层：**

<table>
  <thead>
    <tr>
      <th>阴影类型</th>
      <th>阴影颜色（rgba）</th>
      <th>方向（X, Y）</th>
      <th>模糊度（Blur）</th>
      <th>扩展值（Spread）</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">@shadow-3-up</td>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>0px, -6px</td>
      <td>16px</td>
      <td>-8px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>0px, -9px</td>
      <td>28px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.03)</td>
      <td>0px, -12px</td>
      <td>48px</td>
      <td>16px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-3-down</td>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>0px, 6px</td>
      <td>16px</td>
      <td>-8px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>0px, 9px</td>
      <td>28px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.03)</td>
      <td>0px, 12px</td>
      <td>48px</td>
      <td>16px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-3-left</td>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>-6px, 0px</td>
      <td>16px</td>
      <td>-8px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>-9px, 0px</td>
      <td>28px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.03)</td>
      <td>-12px, 0px</td>
      <td>48px</td>
      <td>16px</td>
    </tr>
    <tr>
      <td rowSpan="3">@shadow-3-right</td>
      <td>rgba(0, 0, 0, 0.08)</td>
      <td>6px, 0px</td>
      <td>16px</td>
      <td>-8px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.05)</td>
      <td>9px, 0px</td>
      <td>28px</td>
      <td>0px</td>
    </tr>
    <tr>
      <td>rgba(0, 0, 0, 0.03)</td>
      <td>12px, 0px</td>
      <td>48px</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>
