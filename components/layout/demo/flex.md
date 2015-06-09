# Flex Basic

- order: 4 

Flex 布局基础

使用 `row-flex` 定义 `flex` 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。

---

````html

<div class="row-flex start">
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
</div>
<p>子元素居左排列</p>

<div class="row-flex center">
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
</div>
<p>子元素居中排列</p>

<div class="row-flex end">
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
</div>
<p>子元素居右排列</p>

<div class="row-flex space-between">
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
</div>
<p>子元素等宽排列</p>

<div class="row-flex space-around">
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
  <div class="col-4">2</div>
</div>
<p>子元素分散对齐</p>

````




