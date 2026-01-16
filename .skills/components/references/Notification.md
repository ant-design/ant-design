# Notification — 通知提醒框

## 功能概述

全局展示通知提醒信息。

## 应用场景

- 在系统四个角显示通知提醒信息。经常用于以下情况。
- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 输入字段

### Notification.config 属性

#### 必填

- `description`: ReactNode，通知提醒内容，必选。

#### 可选

- `actions`: ReactNode，自定义按钮组，版本 5.24.0。
- `~~btn~~`: ReactNode，自定义按钮组，请使用 `actions` 替换。
- `className`: string，自定义 CSS class。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `closable`: boolean | [ClosableType](#closabletype)，是否显示右上角的关闭按钮，默认 true。
- `closeIcon`: ReactNode，自定义关闭图标，默认 true，版本 5.7.0：设置为 null 或 false 时隐藏关闭按钮。
- `duration`: number | false，默认 4.5 秒后自动关闭，配置为 `0 | false` 则不会自动关闭，默认 4.5。
- `showProgress`: boolean，显示自动关闭通知框的进度条，版本 5.18.0。
- `pauseOnHover`: boolean，悬停时是否暂停计时器，默认 true，版本 5.18.0。
- `icon`: ReactNode，自定义图标。
- `key`: string，当前通知唯一标志。
- `title`: ReactNode，通知提醒标题，版本 6.0.0。
- `~~message~~`: ReactNode，通知提醒标题，请使用 `title` 替换。
- `placement`: string，弹出位置，可选 `top` | `topLeft` | `topRight` | `bottom` | `bottomLeft` | `bottomRight`，默认 `topRight`。
- `role`: `alert | status`，供屏幕阅读器识别的通知内容语义，默认为 `alert`。此情况下屏幕阅读器会立即打断当前正在阅读的其他内容，转而阅读通知内容，默认 `alert`，版本 5.6.0。
- `style`: [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794)，自定义内联样式。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `onClick`: function，点击通知时触发的回调函数。
- `onClose`: function，当通知关闭时触发。
- `props`: Object，透传至通知 `div` 上的 props 对象，支持传入 `data-*` `aria-*` 或 `role` 作为对象的属性。需要注意的是，虽然在 TypeScript 类型中声明的类型支持传入 `data-*` 作为对象的属性，但目前只允许传入 `data-testid` 作为对象的属性。 详见 https://github.com/microsoft/TypeScript/issues/28960。

### notification.useNotification 属性

#### 必填

- 无必填属性。

#### 可选

- `bottom`: number，消息从底部弹出时，距离底部的位置，单位像素，默认 24。
- `closeIcon`: ReactNode，自定义关闭图标，默认 true，版本 5.7.0：设置为 null 或 false 时隐藏关闭按钮。
- `getContainer`: () => HTMLNode，配置渲染节点的输出位置，默认 () => document.body。
- `placement`: string，弹出位置，可选 `top` | `topLeft` | `topRight` | `bottom` | `bottomLeft` | `bottomRight`，默认 `topRight`。
- `showProgress`: boolean，显示自动关闭通知框的进度条，版本 5.18.0。
- `pauseOnHover`: boolean，悬停时是否暂停计时器，默认 true，版本 5.18.0。
- `rtl`: boolean，是否开启 RTL 模式，默认 false。
- `stack`: boolean | `{ threshold: number }`，堆叠模式，超过阈值时会将所有消息收起，默认 `{ threshold: 3 }`，版本 5.10.0。
- `top`: number，消息从顶部弹出时，距离顶部的位置，单位像素，默认 24。
- `maxCount`: number，最大显示数，超过限制时，最早的消息会被自动关闭，版本 4.17.0。

### ClosableType 属性

#### 必填

- 无必填属性。

#### 可选

- `closeIcon`: ReactNode，自定义关闭图标，默认 undefined。
- `onClose`: function，当通知关闭时触发。

### notification.config 属性

#### 必填

- 无必填属性。

#### 可选

- `bottom`: number，消息从底部弹出时，距离底部的位置，单位像素，默认 24。
- `closeIcon`: ReactNode，自定义关闭图标，默认 true，版本 5.7.0：设置为 null 或 false 时隐藏关闭按钮。
- `duration`: number，默认自动关闭延时，单位秒，默认 4.5。
- `showProgress`: boolean，显示自动关闭通知框的进度条，版本 5.18.0。
- `pauseOnHover`: boolean，悬停时是否暂停计时器，默认 true，版本 5.18.0。
- `getContainer`: () => HTMLNode，配置渲染节点的输出位置，但依旧为全屏展示，默认 () => document.body。
- `placement`: string，弹出位置，可选 `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight`，默认 `topRight`。
- `rtl`: boolean，是否开启 RTL 模式，默认 false。
- `top`: number，消息从顶部弹出时，距离顶部的位置，单位像素，默认 24。
- `maxCount`: number，最大显示数，超过限制时，最早的消息会被自动关闭，版本 4.17.0。

## 方法

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.open(config)`
- `notification.destroy(key?: String)`
- `notification.useNotification(config)`

## 使用建议

复杂通知内容优先使用 notification；简单反馈使用 message；需要操作按钮时使用 `btn` 属性。

## 示例代码

```tsx
import { Button, notification, Space } from 'antd';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
    api[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
    });
  };

  const openWithBtn = () => {
    api.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      btn: (
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Confirm
        </Button>
      ),
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotification('success')}>Success</Button>
        <Button onClick={() => openNotification('error')}>Error</Button>
        <Button onClick={openWithBtn}>With Button</Button>
      </Space>
    </>
  );
};
```

## 返回结果

在页面角落显示通知提醒框。
