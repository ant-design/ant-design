# Modal — 对话框

## 功能概述

展示一个对话框，提供标题、内容区、操作区。

## 应用场景

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。
- 另外当需要一个简洁的确认框询问用户时，可以使用 [`App.useApp`](/components/app-cn/) 封装的语法糖方法。

## 输入字段

### Modal 属性

#### 必填

- 无必填属性。

#### 可选

- `afterClose`: function，Modal 完全关闭后的回调。
- `cancelButtonProps`: [ButtonProps](/components/button-cn#api)，cancel 按钮 props。
- `cancelText`: ReactNode，取消按钮文字，默认 `取消`。
- `centered`: boolean，垂直居中展示 Modal，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Modal 组件内部各语义化结构的 class，支持对象或函数。
- `closable`: boolean | [ClosableType](#closabletype)，是否显示右上角的关闭按钮，默认 true。
- `closeIcon`: ReactNode，自定义关闭图标。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮，默认 <CloseOutlined />。
- `confirmLoading`: boolean，确定按钮 loading，默认 false。
- `~~destroyOnClose~~`: boolean，关闭时销毁 Modal 里的子元素，默认 false。
- `destroyOnHidden`: boolean，关闭时销毁 Modal 里的子元素，默认 false，版本 5.25.0。
- `~~focusTriggerAfterClose~~`: boolean，对话框关闭后是否需要聚焦触发元素。请使用 `focusable.focusTriggerAfterClose` 替代，默认 true，版本 4.9.0。
- `footer`: ReactNode | (originNode: ReactNode, extra: { OkBtn: React.FC, CancelBtn: React.FC }) => ReactNode，底部内容，当不需要默认底部按钮时，可以设为 `footer={null}`，默认 (确定取消按钮)，版本 renderFunction: 5.9.0。
- `forceRender`: boolean，强制渲染 Modal，默认 false。
- `focusable`: `{ trap?: boolean, focusTriggerAfterClose?: boolean }`，对话框内焦点管理的配置，版本 6.2.0。
- `getContainer`: HTMLElement | () => HTMLElement | Selectors | false，指定 Modal 挂载的节点，但依旧为全屏展示，`false` 为挂载在当前位置，默认 document.body。
- `keyboard`: boolean，是否支持键盘 esc 关闭，默认 true。
- `mask`: boolean | `{enabled: boolean, blur: boolean}`，遮罩效果，默认 true。
- `maskClosable`: boolean，点击蒙层是否允许关闭，默认 true。
- `modalRender`: (node: ReactNode) => ReactNode，自定义渲染对话框，版本 4.7.0。
- `okButtonProps`: [ButtonProps](/components/button-cn#api)，ok 按钮 props。
- `okText`: ReactNode，确认按钮文字，默认 `确定`。
- `okType`: string，确认按钮类型，默认 `primary`。
- `style`: CSSProperties，可用于设置浮层的样式，调整浮层位置等。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义 Modal 组件内部各语义化结构的行内 style，支持对象或函数。
- `loading`: boolean，显示骨架屏，版本 5.18.0。
- `title`: ReactNode，标题。
- `open`: boolean，对话框是否可见。
- `width`: string | number | [Breakpoint](/components/grid-cn#col)，宽度，默认 520，版本 Breakpoint: 5.23.0。
- `wrapClassName`: string，对话框外层容器的类名。
- `zIndex`: number，设置 Modal 的 `z-index`，默认 1000。
- `onCancel`: function(e)，点击遮罩层或右上角叉或取消按钮的回调。
- `onOk`: function(e)，点击确定回调。
- `afterOpenChange`: (open: boolean) => void，打开和关闭 Modal 时动画结束后的回调，版本 5.4.0。

### Modal.method() 属性

#### 必填

- 无必填属性。

#### 可选

- `afterClose`: function，Modal 完全关闭后的回调，版本 4.9.0。
- `~~autoFocusButton~~`: null | `ok` | `cancel`，指定自动获得焦点的按钮。请使用 `focusable.autoFocusButton` 替代，默认 `ok`。
- `cancelButtonProps`: [ButtonProps](/components/button-cn#api)，cancel 按钮 props。
- `cancelText`: string，设置 Modal.confirm 取消按钮文字，默认 `取消`。
- `centered`: boolean，垂直居中展示 Modal，默认 false。
- `className`: string，容器类名。
- `closable`: boolean | [ClosableType](#closabletype)，是否显示右上角的关闭按钮，默认 false。
- `closeIcon`: ReactNode，自定义关闭图标，默认 undefined，版本 4.9.0。
- `content`: ReactNode，内容。
- `focusable.autoFocusButton`: null | `ok` | `cancel`，指定自动获得焦点的按钮，默认 `ok`，版本 6.2.0。
- `footer`: ReactNode | (originNode: ReactNode, extra: { OkBtn: React.FC, CancelBtn: React.FC }) => ReactNode，底部内容，当不需要默认底部按钮时，可以设为 `footer: null`，版本 renderFunction: 5.9.0。
- `getContainer`: HTMLElement | () => HTMLElement | Selectors | false，指定 Modal 挂载的 HTML 节点，false 为挂载在当前 dom，默认 document.body。
- `icon`: ReactNode，自定义图标，默认 <ExclamationCircleFilled />。
- `keyboard`: boolean，是否支持键盘 esc 关闭，默认 true。
- `mask`: boolean | `{enabled: boolean, blur: boolean}`，遮罩效果，默认 true。
- `maskClosable`: boolean，点击蒙层是否允许关闭，默认 false。
- `okButtonProps`: [ButtonProps](/components/button-cn#api)，ok 按钮 props。
- `okText`: string，确认按钮文字，默认 `确定`。
- `okType`: string，确认按钮类型，默认 `primary`。
- `style`: CSSProperties，可用于设置浮层的样式，调整浮层位置等。
- `title`: ReactNode，标题。
- `width`: string | number，宽度，默认 416。
- `wrapClassName`: string，对话框外层容器的类名，版本 4.18.0。
- `zIndex`: number，设置 Modal 的 `z-index`，默认 1000。
- `onCancel`: function(close)，点击取消回调，参数为关闭函数，若返回 promise 时 resolve 为正常关闭, reject 为不关闭。
- `onOk`: function(close)，点击确定回调，参数为关闭函数，若返回 promise 时 resolve 为正常关闭, reject 为不关闭。

### ClosableType 属性

#### 必填

- 无必填属性。

#### 可选

- `afterClose`: function，Modal 完全关闭后的回调。
- `closeIcon`: ReactNode，自定义关闭图标，默认 undefined。
- `disabled`: boolean，关闭图标是否禁用，默认 false。
- `onClose`: Function，弹窗关闭即时调用，默认 undefined。

## 方法

- `Modal.method()` RTL 模式仅支持 hooks 用法。
- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`
- `Modal.destroyAll`

## 常见场景示例

### 场景 1: 基础对话框

```tsx
import { useState } from 'react';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="对话框标题"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>这是对话框的内容</p>
      </Modal>
    </>
  );
};
```

### 场景 2: 确认对话框（带 loading）

```tsx
import { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('确认成功');
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        删除确认
      </Button>
      <Modal
        title="确认删除"
        open={open}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>您确定要删除这条记录吗？此操作不可恢复。</p>
      </Modal>
    </>
  );
};
```

### 场景 3: 自定义底部按钮

```tsx
import { useState } from 'react';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>自定义按钮</Button>
      <Modal
        title="自定义底部"
        open={open}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            返回
          </Button>,
          <Button key="save" type="primary" onClick={() => setOpen(false)}>
            保存草稿
          </Button>,
          <Button key="submit" type="primary" onClick={() => setOpen(false)}>
            提交
          </Button>,
        ]}
        onCancel={() => setOpen(false)}
      >
        <p>自定义底部按钮布局</p>
      </Modal>
    </>
  );
};
```

### 场景 4: 隐藏底部按钮

```tsx
import { useState } from 'react';
import { Button, Divider, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>信息提示</Button>
      <Modal
        title="提示"
        open={open}
        footer={null} // 隐藏底部
        closable={true} // 显示关闭按钮
        onCancel={() => setOpen(false)}
      >
        <p>这是一个信息提示，点击 X 关闭。</p>
      </Modal>
    </>
  );
};
```

### 场景 5: 静态方法调用

```tsx
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const App: React.FC = () => (
  <>
    <Button
      onClick={() => {
        Modal.confirm({
          title: '确认删除',
          icon: <ExclamationCircleOutlined />,
          content: '是否删除该项？',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            console.log('确定');
          },
          onCancel() {
            console.log('取消');
          },
        });
      }}
    >
      确认框
    </Button>

    <Button
      onClick={() => {
        Modal.info({
          title: '信息',
          content: '这是一条信息提示',
        });
      }}
    >
      信息框
    </Button>

    <Button
      onClick={() => {
        Modal.success({
          title: '成功',
          content: '操作成功！',
        });
      }}
    >
      成功框
    </Button>

    <Button
      onClick={() => {
        Modal.error({
          title: '错误',
          content: '操作失败，请重试。',
        });
      }}
    >
      错误框
    </Button>
  </>
);
```

### 场景 6: Modal.useModal() - Context 方式

```tsx
import { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const DemoContent: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const handleShowModal = () => {
    modal.confirm({
      title: 'Context 确认框',
      content: '使用 Modal.useModal() 获取实例',
      onOk() {
        console.log('OK');
      },
    });
  };

  return (
    <>
      <Button onClick={handleShowModal}>显示确认框</Button>
      {contextHolder}
    </>
  );
};

const App: React.FC = () => <DemoContent />;
```

## 使用建议

表单场景配合 `confirmLoading` 防止重复提交；需要 Context 时使用 `Modal.useModal()`；简单确认使用静态方法；复杂交互使用声明式；异步操作在 `onOk` 中返回 Promise 自动处理 loading；使用 `destroyOnClose` 释放内存；使用 `centered` 改善视觉体验。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>Modal content...</p>
      </Modal>
    </>
  );
};
```

## 返回结果

渲染一个模态对话框，提供确认、取消等交互操作。
