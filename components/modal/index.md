# Modal

- category: Components
- chinese: 对话框

---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## API

是个方法，参数只有一个 object ，具体成员如下

| 成员     | 说明           | 类型             | 默认值       |
|----------|----------------|------------------|--------------|
| title    | 标题           | React.Element    | 无           |
| content  | 面板内容       | React.Element    | 无           |
| onOk     | 确定回调       | function         | 无           |
| onCancel | 取消回调       | function         | 无           |
| width    | 宽度           | String or Number | 无           |

