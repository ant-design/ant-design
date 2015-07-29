# 默认

- order: 0

默认子节点进场动画。为避免与本站页面的进场冲突，所以 `EnterAnimation` 里延时 1 秒，递增 `interval` 为 0.3。

---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  render() {
    return (
      <EnterAnimation delay={1} interval={0.3}>
        <div className="demo-header" enter-data>
          <div className="logo">
            <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
            <span>logo</span>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="demo-content" enter-data>
          <div className="demo-title">我是标题</div>
          <div className="demo-kp">
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="demo-title">我是标题</div>
          <div className="demo-listBox">
            <div className="demo-list">
              <div className="title"></div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="demo-footer" enter-data></div>
      </EnterAnimation>
    );
  }
});

React.render(<Test />
, document.getElementById('components-enter-animation-demo-basic'));
````

<style>
#components-enter-animation-demo-basic {
  width: 600px;
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
