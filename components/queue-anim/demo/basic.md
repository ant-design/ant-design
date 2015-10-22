# 进场和离场

- order: 1

自动。

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
        <QueueAnim className="demo-content">
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
            </div>] : null}
        </QueueAnim>
      </div>
    );
  }
});

React.render(<Test />
, document.getElementById('components-queue-anim-demo-basic'));
````

<style>
#components-queue-anim-demo-basic {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
