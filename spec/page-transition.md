# 转场动画

- category: 动画
- order: 1

---

### 单页面转场动画

从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。

#### 视觉连贯性

#### 三类元素（Adding, Receding, Normal）

Adding:  新加入的信息元素应被告知如何使用，从页面转变的信息元素需被重新识别。

Receding:  与当前页无关的信息元素应采用适当方式移除

Normal: 指那些从转场开始到结束都没有发生变化的信息元素



#### 转场动画

大页面转场可采用左出右入的形式

小的信息元素排布或块状较多的情况下，最好根据一定的路径层次依次进场，区分维度层级，来凸显量级，间隔时间为动画时间的三分之一；

如不是单页面，页面动画可以为只右入和间隔性出现；
<script src="/static/TweenMax.min.js"></script>
<script src="/static/motion.js"></script>

<div class="video-player">
<video preload loop><source src="https://t.alipayobjects.com/images/rmsweb/T1QZ4gXdJeXXXXXXXX.webm" type="video/webm"><source src="https://t.alipayobjects.com/images/rmsweb/T1BIdgXkloXXXXXXXX.mp4" type="video/mp4"></video>
</div>


####可折叠面板

对于信息元素内容区域的延伸，显示信息元素和进一步内容对象之间的直接连接。

1.被展开的信息区域内容按照一定的路劲依次进场。

2.信息元素在收起时照收齐点移动，在视觉上跟随关闭物体。


<link rel="stylesheet" href="/static/motionDemo.css">

<div class="video-player">
<video preload loop><source src="https://t.alipayobjects.com/images/rmsweb/T12I8gXexdXXXXXXXX.webm" type="video/webm"><source src="https://t.alipayobjects.com/images/rmsweb/T1e0hgXcpdXXXXXXXX.mp4" type="video/mp4"></video>
</div>


#### 弹出框动效


从一个触发点触发一个弹出框时，弹框从所触发区域弹出，且触发区域视觉上基本保持不变。这样让触发区域和弹出区域有所关联，提高用户对新内容的认知。

<div class="video-player">
<video preload loop><source src="https://t.alipayobjects.com/images/rmsweb/T1br0gXghtXXXXXXXX.webm" type="video/webm"><source src="https://t.alipayobjects.com/images/rmsweb/T1lcRgXb4gXXXXXXXX.mp4" type="video/mp4"></video>
</div>
