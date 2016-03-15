# 巧用过渡

- category: 十大原则
- order: 9
- subtitle: Use Transition

人脑灰质（Gray Matter）会对动态的事物（eg：移动、形变、色变等）保持敏感。在界面中，适当的加入一些过渡效果，能让界面保持生动，同时也能增强用户和界面的沟通。

- Adding: 新加入的信息元素应被告知如何使用，从页面转变的信息元素需被重新识别。
- Receding: 与当前页无关的信息元素应采用适当方式移除。
- Normal: 指那些从转场开始到结束都没有发生变化的信息元素。

---

## 在视图变化时保持上下文

<div class="video-player video-player-right"></div>

滑入与滑出：可以有效构建虚拟空间。

<br>

<div class="video-player video-player-right"></div>


传送带：可极大地扩展虚拟空间。

<br>

<div class="video-player video-player-right"></div>


折叠窗口：在视图切换时，有助于保持上下文，同时也能拓展虚拟空间。

<br>

<span class="waiting">视图定位 (敬请期待)</span>

<br>

---

## 解释刚刚发生了什么


<div class="video-player video-player-right"></div>


对象增加：在列表/表格中，新增了一个对象。

<br>

<div class="video-player video-player-right"></div>

对象删除：在列表/表格中，删除了一个对象。

<br>

<div class="video-player video-player-right"></div>

对象更改：在列表/表格中，更改了一个对象。

<br>

<div class="video-player video-player-right"></div>

对象呼出：点击页面中元素，呼出一个新对象。

---

## 改善感知性能

当无法有效提升『实际性能』时，可以考虑适当转移用户的注意力，来缩短某项操作的感知时间，改善感知性能。

<br>


<span class="waiting">图片（敬请期待）</span>


```__react
import scripts from '../../site/component/Motion/transition';
class ExecuteJS extends React.Component {
  componentDidMount() {
    scripts();
  }
  
  render() {
    return null;
  }
}

ReactDOM.render(<ExecuteJS key="execute" />, mountNode);
```
