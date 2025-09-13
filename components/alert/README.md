# Alert 组件语义类名定制指南

Alert 组件现在支持更丰富的语义类名和样式定制功能，让开发者能够更灵活地自定义组件外观。

## 新增功能

### 1. 语义化类名

组件现在为各个子元素提供了更具语义的类名：

- **图标区域**: `ant-alert-icon-{type}` (如 `ant-alert-icon-success`)
- **消息区域**: `ant-alert-message-{type}` (如 `ant-alert-message-error`)
- **描述区域**: `ant-alert-description-{type}` (如 `ant-alert-description-warning`)
- **内容区域**: `ant-alert-content-{type}` (如 `ant-alert-content-info`)
- **操作区域**: `ant-alert-action-{type}` (如 `ant-alert-action-success`)

### 2. 自定义类名属性

每个子组件都支持独立的自定义类名：

```tsx
<Alert
  type="success"
  message="操作成功"
  description="详细描述信息"
  iconClassName="custom-icon"
  messageClassName="custom-message"
  descriptionClassName="custom-description"
  contentClassName="custom-content"
  actionClassName="custom-action"
  closeClassName="custom-close"
/>
```

### 3. 自定义样式属性

每个子组件都支持独立的内联样式：

```tsx
<Alert
  type="error"
  message="操作失败"
  description="详细错误信息"
  iconStyle={{ fontSize: '24px' }}
  messageStyle={{ color: '#ff4d4f', fontSize: '18px' }}
  descriptionStyle={{ fontStyle: 'italic' }}
  contentStyle={{ backgroundColor: '#fff2f0' }}
  actionStyle={{ marginLeft: '16px' }}
  closeStyle={{ fontSize: '16px' }}
/>
```

## API 扩展

### 新增属性

| 属性                 | 说明                 | 类型          | 默认值 |
| -------------------- | -------------------- | ------------- | ------ |
| iconClassName        | 图标区域的自定义类名 | string        | -      |
| iconStyle            | 图标区域的自定义样式 | CSSProperties | -      |
| messageClassName     | 消息区域的自定义类名 | string        | -      |
| messageStyle         | 消息区域的自定义样式 | CSSProperties | -      |
| descriptionClassName | 描述区域的自定义类名 | string        | -      |
| descriptionStyle     | 描述区域的自定义样式 | CSSProperties | -      |
| contentClassName     | 内容区域的自定义类名 | string        | -      |
| contentStyle         | 内容区域的自定义样式 | CSSProperties | -      |
| actionClassName      | 操作区域的自定义类名 | string        | -      |
| actionStyle          | 操作区域的自定义样式 | CSSProperties | -      |
| closeClassName       | 关闭按钮的自定义类名 | string        | -      |
| closeStyle           | 关闭按钮的自定义样式 | CSSProperties | -      |

## 使用示例

### 基础定制

```tsx
import { Alert } from 'antd';

const CustomAlert = () => (
  <Alert
    type="success"
    message="操作成功"
    description="您的操作已成功完成"
    showIcon
    messageClassName="success-message"
    iconClassName="success-icon"
    descriptionClassName="success-description"
  />
);
```

### 高级定制

```tsx
const AdvancedAlert = () => (
  <Alert
    type="warning"
    message="系统警告"
    description="检测到潜在风险，请及时处理"
    showIcon
    closable
    messageStyle={{
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#faad14',
    }}
    iconStyle={{
      fontSize: '24px',
      transform: 'scale(1.2)',
    }}
    descriptionStyle={{
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#666',
    }}
    contentStyle={{
      backgroundColor: '#fffbe6',
      borderLeft: '4px solid #faad14',
      paddingLeft: '16px',
    }}
  />
);
```

### 带操作按钮的定制

```tsx
import { Alert, Button } from 'antd';

const AlertWithAction = () => (
  <Alert
    type="error"
    message="支付失败"
    description="网络连接异常，请重试"
    showIcon
    action={
      <Button size="small" type="primary" danger>
        重试
      </Button>
    }
    actionStyle={{
      marginLeft: '12px',
    }}
    messageStyle={{
      fontSize: '16px',
      fontWeight: '500',
    }}
  />
);
```

### CSS 样式定制

```css
/* 通过语义类名定制样式 */
.ant-alert-icon-success {
  animation: pulse 2s infinite;
}

.ant-alert-message-error {
  text-shadow: 0 1px 2px rgba(255, 77, 79, 0.3);
}

.ant-alert-content-warning {
  position: relative;
}

.ant-alert-content-warning::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #faad14;
  border-radius: 2px;
}

.ant-alert-action-info {
  border-left: 1px solid #d9d9d9;
  padding-left: 12px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
```

### Banner 模式定制

```tsx
const CustomBanner = () => (
  <Alert
    banner
    type="info"
    message="系统升级通知：今晚 22:00-24:00 系统维护"
    showIcon
    messageStyle={{
      fontSize: '16px',
      fontWeight: '500',
    }}
    iconStyle={{
      fontSize: '20px',
    }}
    style={{
      borderRadius: 0,
      borderLeft: '4px solid #1890ff',
      backgroundColor: '#e6f7ff',
    }}
  />
);
```

## 最佳实践

1. **保持一致性**: 在同一个项目中使用统一的命名规范和样式风格
2. **语义化优先**: 优先使用语义化的类名而不是内联样式
3. **响应式设计**: 考虑不同屏幕尺寸下的显示效果
4. **可访问性**: 确保自定义样式不影响组件的可访问性
5. **性能考虑**: 避免过度复杂的样式计算和动画效果
6. **状态区分**: 利用类型相关的类名来区分不同状态的样式
