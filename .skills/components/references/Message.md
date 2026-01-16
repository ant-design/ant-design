# Message — 全局提示

## 功能概述

全局展示操作反馈信息。

## 应用场景

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 输入字段

### Message 属性

#### 必填

- 无必填属性。

#### 可选

- `content`: ReactNode | config，提示内容。
- `duration`: number，自动关闭的延时，单位秒。设为 0 时不自动关闭，默认 3。
- `onClose`: function，关闭时触发的回调函数。

### Message.config 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，自定义 CSS class。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `content`: ReactNode，提示内容。
- `duration`: number，自动关闭的延时，单位秒。设为 0 时不自动关闭，默认 3。
- `icon`: ReactNode，自定义图标。
- `pauseOnHover`: boolean，悬停时是否暂停计时器，默认 true。
- `key`: string | number，当前提示的唯一标志。
- `style`: [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794)，自定义内联样式。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `onClick`: function，点击 message 时触发的回调函数。

### message.config 属性

#### 必填

- 无必填属性。

#### 可选

- `duration`: number，默认自动关闭延时，单位秒，默认 3。
- `getContainer`: () => HTMLElement，配置渲染节点的输出位置，但依旧为全屏展示，默认 () => document.body。
- `maxCount`: number，最大显示数，超过限制时，最早的消息会被自动关闭。
- `prefixCls`: string，消息节点的 className 前缀，默认 `ant-message`，版本 4.5.0。
- `rtl`: boolean，是否开启 RTL 模式，默认 false。
- `top`: string | number，消息距离顶部的位置，默认 8。

## 方法

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.loading(content, [duration], onClose)`
- `message[level](content, [duration]).then(afterClose)`
- `message[level](content, [duration], onClose).then(afterClose)`
- `message.open(config)`
- `message.success(config)`
- `message.error(config)`
- `message.info(config)`
- `message.warning(config)`
- `message.loading(config)`
- `message.config(options)`
- `message.destroy()`

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
