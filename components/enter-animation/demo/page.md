# 页面的进场和离场

- order: 5

页面的进场和离场。

---

````jsx
var EnterAnimation = antd.EnterAnimation;
var Button = antd.Button;

var Test = React.createClass({
  getInitialState() {
    return {
      show: true,
      enter:{
        type:'right',
        ease:'cubic-bezier(0.19, 1, 0.22, 1)'
      },
      leave:{
        type:'left',
        ease:'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        reverse:true,
        interval:0.05
      }
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
        <EnterAnimation enter={this.state.enter} leave={this.state.leave}>
          {this.state.show ? <div key='a'>
            <div className="demo-header" enter-data leave-data={{type:'alpha'}}>
              <div className="logo" leave-data={{type:'left'}}>
                <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                <span>logo</span>
              </div>
              <ul >
                <li enter-data leave-data={{type:'right'}}></li>
                <li enter-data leave-data={{type:'right'}}></li>
                <li enter-data leave-data={{type:'right'}}></li>
                <li enter-data leave-data={{type:'right'}}></li>
                <li enter-data leave-data={{type:'right'}}></li>
              </ul>
            </div>
            <div className="demo-content" >
              <div className="demo-title" enter-data={{type:'bottom'}} leave-data={{type:'bottom',queueId:1}}>我是标题</div>
              <div className="demo-kp">
                <ul>
                  <li enter-data={{interval:0.05}} leave-data={{type:'bottom',queueId:1}}></li>
                  <li enter-data={{interval:0.05}} leave-data={{type:'bottom',queueId:1}}></li>
                  <li enter-data={{interval:0.05}} leave-data={{type:'bottom',queueId:1,delay:0.2}}></li>
                </ul>
              </div>
              <div className="demo-title" enter-data={{type:'bottom'}} leave-data={{type:'bottom',queueId:2}}>我是标题</div>
              <div className="demo-listBox">
                <div className="demo-list">
                  <div className="title" enter-data={{type:'bottom'}} leave-data={{queueId:2}}></div>
                  <ul>
                    <li enter-data={{type:'bottom'}} leave-data={{queueId:2}}></li>
                    <li enter-data={{type:'bottom'}} leave-data={{queueId:2}}></li>
                    <li enter-data={{type:'bottom'}} leave-data={{queueId:2}}></li>
                    <li enter-data={{type:'bottom'}} leave-data={{queueId:2}}></li>
                    <li enter-data={{type:'bottom'}} leave-data={{queueId:2}}></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="demo-footer" enter-data={{type:'bottom'}} leave-data={{queueId:2}}></div>
          </div> : null}
        </EnterAnimation>
      </div>
    );
  }
});

React.render(<Test />
, document.getElementById('components-enter-animation-demo-page'));
````

<style>
#components-enter-animation-demo-page {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
