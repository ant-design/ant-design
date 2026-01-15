# ConfigProvider — 全局化配置

## 功能概述

为组件提供统一的全局化配置。

## 输入字段

### 可选

- `locale`: object，语言包配置，可选语言见 antd/locale。
- `theme`: ThemeConfig，主题配置。
- `componentSize`: string，组件大小，可选 `small` | `middle` | `large`。
- `componentDisabled`: boolean，全局禁用状态（5.21.0+）。
- `direction`: string，文字方向，可选 `ltr` | `rtl`。
- `prefixCls`: string，设置统一样式前缀。
- `iconPrefixCls`: string，图标样式前缀。
- `csp`: { nonce }，CSP 配置。
- `autoInsertSpaceInButton`: boolean，按钮中两个汉字间是否自动插入空格。
- `form`: FormConfig，Form 全局配置。
- `input`: InputConfig，Input 全局配置。
- `select`: SelectConfig，Select 全局配置。
- `pagination`: PaginationConfig，Pagination 全局配置。
- `table`: TableConfig，Table 全局配置。
- `space`: SpaceConfig，Space 全局配置。
- `virtual`: boolean，虚拟滚动全局开关。
- `popupMatchSelectWidth`: boolean | number，弹出层宽度匹配。
- `popupOverflow`: string，弹出层溢出行为，可选 `viewport` | `scroll`。
- `renderEmpty`: (componentName) => ReactNode，自定义空状态。
- `getPopupContainer`: (node) => HTMLElement，弹出层容器。
- `getTargetContainer`: () => HTMLElement，Affix、Anchor 目标容器。
- `wave`: WaveConfig，水波纹效果配置。
- `warning`: { strict }，警告配置。

### ThemeConfig 结构

```tsx
interface ThemeConfig {
  token?: Partial<AliasToken>; // 全局 Token
  components?: ComponentsConfig; // 组件级 Token
  algorithm?: MappingAlgorithm | MappingAlgorithm[]; // 主题算法
  hashed?: boolean; // 使用 hash 类名
  inherit?: boolean; // 继承上层配置
  cssVar?: boolean | { prefix; key }; // CSS 变量模式
}
```

## 使用建议

应用根节点包裹 ConfigProvider；主题定制使用 theme 属性；多语言使用 locale 属性。

## 示例代码

```tsx
import { Button, ConfigProvider, DatePicker, Space, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

const App: React.FC = () => (
  <>
    {/* 中文配置 */}
    <ConfigProvider locale={zhCN}>
      <Space>
        <DatePicker />
        <Button type="primary">按钮</Button>
      </Space>
    </ConfigProvider>

    {/* 英文配置 */}
    <ConfigProvider locale={enUS}>
      <Space>
        <DatePicker />
        <Button type="primary">Button</Button>
      </Space>
    </ConfigProvider>

    {/* 主题定制 */}
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 8,
        },
      }}
    >
      <Button type="primary">Custom Theme</Button>
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

    {/* 组件大小 */}
    <ConfigProvider componentSize="small">
      <Space>
        <Button type="primary">Small Button</Button>
        <DatePicker />
      </Space>
    </ConfigProvider>

    {/* 组件级定制 */}
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#00b96b',
            algorithm: true,
          },
          Input: {
            colorPrimary: '#eb2f96',
          },
        },
      }}
    >
      <Space>
        <Button type="primary">Button</Button>
        <Input placeholder="Input" />
      </Space>
    </ConfigProvider>

    {/* RTL 方向 */}
    <ConfigProvider direction="rtl">
      <Button type="primary">RTL Button</Button>
    </ConfigProvider>
  </>
);
```

## 返回结果

提供全局化配置，影响所有子组件的行为和样式。
