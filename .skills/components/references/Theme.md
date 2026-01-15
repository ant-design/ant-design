# theme — 主题

## 功能概述

Ant Design 5.0 使用 CSS-in-JS 技术，支持动态主题、混合主题、算法生成等能力。

## 使用方式

通过 ConfigProvider 的 theme 属性配置主题。

## Token 系统

Ant Design 5.0 的主题基于 Design Token 体系构建。

### Token 分类

1. **Seed Token（种子 Token）**：影响全局的最基础变量
2. **Map Token（梯度 Token）**：基于 Seed Token 派生
3. **Alias Token（别名 Token）**：批量控制组件样式
4. **Component Token（组件 Token）**：组件级别的样式变量

### 常用 Seed Token

```tsx
{
  colorPrimary: string; // 品牌主色
  colorSuccess: string; // 成功色
  colorWarning: string; // 警告色
  colorError: string; // 错误色
  colorInfo: string; // 信息色
  colorTextBase: string; // 文本基础色
  colorBgBase: string; // 背景基础色
  fontFamily: string; // 字体
  fontSize: number; // 字体大小
  borderRadius: number; // 圆角
  wireframe: boolean; // 线框风格
  motion: boolean; // 动画开关（5.21.0+）
}
```

## 主题算法

- `theme.defaultAlgorithm`: 默认算法（亮色主题）
- `theme.darkAlgorithm`: 暗色主题算法
- `theme.compactAlgorithm`: 紧凑主题算法

## 示例代码

```tsx
import { Button, ConfigProvider, Space, theme } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 修改主色 */}
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <Button type="primary">Green Primary</Button>
    </ConfigProvider>

    {/* 暗色主题 */}
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div style={{ background: '#141414', padding: 24 }}>
        <Button type="primary">Dark Theme</Button>
      </div>
    </ConfigProvider>

    {/* 紧凑主题 */}
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <Button type="primary">Compact Theme</Button>
    </ConfigProvider>

    {/* 组合算法 */}
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <div style={{ background: '#141414', padding: 24 }}>
        <Button type="primary">Dark Compact</Button>
      </div>
    </ConfigProvider>

    {/* 组件级定制 */}
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

    {/* 嵌套主题 */}
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

    {/* CSS 变量模式 */}
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

// 使用 useToken Hook
const ThemeInfo: React.FC = () => {
  const { token } = theme.useToken();

  return <div style={{ color: token.colorPrimary }}>Primary Color: {token.colorPrimary}</div>;
};
```

## 返回结果

提供主题定制能力，影响所有 antd 组件的样式。
