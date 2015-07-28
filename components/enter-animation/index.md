# EnterAnimation

- order: 11
- category: Components
- chinese: 进场动画
- cols: 1

---

页面进场离场的动画。

## 何时使用

1.从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。

2.小的信息元素排布或块状较多的情况下，根据一定的路径层次依次进场，区分维度层级，来凸显量级，使页面转场更加流畅和舒适，提高整体视觉效果和产品的质感。

## API

动画默认`right`

### EnterAnimation标签下：

|参数             |类型    |默认值        |详细                                                 |
|-----------------|-------|-------------|----------------------------------------------------|
|type             |string |right  |执行动画的内置参数  |
|style            |string |null   |同上，style的样式动画,`type`有值，此项无效|
|delay            |number |0      |整个区块的延时，以秒为单位|
|interval         |number |0.1    |递增延时值，以秒为单位|

### dom子标签下：

|参数             |类型    |默认值      |详细                                                 |
|-----------------|-------|-----------|----------------------------------------------------|
|enter-data       |object | right     |子标签动画参数|

#### enter-data参数列表

|参数              |类型             |默认值           |详细                                                 |
|-----------------|-----------------|----------------|----------------------------------------------------|
|type             |string          |right           |内置动画样式：<br/> `alpha` `left` `right` `top` `bottom` `scale` `scaleFrom` `scaleX` `scaleY`;|
|style            |string          |null            |style样式，如transform: translateX(100px),每个样式必须以;结束；`type`有值此项无效|
|direction        |string          |"enter"         |动画进场或出场样式,以 `enter` `leave`两值;默认为 `enter`|
|duration         |number          |0.5             |动画的时间,以秒为单位|
|ease             |string          |cubic-bezier(0.165, 0.84, 0.44, 1)|样式缓动，只支持css样式缓动|
|delay            |number          |0               |动画的延时，依照结构递增以上的`interval`|
|queueId          |number          |0               |动画的线程|

注：如子节点有 `enter-data` 值，则只执行有 `enter-data` 的节点的动画，相反所有子节点上都没有 `enter-data` 值，则执行遍历dom下一级节点来执行动画。

如果标签上的 `enter-data` 没 `type` || `style` ，则执行 `EnterAnimation` 标签上的 `type` || `style`。
