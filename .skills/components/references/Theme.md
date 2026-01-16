# Theme — 主题

## 功能概述

Ant Design 5.0 使用 CSS-in-JS 技术，支持动态主题、混合主题、算法生成等能力。

## 应用场景

- 需要在页面中以一致样式呈现主题能力时。

## 输入字段

### Theme 属性

#### 必填

- 无必填属性。

#### 可选

- `token`: `AliasToken`，用于修改 Design Token。
- `inherit`: boolean，继承上层 ConfigProvider 中配置的主题，默认 true。
- `algorithm`: `(token: SeedToken) => MapToken` | `((token: SeedToken) => MapToken)[]`，用于修改 Seed Token 到 Map Token 的算法，默认 `defaultAlgorithm`。
- `components`: `ComponentsConfig`，用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token。
- `cssVar`: [cssVar](#css-var)，CSS 变量配置。
- `hashed`: boolean，将样式添加至 hash className 上，默认 true。
- `zeroRuntime`: boolean，开启零运行时模式，不会在运行时产生样式，需要手动引入 CSS 文件，默认 true，版本 6.0.0。

### ComponentsConfig 属性

#### 必填

- 无必填属性。

#### 可选

- ``Component` (可以是任意 antd 组件名，如 `Button`)`: `ComponentToken & AliasToken & { algorithm: boolean | (token: SeedToken) => MapToken`|`((token: SeedToken) => MapToken)[]}`，用于修改 Component Token 以及覆盖该组件消费的 Alias Token。

### cssVar 属性

#### 必填

- 无必填属性。

#### 可选

- `prefix`: string，CSS 变量的前缀，默认与 ConfigProvider 上配置的 `prefixCls` 相同，默认 `ant`。
- `key`: string，当前主题的唯一识别 key，默认用 `useId` 填充，默认 `useId` in React 18。

## 方法

无公开方法。

## 使用建议

优先通过 `ConfigProvider` 统一设置 `theme.token` 与 `theme.algorithm`；局部主题用嵌套 `ConfigProvider`；组件级定制放在 `theme.components`；需要 CSS 变量时启用 `cssVar`。

## 示例代码

```tsx
import { Button, ConfigProvider, Space, theme } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <Button type="primary">Green Primary</Button>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div style={{ background: '#141414', padding: 24 }}>
        <Button type="primary">Dark Theme</Button>
      </div>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <Button type="primary">Compact Theme</Button>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <div style={{ background: '#141414', padding: 24 }}>
        <Button type="primary">Dark Compact</Button>
      </div>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#00b96b',
            algorithm: true, // 启用算法
          },
        },
      }}
    >
      <Button type="primary">Custom Button</Button>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        token: { colorPrimary: '#1677ff' },
      }}
    >
      <Button type="primary">Blue</Button>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#00b96b' },
        }}
      >
        <Button type="primary">Green</Button>
      </ConfigProvider>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
      }}
    >
      <Button type="primary">CSS Variables</Button>
    </ConfigProvider>
  </Space>
);

const ThemeInfo: React.FC = () => {
  const { token } = theme.useToken();

  return <div style={{ color: token.colorPrimary }}>Primary Color: {token.colorPrimary}</div>;
};
```

## 返回结果

提供主题定制能力，影响所有 antd 组件的样式。
