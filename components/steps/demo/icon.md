# 带ICON图标的步骤条

- order: 2

通过设置 `Steps.Step` 的 `icon` 属性，可以启用自定义图标。

---

````jsx
import { Steps } from 'antd';
const Step = Steps.Step;

ReactDOM.render(<Steps>
  <Step status="finish" title="步骤1" icon="cloud" />
  <Step status="process" title="步骤2" icon="apple" />
  <Step status="wait" title="步骤3" icon="github" />
</Steps>, document.getElementById('components-steps-demo-icon'));
````
