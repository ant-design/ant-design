# Result 组件语义类名定制指南

Result 组件现在支持更丰富的语义类名和样式定制功能，让开发者能够更灵活地自定义组件外观。

## 新增功能

### 1. 语义化类名

组件现在为各个子元素提供了更具语义的类名：

- **图标区域**: `ant-result-icon-{status}` (如 `ant-result-icon-success`)
- **标题区域**: `ant-result-title-{status}` (如 `ant-result-title-error`)
- **副标题区域**: `ant-result-subtitle-{status}` (如 `ant-result-subtitle-warning`)
- **内容区域**: `ant-result-content-{status}` (如 `ant-result-content-info`)

### 2. 自定义类名属性

每个子组件都支持独立的自定义类名：

```tsx
<Result
  status="success"
  title="操作成功"
  iconClassName="custom-icon"
  titleClassName="custom-title"
  subTitleClassName="custom-subtitle"
  extraClassName="custom-extra"
  contentClassName="custom-content"
/>
```

### 3. 自定义样式属性

每个子组件都支持独立的内联样式：

```tsx
<Result
  status="error"
  title="支付失败"
  iconStyle={{ fontSize: '72px' }}
  titleStyle={{ color: '#ff4d4f', fontSize: '24px' }}
  subTitleStyle={{ color: '#666' }}
  extraStyle={{ marginTop: '32px' }}
  contentStyle={{ backgroundColor: '#fff2f0' }}
/>
```

## API 扩展

### 新增属性

| 属性              | 说明                     | 类型          | 默认值 |
| ----------------- | ------------------------ | ------------- | ------ |
| iconClassName     | 图标区域的自定义类名     | string        | -      |
| iconStyle         | 图标区域的自定义样式     | CSSProperties | -      |
| titleClassName    | 标题区域的自定义类名     | string        | -      |
| titleStyle        | 标题区域的自定义样式     | CSSProperties | -      |
| subTitleClassName | 副标题区域的自定义类名   | string        | -      |
| subTitleStyle     | 副标题区域的自定义样式   | CSSProperties | -      |
| extraClassName    | 额外内容区域的自定义类名 | string        | -      |
| extraStyle        | 额外内容区域的自定义样式 | CSSProperties | -      |
| contentClassName  | 内容区域的自定义类名     | string        | -      |
| contentStyle      | 内容区域的自定义样式     | CSSProperties | -      |

## 使用示例

### 基础定制

```tsx
import { Button, Result } from 'antd';

const CustomResult = () => (
  <Result
    status="success"
    title="操作成功"
    subTitle="您的订单已成功提交"
    titleClassName="success-title"
    iconClassName="success-icon"
    extra={<Button type="primary">返回首页</Button>}
    extraClassName="success-actions"
  />
);
```

### 高级定制

```tsx
const AdvancedResult = () => (
  <Result
    status="warning"
    title="账户存在风险"
    subTitle="检测到异常登录行为"
    titleStyle={{
      color: '#faad14',
      fontSize: '28px',
      fontWeight: 'bold',
    }}
    iconStyle={{
      transform: 'scale(1.2)',
      filter: 'drop-shadow(0 4px 8px rgba(250, 173, 20, 0.3))',
    }}
    contentStyle={{
      backgroundColor: '#fff7e6',
      border: '1px solid #ffd591',
      borderRadius: '8px',
      padding: '20px',
    }}
  >
    <div>详细的风险说明内容...</div>
  </Result>
);
```

### CSS 样式定制

```css
/* 通过语义类名定制样式 */
.ant-result-icon-success {
  animation: bounce 2s infinite;
}

.ant-result-title-error {
  text-shadow: 0 2px 4px rgba(255, 77, 79, 0.3);
}

.ant-result-content-warning {
  position: relative;
}

.ant-result-content-warning::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #faad14;
  border-radius: 2px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
```

## 最佳实践

1. **保持一致性**: 在同一个项目中使用统一的命名规范和样式风格
2. **语义化优先**: 优先使用语义化的类名而不是内联样式
3. **响应式设计**: 考虑不同屏幕尺寸下的显示效果
4. **可访问性**: 确保自定义样式不影响组件的可访问性
5. **性能考虑**: 避免过度复杂的样式计算和动画效果

## 兼容性

所有新增功能都向后兼容，不会影响现有代码的正常运行。原有的 API 和样式类名继续有效。Copyright 2025 20711

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

     https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. -->
