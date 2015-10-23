# 添加与删除

- order: 5

场景里有增加或删除信息的一个动画。

---

````jsx
var QueueAnim = antd.QueueAnim;
var Button = antd.Button;
var Test = React.createClass({
  getInitialState() {
    return {
      show: true,
      items: [<li key='0'></li>,<li key='1'></li>,<li key='2'></li>],
    }
  },
  onClick() {
    this.setState({
      show: !this.state.show,
    })
  },
  onAdd() {
    var items = this.state.items;
    items.push(<li key={Date.now()}></li>);
    this.setState({
      show: true,
      items: items,
    })
  },
  onRemove() {
    var items = this.state.items;
    items.splice(items.length-1, 1);
    this.setState({
      show: true,
      items: items,
    })
  },
  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <Button type="primary" onClick={this.onClick}>切换</Button>
          <Button type="primary" onClick={this.onAdd} style={{marginLeft:10}}>添加</Button>
          <Button type="primary" onClick={this.onRemove} style={{marginLeft:10}}>删除</Button>
        </div>
        <div className="demo-content">
            <div className="demo-listBox" key='b'>
              <div className="demo-list">
                <div className="title"></div>
                <QueueAnim component='ul' type={['right', 'left']}>
                  {this.state.show ? this.state.items: null}
                </QueueAnim>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Test />
, document.getElementById('components-queue-anim-demo-change'));
````

<style>
#components-queue-anim-demo-change {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
