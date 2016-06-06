---
category: Components
chinese: 进出场动画
type: Other
english: QueueAnim
---

通过简单的配置对一组元素添加串行的进场动画效果。

## 何时使用

- 从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。
- 小的信息元素排布或块状较多的情况下，根据一定的路径层次依次进场，区分维度层级，来凸显量级，使页面转场更加流畅和舒适，提高整体视觉效果和产品的质感。
- 特别适合首页和需要视觉展示效果的宣传页，以及单页应用的切换页面动效。


## API

> 此组件 `antd@1.0.0+` 后标记为废弃，您可以直接使用 `import QueueAnim from 'rc-queue-anim'` 来代替，相关文档也已移到 [ant-motioin](http://motion.ant.design/#/components/queue-anim)。

> [ant-motioin](http://motion.ant.design/) 是一个动效设计语言，欢迎关注。

元素依次进场。

```html
<QueueAnim>
  <div key='demo1'>依次进场</div>
  <div key='demo2'>依次进场</div>
  <div key='demo3'>依次进场</div>
  <div key='demo4'>依次进场</div>
</QueueAnim>
```

> 每个子标签必须带 key，如果未设置 key 将不执行动画。

|参数        |类型             |默认     |详细             |
|------------|----------------|---------|----------------|
| type       | string / array | `right` | 动画内置参数 <br/> `left` `right` `top` `bottom` `scale` `scaleBig` `scaleX` `scaleY`|
| animConfig | object / array | null    | 配置动画参数 <br/> 如 `{opacity:[1, 0],translateY:[0, -30]}` 具体参考 [velocity](http://julian.com/research/velocity) 的写法|
| delay      | number / array | 0       | 整个动画的延时,以毫秒为单位 |
| duration   | number / array | 500     | 每个动画的时间,以毫秒为单位  |
| interval   | number / array | 100     | 每个动画的间隔时间,以毫秒为单位  |
| leaveReverse | boolean      | false   | 出场时是否倒放,从最后一个 dom 开始往上播放 |
| ease       | string / array | `easeOutQuart` | 动画的缓动函数,[查看详细](http://julian.com/research/velocity/#easing) |
| animatingClassName | array | `['queue-anim-entering', 'queue-anim-leaving']` | 进出场动画进行中的类名 |
| component  | string | `div` | QueueAnim 替换的标签名 |

> 当以上数据类型为 Array 时，`['left', 'top']` 第一个为进场动画属性, 第二个为离场属性。
