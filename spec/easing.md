# 缓动函数

- category: 动画
- order: 1

---

现实物体照着一定节奏移动，并不是一开始就移动很快的。

当我们打开现代家具的门或抽屉时，首先会让它加速，然后慢下来。

当电梯开关门时，它在打开或关闭时都有一段缓冲带，是先加速，然后慢下来。

当某个东西往下掉时，首先是越掉越快，撞到地上后回弹，最终才又碰触地板。


### 质量和重量

在物理世界里，是以力量附加到物体对象里，加上自身的质量才完成一段动画。力量的持续时间决定物体的加速，减速与改变方向。

动画停止与启动都不是瞬间完成的，因它需要一段缓冲的时间来加速或减速，因此，当动画有突然启动，停止或改变方向，都会显得很不自然。

#### 自然缓动

不要用直线缓动Linear做物体出入动画的缓动；注：Linear函数可做循环动画函数。

如下图所示，在没有缓动的情况下启动与停止都显得突兀，感觉动画还没结束就停止了，所以在物体运动中避免直线运动。

<script src="/static/TweenMax.min.js"></script>
<script src="/static/motion.js"></script>
<div id="J-Linear">
</div>

<script>
$(function (){
new Motion("#J-Linear"，{lineData:[{open:[]，end:[]，stroke:"#f2666c"}，{open:[0.455， 0.03， 0.515， 0.955]，end:[0.455， 0.03， 0.515， 0.955]，stroke:"#71B5DE"，openEaseName:"easeInOutQuad"，endEaseName:"easeInOutQuad"}，]，mask:false});
})
</script>

上图所示缓动函数：红 `Linear`，蓝 `easeInOutQuad`。


#### 出入动画

不要做单向动画，进场后不做出场，直接消失元素或回到原点，会让整个画面不协调，反相只出不进也一样。

所以有动画的进场必须要有动画的出场，包括导航上的动画。

<div id="J-Symmetric">
</div>

<script>
$(function (){
new Motion("#J-Symmetric"，{lineData:[
{open:[0.455， 0.03， 0.515， 0.955]，end:[]，openEaseName:"easeInOutQuad"，endEaseName:"null"，stroke:"#f2666c"}，
{open:[0.645， 0.045， 0.355， 1]，end:[0.645， 0.045， 0.355， 1]，stroke:"#71B5DE"，openEaseName:"easeInOutCubic"，endEaseName:"easeInOutCubic"}]，
mask:false，exposure:"top"});
})
</script>

上图所示缓动函数：红 `easeInOutQuad`，蓝 `easeInOutCubic`。


##### 场外出入

场外出入需要考虑力量与引力的关系，如向空中抛物体时，开始时力量大于引力时，速度是最快的，

到达一定高度后，随着力量的减少，速度也跟随着降低，物体达到最高点后，力量等于引力或小于引力时，物体随之下降；

所以在快到达最高点和掉下来时有一定缓冲带；不要做图示红色球体下降时的缓动；

<div id="J-Entry">
</div>

<script>
$(function (){
new Motion("#J-Entry"，{lineData:[
{open:[0.25， 0.46， 0.45， 0.94]，end:[0.25， 0.46， 0.45， 0.94]，openEaseName:"easeOutQuad"，endEaseName:"easeOutQuad"，stroke:"#f2666c"}，
{open:[0.215， 0.61， 0.355， 1]，end:[0.55， 0.055， 0.675， 0.19]，stroke:"#71B5DE"，openEaseName:"easeOutCubic"，endEaseName:"easeInCubic"}]，
mask:true，exposure:"bottom"});
})
</script>

上图所示缓动函数：红 `easeOutQuad` `easeOutQuad`，蓝 `easeOutCubic` `easeInCubic`。

示例组件：[Message 全局提示](/components/message/)，[Dropdown 下拉菜单](/components/dropdown/)。

#### 弹性动画

1. 如蹦极跳下来时，刚跳下时速度很快，到达绳子的长度后，由于物体的重量再将绳子拉长再反弹，弹动几次后才停下。

   动画里也由质量来决定它的反弹，一般元素最好只弹动一次就够了，收回时可以用向下浮动再上拉或直接前缓动，可适用在下拉框与弹出元素。

2. 如球类物体掉地上的后，反弹几次后停止。

  - 曲线图用的是3次贝塞尔曲线，没法表示Bounce，所以用line替换。
  - 弹性动画最好结合alpha。

<div id="J-Back"></div>

<script>
$(function (){
new Motion("#J-Back"，{lineData:[
{open:[]，end:[0.455， 0.03， 0.515， 0.955]，openEaseName:"easeOutBounce"，endEaseName:"easeInOutQuad"，stroke:"#70f266"}，
{open:[0.175， 0.885， 0.32， 1.275]，end:[0.6， -0.28， 0.735， 0.045]，stroke:"#71B5DE"，openEaseName:"easeOutBack"，endEaseName:"easeInBack"}]，
mask:false，exposure:"top"});
})
</script>

上图所示缓动函数：红 `easeOutBounce` `easeInOutQuad`，蓝 `easeOutBack` `easeInBack`。


## 缓动函数

Ant Design 提供了一套缓动函数规范动画行为。

|名称               |参数                                      |说明与适用                  |
|-------------------|------------------------------------------|---------------------------|
|@ease-out          | `cubic-bezier(0.215， 0.61， 0.355， 1);`   |默认后缓动；适合元素展开时；    |
|@ease-in           | `cubic-bezier(0.55， 0.055， 0.675， 0.19);`|默认前缓动；适合元素关闭时；    |
|@ease-in-out       | `cubic-bezier(0.645， 0.045， 0.355， 1);`  |默认前后缓动；适合元素移动；    |
|@ease-out-back     | `cubic-bezier(0.18， 0.89， 0.32， 1.28);`  |结束回动；适合弹出框出现时；    |
|@ease-in-back      | `cubic-bezier(0.6， -0.3， 0.74， 0.05);`   |开始回动；适合弹出框关闭；     |
|@ease-in-out-back  | `cubic-bezier(0.68， -0.55， 0.27， 1.55);` |前后回动；                   |
|@ease-out-circ     | `cubic-bezier(0.08， 0.82， 0.17， 1);`     |圆形后缓动；适合元素展开时；    |
|@ease-in-circ      | `cubic-bezier(0.6， 0.04， 0.98， 0.34);`   |圆形前缓动；适合元素关闭时；    |
|@ease-in-out-circ  | `cubic-bezier(0.78， 0.14， 0.15， 0.86);`  |圆形缓动；适合元素移动；       |
