# Modal — 对话框

## 功能概述

模态对话框，用于需要用户处理事务又不希望跳转页面以致打断工作流程时使用。支持命令式和声明式调用，可实现确认、提示、输入等多种交互。

## 核心概念

### Modal 交互流程

```
用户触发 (Click)
     ↓
 Modal 打开 (open={true})
     ↓
 用户交互 (Click Button)
     ↓
 onOk/onCancel 回调执行
     ↓
 Modal 关闭 (open={false})
     ↓
 afterClose 生命周期
```

### 关键数据结构

```tsx
// 对话框配置
interface ModalConfig {
  title?: ReactNode; // 标题
  content?: ReactNode; // 内容
  okText?: ReactNode; // 确定按钮文本
  cancelText?: ReactNode; // 取消按钮文本
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  width?: string | number; // 宽度
  centered?: boolean; // 居中显示
  closable?: boolean; // 显示关闭按钮
  keyboard?: boolean; // ESC 关闭
  maskClosable?: boolean; // 点击遮罩关闭
  confirmLoading?: boolean; // 确定按钮加载状态
}

// 静态方法返回值
interface ModalInstance {
  destroy: () => void; // 销毁对话框
  update: (config) => void; // 更新配置
}

// Modal.useModal() 返回值
interface UseModalReturnType {
  modal: {
    confirm: (config) => ModalInstance;
    info: (config) => ModalInstance;
    success: (config) => ModalInstance;
    error: (config) => ModalInstance;
    warning: (config) => ModalInstance;
  };
  contextHolder: ReactNode;
}
```

## 输入字段

### 必填

- `open`: boolean，对话框是否可见（5.0+ 使用 `open` 替代 `visible`）。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | ReactNode | - | 对话框标题 |
| `children` | ReactNode | - | 对话框内容 |
| `footer` | ReactNode \| (originNode, extra) => ReactNode | - | 底部按钮区域 |
| `width` | string \| number | `520` | 对话框宽度 |
| `centered` | boolean | false | 垂直居中显示 |
| `closable` | boolean \| { closeIcon, disabled } | true | 显示关闭按钮 |
| `mask` | boolean | true | 显示遮罩 |
| `maskClosable` | boolean | true | 点击遮罩关闭 |
| `keyboard` | boolean | true | ESC 关闭 |
| `confirmLoading` | boolean | false | 确定按钮 loading |
| `okText` | ReactNode | `'确定'` | 确定按钮文字 |
| `cancelText` | ReactNode | `'取消'` | 取消按钮文字 |
| `okType` | `'primary'` \| `'default'` | `'primary'` | 确定按钮类型 |
| `loading` | boolean | false | 内容区域 loading（5.18.0+） |

### 按钮配置

- `okButtonProps`: ButtonProps，确定按钮属性。
- `cancelButtonProps`: ButtonProps，取消按钮属性。
- `onOk`: (e) => void | Promise<void>，确定回调。
- `onCancel`: (e) => void，取消回调。

### 样式和容器

- `destroyOnClose`: boolean，关闭时销毁子组件。
- `forceRender`: boolean，强制渲染 Modal 内容。
- `getContainer`: HTMLElement | () => HTMLElement | false，挂载节点。
- `zIndex`: number，z-index 值。
- `styles`: { header, body, footer, mask, wrapper, content }，各部分样式。
- `classNames`: object，各部分类名。

### 生命周期

- `afterOpenChange`: (open) => void，打开/关闭动画完成回调。
- `afterClose`: () => void，关闭后回调（已移除，使用 afterOpenChange）。

### Modal 静态方法

- `Modal.confirm(config)`: 确认对话框。
- `Modal.info(config)`: 信息提示。
- `Modal.success(config)`: 成功提示。
- `Modal.error(config)`: 错误提示。
- `Modal.warning(config)`: 警告提示。
- `Modal.destroyAll()`: 销毁所有对话框。

### Modal.useModal()

```tsx
const [modal, contextHolder] = Modal.useModal();
```

用于在 Context 中获取 modal 实例，避免受组件层级限制。

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
      // 模拟异步操作
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

## AI 生成指引

### 场景判断表

| 用户需求               | 选择方案                 | 关键属性                   |
| ---------------------- | ------------------------ | -------------------------- |
| 简单内容展示           | Modal 基础               | title, children, open      |
| 确认删除/操作          | Modal 或 Modal.confirm   | confirmLoading, onOk       |
| 表单输入               | Modal + Form             | 在 children 中添加 Form    |
| 异步操作（有 loading） | confirmLoading           | confirmLoading, async onOk |
| 提示/警告              | Modal.info/warning/error | 静态方法调用               |
| 自定义按钮             | footer 属性              | footer={[...]}             |
| 无底部按钮             | footer={null}            | footer                     |
| 全屏/大尺寸            | width 属性               | width={800} 或 width='90%' |
| 垂直居中               | centered                 | centered={true}            |
| Context 中使用         | Modal.useModal()         | modal 实例                 |
| 层级深的组件           | Modal.useModal()         | 避免 ref 穿刺              |

### 类型导入

```tsx
import type {
  ModalFuncProps, // 静态方法配置类型
  ModalProps, // Modal 组件 props 类型
} from 'antd';
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
