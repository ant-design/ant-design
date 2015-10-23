# 页面的进场和离场

- order: 6

页面的进场和离场。

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
           <QueueAnim key='a' type={['right','left']}>
            {this.state.show ? [<div className="demo-header" key='header'>
              <div className="logo" key='logo'>
                <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                <span>logo</span>
              </div>
              <QueueAnim component='ul'>
                <li key='li0'></li>
                <li key='li1'></li>
                <li key='li2'></li>
                <li key='li3'></li>
                <li key='li4'></li>
              </QueueAnim>
            </div>,
            <QueueAnim className="demo-content" key='content' delay={300}>
              <div className="demo-title" key='title'>我是标题</div>
              <div className="demo-kp" key='b'>
                <QueueAnim component='ul'>
                  <li key='t_li0'></li>
                  <li key='t_li1'></li>
                  <li key='t_li2'></li>
                </QueueAnim>
              </div>
              <div className="demo-title" key='title2'>我是标题</div>
              <div className="demo-listBox">
                <QueueAnim className="demo-list" delay={500}>
                  <div className="title" key='title3'></div>
                  <QueueAnim component='ul' type='bottom' key='li'>
                    <li key='tt_li0'></li>
                    <li key='tt_li1'></li>
                    <li key='tt_li2'></li>
                    <li key='tt_li3'></li>
                    <li key='tt_li4'></li>
                  </QueueAnim>
                </QueueAnim>
              </div>
            </QueueAnim>,
            <QueueAnim key='footerBox' delay={1000} type='bottom'><div className="demo-footer" key='footer'></div></QueueAnim>] : null}
          </QueueAnim>
      </div>
    );
  }
});

ReactDOM.render(<Test />
, document.getElementById('components-queue-anim-demo-page'));
````
<style>
#components-queue-anim-demo-page {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
