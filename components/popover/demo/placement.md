# 位置

- order: 1

位置有十二个方向。

---

````jsx
import { Popover, Button } from 'antd';

const text = <span>标题</span>;
const content = <div>
  <p>内容</p>
  <p>内容</p>
</div>;

ReactDOM.render(<div>
  <div style={{marginLeft: 60}}>
    <Popover placement="topLeft" title={text} overlay={content} trigger="click">
      <Button>上左</Button>
    </Popover>
    <Popover placement="top" title={text} overlay={content} trigger="click">
      <Button>上边</Button>
    </Popover>
    <Popover placement="topRight" title={text} overlay={content} trigger="click">
      <Button>上右</Button>
    </Popover>
  </div>
  <div style={{width: 60, float: 'left'}}>
    <Popover placement="leftTop" title={text} overlay={content} trigger="click">
      <Button>左上</Button>
    </Popover>
    <Popover placement="left" title={text} overlay={content} trigger="click">
      <Button>左边</Button>
    </Popover>
    <Popover placement="leftBottom" title={text} overlay={content} trigger="click">
      <Button>左下</Button>
    </Popover>
  </div>
  <div style={{width: 60, marginLeft: 270}}>
    <Popover placement="rightTop" title={text} overlay={content} trigger="click">
      <Button>右上</Button>
    </Popover>
    <Popover placement="right" title={text} overlay={content} trigger="click">
      <Button>右边</Button>
    </Popover>
    <Popover placement="rightBottom" title={text} overlay={content} trigger="click">
      <Button>右下</Button>
    </Popover>
  </div>
  <div style={{marginLeft: 60, clear: 'both'}}>
    <Popover placement="bottomLeft" title={text} overlay={content} trigger="click">
      <Button>下左</Button>
    </Popover>
    <Popover placement="bottom" title={text} overlay={content} trigger="click">
      <Button>下边</Button>
    </Popover>
    <Popover placement="bottomRight" title={text} overlay={content} trigger="click">
      <Button>下右</Button>
    </Popover>
  </div>
</div>, document.getElementById('components-popover-demo-placement'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
