# 进场和离场

- order: 0

自动。

---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  getInitialState() {
    return {
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
        <EnterAnimation>
          {this.state.show ? <div key='a'>
            <div className="demo-header">
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
            <div className="demo-content" >
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
            <div className="demo-footer"></div>
          </div> : null}
        </EnterAnimation>
      </div>
    );
  }
});

React.render(<Test />
, document.getElementById('components-enter-animation-demo-basic'));
````

<style>
#components-enter-animation-demo-basic {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
