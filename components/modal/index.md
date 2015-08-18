# Modal

- order: 11
- category: Components
- chinese: 对话框

---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `ant.confirm()` 。


## API


| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | React.Element    | 无           |
| mousePosition      | 鼠标位置，设置弹窗初始位置           | {x:number,y:number}   | 无           |
| onOk       | 点击确定回调       | function         | 无           |
| onCancel   | 点击遮罩层或右上角叉或取消按钮的回调  | function  | 无           |
| width      | 宽度           | String or Number | 500           |
| footer     | 底部内容       | React.Element    | 确定取消按钮 |


### confirm()

`confirm` 为一个方法，参数为 object，具体属性如下：

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | React.Element or String    | 无           |
| onOk       | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭      | function         | 无           |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭       | function         | 无           |
| width      | 宽度           | String or Number | 375           |
| iconClassName | 图标样式名 | String | anticon-exclamation-circle |
