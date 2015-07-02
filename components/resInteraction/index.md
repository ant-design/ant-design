# Response ITN

- category: Animation
- chinese: 响应交互
- order: 1
- nodemos: true
---
响应交互一般是指我们在浏览页面时，点击元素时动画给我们视觉上的反馈，每个交互动效都能给我们带来不同视觉效果。

如搜索框，当你点击准备输入时，icon将会跑到右边方便点击，当然你按回车也是可以提交表单的；在你没有输入文字时，icon又会恢愎到原来的地置，但当你输入了文字后，icon将会停留在右边；

### 按钮类表面效果

按钮上的hover或click效果，随着你的鼠标事件而改变自身或增加元素在按钮上；

以下按钮对组件按钮的修改，只做示例，具体还需看组件；
<link rel="stylesheet" href="/static/motion.css">
<link rel="stylesheet" href="/static/motionDome.css">
<script src="/static/motionDome.js"></script>
<div style="overflow: hidden;">
<div style="width:200px;float:left;margin-right:60px">
<p style="text-align: center;"> 1.按钮表面效果；</p>
<div class="ant-btn-domebox">
<a class="ant-btn ant-btn-primary">我是按钮</a>
<a class="ant-btn ant-btn-primary ant-btn-ripple">
点击涟漪按钮
</a>
<a class="ant-btn ant-btn-ripple">
点击涟漪按钮
</a>
<button class="ant-btn ant-btn-ghost ant-btn-circle-outline ant-btn-lg" style="display: block;">
  <span class="anticon anticon-search"></span>
</button>
</div>
</div>
<div style="width:200px;float:left;">
<p style="text-align: center;"> 2.无素结合切换;</p>
<div class="ant-btn-domebox">
<button class="ant-btn ant-btn-primary ant-btn-ripple ant-btn-load ">
  <text>加载按钮</text>
  <span class='anticon anticon-loading'></span>
</button>
<button class="ant-btn ant-btn-primary ant-btn-reload ant-btn-ripple">
<span class="anticon anticon-reload"></span>
<text>刷新</text>
</button>
</div>
</div>
</div>

### 元素类呈现效果

元素呈现指点击或滑过展现相关的内容或提示，如下拉菜单或弹出框等；

注：物体弹出点要从点击点出现，不要做凭空出现；


<div style="overflow: hidden;">

<div style="width:200px;float:left;margin-right:60px">
<p style="text-align: center;"> 1.icon菜单(点放大模式)</p>
<div class="ant-btn-domebox" >


<button class="ant-btn ant-btn-ghost ant-btn-circle-outline ant-btn-lg ant-btn-ripple ant-btn-listtip" style="float:right;margin:0" data-id="J-Tip">
  <span class="anticon anticon-bars"></span>
</button>
<div class="ant-anim-dometip ant-anim-topArrow scale-origin-iconTopRight" style="display:none;" id="J-Tip">
<ul>
<li>第一排文字元素</li>
<li>第二排文字元素</li>
<li>第三排文字元素</li>
<li>第四排文字元素</li>
</ul>
</div>
</div>
</div>

<div style="width:200px;float:left;">
<p style="text-align: center;">2.下拉菜单(下滑模式)</p>
<div class="ant-btn-domebox">


<div class="ant-dropdown-wrap">
<button class="ant-btn ant-btn-primary ant-btn-menu ant-btn-dropdown ant-btn-ripple">
  <span>菜单按钮</span>
  <span class="anticon anticon-down"></span>
</button>
<div class="ant-dropdown ant-anim-dometip scale-origin-top">
<div class="ant-dropdown-con">
<ul>
<li>第一排文字元素</li>
<li>第二排文字元素</li>
<li>第三排文字元素</li>
<li>第四排文字元素</li>
</ul>
</div>
</div>
</div>


</div>
</div>

</div>