# Message — 全局提示

## 功能概述

全局展示操作反馈信息。可提供成功、警告和错误等反馈信息。

## 输入字段

### 静态方法

- `message.success(content, [duration], [onClose])`: 成功提示。
- `message.error(content, [duration], [onClose])`: 错误提示。
- `message.info(content, [duration], [onClose])`: 信息提示。
- `message.warning(content, [duration], [onClose])`: 警告提示。
- `message.loading(content, [duration], [onClose])`: 加载提示。
- `message.open(config)`: 自定义配置提示。
- `message.destroy()`: 销毁所有提示。

### config 参数

- `content`: ReactNode，提示内容。
- `duration`: number，持续时间（秒），默认 `3`，设为 `0` 不自动关闭。
- `type`: string，提示类型，可选 `success` | `error` | `info` | `warning` | `loading`。
- `icon`: ReactNode，自定义图标。
- `key`: string | number，唯一标识，用于更新消息。
- `className`: string，自定义类名。
- `style`: CSSProperties，自定义样式。
- `onClick`: () => void，点击回调。
- `onClose`: () => void，关闭回调。

### message.config(options)

全局配置：

- `top`: number，距离顶部距离，默认 `8`。
- `duration`: number，默认持续时间，默认 `3`。
- `maxCount`: number，最大显示数量。
- `prefixCls`: string，样式前缀。
- `getContainer`: () => HTMLElement，挂载容器。
- `rtl`: boolean，RTL 模式。

### Hooks 用法（推荐）

```tsx
const [messageApi, contextHolder] = message.useMessage();
```

- `messageApi`: 与静态方法相同的 API。
- `contextHolder`: 需要放在 JSX 中的占位元素。

## 使用建议

操作反馈使用全局提示；需要 Context 时使用 `message.useMessage()`；加载过程使用 `message.loading` 并手动关闭。

## 示例代码

```tsx
import { Button, message, Space } from 'antd';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const loading = () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
    // 手动关闭
    setTimeout(messageApi.destroy, 2500);
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={loading}>Loading</Button>
      </Space>
    </>
  );
};
```

## 返回结果

在页面顶部居中显示全局提示消息，自动消失。
