# 指定节点动画进出场

- order: 1

通过加上 `enter-data` 属性来指定需要动画进场的元素，并且可以定义每个元素的动画效果。


---

````jsx
var EnterAnimation = antd.EnterAnimation;

var Test = React.createClass({
  getInitialState(){
    return {
      enter:{
        type:'right',
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
        <div className="demo-header" enter-data={{type: 'alpha'}}>
          <div className="logo" enter-data={{type: 'left'}}>
            <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"/>
            <span>logo</span>
          </div>
          <ul>
            <li enter-data></li>
            <li enter-data></li>
            <li enter-data></li>
            <li enter-data></li>
            <li enter-data></li>
          </ul>
        </div>
        <div className="demo-content">
          <div className="demo-title" enter-data={{type:'alpha'}}>我是标题</div>
          <div className="demo-kp">
            <ul>
              <li enter-data></li>
              <li enter-data></li>
              <li enter-data></li>
            </ul>
          </div>
          <div className="demo-title" enter-data={{type:'alpha',queueId:1,delay:0.8}} leave-data={{delay:0.1}}>我是标题</div>
          <div className="demo-listBox">
            <div className="demo-list">
              <div className="title" enter-data={{type:'bottom',queueId:1}}></div>
              <ul>
                <li enter-data={{type:'bottom',queueId:1}}></li>
                <li enter-data={{type:'bottom',queueId:1}}></li>
                <li enter-data={{type:'bottom',queueId:1}}></li>
                <li enter-data={{type:'bottom',queueId:1}}></li>
                <li enter-data={{type:'bottom',queueId:1}}></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="demo-footer" enter-data={{type:'bottom',queueId:1}}></div>
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
  width: 600px;
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
