# QueueAnim

- category: Components
- chinese: 进出场动画

---

通过简单的配置对一组元素添加串行的进场动画效果。

## 何时使用

- 从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。

- 小的信息元素排布或块状较多的情况下，根据一定的路径层次依次进场，区分维度层级，来凸显量级，使页面转场更加流畅和舒适，提高整体视觉效果和产品的质感。

- 特别适合首页和需要视觉展示效果的宣传页，以及单页应用的切换页面动效。


## API

> 此组件取代了 0.9.x 版本的 [enter-animation](http://09x.ant.design/components/enter-animation/)。

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

<style>
.code-box-demo .demo-header {
  width: 100%;
  background: #ebedee;
  height: 30px;
}
.code-box-demo .demo-header ul {
  float: right;
  margin-right: 5px;
}
.code-box-demo .demo-header ul li {
  width: 50px;
  height: 30px;
  float: left;
  background: #e4e4e4;
  margin-left: 5px;
}
.code-box-demo .demo-header ul li:before {
  margin: 10px auto;
  width: 20px;
  height: 10px;
  background: #ebeded;
}
.code-box-demo .demo-header .logo {
  float: left;
  margin: 0px auto 0 10px;
  line-height: 32px;
}
.code-box-demo .demo-header .logo img{
  margin:auto
}
.code-box-demo .demo-header .logo span {
  display: block;
  float: right;
}
.code-box-demo .demo-content {
  width: 80%;
  margin: 10px auto;
}
.code-box-demo .demo-content .demo-title {
  text-align:left;
  background: #a4a4a4;
  width: 40%;
  height: 20px;
  line-height: 20px;
  color: #ebeded;
  text-indent:10px
}
.code-box-demo .demo-content .demo-listBox {
  margin-top: 10px;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title {
  height: 30px;
  background: #cacaca;
  overflow: hidden;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title:before,.code-box-demo .demo-content .demo-listBox .demo-list .title:after{
  width: 30%;
  height: 5px;
  background: #ebeded;
  float:left;
  margin:12px 35px 0;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title:after{
  width:15%;
  float:right;
  margin:12px 10px 0;

}
.code-box-demo .demo-content .demo-listBox .demo-list ul li {
  height: 25px;
  background: #ebeded;
  border-bottom: 1px solid #cacaca;
  overflow: hidden;
  padding: 5px 15px;
}
.code-box-demo .demo-content .demo-listBox .demo-list ul li:before {
  width: 10px;
  height: 5px;
  background: #cacaca;
  float: left;
  margin-top:4px
}
.code-box-demo .demo-content .demo-listBox .demo-list ul li:after {
  width: 50%;
  height: 5px;
  background: #cacaca;
  float: left;
  margin-left: 10px;
  margin-top: 4px;
}
.code-box-demo .demo-content .demo-kp {
  margin: 10px auto;
}
.code-box-demo .demo-content .demo-kp ul li {
  display: inline-block;
  width: 32%;
  height: 40px;
  background: #cacaca;
  color: #ebeded;
  text-align: left;
  padding: 10px;
  margin-right: calc(2%);
}
.code-box-demo .demo-content .demo-kp ul li:last-child {
  margin-right: 0%;
}
.code-box-demo .demo-content .demo-kp ul li:after {
  width: 60%;
  height: 5px;
  background: #ebeded;
  float: left;
  margin-top: 7px;
}
.code-box-demo .demo-content .demo-kp ul li:before {
  background: #ebeded;
  float: left;
  width: 15px;
  height: 15px;
  margin:2px 10% 0 0;

}
.code-box-demo .demo-footer {
  margin-top: 10px;
  background: #cacaca;
  height: 40px;
  float: left;
  width: 100%;
  display: table;
}
.code-box-demo .demo-footer:before {
  width: 60%;
  height: 5px;
  background: #ededed;
  margin: 10px auto 0;
}
.code-box-demo .demo-footer:after {
  width: 30%;
  height: 5px;
  background: #ededed;
  margin: 5px auto;
}
.code-box-demo .demo-header ul li:before,
.code-box-demo .demo-content .demo-kp ul li:before,
.code-box-demo .demo-content .demo-kp ul li:after,
.code-box-demo .demo-content .demo-listBox .demo-list .title:before,
.code-box-demo .demo-content .demo-listBox .demo-list .title:after,
.code-box-demo .demo-content .demo-listBox .demo-list ul li:before,
.code-box-demo .demo-content .demo-listBox .demo-list ul li:after,
.code-box-demo .demo-footer:before,
.code-box-demo .demo-footer:after {
  display: block;
  content: "";
}
</style>
