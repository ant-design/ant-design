# 进场和离场

- order: 1

自动。

---

````jsx
var EnterAnimation = antd.EnterAnimation;
var Button = antd.Button;

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
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </div>
        <EnterAnimation>
          {this.state.show ?
            <div className="demo-content" key='a'>
              <div className="demo-kp">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="demo-listBox">
                <div className="demo-list">
                  <div className="title"></div>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
          </div> : null}
        </EnterAnimation>
      </div>
    );
  }
});

ReactDOM.render(<Test />
, document.getElementById('components-enter-animation-demo-basic'));
````

<style>
#components-enter-animation-demo-basic {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
