# style 自定义样式动画进出场

- order: 4

通过加上属性里的 `style` 来自定义 CSS 动画进出场。


---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  getInitialState() {
    return {
      enter: {
        style: {
          transform: "translateX(50px)",
          opacity: 0
        },
        interval: .1,
      },
      leave: {
        interval: 0.03
      },
      show: true
    }
  },
  onClick() {
    this.setState({
      show: !this.state.show
    })
  },
  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <button className="ant-btn ant-btn-primary" onClick={this.onClick}>切换</button>
        </div>
        <EnterAnimation enter={this.state.enter} leave={this.state.leave}>
        {this.state.show ? <div key='enter-data'>
          <div className="demo-content">
            <div className="demo-kp">
              <ul>
                <li enter-data></li>
                <li enter-data></li>
                <li enter-data></li>
              </ul>
            </div>
            <div className="demo-listBox">
              <div className="demo-list">
                <div className="title" enter-data={{style: {transform: 'translateY(30px)', opacity: 0}, queueId: 1}}></div>
                <ul>
                  <li enter-data={{style: {transform: 'translateY(30px)', opacity: 0}, queueId: 1}}></li>
                  <li enter-data={{style: {transform: 'translateY(30px)', opacity: 0}, queueId: 1}}></li>
                  <li enter-data={{style: {transform: 'translateY(30px)', opacity: 0}, queueId: 1}}></li>
                </ul>
              </div>
            </div>
          </div>
        </div> : null}
        </EnterAnimation>
      </div>
    )
  }
});

React.render(<Test />
, document.getElementById('components-enter-animation-demo-style'));
````

<style>
#components-enter-animation-demo-style {
  text-align: center;
  overflow: hidden;
  margin: 18px auto;
}
</style>
