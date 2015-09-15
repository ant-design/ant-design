# 指定节点动画进出场

- order: 3

通过加上 `enter-data` 属性来指定需要动画进场的元素，并且可以定义每个元素的动画效果。


---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  getInitialState() {
    return {
      enter: {
        type: 'right',
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
                <div className="title" enter-data={{type: 'bottom', queueId: 1}}></div>
                <ul>
                  <li enter-data={{type: 'bottom', queueId: 1}}></li>
                  <li enter-data={{type: 'bottom', queueId: 1}}></li>
                  <li enter-data={{type: 'bottom', queueId: 1}}></li>
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
, document.getElementById('components-enter-animation-demo-enter-data'));
````

<style>
#components-enter-animation-demo-enter-data {
  text-align: center;
  overflow: hidden;
  margin: 18px auto;
}
</style>
