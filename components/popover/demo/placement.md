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
  <Popover placement="leftTop" title={text} overlay={content} trigger="click">
    <button className="ant-btn">左上</button>
  </Popover>
  <Popover placement="left" title={text} overlay={content} trigger="click">
    <Button>左</Button>
  </Popover>
  <Popover placement="leftBottom" title={text} overlay={content} trigger="click">
    <button className="ant-btn">左下</button>
  </Popover>
  <br/>
  <Popover placement="topLeft" title={text} overlay={content} trigger="click">
    <button className="ant-btn">上左</button>
  </Popover>
  <Popover placement="top" title={text} overlay={content} trigger="click">
    <Button>上</Button>
  </Popover>
  <Popover placement="topRight" title={text} overlay={content} trigger="click">
    <button className="ant-btn">上右</button>
  </Popover>
  <br/>
  <Popover placement="bottomLeft" title={text} overlay={content} trigger="click">
    <button className="ant-btn">下左</button>
  </Popover>
  <Popover placement="bottom" title={text} overlay={content} trigger="click">
    <Button>下</Button>
  </Popover>
  <Popover placement="bottomRight" title={text} overlay={content} trigger="click">
    <button className="ant-btn">下右</button>
  </Popover>
  <br/>
  <Popover placement="rightTop" title={text} overlay={content} trigger="click">
    <button className="ant-btn">右上</button>
  </Popover>
  <Popover placement="right" title={text} overlay={content} trigger="click">
    <Button>右</Button>
  </Popover>
  <Popover placement="rightBottom" title={text} overlay={content} trigger="click">
    <button className="ant-btn">右下</button>
  </Popover>
</div>, document.getElementById('components-popover-demo-placement'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
