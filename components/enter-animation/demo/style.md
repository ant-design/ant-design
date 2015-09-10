# style自定义样式动画进出场

- order: 2

通过加上属性里的 `style` 来自定义 CSS 动画进出场,为了对齐去掉了 demo 里的一些元素。


---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  getInitialState(){
    return {
      enter:{
        style:{
          transform:"translateX(50px)",
          opacity:0
        },
        interval:.1,
      },
      leave:{
        interval:0.03
      },
      bool:true
    }
  },
  onClick(){
    this.setState({
      bool:!this.state.bool
    })
  },
  render() {
    return (
    <div>
      <div style={{marginBottom:20}}>
        <button className="ant-btn ant-btn-primary" onClick={this.onClick}>切换</button>
      </div>
      <EnterAnimation enter={this.state.enter} leave={this.state.leave}>
        {this.state.bool ? <div key='enter-data'>
        <div className="demo-content">
          <div className="demo-title" enter-data={{style:{opacity:0}}}>我是标题</div>
          <div className="demo-kp">
            <ul>
              <li enter-data></li>
              <li enter-data></li>
              <li enter-data></li>
            </ul>
          </div>
          <div className="demo-title" enter-data={{style:{opacity:0},queueId:1,delay:0.8}} leave-data={{delay:0.1}}>我是标题</div>
          <div className="demo-listBox">
            <div className="demo-list">
              <div className="title" enter-data={{style:{transform:'translateY(30px)',opacity:0},queueId:1}}></div>
              <ul>
                <li enter-data={{style:{transform:'translateY(30px)',opacity:0},queueId:1}}></li>
                <li enter-data={{style:{transform:'translateY(30px)',opacity:0},queueId:1}}></li>
                <li enter-data={{style:{transform:'translateY(30px)',opacity:0},queueId:1}}></li>
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
