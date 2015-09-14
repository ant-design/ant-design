# EnterAnimation

- category: Components
- chinese: 进场动画


---

通过简单的配置对一组元素添加串行的进场动画效果。

## 何时使用

- 从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。

- 小的信息元素排布或块状较多的情况下，根据一定的路径层次依次进场，区分维度层级，来凸显量级，使页面转场更加流畅和舒适，提高整体视觉效果和产品的质感。


## API

元素依次进场。

```html
<EnterAnimation>
  <div key='demo'>
    <div>依次进场</div>
    <div>依次进场</div>
    <div>依次进场</div>
    <div>依次进场</div>
  </div>
</EnterAnimation>
```

如子节点有 `enter-data` 值，则只执行有 `enter-data` 的节点的动画，相反所有子节点上都没有 `enter-data` 值，则执行遍历 dom 下一级节点来执行动画。

```html
<EnterAnimation type="left" delay={2}>
  <div key='demo'>
    <div>
      <div enter-data>
        依次进场
      </div>
    </div>
    <div enter-data>依次进场</div>
    <div enter-data={{type: 'bottom'}}>依次进场，并修改动画效果</div>
    <div>没有动画</div>
  </div>
</EnterAnimation>
```

### <EnterAnimation />

|参数             |类型    |默认值        |详细                                                 |
|-----------------|-------|-------------|----------------------------------------------------|
|enter|object| `{type:'right'}` |管理进场数据|
|leave|object| null |管理当前元素出场的数据, null 时继承 enter 里的所有标签的值 |
|component|string| `div` | EnterAnimation 替换的标签名|

### enter = {} | leave = {}

|参数             |类型    |默认值        |详细                                                 |
|-----------------|-------|-------------|----------------------------------------------------|
|type             |string |`right`  |内置动画样式：<br/> `alpha` `left` `right` `top` `bottom` `scale` `scaleBig` `scaleX` `scaleY`  |
|style           |object / string |null   |同上， style 的样式动画, `type` 有值，此项无效。<br/>如 `{transform:'translateX(100px)'}` 或 `'transform: translateX(100px)'`|
|duration         |number |0.5    |每个动画的时间,以秒为单位|
|ease             |string|`cubic-bezier(0.165, 0.84, 0.44, 1);`|样式缓动,只支持 css 样式缓动;|
|delay            |number |0      |整个区块的延时，以秒为单位|
|reverse          |boolean|false  |是否倒放,从最后一个 dom 开始往上播放|
|interval         |number |0.1    |递增延时值，以秒为单位|
|callback         |function|null  |动画结束回调|

### 一级标签key：

|参数             |类型    |详细                                                 |
|-----------------|-------|----------------------------------------------------|
|key|string|必需，控制进出场；|

### 子标签

|参数             |类型    |默认值      |详细                                                 |
|-----------------|-------|-----------|----------------------------------------------------|
|enter-data       |object | `{type:'right'}`     |子标签进场参数|
|leave-data       |object | `enter-data` |子标签出场参数|


#### enter-data = {}  | leave-data = {}

|参数              |类型            |默认值           |详细                                                 |
|-----------------|-----------------|----------------|----------------------------------------------------|
|type             |string          |`right`           |同标签里的 `type`,覆盖标签里的值|
|style            |object / string          |null            |同标签里的 `style`,覆盖标签里的值|
|duration         |number          |0.5             |同标签里的 `duration`,覆盖标签里的值|
|ease             |string          |`cubic-bezier(0.165, 0.84, 0.44, 1)`|同标签里的 `ease`,覆盖标签里的值|
|delay            |number          |0               |当前动画的延时，依照结构递增以上的 `interval`|
|queueId          |number          |0               |动画的线程|

> 由于使用了 CSS3 动画，所以 `IE9` 及更早的版本将没有进场效果。

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
