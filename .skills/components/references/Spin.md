# Spin — 加载中

## 功能概述

用于页面和区块的加载中状态。加载时显示旋转指示器。

## 输入字段

### 必填

无必填属性。

### 可选

- `spinning`: boolean，是否加载中，默认 `true`。
- `delay`: number，延迟显示加载时间（毫秒），防止闪烁。
- `size`: string，尺寸，可选 `small` | `default` | `large`，默认 `default`。
- `tip`: ReactNode，加载文案。
- `indicator`: ReactNode，自定义加载指示器。
- `fullscreen`: boolean，全屏加载（5.11.0+）。
- `wrapperClassName`: string，包装容器类名。
- `percent`: number | `auto`，加载进度百分比（5.18.0+）。

### Spin.setDefaultIndicator(indicator)

全局设置默认加载指示器。

## 使用建议

区块加载包裹内容使用；页面加载使用 `fullscreen`；短时间加载使用 `delay` 防闪烁。

## 示例代码

```tsx
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Space, Spin } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 基础用法 */}
    <Space>
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>

    {/* 包裹内容 */}
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>

    {/* 自定义指示器 */}
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />

    {/* 延迟加载 */}
    <Spin spinning={true} delay={500}>
      <div style={{ padding: 50 }}>Content</div>
    </Spin>
  </Space>
);
```

## 返回结果

渲染一个加载指示器，可包裹内容显示加载状态。
