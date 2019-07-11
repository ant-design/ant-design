---
type: 反馈
category: Components
subtitle: 对话框
title: Modal
---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用 `Modal.confirm()` 等语法糖方法。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | function | 无 |  |
| bodyStyle | Modal body 样式 | object | {} |  |
| cancelText | 取消按钮文字 | string\|ReactNode | 取消 |  |
| centered | 垂直居中展示 Modal | Boolean | `false` | 3.8.0 |
| closable | 是否显示右上角的关闭按钮 | boolean | true |  |
| confirmLoading | 确定按钮 loading | boolean | 无 |  |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false | 3.1.0 |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer={null}` | string\|ReactNode | 确定取消按钮 |  |
| forceRender | 强制渲染 Modal | boolean | false | 3.12.0 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true | 3.4.2 |
| mask | 是否展示遮罩 | Boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |  |
| maskStyle | 遮罩样式 | object | {} |  |
| okText | 确认按钮文字 | string\|ReactNode | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button) | - | 3.7.0 |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button) | - | 3.7.0 |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |  |
| title | 标题 | string\|ReactNode | 无 |  |
| visible | 对话框是否可见 | boolean | 无 |  |
| width | 宽度 | string\|number | 520 |  |
| wrapClassName | 对话框外层容器的类名 | string | - |  |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |  |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |  |
| onOk | 点击确定回调 | function(e) | 无 |  |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。

### Modal.method()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocusButton | 指定自动获得焦点的按钮 | null\|string: `ok` `cancel` | `ok` | 3.10.0 |
| cancelText | 设置 Modal.confirm 取消按钮文字 | string | 取消 |  |
| centered | 垂直居中展示 Modal | Boolean | `false` | 3.8.2 |
| className | 容器类名 | string | - | 3.1.1 |
| content | 内容 | string\|ReactNode | 无 |  |
| icon | 自定义图标（3.12.0 新增） | string\|ReactNode | `<Icon type="question-circle">` | 3.12.0 |
| iconType | 图标类型（3.12.0 后废弃，请使用 `icon`） | string | `question-circle` |  |
| mask | 是否展示遮罩 | Boolean | true | 3.13.0 |
| maskClosable | 点击蒙层是否允许关闭 | Boolean | `false` |  |
| okText | 确认按钮文字 | string | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button) | - | 3.10.0 |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button) | - | 3.10.0 |
| title | 标题 | string\|ReactNode | 无 |  |
| width | 宽度 | string\|number | 416 |  |
| zIndex | 设置 Modal 的 `z-index` | Number | 1000 |  |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |  |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |  |

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。

```jsx
const modal = Modal.info();

modal.update({
  title: '修改的标题',
  content: '修改的内容',
});

modal.destroy();
```

<style>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>

- `Modal.destroyAll`

使用 `Modal.destroyAll()` 可以销毁弹出的确认窗（即上述的 Modal.info、Modal.success、Modal.error、Modal.warning、Modal.confirm）。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题，而不用各处去使用实例的返回值进行关闭（modal.destroy() 适用于主动关闭，而不是路由这样被动关闭）

```jsx
import { browserHistory } from 'react-router';

// router change
browserHistory.listen(() => {
  Modal.destroyAll();
});
```
