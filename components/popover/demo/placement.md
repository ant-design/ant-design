# 位置

- order: 1

位置有四个方向。

---

````jsx
import { Popover, Button } from 'antd';

const text = <span>标题</span>;
const content = <div>
  <p>内容</p>
  <p>内容</p>
</div>;

ReactDOM.render(<div>
  <Popover placement="left" title={text} overlay={content}>
    <Button>左</Button>
  </Popover>
  <Popover placement="top" title={text} overlay={content}>
    <Button>上</Button>
  </Popover>
  <Popover placement="bottom" title={text} overlay={content}>
    <Button>下</Button>
  </Popover>
  <Popover placement="right" title={text} overlay={content}>
    <Button>右</Button>
  </Popover>
</div>, document.getElementById('components-popover-demo-placement'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
}
</style>
