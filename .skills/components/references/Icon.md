# Icon — 图标

## 功能概述

语义化的矢量图形。使用图标组件需要安装 `@ant-design/icons` 图标组件包。

## 安装

```bash
npm install @ant-design/icons --save
```

## 输入字段

### 通用属性

- `className`: string，设置图标的类名。
- `style`: CSSProperties，设置图标的样式。
- `spin`: boolean，是否有旋转动画，默认 `false`。
- `rotate`: number，图标旋转角度。
- `twoToneColor`: string | [string, string]，双色图标的主题色（仅双色图标）。

### 自定义图标

使用 `createFromIconfontCN` 方法创建自定义图标：

```tsx
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
```

## 图标分类

- **线框图标**：如 `HomeOutlined`、`SettingOutlined`
- **实底图标**：如 `HomeFilled`、`SettingFilled`
- **双色图标**：如 `HomeTwoTone`、`SettingTwoTone`

## 使用建议

按语义选择合适的图标；统一使用同一风格；配合 Button 等组件使用。

## 示例代码

```tsx
// 使用 iconfont.cn

// 自定义 SVG 图标
import Icon, {
  CheckCircleTwoTone,
  createFromIconfontCN,
  HeartTwoTone,
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SmileTwoTone,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { GetProps } from 'antd';

const App: React.FC = () => (
  <Space size="large">
    {/* 基础使用 */}
    <HomeOutlined />
    <SettingFilled />
    <SmileOutlined />

    {/* 旋转动画 */}
    <SyncOutlined spin />
    <LoadingOutlined />

    {/* 自定义旋转角度 */}
    <SmileOutlined rotate={180} />

    {/* 双色图标 */}
    <SmileTwoTone />
    <HeartTwoTone twoToneColor="#eb2f96" />
    <CheckCircleTwoTone twoToneColor="#52c41a" />

    {/* 配合 Button */}
    <Button type="primary" icon={<HomeOutlined />}>
      Home
    </Button>
    <Button icon={<SettingFilled />} />

    {/* 设置样式 */}
    <HomeOutlined style={{ fontSize: '24px', color: '#08c' }} />
  </Space>
);

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const IconfontDemo: React.FC = () => (
  <Space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </Space>
);

type CustomIconComponentProps = GetProps<typeof Icon>;

const HeartSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M923 283.6c-13.4-31.1-32.6-59.2-56.9-83.5..." />
  </svg>
);

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartSvg} {...props} />
);

const CustomIconDemo: React.FC = () => <HeartIcon style={{ color: 'hotpink' }} />;
```

## 返回结果

渲染一个图标。
