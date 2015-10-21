# 配置进出场的样式

- order: 2

配置进出场动画样式。


---

````jsx
var QueueAnim = antd.QueueAnim;
var Button = antd.Button;

var Test = React.createClass({
  getInitialState() {
    return {
      show: true,
    }
  },
  onClick() {
    this.setState({
      show: !this.state.show,
    })
  },
  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </div>
        <QueueAnim className="demo-content" key='demo' type={['right', 'left']}  ease={['easeOutQuart', 'easeInOutQuart']}>
          {this.state.show ? [<div className="demo-kp" key='a'>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>,
          <div className="demo-listBox" key='b'>
            <div className="demo-list">
            <div className="title"></div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>]: null}
        </QueueAnim>
      </div>
    );
  }
});

React.render(<Test />
, document.getElementById('components-queue-anim-demo-enter-leave'));
````

<style>
#components-queue-anim-demo-enter-leave {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
